/**
 * Timberman - 伐木人游戏
 * 纯 JavaScript + Canvas 实现
 */

// ============ 皮肤系统 ============
const SKINS = {
    // 皮肤定义
    definitions: [
        {
            id: 'default',
            name: '伐木工',
            icon: '👷',
            desc: '经典红衣伐木工',
            unlockCondition: null, // 默认解锁
            colors: {
                hat: '#6D4C41', hatBrim: '#5D4037', hatHighlight: '#8D6E63',
                body: '#D32F2F', bodyHighlight: '#E53935', bodyShadow: '#B71C1C',
                pants: '#1565C0', pantsHighlight: '#1976D2',
                shoes: '#5D4037', skin: '#FFCC80', beard: '#5D4037',
                axeHandle: '#A1887F', axeHead: '#78909C', axeHighlight: '#90A4AE', axeBlade: '#B0BEC5'
            }
        },
        {
            id: 'ninja',
            name: '忍者',
            icon: '🥷',
            desc: '神秘的黑衣忍者',
            unlockCondition: { type: 'score', value: 10 },
            colors: {
                hat: '#212121', hatBrim: '#1A1A1A', hatHighlight: '#424242',
                body: '#1A1A1A', bodyHighlight: '#333', bodyShadow: '#000',
                pants: '#212121', pantsHighlight: '#333',
                shoes: '#111', skin: '#FFCC80', beard: null, // 忍者没有胡子
                axeHandle: '#333', axeHead: '#37474F', axeHighlight: '#546E7A', axeBlade: '#78909C',
                hasMask: true // 特殊标记：有面罩
            }
        },
        {
            id: 'robot',
            name: '机器人',
            icon: '🤖',
            desc: '钢铁机械伐木者',
            unlockCondition: { type: 'score', value: 50 },
            colors: {
                hat: '#607D8B', hatBrim: '#455A64', hatHighlight: '#78909C',
                body: '#78909C', bodyHighlight: '#90A4AE', bodyShadow: '#546E7A',
                pants: '#455A64', pantsHighlight: '#546E7A',
                shoes: '#37474F', skin: '#B0BEC5', beard: null,
                axeHandle: '#455A64', axeHead: '#263238', axeHighlight: '#37474F', axeBlade: '#00BCD4',
                hasAntenna: true, // 特殊标记：有天线
                eyeColor: '#00E5FF' // 机器人眼睛颜色
            }
        },
        {
            id: 'golden',
            name: '黄金传奇',
            icon: '👑',
            desc: '传说中的黄金伐木工',
            unlockCondition: { type: 'score', value: 100 },
            colors: {
                hat: '#FFD54F', hatBrim: '#FFC107', hatHighlight: '#FFEB3B',
                body: '#FF8F00', bodyHighlight: '#FFA000', bodyShadow: '#E65100',
                pants: '#FFC107', pantsHighlight: '#FFD54F',
                shoes: '#8D6E63', skin: '#FFCC80', beard: '#8D6E63',
                axeHandle: '#FFD54F', axeHead: '#FFC107', axeHighlight: '#FFEB3B', axeBlade: '#FFFFFF',
                hasGlow: true // 特殊标记：有光晕
            }
        }
    ],

    currentSkin: 'default',  // 当前选中的皮肤
    unlockedSkins: ['default'], // 已解锁的皮肤列表

    // 加载皮肤数据
    load() {
        const savedSkin = localStorage.getItem('timberman_skin');
        const savedUnlocked = localStorage.getItem('timberman_skins_unlocked');

        if (savedUnlocked) {
            this.unlockedSkins = JSON.parse(savedUnlocked);
        }

        // 确保默认皮肤始终解锁
        if (!this.unlockedSkins.includes('default')) {
            this.unlockedSkins.push('default');
        }

        // 加载选中的皮肤（确保已解锁）
        if (savedSkin && this.unlockedSkins.includes(savedSkin)) {
            this.currentSkin = savedSkin;
        }
    },

    // 保存皮肤数据
    save() {
        localStorage.setItem('timberman_skin', this.currentSkin);
        localStorage.setItem('timberman_skins_unlocked', JSON.stringify(this.unlockedSkins));
    },

    // 检查并解锁皮肤（根据最高分）
    checkUnlocks(highScore) {
        let newUnlocks = [];

        this.definitions.forEach(skin => {
            if (skin.unlockCondition &&
                skin.unlockCondition.type === 'score' &&
                highScore >= skin.unlockCondition.value &&
                !this.unlockedSkins.includes(skin.id)) {
                this.unlockedSkins.push(skin.id);
                newUnlocks.push(skin);
            }
        });

        if (newUnlocks.length > 0) {
            this.save();
        }

        return newUnlocks;
    },

    // 选择皮肤
    select(skinId) {
        if (this.unlockedSkins.includes(skinId)) {
            this.currentSkin = skinId;
            this.save();
            return true;
        }
        return false;
    },

    // 获取当前皮肤配置
    getCurrent() {
        return this.definitions.find(s => s.id === this.currentSkin) || this.definitions[0];
    },

    // 获取所有皮肤（附带解锁状态）
    getAll() {
        return this.definitions.map(skin => ({
            ...skin,
            unlocked: this.unlockedSkins.includes(skin.id)
        }));
    },

    // 获取已解锁皮肤数量
    getUnlockedCount() {
        return this.unlockedSkins.length;
    }
};

// ============ 每日挑战系统 ============
const DAILY_CHALLENGE = {
    // 获取今日日期字符串 (YYYY-MM-DD)
    getTodayKey() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    },

    // 基于日期生成种子
    getSeedForDate(dateKey) {
        let hash = 0;
        for (let i = 0; i < dateKey.length; i++) {
            hash = ((hash << 5) - hash) + dateKey.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    },

    // 伪随机数生成器（可种子化）
    seededRandom: {
        seed: 0,
        setSeed(s) { this.seed = s; },
        next() {
            this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
            return this.seed / 0x7fffffff;
        }
    },

    // 状态
    isActive: false,           // 是否正在进行每日挑战
    todayHighScore: 0,         // 今日最高分
    todayAttempts: 0,          // 今日尝试次数
    branchSequence: [],        // 预生成的树枝序列
    sequenceIndex: 0,          // 当前序列索引

    // 加载今日数据
    load() {
        const todayKey = this.getTodayKey();
        const saved = localStorage.getItem('timberman_daily');

        if (saved) {
            const data = JSON.parse(saved);
            if (data.date === todayKey) {
                this.todayHighScore = data.highScore || 0;
                this.todayAttempts = data.attempts || 0;
            } else {
                // 新的一天，重置记录
                this.todayHighScore = 0;
                this.todayAttempts = 0;
            }
        }
    },

    // 保存今日数据
    save() {
        localStorage.setItem('timberman_daily', JSON.stringify({
            date: this.getTodayKey(),
            highScore: this.todayHighScore,
            attempts: this.todayAttempts
        }));
    },

    // 初始化今日挑战（生成固定的树枝序列）
    initChallenge() {
        this.isActive = true;
        this.todayAttempts++;
        this.save();

        // 用今日日期作为种子
        const seed = this.getSeedForDate(this.getTodayKey());
        this.seededRandom.setSeed(seed);

        // 预生成足够长的树枝序列（比如1000个）
        this.branchSequence = [];
        for (let i = 0; i < 1000; i++) {
            const rand = this.seededRandom.next();
            if (rand < 0.35) {
                this.branchSequence.push('left');
            } else if (rand < 0.7) {
                this.branchSequence.push('right');
            } else {
                this.branchSequence.push('none');
            }
        }
        this.sequenceIndex = 0;
    },

    // 获取下一个树枝（每日挑战模式专用）
    getNextBranch(forceNone = false) {
        if (forceNone) return 'none';

        if (this.sequenceIndex >= this.branchSequence.length) {
            // 如果序列用完，继续循环
            this.sequenceIndex = 0;
        }
        return this.branchSequence[this.sequenceIndex++];
    },

    // 更新今日最高分
    updateHighScore(score) {
        if (score > this.todayHighScore) {
            this.todayHighScore = score;
            this.save();
            return true;
        }
        return false;
    },

    // 结束挑战
    endChallenge() {
        this.isActive = false;
    },

    // 获取今日挑战信息
    getInfo() {
        return {
            date: this.getTodayKey(),
            highScore: this.todayHighScore,
            attempts: this.todayAttempts
        };
    }
};

// ============ 成就系统 ============
const ACHIEVEMENTS = {
    // 成就定义: { id, name, icon, description, rarity, check }
    // rarity: common, rare, epic, legendary
    definitions: [
        { id: 'first_chop', name: '初次砍伐', icon: '🪓', desc: '第一次砍树', rarity: 'common' },
        { id: 'score_10', name: '新手伐木工', icon: '🌲', desc: '达到 10 分', rarity: 'common' },
        { id: 'score_50', name: '熟练伐木工', icon: '🌳', desc: '达到 50 分', rarity: 'rare' },
        { id: 'score_100', name: '伐木大师', icon: '🏅', desc: '达到 100 分', rarity: 'epic' },
        { id: 'score_200', name: '伐木传说', icon: '👑', desc: '达到 200 分', rarity: 'legendary' },
        { id: 'combo_5', name: '连击新手', icon: '⚡', desc: '达到 5 连击', rarity: 'common' },
        { id: 'combo_10', name: '连击高手', icon: '🔥', desc: '达到 10 连击', rarity: 'rare' },
        { id: 'combo_20', name: '连击大师', icon: '💥', desc: '达到 20 连击', rarity: 'epic' },
        { id: 'level_5', name: '挑战者', icon: '⭐', desc: '达到难度 Lv.5', rarity: 'common' },
        { id: 'level_8', name: '勇者', icon: '🌟', desc: '达到难度 Lv.8', rarity: 'rare' },
        { id: 'level_11', name: '传奇', icon: '✨', desc: '达到最高难度 Lv.11', rarity: 'legendary' },
        { id: 'survivor', name: '绝处逢生', icon: '💪', desc: '时间<10%时砍树20次', rarity: 'epic' }
    ],

    unlocked: {},           // 已解锁的成就
    pendingPopups: [],      // 待显示的成就弹窗队列
    isShowingPopup: false,  // 是否正在显示弹窗
    lowTimeChops: 0,        // 低时间砍树计数（用于 survivor 成就）

    // 加载已解锁成就
    load() {
        const saved = localStorage.getItem('timberman_achievements');
        this.unlocked = saved ? JSON.parse(saved) : {};
    },

    // 保存成就
    save() {
        localStorage.setItem('timberman_achievements', JSON.stringify(this.unlocked));
    },

    // 解锁成就
    unlock(id) {
        if (this.unlocked[id]) return false; // 已解锁
        this.unlocked[id] = Date.now();
        this.save();
        this.pendingPopups.push(id);
        this.showNextPopup();
        return true;
    },

    // 显示下一个弹窗
    showNextPopup() {
        if (this.isShowingPopup || this.pendingPopups.length === 0) return;

        this.isShowingPopup = true;
        const id = this.pendingPopups.shift();
        const achievement = this.definitions.find(a => a.id === id);

        if (achievement) {
            const popup = document.getElementById('achievement-popup');
            const nameEl = document.getElementById('achievement-name');
            const iconEl = popup.querySelector('.achievement-icon');

            iconEl.textContent = achievement.icon;
            nameEl.textContent = achievement.name;
            popup.classList.remove('hidden');

            // 播放解锁音效
            audio.playAchievement();

            // 振动反馈
            haptics.achievement();

            // 3秒后隐藏
            setTimeout(() => {
                popup.classList.add('hidden');
                this.isShowingPopup = false;
                this.showNextPopup(); // 显示下一个
            }, 3000);
        }
    },

    // 检查成就条件
    check(score, combo, level) {
        // 分数成就
        if (score >= 1) this.unlock('first_chop');
        if (score >= 10) this.unlock('score_10');
        if (score >= 50) this.unlock('score_50');
        if (score >= 100) this.unlock('score_100');
        if (score >= 200) this.unlock('score_200');

        // 连击成就
        if (combo >= 5) this.unlock('combo_5');
        if (combo >= 10) this.unlock('combo_10');
        if (combo >= 20) this.unlock('combo_20');

        // 难度成就
        if (level >= 5) this.unlock('level_5');
        if (level >= 8) this.unlock('level_8');
        if (level >= 11) this.unlock('level_11');
    },

    // 检查绝处逢生成就（时间<10%时砍树）
    checkSurvivor(timePercent) {
        if (timePercent < 10) {
            this.lowTimeChops++;
            if (this.lowTimeChops >= 20) {
                this.unlock('survivor');
            }
        }
    },

    // 重置单局统计
    resetRoundStats() {
        this.lowTimeChops = 0;
    },

    // 获取已解锁数量
    getUnlockedCount() {
        return Object.keys(this.unlocked).length;
    },

    // 渲染成就列表
    render() {
        const list = document.getElementById('achievements-list');
        list.innerHTML = '';

        this.definitions.forEach(ach => {
            const item = document.createElement('div');
            const isUnlocked = !!this.unlocked[ach.id];
            item.className = `achievement-item rarity-${ach.rarity} ${isUnlocked ? 'unlocked' : 'locked'}`;
            item.innerHTML = `
                <span class="icon">${isUnlocked ? ach.icon : '🔒'}</span>
                <span class="name">${isUnlocked ? ach.name : '???'}</span>
            `;
            item.title = isUnlocked ? ach.desc : '未解锁';
            list.appendChild(item);
        });

        document.getElementById('unlocked-count').textContent = this.getUnlockedCount();
    }
};

