const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

// Exercise the real registered input handlers and game state transitions in an
// offline VM. This is a DOM/event fixture, not a browser or touch-device test.
const source = fs.readFileSync(path.join(__dirname, '..', 'game.js'), 'utf8');

function target() {
    const listeners = new Map();
    const classes = new Set(['hidden']);
    return {
        listeners,
        style: {},
        tagName: 'DIV',
        classList: {
            add: (...names) => names.forEach(name => classes.add(name)),
            remove: (...names) => names.forEach(name => classes.delete(name)),
            contains: name => classes.has(name)
        },
        addEventListener(type, handler, options) {
            if (!listeners.has(type)) listeners.set(type, []);
            listeners.get(type).push({ handler, options });
        },
        emit(type, data = {}) {
            const event = {
                defaultPrevented: false,
                preventDefault() { this.defaultPrevented = true; },
                ...data
            };
            for (const { handler } of listeners.get(type) || []) handler(event);
            return event;
        },
        getAttribute: () => null,
        getBoundingClientRect: () => ({ left: 50, top: 20, width: 400, height: 600 })
    };
}

function fixture() {
    let now = 10000;
    const nodes = new Map();
    const getNode = key => {
        if (!nodes.has(key)) nodes.set(key, target());
        return nodes.get(key);
    };
    const document = Object.assign(target(), {
        body: target(), documentElement: target(),
        getElementById: getNode,
        querySelectorAll: () => []
    });
    document.activeElement = document.body;
    const storage = new Map();
    const context = vm.createContext({
        document,
        window: target(),
        navigator: {},
        performance: { now: () => now },
        localStorage: {
            getItem: key => storage.get(key) ?? null,
            setItem: (key, value) => storage.set(key, String(value)),
            removeItem: key => storage.delete(key)
        },
        // Keep timers and animation callbacks queued outside this fixture.
        setTimeout: () => 1,
        clearTimeout() {},
        requestAnimationFrame: () => 1,
        getNode
    });
    vm.runInContext(source, context, { filename: 'game.js' });
    const app = vm.runInContext(`
        elements = new Proxy({}, { get: (_, key) => getNode(key) });
        game.canvas = elements.canvas;
        for (const key of Object.keys(audio)) {
            if (typeof audio[key] === 'function') audio[key] = () => {};
        }
        // Notifications/rendering are outside the input/action contract.
        ACHIEVEMENTS.unlock = () => {};
        draw = () => {};
        bindEvents();
        ({ game, elements, update, REPLAY, DAILY_CHALLENGE, ENDLESS_MODE })
    `, context);
    app.elements.startScreen.classList.remove('hidden');
    const advance = ms => { now += ms; app.update(ms); };
    const key = value => document.emit('keydown', { key: value });
    const point = (side, identifier = 1) => ({
        identifier, clientX: side === 'left' ? 150 : 350, clientY: 200
    });
    const touch = (side, held = []) => {
        const current = point(side, held.length + 1);
        return app.game.canvas.emit('touchstart', {
            touches: [...held, current], changedTouches: [current]
        });
    };
    const input = (kind, side) => kind === 'key'
        ? key(side === 'left' ? 'ArrowLeft' : 'd')
        : kind === 'click'
            ? app.game.canvas.emit('click', point(side))
            : touch(side);
    const startButtons = { normal: 'startBtn', daily: 'dailyStartBtn', endless: 'endlessStartBtn' };
    const start = mode => app.elements[startButtons[mode]].emit('click');
    const ready = () => {
        advance(3201);
        assert.equal(app.game.countdown.active, false);
        app.game.trunks = Array.from({ length: 8 }, () => ({ branch: 'none' }));
    };
    return { ...app, document, advance, key, point, touch, input, start, ready };
}

test('touchstart is non-passive and cancels its default compatibility action', () => {
    const f = fixture();
    const listener = f.game.canvas.listeners.get('touchstart');
    assert.equal(listener.length, 1);
    assert.equal(listener[0].options.passive, false);
    f.start('normal');
    f.ready();
    assert.equal(f.touch('left').defaultPrevented, true);
    assert.equal(f.game.score, 1);
});

for (const mode of ['normal', 'daily', 'endless']) {
    for (const kind of ['key', 'click', 'touch']) {
        test(`${mode}/${kind}: idle, countdown, play, pause, death and keyboard retry`, () => {
            const f = fixture();
            f.input(kind, 'left');
            assert.equal(f.game.isRunning, false);
            assert.equal(f.game.score, 0);
            f.start(mode);
            f.input(kind, 'right');
            assert.equal(f.game.score, 0, 'countdown blocks chopping');
            f.ready();
            f.input(kind, 'left');
            assert.equal(f.game.score, 1);
            assert.equal(f.game.player.side, 'left');
            f.input(kind, 'right');
            assert.equal(f.game.score, 1, '100ms animation lock blocks a second chop');
            f.advance(101);
            f.input(kind, 'right');
            assert.equal(f.game.score, 2);
            assert.equal(f.game.player.side, 'right');
            f.key('p');
            f.input(kind, 'left');
            assert.equal(f.game.score, 2, 'paused input does not chop');
            f.key('Enter');
            assert.equal(f.game.isPaused, false);
            assert.equal(f.game.score, 2, 'resume does not chop');
            f.advance(101);
            f.game.trunks[0].branch = 'left';
            f.input(kind, 'left');
            assert.equal(f.game.isRunning, false, 'collision ends the round');
            assert.equal(f.game.score, 2);
            f.input(kind, 'right');
            assert.equal(f.game.score, 2, 'dead input does not chop');
            f.key('Enter');
            assert.equal(f.game.isRunning, true);
            assert.equal(f.game.score, 0);
            assert.equal(f.game.countdown.active, true);
            assert.equal(f.DAILY_CHALLENGE.isActive, mode === 'daily');
            assert.equal(f.ENDLESS_MODE.isActive, mode === 'endless');
            f.input(kind, 'right');
            assert.equal(f.game.score, 0, 'retry countdown also blocks chopping');
            f.ready();
            f.input(kind, 'right');
            assert.equal(f.game.score, 1, 'first eligible input after retry chops once');
        });
    }
}

for (const mode of ['normal', 'daily', 'endless']) {
    for (const heldSide of ['left', 'right']) {
        test(`${mode}: a new touch opposite a held ${heldSide} finger uses the new side`, () => {
            const f = fixture();
            f.start(mode);
            f.ready();
            f.game.trunks[1].branch = heldSide;
            f.touch(heldSide);
            assert.equal(f.game.score, 1);
            f.advance(101);
            const newSide = heldSide === 'left' ? 'right' : 'left';
            f.touch(newSide, [f.point(heldSide)]);
            assert.equal(f.game.isRunning, true, 'the old touch must not cause a fatal chop');
            assert.equal(f.game.player.side, newSide);
            assert.equal(f.game.score, 2);
        });
    }
}

test('a new canvas touch does not use another finger held outside the canvas', () => {
    const f = fixture();
    f.start('normal');
    f.ready();
    f.game.trunks[0].branch = 'left';
    const outside = { identifier: 1, clientX: 10, clientY: 10 };
    f.touch('right', [outside]);
    assert.equal(f.game.isRunning, true);
    assert.equal(f.game.player.side, 'right');
    assert.equal(f.game.score, 1);
});