// ============ 本地排行榜系统 ============
const LEADERBOARD = {
    MAX_ENTRIES: 20,  // 最多保存前20名
    entries: [],      // 排行榜条目: { score, combo, level, date, skin }

    // 加载排行榜数据
    load() {
        const saved = localStorage.getItem('timberman_leaderboard');
        this.entries = saved ? JSON.parse(saved) : [];
    },

    // 保存排行榜数据
    save() {
        localStorage.setItem('timberman_leaderboard', JSON.stringify(this.entries));
    },

    // 添加一条记录
    add(score, combo, level, skin) {
        const entry = {
            score,
            combo,
            level,
            skin: skin || 'default',
            date: Date.now()
        };

        this.entries.push(entry);
        // 按分数降序排序
        this.entries.sort((a, b) => b.score - a.score);
        // 只保留前 MAX_ENTRIES 条
        if (this.entries.length > this.MAX_ENTRIES) {
            this.entries = this.entries.slice(0, this.MAX_ENTRIES);
        }
        this.save();

        // 返回排名（1-based），如果不在榜则返回 -1
        const rank = this.entries.findIndex(e => e.date === entry.date);
        return rank >= 0 ? rank + 1 : -1;
    },

    // 获取排行榜
    getAll() {
        return this.entries;
    },

    // 获取最高分
    getTopScore() {
        return this.entries.length > 0 ? this.entries[0].score : 0;
    },

    // 获取排名信息
    getRankInfo(score) {
        if (this.entries.length === 0) return { rank: 1, isNewRecord: true };

        let rank = 1;
        for (const entry of this.entries) {
            if (score > entry.score) break;
            rank++;
        }

        return {
            rank: Math.min(rank, this.entries.length + 1),
            isNewRecord: rank === 1 && score > this.entries[0].score
        };
    },

    // 清空排行榜
    clear() {
        this.entries = [];
        this.save();
    },

    // 格式化日期
    formatDate(timestamp) {
        const date = new Date(timestamp);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        return `${month}/${day} ${hour}:${min}`;
    },

    // 渲染排行榜
    render() {
        const list = document.getElementById('leaderboard-list');
        if (!list) return;

        list.innerHTML = '';

        if (this.entries.length === 0) {
            list.innerHTML = '<div class="leaderboard-empty">暂无记录，快来挑战吧！</div>';
            return;
        }

        this.entries.forEach((entry, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            if (index < 3) item.classList.add(`rank-${index + 1}`);

            const rankIcon = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
            const skinDef = SKINS.definitions.find(s => s.id === entry.skin);
            const skinIcon = skinDef ? skinDef.icon : '👷';

            item.innerHTML = `
                <span class="lb-rank">${rankIcon}</span>
                <span class="lb-skin">${skinIcon}</span>
                <span class="lb-score">${entry.score}</span>
                <span class="lb-combo">${entry.combo}x</span>
                <span class="lb-date">${this.formatDate(entry.date)}</span>
            `;
            list.appendChild(item);
        });
    }
};

// ============ 游戏配置 ============
const CONFIG = {
    // 画布尺寸
    WIDTH: 400,
    HEIGHT: 600,

    // 树干配置
    TRUNK_WIDTH: 80,
    TRUNK_HEIGHT: 60,
    TRUNK_X: 160,  // 树干中心 X

    // 树枝配置
    BRANCH_WIDTH: 80,
    BRANCH_HEIGHT: 40,

    // 伐木工配置
    PLAYER_WIDTH: 60,
    PLAYER_HEIGHT: 80,
    PLAYER_Y: 450,  // 伐木工 Y 位置

    // 地面位置
    GROUND_Y: 530,

    // 游戏速度
    CHOP_ANIMATION_DURATION: 100,

    // 时间条配置
    INITIAL_TIME: 100,
    TIME_DECAY: 0.3,      // 每帧减少的时间（基础值）
    TIME_BONUS: 10,       // 每砍一次增加的时间
    MAX_TIME: 100,

    // 难度递增配置
    DIFFICULTY: {
        SCORE_PER_LEVEL: 10,      // 每多少分升一级难度
        MAX_LEVEL: 10,            // 最大难度等级
        DECAY_MULTIPLIER: 0.15,   // 每级增加的衰减倍数
        TIME_BONUS_DECAY: 0.5     // 每级减少的时间奖励
    },

    // 连击系统配置
    COMBO: {
        TIMEOUT: 500,             // 连击超时时间（毫秒）
        MAX_PITCH_BONUS: 1.5,     // 最大音调加成倍数
        COMBO_FOR_MAX_PITCH: 20   // 达到最大音调需要的连击数
    },

    // 树干堆叠数量
    TRUNK_COUNT: 8,

    // 粒子对象池配置
    PARTICLE_POOL: {
        INITIAL_SIZE: 100,        // 初始池大小
        MAX_SIZE: 200             // 最大池大小
    },

    // 飞出树干对象池配置
    FLYING_TRUNK_POOL: {
        INITIAL_SIZE: 10,         // 初始池大小
        MAX_SIZE: 20              // 最大池大小
    }
};

// ============ 粒子对象池 ============
const particlePool = {
    pool: [],           // 可用粒子池
    active: [],         // 活跃粒子列表

    // 初始化对象池
    init() {
        this.pool = [];
        this.active = [];
        // 预创建粒子对象
        for (let i = 0; i < CONFIG.PARTICLE_POOL.INITIAL_SIZE; i++) {
            this.pool.push(this.createParticle());
        }
    },

    // 创建新粒子对象（空模板）
    createParticle() {
        return {
            x: 0, y: 0,
            vx: 0, vy: 0,
            size: 0,
            color: '',
            life: 0,
            maxLife: 0,
            rotation: 0,
            rotationSpeed: 0,
            active: false
        };
    },

    // 从池中获取粒子
    acquire() {
        let particle;
        if (this.pool.length > 0) {
            // 从池中取出
            particle = this.pool.pop();
        } else if (this.active.length < CONFIG.PARTICLE_POOL.MAX_SIZE) {
            // 池为空但未达上限，创建新粒子
            particle = this.createParticle();
        } else {
            // 达到上限，返回 null
            return null;
        }
        particle.active = true;
        this.active.push(particle);
        return particle;
    },

    // 释放粒子回池中
    release(particle) {
        particle.active = false;
        const index = this.active.indexOf(particle);
        if (index > -1) {
            this.active.splice(index, 1);
        }
        // 放回池中
        this.pool.push(particle);
    },

    // 更新所有活跃粒子
    update(deltaTime) {
        const gravity = 0.15;
        const timeScale = deltaTime / 16.67;
        const decayRate = 0.02;

        // 从后往前遍历，方便移除
        for (let i = this.active.length - 1; i >= 0; i--) {
            const p = this.active[i];

            // 应用物理
            p.vy += gravity * timeScale;
            p.x += p.vx * timeScale;
            p.y += p.vy * timeScale;
            p.rotation += p.rotationSpeed * timeScale;

            // 减少生命值
            p.life -= decayRate * timeScale;

            // 回收死亡粒子
            if (p.life <= 0) {
                this.release(p);
            }
        }
    },

    // 生成木屑粒子
    spawn(x, y, side) {
        const particleCount = 12 + Math.floor(Math.random() * 8);
        const woodColors = ['#8B4513', '#A0522D', '#DEB887', '#D2691E', '#CD853F', '#F4A460'];

        for (let i = 0; i < particleCount; i++) {
            const p = this.acquire();
            if (!p) break; // 达到上限

            // 粒子向玩家对面方向飞出
            const baseAngle = side === 'left' ? 0 : Math.PI;
            const angle = baseAngle + (Math.random() - 0.5) * Math.PI * 0.8;
            const speed = 3 + Math.random() * 6;

            // 重置粒子属性
            p.x = x;
            p.y = y;
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed - 2 - Math.random() * 3;
            p.size = 3 + Math.random() * 5;
            p.color = woodColors[Math.floor(Math.random() * woodColors.length)];
            p.life = 1;
            p.maxLife = 0.5 + Math.random() * 0.5;
            p.rotation = Math.random() * Math.PI * 2;
            p.rotationSpeed = (Math.random() - 0.5) * 0.3;
        }
    },

    // 绘制所有活跃粒子
    draw(ctx) {
        for (const p of this.active) {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = p.color;
            const halfSize = p.size / 2;
            ctx.fillRect(-halfSize, -halfSize * 0.5, p.size, p.size * 0.5);
            ctx.restore();
        }
    },

    // 清空所有粒子（游戏重置时调用）
    clear() {
        // 将所有活跃粒子放回池中
        while (this.active.length > 0) {
            this.release(this.active[0]);
        }
    },

    // 获取统计信息（调试用）
    getStats() {
        return {
            poolSize: this.pool.length,
            activeCount: this.active.length,
            total: this.pool.length + this.active.length
        };
    }
};

// ============ 飞出树干对象池 ============
const flyingTrunkPool = {
    pool: [],           // 可用对象池
    active: [],         // 活跃对象列表

    // 初始化对象池
    init() {
        this.pool = [];
        this.active = [];
        // 预创建树干对象
        for (let i = 0; i < CONFIG.FLYING_TRUNK_POOL.INITIAL_SIZE; i++) {
            this.pool.push(this.createTrunk());
        }
    },

    // 创建新树干对象（空模板）
    createTrunk() {
        return {
            x: 0, y: 0,
            vx: 0, vy: 0,
            rotation: 0,
            rotationSpeed: 0,
            branch: 'none',
            active: false
        };
    },

    // 从池中获取树干
    acquire() {
        let trunk;
        if (this.pool.length > 0) {
            // 从池中取出
            trunk = this.pool.pop();
        } else if (this.active.length < CONFIG.FLYING_TRUNK_POOL.MAX_SIZE) {
            // 池为空但未达上限，创建新树干
            trunk = this.createTrunk();
        } else {
            // 达到上限，返回 null
            return null;
        }
        trunk.active = true;
        this.active.push(trunk);
        return trunk;
    },

    // 释放树干回池中
    release(trunk) {
        trunk.active = false;
        const index = this.active.indexOf(trunk);
        if (index > -1) {
            this.active.splice(index, 1);
        }
        // 放回池中
        this.pool.push(trunk);
    },

    // 生成飞出的树干
    spawn(x, y, side, branch) {
        const trunk = this.acquire();
        if (!trunk) return null;

        const flyDirection = side === 'left' ? 1 : -1;

        // 重置树干属性
        trunk.x = x;
        trunk.y = y;
        trunk.vx = flyDirection * 12;       // 水平速度
        trunk.vy = -5;                       // 初始向上的速度
        trunk.rotation = 0;
        trunk.rotationSpeed = flyDirection * 0.15;
        trunk.branch = branch;

        return trunk;
    },

    // 更新所有活跃树干
    update(deltaTime) {
        const gravity = 0.5;
        const timeScale = deltaTime / 16.67;

        // 从后往前遍历，方便移除
        for (let i = this.active.length - 1; i >= 0; i--) {
            const trunk = this.active[i];

            // 应用物理
            trunk.vy += gravity * timeScale;  // 重力
            trunk.x += trunk.vx * timeScale;
            trunk.y += trunk.vy * timeScale;
            trunk.rotation += trunk.rotationSpeed * timeScale;

            // 回收超出屏幕的树干
            if (trunk.y > CONFIG.HEIGHT + 100 ||
                trunk.x < -200 ||
                trunk.x > CONFIG.WIDTH + 200) {
                this.release(trunk);
            }
        }
    },

    // 绘制所有活跃树干
    draw(ctx) {
        for (const trunk of this.active) {
            ctx.save();

            // 移动到树干中心并旋转
            const centerX = trunk.x + CONFIG.TRUNK_WIDTH / 2;
            const centerY = trunk.y + CONFIG.TRUNK_HEIGHT / 2;
            ctx.translate(centerX, centerY);
            ctx.rotate(trunk.rotation);
            ctx.translate(-CONFIG.TRUNK_WIDTH / 2, -CONFIG.TRUNK_HEIGHT / 2);

            // 绘制树干主体
            ctx.fillStyle = '#8B5A2B';
            ctx.fillRect(0, 0, CONFIG.TRUNK_WIDTH, CONFIG.TRUNK_HEIGHT);

            // 树干左侧高光
            ctx.fillStyle = '#A0724A';
            ctx.fillRect(0, 0, 8, CONFIG.TRUNK_HEIGHT);

            // 树干右侧阴影
            ctx.fillStyle = '#6B4423';
            ctx.fillRect(CONFIG.TRUNK_WIDTH - 8, 0, 8, CONFIG.TRUNK_HEIGHT);

            // 树干纹理
            ctx.fillStyle = '#7A4A2A';
            ctx.fillRect(12, 8, 6, CONFIG.TRUNK_HEIGHT - 16);
            ctx.fillRect(35, 5, 4, CONFIG.TRUNK_HEIGHT - 10);
            ctx.fillRect(55, 12, 5, CONFIG.TRUNK_HEIGHT - 20);

            // 树皮纹理
            ctx.fillStyle = '#6B4423';
            ctx.fillRect(8, 15, CONFIG.TRUNK_WIDTH - 16, 2);
            ctx.fillRect(8, 40, CONFIG.TRUNK_WIDTH - 16, 2);

            // 树干边框
            ctx.strokeStyle = '#5D3A1A';
            ctx.lineWidth = 2;
            ctx.strokeRect(0, 0, CONFIG.TRUNK_WIDTH, CONFIG.TRUNK_HEIGHT);

            // 如果有树枝也一起绘制
            if (trunk.branch !== 'none') {
                const branchY = 10;

                if (trunk.branch === 'left') {
                    // 树枝主体
                    ctx.fillStyle = '#8B5A2B';
                    ctx.fillRect(-CONFIG.BRANCH_WIDTH, branchY, CONFIG.BRANCH_WIDTH, CONFIG.BRANCH_HEIGHT);
                    // 树枝高光
                    ctx.fillStyle = '#A0724A';
                    ctx.fillRect(-CONFIG.BRANCH_WIDTH, branchY, CONFIG.BRANCH_WIDTH, 6);
                    // 树枝边框
                    ctx.strokeStyle = '#5D3A1A';
                    ctx.strokeRect(-CONFIG.BRANCH_WIDTH, branchY, CONFIG.BRANCH_WIDTH, CONFIG.BRANCH_HEIGHT);
                } else {
                    // 树枝主体
                    ctx.fillStyle = '#8B5A2B';
                    ctx.fillRect(CONFIG.TRUNK_WIDTH, branchY, CONFIG.BRANCH_WIDTH, CONFIG.BRANCH_HEIGHT);
                    // 树枝高光
                    ctx.fillStyle = '#A0724A';
                    ctx.fillRect(CONFIG.TRUNK_WIDTH, branchY, CONFIG.BRANCH_WIDTH, 6);
                    // 树枝边框
                    ctx.strokeStyle = '#5D3A1A';
                    ctx.strokeRect(CONFIG.TRUNK_WIDTH, branchY, CONFIG.BRANCH_WIDTH, CONFIG.BRANCH_HEIGHT);
                }
            }

            ctx.restore();
        }
    },

    // 清空所有树干（游戏重置时调用）
    clear() {
        // 将所有活跃树干放回池中
        while (this.active.length > 0) {
            this.release(this.active[0]);
        }
    },

    // 获取统计信息（调试用）
    getStats() {
        return {
            poolSize: this.pool.length,
            activeCount: this.active.length,
            total: this.pool.length + this.active.length
        };
    }
};

// ============ 振动反馈系统 (Haptics API) ============
const haptics = {
    enabled: true,

    // 检查是否支持振动
    isSupported() {
        return 'vibrate' in navigator;
    },

    // 砍树振动（短促）
    chop() {
        if (!this.enabled || !this.isSupported()) return;
        navigator.vibrate(30);
    },

    // 游戏结束振动（稍长）
    gameOver() {
        if (!this.enabled || !this.isSupported()) return;
        navigator.vibrate(150);
    },

    // 成就解锁振动（双击模式）
    achievement() {
        if (!this.enabled || !this.isSupported()) return;
        navigator.vibrate([50, 50, 50]); // 振动-暂停-振动
    },

    // 时间紧迫振动（轻微）
    warning() {
        if (!this.enabled || !this.isSupported()) return;
        navigator.vibrate(15);
    }
};

// ============ 音效系统 ============
const audio = {
    ctx: null,
    enabled: true,
    bgmEnabled: true,
    bgmGain: null,       // 背景音乐音量控制
    bgmInterval: null,   // 背景音乐循环定时器
    bgmPlaying: false,   // 背景音乐是否正在播放

    // 背景音乐配置 - 8-bit 像素风格旋律
    bgmConfig: {
        tempo: 140,          // BPM
        // 简单的旋律音符序列 (C大调)
        melody: [
            // 小节1: 欢快的上行
            { note: 'C4', duration: 0.25 },
            { note: 'E4', duration: 0.25 },
            { note: 'G4', duration: 0.25 },
            { note: 'C5', duration: 0.25 },
            // 小节2: 下行
            { note: 'B4', duration: 0.25 },
            { note: 'G4', duration: 0.25 },
            { note: 'E4', duration: 0.25 },
            { note: 'D4', duration: 0.25 },
            // 小节3: 重复变化
            { note: 'C4', duration: 0.25 },
            { note: 'D4', duration: 0.25 },
            { note: 'E4', duration: 0.25 },
            { note: 'G4', duration: 0.25 },
            // 小节4: 结束
            { note: 'A4', duration: 0.25 },
            { note: 'G4', duration: 0.25 },
            { note: 'E4', duration: 0.5 },
        ],
        // 伴奏低音
        bass: [
            { note: 'C2', duration: 0.5 },
            { note: 'G2', duration: 0.5 },
            { note: 'C2', duration: 0.5 },
            { note: 'G2', duration: 0.5 },
            { note: 'A2', duration: 0.5 },
            { note: 'E2', duration: 0.5 },
            { note: 'F2', duration: 0.5 },
            { note: 'G2', duration: 0.5 },
        ]
    },

    // 音符频率映射表
    noteFreq: {
        'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
        'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'E5': 659.26, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77
    },

    // 初始化音频上下文
    init() {
        if (this.ctx) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            // 创建背景音乐主音量控制节点
            this.bgmGain = this.ctx.createGain();
            this.bgmGain.gain.value = 0.15; // 背景音乐音量较低
            this.bgmGain.connect(this.ctx.destination);
        } catch (e) {
            console.warn('Web Audio API 不支持');
            this.enabled = false;
        }
    },

    // 恢复音频上下文（需要用户交互后调用）
    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    // 播放砍树音效（根据连击数调整音调）
    playChop(comboCount = 0) {
        if (!this.enabled || !this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // 根据连击数计算音调倍数
        const pitchMultiplier = 1 + (comboCount / CONFIG.COMBO.COMBO_FOR_MAX_PITCH) * CONFIG.COMBO.MAX_PITCH_BONUS;
        const basePitch = 150 * Math.min(pitchMultiplier, 1 + CONFIG.COMBO.MAX_PITCH_BONUS);
        const endPitch = 50 * Math.min(pitchMultiplier, 1 + CONFIG.COMBO.MAX_PITCH_BONUS);

        // 短促的打击音效，连击越高音调越高
        osc.type = 'square';
        osc.frequency.setValueAtTime(basePitch, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endPitch, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.1);
    },

    // 播放游戏结束音效
    playGameOver() {
        if (!this.enabled || !this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        // 下降音调表示失败
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);

        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.5);
    },

    // 播放时间警告音效
    playTimeWarning() {
        if (!this.enabled || !this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.15);
    },

    // 播放成就解锁音效
    playAchievement() {
        if (!this.enabled || !this.ctx) return;

        // 上升音阶表示成就解锁
        const notes = [523, 659, 784]; // C5, E5, G5 和弦
        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.1);

            gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.1 + 0.3);

            osc.start(this.ctx.currentTime + i * 0.1);
            osc.stop(this.ctx.currentTime + i * 0.1 + 0.3);
        });
    },

    // 播放单个音符（用于背景音乐）
    playNote(noteOrFreq, duration, waveType = 'square', gainNode = null) {
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.connect(noteGain);
        noteGain.connect(gainNode || this.bgmGain);

        // 获取频率
        const freq = typeof noteOrFreq === 'string' ? this.noteFreq[noteOrFreq] : noteOrFreq;
        if (!freq) return;

        osc.type = waveType;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // ADSR 包络（简化版）
        const attackTime = 0.01;
        const decayTime = 0.05;
        const sustainLevel = 0.7;
        const releaseTime = 0.1;

        const now = this.ctx.currentTime;
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.3, now + attackTime);
        noteGain.gain.linearRampToValueAtTime(0.3 * sustainLevel, now + attackTime + decayTime);
        noteGain.gain.setValueAtTime(0.3 * sustainLevel, now + duration - releaseTime);
        noteGain.gain.linearRampToValueAtTime(0.001, now + duration);

        osc.start(now);
        osc.stop(now + duration);
    },

    // 开始播放背景音乐
    startBGM() {
        if (!this.bgmEnabled || !this.ctx || this.bgmPlaying) return;
        this.bgmPlaying = true;

        const beatDuration = 60 / this.bgmConfig.tempo; // 一拍的时长（秒）
        let melodyIndex = 0;
        let bassIndex = 0;
        let melodyTime = 0;
        let bassTime = 0;

        // 使用 setTimeout 循环播放
        const playLoop = () => {
            if (!this.bgmPlaying || !this.bgmEnabled) {
                this.bgmInterval = null;
                return;
            }

            const now = this.ctx.currentTime;

            // 播放旋律音符
            if (melodyTime <= 0) {
                const note = this.bgmConfig.melody[melodyIndex];
                this.playNote(note.note, beatDuration * note.duration * 0.9, 'square');
                melodyTime = beatDuration * note.duration;
                melodyIndex = (melodyIndex + 1) % this.bgmConfig.melody.length;
            }

            // 播放低音
            if (bassTime <= 0) {
                const bass = this.bgmConfig.bass[bassIndex];
                this.playNote(bass.note, beatDuration * bass.duration * 0.8, 'triangle');
                bassTime = beatDuration * bass.duration;
                bassIndex = (bassIndex + 1) % this.bgmConfig.bass.length;
            }

            // 更新时间
            const stepTime = 50; // 50ms 步进
            melodyTime -= stepTime / 1000;
            bassTime -= stepTime / 1000;

            this.bgmInterval = setTimeout(playLoop, stepTime);
        };

        playLoop();
    },

    // 停止背景音乐
    stopBGM() {
        this.bgmPlaying = false;
        if (this.bgmInterval) {
            clearTimeout(this.bgmInterval);
            this.bgmInterval = null;
        }
    },

    // 暂停背景音乐
    pauseBGM() {
        if (this.bgmGain) {
            this.bgmGain.gain.value = 0;
        }
    },

    // 恢复背景音乐
    resumeBGM() {
        if (this.bgmGain && this.bgmEnabled) {
            this.bgmGain.gain.value = 0.15;
        }
    },

    // 设置背景音乐开关
    setBGMEnabled(enabled) {
        this.bgmEnabled = enabled;
        if (enabled) {
            this.resumeBGM();
        } else {
            this.pauseBGM();
        }
    }
};

// ============ 游戏状态 ============
const game = {
    canvas: null,
    ctx: null,
    isRunning: false,
    isPaused: false,
    score: 0,
    highScore: 0,
    timeLeft: CONFIG.INITIAL_TIME,
    lastTime: 0,
    lastWarningTime: 0,  // 上次警告音播放时间

    // 连击系统
    combo: {
        count: 0,          // 当前连击数
        maxCount: 0,       // 本局最高连击
        lastChopTime: 0,   // 上次砍树时间
        showTimer: 0       // 连击显示计时器（用于动画）
    },

    // 玩家状态
    player: {
        side: 'left',      // 'left' 或 'right'
        isChopping: false,
        chopTimer: 0
    },

    // 树干数组 (从下到上)
    // 每个元素: { branch: 'none' | 'left' | 'right' }
    trunks: [],

    // 飞出树干使用全局 flyingTrunkPool 对象池
    // 粒子系统使用全局 particlePool 对象池

    // 屏幕震动效果
    screenShake: {
        intensity: 0,      // 当前震动强度
        duration: 0,       // 剩余持续时间
        offsetX: 0,        // 当前 X 偏移
        offsetY: 0         // 当前 Y 偏移
    }
};

// ============ DOM 元素 ============
let elements = {};

// ============ 触摸区域指示系统 ============
const touchZones = {
    enabled: false,      // 是否启用触摸区域指示
    visible: false,      // 当前是否可见
    container: null,
    leftZone: null,
    rightZone: null,
    leftRipple: null,
    rightRipple: null,

    // 检测是否为触摸设备
    isTouchDevice() {
        return 'ontouchstart' in window ||
               navigator.maxTouchPoints > 0 ||
               window.matchMedia('(pointer: coarse)').matches;
    },

    // 初始化
    init() {
        this.enabled = this.isTouchDevice();
        if (!this.enabled) return;

        // 获取元素
        this.container = document.getElementById('touch-zones');
        if (!this.container) return;

        this.leftZone = this.container.querySelector('.touch-zone-left');
        this.rightZone = this.container.querySelector('.touch-zone-right');
        this.leftRipple = this.leftZone.querySelector('.touch-ripple');
        this.rightRipple = this.rightZone.querySelector('.touch-ripple');
    },

    // 显示触摸区域（游戏开始时）
    show() {
        if (!this.enabled || !this.container) return;
        this.visible = true;
        this.container.classList.remove('hidden');
        this.container.classList.add('show-hint');
        this.container.classList.remove('fade-out');
    },

    // 隐藏触摸区域
    hide() {
        if (!this.enabled || !this.container) return;
        this.visible = false;
        this.container.classList.add('hidden');
        this.container.classList.remove('show-hint', 'fade-out');
    },

    // 开始淡出（游戏开始后）
    startFadeOut() {
        if (!this.enabled || !this.container) return;
        this.container.classList.remove('show-hint');
        this.container.classList.add('fade-out');
    },

    // 触摸反馈（波纹效果）
    triggerRipple(side, x, y) {
        if (!this.enabled || !this.visible) return;

        const zone = side === 'left' ? this.leftZone : this.rightZone;
        const ripple = side === 'left' ? this.leftRipple : this.rightRipple;

        if (!zone || !ripple) return;

        // 高亮区域
        zone.classList.add('active');
        setTimeout(() => zone.classList.remove('active'), 150);

        // 定位波纹到触摸点
        const rect = zone.getBoundingClientRect();
        const rippleX = x - rect.left - 40; // 40 = 波纹宽度/2
        const rippleY = y - rect.top - 40;
        ripple.style.left = `${rippleX}px`;
        ripple.style.top = `${rippleY}px`;

        // 触发波纹动画
        ripple.classList.remove('animate');
        void ripple.offsetWidth; // 强制重绘
        ripple.classList.add('animate');

        // 动画结束后移除类
        setTimeout(() => ripple.classList.remove('animate'), 400);
    }
};

// ============ 初始化 ============
function init() {
    // 获取 DOM 元素
    elements = {
        canvas: document.getElementById('gameCanvas'),
        scoreDisplay: document.getElementById('score'),
        difficultyLevel: document.getElementById('difficulty-level'),
        comboDisplay: document.getElementById('combo-display'),
        timerFill: document.getElementById('timer-fill'),
        startScreen: document.getElementById('start-screen'),
        gameOverScreen: document.getElementById('game-over-screen'),
        finalScore: document.getElementById('final-score'),
        highScore: document.getElementById('high-score'),
        maxCombo: document.getElementById('max-combo'),
        startBtn: document.getElementById('start-btn'),
        restartBtn: document.getElementById('restart-btn'),
        title: document.getElementById('title'),
        achievementsBtn: document.getElementById('achievements-btn'),
        achievementsScreen: document.getElementById('achievements-screen'),
        achievementsBackBtn: document.getElementById('achievements-back-btn'),
        pauseScreen: document.getElementById('pause-screen'),
        resumeBtn: document.getElementById('resume-btn'),
        muteBtn: document.getElementById('mute-btn'),
        skinsBtn: document.getElementById('skin-btn'),
        skinsScreen: document.getElementById('skin-screen'),
        skinsBackBtn: document.getElementById('skin-back-btn'),
        skinPreviewCanvas: document.getElementById('skin-preview-canvas'),
        skinPreviewName: document.getElementById('skin-preview-name'),
        // 每日挑战相关元素
        dailyBtn: document.getElementById('daily-btn'),
        dailyScreen: document.getElementById('daily-screen'),
        dailyBackBtn: document.getElementById('daily-back-btn'),
        dailyStartBtn: document.getElementById('daily-start-btn'),
        dailyDate: document.getElementById('daily-date'),
        dailyBestScore: document.getElementById('daily-best-score'),
        dailyTotalAttempts: document.getElementById('daily-total-attempts'),
        // 每日挑战结束界面
        dailyGameOverScreen: document.getElementById('daily-game-over-screen'),
        dailyFinalScore: document.getElementById('daily-final-score'),
        dailyHighScore: document.getElementById('daily-high-score'),
        dailyAttempts: document.getElementById('daily-attempts'),
        dailyMaxCombo: document.getElementById('daily-max-combo'),
        dailyNewRecord: document.getElementById('daily-new-record'),
        dailyRetryBtn: document.getElementById('daily-retry-btn'),
        dailyExitBtn: document.getElementById('daily-exit-btn')
    };

    // 设置画布
    game.canvas = elements.canvas;
    game.ctx = game.canvas.getContext('2d');

    // 设置画布尺寸
    resizeCanvas();

    // 加载最高分
    game.highScore = parseInt(localStorage.getItem('timberman_highscore') || '0');
    elements.highScore.textContent = game.highScore;

    // 加载成就
    ACHIEVEMENTS.load();

    // 加载皮肤
    SKINS.load();
    // 根据最高分解锁皮肤
    SKINS.checkUnlocks(game.highScore);

    // 加载每日挑战数据
    DAILY_CHALLENGE.load();

    // 绑定事件
    bindEvents();

    // 初始化音频系统
    audio.init();

    // 初始化对象池
    particlePool.init();
    flyingTrunkPool.init();

    // 初始化触摸区域指示（仅触摸设备）
    touchZones.init();

    // 加载静音设置
    loadMuteSetting();

    // 绘制初始画面
    draw();
}

// 调整画布尺寸
function resizeCanvas() {
    const container = game.canvas.parentElement;
    const rect = container.getBoundingClientRect();

    game.canvas.width = CONFIG.WIDTH;
    game.canvas.height = CONFIG.HEIGHT;

    // CSS 缩放适配容器
    const scale = Math.min(rect.width / CONFIG.WIDTH, rect.height / CONFIG.HEIGHT);
    game.canvas.style.width = `${CONFIG.WIDTH * scale}px`;
    game.canvas.style.height = `${CONFIG.HEIGHT * scale}px`;
}

// 绑定事件
function bindEvents() {
    // 键盘控制
    document.addEventListener('keydown', handleKeyDown);

    // 触摸/点击控制
    game.canvas.addEventListener('click', handleClick);
    game.canvas.addEventListener('touchstart', handleTouch, { passive: false });

    // 按钮
    elements.startBtn.addEventListener('click', startGame);
    elements.restartBtn.addEventListener('click', startGame);

    // 成就页面按钮
    elements.achievementsBtn.addEventListener('click', showAchievements);
    elements.achievementsBackBtn.addEventListener('click', hideAchievements);

    // 暂停/继续按钮
    elements.resumeBtn.addEventListener('click', resumeGame);

    // 静音按钮
    elements.muteBtn.addEventListener('click', toggleMute);

    // 皮肤选择按钮
    elements.skinsBtn.addEventListener('click', showSkinsScreen);
    elements.skinsBackBtn.addEventListener('click', hideSkinsScreen);

    // 每日挑战按钮
    elements.dailyBtn.addEventListener('click', showDailyScreen);
    elements.dailyBackBtn.addEventListener('click', hideDailyScreen);
    elements.dailyStartBtn.addEventListener('click', startDailyChallenge);
    elements.dailyRetryBtn.addEventListener('click', startDailyChallenge);
    elements.dailyExitBtn.addEventListener('click', dailyReturnToStart);

    // 窗口调整
    window.addEventListener('resize', resizeCanvas);
}

// 显示成就页面
function showAchievements() {
    ACHIEVEMENTS.render();
    elements.gameOverScreen.classList.add('hidden');
    elements.achievementsScreen.classList.remove('hidden');
}

// 隐藏成就页面
function hideAchievements() {
    elements.achievementsScreen.classList.add('hidden');
    elements.gameOverScreen.classList.remove('hidden');
}

// ============ 皮肤选择功能 ============

// 显示皮肤解锁通知
function showSkinUnlockNotification(skin) {
    // 延迟显示，让成就弹窗先显示完
    setTimeout(() => {
        const popup = document.getElementById('skin-unlock-popup');
        const nameEl = document.getElementById('skin-unlock-name');
        const iconEl = popup.querySelector('.skin-popup-icon');

        iconEl.textContent = skin.icon;
        nameEl.textContent = skin.name;

        popup.classList.remove('hidden');
        audio.playAchievement();
        haptics.achievement();

        // 3秒后自动隐藏
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 3000);
    }, 3500); // 延迟3.5秒，避免和成就弹窗重叠
}

// 渲染皮肤列表
function renderSkinsList() {
    const list = document.getElementById('skin-list');
    list.innerHTML = '';

    const allSkins = SKINS.getAll();
    const currentSkin = SKINS.currentSkin;

    allSkins.forEach(skin => {
        const item = document.createElement('div');
        item.className = `skin-item ${skin.unlocked ? 'unlocked' : 'locked'} ${skin.id === currentSkin ? 'selected' : ''}`;
        item.dataset.skinId = skin.id;

        let unlockHint = '';
        let selectedBadge = '';
        if (!skin.unlocked && skin.unlockCondition) {
            unlockHint = `<span class="skin-unlock-hint">🔒 ${skin.unlockCondition.value}分解锁</span>`;
        } else if (skin.id === currentSkin) {
            selectedBadge = '<span class="skin-selected-badge">✓ 使用中</span>';
        }

        // 创建 Canvas 预览容器
        const previewContainer = document.createElement('div');
        previewContainer.className = 'skin-preview-container';

        // 创建预览 Canvas
        const canvas = document.createElement('canvas');
        canvas.className = 'skin-preview-canvas';
        canvas.width = 80;
        canvas.height = 100;
        previewContainer.appendChild(canvas);

        // 绘制角色预览
        drawSkinPreview(canvas, skin);

        item.appendChild(previewContainer);

        // 添加文字信息
        const infoDiv = document.createElement('div');
        infoDiv.className = 'skin-info';
        infoDiv.innerHTML = `
            <span class="skin-name">${skin.name}</span>
            <span class="skin-desc">${skin.desc}</span>
            ${unlockHint}
            ${selectedBadge}
        `;
        item.appendChild(infoDiv);

        if (skin.unlocked) {
            item.addEventListener('click', () => selectSkin(skin.id));
        }

        list.appendChild(item);
    });

    // 更新解锁进度
    document.getElementById('skin-unlocked-count').textContent = SKINS.getUnlockedCount();
}

// 在小型 Canvas 上绘制皮肤预览
function drawSkinPreview(canvas, skin) {
    const ctx = canvas.getContext('2d');
    const colors = skin.colors;
    const isLocked = !skin.unlocked;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 缩放和偏移参数（适配 80x100 的预览区域）
    const scale = 0.85;
    const offsetX = 10;
    const offsetY = 10;

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    // 如果未解锁，使用灰色调
    if (isLocked) {
        ctx.filter = 'grayscale(100%) brightness(0.6)';
    }

    // 黄金皮肤光晕效果
    if (colors.hasGlow && !isLocked) {
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 10;
    }

    // 腿
    ctx.fillStyle = colors.pants;
    ctx.fillRect(17, 60, 11, 20);
    ctx.fillRect(32, 60, 11, 20);
    // 裤子高光
    ctx.fillStyle = colors.pantsHighlight;
    ctx.fillRect(17, 60, 3, 18);
    ctx.fillRect(32, 60, 3, 18);
    // 鞋子
    ctx.fillStyle = colors.shoes;
    ctx.fillRect(15, 77, 14, 5);
    ctx.fillRect(31, 77, 14, 5);

    // 身体
    ctx.fillStyle = colors.body;
    ctx.fillRect(15, 28, 30, 32);
    // 衣服高光
    ctx.fillStyle = colors.bodyHighlight;
    ctx.fillRect(15, 28, 5, 30);
    // 衣服阴影
    ctx.fillStyle = colors.bodyShadow;
    ctx.fillRect(40, 28, 5, 30);

    // 机器人特殊：身体纹路
    if (colors.hasAntenna) {
        ctx.fillStyle = '#37474F';
        ctx.fillRect(22, 35, 16, 2);
        ctx.fillRect(22, 42, 16, 2);
        ctx.fillRect(22, 49, 16, 2);
    } else {
        // 衣服纽扣（非机器人）
        ctx.fillStyle = '#FFF';
        ctx.fillRect(28, 35, 4, 4);
        ctx.fillRect(28, 45, 4, 4);
    }

    // 手臂
    ctx.fillStyle = colors.skin;
    ctx.fillRect(8, 30, 8, 20);
    ctx.fillRect(44, 30, 8, 20);

    // 头
    ctx.fillStyle = colors.skin;
    ctx.beginPath();
    ctx.arc(30, 15, 15, 0, Math.PI * 2);
    ctx.fill();

    // 忍者面罩
    if (colors.hasMask) {
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(15, 10, 30, 10);
    } else {
        // 脸颊红晕（非忍者）
        ctx.fillStyle = 'rgba(255, 150, 150, 0.5)';
        ctx.beginPath();
        ctx.arc(20, 18, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(40, 18, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    // 重置阴影
    ctx.shadowBlur = 0;

    // 眼睛
    if (colors.eyeColor && !isLocked) {
        ctx.fillStyle = colors.eyeColor;
        ctx.shadowColor = colors.eyeColor;
        ctx.shadowBlur = 5;
    } else {
        ctx.fillStyle = '#333';
    }
    ctx.fillRect(24, 12, 4, 5);
    ctx.fillRect(34, 12, 4, 5);
    ctx.shadowBlur = 0;

    // 眼睛高光（非机器人）
    if (!colors.eyeColor) {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(25, 12, 2, 2);
        ctx.fillRect(35, 12, 2, 2);
    }

    // 嘴巴 - 忍者没有嘴巴显示
    if (!colors.hasMask) {
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(28, 22, 6, 2);
    }

    // 帽子
    ctx.fillStyle = colors.hat;
    ctx.fillRect(15, -2, 30, 12);
    // 帽檐
    ctx.fillStyle = colors.hatBrim;
    ctx.fillRect(10, 8, 40, 6);
    // 帽子高光
    ctx.fillStyle = colors.hatHighlight;
    ctx.fillRect(17, 0, 8, 8);

    // 机器人天线
    if (colors.hasAntenna) {
        ctx.fillStyle = '#455A64';
        ctx.fillRect(28, -12, 4, 10);
        // 天线顶部发光球
        if (!isLocked) {
            ctx.fillStyle = '#00E5FF';
            ctx.shadowColor = '#00E5FF';
            ctx.shadowBlur = 6;
        } else {
            ctx.fillStyle = '#666';
        }
        ctx.beginPath();
        ctx.arc(30, -15, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // 胡子（如果有）
    if (colors.beard) {
        ctx.fillStyle = colors.beard;
        ctx.fillRect(22, 24, 18, 4);
    }

    ctx.restore();

    // 如果未解锁，绘制锁定图标
    if (isLocked) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 锁图标
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔒', canvas.width / 2, canvas.height / 2);
    }
}

// 更新主预览区域的皮肤预览
function updateMainSkinPreview(skinId) {
    const canvas = document.getElementById('skin-preview-canvas');
    const nameEl = document.getElementById('skin-preview-name');
    if (!canvas || !nameEl) return;

    const skin = SKINS.definitions.find(s => s.id === skinId) || SKINS.definitions[0];
    const skinWithStatus = {
        ...skin,
        unlocked: true // 主预览始终显示解锁状态
    };
    drawSkinPreview(canvas, skinWithStatus);
    nameEl.textContent = skin.name;
}

// 显示皮肤选择界面
function showSkinsScreen() {
    renderSkinsList();
    // 初始化主预览为当前选中的皮肤
    updateMainSkinPreview(SKINS.currentSkin);
    elements.startScreen.classList.add('hidden');
    elements.skinsScreen.classList.remove('hidden');
}

// 隐藏皮肤选择界面
function hideSkinsScreen() {
    elements.skinsScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
}

// 选择皮肤
function selectSkin(skinId) {
    if (SKINS.select(skinId)) {
        // 播放选择音效
        audio.playChop(0);
        haptics.chop();

        // 更新主预览区域
        updateMainSkinPreview(skinId);

        // 重新渲染列表
        renderSkinsList();
    }
}

// 加载静音设置
function loadMuteSetting() {
    const muted = localStorage.getItem('timberman_muted') === 'true';
    audio.enabled = !muted;
    audio.bgmEnabled = !muted;
    haptics.enabled = !muted; // 振动也跟随静音设置
    updateMuteButton();
}

// 切换静音状态
function toggleMute() {
    audio.enabled = !audio.enabled;
    audio.setBGMEnabled(audio.enabled);
    haptics.enabled = audio.enabled; // 振动也跟随静音设置
    localStorage.setItem('timberman_muted', (!audio.enabled).toString());
    updateMuteButton();
}

// 更新静音按钮显示
function updateMuteButton() {
    if (audio.enabled) {
        elements.muteBtn.textContent = '🔊';
        elements.muteBtn.classList.remove('muted');
        elements.muteBtn.title = '点击静音';
    } else {
        elements.muteBtn.textContent = '🔇';
        elements.muteBtn.classList.add('muted');
        elements.muteBtn.title = '点击开启音效';
    }
}

// 暂停游戏
function pauseGame() {
    if (!game.isRunning || game.isPaused) return;
    game.isPaused = true;
    elements.pauseScreen.classList.remove('hidden');
    // 暂停背景音乐
    audio.pauseBGM();
}

// 继续游戏
function resumeGame() {
    if (!game.isPaused) return;
    game.isPaused = false;
    elements.pauseScreen.classList.add('hidden');
    // 恢复背景音乐
    audio.resumeBGM();
    // 重置时间戳避免跳帧
    game.lastTime = performance.now();
    game.combo.lastChopTime = performance.now() - (CONFIG.COMBO.TIMEOUT - 100); // 保持连击但给一点缓冲
    requestAnimationFrame(gameLoop);
}

// 切换暂停状态
function togglePause() {
    if (game.isPaused) {
        resumeGame();
    } else {
        pauseGame();
    }
}

// ============ 输入处理 ============
function handleKeyDown(e) {
    // 空格键/回车键 - 开始/重新开始游戏
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!game.isRunning && !game.isPaused) {
            // 如果在成就页面，先返回
            if (!elements.achievementsScreen.classList.contains('hidden')) {
                hideAchievements();
                return;
            }
            startGame();
        } else if (game.isPaused) {
            // 暂停时按空格继续
            resumeGame();
        }
        return;
    }

    // 暂停/继续处理（ESC 或 P 键）
    if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        // 如果在成就页面，返回游戏结束界面
        if (!elements.achievementsScreen.classList.contains('hidden')) {
            hideAchievements();
            return;
        }
        if (game.isRunning || game.isPaused) {
            togglePause();
        }
        return;
    }

    // 暂停时不处理其他按键
    if (!game.isRunning || game.isPaused) return;

    // 支持方向键和 A/D 键控制
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        chop('left');
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        chop('right');
    }
}

function handleClick(e) {
    if (!game.isRunning || game.isPaused) return;

    const rect = game.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;

    chop(x < centerX ? 'left' : 'right');
}

function handleTouch(e) {
    e.preventDefault();
    if (!game.isRunning || game.isPaused) return;

    const touch = e.touches[0];
    const rect = game.canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const centerX = rect.width / 2;
    const side = x < centerX ? 'left' : 'right';

    // 触发触摸区域波纹效果
    touchZones.triggerRipple(side, touch.clientX, touch.clientY);

    chop(side);
}

// ============ 游戏逻辑 ============

// 计算当前难度等级（基于分数）
function getDifficultyLevel() {
    const level = Math.floor(game.score / CONFIG.DIFFICULTY.SCORE_PER_LEVEL);
    return Math.min(level, CONFIG.DIFFICULTY.MAX_LEVEL);
}

// 获取当前时间衰减速度
function getCurrentTimeDecay() {
    const level = getDifficultyLevel();
    return CONFIG.TIME_DECAY * (1 + level * CONFIG.DIFFICULTY.DECAY_MULTIPLIER);
}

// 获取当前砍树时间奖励
function getCurrentTimeBonus() {
    const level = getDifficultyLevel();
    const bonus = CONFIG.TIME_BONUS - level * CONFIG.DIFFICULTY.TIME_BONUS_DECAY;
    return Math.max(bonus, 3); // 最少奖励 3 点时间
}

// 开始游戏
function startGame() {
    // 恢复音频上下文（需要用户交互）
    audio.resume();

    // 重置状态
    game.score = 0;
    game.timeLeft = CONFIG.INITIAL_TIME;
    game.player.side = 'left';
    game.player.isChopping = false;
    game.isRunning = true;
    flyingTrunkPool.clear(); // 清空飞出树干对象池
    particlePool.clear();    // 清空粒子对象池
    game.lastWarningTime = 0;

    // 重置连击系统
    game.combo.count = 0;
    game.combo.maxCount = 0;
    game.combo.lastChopTime = 0;
    game.combo.showTimer = 0;

    // 重置成就单局统计
    ACHIEVEMENTS.resetRoundStats();

    // 初始化树干
    initTrunks();

    // 隐藏界面
    elements.startScreen.classList.add('hidden');
    elements.gameOverScreen.classList.add('hidden');
    elements.title.style.display = 'none';

    // 更新 UI
    updateUI();

    // 显示触摸区域指示（移动端）
    touchZones.show();
    // 2秒后开始淡出
    setTimeout(() => touchZones.startFadeOut(), 2000);

    // 开始背景音乐
    audio.startBGM();

    // 开始游戏循环
    game.lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

// ============ 每日挑战功能 ============

// 开始每日挑战
function startDailyChallenge() {
    // 初始化每日挑战（生成固定序列）
    DAILY_CHALLENGE.initChallenge();

    // 恢复音频上下文
    audio.resume();

    // 重置状态（与 startGame 相同）
    game.score = 0;
    game.timeLeft = CONFIG.INITIAL_TIME;
    game.player.side = 'left';
    game.player.isChopping = false;
    game.isRunning = true;
    flyingTrunkPool.clear();
    particlePool.clear();
    game.lastWarningTime = 0;

    // 重置连击系统
    game.combo.count = 0;
    game.combo.maxCount = 0;
    game.combo.lastChopTime = 0;
    game.combo.showTimer = 0;

    // 重置成就单局统计
    ACHIEVEMENTS.resetRoundStats();

    // 初始化树干
    initTrunks();

    // 隐藏界面
    elements.startScreen.classList.add('hidden');
    elements.dailyScreen.classList.add('hidden');
    elements.dailyGameOverScreen.classList.add('hidden');
    elements.title.style.display = 'none';

    // 更新 UI
    updateUI();

    // 显示触摸区域指示
    touchZones.show();
    setTimeout(() => touchZones.startFadeOut(), 2000);

    // 开始背景音乐
    audio.startBGM();

    // 开始游戏循环
    game.lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

// 显示每日挑战界面
function showDailyScreen() {
    const info = DAILY_CHALLENGE.getInfo();
    elements.dailyDate.textContent = info.date;
    elements.dailyBestScore.textContent = info.highScore;
    elements.dailyTotalAttempts.textContent = info.attempts;

    elements.startScreen.classList.add('hidden');
    elements.dailyScreen.classList.remove('hidden');
}

// 隐藏每日挑战界面
function hideDailyScreen() {
    elements.dailyScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
}

// 从每日挑战结束界面返回开始界面
function dailyReturnToStart() {
    elements.dailyGameOverScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
    elements.title.style.display = 'block';
}

// 初始化树干
function initTrunks() {
    game.trunks = [];
    for (let i = 0; i < CONFIG.TRUNK_COUNT; i++) {
        game.trunks.push({
            branch: generateBranch(i < 2) // 底部两节不生成树枝
        });
    }
}

// 生成树枝 (随机左/右/无)
function generateBranch(forceNone = false) {
    if (forceNone) return 'none';

    // 每日挑战模式使用预生成的序列
    if (DAILY_CHALLENGE.isActive) {
        return DAILY_CHALLENGE.getNextBranch(forceNone);
    }

    // 普通模式随机生成
    const rand = Math.random();
    if (rand < 0.3) return 'left';
    if (rand < 0.6) return 'right';
    return 'none';
}

// 砍树动作
function chop(side) {
    if (game.player.isChopping) return;

    // 移动伐木工
    game.player.side = side;
    game.player.isChopping = true;
    game.player.chopTimer = CONFIG.CHOP_ANIMATION_DURATION;

    // 检查碰撞 (砍之前检查，因为砍完树干会下落)
    const bottomTrunk = game.trunks[0];
    if (bottomTrunk.branch === side) {
        gameOver();
        return;
    }

    // 更新连击系统
    const now = performance.now();
    if (now - game.combo.lastChopTime < CONFIG.COMBO.TIMEOUT) {
        // 在连击时间内，连击+1
        game.combo.count++;
        game.combo.showTimer = 500; // 显示连击动画
    } else {
        // 超时，重置连击
        game.combo.count = 1;
    }
    game.combo.lastChopTime = now;

    // 更新最高连击
    if (game.combo.count > game.combo.maxCount) {
        game.combo.maxCount = game.combo.count;
    }

    // 播放砍树音效（传入连击数调整音调）
    audio.playChop(game.combo.count);

    // 触摸振动反馈
    haptics.chop();

    // 生成木屑粒子特效（使用对象池）
    const particleX = side === 'left' ? CONFIG.TRUNK_X : CONFIG.TRUNK_X + CONFIG.TRUNK_WIDTH;
    const particleY = CONFIG.GROUND_Y - CONFIG.TRUNK_HEIGHT / 2;
    particlePool.spawn(particleX, particleY, side);

    // 创建飞出动画（使用对象池）- 树干向玩家对面方向飞出
    flyingTrunkPool.spawn(
        CONFIG.TRUNK_X,
        CONFIG.GROUND_Y - CONFIG.TRUNK_HEIGHT,
        side,
        bottomTrunk.branch
    );

    // 移除底部树干，顶部添加新树干
    game.trunks.shift();
    game.trunks.push({
        branch: generateBranch()
    });

    // 增加分数和时间（使用动态奖励）
    game.score++;
    game.timeLeft = Math.min(game.timeLeft + getCurrentTimeBonus(), CONFIG.MAX_TIME);

    // 检查成就
    const level = getDifficultyLevel() + 1;
    ACHIEVEMENTS.check(game.score, game.combo.count, level);
    ACHIEVEMENTS.checkSurvivor(game.timeLeft);

    // 更新 UI
    updateUI();
}

// 触发屏幕震动
function triggerScreenShake(intensity = 15, duration = 300) {
    game.screenShake.intensity = intensity;
    game.screenShake.duration = duration;
}

// 更新屏幕震动
function updateScreenShake(deltaTime) {
    if (game.screenShake.duration > 0) {
        game.screenShake.duration -= deltaTime;
        // 随机震动偏移
        const progress = game.screenShake.duration / 300;
        const currentIntensity = game.screenShake.intensity * progress;
        game.screenShake.offsetX = (Math.random() - 0.5) * currentIntensity * 2;
        game.screenShake.offsetY = (Math.random() - 0.5) * currentIntensity * 2;
    } else {
        game.screenShake.offsetX = 0;
        game.screenShake.offsetY = 0;
        game.screenShake.intensity = 0;
    }
}

// 游戏结束
function gameOver() {
    game.isRunning = false;

    // 停止背景音乐
    audio.stopBGM();

    // 隐藏触摸区域指示
    touchZones.hide();

    // 触发 CSS 屏幕震动效果
    const container = document.getElementById('game-container');
    container.classList.add('screen-shake');
    setTimeout(() => container.classList.remove('screen-shake'), 400);

    // 播放游戏结束音效
    audio.playGameOver();

    // 振动反馈
    haptics.gameOver();

    // 每日挑战模式处理
    const isDaily = DAILY_CHALLENGE.isActive;
    if (isDaily) {
        const isNewRecord = DAILY_CHALLENGE.updateHighScore(game.score);
        DAILY_CHALLENGE.endChallenge();

        // 更新每日挑战结束界面
        elements.dailyFinalScore.textContent = game.score;
        elements.dailyHighScore.textContent = DAILY_CHALLENGE.todayHighScore;
        elements.dailyAttempts.textContent = DAILY_CHALLENGE.todayAttempts;
        elements.dailyMaxCombo.textContent = game.combo.maxCount;

        // 新纪录标识
        if (isNewRecord) {
            elements.dailyNewRecord.classList.remove('hidden');
        } else {
            elements.dailyNewRecord.classList.add('hidden');
        }

        // 显示每日挑战结束界面
        elements.dailyGameOverScreen.classList.remove('hidden');
    } else {
        // 普通模式：更新最高分
        if (game.score > game.highScore) {
            game.highScore = game.score;
            localStorage.setItem('timberman_highscore', game.highScore.toString());

            // 检查是否解锁新皮肤
            const newSkins = SKINS.checkUnlocks(game.highScore);
            if (newSkins.length > 0) {
                // 显示新皮肤解锁通知（使用成就弹窗样式）
                newSkins.forEach(skin => {
                    showSkinUnlockNotification(skin);
                });
            }
        }

        // 显示普通结束界面
        elements.finalScore.textContent = game.score;
        elements.highScore.textContent = game.highScore;
        elements.maxCombo.textContent = game.combo.maxCount;
        elements.gameOverScreen.classList.remove('hidden');
    }
}

// 更新 UI
function updateUI() {
    elements.scoreDisplay.textContent = game.score;
    elements.timerFill.style.width = `${game.timeLeft}%`;

    // 更新难度等级显示
    const level = getDifficultyLevel() + 1; // 显示为 1-11
    elements.difficultyLevel.textContent = `Lv.${level}`;

    // 高难度时添加脉冲动画
    if (level >= 7) {
        elements.difficultyLevel.classList.add('level-high');
    } else {
        elements.difficultyLevel.classList.remove('level-high');
    }

    // 更新连击显示
    if (game.combo.count >= 2) {
        elements.comboDisplay.textContent = `${game.combo.count} COMBO`;
        elements.comboDisplay.classList.remove('hidden');
        // 根据连击数添加不同的样式
        if (game.combo.count >= 20) {
            elements.comboDisplay.className = 'combo-display combo-epic';
        } else if (game.combo.count >= 10) {
            elements.comboDisplay.className = 'combo-display combo-great';
        } else if (game.combo.count >= 5) {
            elements.comboDisplay.className = 'combo-display combo-good';
        } else {
            elements.comboDisplay.className = 'combo-display';
        }
    } else {
        elements.comboDisplay.classList.add('hidden');
    }

    // 时间条颜色变化
    if (game.timeLeft < 30) {
        elements.timerFill.style.background = '#FF6B6B';
    } else if (game.timeLeft < 60) {
        elements.timerFill.style.background = 'linear-gradient(90deg, #FF6B6B, #FFE66D)';
    } else {
        elements.timerFill.style.background = 'linear-gradient(90deg, #FF6B6B, #FFE66D, #4ECB71)';
    }
}

// ============ 游戏循环 ============
function gameLoop(currentTime) {
    // 游戏未运行或已暂停时停止循环
    if (!game.isRunning || game.isPaused) return;

    const deltaTime = currentTime - game.lastTime;
    game.lastTime = currentTime;

    // 更新
    update(deltaTime);

    // 绘制
    draw();

    // 继续循环
    requestAnimationFrame(gameLoop);
}

// 更新游戏状态
function update(deltaTime) {
    // 更新砍树动画计时
    if (game.player.isChopping) {
        game.player.chopTimer -= deltaTime;
        if (game.player.chopTimer <= 0) {
            game.player.isChopping = false;
        }
    }

    // 更新连击系统（检查超时）
    const now = performance.now();
    if (game.combo.count > 0 && now - game.combo.lastChopTime >= CONFIG.COMBO.TIMEOUT) {
        game.combo.count = 0;
    }

    // 更新飞出的树干（使用对象池）
    flyingTrunkPool.update(deltaTime);

    // 更新粒子（使用对象池）
    particlePool.update(deltaTime);

    // 减少时间（使用动态衰减速度）
    game.timeLeft -= getCurrentTimeDecay() * (deltaTime / 16.67); // 基于 60fps 标准化

    // 时间紧迫警告音（时间低于20%时每0.5秒播放一次）
    if (game.timeLeft < 20 && game.timeLeft > 0) {
        const now = performance.now();
        if (now - game.lastWarningTime > 500) {
            audio.playTimeWarning();
            haptics.warning(); // 振动反馈
            game.lastWarningTime = now;
        }
    }

    if (game.timeLeft <= 0) {
        game.timeLeft = 0;
        gameOver();
        return;
    }

    updateUI();
}

// ============ 绘制 ============
function draw() {
    const ctx = game.ctx;

    // 清空画布
    ctx.clearRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

    // 绘制背景
    drawBackground();

    // 绘制树干和树枝
    drawTree();

    // 绘制飞出的树干（使用对象池）
    flyingTrunkPool.draw(game.ctx);

    // 绘制粒子特效（使用对象池）
    particlePool.draw(game.ctx);

    // 绘制伐木工
    drawPlayer();

    // 绘制地面
    drawGround();
}

// 绘制背景
function drawBackground() {
    const ctx = game.ctx;

    // 天空渐变 - 更柔和的颜色
    const gradient = ctx.createLinearGradient(0, 0, 0, CONFIG.HEIGHT);
    gradient.addColorStop(0, '#7EC8E3');
    gradient.addColorStop(0.4, '#A8E6CF');
    gradient.addColorStop(0.7, '#88C070');
    gradient.addColorStop(1, '#5D8A4D');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

    // 太阳
    drawSun(350, 60, 30);

    // 远处的山（多层次）
    // 最远的山
    ctx.fillStyle = '#6B9D5A';
    ctx.beginPath();
    ctx.moveTo(0, 420);
    ctx.lineTo(80, 340);
    ctx.lineTo(150, 390);
    ctx.lineTo(220, 320);
    ctx.lineTo(280, 370);
    ctx.lineTo(340, 300);
    ctx.lineTo(400, 360);
    ctx.lineTo(400, 600);
    ctx.lineTo(0, 600);
    ctx.closePath();
    ctx.fill();

    // 近处的山
    ctx.fillStyle = '#5D8A4D';
    ctx.beginPath();
    ctx.moveTo(0, 450);
    ctx.lineTo(60, 380);
    ctx.lineTo(120, 420);
    ctx.lineTo(200, 360);
    ctx.lineTo(260, 400);
    ctx.lineTo(320, 350);
    ctx.lineTo(380, 390);
    ctx.lineTo(400, 370);
    ctx.lineTo(400, 600);
    ctx.lineTo(0, 600);
    ctx.closePath();
    ctx.fill();

    // 云朵
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    drawCloud(50, 80, 30);
    drawCloud(300, 50, 25);
    drawCloud(180, 120, 20);

    // 飞鸟（简单像素风格）
    drawBirds();
}

// 绘制太阳
function drawSun(x, y, radius) {
    const ctx = game.ctx;

    // 太阳光晕
    const glowGradient = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 2);
    glowGradient.addColorStop(0, 'rgba(255, 236, 179, 0.6)');
    glowGradient.addColorStop(1, 'rgba(255, 236, 179, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
    ctx.fill();

    // 太阳主体
    ctx.fillStyle = '#FFE082';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // 太阳内部高光
    ctx.fillStyle = '#FFF8E1';
    ctx.beginPath();
    ctx.arc(x - 5, y - 5, radius * 0.4, 0, Math.PI * 2);
    ctx.fill();
}

// 绘制飞鸟
function drawBirds() {
    const ctx = game.ctx;
    ctx.strokeStyle = '#4A4A4A';
    ctx.lineWidth = 2;

    // 简单的 V 形鸟群
    const birds = [
        { x: 30, y: 150 },
        { x: 45, y: 160 },
        { x: 60, y: 145 },
        { x: 320, y: 100 },
        { x: 340, y: 90 }
    ];

    birds.forEach(bird => {
        ctx.beginPath();
        ctx.moveTo(bird.x - 5, bird.y + 3);
        ctx.lineTo(bird.x, bird.y);
        ctx.lineTo(bird.x + 5, bird.y + 3);
        ctx.stroke();
    });
}

// 绘制云朵
function drawCloud(x, y, size) {
    const ctx = game.ctx;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.arc(x + size, y - size * 0.3, size * 0.8, 0, Math.PI * 2);
    ctx.arc(x + size * 1.5, y, size * 0.7, 0, Math.PI * 2);
    ctx.fill();
}

// 绘制树
function drawTree() {
    const ctx = game.ctx;

    // 从下到上绘制树干
    for (let i = 0; i < game.trunks.length; i++) {
        const trunk = game.trunks[i];
        const y = CONFIG.GROUND_Y - (i + 1) * CONFIG.TRUNK_HEIGHT;

        // 绘制树干
        drawTrunk(CONFIG.TRUNK_X, y);

        // 绘制树枝
        if (trunk.branch !== 'none') {
            drawBranch(CONFIG.TRUNK_X, y, trunk.branch);
        }
    }

    // 绘制树顶
    drawTreeTop();
}

// 绘制单节树干
function drawTrunk(x, y) {
    const ctx = game.ctx;

    // 树干主体
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(x, y, CONFIG.TRUNK_WIDTH, CONFIG.TRUNK_HEIGHT);

    // 树干左侧高光
    ctx.fillStyle = '#A0724A';
    ctx.fillRect(x, y, 8, CONFIG.TRUNK_HEIGHT);

    // 树干右侧阴影
    ctx.fillStyle = '#6B4423';
    ctx.fillRect(x + CONFIG.TRUNK_WIDTH - 8, y, 8, CONFIG.TRUNK_HEIGHT);

    // 树干纹理（更丰富的年轮效果）
    ctx.fillStyle = '#7A4A2A';
    ctx.fillRect(x + 12, y + 8, 6, CONFIG.TRUNK_HEIGHT - 16);
    ctx.fillRect(x + 35, y + 5, 4, CONFIG.TRUNK_HEIGHT - 10);
    ctx.fillRect(x + 55, y + 12, 5, CONFIG.TRUNK_HEIGHT - 20);

    // 树皮纹理（水平线）
    ctx.fillStyle = '#6B4423';
    ctx.fillRect(x + 8, y + 15, CONFIG.TRUNK_WIDTH - 16, 2);
    ctx.fillRect(x + 8, y + 40, CONFIG.TRUNK_WIDTH - 16, 2);

    // 树干边框
    ctx.strokeStyle = '#5D3A1A';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, CONFIG.TRUNK_WIDTH, CONFIG.TRUNK_HEIGHT);
}

// 绘制树枝
function drawBranch(trunkX, y, side) {
    const ctx = game.ctx;
    const branchY = y + 10;

    if (side === 'left') {
        // 左边树枝
        const bx = trunkX - CONFIG.BRANCH_WIDTH;

        // 树枝主体
        ctx.fillStyle = '#8B5A2B';
        ctx.fillRect(bx, branchY, CONFIG.BRANCH_WIDTH, CONFIG.BRANCH_HEIGHT);

        // 树枝高光（上部）
        ctx.fillStyle = '#A0724A';
        ctx.fillRect(bx, branchY, CONFIG.BRANCH_WIDTH, 6);

        // 树枝阴影（下部）
        ctx.fillStyle = '#6B4423';
        ctx.fillRect(bx, branchY + CONFIG.BRANCH_HEIGHT - 6, CONFIG.BRANCH_WIDTH, 6);

        // 树枝纹理
        ctx.fillStyle = '#7A4A2A';
        ctx.fillRect(bx + 10, branchY + 12, 20, 4);
        ctx.fillRect(bx + 45, branchY + 18, 15, 3);

        // 树枝末端尖角
        ctx.fillStyle = '#8B5A2B';
        ctx.beginPath();
        ctx.moveTo(bx, branchY);
        ctx.lineTo(bx - 10, branchY + CONFIG.BRANCH_HEIGHT / 2);
        ctx.lineTo(bx, branchY + CONFIG.BRANCH_HEIGHT);
        ctx.closePath();
        ctx.fill();

        // 边框
        ctx.strokeStyle = '#5D3A1A';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, branchY, CONFIG.BRANCH_WIDTH, CONFIG.BRANCH_HEIGHT);
    } else {
        // 右边树枝
        const bx = trunkX + CONFIG.TRUNK_WIDTH;

        // 树枝主体
        ctx.fillStyle = '#8B5A2B';
        ctx.fillRect(bx, branchY, CONFIG.BRANCH_WIDTH, CONFIG.BRANCH_HEIGHT);

        // 树枝高光（上部）
        ctx.fillStyle = '#A0724A';
        ctx.fillRect(bx, branchY, CONFIG.BRANCH_WIDTH, 6);

        // 树枝阴影（下部）
        ctx.fillStyle = '#6B4423';
        ctx.fillRect(bx, branchY + CONFIG.BRANCH_HEIGHT - 6, CONFIG.BRANCH_WIDTH, 6);

        // 树枝纹理
        ctx.fillStyle = '#7A4A2A';
        ctx.fillRect(bx + 10, branchY + 12, 20, 4);
        ctx.fillRect(bx + 45, branchY + 18, 15, 3);

        // 树枝末端尖角
        ctx.fillStyle = '#8B5A2B';
        ctx.beginPath();
        ctx.moveTo(bx + CONFIG.BRANCH_WIDTH, branchY);
        ctx.lineTo(bx + CONFIG.BRANCH_WIDTH + 10, branchY + CONFIG.BRANCH_HEIGHT / 2);
        ctx.lineTo(bx + CONFIG.BRANCH_WIDTH, branchY + CONFIG.BRANCH_HEIGHT);
        ctx.closePath();
        ctx.fill();

        // 边框
        ctx.strokeStyle = '#5D3A1A';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, branchY, CONFIG.BRANCH_WIDTH, CONFIG.BRANCH_HEIGHT);
    }
}

// 绘制树顶（树冠）
function drawTreeTop() {
    const ctx = game.ctx;
    const topY = CONFIG.GROUND_Y - (game.trunks.length + 1) * CONFIG.TRUNK_HEIGHT;
    const centerX = CONFIG.TRUNK_X + CONFIG.TRUNK_WIDTH / 2;

    // 底层（最大）- 深绿色
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.moveTo(centerX - 70, topY + 60);
    ctx.lineTo(centerX, topY - 20);
    ctx.lineTo(centerX + 70, topY + 60);
    ctx.closePath();
    ctx.fill();

    // 底层高光
    ctx.fillStyle = '#2E9E2E';
    ctx.beginPath();
    ctx.moveTo(centerX - 50, topY + 50);
    ctx.lineTo(centerX - 15, topY);
    ctx.lineTo(centerX - 10, topY + 50);
    ctx.closePath();
    ctx.fill();

    // 中层
    ctx.fillStyle = '#2A9D2A';
    ctx.beginPath();
    ctx.moveTo(centerX - 55, topY + 20);
    ctx.lineTo(centerX, topY - 50);
    ctx.lineTo(centerX + 55, topY + 20);
    ctx.closePath();
    ctx.fill();

    // 中层高光
    ctx.fillStyle = '#3CB043';
    ctx.beginPath();
    ctx.moveTo(centerX - 35, topY + 12);
    ctx.lineTo(centerX - 10, topY - 30);
    ctx.lineTo(centerX - 5, topY + 12);
    ctx.closePath();
    ctx.fill();

    // 顶层
    ctx.fillStyle = '#32AB32';
    ctx.beginPath();
    ctx.moveTo(centerX - 40, topY - 10);
    ctx.lineTo(centerX, topY - 70);
    ctx.lineTo(centerX + 40, topY - 10);
    ctx.closePath();
    ctx.fill();

    // 顶层高光
    ctx.fillStyle = '#4ACD4A';
    ctx.beginPath();
    ctx.moveTo(centerX - 20, topY - 15);
    ctx.lineTo(centerX - 5, topY - 55);
    ctx.lineTo(centerX + 5, topY - 15);
    ctx.closePath();
    ctx.fill();

    // 树冠边框轮廓
    ctx.strokeStyle = '#1B5E20';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(centerX - 70, topY + 60);
    ctx.lineTo(centerX, topY - 20);
    ctx.lineTo(centerX + 70, topY + 60);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - 55, topY + 20);
    ctx.lineTo(centerX, topY - 50);
    ctx.lineTo(centerX + 55, topY + 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX - 40, topY - 10);
    ctx.lineTo(centerX, topY - 70);
    ctx.lineTo(centerX + 40, topY - 10);
    ctx.stroke();
}

// 绘制伐木工
function drawPlayer() {
    const ctx = game.ctx;
    const side = game.player.side;
    const skin = SKINS.getCurrent();
    const colors = skin.colors;

    // 计算位置
    let x;
    if (side === 'left') {
        x = CONFIG.TRUNK_X - CONFIG.PLAYER_WIDTH - 20;
    } else {
        x = CONFIG.TRUNK_X + CONFIG.TRUNK_WIDTH + 20;
    }
    const y = CONFIG.PLAYER_Y;

    // 砍树动画偏移和角度
    let chopOffset = 0;
    let chopAngle = 0;
    if (game.player.isChopping) {
        chopOffset = 10;
        chopAngle = -0.3; // 斧头挥动角度
    }

    // 绘制伐木工（像素风格小人）
    ctx.save();

    // 如果在右边，镜像绘制
    if (side === 'right') {
        ctx.translate(x + CONFIG.PLAYER_WIDTH / 2, 0);
        ctx.scale(-1, 1);
        ctx.translate(-(x + CONFIG.PLAYER_WIDTH / 2), 0);
    }

    // 黄金皮肤光晕效果
    if (colors.hasGlow) {
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 15;
    }

    // 阴影
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(x + 30, y + 82, 25, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // 关闭阴影效果（只对角色轮廓生效）
    ctx.shadowBlur = 0;

    // 腿
    ctx.fillStyle = colors.pants;
    ctx.fillRect(x + 17, y + 60, 11, 20);
    ctx.fillRect(x + 32, y + 60, 11, 20);
    // 裤子高光
    ctx.fillStyle = colors.pantsHighlight;
    ctx.fillRect(x + 17, y + 60, 3, 18);
    ctx.fillRect(x + 32, y + 60, 3, 18);
    // 鞋子
    ctx.fillStyle = colors.shoes;
    ctx.fillRect(x + 15, y + 77, 14, 5);
    ctx.fillRect(x + 31, y + 77, 14, 5);

    // 身体
    ctx.fillStyle = colors.body;
    ctx.fillRect(x + 15, y + 28, 30, 32);
    // 衣服高光
    ctx.fillStyle = colors.bodyHighlight;
    ctx.fillRect(x + 15, y + 28, 5, 30);
    // 衣服阴影
    ctx.fillStyle = colors.bodyShadow;
    ctx.fillRect(x + 40, y + 28, 5, 30);

    // 机器人特殊：身体纹路
    if (colors.hasAntenna) {
        ctx.fillStyle = '#37474F';
        ctx.fillRect(x + 22, y + 35, 16, 2);
        ctx.fillRect(x + 22, y + 42, 16, 2);
        ctx.fillRect(x + 22, y + 49, 16, 2);
    } else {
        // 衣服纽扣（非机器人）
        ctx.fillStyle = '#FFF';
        ctx.fillRect(x + 28, y + 35, 4, 4);
        ctx.fillRect(x + 28, y + 45, 4, 4);
    }

    // 手臂
    ctx.fillStyle = colors.skin;
    ctx.fillRect(x + 8, y + 30, 8, 20);
    ctx.fillRect(x + 44, y + 30, 8, 20);

    // 头
    ctx.fillStyle = colors.skin;
    ctx.beginPath();
    ctx.arc(x + 30, y + 15, 15, 0, Math.PI * 2);
    ctx.fill();

    // 忍者面罩
    if (colors.hasMask) {
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(x + 15, y + 10, 30, 10);
    } else {
        // 脸颊红晕（非忍者）
        ctx.fillStyle = 'rgba(255, 150, 150, 0.5)';
        ctx.beginPath();
        ctx.arc(x + 20, y + 18, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 40, y + 18, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    // 眼睛
    if (colors.eyeColor) {
        // 机器人发光眼睛
        ctx.fillStyle = colors.eyeColor;
        ctx.shadowColor = colors.eyeColor;
        ctx.shadowBlur = 5;
    } else {
        ctx.fillStyle = '#333';
    }
    ctx.fillRect(x + 24, y + 12, 4, 5);
    ctx.fillRect(x + 34, y + 12, 4, 5);
    ctx.shadowBlur = 0;

    // 眼睛高光（非机器人）
    if (!colors.eyeColor) {
        ctx.fillStyle = '#FFF';
        ctx.fillRect(x + 25, y + 12, 2, 2);
        ctx.fillRect(x + 35, y + 12, 2, 2);
    }

    // 嘴巴（砍树时张嘴）- 忍者没有嘴巴显示
    if (!colors.hasMask) {
        ctx.fillStyle = '#8B4513';
        if (game.player.isChopping) {
            ctx.fillRect(x + 27, y + 21, 8, 4);
        } else {
            ctx.fillRect(x + 28, y + 22, 6, 2);
        }
    }

    // 帽子
    ctx.fillStyle = colors.hat;
    ctx.fillRect(x + 15, y - 2, 30, 12);
    // 帽檐
    ctx.fillStyle = colors.hatBrim;
    ctx.fillRect(x + 10, y + 8, 40, 6);
    // 帽子高光
    ctx.fillStyle = colors.hatHighlight;
    ctx.fillRect(x + 17, y, 8, 8);

    // 机器人天线
    if (colors.hasAntenna) {
        ctx.fillStyle = '#455A64';
        ctx.fillRect(x + 28, y - 12, 4, 10);
        // 天线顶部发光球
        ctx.fillStyle = '#00E5FF';
        ctx.shadowColor = '#00E5FF';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x + 30, y - 15, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // 胡子（如果有）
    if (colors.beard) {
        ctx.fillStyle = colors.beard;
        ctx.fillRect(x + 22, y + 24, 18, 4);
    }

    // 斧头
    ctx.save();
    const axeBaseX = x + 50;
    const axeBaseY = y + 35;

    // 斧柄旋转中心
    ctx.translate(axeBaseX, axeBaseY);
    ctx.rotate(chopAngle);

    // 斧柄
    ctx.fillStyle = colors.axeHandle;
    ctx.fillRect(0, -3, 22 + chopOffset, 6);
    // 斧柄纹理
    ctx.fillStyle = colors.hasAntenna ? '#37474F' : '#8D6E63';
    ctx.fillRect(5, -2, 2, 4);
    ctx.fillRect(12, -2, 2, 4);

    // 斧头头部
    ctx.fillStyle = colors.axeHead;
    ctx.fillRect(18 + chopOffset, -12, 12, 24);
    // 斧头高光
    ctx.fillStyle = colors.axeHighlight;
    ctx.fillRect(18 + chopOffset, -12, 3, 24);
    // 斧刃
    ctx.fillStyle = colors.axeBlade;
    if (colors.hasGlow || colors.hasAntenna) {
        // 黄金/机器人斧刃发光
        ctx.shadowColor = colors.axeBlade;
        ctx.shadowBlur = 5;
    }
    ctx.fillRect(28 + chopOffset, -10, 3, 20);
    ctx.shadowBlur = 0;

    ctx.restore();

    ctx.restore();
}

// 绘制地面
function drawGround() {
    const ctx = game.ctx;

    // 草地主体
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, CONFIG.GROUND_Y, CONFIG.WIDTH, CONFIG.HEIGHT - CONFIG.GROUND_Y);

    // 草地渐变层次
    ctx.fillStyle = '#43A047';
    ctx.fillRect(0, CONFIG.GROUND_Y + 20, CONFIG.WIDTH, CONFIG.HEIGHT - CONFIG.GROUND_Y - 20);

    ctx.fillStyle = '#388E3C';
    ctx.fillRect(0, CONFIG.GROUND_Y + 40, CONFIG.WIDTH, CONFIG.HEIGHT - CONFIG.GROUND_Y - 40);

    // 草地纹理（小草丛）
    ctx.fillStyle = '#66BB6A';
    for (let i = 0; i < CONFIG.WIDTH; i += 15) {
        const h = 3 + Math.sin(i * 0.3) * 3;
        ctx.fillRect(i, CONFIG.GROUND_Y - h, 3, h + 3);
        ctx.fillRect(i + 5, CONFIG.GROUND_Y - h - 2, 2, h + 2);
    }

    // 小花（随机分布但固定位置）
    drawFlower(30, CONFIG.GROUND_Y - 5, '#FF6B6B');
    drawFlower(70, CONFIG.GROUND_Y - 3, '#FFE66D');
    drawFlower(130, CONFIG.GROUND_Y - 4, '#FF6B6B');
    drawFlower(280, CONFIG.GROUND_Y - 5, '#FFF');
    drawFlower(330, CONFIG.GROUND_Y - 3, '#FFE66D');
    drawFlower(370, CONFIG.GROUND_Y - 4, '#FF6B6B');

    // 树桩底座（更精致）
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(CONFIG.TRUNK_X - 15, CONFIG.GROUND_Y - 12, CONFIG.TRUNK_WIDTH + 30, 24);

    // 底座高光
    ctx.fillStyle = '#795548';
    ctx.fillRect(CONFIG.TRUNK_X - 15, CONFIG.GROUND_Y - 12, CONFIG.TRUNK_WIDTH + 30, 4);

    // 底座阴影
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(CONFIG.TRUNK_X - 15, CONFIG.GROUND_Y + 8, CONFIG.TRUNK_WIDTH + 30, 4);

    // 底座边框
    ctx.strokeStyle = '#3E2723';
    ctx.lineWidth = 2;
    ctx.strokeRect(CONFIG.TRUNK_X - 15, CONFIG.GROUND_Y - 12, CONFIG.TRUNK_WIDTH + 30, 24);

    // 底座年轮纹理
    ctx.fillStyle = '#4E342E';
    ctx.beginPath();
    ctx.arc(CONFIG.TRUNK_X + CONFIG.TRUNK_WIDTH / 2, CONFIG.GROUND_Y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6D4C41';
    ctx.beginPath();
    ctx.arc(CONFIG.TRUNK_X + CONFIG.TRUNK_WIDTH / 2, CONFIG.GROUND_Y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8D6E63';
    ctx.beginPath();
    ctx.arc(CONFIG.TRUNK_X + CONFIG.TRUNK_WIDTH / 2, CONFIG.GROUND_Y, 5, 0, Math.PI * 2);
    ctx.fill();
}

// 绘制小花
function drawFlower(x, y, petalColor) {
    const ctx = game.ctx;

    // 花茎
    ctx.fillStyle = '#388E3C';
    ctx.fillRect(x, y, 2, 8);

    // 花瓣
    ctx.fillStyle = petalColor;
    ctx.beginPath();
    ctx.arc(x - 3, y - 2, 3, 0, Math.PI * 2);
    ctx.arc(x + 4, y - 2, 3, 0, Math.PI * 2);
    ctx.arc(x + 1, y - 5, 3, 0, Math.PI * 2);
    ctx.arc(x + 1, y + 1, 3, 0, Math.PI * 2);
    ctx.fill();

    // 花心
    ctx.fillStyle = '#FFD54F';
    ctx.beginPath();
    ctx.arc(x + 1, y - 2, 2, 0, Math.PI * 2);
    ctx.fill();
}

// ============ 启动游戏 ============
document.addEventListener('DOMContentLoaded', init);
