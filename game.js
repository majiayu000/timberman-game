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
        },
        {
            id: 'santa',
            name: '圣诞老人',
            icon: '🎅',
            desc: '节日快乐的圣诞伐木工',
            unlockCondition: { type: 'score', value: 30 },
            colors: {
                hat: '#C62828', hatBrim: '#FFFFFF', hatHighlight: '#E53935',
                body: '#C62828', bodyHighlight: '#E53935', bodyShadow: '#B71C1C',
                pants: '#2E7D32', pantsHighlight: '#43A047',
                shoes: '#1B5E20', skin: '#FFCC80', beard: '#FFFFFF',
                axeHandle: '#4CAF50', axeHead: '#C62828', axeHighlight: '#E53935', axeBlade: '#FFFFFF',
                hasSantaHat: true // 特殊标记：圣诞帽（有白色毛球）
            }
        },
        {
            id: 'pumpkin',
            name: '南瓜头',
            icon: '🎃',
            desc: '万圣节的恐怖伐木工',
            unlockCondition: { type: 'score', value: 75 },
            colors: {
                hat: '#4E342E', hatBrim: '#3E2723', hatHighlight: '#5D4037',
                body: '#1A1A1A', bodyHighlight: '#333', bodyShadow: '#000',
                pants: '#1A1A1A', pantsHighlight: '#333',
                shoes: '#212121', skin: '#FF6F00', beard: null,
                axeHandle: '#4E342E', axeHead: '#424242', axeHighlight: '#616161', axeBlade: '#9E9E9E',
                hasPumpkinHead: true // 特殊标记：南瓜头
            }
        },
        {
            id: 'pirate',
            name: '海盗船长',
            icon: '🏴‍☠️',
            desc: '勇敢的海上冒险家',
            unlockCondition: { type: 'score', value: 150 },
            colors: {
                hat: '#1A1A1A', hatBrim: '#FFD700', hatHighlight: '#333',
                body: '#5D4037', bodyHighlight: '#6D4C41', bodyShadow: '#4E342E',
                pants: '#1A1A1A', pantsHighlight: '#333',
                shoes: '#5D4037', skin: '#FFCC80', beard: '#3E2723',
                axeHandle: '#8D6E63', axeHead: '#FFD700', axeHighlight: '#FFEB3B', axeBlade: '#FFF',
                hasPirateHat: true, // 特殊标记：海盗帽
                hasEyePatch: true   // 特殊标记：眼罩
            }
        },
        {
            id: 'snowman',
            name: '雪人',
            icon: '⛄',
            desc: '来自冰雪世界的伐木工',
            unlockCondition: { type: 'score', value: 200 },
            colors: {
                hat: '#1565C0', hatBrim: '#0D47A1', hatHighlight: '#1976D2',
                body: '#ECEFF1', bodyHighlight: '#FFFFFF', bodyShadow: '#CFD8DC',
                pants: '#B0BEC5', pantsHighlight: '#CFD8DC',
                shoes: '#455A64', skin: '#FFFFFF', beard: null,
                axeHandle: '#90CAF9', axeHead: '#42A5F5', axeHighlight: '#64B5F6', axeBlade: '#E3F2FD',
                hasSnowEffect: true, // 特殊标记：冰霜光环
                eyeColor: '#1565C0', // 蓝色眼睛
                noseColor: '#FF5722' // 胡萝卜鼻子
            }
        },
        {
            id: 'chinese_new_year',
            name: '财神爷',
            icon: '🧧',
            desc: '新年快乐，恭喜发财！',
            unlockCondition: { type: 'score', value: 125 },
            colors: {
                hat: '#C62828', hatBrim: '#FFD700', hatHighlight: '#E53935',
                body: '#C62828', bodyHighlight: '#E53935', bodyShadow: '#B71C1C',
                pants: '#FFD700', pantsHighlight: '#FFEB3B',
                shoes: '#1A1A1A', skin: '#FFCC80', beard: '#4E342E',
                axeHandle: '#FFD700', axeHead: '#C62828', axeHighlight: '#E53935', axeBlade: '#FFD700',
                hasChineseHat: true, // 特殊标记：中国财神帽
                hasGoldGlow: true    // 特殊标记：金色光晕
            }
        },
        {
            id: 'valentine',
            name: '丘比特',
            icon: '💘',
            desc: '爱神降临，散播爱意',
            unlockCondition: { type: 'score', value: 175 },
            colors: {
                hat: '#E91E63', hatBrim: '#F48FB1', hatHighlight: '#F06292',
                body: '#E91E63', bodyHighlight: '#F06292', bodyShadow: '#C2185B',
                pants: '#FCE4EC', pantsHighlight: '#F8BBD0',
                shoes: '#F48FB1', skin: '#FFCC80', beard: null,
                axeHandle: '#F48FB1', axeHead: '#E91E63', axeHighlight: '#F06292', axeBlade: '#FFFFFF',
                hasWings: true,       // 特殊标记：天使翅膀
                hasHeartAura: true,   // 特殊标记：爱心光环
                eyeColor: '#E91E63'   // 粉色眼睛
            }
        },
        {
            id: 'easter_bunny',
            name: '复活节兔子',
            icon: '🐰',
            desc: '可爱的彩蛋小兔子',
            unlockCondition: { type: 'score', value: 85 },
            colors: {
                hat: '#F8BBD0', hatBrim: '#F48FB1', hatHighlight: '#FCE4EC',
                body: '#E1BEE7', bodyHighlight: '#F3E5F5', bodyShadow: '#CE93D8',
                pants: '#BBDEFB', pantsHighlight: '#E3F2FD',
                shoes: '#F48FB1', skin: '#FFFFFF', beard: null,
                axeHandle: '#F8BBD0', axeHead: '#BA68C8', axeHighlight: '#CE93D8', axeBlade: '#F3E5F5',
                hasBunnyEars: true,    // 特殊标记：兔子耳朵
                hasEasterEgg: true,    // 特殊标记：彩蛋装饰
                eyeColor: '#E91E63',   // 粉色眼睛
                noseColor: '#F48FB1'   // 粉色鼻子
            }
        },
        {
            id: 'summer_surfer',
            name: '夏日冲浪者',
            icon: '🏄',
            desc: '阳光沙滩的酷炫伐木工',
            unlockCondition: { type: 'score', value: 160 },
            colors: {
                hat: '#FFF59D', hatBrim: '#FFF176', hatHighlight: '#FFFF8D',
                body: '#4FC3F7', bodyHighlight: '#81D4FA', bodyShadow: '#29B6F6',
                pants: '#FF8A65', pantsHighlight: '#FFAB91',
                shoes: '#FFCC80', skin: '#FFCC80', beard: null,
                axeHandle: '#A1887F', axeHead: '#29B6F6', axeHighlight: '#4FC3F7', axeBlade: '#E1F5FE',
                hasStrawHat: true,     // 特殊标记：草帽
                hasSunglasses: true,   // 特殊标记：太阳镜
                hasFlowerShirt: true   // 特殊标记：花衬衫
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

// ============ 多语言系统 ============
const I18N = {
    currentLang: 'zh', // 默认中文

    // 语言包定义
    languages: {
        zh: {
            // 标题
            title: '伐木人',

            // 开始界面
            startTitle: '伐木人',
            startHint1: '按 ← → 或 A/D 砍树',
            startHint2: '也可点击屏幕左右侧',
            startHint3: '躲避树枝，别让时间耗尽！',
            startHint4: '空格/回车 开始 | ESC/P 暂停',
            startBtn: '开始游戏',
            dailyBtn: '📅 每日挑战',
            skinBtn: '👕 皮肤',
            leaderboardBtn: '📊 排行榜',
            statsBtn: '📈 统计',
            tutorialBtn: '❓ 教程',

            // 游戏结束
            gameOver: '游戏结束',
            score: '得分',
            maxCombo: '最高连击',
            highScore: '最高分',
            restartBtn: '再来一次',
            achievementsBtn: '🏆 成就',

            // 暂停
            paused: '⏸️ 暂停',
            pauseHint: '按 ESC 或 P 键继续',
            resumeBtn: '继续游戏',

            // 每日挑战
            dailyTitle: '📅 每日挑战',
            todayDate: '今日日期',
            todayBest: '今日最高',
            attempts: '挑战次数',
            dailyHint: '每天的关卡相同，挑战最高分！',
            startChallenge: '开始挑战',
            back: '返回',
            challengeOver: '📅 挑战结束',
            newRecord: '🎉 新纪录！',
            todayHighScore: '今日最高',
            todayAttempts: '今日挑战',
            times: '次',
            retry: '再来一次',
            backHome: '返回首页',

            // 皮肤
            skinTitle: '👕 皮肤',
            skinUnlocked: '已解锁',
            skinLocked: '🔒',
            skinUnlockAt: '分解锁',

            // 排行榜
            leaderboardTitle: '📊 排行榜',
            rank: '排名',
            lbScore: '分数',
            lbCombo: '连击',
            lbDate: '时间',
            clearRecords: '清空记录',
            clearConfirm: '确定要清空所有排行榜记录吗？',
            noRecords: '暂无记录',

            // 成就
            achievementsTitle: '🏆 成就',
            achievementUnlock: '成就解锁!',

            // 统计
            statsTitle: '📈 游戏统计',
            totalGames: '总游戏次数',
            totalChops: '总砍树次数',
            totalTime: '总游戏时长',
            bestCombo: '最高连击',
            avgScore: '平均分数',
            unlockedAchievements: '🎖️ 解锁成就',
            unlockedSkins: '👕 解锁皮肤',
            dailyAttempts: '📅 每日挑战',
            resetStats: '重置统计',
            resetConfirm: '确定要重置所有统计数据吗？此操作不可撤销。',

            // 教程
            tutorialWelcome: '欢迎来到伐木人!',
            tutorialWelcome1: '你是一名勇敢的伐木工',
            tutorialWelcome2: '目标是砍倒尽可能多的树',
            tutorialWelcome3: '同时躲避危险的树枝',
            tutorialControls: '控制方式',
            tutorialMoveLeft: '移动到左边砍树',
            tutorialMoveRight: '移动到右边砍树',
            tutorialTouchHint: '也可以点击屏幕左/右侧',
            tutorialBranch: '躲避树枝!',
            tutorialBranchWarn: '碰到树枝 = 游戏结束!',
            tutorialBranchHint: '砍树前看清树枝在哪边',
            tutorialTime: '时间管理',
            tutorialTimeHint1: '时间条会不断减少',
            tutorialTimeHint2: '每次砍树会',
            tutorialTimeHint3: '+时间',
            tutorialTimeHint4: '时间耗尽也会游戏结束',
            tutorialAdvanced: '高级技巧',
            tutorialCombo: '连击',
            tutorialComboHint: '快速砍树提高分数',
            tutorialDifficulty: '难度递增',
            tutorialDifficultyHint: '分数越高越难',
            tutorialAchievement: '成就系统',
            tutorialAchievementHint: '解锁12个成就',
            tutorialSkin: '皮肤',
            tutorialSkinHint: '高分解锁新角色',
            skip: '跳过',
            prev: '上一步',
            next: '下一步',
            finish: '完成',

            // 触摸区域提示
            tapLeft: '← 点击左侧',
            tapRight: '点击右侧 →',

            // 音量设置
            volumeSettings: '🎵 音量设置',
            sfxVolume: '🔊 音效',
            bgmVolume: '🎵 音乐',
            vibration: '📳 振动',

            // 弹窗
            skinUnlockPopup: '新皮肤解锁!',

            // 回放系统
            replayBtn: '🎬 回放',
            replayTitle: '🎬 回放上局',
            replayScore: '得分',
            replayCombo: '最高连击',
            replayChops: '砍树次数',
            replayDuration: '用时',
            replayStart: '开始回放',
            replayStop: '停止回放',
            replayNoData: '暂无回放数据',
            replayPlaying: '🎬 回放中...',
            replaySeconds: '秒',

            // 分享功能
            shareBtn: '📤 分享',
            shareTitle: '伐木人',
            shareScoreLabel: '得分',
            shareComboLabel: '连击',
            shareLevelLabel: '难度',
            shareHighScoreLabel: '最高分',
            shareDownloading: '正在生成图片...',
            shareSuccess: '图片已保存！',
            shareFailed: '分享失败，请重试',
            sharePanelTitle: '📤 分享成绩',
            shareNativeBtn: '📱 分享',
            shareDownloadBtn: '💾 保存图片',
            shareCopyBtn: '📋 复制文字',
            shareCopySuccess: '✓ 已复制到剪贴板！',

            // 无限模式
            endlessBtn: '∞ 无限模式',
            endlessTitle: '∞ 无限模式',
            endlessDesc: '没有时间限制，挑战你的专注力！',
            endlessBest: '最高分',
            endlessTotal: '总游戏次数',
            endlessStart: '开始挑战',
            endlessOver: '∞ 挑战结束',
            endlessNewRecord: '🎉 新纪录！',
            endlessHint: '只需躲避树枝，没有时间压力',

            // 倒计时
            countdownGo: '开始!',

            // 主题
            themeDarkTip: '切换到暗色模式',
            themeLightTip: '切换到亮色模式',

            // 速度选项
            speedBtn: '⚡ 速度',
            speedTitle: '⚡ 游戏速度',
            speedSelectDesc: '选择适合你的游戏速度',
            speedSlow: '慢速',
            speedNormal: '标准',
            speedFast: '快速',
            speedSlowDesc: '时间衰减 -40%，适合新手',
            speedNormalDesc: '默认游戏速度',
            speedFastDesc: '时间衰减 +50%，挑战高手',
            speedCurrent: '当前',

            // 皮肤名称
            skinNames: {
                default: '伐木工',
                ninja: '忍者',
                robot: '机器人',
                golden: '黄金传奇',
                santa: '圣诞老人',
                pumpkin: '南瓜头',
                pirate: '海盗船长',
                snowman: '雪人',
                chinese_new_year: '财神爷',
                valentine: '丘比特',
                easter_bunny: '复活节兔子',
                summer_surfer: '夏日冲浪者'
            },
            skinDescs: {
                default: '经典红衣伐木工',
                ninja: '神秘的黑衣忍者',
                robot: '钢铁机械伐木者',
                golden: '传说中的黄金伐木工',
                santa: '节日快乐的圣诞伐木工',
                pumpkin: '万圣节的恐怖伐木工',
                pirate: '勇敢的海上冒险家',
                snowman: '来自冰雪世界的伐木工',
                chinese_new_year: '新年快乐，恭喜发财！',
                valentine: '爱神降临，散播爱意',
                easter_bunny: '可爱的彩蛋小兔子',
                summer_surfer: '阳光沙滩的酷炫伐木工'
            },

            // 成就名称
            achievementNames: {
                first_chop: '初次砍伐',
                score_10: '入门伐木工',
                score_50: '熟练伐木工',
                score_100: '专业伐木工',
                score_200: '伐木大师',
                combo_5: '小连击',
                combo_10: '连击达人',
                combo_20: '连击之王',
                level_5: '难度5级',
                level_8: '难度8级',
                level_max: '最高难度',
                close_call: '绝处逢生'
            },
            achievementDescs: {
                first_chop: '成功砍下第一棵树',
                score_10: '单局得分达到10分',
                score_50: '单局得分达到50分',
                score_100: '单局得分达到100分',
                score_200: '单局得分达到200分',
                combo_5: '达成5连击',
                combo_10: '达成10连击',
                combo_20: '达成20连击',
                level_5: '达到难度等级5',
                level_8: '达到难度等级8',
                level_max: '达到最高难度等级11',
                close_call: '时间低于10%时砍树20次'
            }
        },
        en: {
            // Title
            title: 'Timberman',

            // Start screen
            startTitle: 'Timberman',
            startHint1: 'Press ← → or A/D to chop',
            startHint2: 'Tap left/right of screen',
            startHint3: 'Avoid branches, beat the clock!',
            startHint4: 'Space/Enter Start | ESC/P Pause',
            startBtn: 'Start Game',
            dailyBtn: '📅 Daily Challenge',
            skinBtn: '👕 Skins',
            leaderboardBtn: '📊 Leaderboard',
            statsBtn: '📈 Stats',
            tutorialBtn: '❓ Tutorial',

            // Game over
            gameOver: 'Game Over',
            score: 'Score',
            maxCombo: 'Max Combo',
            highScore: 'High Score',
            restartBtn: 'Try Again',
            achievementsBtn: '🏆 Achievements',

            // Pause
            paused: '⏸️ Paused',
            pauseHint: 'Press ESC or P to continue',
            resumeBtn: 'Resume',

            // Daily challenge
            dailyTitle: '📅 Daily Challenge',
            todayDate: 'Today',
            todayBest: 'Today Best',
            attempts: 'Attempts',
            dailyHint: 'Same level for everyone, beat your best!',
            startChallenge: 'Start Challenge',
            back: 'Back',
            challengeOver: '📅 Challenge Over',
            newRecord: '🎉 New Record!',
            todayHighScore: 'Today Best',
            todayAttempts: 'Today Attempts',
            times: '',
            retry: 'Try Again',
            backHome: 'Home',

            // Skins
            skinTitle: '👕 Skins',
            skinUnlocked: 'Unlocked',
            skinLocked: '🔒',
            skinUnlockAt: 'pts to unlock',

            // Leaderboard
            leaderboardTitle: '📊 Leaderboard',
            rank: 'Rank',
            lbScore: 'Score',
            lbCombo: 'Combo',
            lbDate: 'Date',
            clearRecords: 'Clear All',
            clearConfirm: 'Are you sure you want to clear all records?',
            noRecords: 'No records yet',

            // Achievements
            achievementsTitle: '🏆 Achievements',
            achievementUnlock: 'Achievement Unlocked!',

            // Stats
            statsTitle: '📈 Game Stats',
            totalGames: 'Total Games',
            totalChops: 'Total Chops',
            totalTime: 'Total Time',
            bestCombo: 'Best Combo',
            avgScore: 'Avg Score',
            unlockedAchievements: '🎖️ Achievements',
            unlockedSkins: '👕 Skins',
            dailyAttempts: '📅 Daily Challenges',
            resetStats: 'Reset Stats',
            resetConfirm: 'Are you sure you want to reset all stats? This cannot be undone.',

            // Tutorial
            tutorialWelcome: 'Welcome to Timberman!',
            tutorialWelcome1: 'You are a brave lumberjack',
            tutorialWelcome2: 'Chop as many trees as you can',
            tutorialWelcome3: 'While avoiding dangerous branches',
            tutorialControls: 'Controls',
            tutorialMoveLeft: 'Move left and chop',
            tutorialMoveRight: 'Move right and chop',
            tutorialTouchHint: 'Or tap left/right of screen',
            tutorialBranch: 'Avoid Branches!',
            tutorialBranchWarn: 'Hit branch = Game Over!',
            tutorialBranchHint: 'Look before you chop',
            tutorialTime: 'Time Management',
            tutorialTimeHint1: 'Time bar decreases constantly',
            tutorialTimeHint2: 'Each chop gives',
            tutorialTimeHint3: '+time',
            tutorialTimeHint4: 'Time out = Game Over',
            tutorialAdvanced: 'Pro Tips',
            tutorialCombo: 'Combo',
            tutorialComboHint: 'Chop fast for higher scores',
            tutorialDifficulty: 'Difficulty',
            tutorialDifficultyHint: 'Gets harder as you score',
            tutorialAchievement: 'Achievements',
            tutorialAchievementHint: 'Unlock 12 achievements',
            tutorialSkin: 'Skins',
            tutorialSkinHint: 'High scores unlock new skins',
            skip: 'Skip',
            prev: 'Back',
            next: 'Next',
            finish: 'Finish',

            // Touch hints
            tapLeft: '← Tap Left',
            tapRight: 'Tap Right →',

            // Volume settings
            volumeSettings: '🎵 Volume Settings',
            sfxVolume: '🔊 SFX',
            bgmVolume: '🎵 Music',
            vibration: '📳 Vibration',

            // Popups
            skinUnlockPopup: 'New Skin Unlocked!',

            // Replay system
            replayBtn: '🎬 Replay',
            replayTitle: '🎬 Last Game Replay',
            replayScore: 'Score',
            replayCombo: 'Max Combo',
            replayChops: 'Chops',
            replayDuration: 'Duration',
            replayStart: 'Start Replay',
            replayStop: 'Stop Replay',
            replayNoData: 'No replay data',
            replayPlaying: '🎬 Replaying...',
            replaySeconds: 's',

            // Share
            shareBtn: '📤 Share',
            shareTitle: 'Timberman',
            shareScoreLabel: 'Score',
            shareComboLabel: 'Combo',
            shareLevelLabel: 'Level',
            shareHighScoreLabel: 'High Score',
            shareDownloading: 'Generating image...',
            shareSuccess: 'Image saved!',
            shareFailed: 'Share failed, please try again',
            sharePanelTitle: '📤 Share Score',
            shareNativeBtn: '📱 Share',
            shareDownloadBtn: '💾 Save Image',
            shareCopyBtn: '📋 Copy Text',
            shareCopySuccess: '✓ Copied to clipboard!',

            // Endless mode
            endlessBtn: '∞ Endless Mode',
            endlessTitle: '∞ Endless Mode',
            endlessDesc: 'No time limit, test your focus!',
            endlessBest: 'Best Score',
            endlessTotal: 'Total Games',
            endlessStart: 'Start Challenge',
            endlessOver: '∞ Challenge Over',
            endlessNewRecord: '🎉 New Record!',
            endlessHint: 'Just avoid branches, no time pressure',

            // Countdown
            countdownGo: 'GO!',

            // Theme
            themeDarkTip: 'Switch to Dark Mode',
            themeLightTip: 'Switch to Light Mode',

            // Speed options
            speedBtn: '⚡ Speed',
            speedTitle: '⚡ Game Speed',
            speedSelectDesc: 'Choose your preferred game speed',
            speedSlow: 'Slow',
            speedNormal: 'Normal',
            speedFast: 'Fast',
            speedSlowDesc: '-40% time decay, for beginners',
            speedNormalDesc: 'Default game speed',
            speedFastDesc: '+50% time decay, challenge mode',
            speedCurrent: 'Current',

            // Skin names
            skinNames: {
                default: 'Lumberjack',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Golden Legend',
                santa: 'Santa Claus',
                pumpkin: 'Pumpkin Head',
                pirate: 'Pirate Captain',
                snowman: 'Snowman',
                chinese_new_year: 'God of Wealth',
                valentine: 'Cupid',
                easter_bunny: 'Easter Bunny',
                summer_surfer: 'Summer Surfer'
            },
            skinDescs: {
                default: 'Classic red-shirt lumberjack',
                ninja: 'Mysterious black ninja',
                robot: 'Steel mechanical chopper',
                golden: 'Legendary golden lumberjack',
                santa: 'Jolly holiday lumberjack',
                pumpkin: 'Spooky Halloween chopper',
                pirate: 'Brave sea adventurer',
                snowman: 'Frosty winter chopper',
                chinese_new_year: 'Happy New Year! Good fortune!',
                valentine: 'Love god spreading love',
                easter_bunny: 'Cute colorful egg bunny',
                summer_surfer: 'Cool beach surfer'
            },

            // Achievement names
            achievementNames: {
                first_chop: 'First Chop',
                score_10: 'Beginner Logger',
                score_50: 'Skilled Logger',
                score_100: 'Pro Logger',
                score_200: 'Master Logger',
                combo_5: 'Mini Combo',
                combo_10: 'Combo Pro',
                combo_20: 'Combo King',
                level_5: 'Level 5',
                level_8: 'Level 8',
                level_max: 'Max Level',
                close_call: 'Close Call'
            },
            achievementDescs: {
                first_chop: 'Chop your first tree',
                score_10: 'Score 10 in a single game',
                score_50: 'Score 50 in a single game',
                score_100: 'Score 100 in a single game',
                score_200: 'Score 200 in a single game',
                combo_5: 'Reach 5 combo',
                combo_10: 'Reach 10 combo',
                combo_20: 'Reach 20 combo',
                level_5: 'Reach difficulty level 5',
                level_8: 'Reach difficulty level 8',
                level_max: 'Reach max difficulty level 11',
                close_call: 'Chop 20 times with time below 10%'
            }
        },
        ja: {
            // タイトル
            title: 'きこり',

            // スタート画面
            startTitle: 'きこり',
            startHint1: '← → または A/D で木を切る',
            startHint2: '画面の左右をタップ',
            startHint3: '枝を避けて、時間切れ注意！',
            startHint4: 'Space/Enter 開始 | ESC/P 一時停止',
            startBtn: 'ゲーム開始',
            dailyBtn: '📅 デイリー',
            skinBtn: '👕 スキン',
            leaderboardBtn: '📊 ランキング',
            statsBtn: '📈 統計',
            tutorialBtn: '❓ チュートリアル',

            // ゲームオーバー
            gameOver: 'ゲームオーバー',
            score: 'スコア',
            maxCombo: '最大コンボ',
            highScore: 'ハイスコア',
            restartBtn: 'もう一度',
            achievementsBtn: '🏆 実績',

            // 一時停止
            paused: '⏸️ 一時停止',
            pauseHint: 'ESC または P で再開',
            resumeBtn: '再開',

            // デイリーチャレンジ
            dailyTitle: '📅 デイリーチャレンジ',
            todayDate: '今日',
            todayBest: '今日のベスト',
            attempts: '挑戦回数',
            dailyHint: '毎日同じステージ、最高記録を目指せ！',
            startChallenge: '挑戦開始',
            back: '戻る',
            challengeOver: '📅 チャレンジ終了',
            newRecord: '🎉 新記録！',
            todayHighScore: '今日のベスト',
            todayAttempts: '今日の挑戦',
            times: '回',
            retry: 'もう一度',
            backHome: 'ホーム',

            // スキン
            skinTitle: '👕 スキン',
            skinUnlocked: '解放済み',
            skinLocked: '🔒',
            skinUnlockAt: '点で解放',

            // ランキング
            leaderboardTitle: '📊 ランキング',
            rank: '順位',
            lbScore: 'スコア',
            lbCombo: 'コンボ',
            lbDate: '日付',
            clearRecords: '記録削除',
            clearConfirm: '全ての記録を削除しますか？',
            noRecords: '記録なし',

            // 実績
            achievementsTitle: '🏆 実績',
            achievementUnlock: '実績解除！',

            // 統計
            statsTitle: '📈 ゲーム統計',
            totalGames: '総ゲーム数',
            totalChops: '総伐採数',
            totalTime: '総プレイ時間',
            bestCombo: '最高コンボ',
            avgScore: '平均スコア',
            unlockedAchievements: '🎖️ 解放実績',
            unlockedSkins: '👕 解放スキン',
            dailyAttempts: '📅 デイリー挑戦',
            resetStats: '統計リセット',
            resetConfirm: '全ての統計をリセットしますか？この操作は取り消せません。',

            // チュートリアル
            tutorialWelcome: 'きこりへようこそ！',
            tutorialWelcome1: 'あなたは勇敢なきこり',
            tutorialWelcome2: 'できるだけ多くの木を切ろう',
            tutorialWelcome3: '危険な枝を避けながら',
            tutorialControls: '操作方法',
            tutorialMoveLeft: '左に移動して切る',
            tutorialMoveRight: '右に移動して切る',
            tutorialTouchHint: '画面の左右タップも可',
            tutorialBranch: '枝を避けろ！',
            tutorialBranchWarn: '枝に当たる = ゲームオーバー！',
            tutorialBranchHint: '切る前に枝の位置を確認',
            tutorialTime: '時間管理',
            tutorialTimeHint1: '時間ゲージは減り続ける',
            tutorialTimeHint2: '木を切ると',
            tutorialTimeHint3: '+時間',
            tutorialTimeHint4: '時間切れもゲームオーバー',
            tutorialAdvanced: '上級テクニック',
            tutorialCombo: 'コンボ',
            tutorialComboHint: '素早く切ってスコアアップ',
            tutorialDifficulty: '難易度',
            tutorialDifficultyHint: 'スコアが上がると難しく',
            tutorialAchievement: '実績',
            tutorialAchievementHint: '12個の実績を解放',
            tutorialSkin: 'スキン',
            tutorialSkinHint: 'ハイスコアで新キャラ解放',
            skip: 'スキップ',
            prev: '前へ',
            next: '次へ',
            finish: '完了',

            // タッチヒント
            tapLeft: '← 左タップ',
            tapRight: '右タップ →',

            // 音量設定
            volumeSettings: '🎵 音量設定',
            sfxVolume: '🔊 効果音',
            bgmVolume: '🎵 音楽',
            vibration: '📳 振動',

            // ポップアップ
            skinUnlockPopup: '新スキン解放！',

            // リプレイシステム
            replayBtn: '🎬 リプレイ',
            replayTitle: '🎬 前回のリプレイ',
            replayScore: 'スコア',
            replayCombo: '最大コンボ',
            replayChops: '伐採数',
            replayDuration: '時間',
            replayStart: 'リプレイ開始',
            replayStop: 'リプレイ停止',
            replayNoData: 'データなし',
            replayPlaying: '🎬 リプレイ中...',
            replaySeconds: '秒',

            // シェア機能
            shareBtn: '📤 シェア',
            shareTitle: 'きこり',
            shareScoreLabel: 'スコア',
            shareComboLabel: 'コンボ',
            shareLevelLabel: 'レベル',
            shareHighScoreLabel: 'ハイスコア',
            shareDownloading: '画像を生成中...',
            shareSuccess: '画像を保存しました！',
            shareFailed: 'シェアに失敗しました',
            sharePanelTitle: '📤 スコアをシェア',
            shareNativeBtn: '📱 シェア',
            shareDownloadBtn: '💾 画像を保存',
            shareCopyBtn: '📋 テキストをコピー',
            shareCopySuccess: '✓ クリップボードにコピーしました！',

            // エンドレスモード
            endlessBtn: '∞ エンドレス',
            endlessTitle: '∞ エンドレスモード',
            endlessDesc: '時間制限なし、集中力を試せ！',
            endlessBest: '最高スコア',
            endlessTotal: '総プレイ回数',
            endlessStart: 'チャレンジ開始',
            endlessOver: '∞ チャレンジ終了',
            endlessNewRecord: '🎉 新記録！',
            endlessHint: '枝を避けるだけ、時間の心配なし',

            // カウントダウン
            countdownGo: 'スタート!',

            // テーマ
            themeDarkTip: 'ダークモードに切替',
            themeLightTip: 'ライトモードに切替',

            // 速度オプション
            speedBtn: '⚡ 速度',
            speedTitle: '⚡ ゲーム速度',
            speedSelectDesc: 'お好みのゲーム速度を選択',
            speedSlow: 'スロー',
            speedNormal: 'ノーマル',
            speedFast: 'ファスト',
            speedSlowDesc: '時間減少 -40%、初心者向け',
            speedNormalDesc: 'デフォルトのゲーム速度',
            speedFastDesc: '時間減少 +50%、チャレンジモード',
            speedCurrent: '現在',

            // スキン名
            skinNames: {
                default: 'きこり',
                ninja: '忍者',
                robot: 'ロボット',
                golden: '黄金伝説',
                santa: 'サンタ',
                pumpkin: 'パンプキン',
                pirate: '海賊船長',
                snowman: '雪だるま',
                chinese_new_year: '財神',
                valentine: 'キューピッド',
                easter_bunny: 'イースターバニー',
                summer_surfer: 'サーファー'
            },
            skinDescs: {
                default: '定番の赤シャツきこり',
                ninja: '謎の黒忍者',
                robot: '鋼鉄メカきこり',
                golden: '伝説の黄金きこり',
                santa: '陽気なクリスマスきこり',
                pumpkin: 'ハロウィンの恐怖きこり',
                pirate: '勇敢な海の冒険者',
                snowman: '氷雪世界のきこり',
                chinese_new_year: '新年おめでとう！',
                valentine: '愛を広める愛の神',
                easter_bunny: 'カラフルエッグうさぎ',
                summer_surfer: 'ビーチの酷暑サーファー'
            },

            // 実績名
            achievementNames: {
                first_chop: '初伐採',
                score_10: '初心者きこり',
                score_50: '熟練きこり',
                score_100: 'プロきこり',
                score_200: 'マスターきこり',
                combo_5: 'ミニコンボ',
                combo_10: 'コンボプロ',
                combo_20: 'コンボ王',
                level_5: 'レベル5',
                level_8: 'レベル8',
                level_max: '最高レベル',
                close_call: '間一髪'
            },
            achievementDescs: {
                first_chop: '最初の木を切る',
                score_10: '1ゲームで10点獲得',
                score_50: '1ゲームで50点獲得',
                score_100: '1ゲームで100点獲得',
                score_200: '1ゲームで200点獲得',
                combo_5: '5コンボ達成',
                combo_10: '10コンボ達成',
                combo_20: '20コンボ達成',
                level_5: '難易度レベル5到達',
                level_8: '難易度レベル8到達',
                level_max: '最高難易度レベル11到達',
                close_call: '時間10%以下で20回伐採'
            }
        },
        ko: {
            // 제목
            title: '나무꾼',

            // 시작 화면
            startTitle: '나무꾼',
            startHint1: '← → 또는 A/D로 나무 베기',
            startHint2: '화면 좌우를 터치',
            startHint3: '나뭇가지를 피하고, 시간을 관리해요!',
            startHint4: 'Space/Enter 시작 | ESC/P 일시정지',
            startBtn: '게임 시작',
            dailyBtn: '📅 데일리',
            skinBtn: '👕 스킨',
            leaderboardBtn: '📊 랭킹',
            statsBtn: '📈 통계',
            tutorialBtn: '❓ 튜토리얼',

            // 게임 오버
            gameOver: '게임 오버',
            score: '점수',
            maxCombo: '최대 콤보',
            highScore: '최고 점수',
            restartBtn: '다시 하기',
            achievementsBtn: '🏆 업적',

            // 일시정지
            paused: '⏸️ 일시정지',
            pauseHint: 'ESC 또는 P로 계속',
            resumeBtn: '계속하기',

            // 데일리 챌린지
            dailyTitle: '📅 데일리 챌린지',
            todayDate: '오늘',
            todayBest: '오늘 최고',
            attempts: '도전 횟수',
            dailyHint: '매일 같은 스테이지, 최고 기록에 도전!',
            startChallenge: '도전 시작',
            back: '뒤로',
            challengeOver: '📅 챌린지 종료',
            newRecord: '🎉 신기록!',
            todayHighScore: '오늘 최고',
            todayAttempts: '오늘 도전',
            times: '회',
            retry: '다시 하기',
            backHome: '홈',

            // 스킨
            skinTitle: '👕 스킨',
            skinUnlocked: '해금됨',
            skinLocked: '🔒',
            skinUnlockAt: '점에 해금',

            // 랭킹
            leaderboardTitle: '📊 랭킹',
            rank: '순위',
            lbScore: '점수',
            lbCombo: '콤보',
            lbDate: '날짜',
            clearRecords: '기록 삭제',
            clearConfirm: '모든 기록을 삭제하시겠습니까?',
            noRecords: '기록 없음',

            // 업적
            achievementsTitle: '🏆 업적',
            achievementUnlock: '업적 달성!',

            // 통계
            statsTitle: '📈 게임 통계',
            totalGames: '총 게임 수',
            totalChops: '총 벌목 수',
            totalTime: '총 플레이 시간',
            bestCombo: '최고 콤보',
            avgScore: '평균 점수',
            unlockedAchievements: '🎖️ 해금 업적',
            unlockedSkins: '👕 해금 스킨',
            dailyAttempts: '📅 데일리 도전',
            resetStats: '통계 초기화',
            resetConfirm: '모든 통계를 초기화하시겠습니까? 이 작업은 취소할 수 없습니다.',

            // 튜토리얼
            tutorialWelcome: '나무꾼에 오신 것을 환영합니다!',
            tutorialWelcome1: '당신은 용감한 나무꾼',
            tutorialWelcome2: '가능한 많은 나무를 베세요',
            tutorialWelcome3: '위험한 나뭇가지를 피하면서',
            tutorialControls: '조작 방법',
            tutorialMoveLeft: '왼쪽으로 이동하여 베기',
            tutorialMoveRight: '오른쪽으로 이동하여 베기',
            tutorialTouchHint: '화면 좌우 터치도 가능',
            tutorialBranch: '나뭇가지를 피해요!',
            tutorialBranchWarn: '나뭇가지에 닿으면 = 게임 오버!',
            tutorialBranchHint: '베기 전에 가지 위치 확인',
            tutorialTime: '시간 관리',
            tutorialTimeHint1: '시간 바가 계속 줄어듭니다',
            tutorialTimeHint2: '나무를 베면',
            tutorialTimeHint3: '+시간',
            tutorialTimeHint4: '시간이 다 되면 게임 오버',
            tutorialAdvanced: '고급 팁',
            tutorialCombo: '콤보',
            tutorialComboHint: '빠르게 베서 점수 올리기',
            tutorialDifficulty: '난이도',
            tutorialDifficultyHint: '점수가 오르면 더 어려워져요',
            tutorialAchievement: '업적',
            tutorialAchievementHint: '12개의 업적을 달성',
            tutorialSkin: '스킨',
            tutorialSkinHint: '고득점으로 새 캐릭터 해금',
            skip: '건너뛰기',
            prev: '이전',
            next: '다음',
            finish: '완료',

            // 터치 힌트
            tapLeft: '← 왼쪽 터치',
            tapRight: '오른쪽 터치 →',

            // 볼륨 설정
            volumeSettings: '🎵 볼륨 설정',
            sfxVolume: '🔊 효과음',
            bgmVolume: '🎵 음악',
            vibration: '📳 진동',

            // 팝업
            skinUnlockPopup: '새 스킨 해금!',

            // 리플레이 시스템
            replayBtn: '🎬 리플레이',
            replayTitle: '🎬 지난 게임 리플레이',
            replayScore: '점수',
            replayCombo: '최대 콤보',
            replayChops: '벌목 수',
            replayDuration: '시간',
            replayStart: '리플레이 시작',
            replayStop: '리플레이 중지',
            replayNoData: '데이터 없음',
            replayPlaying: '🎬 리플레이 중...',
            replaySeconds: '초',

            // 공유 기능
            shareBtn: '📤 공유',
            shareTitle: '나무꾼',
            shareScoreLabel: '점수',
            shareComboLabel: '콤보',
            shareLevelLabel: '레벨',
            shareHighScoreLabel: '최고 점수',
            shareDownloading: '이미지 생성 중...',
            shareSuccess: '이미지가 저장되었습니다!',
            shareFailed: '공유에 실패했습니다',
            sharePanelTitle: '📤 점수 공유',
            shareNativeBtn: '📱 공유',
            shareDownloadBtn: '💾 이미지 저장',
            shareCopyBtn: '📋 텍스트 복사',
            shareCopySuccess: '✓ 클립보드에 복사되었습니다!',

            // 엔드리스 모드
            endlessBtn: '∞ 엔드리스',
            endlessTitle: '∞ 엔드리스 모드',
            endlessDesc: '시간 제한 없음, 집중력을 테스트하세요!',
            endlessBest: '최고 점수',
            endlessTotal: '총 게임 횟수',
            endlessStart: '도전 시작',
            endlessOver: '∞ 도전 종료',
            endlessNewRecord: '🎉 신기록!',
            endlessHint: '나뭇가지만 피하면 돼요, 시간 걱정 없음',

            // 카운트다운
            countdownGo: '시작!',

            // 테마
            themeDarkTip: '다크 모드로 전환',
            themeLightTip: '라이트 모드로 전환',

            // 속도 옵션
            speedBtn: '⚡ 속도',
            speedTitle: '⚡ 게임 속도',
            speedSelectDesc: '원하는 게임 속도를 선택하세요',
            speedSlow: '느림',
            speedNormal: '보통',
            speedFast: '빠름',
            speedSlowDesc: '시간 감소 -40%, 초보자용',
            speedNormalDesc: '기본 게임 속도',
            speedFastDesc: '시간 감소 +50%, 도전 모드',
            speedCurrent: '현재',

            // 스킨 이름
            skinNames: {
                default: '나무꾼',
                ninja: '닌자',
                robot: '로봇',
                golden: '황금 전설',
                santa: '산타',
                pumpkin: '호박 머리',
                pirate: '해적 선장',
                snowman: '눈사람',
                chinese_new_year: '재신',
                valentine: '큐피드',
                easter_bunny: '부활절 토끼',
                summer_surfer: '서퍼'
            },
            skinDescs: {
                default: '클래식 빨간 셔츠 나무꾼',
                ninja: '신비로운 검은 닌자',
                robot: '강철 기계 나무꾼',
                golden: '전설의 황금 나무꾼',
                santa: '즐거운 크리스마스 나무꾼',
                pumpkin: '할로윈의 무서운 나무꾼',
                pirate: '용감한 바다 모험가',
                snowman: '얼음 세계의 나무꾼',
                chinese_new_year: '새해 복 많이 받으세요!',
                valentine: '사랑을 전하는 사랑의 신',
                easter_bunny: '귀여운 부활절 토끼',
                summer_surfer: '해변의 멋진 서퍼'
            },

            // 업적 이름
            achievementNames: {
                first_chop: '첫 벌목',
                score_10: '초보 나무꾼',
                score_50: '숙련 나무꾼',
                score_100: '프로 나무꾼',
                score_200: '마스터 나무꾼',
                combo_5: '미니 콤보',
                combo_10: '콤보 프로',
                combo_20: '콤보 킹',
                level_5: '레벨 5',
                level_8: '레벨 8',
                level_max: '최고 레벨',
                close_call: '아슬아슬'
            },
            achievementDescs: {
                first_chop: '첫 나무 베기',
                score_10: '한 게임에서 10점 달성',
                score_50: '한 게임에서 50점 달성',
                score_100: '한 게임에서 100점 달성',
                score_200: '한 게임에서 200점 달성',
                combo_5: '5콤보 달성',
                combo_10: '10콤보 달성',
                combo_20: '20콤보 달성',
                level_5: '난이도 레벨 5 도달',
                level_8: '난이도 레벨 8 도달',
                level_max: '최고 난이도 레벨 11 도달',
                close_call: '시간 10% 이하에서 20회 벌목'
            }
        },
        // 西班牙语
        es: {
            // 标题
            title: 'Leñador',

            // 开始界面
            startTitle: 'Leñador',
            startHint1: 'Pulsa ← → o A/D para talar',
            startHint2: 'También puedes tocar la pantalla',
            startHint3: '¡Esquiva las ramas, no dejes que el tiempo se agote!',
            startHint4: 'Espacio/Enter iniciar | ESC/P pausar',
            startBtn: 'Iniciar Juego',
            dailyBtn: '📅 Desafío Diario',
            skinBtn: '👕 Skins',
            leaderboardBtn: '📊 Ranking',
            statsBtn: '📈 Estadísticas',
            tutorialBtn: '❓ Tutorial',

            // 游戏结束
            gameOver: 'Fin del Juego',
            score: 'Puntuación',
            maxCombo: 'Combo Máximo',
            highScore: 'Mejor Puntuación',
            restartBtn: 'Reintentar',
            achievementsBtn: '🏆 Logros',

            // 暂停
            paused: '⏸️ Pausado',
            pauseHint: 'Pulsa ESC o P para continuar',
            resumeBtn: 'Continuar',

            // 每日挑战
            dailyTitle: '📅 Desafío Diario',
            todayDate: 'Fecha de Hoy',
            todayBest: 'Mejor de Hoy',
            attempts: 'Intentos',
            dailyHint: '¡El mismo nivel cada día, consigue la mejor puntuación!',
            startChallenge: 'Iniciar Desafío',
            back: 'Volver',
            challengeOver: '📅 Desafío Terminado',
            newRecord: '🎉 ¡Nuevo Récord!',
            todayHighScore: 'Mejor de Hoy',
            todayAttempts: 'Intentos de Hoy',
            times: 'veces',
            retry: 'Reintentar',
            backHome: 'Menú Principal',

            // 皮肤
            skinTitle: '👕 Skins',
            skinUnlocked: 'Desbloqueado',
            skinLocked: '🔒',
            skinUnlockAt: 'pts para desbloquear',

            // 排行榜
            leaderboardTitle: '📊 Ranking',
            rank: 'Pos.',
            lbScore: 'Puntos',
            lbCombo: 'Combo',
            lbDate: 'Fecha',
            clearRecords: 'Borrar Registros',
            clearConfirm: '¿Seguro que quieres borrar todos los registros?',
            noRecords: 'Sin registros',

            // 成就
            achievementsTitle: '🏆 Logros',
            achievementUnlock: '¡Logro Desbloqueado!',

            // 统计
            statsTitle: '📈 Estadísticas',
            totalGames: 'Partidas Totales',
            totalChops: 'Árboles Talados',
            totalTime: 'Tiempo Total',
            bestCombo: 'Mejor Combo',
            avgScore: 'Puntuación Media',
            unlockedAchievements: '🎖️ Logros',
            unlockedSkins: '👕 Skins',
            dailyAttempts: '📅 Desafíos',
            resetStats: 'Reiniciar Stats',
            resetConfirm: '¿Seguro que quieres reiniciar todas las estadísticas? Esta acción no se puede deshacer.',

            // 教程
            tutorialWelcome: '¡Bienvenido a Leñador!',
            tutorialWelcome1: 'Eres un valiente leñador',
            tutorialWelcome2: 'Tu objetivo es talar tantos árboles como sea posible',
            tutorialWelcome3: 'Mientras esquivas las ramas peligrosas',
            tutorialControls: 'Controles',
            tutorialMoveLeft: 'Muévete a la izquierda para talar',
            tutorialMoveRight: 'Muévete a la derecha para talar',
            tutorialTouchHint: 'También puedes tocar izquierda/derecha',
            tutorialBranch: '¡Esquiva las Ramas!',
            tutorialBranchWarn: '¡Tocar una rama = Fin del Juego!',
            tutorialBranchHint: 'Mira dónde está la rama antes de talar',
            tutorialTime: 'Gestión del Tiempo',
            tutorialTimeHint1: 'La barra de tiempo disminuye constantemente',
            tutorialTimeHint2: 'Cada tala añade',
            tutorialTimeHint3: '+tiempo',
            tutorialTimeHint4: 'Si el tiempo se agota, pierdes',
            tutorialAdvanced: 'Técnicas Avanzadas',
            tutorialCombo: 'Combo',
            tutorialComboHint: 'Tala rápido para más puntos',
            tutorialDifficulty: 'Dificultad',
            tutorialDifficultyHint: 'Más puntos = más difícil',
            tutorialAchievement: 'Logros',
            tutorialAchievementHint: 'Desbloquea 12 logros',
            tutorialSkin: 'Skins',
            tutorialSkinHint: 'Puntuación alta desbloquea nuevos personajes',
            skip: 'Saltar',
            prev: 'Anterior',
            next: 'Siguiente',
            finish: 'Finalizar',

            // 触摸区域提示
            tapLeft: '← Toca Izquierda',
            tapRight: 'Toca Derecha →',

            // 音量设置
            volumeSettings: '🎵 Volumen',
            sfxVolume: '🔊 Efectos',
            bgmVolume: '🎵 Música',
            vibration: '📳 Vibración',

            // 弹窗
            skinUnlockPopup: '¡Nueva Skin Desbloqueada!',

            // 回放系统
            replayBtn: '🎬 Repetición',
            replayTitle: '🎬 Ver Última Partida',
            replayScore: 'Puntuación',
            replayCombo: 'Mejor Combo',
            replayChops: 'Árboles Talados',
            replayDuration: 'Duración',
            replayStart: 'Iniciar Repetición',
            replayStop: 'Detener',
            replayNoData: 'Sin datos de repetición',
            replayPlaying: '🎬 Reproduciendo...',
            replaySeconds: 's',

            // 分享功能
            shareBtn: '📤 Compartir',
            shareTitle: 'Leñador',
            shareScoreLabel: 'Puntuación',
            shareComboLabel: 'Combo',
            shareLevelLabel: 'Nivel',
            shareHighScoreLabel: 'Récord',
            shareDownloading: 'Generando imagen...',
            shareSuccess: '¡Imagen guardada!',
            shareFailed: 'Error al compartir, inténtalo de nuevo',
            sharePanelTitle: '📤 Compartir Puntuación',
            shareNativeBtn: '📱 Compartir',
            shareDownloadBtn: '💾 Guardar Imagen',
            shareCopyBtn: '📋 Copiar Texto',
            shareCopySuccess: '✓ ¡Copiado al portapapeles!',

            // Modo infinito
            endlessBtn: '∞ Modo Infinito',
            endlessTitle: '∞ Modo Infinito',
            endlessDesc: '¡Sin límite de tiempo, prueba tu concentración!',
            endlessBest: 'Mejor Puntuación',
            endlessTotal: 'Partidas Totales',
            endlessStart: 'Iniciar Desafío',
            endlessOver: '∞ Desafío Terminado',
            endlessNewRecord: '🎉 ¡Nuevo Récord!',
            endlessHint: 'Solo evita las ramas, sin presión de tiempo',

            // Cuenta regresiva
            countdownGo: '¡YA!',

            // Tema
            themeDarkTip: 'Cambiar a Modo Oscuro',
            themeLightTip: 'Cambiar a Modo Claro',

            // Opciones de velocidad
            speedBtn: '⚡ Velocidad',
            speedTitle: '⚡ Velocidad del Juego',
            speedSelectDesc: 'Elige tu velocidad de juego preferida',
            speedSlow: 'Lento',
            speedNormal: 'Normal',
            speedFast: 'Rápido',
            speedSlowDesc: '-40% consumo de tiempo, para principiantes',
            speedNormalDesc: 'Velocidad de juego predeterminada',
            speedFastDesc: '+50% consumo de tiempo, modo desafío',
            speedCurrent: 'Actual',

            // 皮肤名称
            skinNames: {
                default: 'Leñador',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Leyenda Dorada',
                santa: 'Papá Noel',
                pumpkin: 'Cabeza de Calabaza',
                pirate: 'Capitán Pirata',
                snowman: 'Muñeco de Nieve',
                chinese_new_year: 'Dios de la Fortuna',
                valentine: 'Cupido',
                easter_bunny: 'Conejo de Pascua',
                summer_surfer: 'Surfista de Verano'
            },
            skinDescs: {
                default: 'El clásico leñador de rojo',
                ninja: 'El misterioso ninja de negro',
                robot: 'El leñador mecánico de acero',
                golden: 'El legendario leñador dorado',
                santa: 'El alegre leñador navideño',
                pumpkin: 'El aterrador leñador de Halloween',
                pirate: 'El valiente aventurero del mar',
                snowman: 'El leñador del mundo helado',
                chinese_new_year: '¡Feliz Año Nuevo, buena fortuna!',
                valentine: 'El dios del amor que esparce cariño',
                easter_bunny: 'El adorable conejito con huevos de Pascua',
                summer_surfer: 'El genial leñador de playa'
            },

            // 成就名称
            achievementNames: {
                first_chop: 'Primera Tala',
                score_10: 'Leñador Novato',
                score_50: 'Leñador Hábil',
                score_100: 'Leñador Profesional',
                score_200: 'Maestro Leñador',
                combo_5: 'Mini Combo',
                combo_10: 'Experto en Combos',
                combo_20: 'Rey del Combo',
                level_5: 'Nivel 5',
                level_8: 'Nivel 8',
                level_max: 'Nivel Máximo',
                close_call: 'Por los Pelos'
            },
            achievementDescs: {
                first_chop: 'Tala tu primer árbol',
                score_10: 'Alcanza 10 puntos en una partida',
                score_50: 'Alcanza 50 puntos en una partida',
                score_100: 'Alcanza 100 puntos en una partida',
                score_200: 'Alcanza 200 puntos en una partida',
                combo_5: 'Alcanza un combo de 5',
                combo_10: 'Alcanza un combo de 10',
                combo_20: 'Alcanza un combo de 20',
                level_5: 'Alcanza el nivel de dificultad 5',
                level_8: 'Alcanza el nivel de dificultad 8',
                level_max: 'Alcanza el nivel máximo 11',
                close_call: 'Tala 20 árboles con menos del 10% de tiempo'
            }
        },
        // 法语
        fr: {
            // Titre
            title: 'Bûcheron',

            // Écran de démarrage
            startTitle: 'Bûcheron',
            startHint1: 'Appuyez sur ← → ou A/D pour couper',
            startHint2: 'Touchez à gauche/droite de l\'écran',
            startHint3: 'Évitez les branches, battez le chrono !',
            startHint4: 'Espace/Entrée Démarrer | ESC/P Pause',
            startBtn: 'Jouer',
            dailyBtn: '📅 Défi Quotidien',
            skinBtn: '👕 Skins',
            leaderboardBtn: '📊 Classement',
            statsBtn: '📈 Stats',
            tutorialBtn: '❓ Tutoriel',

            // Fin de partie
            gameOver: 'Fin de Partie',
            score: 'Score',
            maxCombo: 'Combo Max',
            highScore: 'Meilleur Score',
            restartBtn: 'Rejouer',
            achievementsBtn: '🏆 Succès',

            // Pause
            paused: '⏸️ Pause',
            pauseHint: 'Appuyez sur ESC ou P pour continuer',
            resumeBtn: 'Reprendre',

            // Défi quotidien
            dailyTitle: '📅 Défi Quotidien',
            todayDate: 'Aujourd\'hui',
            todayBest: 'Meilleur Aujourd\'hui',
            attempts: 'Tentatives',
            dailyHint: 'Même niveau pour tous, battez votre record !',
            startChallenge: 'Commencer le Défi',
            back: 'Retour',
            challengeOver: '📅 Défi Terminé',
            newRecord: '🎉 Nouveau Record !',
            todayHighScore: 'Meilleur Aujourd\'hui',
            todayAttempts: 'Tentatives Aujourd\'hui',
            times: 'fois',
            retry: 'Rejouer',
            backHome: 'Accueil',

            // Skins
            skinTitle: '👕 Skins',
            skinUnlocked: 'Débloqué',
            skinLocked: '🔒',
            skinUnlockAt: 'pts pour débloquer',

            // Classement
            leaderboardTitle: '📊 Classement',
            rank: 'Rang',
            lbScore: 'Score',
            lbCombo: 'Combo',
            lbDate: 'Date',
            clearRecords: 'Effacer Tout',
            clearConfirm: 'Voulez-vous vraiment effacer tous les records ?',
            noRecords: 'Aucun record',

            // Succès
            achievementsTitle: '🏆 Succès',
            achievementUnlock: 'Succès Débloqué !',

            // Statistiques
            statsTitle: '📈 Statistiques',
            totalGames: 'Parties Totales',
            totalChops: 'Arbres Coupés',
            totalTime: 'Temps Total',
            bestCombo: 'Meilleur Combo',
            avgScore: 'Score Moyen',
            unlockedAchievements: '🎖️ Succès',
            unlockedSkins: '👕 Skins',
            dailyAttempts: '📅 Défis',
            resetStats: 'Réinitialiser',
            resetConfirm: 'Voulez-vous vraiment réinitialiser toutes les statistiques ? Cette action est irréversible.',

            // Tutoriel
            tutorialWelcome: 'Bienvenue dans Bûcheron !',
            tutorialWelcome1: 'Vous êtes un brave bûcheron',
            tutorialWelcome2: 'Coupez autant d\'arbres que possible',
            tutorialWelcome3: 'Tout en évitant les branches dangereuses',
            tutorialControls: 'Contrôles',
            tutorialMoveLeft: 'Aller à gauche et couper',
            tutorialMoveRight: 'Aller à droite et couper',
            tutorialTouchHint: 'Ou touchez à gauche/droite',
            tutorialBranch: 'Évitez les Branches !',
            tutorialBranchWarn: 'Toucher une branche = Fin de Partie !',
            tutorialBranchHint: 'Regardez avant de couper',
            tutorialTime: 'Gestion du Temps',
            tutorialTimeHint1: 'La barre de temps diminue',
            tutorialTimeHint2: 'Chaque coupe donne',
            tutorialTimeHint3: '+temps',
            tutorialTimeHint4: 'Temps écoulé = Fin de Partie',
            tutorialAdvanced: 'Astuces Pro',
            tutorialCombo: 'Combo',
            tutorialComboHint: 'Coupez vite pour plus de points',
            tutorialDifficulty: 'Difficulté',
            tutorialDifficultyHint: 'Plus dur à mesure que vous scorez',
            tutorialAchievement: 'Succès',
            tutorialAchievementHint: 'Débloquez 12 succès',
            tutorialSkin: 'Skins',
            tutorialSkinHint: 'Hauts scores débloquent des skins',
            skip: 'Passer',
            prev: 'Précédent',
            next: 'Suivant',
            finish: 'Terminer',

            // Indications tactiles
            tapLeft: '← Touchez Gauche',
            tapRight: 'Touchez Droite →',

            // Paramètres de volume
            volumeSettings: '🎵 Volume',
            sfxVolume: '🔊 Effets',
            bgmVolume: '🎵 Musique',
            vibration: '📳 Vibration',

            // Pop-ups
            skinUnlockPopup: 'Nouveau Skin Débloqué !',

            // Système de replay
            replayBtn: '🎬 Replay',
            replayTitle: '🎬 Dernière Partie',
            replayScore: 'Score',
            replayCombo: 'Combo Max',
            replayChops: 'Arbres Coupés',
            replayDuration: 'Durée',
            replayStart: 'Lancer le Replay',
            replayStop: 'Arrêter',
            replayNoData: 'Pas de données',
            replayPlaying: '🎬 Lecture en cours...',
            replaySeconds: 's',

            // Partage
            shareBtn: '📤 Partager',
            shareTitle: 'Bûcheron',
            shareScoreLabel: 'Score',
            shareComboLabel: 'Combo',
            shareLevelLabel: 'Niveau',
            shareHighScoreLabel: 'Record',
            shareDownloading: 'Génération de l\'image...',
            shareSuccess: 'Image sauvegardée !',
            shareFailed: 'Échec du partage, réessayez',
            sharePanelTitle: '📤 Partager le Score',
            shareNativeBtn: '📱 Partager',
            shareDownloadBtn: '💾 Sauvegarder Image',
            shareCopyBtn: '📋 Copier Texte',
            shareCopySuccess: '✓ Copié dans le presse-papiers !',

            // Mode infini
            endlessBtn: '∞ Mode Infini',
            endlessTitle: '∞ Mode Infini',
            endlessDesc: 'Sans limite de temps, testez votre concentration !',
            endlessBest: 'Meilleur Score',
            endlessTotal: 'Parties Totales',
            endlessStart: 'Commencer le Défi',
            endlessOver: '∞ Défi Terminé',
            endlessNewRecord: '🎉 Nouveau Record !',
            endlessHint: 'Évitez les branches, pas de pression temporelle',

            // Compte à rebours
            countdownGo: 'GO!',

            // Thème
            themeDarkTip: 'Passer au Mode Sombre',
            themeLightTip: 'Passer au Mode Clair',

            // Options de vitesse
            speedBtn: '⚡ Vitesse',
            speedTitle: '⚡ Vitesse du Jeu',
            speedSelectDesc: 'Choisissez votre vitesse de jeu préférée',
            speedSlow: 'Lent',
            speedNormal: 'Normal',
            speedFast: 'Rapide',
            speedSlowDesc: '-40% décroissance du temps, pour débutants',
            speedNormalDesc: 'Vitesse de jeu par défaut',
            speedFastDesc: '+50% décroissance du temps, mode défi',
            speedCurrent: 'Actuel',

            // Noms des skins
            skinNames: {
                default: 'Bûcheron',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Légende Dorée',
                santa: 'Père Noël',
                pumpkin: 'Tête de Citrouille',
                pirate: 'Capitaine Pirate',
                snowman: 'Bonhomme de Neige',
                chinese_new_year: 'Dieu de la Fortune',
                valentine: 'Cupidon',
                easter_bunny: 'Lapin de Pâques',
                summer_surfer: 'Surfeur d\'Été'
            },
            skinDescs: {
                default: 'Le bûcheron classique en rouge',
                ninja: 'Le mystérieux ninja en noir',
                robot: 'Le bûcheron mécanique en acier',
                golden: 'Le légendaire bûcheron doré',
                santa: 'Le joyeux bûcheron de Noël',
                pumpkin: 'Le terrifiant bûcheron d\'Halloween',
                pirate: 'Le brave aventurier des mers',
                snowman: 'Le bûcheron du monde glacé',
                chinese_new_year: 'Bonne année, bonne fortune !',
                valentine: 'Le dieu de l\'amour qui répand l\'affection',
                easter_bunny: 'L\'adorable lapin aux œufs de Pâques',
                summer_surfer: 'Le cool bûcheron de la plage'
            },

            // Noms des succès
            achievementNames: {
                first_chop: 'Première Coupe',
                score_10: 'Bûcheron Débutant',
                score_50: 'Bûcheron Confirmé',
                score_100: 'Bûcheron Pro',
                score_200: 'Maître Bûcheron',
                combo_5: 'Mini Combo',
                combo_10: 'Expert Combo',
                combo_20: 'Roi du Combo',
                level_5: 'Niveau 5',
                level_8: 'Niveau 8',
                level_max: 'Niveau Maximum',
                close_call: 'Tout Juste'
            },
            achievementDescs: {
                first_chop: 'Coupez votre premier arbre',
                score_10: 'Atteignez 10 points en une partie',
                score_50: 'Atteignez 50 points en une partie',
                score_100: 'Atteignez 100 points en une partie',
                score_200: 'Atteignez 200 points en une partie',
                combo_5: 'Atteignez un combo de 5',
                combo_10: 'Atteignez un combo de 10',
                combo_20: 'Atteignez un combo de 20',
                level_5: 'Atteignez le niveau de difficulté 5',
                level_8: 'Atteignez le niveau de difficulté 8',
                level_max: 'Atteignez le niveau maximum 11',
                close_call: 'Coupez 20 arbres avec moins de 10% de temps'
            }
        },
        de: {
            // Titel
            title: 'Holzfäller',

            // Startbildschirm
            startTitle: 'Holzfäller',
            startHint1: 'Drücke ← → oder A/D zum Hacken',
            startHint2: 'Tippe links/rechts auf den Bildschirm',
            startHint3: 'Weiche Ästen aus, schlage die Uhr!',
            startHint4: 'Leertaste/Enter Start | ESC/P Pause',
            startBtn: 'Spiel starten',
            dailyBtn: '📅 Tägliche Herausforderung',
            skinBtn: '👕 Skins',
            leaderboardBtn: '📊 Bestenliste',
            statsBtn: '📈 Statistiken',
            tutorialBtn: '❓ Anleitung',

            // Spielende
            gameOver: 'Spiel vorbei',
            score: 'Punkte',
            maxCombo: 'Max Combo',
            highScore: 'Highscore',
            restartBtn: 'Nochmal',
            achievementsBtn: '🏆 Erfolge',

            // Pause
            paused: '⏸️ Pause',
            pauseHint: 'Drücke ESC oder P zum Fortsetzen',
            resumeBtn: 'Fortsetzen',

            // Tägliche Herausforderung
            dailyTitle: '📅 Tägliche Herausforderung',
            todayDate: 'Heute',
            todayBest: 'Heute Beste',
            attempts: 'Versuche',
            dailyHint: 'Gleiches Level für alle, schlage deinen Rekord!',
            startChallenge: 'Herausforderung starten',
            back: 'Zurück',
            challengeOver: '📅 Herausforderung beendet',
            newRecord: '🎉 Neuer Rekord!',
            todayHighScore: 'Heute Beste',
            todayAttempts: 'Heutige Versuche',
            times: 'mal',
            retry: 'Nochmal',
            backHome: 'Startseite',

            // Skins
            skinTitle: '👕 Skins',
            skinUnlocked: 'Freigeschaltet',
            skinLocked: '🔒',
            skinUnlockAt: 'Pkt. zum Freischalten',

            // Bestenliste
            leaderboardTitle: '📊 Bestenliste',
            rank: 'Rang',
            lbScore: 'Punkte',
            lbCombo: 'Combo',
            lbDate: 'Datum',
            clearRecords: 'Alle löschen',
            clearConfirm: 'Möchtest du wirklich alle Einträge löschen?',
            noRecords: 'Keine Einträge',

            // Erfolge
            achievementsTitle: '🏆 Erfolge',
            achievementUnlock: 'Erfolg freigeschaltet!',

            // Statistiken
            statsTitle: '📈 Spielstatistiken',
            totalGames: 'Spiele gesamt',
            totalChops: 'Bäume gefällt',
            totalTime: 'Spielzeit gesamt',
            bestCombo: 'Bester Combo',
            avgScore: 'Durchschnitt',
            unlockedAchievements: '🎖️ Erfolge',
            unlockedSkins: '👕 Skins',
            dailyAttempts: '📅 Tägliche Herausforderungen',
            resetStats: 'Zurücksetzen',
            resetConfirm: 'Möchtest du wirklich alle Statistiken zurücksetzen? Dies kann nicht rückgängig gemacht werden.',

            // Tutorial
            tutorialWelcome: 'Willkommen bei Holzfäller!',
            tutorialWelcome1: 'Du bist ein mutiger Holzfäller',
            tutorialWelcome2: 'Fälle so viele Bäume wie möglich',
            tutorialWelcome3: 'Und weiche gefährlichen Ästen aus',
            tutorialControls: 'Steuerung',
            tutorialMoveLeft: 'Nach links bewegen und hacken',
            tutorialMoveRight: 'Nach rechts bewegen und hacken',
            tutorialTouchHint: 'Oder tippe links/rechts auf den Bildschirm',
            tutorialBranch: 'Weiche Ästen aus!',
            tutorialBranchWarn: 'Ast berührt = Spiel vorbei!',
            tutorialBranchHint: 'Schau bevor du hackst',
            tutorialTime: 'Zeitmanagement',
            tutorialTimeHint1: 'Die Zeitleiste sinkt ständig',
            tutorialTimeHint2: 'Jeder Hieb gibt',
            tutorialTimeHint3: '+Zeit',
            tutorialTimeHint4: 'Zeit abgelaufen = Spiel vorbei',
            tutorialAdvanced: 'Profi-Tipps',
            tutorialCombo: 'Combo',
            tutorialComboHint: 'Schnell hacken für mehr Punkte',
            tutorialDifficulty: 'Schwierigkeit',
            tutorialDifficultyHint: 'Wird schwerer je mehr du punktest',
            tutorialAchievement: 'Erfolge',
            tutorialAchievementHint: '12 Erfolge freischalten',
            tutorialSkin: 'Skins',
            tutorialSkinHint: 'Hohe Punktzahlen schalten Skins frei',
            skip: 'Überspringen',
            prev: 'Zurück',
            next: 'Weiter',
            finish: 'Fertig',

            // Touch-Hinweise
            tapLeft: '← Links tippen',
            tapRight: 'Rechts tippen →',

            // Lautstärkeeinstellungen
            volumeSettings: '🎵 Lautstärke',
            sfxVolume: '🔊 Effekte',
            bgmVolume: '🎵 Musik',
            vibration: '📳 Vibration',

            // Pop-ups
            skinUnlockPopup: 'Neuer Skin freigeschaltet!',

            // Wiedergabesystem
            replayBtn: '🎬 Wiedergabe',
            replayTitle: '🎬 Letztes Spiel',
            replayScore: 'Punkte',
            replayCombo: 'Max Combo',
            replayChops: 'Bäume gefällt',
            replayDuration: 'Dauer',
            replayStart: 'Wiedergabe starten',
            replayStop: 'Stoppen',
            replayNoData: 'Keine Daten',
            replayPlaying: '🎬 Wiedergabe läuft...',
            replaySeconds: 's',

            // Teilen
            shareBtn: '📤 Teilen',
            shareTitle: 'Holzfäller',
            shareScoreLabel: 'Punkte',
            shareComboLabel: 'Combo',
            shareLevelLabel: 'Level',
            shareHighScoreLabel: 'Highscore',
            shareDownloading: 'Bild wird erstellt...',
            shareSuccess: 'Bild gespeichert!',
            shareFailed: 'Teilen fehlgeschlagen, bitte erneut versuchen',
            sharePanelTitle: '📤 Ergebnis teilen',
            shareNativeBtn: '📱 Teilen',
            shareDownloadBtn: '💾 Bild speichern',
            shareCopyBtn: '📋 Text kopieren',
            shareCopySuccess: '✓ In die Zwischenablage kopiert!',

            // Endlosmodus
            endlessBtn: '∞ Endlosmodus',
            endlessTitle: '∞ Endlosmodus',
            endlessDesc: 'Ohne Zeitlimit, teste deine Konzentration!',
            endlessBest: 'Highscore',
            endlessTotal: 'Spiele Gesamt',
            endlessStart: 'Herausforderung Starten',
            endlessOver: '∞ Herausforderung Beendet',
            endlessNewRecord: '🎉 Neuer Rekord!',
            endlessHint: 'Nur Ästen ausweichen, kein Zeitdruck',

            // Countdown
            countdownGo: 'LOS!',

            // Thema
            themeDarkTip: 'Zum Dunkelmodus wechseln',
            themeLightTip: 'Zum Hellmodus wechseln',

            // Geschwindigkeitsoptionen
            speedBtn: '⚡ Tempo',
            speedTitle: '⚡ Spielgeschwindigkeit',
            speedSelectDesc: 'Wähle deine bevorzugte Spielgeschwindigkeit',
            speedSlow: '🐢 Langsam',
            speedNormal: '🚶 Normal',
            speedFast: '🏃 Schnell',
            speedSlowDesc: 'Langsamerer Zeitverbrauch, für Anfänger',
            speedNormalDesc: 'Standard-Spielgeschwindigkeit',
            speedFastDesc: 'Schnellerer Zeitverbrauch, Herausforderung',
            speedCurrent: 'Aktuell',

            // Skin-Namen
            skinNames: {
                default: 'Holzfäller',
                ninja: 'Ninja',
                robot: 'Roboter',
                golden: 'Goldene Legende',
                santa: 'Weihnachtsmann',
                pumpkin: 'Kürbiskopf',
                pirate: 'Piratenkapitän',
                snowman: 'Schneemann',
                chinese_new_year: 'Glücksgott',
                valentine: 'Amor',
                easter_bunny: 'Osterhase',
                summer_surfer: 'Sommersurfer'
            },
            skinDescs: {
                default: 'Der klassische Holzfäller in Rot',
                ninja: 'Der geheimnisvolle Ninja in Schwarz',
                robot: 'Der mechanische Stahl-Holzfäller',
                golden: 'Der legendäre goldene Holzfäller',
                santa: 'Der fröhliche Weihnachts-Holzfäller',
                pumpkin: 'Der gruselige Halloween-Holzfäller',
                pirate: 'Der mutige Seeabenteurer',
                snowman: 'Der Holzfäller aus der Eiswelt',
                chinese_new_year: 'Frohes neues Jahr, viel Glück!',
                valentine: 'Der Liebesgott verbreitet Liebe',
                easter_bunny: 'Der süße bunte Osterhase',
                summer_surfer: 'Der coole Strand-Holzfäller'
            },

            // Erfolgsnamen
            achievementNames: {
                first_chop: 'Erster Hieb',
                score_10: 'Anfänger-Holzfäller',
                score_50: 'Erfahrener Holzfäller',
                score_100: 'Profi-Holzfäller',
                score_200: 'Meister-Holzfäller',
                combo_5: 'Mini Combo',
                combo_10: 'Combo-Experte',
                combo_20: 'Combo-König',
                level_5: 'Level 5',
                level_8: 'Level 8',
                level_max: 'Maximales Level',
                close_call: 'Haarscharf'
            },
            achievementDescs: {
                first_chop: 'Fälle deinen ersten Baum',
                score_10: 'Erreiche 10 Punkte in einem Spiel',
                score_50: 'Erreiche 50 Punkte in einem Spiel',
                score_100: 'Erreiche 100 Punkte in einem Spiel',
                score_200: 'Erreiche 200 Punkte in einem Spiel',
                combo_5: 'Erreiche einen 5er Combo',
                combo_10: 'Erreiche einen 10er Combo',
                combo_20: 'Erreiche einen 20er Combo',
                level_5: 'Erreiche Schwierigkeitsgrad 5',
                level_8: 'Erreiche Schwierigkeitsgrad 8',
                level_max: 'Erreiche maximalen Schwierigkeitsgrad 11',
                close_call: 'Fälle 20 Bäume bei unter 10% Zeit'
            }
        },
        pt: {
            // Título
            title: 'Lenhador',

            // Tela inicial
            startTitle: 'Lenhador',
            startHint1: 'Pressione ← → ou A/D para cortar',
            startHint2: 'Toque à esquerda/direita da tela',
            startHint3: 'Desvie dos galhos, vença o tempo!',
            startHint4: 'Espaço/Enter Iniciar | ESC/P Pausar',
            startBtn: 'Iniciar Jogo',
            dailyBtn: '📅 Desafio Diário',
            skinBtn: '👕 Skins',
            leaderboardBtn: '📊 Ranking',
            statsBtn: '📈 Estatísticas',
            tutorialBtn: '❓ Tutorial',

            // Fim de jogo
            gameOver: 'Fim de Jogo',
            score: 'Pontuação',
            maxCombo: 'Combo Máximo',
            highScore: 'Recorde',
            restartBtn: 'Tentar Novamente',
            achievementsBtn: '🏆 Conquistas',

            // Pausa
            paused: '⏸️ Pausado',
            pauseHint: 'Pressione ESC ou P para continuar',
            resumeBtn: 'Continuar',

            // Desafio diário
            dailyTitle: '📅 Desafio Diário',
            todayDate: 'Hoje',
            todayBest: 'Melhor de Hoje',
            attempts: 'Tentativas',
            dailyHint: 'Mesmo nível para todos, supere seu recorde!',
            startChallenge: 'Iniciar Desafio',
            back: 'Voltar',
            challengeOver: '📅 Desafio Encerrado',
            newRecord: '🎉 Novo Recorde!',
            todayHighScore: 'Melhor de Hoje',
            todayAttempts: 'Tentativas Hoje',
            times: 'vezes',
            retry: 'Tentar Novamente',
            backHome: 'Início',

            // Skins
            skinTitle: '👕 Skins',
            skinUnlocked: 'Desbloqueado',
            skinLocked: '🔒',
            skinUnlockAt: 'pts para desbloquear',

            // Ranking
            leaderboardTitle: '📊 Ranking',
            rank: 'Posição',
            lbScore: 'Pontos',
            lbCombo: 'Combo',
            lbDate: 'Data',
            clearRecords: 'Limpar Tudo',
            clearConfirm: 'Tem certeza que deseja limpar todos os registros?',
            noRecords: 'Sem registros',

            // Conquistas
            achievementsTitle: '🏆 Conquistas',
            achievementUnlock: 'Conquista Desbloqueada!',

            // Estatísticas
            statsTitle: '📈 Estatísticas do Jogo',
            totalGames: 'Total de Jogos',
            totalChops: 'Total de Cortes',
            totalTime: 'Tempo Total',
            bestCombo: 'Melhor Combo',
            avgScore: 'Média de Pontos',
            unlockedAchievements: '🎖️ Conquistas',
            unlockedSkins: '👕 Skins',
            dailyAttempts: '📅 Desafios Diários',
            resetStats: 'Resetar',
            resetConfirm: 'Tem certeza que deseja resetar todas as estatísticas? Isso não pode ser desfeito.',

            // Tutorial
            tutorialWelcome: 'Bem-vindo ao Lenhador!',
            tutorialWelcome1: 'Você é um corajoso lenhador',
            tutorialWelcome2: 'Corte o máximo de árvores que puder',
            tutorialWelcome3: 'Desviando dos galhos perigosos',
            tutorialControls: 'Controles',
            tutorialMoveLeft: 'Mover para esquerda e cortar',
            tutorialMoveRight: 'Mover para direita e cortar',
            tutorialTouchHint: 'Ou toque à esquerda/direita da tela',
            tutorialBranch: 'Desvie dos Galhos!',
            tutorialBranchWarn: 'Bater no galho = Fim de Jogo!',
            tutorialBranchHint: 'Olhe antes de cortar',
            tutorialTime: 'Gestão do Tempo',
            tutorialTimeHint1: 'A barra de tempo diminui constantemente',
            tutorialTimeHint2: 'Cada corte dá',
            tutorialTimeHint3: '+tempo',
            tutorialTimeHint4: 'Tempo esgotado = Fim de Jogo',
            tutorialAdvanced: 'Dicas Pro',
            tutorialCombo: 'Combo',
            tutorialComboHint: 'Corte rápido para mais pontos',
            tutorialDifficulty: 'Dificuldade',
            tutorialDifficultyHint: 'Fica mais difícil conforme pontua',
            tutorialAchievement: 'Conquistas',
            tutorialAchievementHint: 'Desbloqueie 12 conquistas',
            tutorialSkin: 'Skins',
            tutorialSkinHint: 'Pontuações altas desbloqueiam skins',
            skip: 'Pular',
            prev: 'Voltar',
            next: 'Próximo',
            finish: 'Finalizar',

            // Dicas de toque
            tapLeft: '← Toque Esquerda',
            tapRight: 'Toque Direita →',

            // Configurações de volume
            volumeSettings: '🎵 Volume',
            sfxVolume: '🔊 Efeitos',
            bgmVolume: '🎵 Música',
            vibration: '📳 Vibração',

            // Pop-ups
            skinUnlockPopup: 'Nova Skin Desbloqueada!',

            // Sistema de replay
            replayBtn: '🎬 Replay',
            replayTitle: '🎬 Último Jogo',
            replayScore: 'Pontos',
            replayCombo: 'Combo Máximo',
            replayChops: 'Cortes',
            replayDuration: 'Duração',
            replayStart: 'Iniciar Replay',
            replayStop: 'Parar',
            replayNoData: 'Sem dados',
            replayPlaying: '🎬 Reproduzindo...',
            replaySeconds: 's',

            // Compartilhar
            shareBtn: '📤 Compartilhar',
            shareTitle: 'Lenhador',
            shareScoreLabel: 'Pontos',
            shareComboLabel: 'Combo',
            shareLevelLabel: 'Nível',
            shareHighScoreLabel: 'Recorde',
            shareDownloading: 'Gerando imagem...',
            shareSuccess: 'Imagem salva!',
            shareFailed: 'Falha ao compartilhar, tente novamente',
            sharePanelTitle: '📤 Compartilhar Pontuação',
            shareNativeBtn: '📱 Compartilhar',
            shareDownloadBtn: '💾 Salvar Imagem',
            shareCopyBtn: '📋 Copiar Texto',
            shareCopySuccess: '✓ Copiado para a área de transferência!',

            // Modo infinito
            endlessBtn: '∞ Modo Infinito',
            endlessTitle: '∞ Modo Infinito',
            endlessDesc: 'Sem limite de tempo, teste sua concentração!',
            endlessBest: 'Melhor Pontuação',
            endlessTotal: 'Total de Jogos',
            endlessStart: 'Iniciar Desafio',
            endlessOver: '∞ Desafio Encerrado',
            endlessNewRecord: '🎉 Novo Recorde!',
            endlessHint: 'Apenas evite os galhos, sem pressão de tempo',

            // Contagem regressiva
            countdownGo: 'VAI!',

            // Tema
            themeDarkTip: 'Mudar para Modo Escuro',
            themeLightTip: 'Mudar para Modo Claro',

            // Opções de velocidade
            speedBtn: '⚡ Velocidade',
            speedTitle: '⚡ Velocidade do Jogo',
            speedSelectDesc: 'Escolha sua velocidade de jogo preferida',
            speedSlow: '🐢 Lento',
            speedNormal: '🚶 Normal',
            speedFast: '🏃 Rápido',
            speedSlowDesc: 'Tempo mais lento, para iniciantes',
            speedNormalDesc: 'Velocidade padrão do jogo',
            speedFastDesc: 'Tempo mais rápido, modo desafio',
            speedCurrent: 'Atual',

            // Nomes das skins
            skinNames: {
                default: 'Lenhador',
                ninja: 'Ninja',
                robot: 'Robô',
                golden: 'Lenda Dourada',
                santa: 'Papai Noel',
                pumpkin: 'Cabeça de Abóbora',
                pirate: 'Capitão Pirata',
                snowman: 'Boneco de Neve',
                chinese_new_year: 'Deus da Riqueza',
                valentine: 'Cupido',
                easter_bunny: 'Coelho da Páscoa',
                summer_surfer: 'Surfista de Verão'
            },
            skinDescs: {
                default: 'O clássico lenhador de camisa vermelha',
                ninja: 'O misterioso ninja de preto',
                robot: 'O lenhador mecânico de aço',
                golden: 'O lendário lenhador dourado',
                santa: 'O alegre lenhador natalino',
                pumpkin: 'O assustador lenhador de Halloween',
                pirate: 'O corajoso aventureiro dos mares',
                snowman: 'O lenhador do mundo gelado',
                chinese_new_year: 'Feliz Ano Novo! Boa sorte!',
                valentine: 'O deus do amor espalhando amor',
                easter_bunny: 'O coelhinho colorido fofo',
                summer_surfer: 'O surfista descolado da praia'
            },

            // Nomes das conquistas
            achievementNames: {
                first_chop: 'Primeiro Corte',
                score_10: 'Lenhador Iniciante',
                score_50: 'Lenhador Habilidoso',
                score_100: 'Lenhador Profissional',
                score_200: 'Mestre Lenhador',
                combo_5: 'Mini Combo',
                combo_10: 'Combo Pro',
                combo_20: 'Rei do Combo',
                level_5: 'Nível 5',
                level_8: 'Nível 8',
                level_max: 'Nível Máximo',
                close_call: 'Por um Fio'
            },
            achievementDescs: {
                first_chop: 'Corte sua primeira árvore',
                score_10: 'Alcance 10 pontos em um jogo',
                score_50: 'Alcance 50 pontos em um jogo',
                score_100: 'Alcance 100 pontos em um jogo',
                score_200: 'Alcance 200 pontos em um jogo',
                combo_5: 'Alcance combo de 5',
                combo_10: 'Alcance combo de 10',
                combo_20: 'Alcance combo de 20',
                level_5: 'Alcance nível de dificuldade 5',
                level_8: 'Alcance nível de dificuldade 8',
                level_max: 'Alcance nível máximo de dificuldade 11',
                close_call: 'Corte 20 vezes com tempo abaixo de 10%'
            }
        },
        // 意大利语
        it: {
            // Titolo
            title: 'Boscaiolo',

            // Schermata iniziale
            startTitle: 'Boscaiolo',
            startHint1: 'Premi ← → o A/D per tagliare',
            startHint2: 'Tocca a sinistra/destra dello schermo',
            startHint3: 'Evita i rami, batti il tempo!',
            startHint4: 'Spazio/Invio Avvia | ESC/P Pausa',
            startBtn: 'Inizia Gioco',
            dailyBtn: '📅 Sfida Giornaliera',
            skinBtn: '👕 Skin',
            leaderboardBtn: '📊 Classifica',
            statsBtn: '📈 Statistiche',
            tutorialBtn: '❓ Tutorial',

            // Fine gioco
            gameOver: 'Fine Partita',
            score: 'Punteggio',
            maxCombo: 'Combo Max',
            highScore: 'Record',
            restartBtn: 'Riprova',
            achievementsBtn: '🏆 Obiettivi',

            // Pausa
            paused: '⏸️ In Pausa',
            pauseHint: 'Premi ESC o P per continuare',
            resumeBtn: 'Riprendi',

            // Sfida giornaliera
            dailyTitle: '📅 Sfida Giornaliera',
            todayDate: 'Oggi',
            todayBest: 'Miglior Oggi',
            attempts: 'Tentativi',
            dailyHint: 'Stesso livello per tutti, batti il tuo record!',
            startChallenge: 'Inizia Sfida',
            back: 'Indietro',
            challengeOver: '📅 Sfida Terminata',
            newRecord: '🎉 Nuovo Record!',
            todayHighScore: 'Miglior Oggi',
            todayAttempts: 'Tentativi Oggi',
            times: 'volte',
            retry: 'Riprova',
            backHome: 'Home',

            // Skin
            skinTitle: '👕 Skin',
            skinUnlocked: 'Sbloccato',
            skinLocked: '🔒',
            skinUnlockAt: 'punti per sbloccare',

            // Classifica
            leaderboardTitle: '📊 Classifica',
            rank: 'Pos.',
            lbScore: 'Punti',
            lbCombo: 'Combo',
            lbDate: 'Data',
            clearRecords: 'Cancella Tutto',
            clearConfirm: 'Sei sicuro di voler cancellare tutti i record?',
            noRecords: 'Nessun record',

            // Obiettivi
            achievementsTitle: '🏆 Obiettivi',
            achievementUnlock: 'Obiettivo Sbloccato!',

            // Statistiche
            statsTitle: '📈 Statistiche di Gioco',
            totalGames: 'Partite Totali',
            totalChops: 'Alberi Tagliati',
            totalTime: 'Tempo Totale',
            bestCombo: 'Miglior Combo',
            avgScore: 'Punteggio Medio',
            unlockedAchievements: '🎖️ Obiettivi',
            unlockedSkins: '👕 Skin',
            dailyAttempts: '📅 Sfide Giornaliere',
            resetStats: 'Resetta',
            resetConfirm: 'Sei sicuro di voler resettare tutte le statistiche? Questa azione non può essere annullata.',

            // Tutorial
            tutorialWelcome: 'Benvenuto in Boscaiolo!',
            tutorialWelcome1: 'Sei un coraggioso boscaiolo',
            tutorialWelcome2: 'Taglia più alberi possibile',
            tutorialWelcome3: 'Evitando i rami pericolosi',
            tutorialControls: 'Controlli',
            tutorialMoveLeft: 'Vai a sinistra e taglia',
            tutorialMoveRight: 'Vai a destra e taglia',
            tutorialTouchHint: 'O tocca a sinistra/destra dello schermo',
            tutorialBranch: 'Evita i Rami!',
            tutorialBranchWarn: 'Colpire un ramo = Fine Partita!',
            tutorialBranchHint: 'Guarda prima di tagliare',
            tutorialTime: 'Gestione del Tempo',
            tutorialTimeHint1: 'La barra del tempo diminuisce costantemente',
            tutorialTimeHint2: 'Ogni taglio dà',
            tutorialTimeHint3: '+tempo',
            tutorialTimeHint4: 'Tempo scaduto = Fine Partita',
            tutorialAdvanced: 'Consigli Pro',
            tutorialCombo: 'Combo',
            tutorialComboHint: 'Taglia velocemente per più punti',
            tutorialDifficulty: 'Difficoltà',
            tutorialDifficultyHint: 'Diventa più difficile col punteggio',
            tutorialAchievement: 'Obiettivi',
            tutorialAchievementHint: 'Sblocca 12 obiettivi',
            tutorialSkin: 'Skin',
            tutorialSkinHint: 'Punteggi alti sbloccano skin',
            skip: 'Salta',
            prev: 'Indietro',
            next: 'Avanti',
            finish: 'Fine',

            // Indicazioni touch
            tapLeft: '← Tocca Sinistra',
            tapRight: 'Tocca Destra →',

            // Impostazioni volume
            volumeSettings: '🎵 Volume',
            sfxVolume: '🔊 Effetti',
            bgmVolume: '🎵 Musica',
            vibration: '📳 Vibrazione',

            // Pop-up
            skinUnlockPopup: 'Nuova Skin Sbloccata!',

            // Sistema replay
            replayBtn: '🎬 Replay',
            replayTitle: '🎬 Ultima Partita',
            replayScore: 'Punteggio',
            replayCombo: 'Combo Max',
            replayChops: 'Tagli',
            replayDuration: 'Durata',
            replayStart: 'Avvia Replay',
            replayStop: 'Ferma',
            replayNoData: 'Nessun dato',
            replayPlaying: '🎬 In riproduzione...',
            replaySeconds: 's',

            // Condivisione
            shareBtn: '📤 Condividi',
            shareTitle: 'Boscaiolo',
            shareScoreLabel: 'Punti',
            shareComboLabel: 'Combo',
            shareLevelLabel: 'Livello',
            shareHighScoreLabel: 'Record',
            shareDownloading: 'Generazione immagine...',
            shareSuccess: 'Immagine salvata!',
            shareFailed: 'Condivisione fallita, riprova',
            sharePanelTitle: '📤 Condividi Punteggio',
            shareNativeBtn: '📱 Condividi',
            shareDownloadBtn: '💾 Salva Immagine',
            shareCopyBtn: '📋 Copia Testo',
            shareCopySuccess: '✓ Copiato negli appunti!',

            // Modalità infinita
            endlessBtn: '∞ Modalità Infinita',
            endlessTitle: '∞ Modalità Infinita',
            endlessDesc: 'Senza limite di tempo, metti alla prova la tua concentrazione!',
            endlessBest: 'Miglior Punteggio',
            endlessTotal: 'Partite Totali',
            endlessStart: 'Inizia Sfida',
            endlessOver: '∞ Sfida Terminata',
            endlessNewRecord: '🎉 Nuovo Record!',
            endlessHint: 'Solo evitare i rami, nessuna pressione temporale',

            // Conto alla rovescia
            countdownGo: 'VIA!',

            // Tema
            themeDarkTip: 'Passa alla Modalità Scura',
            themeLightTip: 'Passa alla Modalità Chiara',

            // Opzioni velocità
            speedBtn: '⚡ Velocità',
            speedTitle: '⚡ Velocità di Gioco',
            speedSelectDesc: 'Scegli la tua velocità di gioco preferita',
            speedSlow: '🐢 Lento',
            speedNormal: '🚶 Normale',
            speedFast: '🏃 Veloce',
            speedSlowDesc: 'Tempo più lento, per principianti',
            speedNormalDesc: 'Velocità di gioco standard',
            speedFastDesc: 'Tempo più veloce, modalità sfida',
            speedCurrent: 'Attuale',

            // Nomi skin
            skinNames: {
                default: 'Boscaiolo',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Leggenda Dorata',
                santa: 'Babbo Natale',
                pumpkin: 'Testa di Zucca',
                pirate: 'Capitano Pirata',
                snowman: 'Pupazzo di Neve',
                chinese_new_year: 'Dio della Ricchezza',
                valentine: 'Cupido',
                easter_bunny: 'Coniglio Pasquale',
                summer_surfer: 'Surfista Estivo'
            },
            skinDescs: {
                default: 'Il classico boscaiolo in rosso',
                ninja: 'Il misterioso ninja in nero',
                robot: 'Il boscaiolo meccanico in acciaio',
                golden: 'Il leggendario boscaiolo dorato',
                santa: 'Il gioioso boscaiolo natalizio',
                pumpkin: 'Il terrificante boscaiolo di Halloween',
                pirate: 'Il coraggioso avventuriero dei mari',
                snowman: 'Il boscaiolo del mondo ghiacciato',
                chinese_new_year: 'Buon anno! Buona fortuna!',
                valentine: 'Il dio dell\'amore che diffonde affetto',
                easter_bunny: 'L\'adorabile coniglietto delle uova',
                summer_surfer: 'Il boscaiolo cool da spiaggia'
            },

            // Nomi obiettivi
            achievementNames: {
                first_chop: 'Primo Taglio',
                score_10: 'Boscaiolo Principiante',
                score_50: 'Boscaiolo Esperto',
                score_100: 'Boscaiolo Professionista',
                score_200: 'Maestro Boscaiolo',
                combo_5: 'Mini Combo',
                combo_10: 'Esperto Combo',
                combo_20: 'Re del Combo',
                level_5: 'Livello 5',
                level_8: 'Livello 8',
                level_max: 'Livello Massimo',
                close_call: 'Per un Pelo'
            },
            achievementDescs: {
                first_chop: 'Taglia il tuo primo albero',
                score_10: 'Raggiungi 10 punti in una partita',
                score_50: 'Raggiungi 50 punti in una partita',
                score_100: 'Raggiungi 100 punti in una partita',
                score_200: 'Raggiungi 200 punti in una partita',
                combo_5: 'Raggiungi combo 5',
                combo_10: 'Raggiungi combo 10',
                combo_20: 'Raggiungi combo 20',
                level_5: 'Raggiungi difficoltà livello 5',
                level_8: 'Raggiungi difficoltà livello 8',
                level_max: 'Raggiungi difficoltà massima livello 11',
                close_call: 'Taglia 20 volte con tempo sotto il 10%'
            }
        },
        ru: {
            // Заголовок
            title: 'Дровосек',

            // Начальный экран
            startTitle: 'Дровосек',
            startHint1: 'Нажмите ← → или A/D для рубки',
            startHint2: 'Или нажмите слева/справа экрана',
            startHint3: 'Избегайте веток, успейте вовремя!',
            startHint4: 'Пробел/Enter Старт | ESC/P Пауза',
            startBtn: 'Начать игру',
            dailyBtn: '📅 Ежедневный вызов',
            skinBtn: '👕 Скины',
            leaderboardBtn: '📊 Рейтинг',
            statsBtn: '📈 Статистика',
            tutorialBtn: '❓ Обучение',

            // Конец игры
            gameOver: 'Игра окончена',
            score: 'Счёт',
            maxCombo: 'Макс. комбо',
            highScore: 'Рекорд',
            restartBtn: 'Ещё раз',
            achievementsBtn: '🏆 Достижения',

            // Пауза
            paused: '⏸️ Пауза',
            pauseHint: 'Нажмите ESC или P для продолжения',
            resumeBtn: 'Продолжить',

            // Ежедневный вызов
            dailyTitle: '📅 Ежедневный вызов',
            todayDate: 'Сегодня',
            todayBest: 'Лучший сегодня',
            attempts: 'Попыток',
            dailyHint: 'Один уровень для всех, побей свой рекорд!',
            startChallenge: 'Начать вызов',
            back: 'Назад',
            challengeOver: '📅 Вызов завершён',
            newRecord: '🎉 Новый рекорд!',
            todayHighScore: 'Лучший сегодня',
            todayAttempts: 'Попыток сегодня',
            times: 'раз',
            retry: 'Ещё раз',
            backHome: 'Домой',

            // Скины
            skinTitle: '👕 Скины',
            skinUnlocked: 'Открыто',
            skinLocked: '🔒',
            skinUnlockAt: 'очков для открытия',

            // Рейтинг
            leaderboardTitle: '📊 Рейтинг',
            rank: 'Место',
            lbScore: 'Счёт',
            lbCombo: 'Комбо',
            lbDate: 'Дата',
            clearRecords: 'Очистить всё',
            clearConfirm: 'Вы уверены, что хотите удалить все записи?',
            noRecords: 'Нет записей',

            // Достижения
            achievementsTitle: '🏆 Достижения',
            achievementUnlock: 'Достижение открыто!',

            // Статистика
            statsTitle: '📈 Игровая статистика',
            totalGames: 'Всего игр',
            totalChops: 'Всего ударов',
            totalTime: 'Общее время',
            bestCombo: 'Лучшее комбо',
            avgScore: 'Средний счёт',
            unlockedAchievements: '🎖️ Достижения',
            unlockedSkins: '👕 Скины',
            dailyAttempts: '📅 Ежедневные вызовы',
            resetStats: 'Сбросить',
            resetConfirm: 'Вы уверены, что хотите сбросить всю статистику? Это нельзя отменить.',

            // Обучение
            tutorialWelcome: 'Добро пожаловать в Дровосека!',
            tutorialWelcome1: 'Вы храбрый дровосек',
            tutorialWelcome2: 'Рубите как можно больше деревьев',
            tutorialWelcome3: 'Избегая опасных веток',
            tutorialControls: 'Управление',
            tutorialMoveLeft: 'Двигайтесь влево и рубите',
            tutorialMoveRight: 'Двигайтесь вправо и рубите',
            tutorialTouchHint: 'Или нажмите слева/справа экрана',
            tutorialBranch: 'Избегайте веток!',
            tutorialBranchWarn: 'Удар веткой = Конец игры!',
            tutorialBranchHint: 'Смотрите перед рубкой',
            tutorialTime: 'Управление временем',
            tutorialTimeHint1: 'Полоса времени постоянно уменьшается',
            tutorialTimeHint2: 'Каждый удар даёт',
            tutorialTimeHint3: '+время',
            tutorialTimeHint4: 'Время вышло = Конец игры',
            tutorialAdvanced: 'Советы профи',
            tutorialCombo: 'Комбо',
            tutorialComboHint: 'Рубите быстро для большего счёта',
            tutorialDifficulty: 'Сложность',
            tutorialDifficultyHint: 'Становится сложнее с ростом счёта',
            tutorialAchievement: 'Достижения',
            tutorialAchievementHint: 'Откройте 12 достижений',
            tutorialSkin: 'Скины',
            tutorialSkinHint: 'Высокий счёт открывает новые скины',
            skip: 'Пропустить',
            prev: 'Назад',
            next: 'Далее',
            finish: 'Готово',

            // Подсказки касания
            tapLeft: '← Нажать слева',
            tapRight: 'Нажать справа →',

            // Настройки громкости
            volumeSettings: '🎵 Громкость',
            sfxVolume: '🔊 Звуки',
            bgmVolume: '🎵 Музыка',
            vibration: '📳 Вибрация',

            // Всплывающие окна
            skinUnlockPopup: 'Новый скин открыт!',

            // Система повтора
            replayBtn: '🎬 Повтор',
            replayTitle: '🎬 Последняя игра',
            replayScore: 'Счёт',
            replayCombo: 'Макс. комбо',
            replayChops: 'Ударов',
            replayDuration: 'Длительность',
            replayStart: 'Начать повтор',
            replayStop: 'Остановить',
            replayNoData: 'Нет данных',
            replayPlaying: '🎬 Воспроизведение...',
            replaySeconds: 'с',

            // Поделиться
            shareBtn: '📤 Поделиться',
            shareTitle: 'Дровосек',
            shareScoreLabel: 'Счёт',
            shareComboLabel: 'Комбо',
            shareLevelLabel: 'Уровень',
            shareHighScoreLabel: 'Рекорд',
            shareDownloading: 'Создание изображения...',
            shareSuccess: 'Изображение сохранено!',
            shareFailed: 'Ошибка при публикации, попробуйте снова',
            sharePanelTitle: '📤 Поделиться результатом',
            shareNativeBtn: '📱 Поделиться',
            shareDownloadBtn: '💾 Сохранить',
            shareCopyBtn: '📋 Копировать текст',
            shareCopySuccess: '✓ Скопировано в буфер обмена!',

            // Бесконечный режим
            endlessBtn: '∞ Бесконечный режим',
            endlessTitle: '∞ Бесконечный режим',
            endlessDesc: 'Без ограничения времени, проверь концентрацию!',
            endlessBest: 'Лучший счёт',
            endlessTotal: 'Всего игр',
            endlessStart: 'Начать вызов',
            endlessOver: '∞ Вызов завершён',
            endlessNewRecord: '🎉 Новый рекорд!',
            endlessHint: 'Только избегайте веток, без давления времени',

            // Обратный отсчёт
            countdownGo: 'СТАРТ!',

            // Тема
            themeDarkTip: 'Переключить на тёмную тему',
            themeLightTip: 'Переключить на светлую тему',

            // Параметры скорости
            speedBtn: '⚡ Скорость',
            speedTitle: '⚡ Скорость игры',
            speedSelectDesc: 'Выберите предпочтительную скорость игры',
            speedSlow: '🐢 Медленно',
            speedNormal: '🚶 Обычно',
            speedFast: '🏃 Быстро',
            speedSlowDesc: 'Медленнее расход времени, для новичков',
            speedNormalDesc: 'Стандартная скорость игры',
            speedFastDesc: 'Быстрее расход времени, режим вызова',
            speedCurrent: 'Текущая',

            // Названия скинов
            skinNames: {
                default: 'Дровосек',
                ninja: 'Ниндзя',
                robot: 'Робот',
                golden: 'Золотая легенда',
                santa: 'Дед Мороз',
                pumpkin: 'Тыквенная голова',
                pirate: 'Капитан пиратов',
                snowman: 'Снеговик',
                chinese_new_year: 'Бог богатства',
                valentine: 'Купидон',
                easter_bunny: 'Пасхальный кролик',
                summer_surfer: 'Летний сёрфер'
            },
            skinDescs: {
                default: 'Классический дровосек в красном',
                ninja: 'Таинственный ниндзя в чёрном',
                robot: 'Стальной механический рубщик',
                golden: 'Легендарный золотой дровосек',
                santa: 'Весёлый праздничный дровосек',
                pumpkin: 'Жуткий хэллоуинский рубщик',
                pirate: 'Храбрый морской искатель приключений',
                snowman: 'Морозный зимний рубщик',
                chinese_new_year: 'С Новым годом! Удачи!',
                valentine: 'Бог любви, дарящий любовь',
                easter_bunny: 'Милый пасхальный кролик',
                summer_surfer: 'Крутой пляжный сёрфер'
            },

            // Названия достижений
            achievementNames: {
                first_chop: 'Первый удар',
                score_10: 'Начинающий дровосек',
                score_50: 'Опытный дровосек',
                score_100: 'Профи дровосек',
                score_200: 'Мастер дровосек',
                combo_5: 'Мини комбо',
                combo_10: 'Мастер комбо',
                combo_20: 'Король комбо',
                level_5: 'Уровень 5',
                level_8: 'Уровень 8',
                level_max: 'Макс. уровень',
                close_call: 'Еле успел'
            },
            achievementDescs: {
                first_chop: 'Срубите своё первое дерево',
                score_10: 'Наберите 10 очков за игру',
                score_50: 'Наберите 50 очков за игру',
                score_100: 'Наберите 100 очков за игру',
                score_200: 'Наберите 200 очков за игру',
                combo_5: 'Достигните комбо 5',
                combo_10: 'Достигните комбо 10',
                combo_20: 'Достигните комбо 20',
                level_5: 'Достигните уровня сложности 5',
                level_8: 'Достигните уровня сложности 8',
                level_max: 'Достигните макс. уровня сложности 11',
                close_call: 'Срубите 20 раз при времени ниже 10%'
            }
        },
        tr: {
            // Başlık
            title: 'Oduncu',

            // Başlangıç ekranı
            startTitle: 'Oduncu',
            startHint1: 'Kesmek için ← → veya A/D tuşlarına bas',
            startHint2: 'Ekranın soluna/sağına dokun',
            startHint3: 'Dallardan kaçın, zamanı yen!',
            startHint4: 'Boşluk/Enter Başlat | ESC/P Duraklat',
            startBtn: 'Oyuna Başla',
            dailyBtn: '📅 Günlük Görev',
            skinBtn: '👕 Kostümler',
            leaderboardBtn: '📊 Sıralama',
            statsBtn: '📈 İstatistik',
            tutorialBtn: '❓ Eğitim',

            // Oyun sonu
            gameOver: 'Oyun Bitti',
            score: 'Puan',
            maxCombo: 'Maks. Kombo',
            highScore: 'Rekor',
            restartBtn: 'Tekrar Dene',
            achievementsBtn: '🏆 Başarımlar',

            // Duraklat
            paused: '⏸️ Duraklatıldı',
            pauseHint: 'Devam etmek için ESC veya P tuşuna bas',
            resumeBtn: 'Devam Et',

            // Günlük görev
            dailyTitle: '📅 Günlük Görev',
            todayDate: 'Bugün',
            todayBest: 'Bugünkü En İyi',
            attempts: 'Deneme',
            dailyHint: 'Herkes için aynı seviye, rekorunu kır!',
            startChallenge: 'Göreve Başla',
            back: 'Geri',
            challengeOver: '📅 Görev Tamamlandı',
            newRecord: '🎉 Yeni Rekor!',
            todayHighScore: 'Bugünkü En İyi',
            todayAttempts: 'Bugünkü Denemeler',
            times: 'kez',
            retry: 'Tekrar Dene',
            backHome: 'Ana Sayfa',

            // Kostümler
            skinTitle: '👕 Kostümler',
            skinUnlocked: 'Açıldı',
            skinLocked: '🔒',
            skinUnlockAt: 'puan ile açılır',

            // Sıralama
            leaderboardTitle: '📊 Sıralama',
            rank: 'Sıra',
            lbScore: 'Puan',
            lbCombo: 'Kombo',
            lbDate: 'Tarih',
            clearRecords: 'Tümünü Sil',
            clearConfirm: 'Tüm kayıtları silmek istediğinize emin misiniz?',
            noRecords: 'Kayıt yok',

            // Başarımlar
            achievementsTitle: '🏆 Başarımlar',
            achievementUnlock: 'Başarım Açıldı!',

            // İstatistik
            statsTitle: '📈 Oyun İstatistikleri',
            totalGames: 'Toplam Oyun',
            totalChops: 'Toplam Kesim',
            totalTime: 'Toplam Süre',
            bestCombo: 'En İyi Kombo',
            avgScore: 'Ortalama Puan',
            unlockedAchievements: '🎖️ Başarımlar',
            unlockedSkins: '👕 Kostümler',
            dailyAttempts: '📅 Günlük Görevler',
            resetStats: 'Sıfırla',
            resetConfirm: 'Tüm istatistikleri sıfırlamak istediğinize emin misiniz? Bu işlem geri alınamaz.',

            // Eğitim
            tutorialWelcome: 'Oduncu\'ya Hoş Geldin!',
            tutorialWelcome1: 'Sen cesur bir oduncusun',
            tutorialWelcome2: 'Mümkün olduğunca çok ağaç kes',
            tutorialWelcome3: 'Tehlikeli dallardan kaçın',
            tutorialControls: 'Kontroller',
            tutorialMoveLeft: 'Sola git ve kes',
            tutorialMoveRight: 'Sağa git ve kes',
            tutorialTouchHint: 'Veya ekranın sol/sağına dokun',
            tutorialBranch: 'Dallardan Kaçın!',
            tutorialBranchWarn: 'Dala çarpmak = Oyun Biter!',
            tutorialBranchHint: 'Kesmeden önce bak',
            tutorialTime: 'Zaman Yönetimi',
            tutorialTimeHint1: 'Zaman çubuğu sürekli azalır',
            tutorialTimeHint2: 'Her kesim verir',
            tutorialTimeHint3: '+zaman',
            tutorialTimeHint4: 'Zaman biterse = Oyun Biter',
            tutorialAdvanced: 'Pro İpuçları',
            tutorialCombo: 'Kombo',
            tutorialComboHint: 'Daha fazla puan için hızlı kes',
            tutorialDifficulty: 'Zorluk',
            tutorialDifficultyHint: 'Puan arttıkça zorlaşır',
            tutorialAchievement: 'Başarımlar',
            tutorialAchievementHint: '12 başarım aç',
            tutorialSkin: 'Kostümler',
            tutorialSkinHint: 'Yüksek puanlarla yeni kostümler aç',
            skip: 'Atla',
            prev: 'Geri',
            next: 'İleri',
            finish: 'Bitir',

            // Dokunma ipuçları
            tapLeft: '← Sola Dokun',
            tapRight: 'Sağa Dokun →',

            // Ses ayarları
            volumeSettings: '🎵 Ses Ayarları',
            sfxVolume: '🔊 Efektler',
            bgmVolume: '🎵 Müzik',
            vibration: '📳 Titreşim',

            // Açılır pencere
            skinUnlockPopup: 'Yeni Kostüm Açıldı!',

            // Tekrar sistemi
            replayBtn: '🎬 Tekrar',
            replayTitle: '🎬 Son Oyun',
            replayScore: 'Puan',
            replayCombo: 'Maks. Kombo',
            replayChops: 'Kesimler',
            replayDuration: 'Süre',
            replayStart: 'Tekrarı Başlat',
            replayStop: 'Durdur',
            replayNoData: 'Veri yok',
            replayPlaying: '🎬 Oynatılıyor...',
            replaySeconds: 'sn',

            // Paylaşım
            shareBtn: '📤 Paylaş',
            shareTitle: 'Oduncu',
            shareScoreLabel: 'Puan',
            shareComboLabel: 'Kombo',
            shareLevelLabel: 'Seviye',
            shareHighScoreLabel: 'Rekor',
            shareDownloading: 'Görsel oluşturuluyor...',
            shareSuccess: 'Görsel kaydedildi!',
            shareFailed: 'Paylaşım başarısız, tekrar deneyin',
            sharePanelTitle: '📤 Sonucu Paylaş',
            shareNativeBtn: '📱 Paylaş',
            shareDownloadBtn: '💾 Görseli Kaydet',
            shareCopyBtn: '📋 Metni Kopyala',
            shareCopySuccess: '✓ Panoya kopyalandı!',

            // Sonsuz mod
            endlessBtn: '∞ Sonsuz Mod',
            endlessTitle: '∞ Sonsuz Mod',
            endlessDesc: 'Zaman limiti yok, konsantrasyonunu test et!',
            endlessBest: 'En İyi Puan',
            endlessTotal: 'Toplam Oyun',
            endlessStart: 'Göreve Başla',
            endlessOver: '∞ Görev Tamamlandı',
            endlessNewRecord: '🎉 Yeni Rekor!',
            endlessHint: 'Sadece dallardan kaçın, zaman baskısı yok',

            // Tema
            themeDarkTip: 'Karanlık Moda Geç',
            themeLightTip: 'Aydınlık Moda Geç',

            // Hız seçenekleri
            speedBtn: '⚡ Hız',
            speedTitle: '⚡ Oyun Hızı',
            speedSelectDesc: 'Tercih ettiğiniz oyun hızını seçin',
            speedSlow: '🐢 Yavaş',
            speedNormal: '🚶 Normal',
            speedFast: '🏃 Hızlı',
            speedSlowDesc: 'Daha yavaş zaman tüketimi, yeni başlayanlar için',
            speedNormalDesc: 'Standart oyun hızı',
            speedFastDesc: 'Daha hızlı zaman tüketimi, meydan okuma modu',
            speedCurrent: 'Mevcut',

            // Kostüm isimleri
            skinNames: {
                default: 'Oduncu',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Altın Efsane',
                santa: 'Noel Baba',
                pumpkin: 'Balkabağı Kafa',
                pirate: 'Korsan Kaptan',
                snowman: 'Kardan Adam',
                chinese_new_year: 'Servet Tanrısı',
                valentine: 'Cupid',
                easter_bunny: 'Paskalya Tavşanı',
                summer_surfer: 'Yaz Sörfçüsü'
            },
            skinDescs: {
                default: 'Klasik kırmızı giysili oduncu',
                ninja: 'Gizemli siyah giysili ninja',
                robot: 'Çelik mekanik oduncu',
                golden: 'Efsanevi altın oduncu',
                santa: 'Neşeli tatil oduncusu',
                pumpkin: 'Korkunç Cadılar Bayramı oduncusu',
                pirate: 'Cesur deniz maceracısı',
                snowman: 'Buz dünyasından oduncu',
                chinese_new_year: 'Mutlu yıllar! İyi şanslar!',
                valentine: 'Aşk tanrısı, sevgi dağıtan',
                easter_bunny: 'Sevimli yumurta tavşanı',
                summer_surfer: 'Havalı plaj sörfçüsü'
            },

            // Başarım isimleri
            achievementNames: {
                first_chop: 'İlk Kesim',
                score_10: 'Acemi Oduncu',
                score_50: 'Deneyimli Oduncu',
                score_100: 'Profesyonel Oduncu',
                score_200: 'Usta Oduncu',
                combo_5: 'Mini Kombo',
                combo_10: 'Kombo Uzmanı',
                combo_20: 'Kombo Kralı',
                level_5: 'Seviye 5',
                level_8: 'Seviye 8',
                level_max: 'Maks. Seviye',
                close_call: 'Kıl Payı'
            },
            achievementDescs: {
                first_chop: 'İlk ağacını kes',
                score_10: 'Bir oyunda 10 puan yap',
                score_50: 'Bir oyunda 50 puan yap',
                score_100: 'Bir oyunda 100 puan yap',
                score_200: 'Bir oyunda 200 puan yap',
                combo_5: '5 kombo yap',
                combo_10: '10 kombo yap',
                combo_20: '20 kombo yap',
                level_5: 'Zorluk seviyesi 5\'e ulaş',
                level_8: 'Zorluk seviyesi 8\'e ulaş',
                level_max: 'Maks. zorluk seviyesi 11\'e ulaş',
                close_call: 'Zaman %10\'un altındayken 20 kez kes'
            }
        },
        pl: {
            // Tytuł
            title: 'Drwal',

            // Ekran startowy
            startTitle: 'Drwal',
            startHint1: 'Naciśnij ← → lub A/D aby rąbać',
            startHint2: 'Dotknij lewej/prawej strony ekranu',
            startHint3: 'Unikaj gałęzi, pokonaj czas!',
            startHint4: 'Spacja/Enter Start | ESC/P Pauza',
            startBtn: 'Rozpocznij grę',
            dailyBtn: '📅 Wyzwanie dnia',
            skinBtn: '👕 Skórki',
            leaderboardBtn: '📊 Ranking',
            statsBtn: '📈 Statystyki',
            tutorialBtn: '❓ Samouczek',

            // Koniec gry
            gameOver: 'Koniec gry',
            score: 'Wynik',
            maxCombo: 'Maks. kombo',
            highScore: 'Rekord',
            restartBtn: 'Spróbuj ponownie',
            achievementsBtn: '🏆 Osiągnięcia',

            // Pauza
            paused: '⏸️ Pauza',
            pauseHint: 'Naciśnij ESC lub P aby kontynuować',
            resumeBtn: 'Wznów',

            // Wyzwanie dnia
            dailyTitle: '📅 Wyzwanie dnia',
            todayDate: 'Dzisiaj',
            todayBest: 'Najlepszy dziś',
            attempts: 'Próby',
            dailyHint: 'Ten sam poziom dla wszystkich, pobij swój rekord!',
            startChallenge: 'Rozpocznij wyzwanie',
            back: 'Powrót',
            challengeOver: '📅 Wyzwanie zakończone',
            newRecord: '🎉 Nowy rekord!',
            todayHighScore: 'Najlepszy dziś',
            todayAttempts: 'Dzisiejsze próby',
            times: 'razy',
            retry: 'Spróbuj ponownie',
            backHome: 'Strona główna',

            // Skórki
            skinTitle: '👕 Skórki',
            skinUnlocked: 'Odblokowane',
            skinLocked: '🔒',
            skinUnlockAt: 'pkt do odblokowania',

            // Ranking
            leaderboardTitle: '📊 Ranking',
            rank: 'Pozycja',
            lbScore: 'Wynik',
            lbCombo: 'Kombo',
            lbDate: 'Data',
            clearRecords: 'Wyczyść wszystko',
            clearConfirm: 'Czy na pewno chcesz wyczyścić wszystkie rekordy?',
            noRecords: 'Brak rekordów',

            // Osiągnięcia
            achievementsTitle: '🏆 Osiągnięcia',
            achievementUnlock: 'Osiągnięcie odblokowane!',

            // Statystyki
            statsTitle: '📈 Statystyki gry',
            totalGames: 'Łączna liczba gier',
            totalChops: 'Łączne cięcia',
            totalTime: 'Łączny czas',
            bestCombo: 'Najlepsze kombo',
            avgScore: 'Średni wynik',
            unlockedAchievements: '🎖️ Osiągnięcia',
            unlockedSkins: '👕 Skórki',
            dailyAttempts: '📅 Wyzwania dnia',
            resetStats: 'Resetuj',
            resetConfirm: 'Czy na pewno chcesz zresetować wszystkie statystyki? Tej operacji nie można cofnąć.',

            // Samouczek
            tutorialWelcome: 'Witaj w grze Drwal!',
            tutorialWelcome1: 'Jesteś dzielnym drwalem',
            tutorialWelcome2: 'Zetnij jak najwięcej drzew',
            tutorialWelcome3: 'Unikając niebezpiecznych gałęzi',
            tutorialControls: 'Sterowanie',
            tutorialMoveLeft: 'Idź w lewo i rąbaj',
            tutorialMoveRight: 'Idź w prawo i rąbaj',
            tutorialTouchHint: 'Lub dotknij lewej/prawej strony ekranu',
            tutorialBranch: 'Unikaj gałęzi!',
            tutorialBranchWarn: 'Uderzenie w gałąź = Koniec gry!',
            tutorialBranchHint: 'Patrz zanim rąbniesz',
            tutorialTime: 'Zarządzanie czasem',
            tutorialTimeHint1: 'Pasek czasu ciągle się zmniejsza',
            tutorialTimeHint2: 'Każde cięcie daje',
            tutorialTimeHint3: '+czas',
            tutorialTimeHint4: 'Koniec czasu = Koniec gry',
            tutorialAdvanced: 'Porady dla zaawansowanych',
            tutorialCombo: 'Kombo',
            tutorialComboHint: 'Rąbaj szybko dla wyższego wyniku',
            tutorialDifficulty: 'Trudność',
            tutorialDifficultyHint: 'Im wyższy wynik, tym trudniej',
            tutorialAchievement: 'Osiągnięcia',
            tutorialAchievementHint: 'Odblokuj 12 osiągnięć',
            tutorialSkin: 'Skórki',
            tutorialSkinHint: 'Wysokie wyniki odblokowują nowe skórki',
            skip: 'Pomiń',
            prev: 'Wstecz',
            next: 'Dalej',
            finish: 'Zakończ',

            // Wskazówki dotykowe
            tapLeft: '← Dotknij lewej',
            tapRight: 'Dotknij prawej →',

            // Ustawienia głośności
            volumeSettings: '🎵 Ustawienia dźwięku',
            sfxVolume: '🔊 Efekty',
            bgmVolume: '🎵 Muzyka',
            vibration: '📳 Wibracje',

            // Okno popup
            skinUnlockPopup: 'Nowa skórka odblokowana!',

            // System powtórek
            replayBtn: '🎬 Powtórka',
            replayTitle: '🎬 Ostatnia gra',
            replayScore: 'Wynik',
            replayCombo: 'Maks. kombo',
            replayChops: 'Cięcia',
            replayDuration: 'Czas trwania',
            replayStart: 'Rozpocznij powtórkę',
            replayStop: 'Zatrzymaj',
            replayNoData: 'Brak danych',
            replayPlaying: '🎬 Odtwarzanie...',
            replaySeconds: 's',

            // Udostępnianie
            shareBtn: '📤 Udostępnij',
            shareTitle: 'Drwal',
            shareScoreLabel: 'Wynik',
            shareComboLabel: 'Kombo',
            shareLevelLabel: 'Poziom',
            shareHighScoreLabel: 'Rekord',
            shareDownloading: 'Generowanie obrazu...',
            shareSuccess: 'Obraz zapisany!',
            shareFailed: 'Udostępnianie nie powiodło się, spróbuj ponownie',
            sharePanelTitle: '📤 Udostępnij wynik',
            shareNativeBtn: '📱 Udostępnij',
            shareDownloadBtn: '💾 Zapisz obraz',
            shareCopyBtn: '📋 Kopiuj tekst',
            shareCopySuccess: '✓ Skopiowano do schowka!',

            // Tryb nieskończony
            endlessBtn: '∞ Tryb nieskończony',
            endlessTitle: '∞ Tryb nieskończony',
            endlessDesc: 'Bez limitu czasu, sprawdź swoją koncentrację!',
            endlessBest: 'Najlepszy wynik',
            endlessTotal: 'Łączna liczba gier',
            endlessStart: 'Rozpocznij wyzwanie',
            endlessOver: '∞ Wyzwanie zakończone',
            endlessNewRecord: '🎉 Nowy rekord!',
            endlessHint: 'Tylko unikaj gałęzi, bez presji czasu',

            // Odliczanie
            countdownGo: 'START!',

            // Motyw
            themeDarkTip: 'Przełącz na tryb ciemny',
            themeLightTip: 'Przełącz na tryb jasny',

            // Opcje prędkości
            speedBtn: '⚡ Prędkość',
            speedTitle: '⚡ Prędkość gry',
            speedSelectDesc: 'Wybierz preferowaną prędkość gry',
            speedSlow: '🐢 Wolna',
            speedNormal: '🚶 Normalna',
            speedFast: '🏃 Szybka',
            speedSlowDesc: 'Wolniejszy spadek czasu, dla początkujących',
            speedNormalDesc: 'Standardowa prędkość gry',
            speedFastDesc: 'Szybszy spadek czasu, tryb wyzwania',
            speedCurrent: 'Aktualna',

            // Nazwy skórek
            skinNames: {
                default: 'Drwal',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Złota legenda',
                santa: 'Święty Mikołaj',
                pumpkin: 'Dyniowa głowa',
                pirate: 'Kapitan piratów',
                snowman: 'Bałwan',
                chinese_new_year: 'Bóg bogactwa',
                valentine: 'Kupidyn',
                easter_bunny: 'Zajączek wielkanocny',
                summer_surfer: 'Letni surfer'
            },
            skinDescs: {
                default: 'Klasyczny drwal w czerwonej koszuli',
                ninja: 'Tajemniczy ninja w czerni',
                robot: 'Stalowy mechaniczny drwal',
                golden: 'Legendarny złoty drwal',
                santa: 'Radosny świąteczny drwal',
                pumpkin: 'Przerażający halloweenowy drwal',
                pirate: 'Odważny morski poszukiwacz przygód',
                snowman: 'Drwal z lodowego świata',
                chinese_new_year: 'Szczęśliwego Nowego Roku! Powodzenia!',
                valentine: 'Bóg miłości, rozsiewa miłość',
                easter_bunny: 'Słodki króliczek z pisankami',
                summer_surfer: 'Fajny plażowy surfer'
            },

            // Nazwy osiągnięć
            achievementNames: {
                first_chop: 'Pierwsze cięcie',
                score_10: 'Początkujący drwal',
                score_50: 'Doświadczony drwal',
                score_100: 'Profesjonalny drwal',
                score_200: 'Mistrz drwal',
                combo_5: 'Mini kombo',
                combo_10: 'Ekspert kombo',
                combo_20: 'Król kombo',
                level_5: 'Poziom 5',
                level_8: 'Poziom 8',
                level_max: 'Maks. poziom',
                close_call: 'O włos'
            },
            achievementDescs: {
                first_chop: 'Zetnij swoje pierwsze drzewo',
                score_10: 'Zdobądź 10 punktów w jednej grze',
                score_50: 'Zdobądź 50 punktów w jednej grze',
                score_100: 'Zdobądź 100 punktów w jednej grze',
                score_200: 'Zdobądź 200 punktów w jednej grze',
                combo_5: 'Osiągnij 5 kombo',
                combo_10: 'Osiągnij 10 kombo',
                combo_20: 'Osiągnij 20 kombo',
                level_5: 'Osiągnij poziom trudności 5',
                level_8: 'Osiągnij poziom trudności 8',
                level_max: 'Osiągnij maks. poziom trudności 11',
                close_call: 'Zetnij 20 razy gdy czas jest poniżej 10%'
            }
        },
        // 荷兰语 (Nederlands)
        nl: {
            // Titel
            title: 'Houthakker',

            // Startscherm
            startTitle: 'Houthakker',
            startHint1: 'Druk ← → of A/D om te hakken',
            startHint2: 'Tik links/rechts op het scherm',
            startHint3: 'Vermijd takken, versla de klok!',
            startHint4: 'Spatie/Enter Start | ESC/P Pauze',
            startBtn: 'Start Spel',
            dailyBtn: '📅 Dagelijkse Uitdaging',
            skinBtn: '👕 Skins',
            leaderboardBtn: '📊 Ranglijst',
            statsBtn: '📈 Statistieken',
            tutorialBtn: '❓ Handleiding',

            // Game over
            gameOver: 'Game Over',
            score: 'Score',
            maxCombo: 'Max. Combo',
            highScore: 'Hoogste Score',
            restartBtn: 'Opnieuw Proberen',
            achievementsBtn: '🏆 Prestaties',

            // Pauze
            paused: '⏸️ Gepauzeerd',
            pauseHint: 'Druk ESC of P om door te gaan',
            resumeBtn: 'Hervatten',

            // Dagelijkse uitdaging
            dailyTitle: '📅 Dagelijkse Uitdaging',
            todayDate: 'Vandaag',
            todayBest: 'Beste Vandaag',
            attempts: 'Pogingen',
            dailyHint: 'Hetzelfde level voor iedereen, versla je record!',
            startChallenge: 'Start Uitdaging',
            back: 'Terug',
            challengeOver: '📅 Uitdaging Voltooid',
            newRecord: '🎉 Nieuw Record!',
            todayHighScore: 'Beste Vandaag',
            todayAttempts: 'Pogingen Vandaag',
            times: 'keer',
            retry: 'Opnieuw Proberen',
            backHome: 'Hoofdmenu',

            // Skins
            skinTitle: '👕 Skins',
            skinUnlocked: 'Ontgrendeld',
            skinLocked: '🔒',
            skinUnlockAt: 'ptn om te ontgrendelen',

            // Ranglijst
            leaderboardTitle: '📊 Ranglijst',
            rank: 'Rang',
            lbScore: 'Score',
            lbCombo: 'Combo',
            lbDate: 'Datum',
            clearRecords: 'Alles Wissen',
            clearConfirm: 'Weet je zeker dat je alle records wilt wissen?',
            noRecords: 'Geen records',

            // Prestaties
            achievementsTitle: '🏆 Prestaties',
            achievementUnlock: 'Prestatie Ontgrendeld!',

            // Statistieken
            statsTitle: '📈 Spelstatistieken',
            totalGames: 'Totaal Gespeeld',
            totalChops: 'Totaal Gehakt',
            totalTime: 'Totale Tijd',
            bestCombo: 'Beste Combo',
            avgScore: 'Gem. Score',
            unlockedAchievements: '🎖️ Prestaties',
            unlockedSkins: '👕 Skins',
            dailyAttempts: '📅 Dagelijkse Uitdagingen',
            resetStats: 'Resetten',
            resetConfirm: 'Weet je zeker dat je alle statistieken wilt resetten? Dit kan niet ongedaan worden gemaakt.',

            // Handleiding
            tutorialWelcome: 'Welkom bij Houthakker!',
            tutorialWelcome1: 'Je bent een dappere houthakker',
            tutorialWelcome2: 'Hak zoveel mogelijk bomen',
            tutorialWelcome3: 'Terwijl je gevaarlijke takken vermijdt',
            tutorialControls: 'Besturing',
            tutorialMoveLeft: 'Ga naar links en hak',
            tutorialMoveRight: 'Ga naar rechts en hak',
            tutorialTouchHint: 'Of tik links/rechts op het scherm',
            tutorialBranch: 'Vermijd Takken!',
            tutorialBranchWarn: 'Tak raken = Game Over!',
            tutorialBranchHint: 'Kijk voordat je hakt',
            tutorialTime: 'Tijdbeheer',
            tutorialTimeHint1: 'Tijdbalk neemt constant af',
            tutorialTimeHint2: 'Elke hak geeft',
            tutorialTimeHint3: '+tijd',
            tutorialTimeHint4: 'Tijd op = Game Over',
            tutorialAdvanced: 'Gevorderde Tips',
            tutorialCombo: 'Combo',
            tutorialComboHint: 'Hak snel voor hogere scores',
            tutorialDifficulty: 'Moeilijkheid',
            tutorialDifficultyHint: 'Wordt moeilijker bij hogere score',
            tutorialAchievement: 'Prestaties',
            tutorialAchievementHint: 'Ontgrendel 12 prestaties',
            tutorialSkin: 'Skins',
            tutorialSkinHint: 'Hoge scores ontgrendelen nieuwe skins',
            skip: 'Overslaan',
            prev: 'Vorige',
            next: 'Volgende',
            finish: 'Klaar',

            // Aanraakhints
            tapLeft: '← Tik Links',
            tapRight: 'Tik Rechts →',

            // Volume-instellingen
            volumeSettings: '🎵 Volume-instellingen',
            sfxVolume: '🔊 Effecten',
            bgmVolume: '🎵 Muziek',
            vibration: '📳 Trillen',

            // Pop-ups
            skinUnlockPopup: 'Nieuwe Skin Ontgrendeld!',

            // Herhaling systeem
            replayBtn: '🎬 Herhaling',
            replayTitle: '🎬 Laatste Spel',
            replayScore: 'Score',
            replayCombo: 'Max. Combo',
            replayChops: 'Hakken',
            replayDuration: 'Duur',
            replayStart: 'Start Herhaling',
            replayStop: 'Stoppen',
            replayNoData: 'Geen gegevens',
            replayPlaying: '🎬 Afspelen...',
            replaySeconds: 's',

            // Delen
            shareBtn: '📤 Delen',
            shareTitle: 'Houthakker',
            shareScoreLabel: 'Score',
            shareComboLabel: 'Combo',
            shareLevelLabel: 'Level',
            shareHighScoreLabel: 'Hoogste Score',
            shareDownloading: 'Afbeelding genereren...',
            shareSuccess: 'Afbeelding opgeslagen!',
            shareFailed: 'Delen mislukt, probeer opnieuw',
            sharePanelTitle: '📤 Score Delen',
            shareNativeBtn: '📱 Delen',
            shareDownloadBtn: '💾 Afbeelding Opslaan',
            shareCopyBtn: '📋 Tekst Kopiëren',
            shareCopySuccess: '✓ Naar klembord gekopieerd!',

            // Eindeloze modus
            endlessBtn: '∞ Eindeloze Modus',
            endlessTitle: '∞ Eindeloze Modus',
            endlessDesc: 'Geen tijdslimiet, test je concentratie!',
            endlessBest: 'Beste Score',
            endlessTotal: 'Totaal Gespeeld',
            endlessStart: 'Start Uitdaging',
            endlessOver: '∞ Uitdaging Voltooid',
            endlessNewRecord: '🎉 Nieuw Record!',
            endlessHint: 'Vermijd alleen takken, geen tijdsdruk',

            // Aftellen
            countdownGo: 'START!',

            // Thema
            themeDarkTip: 'Schakel naar Donkere Modus',
            themeLightTip: 'Schakel naar Lichte Modus',

            // Snelheidsopties
            speedBtn: '⚡ Snelheid',
            speedTitle: '⚡ Spelsnelheid',
            speedSelectDesc: 'Kies je voorkeursnelheid',
            speedSlow: '🐢 Langzaam',
            speedNormal: '🚶 Normaal',
            speedFast: '🏃 Snel',
            speedSlowDesc: 'Langzamere tijdafname, voor beginners',
            speedNormalDesc: 'Standaard spelsnelheid',
            speedFastDesc: 'Snellere tijdafname, uitdagingsmodus',
            speedCurrent: 'Huidig',

            // Skin namen
            skinNames: {
                default: 'Houthakker',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Gouden Legende',
                santa: 'Kerstman',
                pumpkin: 'Pompoenhoofd',
                pirate: 'Piratenkapitein',
                snowman: 'Sneeuwpop',
                chinese_new_year: 'God van Rijkdom',
                valentine: 'Cupido',
                easter_bunny: 'Paashaas',
                summer_surfer: 'Zomersurfer'
            },
            skinDescs: {
                default: 'Klassieke houthakker in het rood',
                ninja: 'Mysterieuze ninja in het zwart',
                robot: 'Stalen mechanische houthakker',
                golden: 'Legendarische gouden houthakker',
                santa: 'Vrolijke feestelijke houthakker',
                pumpkin: 'Enge Halloween houthakker',
                pirate: 'Dappere zeeavonturier',
                snowman: 'Houthakker uit de ijswereld',
                chinese_new_year: 'Gelukkig Nieuwjaar! Veel geluk!',
                valentine: 'God van de liefde, verspreidt liefde',
                easter_bunny: 'Schattig konijntje met eieren',
                summer_surfer: 'Coole strandsurfer'
            },

            // Prestatie namen
            achievementNames: {
                first_chop: 'Eerste Hak',
                score_10: 'Beginnende Houthakker',
                score_50: 'Ervaren Houthakker',
                score_100: 'Professionele Houthakker',
                score_200: 'Meester Houthakker',
                combo_5: 'Mini Combo',
                combo_10: 'Combo Expert',
                combo_20: 'Combo Koning',
                level_5: 'Level 5',
                level_8: 'Level 8',
                level_max: 'Max. Level',
                close_call: 'Op het Nippertje'
            },
            achievementDescs: {
                first_chop: 'Hak je eerste boom',
                score_10: 'Behaal 10 punten in één spel',
                score_50: 'Behaal 50 punten in één spel',
                score_100: 'Behaal 100 punten in één spel',
                score_200: 'Behaal 200 punten in één spel',
                combo_5: 'Behaal een 5 combo',
                combo_10: 'Behaal een 10 combo',
                combo_20: 'Behaal een 20 combo',
                level_5: 'Bereik moeilijkheidsgraad 5',
                level_8: 'Bereik moeilijkheidsgraad 8',
                level_max: 'Bereik max. moeilijkheidsgraad 11',
                close_call: 'Hak 20 keer terwijl tijd onder 10%'
            }
        },

        // 瑞典语 (Svenska)
        sv: {
            // Titel
            title: 'Skogshuggare',

            // Startskärm
            startTitle: 'Skogshuggare',
            startHint1: 'Tryck ← → eller A/D för att hugga',
            startHint2: 'Tryck på vänster/höger sida av skärmen',
            startHint3: 'Undvik grenar, slå klockan!',
            startHint4: 'Mellanslag/Enter Starta | ESC/P Paus',
            startBtn: 'Starta spel',
            dailyBtn: '📅 Daglig utmaning',
            skinBtn: '👕 Skins',
            leaderboardBtn: '📊 Topplista',
            statsBtn: '📈 Statistik',
            tutorialBtn: '❓ Handledning',

            // Spelet slut
            gameOver: 'Spelet slut',
            score: 'Poäng',
            maxCombo: 'Max combo',
            highScore: 'Rekord',
            restartBtn: 'Försök igen',
            achievementsBtn: '🏆 Prestationer',

            // Paus
            paused: '⏸️ Pausad',
            pauseHint: 'Tryck ESC eller P för att fortsätta',
            resumeBtn: 'Fortsätt',

            // Daglig utmaning
            dailyTitle: '📅 Daglig utmaning',
            todayDate: 'Idag',
            todayBest: 'Bäst idag',
            attempts: 'Försök',
            dailyHint: 'Samma nivå för alla, slå ditt rekord!',
            startChallenge: 'Starta utmaning',
            back: 'Tillbaka',
            challengeOver: '📅 Utmaning klar',
            newRecord: '🎉 Nytt rekord!',
            todayHighScore: 'Bäst idag',
            todayAttempts: 'Försök idag',
            times: 'gånger',
            retry: 'Försök igen',
            backHome: 'Startsida',

            // Skins
            skinTitle: '👕 Skins',
            skinUnlocked: 'Upplåst',
            skinLocked: '🔒',
            skinUnlockAt: 'poäng krävs',

            // Topplista
            leaderboardTitle: '📊 Topplista',
            rank: 'Plats',
            lbScore: 'Poäng',
            lbCombo: 'Combo',
            lbDate: 'Datum',
            clearRecords: 'Rensa allt',
            clearConfirm: 'Är du säker på att du vill rensa alla rekord?',
            noRecords: 'Inga rekord',

            // Prestationer
            achievementsTitle: '🏆 Prestationer',
            achievementUnlock: 'Prestation upplåst!',

            // Statistik
            statsTitle: '📈 Spelstatistik',
            totalGames: 'Totalt antal spel',
            totalChops: 'Totalt antal hugg',
            totalTime: 'Total speltid',
            bestCombo: 'Bästa combo',
            avgScore: 'Genomsnittlig poäng',
            unlockedAchievements: '🎖️ Prestationer',
            unlockedSkins: '👕 Skins',
            dailyAttempts: '📅 Dagliga utmaningar',
            resetStats: 'Återställ',
            resetConfirm: 'Är du säker på att du vill återställa all statistik? Detta kan inte ångras.',

            // Handledning
            tutorialWelcome: 'Välkommen till Skogshuggare!',
            tutorialWelcome1: 'Du är en modig skogshuggare',
            tutorialWelcome2: 'Hugga så många träd du kan',
            tutorialWelcome3: 'Medan du undviker farliga grenar',
            tutorialControls: 'Kontroller',
            tutorialMoveLeft: 'Gå vänster och hugga',
            tutorialMoveRight: 'Gå höger och hugga',
            tutorialTouchHint: 'Eller tryck på vänster/höger sida av skärmen',
            tutorialBranch: 'Undvik grenar!',
            tutorialBranchWarn: 'Träffa gren = Spelet slut!',
            tutorialBranchHint: 'Titta innan du hugger',
            tutorialTime: 'Tidshantering',
            tutorialTimeHint1: 'Tidsfältet minskar konstant',
            tutorialTimeHint2: 'Varje hugg ger',
            tutorialTimeHint3: '+tid',
            tutorialTimeHint4: 'Tiden slut = Spelet slut',
            tutorialAdvanced: 'Avancerade tips',
            tutorialCombo: 'Combo',
            tutorialComboHint: 'Hugga snabbt för högre poäng',
            tutorialDifficulty: 'Svårighet',
            tutorialDifficultyHint: 'Ju högre poäng, desto svårare',
            tutorialAchievement: 'Prestationer',
            tutorialAchievementHint: 'Lås upp 12 prestationer',
            tutorialSkin: 'Skins',
            tutorialSkinHint: 'Höga poäng låser upp nya skins',
            skip: 'Hoppa över',
            prev: 'Föregående',
            next: 'Nästa',
            finish: 'Slutför',

            // Tryck tips
            tapLeft: '← Tryck vänster',
            tapRight: 'Tryck höger →',

            // Voluminställningar
            volumeSettings: '🎵 Ljudinställningar',
            sfxVolume: '🔊 Ljudeffekter',
            bgmVolume: '🎵 Musik',
            vibration: '📳 Vibration',

            // Popup
            skinUnlockPopup: 'Ny skin upplåst!',

            // Replay system
            replayBtn: '🎬 Repris',
            replayTitle: '🎬 Senaste spelet',
            replayScore: 'Poäng',
            replayCombo: 'Max combo',
            replayChops: 'Hugg',
            replayDuration: 'Längd',
            replayStart: 'Starta repris',
            replayStop: 'Stoppa',
            replayNoData: 'Ingen data',
            replayPlaying: '🎬 Spelar...',
            replaySeconds: 's',

            // Dela
            shareBtn: '📤 Dela',
            shareTitle: 'Skogshuggare',
            shareScoreLabel: 'Poäng',
            shareComboLabel: 'Combo',
            shareLevelLabel: 'Nivå',
            shareHighScoreLabel: 'Rekord',
            shareDownloading: 'Genererar bild...',
            shareSuccess: 'Bilden sparad!',
            shareFailed: 'Delning misslyckades, försök igen',
            sharePanelTitle: '📤 Dela poäng',
            shareNativeBtn: '📱 Dela',
            shareDownloadBtn: '💾 Spara bild',
            shareCopyBtn: '📋 Kopiera text',
            shareCopySuccess: '✓ Kopierat till urklipp!',

            // Oändligt läge
            endlessBtn: '∞ Oändligt läge',
            endlessTitle: '∞ Oändligt läge',
            endlessDesc: 'Ingen tidsgräns, testa din fokus!',
            endlessBest: 'Bästa poäng',
            endlessTotal: 'Totalt antal spel',
            endlessStart: 'Starta utmaning',
            endlessOver: '∞ Utmaning klar',
            endlessNewRecord: '🎉 Nytt rekord!',
            endlessHint: 'Bara undvik grenar, ingen tidspress',

            // Nedräkning
            countdownGo: 'KÖR!',

            // Tema
            themeDarkTip: 'Byt till mörkt läge',
            themeLightTip: 'Byt till ljust läge',

            // Hastighetsinställningar
            speedBtn: '⚡ Hastighet',
            speedTitle: '⚡ Spelhastighet',
            speedSelectDesc: 'Välj din önskade spelhastighet',
            speedSlow: '🐢 Långsam',
            speedNormal: '🚶 Normal',
            speedFast: '🏃 Snabb',
            speedSlowDesc: 'Långsammare tidsminskning, för nybörjare',
            speedNormalDesc: 'Standard spelhastighet',
            speedFastDesc: 'Snabbare tidsminskning, utmaningsläge',
            speedCurrent: 'Nuvarande',

            // Skin namn
            skinNames: {
                default: 'Skogshuggare',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Gyllene legend',
                santa: 'Jultomten',
                pumpkin: 'Pumpahuvud',
                pirate: 'Piratkapten',
                snowman: 'Snögubbe',
                chinese_new_year: 'Lyckans gud',
                valentine: 'Cupido',
                easter_bunny: 'Påskharen',
                summer_surfer: 'Sommarsurfare'
            },
            skinDescs: {
                default: 'Klassisk skogshuggare i röd tröja',
                ninja: 'Mystisk ninja i svart',
                robot: 'Mekanisk skogshuggare av stål',
                golden: 'Legendarisk gyllene skogshuggare',
                santa: 'Glad julhuggare',
                pumpkin: 'Skrämmande Halloween-huggare',
                pirate: 'Modig havsäventyrare',
                snowman: 'Skogshuggare från isvärlden',
                chinese_new_year: 'Gott Nytt År! Lycka till!',
                valentine: 'Kärleksgud som sprider kärlek',
                easter_bunny: 'Söt kanin med påskägg',
                summer_surfer: 'Cool strandsurfare'
            },

            // Prestation namn
            achievementNames: {
                first_chop: 'Första hugg',
                score_10: 'Nybörjarhuggare',
                score_50: 'Erfaren huggare',
                score_100: 'Professionell huggare',
                score_200: 'Mästarhuggare',
                combo_5: 'Mini combo',
                combo_10: 'Combo expert',
                combo_20: 'Combo kung',
                level_5: 'Nivå 5',
                level_8: 'Nivå 8',
                level_max: 'Max nivå',
                close_call: 'På håret'
            },
            achievementDescs: {
                first_chop: 'Hugga ditt första träd',
                score_10: 'Få 10 poäng i ett spel',
                score_50: 'Få 50 poäng i ett spel',
                score_100: 'Få 100 poäng i ett spel',
                score_200: 'Få 200 poäng i ett spel',
                combo_5: 'Nå en 5-combo',
                combo_10: 'Nå en 10-combo',
                combo_20: 'Nå en 20-combo',
                level_5: 'Nå svårighetsgrad 5',
                level_8: 'Nå svårighetsgrad 8',
                level_max: 'Nå maximal svårighetsgrad 11',
                close_call: 'Hugga 20 gånger när tiden är under 10%'
            }
        },

        // ============ 芬兰语 (Finnish) ============
        fi: {
            // Otsikko
            title: 'Metsuri',

            // Aloitusnäyttö
            startTitle: 'Metsuri',
            startHint1: 'Paina ← → tai A/D hakataksesi',
            startHint2: 'Napauta ruudun vasenta/oikeaa puolta',
            startHint3: 'Vältä oksia, voita aika!',
            startHint4: 'Välilyönti/Enter Aloita | ESC/P Tauko',
            startBtn: 'Aloita peli',
            dailyBtn: '📅 Päivän haaste',
            skinBtn: '👕 Ulkoasut',
            leaderboardBtn: '📊 Tuloslista',
            statsBtn: '📈 Tilastot',
            tutorialBtn: '❓ Opas',

            // Peli ohi
            gameOver: 'Peli ohi',
            score: 'Pisteet',
            maxCombo: 'Paras combo',
            highScore: 'Ennätys',
            restartBtn: 'Yritä uudelleen',
            achievementsBtn: '🏆 Saavutukset',

            // Tauko
            paused: '⏸️ Tauolla',
            pauseHint: 'Paina ESC tai P jatkaaksesi',
            resumeBtn: 'Jatka',

            // Päivän haaste
            dailyTitle: '📅 Päivän haaste',
            todayDate: 'Tänään',
            todayBest: 'Päivän paras',
            attempts: 'Yritykset',
            dailyHint: 'Sama taso kaikille, voita ennätyksesi!',
            startChallenge: 'Aloita haaste',
            back: 'Takaisin',
            challengeOver: '📅 Haaste päättyi',
            newRecord: '🎉 Uusi ennätys!',
            todayHighScore: 'Päivän paras',
            todayAttempts: 'Yritykset tänään',
            times: 'kertaa',
            retry: 'Yritä uudelleen',
            backHome: 'Alkuun',

            // Ulkoasut
            skinTitle: '👕 Ulkoasut',
            skinUnlocked: 'Avattu',
            skinLocked: '🔒',
            skinUnlockAt: 'pistettä vaaditaan',

            // Tuloslista
            leaderboardTitle: '📊 Tuloslista',
            rank: 'Sija',
            lbScore: 'Pisteet',
            lbCombo: 'Combo',
            lbDate: 'Päivämäärä',
            clearRecords: 'Tyhjennä',
            clearConfirm: 'Haluatko varmasti tyhjentää kaikki tulokset?',
            noRecords: 'Ei tuloksia',

            // Saavutukset
            achievementsTitle: '🏆 Saavutukset',
            achievementUnlock: 'Saavutus avattu!',

            // Tilastot
            statsTitle: '📈 Pelitilastot',
            totalGames: 'Pelejä yhteensä',
            totalChops: 'Hakkauksia yhteensä',
            totalTime: 'Peliaika yhteensä',
            bestCombo: 'Paras combo',
            avgScore: 'Keskimääräiset pisteet',
            unlockedAchievements: '🎖️ Saavutukset',
            unlockedSkins: '👕 Ulkoasut',
            dailyAttempts: '📅 Päivän haasteet',
            resetStats: 'Nollaa',
            resetConfirm: 'Haluatko varmasti nollata kaikki tilastot? Tätä ei voi perua.',

            // Opas
            tutorialWelcome: 'Tervetuloa Metsuri-peliin!',
            tutorialWelcome1: 'Olet rohkea metsuri',
            tutorialWelcome2: 'Tavoitteesi on hakata mahdollisimman monta puuta',
            tutorialWelcome3: 'Samalla vältellen vaarallisia oksia',
            tutorialControls: 'Ohjaus',
            tutorialMoveLeft: 'Siirry vasemmalle ja hakkaa',
            tutorialMoveRight: 'Siirry oikealle ja hakkaa',
            tutorialTouchHint: 'Tai napauta ruudun vasenta/oikeaa puolta',
            tutorialBranch: 'Vältä oksia!',
            tutorialBranchWarn: 'Osumat oksaan = Peli ohi!',
            tutorialBranchHint: 'Katso ennen hakkausta',
            tutorialTime: 'Ajanhallinta',
            tutorialTimeHint1: 'Aikapalkki vähenee jatkuvasti',
            tutorialTimeHint2: 'Jokainen hakkaus antaa',
            tutorialTimeHint3: '+aikaa',
            tutorialTimeHint4: 'Aika loppuu = Peli ohi',
            tutorialAdvanced: 'Edistyneet vinkit',
            tutorialCombo: 'Combo',
            tutorialComboHint: 'Hakkaa nopeasti saadaksesi lisäpisteitä',
            tutorialDifficulty: 'Vaikeus',
            tutorialDifficultyHint: 'Mitä enemmän pisteitä, sitä vaikeampaa',
            tutorialAchievement: 'Saavutukset',
            tutorialAchievementHint: 'Avaa 12 saavutusta',
            tutorialSkin: 'Ulkoasut',
            tutorialSkinHint: 'Korkeat pisteet avaavat uusia ulkoasuja',
            skip: 'Ohita',
            prev: 'Edellinen',
            next: 'Seuraava',
            finish: 'Valmis',

            // Kosketusvihjeet
            tapLeft: '← Napauta vasemmalle',
            tapRight: 'Napauta oikealle →',

            // Ääniasetukset
            volumeSettings: '🎵 Ääniasetukset',
            sfxVolume: '🔊 Äänitehosteet',
            bgmVolume: '🎵 Musiikki',
            vibration: '📳 Värinä',

            // Ponnahdusikkunat
            skinUnlockPopup: 'Uusi ulkoasu avattu!',

            // Toistojärjestelmä
            replayBtn: '🎬 Toisto',
            replayTitle: '🎬 Viimeisin peli',
            replayScore: 'Pisteet',
            replayCombo: 'Paras combo',
            replayChops: 'Hakkaukset',
            replayDuration: 'Kesto',
            replayStart: 'Aloita toisto',
            replayStop: 'Pysäytä',
            replayNoData: 'Ei dataa',
            replayPlaying: '🎬 Toistetaan...',
            replaySeconds: 's',

            // Jakaminen
            shareBtn: '📤 Jaa',
            shareTitle: 'Metsuri',
            shareScoreLabel: 'Pisteet',
            shareComboLabel: 'Combo',
            shareLevelLabel: 'Taso',
            shareHighScoreLabel: 'Ennätys',
            shareDownloading: 'Luodaan kuvaa...',
            shareSuccess: 'Kuva tallennettu!',
            shareFailed: 'Jakaminen epäonnistui, yritä uudelleen',
            sharePanelTitle: '📤 Jaa tulos',
            shareNativeBtn: '📱 Jaa',
            shareDownloadBtn: '💾 Tallenna kuva',
            shareCopyBtn: '📋 Kopioi teksti',
            shareCopySuccess: '✓ Kopioitu leikepöydälle!',

            // Loputon tila
            endlessBtn: '∞ Loputon tila',
            endlessTitle: '∞ Loputon tila',
            endlessDesc: 'Ei aikarajaa, testaa keskittymiskykyäsi!',
            endlessBest: 'Paras tulos',
            endlessTotal: 'Pelejä yhteensä',
            endlessStart: 'Aloita haaste',
            endlessOver: '∞ Haaste päättyi',
            endlessNewRecord: '🎉 Uusi ennätys!',
            endlessHint: 'Vältä vain oksia, ei aikapainetta',

            // Lähtölaskenta
            countdownGo: 'MENE!',

            // Teema
            themeDarkTip: 'Vaihda tummaan tilaan',
            themeLightTip: 'Vaihda valoisaan tilaan',

            // Nopeusasetukset
            speedBtn: '⚡ Nopeus',
            speedTitle: '⚡ Pelinopeus',
            speedSelectDesc: 'Valitse haluamasi pelinopeus',
            speedSlow: '🐢 Hidas',
            speedNormal: '🚶 Normaali',
            speedFast: '🏃 Nopea',
            speedSlowDesc: 'Hitaampi ajanvähennys, aloittelijoille',
            speedNormalDesc: 'Oletus pelinopeus',
            speedFastDesc: 'Nopeampi ajanvähennys, haasteellinen',
            speedCurrent: 'Nykyinen',

            // Ulkoasujen nimet
            skinNames: {
                default: 'Metsuri',
                ninja: 'Ninja',
                robot: 'Robotti',
                golden: 'Kultainen legenda',
                santa: 'Joulupukki',
                pumpkin: 'Kurpitsapää',
                pirate: 'Merirosvokapteeni',
                snowman: 'Lumiukko',
                chinese_new_year: 'Onnen jumala',
                valentine: 'Cupido',
                easter_bunny: 'Pääsiäispupu',
                summer_surfer: 'Kesäsurffaaja'
            },
            skinDescs: {
                default: 'Klassinen punapaitainen metsuri',
                ninja: 'Mystinen ninja mustissa',
                robot: 'Teräksinen mekaaninen metsuri',
                golden: 'Legendaarinen kultainen metsuri',
                santa: 'Iloinen joulumetsuri',
                pumpkin: 'Pelottava Halloween-metsuri',
                pirate: 'Rohkea meriseikkailija',
                snowman: 'Metsuri jäämaailmasta',
                chinese_new_year: 'Hyvää uutta vuotta! Onnea!',
                valentine: 'Rakkauden jumala levittää rakkautta',
                easter_bunny: 'Söpö pupu pääsiäismunilla',
                summer_surfer: 'Siisti rantasurffaaja'
            },

            // Saavutusten nimet
            achievementNames: {
                first_chop: 'Ensimmäinen hakkaus',
                score_10: 'Aloittelija metsuri',
                score_50: 'Kokenut metsuri',
                score_100: 'Ammattimetsuri',
                score_200: 'Mestari metsuri',
                combo_5: 'Mini combo',
                combo_10: 'Combo-asiantuntija',
                combo_20: 'Combo-kuningas',
                level_5: 'Taso 5',
                level_8: 'Taso 8',
                level_max: 'Maksimitaso',
                close_call: 'Täpärä tilanne'
            },
            achievementDescs: {
                first_chop: 'Hakkaa ensimmäinen puusi',
                score_10: 'Saa 10 pistettä yhdessä pelissä',
                score_50: 'Saa 50 pistettä yhdessä pelissä',
                score_100: 'Saa 100 pistettä yhdessä pelissä',
                score_200: 'Saa 200 pistettä yhdessä pelissä',
                combo_5: 'Saavuta 5-combo',
                combo_10: 'Saavuta 10-combo',
                combo_20: 'Saavuta 20-combo',
                level_5: 'Saavuta vaikeustaso 5',
                level_8: 'Saavuta vaikeustaso 8',
                level_max: 'Saavuta maksimivaikeustaso 11',
                close_call: 'Hakkaa 20 kertaa kun aikaa on alle 10%'
            }
        },

        // ============ 挪威语 (Norwegian) ============
        no: {
            // Tittel
            title: 'Tømmerhugger',

            // Startskjerm
            startTitle: 'Tømmerhugger',
            startHint1: 'Trykk ← → eller A/D for å hogge',
            startHint2: 'Trykk på venstre/høyre side av skjermen',
            startHint3: 'Unngå grener, slå klokken!',
            startHint4: 'Mellomrom/Enter Start | ESC/P Pause',
            startBtn: 'Start spill',
            dailyBtn: '📅 Daglig utfordring',
            skinBtn: '👕 Skinn',
            leaderboardBtn: '📊 Poengtavle',
            statsBtn: '📈 Statistikk',
            tutorialBtn: '❓ Veiledning',

            // Spillet slutt
            gameOver: 'Spillet slutt',
            score: 'Poeng',
            maxCombo: 'Maks kombo',
            highScore: 'Rekord',
            restartBtn: 'Prøv igjen',
            achievementsBtn: '🏆 Prestasjoner',

            // Pause
            paused: '⏸️ Pauset',
            pauseHint: 'Trykk ESC eller P for å fortsette',
            resumeBtn: 'Fortsett',

            // Daglig utfordring
            dailyTitle: '📅 Daglig utfordring',
            todayDate: 'I dag',
            todayBest: 'Dagens beste',
            attempts: 'Forsøk',
            dailyHint: 'Samme nivå for alle, slå din rekord!',
            startChallenge: 'Start utfordring',
            back: 'Tilbake',
            challengeOver: '📅 Utfordring fullført',
            newRecord: '🎉 Ny rekord!',
            todayHighScore: 'Dagens beste',
            todayAttempts: 'Forsøk i dag',
            times: 'ganger',
            retry: 'Prøv igjen',
            backHome: 'Hjem',

            // Skinn
            skinTitle: '👕 Skinn',
            skinUnlocked: 'Låst opp',
            skinLocked: '🔒',
            skinUnlockAt: 'poeng kreves',

            // Poengtavle
            leaderboardTitle: '📊 Poengtavle',
            rank: 'Plass',
            lbScore: 'Poeng',
            lbCombo: 'Kombo',
            lbDate: 'Dato',
            clearRecords: 'Slett alt',
            clearConfirm: 'Er du sikker på at du vil slette alle rekorder?',
            noRecords: 'Ingen rekorder',

            // Prestasjoner
            achievementsTitle: '🏆 Prestasjoner',
            achievementUnlock: 'Prestasjon låst opp!',

            // Statistikk
            statsTitle: '📈 Spillstatistikk',
            totalGames: 'Totalt antall spill',
            totalChops: 'Totalt antall hugg',
            totalTime: 'Total spilletid',
            bestCombo: 'Beste kombo',
            avgScore: 'Gjennomsnittspoeng',
            unlockedAchievements: '🎖️ Prestasjoner',
            unlockedSkins: '👕 Skinn',
            dailyAttempts: '📅 Daglige utfordringer',
            resetStats: 'Nullstill',
            resetConfirm: 'Er du sikker på at du vil nullstille all statistikk? Dette kan ikke angres.',

            // Veiledning
            tutorialWelcome: 'Velkommen til Tømmerhugger!',
            tutorialWelcome1: 'Du er en modig tømmerhugger',
            tutorialWelcome2: 'Hogg så mange trær du kan',
            tutorialWelcome3: 'Mens du unngår farlige grener',
            tutorialControls: 'Kontroller',
            tutorialMoveLeft: 'Gå til venstre og hogg',
            tutorialMoveRight: 'Gå til høyre og hogg',
            tutorialTouchHint: 'Eller trykk på venstre/høyre side av skjermen',
            tutorialBranch: 'Unngå grener!',
            tutorialBranchWarn: 'Treff gren = Spillet slutt!',
            tutorialBranchHint: 'Se før du hogger',
            tutorialTime: 'Tidshåndtering',
            tutorialTimeHint1: 'Tidsfeltet minsker konstant',
            tutorialTimeHint2: 'Hvert hugg gir',
            tutorialTimeHint3: '+tid',
            tutorialTimeHint4: 'Tiden ute = Spillet slutt',
            tutorialAdvanced: 'Avanserte tips',
            tutorialCombo: 'Kombo',
            tutorialComboHint: 'Hogg raskt for høyere poeng',
            tutorialDifficulty: 'Vanskelighetsgrad',
            tutorialDifficultyHint: 'Jo høyere poeng, desto vanskeligere',
            tutorialAchievement: 'Prestasjoner',
            tutorialAchievementHint: 'Lås opp 12 prestasjoner',
            tutorialSkin: 'Skinn',
            tutorialSkinHint: 'Høye poeng låser opp nye skinn',
            skip: 'Hopp over',
            prev: 'Forrige',
            next: 'Neste',
            finish: 'Fullfør',

            // Trykk tips
            tapLeft: '← Trykk venstre',
            tapRight: 'Trykk høyre →',

            // Lydinnstillinger
            volumeSettings: '🎵 Lydinnstillinger',
            sfxVolume: '🔊 Lydeffekter',
            bgmVolume: '🎵 Musikk',
            vibration: '📳 Vibrasjon',

            // Popup
            skinUnlockPopup: 'Nytt skinn låst opp!',

            // Replay system
            replayBtn: '🎬 Avspilling',
            replayTitle: '🎬 Forrige spill',
            replayScore: 'Poeng',
            replayCombo: 'Maks kombo',
            replayChops: 'Hugg',
            replayDuration: 'Varighet',
            replayStart: 'Start avspilling',
            replayStop: 'Stopp',
            replayNoData: 'Ingen data',
            replayPlaying: '🎬 Spiller...',
            replaySeconds: 's',

            // Deling
            shareBtn: '📤 Del',
            shareTitle: 'Tømmerhugger',
            shareScoreLabel: 'Poeng',
            shareComboLabel: 'Kombo',
            shareLevelLabel: 'Nivå',
            shareHighScoreLabel: 'Rekord',
            shareDownloading: 'Genererer bilde...',
            shareSuccess: 'Bildet lagret!',
            shareFailed: 'Deling mislyktes, prøv igjen',
            sharePanelTitle: '📤 Del poeng',
            shareNativeBtn: '📱 Del',
            shareDownloadBtn: '💾 Lagre bilde',
            shareCopyBtn: '📋 Kopier tekst',
            shareCopySuccess: '✓ Kopiert til utklippstavlen!',

            // Uendelig modus
            endlessBtn: '∞ Uendelig modus',
            endlessTitle: '∞ Uendelig modus',
            endlessDesc: 'Ingen tidsbegrensning, test fokuset ditt!',
            endlessBest: 'Beste poeng',
            endlessTotal: 'Totalt antall spill',
            endlessStart: 'Start utfordring',
            endlessOver: '∞ Utfordring fullført',
            endlessNewRecord: '🎉 Ny rekord!',
            endlessHint: 'Bare unngå grener, ingen tidspress',

            // Nedtelling
            countdownGo: 'KJØR!',

            // Tema
            themeDarkTip: 'Bytt til mørk modus',
            themeLightTip: 'Bytt til lys modus',

            // Hastighetsinnstillinger
            speedBtn: '⚡ Hastighet',
            speedTitle: '⚡ Spillhastighet',
            speedSelectDesc: 'Velg din foretrukne spillhastighet',
            speedSlow: '🐢 Langsom',
            speedNormal: '🚶 Normal',
            speedFast: '🏃 Rask',
            speedSlowDesc: 'Langsommere tidsreduksjon, for nybegynnere',
            speedNormalDesc: 'Standard spillhastighet',
            speedFastDesc: 'Raskere tidsreduksjon, utfordringsmodus',
            speedCurrent: 'Nåværende',

            // Skinn navn
            skinNames: {
                default: 'Tømmerhugger',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Gyllen legende',
                santa: 'Julenissen',
                pumpkin: 'Gresshode',
                pirate: 'Piratkapten',
                snowman: 'Snømann',
                chinese_new_year: 'Lykkegud',
                valentine: 'Cupido',
                easter_bunny: 'Påskeharen',
                summer_surfer: 'Sommersurfer'
            },
            skinDescs: {
                default: 'Klassisk tømmerhugger i rød skjorte',
                ninja: 'Mystisk ninja i svart',
                robot: 'Mekanisk tømmerhugger av stål',
                golden: 'Legendarisk gyllen tømmerhugger',
                santa: 'Gladtømmerhugger med julestemning',
                pumpkin: 'Skummel Halloween-hugger',
                pirate: 'Modig havseventyrere',
                snowman: 'Tømmerhugger fra isens verden',
                chinese_new_year: 'Godt Nyttår! Lykke til!',
                valentine: 'Kjærlighetsgud som sprer kjærlighet',
                easter_bunny: 'Søt kanin med påskeegg',
                summer_surfer: 'Kul strandsurfer'
            },

            // Prestasjon navn
            achievementNames: {
                first_chop: 'Første hugg',
                score_10: 'Nybegynner hugger',
                score_50: 'Erfaren hugger',
                score_100: 'Profesjonell hugger',
                score_200: 'Mester hugger',
                combo_5: 'Mini kombo',
                combo_10: 'Kombo ekspert',
                combo_20: 'Kombo konge',
                level_5: 'Nivå 5',
                level_8: 'Nivå 8',
                level_max: 'Maks nivå',
                close_call: 'På hengende håret'
            },
            achievementDescs: {
                first_chop: 'Hogg ditt første tre',
                score_10: 'Få 10 poeng i ett spill',
                score_50: 'Få 50 poeng i ett spill',
                score_100: 'Få 100 poeng i ett spill',
                score_200: 'Få 200 poeng i ett spill',
                combo_5: 'Nå en 5-kombo',
                combo_10: 'Nå en 10-kombo',
                combo_20: 'Nå en 20-kombo',
                level_5: 'Nå vanskelighetsgrad 5',
                level_8: 'Nå vanskelighetsgrad 8',
                level_max: 'Nå maksimal vanskelighetsgrad 11',
                close_call: 'Hogg 20 ganger når tiden er under 10%'
            }
        },

        // ============ 丹麦语 (Danish) ============
        da: {
            // Titel
            title: 'Skovhugger',

            // Startskærm
            startTitle: 'Skovhugger',
            startHint1: 'Tryk ← → eller A/D for at hugge',
            startHint2: 'Tryk på venstre/højre side af skærmen',
            startHint3: 'Undgå grene, slå uret!',
            startHint4: 'Mellemrum/Enter Start | ESC/P Pause',
            startBtn: 'Start spil',
            dailyBtn: '📅 Daglig udfordring',
            skinBtn: '👕 Skins',
            leaderboardBtn: '📊 Rangliste',
            statsBtn: '📈 Statistik',
            tutorialBtn: '❓ Vejledning',

            // Spillet slut
            gameOver: 'Spillet slut',
            score: 'Point',
            maxCombo: 'Maks kombo',
            highScore: 'Rekord',
            restartBtn: 'Prøv igen',
            achievementsBtn: '🏆 Præstationer',

            // Pause
            paused: '⏸️ Pauset',
            pauseHint: 'Tryk ESC eller P for at fortsætte',
            resumeBtn: 'Fortsæt',

            // Daglig udfordring
            dailyTitle: '📅 Daglig udfordring',
            todayDate: 'I dag',
            todayBest: 'Dagens bedste',
            attempts: 'Forsøg',
            dailyHint: 'Samme niveau for alle, slå din rekord!',
            startChallenge: 'Start udfordring',
            back: 'Tilbage',
            challengeOver: '📅 Udfordring afsluttet',
            newRecord: '🎉 Ny rekord!',
            todayHighScore: 'Dagens bedste',
            todayAttempts: 'Forsøg i dag',
            times: 'gange',
            retry: 'Prøv igen',
            backHome: 'Hjem',

            // Skins
            skinTitle: '👕 Skins',
            skinUnlocked: 'Låst op',
            skinLocked: '🔒',
            skinUnlockAt: 'point kræves',

            // Rangliste
            leaderboardTitle: '📊 Rangliste',
            rank: 'Plads',
            lbScore: 'Point',
            lbCombo: 'Kombo',
            lbDate: 'Dato',
            clearRecords: 'Slet alt',
            clearConfirm: 'Er du sikker på, at du vil slette alle rekorder?',
            noRecords: 'Ingen rekorder',

            // Præstationer
            achievementsTitle: '🏆 Præstationer',
            achievementUnlock: 'Præstation låst op!',

            // Statistik
            statsTitle: '📈 Spilstatistik',
            totalGames: 'Antal spil i alt',
            totalChops: 'Antal hugg i alt',
            totalTime: 'Samlet spilletid',
            bestCombo: 'Bedste kombo',
            avgScore: 'Gennemsnitlige point',
            unlockedAchievements: '🎖️ Præstationer',
            unlockedSkins: '👕 Skins',
            dailyAttempts: '📅 Daglige udfordringer',
            resetStats: 'Nulstil',
            resetConfirm: 'Er du sikker på, at du vil nulstille al statistik? Dette kan ikke fortrydes.',

            // Vejledning
            tutorialWelcome: 'Velkommen til Skovhugger!',
            tutorialWelcome1: 'Du er en modig skovhugger',
            tutorialWelcome2: 'Hug så mange træer som muligt',
            tutorialWelcome3: 'Mens du undgår farlige grene',
            tutorialControls: 'Kontroller',
            tutorialMoveLeft: 'Gå til venstre og hug',
            tutorialMoveRight: 'Gå til højre og hug',
            tutorialTouchHint: 'Eller tryk på venstre/højre side af skærmen',
            tutorialBranch: 'Undgå grene!',
            tutorialBranchWarn: 'Rammer du en gren = Spillet slut!',
            tutorialBranchHint: 'Se før du hugger',
            tutorialTime: 'Tidsstyring',
            tutorialTimeHint1: 'Tidslinjen falder konstant',
            tutorialTimeHint2: 'Hvert hug giver',
            tutorialTimeHint3: '+tid',
            tutorialTimeHint4: 'Tiden udløber = Spillet slut',
            tutorialAdvanced: 'Avancerede tips',
            tutorialCombo: 'Kombo',
            tutorialComboHint: 'Hug hurtigt for højere point',
            tutorialDifficulty: 'Sværhedsgrad',
            tutorialDifficultyHint: 'Jo højere point, desto sværere',
            tutorialAchievement: 'Præstationer',
            tutorialAchievementHint: 'Lås op for 12 præstationer',
            tutorialSkin: 'Skins',
            tutorialSkinHint: 'Høje point låser nye skins op',
            skip: 'Spring over',
            prev: 'Forrige',
            next: 'Næste',
            finish: 'Færdig',

            // Tryk tips
            tapLeft: '← Tryk venstre',
            tapRight: 'Tryk højre →',

            // Lydindstillinger
            volumeSettings: '🎵 Lydindstillinger',
            sfxVolume: '🔊 Lydeffekter',
            bgmVolume: '🎵 Musik',
            vibration: '📳 Vibration',

            // Popup
            skinUnlockPopup: 'Nyt skin låst op!',

            // Replay system
            replayBtn: '🎬 Afspilning',
            replayTitle: '🎬 Forrige spil',
            replayScore: 'Point',
            replayCombo: 'Maks kombo',
            replayChops: 'Hugg',
            replayDuration: 'Varighed',
            replayStart: 'Start afspilning',
            replayStop: 'Stop',
            replayNoData: 'Ingen data',
            replayPlaying: '🎬 Afspiller...',
            replaySeconds: 's',

            // Deling
            shareBtn: '📤 Del',
            shareTitle: 'Skovhugger',
            shareScoreLabel: 'Point',
            shareComboLabel: 'Kombo',
            shareLevelLabel: 'Niveau',
            shareHighScoreLabel: 'Rekord',
            shareDownloading: 'Genererer billede...',
            shareSuccess: 'Billedet gemt!',
            shareFailed: 'Deling mislykkedes, prøv igen',
            sharePanelTitle: '📤 Del point',
            shareNativeBtn: '📱 Del',
            shareDownloadBtn: '💾 Gem billede',
            shareCopyBtn: '📋 Kopier tekst',
            shareCopySuccess: '✓ Kopieret til udklipsholder!',

            // Uendelig tilstand
            endlessBtn: '∞ Uendelig tilstand',
            endlessTitle: '∞ Uendelig tilstand',
            endlessDesc: 'Ingen tidsbegrænsning, test dit fokus!',
            endlessBest: 'Bedste point',
            endlessTotal: 'Antal spil i alt',
            endlessStart: 'Start udfordring',
            endlessOver: '∞ Udfordring afsluttet',
            endlessNewRecord: '🎉 Ny rekord!',
            endlessHint: 'Undgå kun grene, intet tidspres',

            // Nedtælling
            countdownGo: 'KØR!',

            // Tema
            themeDarkTip: 'Skift til mørk tilstand',
            themeLightTip: 'Skift til lys tilstand',

            // Hastighedsindstillinger
            speedBtn: '⚡ Hastighed',
            speedTitle: '⚡ Spilhastighed',
            speedSelectDesc: 'Vælg din foretrukne spilhastighed',
            speedSlow: '🐢 Langsom',
            speedNormal: '🚶 Normal',
            speedFast: '🏃 Hurtig',
            speedSlowDesc: 'Langsommere tidsreduktion, for begyndere',
            speedNormalDesc: 'Standard spilhastighed',
            speedFastDesc: 'Hurtigere tidsreduktion, udfordringstilstand',
            speedCurrent: 'Nuværende',

            // Skin navne
            skinNames: {
                default: 'Skovhugger',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Gylden legende',
                santa: 'Julemanden',
                pumpkin: 'Græskarhoved',
                pirate: 'Piratkaptajn',
                snowman: 'Snemand',
                chinese_new_year: 'Lykkegud',
                valentine: 'Cupido',
                easter_bunny: 'Påskeharen',
                summer_surfer: 'Sommersurfer'
            },
            skinDescs: {
                default: 'Klassisk skovhugger i rød skjorte',
                ninja: 'Mystisk ninja i sort',
                robot: 'Mekanisk skovhugger af stål',
                golden: 'Legendarisk gylden skovhugger',
                santa: 'Glad skovhugger med julestemning',
                pumpkin: 'Uhyggelig Halloween-hugger',
                pirate: 'Modig havseventyreren',
                snowman: 'Skovhugger fra isens verden',
                chinese_new_year: 'Godt Nytår! Held og lykke!',
                valentine: 'Kærlighedsgud der spreder kærlighed',
                easter_bunny: 'Sød kanin med påskeæg',
                summer_surfer: 'Sej strandsurfer'
            },

            // Præstation navne
            achievementNames: {
                first_chop: 'Første hug',
                score_10: 'Begynderhugger',
                score_50: 'Erfaren hugger',
                score_100: 'Professionel hugger',
                score_200: 'Mesterhugger',
                combo_5: 'Mini kombo',
                combo_10: 'Kombo ekspert',
                combo_20: 'Kombo konge',
                level_5: 'Niveau 5',
                level_8: 'Niveau 8',
                level_max: 'Maks niveau',
                close_call: 'På et hængende hår'
            },
            achievementDescs: {
                first_chop: 'Hug dit første træ',
                score_10: 'Få 10 point i ét spil',
                score_50: 'Få 50 point i ét spil',
                score_100: 'Få 100 point i ét spil',
                score_200: 'Få 200 point i ét spil',
                combo_5: 'Nå en 5-kombo',
                combo_10: 'Nå en 10-kombo',
                combo_20: 'Nå en 20-kombo',
                level_5: 'Nå sværhedsgrad 5',
                level_8: 'Nå sværhedsgrad 8',
                level_max: 'Nå maksimal sværhedsgrad 11',
                close_call: 'Hug 20 gange når tiden er under 10%'
            }
        },

        // ============ 希腊语 (Greek) ============
        el: {
            // Τίτλος
            title: 'Ξυλοκόπος',

            // Αρχική οθόνη
            startTitle: 'Ξυλοκόπος',
            startHint1: 'Πάτα ← → ή A/D για κόψιμο',
            startHint2: 'Πάτα αριστερά/δεξιά της οθόνης',
            startHint3: 'Απόφυγε τα κλαδιά, νίκησε το ρολόι!',
            startHint4: 'Space/Enter Έναρξη | ESC/P Παύση',
            startBtn: 'Έναρξη παιχνιδιού',
            dailyBtn: '📅 Ημερήσια πρόκληση',
            skinBtn: '👕 Εμφανίσεις',
            leaderboardBtn: '📊 Κατάταξη',
            statsBtn: '📈 Στατιστικά',
            tutorialBtn: '❓ Οδηγός',

            // Τέλος παιχνιδιού
            gameOver: 'Τέλος παιχνιδιού',
            score: 'Σκορ',
            maxCombo: 'Μέγ. κόμπο',
            highScore: 'Ρεκόρ',
            restartBtn: 'Ξαναπροσπάθησε',
            achievementsBtn: '🏆 Επιτεύγματα',

            // Παύση
            paused: '⏸️ Παύση',
            pauseHint: 'Πάτα ESC ή P για συνέχεια',
            resumeBtn: 'Συνέχεια',

            // Ημερήσια πρόκληση
            dailyTitle: '📅 Ημερήσια πρόκληση',
            todayDate: 'Σήμερα',
            todayBest: 'Καλύτερο σήμερα',
            attempts: 'Προσπάθειες',
            dailyHint: 'Ίδιο επίπεδο για όλους, σπάσε το ρεκόρ!',
            startChallenge: 'Έναρξη πρόκλησης',
            back: 'Πίσω',
            challengeOver: '📅 Πρόκληση ολοκληρώθηκε',
            newRecord: '🎉 Νέο ρεκόρ!',
            todayHighScore: 'Καλύτερο σήμερα',
            todayAttempts: 'Σημερινές προσπάθειες',
            times: 'φορές',
            retry: 'Ξαναπροσπάθησε',
            backHome: 'Αρχική',

            // Εμφανίσεις
            skinTitle: '👕 Εμφανίσεις',
            skinUnlocked: 'Ξεκλειδώθηκε',
            skinLocked: '🔒',
            skinUnlockAt: 'πόντοι απαιτούνται',

            // Κατάταξη
            leaderboardTitle: '📊 Κατάταξη',
            rank: 'Θέση',
            lbScore: 'Σκορ',
            lbCombo: 'Κόμπο',
            lbDate: 'Ημ/νία',
            clearRecords: 'Διαγραφή όλων',
            clearConfirm: 'Σίγουρα θέλεις να διαγράψεις όλα τα ρεκόρ;',
            noRecords: 'Κανένα ρεκόρ',

            // Επιτεύγματα
            achievementsTitle: '🏆 Επιτεύγματα',
            achievementUnlock: 'Επίτευγμα ξεκλειδώθηκε!',

            // Στατιστικά
            statsTitle: '📈 Στατιστικά παιχνιδιού',
            totalGames: 'Συνολικά παιχνίδια',
            totalChops: 'Συνολικά κοψίματα',
            totalTime: 'Συνολικός χρόνος',
            bestCombo: 'Καλύτερο κόμπο',
            avgScore: 'Μέσο σκορ',
            unlockedAchievements: '🎖️ Επιτεύγματα',
            unlockedSkins: '👕 Εμφανίσεις',
            dailyAttempts: '📅 Ημερήσιες προκλήσεις',
            resetStats: 'Επαναφορά',
            resetConfirm: 'Σίγουρα θέλεις να επαναφέρεις τα στατιστικά; Αυτό δεν μπορεί να αναιρεθεί.',

            // Οδηγός
            tutorialWelcome: 'Καλώς ήρθες στον Ξυλοκόπο!',
            tutorialWelcome1: 'Είσαι ένας γενναίος ξυλοκόπος',
            tutorialWelcome2: 'Κόψε όσα περισσότερα δέντρα μπορείς',
            tutorialWelcome3: 'Αποφεύγοντας τα επικίνδυνα κλαδιά',
            tutorialControls: 'Χειρισμός',
            tutorialMoveLeft: 'Πήγαινε αριστερά και κόψε',
            tutorialMoveRight: 'Πήγαινε δεξιά και κόψε',
            tutorialTouchHint: 'Ή πάτα αριστερά/δεξιά της οθόνης',
            tutorialBranch: 'Απόφυγε τα κλαδιά!',
            tutorialBranchWarn: 'Χτύπημα κλαδιού = Τέλος παιχνιδιού!',
            tutorialBranchHint: 'Κοίτα πριν κόψεις',
            tutorialTime: 'Διαχείριση χρόνου',
            tutorialTimeHint1: 'Η μπάρα χρόνου μειώνεται συνεχώς',
            tutorialTimeHint2: 'Κάθε κόψιμο δίνει',
            tutorialTimeHint3: '+χρόνο',
            tutorialTimeHint4: 'Τέλος χρόνου = Τέλος παιχνιδιού',
            tutorialAdvanced: 'Προχωρημένες συμβουλές',
            tutorialCombo: 'Κόμπο',
            tutorialComboHint: 'Κόψε γρήγορα για υψηλότερο σκορ',
            tutorialDifficulty: 'Δυσκολία',
            tutorialDifficultyHint: 'Όσο υψηλότερο σκορ, τόσο δυσκολότερο',
            tutorialAchievement: 'Επιτεύγματα',
            tutorialAchievementHint: 'Ξεκλείδωσε 12 επιτεύγματα',
            tutorialSkin: 'Εμφανίσεις',
            tutorialSkinHint: 'Υψηλό σκορ ξεκλειδώνει νέες εμφανίσεις',
            skip: 'Παράλειψη',
            prev: 'Προηγούμενο',
            next: 'Επόμενο',
            finish: 'Τέλος',

            // Συμβουλές αφής
            tapLeft: '← Πάτα αριστερά',
            tapRight: 'Πάτα δεξιά →',

            // Ρυθμίσεις ήχου
            volumeSettings: '🎵 Ρυθμίσεις ήχου',
            sfxVolume: '🔊 Εφέ ήχου',
            bgmVolume: '🎵 Μουσική',
            vibration: '📳 Δόνηση',

            // Αναδυόμενο
            skinUnlockPopup: 'Νέα εμφάνιση ξεκλειδώθηκε!',

            // Σύστημα επανάληψης
            replayBtn: '🎬 Επανάληψη',
            replayTitle: '🎬 Προηγούμενο παιχνίδι',
            replayScore: 'Σκορ',
            replayCombo: 'Μέγ. κόμπο',
            replayChops: 'Κοψίματα',
            replayDuration: 'Διάρκεια',
            replayStart: 'Έναρξη επανάληψης',
            replayStop: 'Σταμάτα',
            replayNoData: 'Δεν υπάρχουν δεδομένα',
            replayPlaying: '🎬 Αναπαραγωγή...',
            replaySeconds: 'δ',

            // Κοινοποίηση
            shareBtn: '📤 Κοινοποίηση',
            shareTitle: 'Ξυλοκόπος',
            shareScoreLabel: 'Σκορ',
            shareComboLabel: 'Κόμπο',
            shareLevelLabel: 'Επίπεδο',
            shareHighScoreLabel: 'Ρεκόρ',
            shareDownloading: 'Δημιουργία εικόνας...',
            shareSuccess: 'Η εικόνα αποθηκεύτηκε!',
            shareFailed: 'Η κοινοποίηση απέτυχε, δοκίμασε ξανά',
            sharePanelTitle: '📤 Κοινοποίηση σκορ',
            shareNativeBtn: '📱 Κοινοποίηση',
            shareDownloadBtn: '💾 Αποθήκευση εικόνας',
            shareCopyBtn: '📋 Αντιγραφή κειμένου',
            shareCopySuccess: '✓ Αντιγράφηκε στο πρόχειρο!',

            // Ατελείωτη λειτουργία
            endlessBtn: '∞ Ατελείωτη λειτουργία',
            endlessTitle: '∞ Ατελείωτη λειτουργία',
            endlessDesc: 'Χωρίς χρονικό όριο, δοκίμασε τη συγκέντρωσή σου!',
            endlessBest: 'Καλύτερο σκορ',
            endlessTotal: 'Συνολικά παιχνίδια',
            endlessStart: 'Έναρξη πρόκλησης',
            endlessOver: '∞ Πρόκληση ολοκληρώθηκε',
            endlessNewRecord: '🎉 Νέο ρεκόρ!',
            endlessHint: 'Μόνο απόφυγε κλαδιά, χωρίς πίεση χρόνου',

            // Αντίστροφη μέτρηση
            countdownGo: 'ΠΑΜΕ!',

            // Θέμα
            themeDarkTip: 'Αλλαγή σε σκοτεινή λειτουργία',
            themeLightTip: 'Αλλαγή σε φωτεινή λειτουργία',

            // Ρυθμίσεις ταχύτητας
            speedBtn: '⚡ Ταχύτητα',
            speedTitle: '⚡ Ταχύτητα παιχνιδιού',
            speedSelectDesc: 'Επέλεξε την προτιμώμενη ταχύτητα',
            speedSlow: '🐢 Αργή',
            speedNormal: '🚶 Κανονική',
            speedFast: '🏃 Γρήγορη',
            speedSlowDesc: 'Πιο αργή μείωση χρόνου, για αρχάριους',
            speedNormalDesc: 'Κανονική ταχύτητα παιχνιδιού',
            speedFastDesc: 'Πιο γρήγορη μείωση χρόνου, πρόκληση',
            speedCurrent: 'Τρέχουσα',

            // Ονόματα εμφανίσεων
            skinNames: {
                default: 'Ξυλοκόπος',
                ninja: 'Νίντζα',
                robot: 'Ρομπότ',
                golden: 'Χρυσός θρύλος',
                santa: 'Άγιος Βασίλης',
                pumpkin: 'Κολοκυθοκεφαλή',
                pirate: 'Πειρατής καπετάνιος',
                snowman: 'Χιονάνθρωπος',
                chinese_new_year: 'Θεός πλούτου',
                valentine: 'Έρωτας',
                easter_bunny: 'Πασχαλινό λαγουδάκι',
                summer_surfer: 'Καλοκαιρινός σέρφερ'
            },
            skinDescs: {
                default: 'Κλασικός ξυλοκόπος με κόκκινο πουκάμισο',
                ninja: 'Μυστηριώδης νίντζα στα μαύρα',
                robot: 'Μηχανικός ξυλοκόπος από ατσάλι',
                golden: 'Θρυλικός χρυσός ξυλοκόπος',
                santa: 'Χαρούμενος ξυλοκόπος με χριστουγεννιάτικο πνεύμα',
                pumpkin: 'Τρομακτικός ξυλοκόπος Halloween',
                pirate: 'Γενναίος θαλασσοπόρος',
                snowman: 'Ξυλοκόπος από τον κόσμο του πάγου',
                chinese_new_year: 'Καλή Χρονιά! Καλή τύχη!',
                valentine: 'Θεός έρωτα που σκορπά αγάπη',
                easter_bunny: 'Χαριτωμένο λαγουδάκι με πασχαλινά αυγά',
                summer_surfer: 'Κουλ σέρφερ της παραλίας'
            },

            // Ονόματα επιτευγμάτων
            achievementNames: {
                first_chop: 'Πρώτο κόψιμο',
                score_10: 'Αρχάριος ξυλοκόπος',
                score_50: 'Έμπειρος ξυλοκόπος',
                score_100: 'Επαγγελματίας ξυλοκόπος',
                score_200: 'Μάστορας ξυλοκόπος',
                combo_5: 'Μίνι κόμπο',
                combo_10: 'Ειδικός κόμπο',
                combo_20: 'Βασιλιάς κόμπο',
                level_5: 'Επίπεδο 5',
                level_8: 'Επίπεδο 8',
                level_max: 'Μέγιστο επίπεδο',
                close_call: 'Παρά τρίχα'
            },
            achievementDescs: {
                first_chop: 'Κόψε το πρώτο σου δέντρο',
                score_10: 'Πέτυχε 10 πόντους σε ένα παιχνίδι',
                score_50: 'Πέτυχε 50 πόντους σε ένα παιχνίδι',
                score_100: 'Πέτυχε 100 πόντους σε ένα παιχνίδι',
                score_200: 'Πέτυχε 200 πόντους σε ένα παιχνίδι',
                combo_5: 'Φτάσε σε 5-κόμπο',
                combo_10: 'Φτάσε σε 10-κόμπο',
                combo_20: 'Φτάσε σε 20-κόμπο',
                level_5: 'Φτάσε στο επίπεδο δυσκολίας 5',
                level_8: 'Φτάσε στο επίπεδο δυσκολίας 8',
                level_max: 'Φτάσε στο μέγιστο επίπεδο δυσκολίας 11',
                close_call: 'Κόψε 20 φορές με χρόνο κάτω από 10%'
            }
        },

        // ============ 捷克语 (Czech) ============
        cs: {
            // Název
            title: 'Dřevorubec',

            // Úvodní obrazovka
            startTitle: 'Dřevorubec',
            startHint1: 'Stiskni ← → nebo A/D pro sekání',
            startHint2: 'Klepni vlevo/vpravo na obrazovku',
            startHint3: 'Vyhni se větvím, poraz čas!',
            startHint4: 'Mezerník/Enter Start | ESC/P Pauza',
            startBtn: 'Spustit hru',
            dailyBtn: '📅 Denní výzva',
            skinBtn: '👕 Vzhledy',
            leaderboardBtn: '📊 Žebříček',
            statsBtn: '📈 Statistiky',
            tutorialBtn: '❓ Návod',

            // Konec hry
            gameOver: 'Konec hry',
            score: 'Skóre',
            maxCombo: 'Max kombo',
            highScore: 'Rekord',
            restartBtn: 'Zkusit znovu',
            achievementsBtn: '🏆 Úspěchy',

            // Pauza
            paused: '⏸️ Pozastaveno',
            pauseHint: 'Stiskni ESC nebo P pro pokračování',
            resumeBtn: 'Pokračovat',

            // Denní výzva
            dailyTitle: '📅 Denní výzva',
            todayDate: 'Dnes',
            todayBest: 'Dnešní nejlepší',
            attempts: 'Pokusy',
            dailyHint: 'Stejná úroveň pro všechny, překonej svůj rekord!',
            startChallenge: 'Začít výzvu',
            back: 'Zpět',
            challengeOver: '📅 Výzva dokončena',
            newRecord: '🎉 Nový rekord!',
            todayHighScore: 'Dnešní nejlepší',
            todayAttempts: 'Dnešní pokusy',
            times: 'krát',
            retry: 'Zkusit znovu',
            backHome: 'Domů',

            // Vzhledy
            skinTitle: '👕 Vzhledy',
            skinUnlocked: 'Odemčeno',
            skinLocked: '🔒',
            skinUnlockAt: 'bodů k odemčení',

            // Žebříček
            leaderboardTitle: '📊 Žebříček',
            rank: 'Pořadí',
            lbScore: 'Skóre',
            lbCombo: 'Kombo',
            lbDate: 'Datum',
            clearRecords: 'Smazat vše',
            clearConfirm: 'Opravdu chceš smazat všechny záznamy?',
            noRecords: 'Žádné záznamy',

            // Úspěchy
            achievementsTitle: '🏆 Úspěchy',
            achievementUnlock: 'Úspěch odemčen!',

            // Statistiky
            statsTitle: '📈 Statistiky hry',
            totalGames: 'Celkem her',
            totalChops: 'Celkem seknutí',
            totalTime: 'Celkový čas',
            bestCombo: 'Nejlepší kombo',
            avgScore: 'Průměrné skóre',
            unlockedAchievements: '🎖️ Úspěchy',
            unlockedSkins: '👕 Vzhledy',
            dailyAttempts: '📅 Denní výzvy',
            resetStats: 'Resetovat',
            resetConfirm: 'Opravdu chceš resetovat všechny statistiky? Toto nelze vrátit.',

            // Návod
            tutorialWelcome: 'Vítej v Dřevorubci!',
            tutorialWelcome1: 'Jsi statečný dřevorubec',
            tutorialWelcome2: 'Posekej co nejvíce stromů',
            tutorialWelcome3: 'Vyhýbej se nebezpečným větvím',
            tutorialControls: 'Ovládání',
            tutorialMoveLeft: 'Jdi doleva a sekni',
            tutorialMoveRight: 'Jdi doprava a sekni',
            tutorialTouchHint: 'Nebo klepni vlevo/vpravo na obrazovku',
            tutorialBranch: 'Vyhni se větvím!',
            tutorialBranchWarn: 'Zásah větví = Konec hry!',
            tutorialBranchHint: 'Dívej se, než sekneš',
            tutorialTime: 'Správa času',
            tutorialTimeHint1: 'Časová lišta neustále klesá',
            tutorialTimeHint2: 'Každé seknutí dává',
            tutorialTimeHint3: '+čas',
            tutorialTimeHint4: 'Čas vyprší = Konec hry',
            tutorialAdvanced: 'Pokročilé tipy',
            tutorialCombo: 'Kombo',
            tutorialComboHint: 'Sekej rychle pro vyšší skóre',
            tutorialDifficulty: 'Obtížnost',
            tutorialDifficultyHint: 'Čím vyšší skóre, tím těžší',
            tutorialAchievement: 'Úspěchy',
            tutorialAchievementHint: 'Odemkni 12 úspěchů',
            tutorialSkin: 'Vzhledy',
            tutorialSkinHint: 'Vysoké skóre odemyká nové vzhledy',
            skip: 'Přeskočit',
            prev: 'Předchozí',
            next: 'Další',
            finish: 'Dokončit',

            // Tipy pro dotyk
            tapLeft: '← Klepni vlevo',
            tapRight: 'Klepni vpravo →',

            // Nastavení hlasitosti
            volumeSettings: '🎵 Nastavení hlasitosti',
            sfxVolume: '🔊 Zvukové efekty',
            bgmVolume: '🎵 Hudba',
            vibration: '📳 Vibrace',

            // Vyskakovací okno
            skinUnlockPopup: 'Nový vzhled odemčen!',

            // Systém přehrávání
            replayBtn: '🎬 Přehrát',
            replayTitle: '🎬 Předchozí hra',
            replayScore: 'Skóre',
            replayCombo: 'Max kombo',
            replayChops: 'Seknutí',
            replayDuration: 'Trvání',
            replayStart: 'Spustit přehrávání',
            replayStop: 'Zastavit',
            replayNoData: 'Žádná data',
            replayPlaying: '🎬 Přehrávání...',
            replaySeconds: 's',

            // Sdílení
            shareBtn: '📤 Sdílet',
            shareTitle: 'Dřevorubec',
            shareScoreLabel: 'Skóre',
            shareComboLabel: 'Kombo',
            shareLevelLabel: 'Úroveň',
            shareHighScoreLabel: 'Rekord',
            shareDownloading: 'Generování obrázku...',
            shareSuccess: 'Obrázek uložen!',
            shareFailed: 'Sdílení selhalo, zkus to znovu',
            sharePanelTitle: '📤 Sdílet skóre',
            shareNativeBtn: '📱 Sdílet',
            shareDownloadBtn: '💾 Uložit obrázek',
            shareCopyBtn: '📋 Kopírovat text',
            shareCopySuccess: '✓ Zkopírováno do schránky!',

            // Nekonečný režim
            endlessBtn: '∞ Nekonečný režim',
            endlessTitle: '∞ Nekonečný režim',
            endlessDesc: 'Bez časového limitu, otestuj svou soustředěnost!',
            endlessBest: 'Nejlepší skóre',
            endlessTotal: 'Celkem her',
            endlessStart: 'Začít výzvu',
            endlessOver: '∞ Výzva dokončena',
            endlessNewRecord: '🎉 Nový rekord!',
            endlessHint: 'Jen se vyhýbej větvím, žádný časový tlak',

            // Odpočet
            countdownGo: 'JEDEM!',

            // Téma
            themeDarkTip: 'Přepnout na tmavý režim',
            themeLightTip: 'Přepnout na světlý režim',

            // Nastavení rychlosti
            speedBtn: '⚡ Rychlost',
            speedTitle: '⚡ Rychlost hry',
            speedSelectDesc: 'Vyber si preferovanou rychlost hry',
            speedSlow: '🐢 Pomalá',
            speedNormal: '🚶 Normální',
            speedFast: '🏃 Rychlá',
            speedSlowDesc: 'Pomalejší úbytek času, pro začátečníky',
            speedNormalDesc: 'Výchozí rychlost hry',
            speedFastDesc: 'Rychlejší úbytek času, výzva',
            speedCurrent: 'Aktuální',

            // Názvy vzhledů
            skinNames: {
                default: 'Dřevorubec',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Zlatá legenda',
                santa: 'Santa Claus',
                pumpkin: 'Dýňová hlava',
                pirate: 'Pirátský kapitán',
                snowman: 'Sněhulák',
                chinese_new_year: 'Bůh bohatství',
                valentine: 'Amor',
                easter_bunny: 'Velikonoční zajíček',
                summer_surfer: 'Letní surfař'
            },
            skinDescs: {
                default: 'Klasický dřevorubec v červené košili',
                ninja: 'Tajemný ninja v černém',
                robot: 'Mechanický dřevorubec z oceli',
                golden: 'Legendární zlatý dřevorubec',
                santa: 'Veselý dřevorubec s vánočním duchem',
                pumpkin: 'Strašidelný halloweenský sekáč',
                pirate: 'Statečný mořský dobrodruh',
                snowman: 'Dřevorubec ze světa ledu',
                chinese_new_year: 'Šťastný Nový rok! Hodně štěstí!',
                valentine: 'Bůh lásky šířící lásku',
                easter_bunny: 'Roztomilý zajíček s velikonočními vajíčky',
                summer_surfer: 'Skvělý plážový surfař'
            },

            // Názvy úspěchů
            achievementNames: {
                first_chop: 'První seknutí',
                score_10: 'Začátečník dřevorubec',
                score_50: 'Zkušený dřevorubec',
                score_100: 'Profesionální dřevorubec',
                score_200: 'Mistr dřevorubec',
                combo_5: 'Mini kombo',
                combo_10: 'Kombo expert',
                combo_20: 'Kombo král',
                level_5: 'Úroveň 5',
                level_8: 'Úroveň 8',
                level_max: 'Maximální úroveň',
                close_call: 'O fous'
            },
            achievementDescs: {
                first_chop: 'Sekni svůj první strom',
                score_10: 'Získej 10 bodů v jedné hře',
                score_50: 'Získej 50 bodů v jedné hře',
                score_100: 'Získej 100 bodů v jedné hře',
                score_200: 'Získej 200 bodů v jedné hře',
                combo_5: 'Dosáhni 5-komba',
                combo_10: 'Dosáhni 10-komba',
                combo_20: 'Dosáhni 20-komba',
                level_5: 'Dosáhni obtížnosti 5',
                level_8: 'Dosáhni obtížnosti 8',
                level_max: 'Dosáhni maximální obtížnosti 11',
                close_call: 'Sekni 20krát s časem pod 10%'
            }
        },

        // ============ 越南语 (Vietnamese) ============
        vi: {
            // Tiêu đề
            title: 'Thợ Đốn Cây',

            // Màn hình bắt đầu
            startTitle: 'Thợ Đốn Cây',
            startHint1: 'Nhấn ← → hoặc A/D để chặt',
            startHint2: 'Chạm trái/phải màn hình',
            startHint3: 'Tránh cành cây, vượt thời gian!',
            startHint4: 'Space/Enter Bắt đầu | ESC/P Tạm dừng',
            startBtn: 'Bắt đầu trò chơi',
            dailyBtn: '📅 Thử thách hàng ngày',
            skinBtn: '👕 Trang phục',
            leaderboardBtn: '📊 Bảng xếp hạng',
            statsBtn: '📈 Thống kê',
            tutorialBtn: '❓ Hướng dẫn',

            // Kết thúc trò chơi
            gameOver: 'Kết thúc',
            score: 'Điểm',
            maxCombo: 'Combo tối đa',
            highScore: 'Điểm cao',
            restartBtn: 'Chơi lại',
            achievementsBtn: '🏆 Thành tích',

            // Tạm dừng
            paused: '⏸️ Tạm dừng',
            pauseHint: 'Nhấn ESC hoặc P để tiếp tục',
            resumeBtn: 'Tiếp tục',

            // Thử thách hàng ngày
            dailyTitle: '📅 Thử thách hàng ngày',
            todayDate: 'Hôm nay',
            todayBest: 'Tốt nhất hôm nay',
            attempts: 'Số lần thử',
            dailyHint: 'Cùng màn chơi cho tất cả, phá kỷ lục!',
            startChallenge: 'Bắt đầu thử thách',
            back: 'Quay lại',
            challengeOver: '📅 Kết thúc thử thách',
            newRecord: '🎉 Kỷ lục mới!',
            todayHighScore: 'Tốt nhất hôm nay',
            todayAttempts: 'Thử thách hôm nay',
            times: 'lần',
            retry: 'Thử lại',
            backHome: 'Trang chủ',

            // Trang phục
            skinTitle: '👕 Trang phục',
            skinUnlocked: 'Đã mở khóa',
            skinLocked: '🔒',
            skinUnlockAt: 'điểm để mở khóa',

            // Bảng xếp hạng
            leaderboardTitle: '📊 Bảng xếp hạng',
            rank: 'Hạng',
            lbScore: 'Điểm',
            lbCombo: 'Combo',
            lbDate: 'Ngày',
            clearRecords: 'Xóa tất cả',
            clearConfirm: 'Bạn có chắc muốn xóa tất cả kỷ lục?',
            noRecords: 'Chưa có kỷ lục',

            // Thành tích
            achievementsTitle: '🏆 Thành tích',
            achievementUnlock: 'Đã mở khóa thành tích!',

            // Thống kê
            statsTitle: '📈 Thống kê trò chơi',
            totalGames: 'Tổng số ván',
            totalChops: 'Tổng số chặt',
            totalTime: 'Tổng thời gian',
            bestCombo: 'Combo cao nhất',
            avgScore: 'Điểm trung bình',
            unlockedAchievements: '🎖️ Thành tích',
            unlockedSkins: '👕 Trang phục',
            dailyAttempts: '📅 Thử thách hàng ngày',
            resetStats: 'Đặt lại',
            resetConfirm: 'Bạn có chắc muốn đặt lại tất cả thống kê? Không thể hoàn tác.',

            // Hướng dẫn
            tutorialWelcome: 'Chào mừng đến Thợ Đốn Cây!',
            tutorialWelcome1: 'Bạn là một thợ đốn cây dũng cảm',
            tutorialWelcome2: 'Chặt càng nhiều cây càng tốt',
            tutorialWelcome3: 'Tránh những cành cây nguy hiểm',
            tutorialControls: 'Điều khiển',
            tutorialMoveLeft: 'Di chuyển trái và chặt',
            tutorialMoveRight: 'Di chuyển phải và chặt',
            tutorialTouchHint: 'Hoặc chạm trái/phải màn hình',
            tutorialBranch: 'Tránh cành cây!',
            tutorialBranchWarn: 'Chạm cành = Kết thúc!',
            tutorialBranchHint: 'Nhìn trước khi chặt',
            tutorialTime: 'Quản lý thời gian',
            tutorialTimeHint1: 'Thanh thời gian giảm dần',
            tutorialTimeHint2: 'Mỗi lần chặt cho',
            tutorialTimeHint3: '+thời gian',
            tutorialTimeHint4: 'Hết giờ = Kết thúc',
            tutorialAdvanced: 'Mẹo nâng cao',
            tutorialCombo: 'Combo',
            tutorialComboHint: 'Chặt nhanh để điểm cao hơn',
            tutorialDifficulty: 'Độ khó',
            tutorialDifficultyHint: 'Càng chơi càng khó hơn',
            tutorialAchievement: 'Thành tích',
            tutorialAchievementHint: 'Mở khóa 12 thành tích',
            tutorialSkin: 'Trang phục',
            tutorialSkinHint: 'Điểm cao mở khóa trang phục mới',
            skip: 'Bỏ qua',
            prev: 'Trước',
            next: 'Tiếp',
            finish: 'Hoàn thành',

            // Gợi ý chạm
            tapLeft: '← Chạm trái',
            tapRight: 'Chạm phải →',

            // Cài đặt âm lượng
            volumeSettings: '🎵 Cài đặt âm thanh',
            sfxVolume: '🔊 Hiệu ứng',
            bgmVolume: '🎵 Nhạc nền',
            vibration: '📳 Rung',

            // Popup
            skinUnlockPopup: 'Đã mở khóa trang phục mới!',

            // Hệ thống phát lại
            replayBtn: '🎬 Phát lại',
            replayTitle: '🎬 Phát lại ván trước',
            replayScore: 'Điểm',
            replayCombo: 'Combo tối đa',
            replayChops: 'Số lần chặt',
            replayDuration: 'Thời gian',
            replayStart: 'Bắt đầu phát lại',
            replayStop: 'Dừng phát lại',
            replayNoData: 'Không có dữ liệu',
            replayPlaying: '🎬 Đang phát lại...',
            replaySeconds: 'giây',

            // Chia sẻ
            shareBtn: '📤 Chia sẻ',
            shareTitle: 'Thợ Đốn Cây',
            shareScoreLabel: 'Điểm',
            shareComboLabel: 'Combo',
            shareLevelLabel: 'Cấp độ',
            shareHighScoreLabel: 'Điểm cao',
            shareDownloading: 'Đang tạo hình ảnh...',
            shareSuccess: 'Đã lưu hình ảnh!',
            shareFailed: 'Chia sẻ thất bại, thử lại',
            sharePanelTitle: '📤 Chia sẻ điểm số',
            shareNativeBtn: '📱 Chia sẻ',
            shareDownloadBtn: '💾 Lưu hình ảnh',
            shareCopyBtn: '📋 Sao chép văn bản',
            shareCopySuccess: '✓ Đã sao chép!',

            // Chế độ vô tận
            endlessBtn: '∞ Chế độ vô tận',
            endlessTitle: '∞ Chế độ vô tận',
            endlessDesc: 'Không giới hạn thời gian, thử sự tập trung!',
            endlessBest: 'Điểm cao nhất',
            endlessTotal: 'Tổng số ván',
            endlessStart: 'Bắt đầu thử thách',
            endlessOver: '∞ Kết thúc thử thách',
            endlessNewRecord: '🎉 Kỷ lục mới!',
            endlessHint: 'Chỉ cần tránh cành, không áp lực thời gian',

            // Đếm ngược
            countdownGo: 'BẮT ĐẦU!',

            // Chủ đề
            themeDarkTip: 'Chuyển sang chế độ tối',
            themeLightTip: 'Chuyển sang chế độ sáng',

            // Cài đặt tốc độ
            speedBtn: '⚡ Tốc độ',
            speedTitle: '⚡ Tốc độ trò chơi',
            speedSelectDesc: 'Chọn tốc độ phù hợp với bạn',
            speedSlow: '🐢 Chậm',
            speedNormal: '🚶 Bình thường',
            speedFast: '🏃 Nhanh',
            speedSlowDesc: 'Thời gian giảm -40%, cho người mới',
            speedNormalDesc: 'Tốc độ trò chơi mặc định',
            speedFastDesc: 'Thời gian giảm +50%, thử thách',
            speedCurrent: 'Hiện tại',

            // Tên trang phục
            skinNames: {
                default: 'Thợ đốn cây',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Huyền thoại vàng',
                santa: 'Ông già Noel',
                pumpkin: 'Đầu bí ngô',
                pirate: 'Thuyền trưởng cướp biển',
                snowman: 'Người tuyết',
                chinese_new_year: 'Thần tài',
                valentine: 'Thần tình yêu',
                easter_bunny: 'Thỏ Phục sinh',
                summer_surfer: 'Lướt sóng mùa hè'
            },
            skinDescs: {
                default: 'Thợ đốn cây áo đỏ cổ điển',
                ninja: 'Ninja bí ẩn trong bóng tối',
                robot: 'Thợ đốn cây cơ khí thép',
                golden: 'Thợ đốn cây vàng huyền thoại',
                santa: 'Thợ đốn cây vui vẻ mùa Giáng sinh',
                pumpkin: 'Thợ đốn cây kinh dị Halloween',
                pirate: 'Nhà thám hiểm biển dũng cảm',
                snowman: 'Thợ đốn cây từ thế giới băng tuyết',
                chinese_new_year: 'Chúc mừng năm mới! Phát tài!',
                valentine: 'Thần tình yêu rải tình yêu',
                easter_bunny: 'Thỏ dễ thương với trứng Phục sinh',
                summer_surfer: 'Tay lướt sóng mát mẻ'
            },

            // Tên thành tích
            achievementNames: {
                first_chop: 'Lần chặt đầu tiên',
                score_10: 'Thợ mới',
                score_50: 'Thợ lành nghề',
                score_100: 'Thợ chuyên nghiệp',
                score_200: 'Bậc thầy đốn cây',
                combo_5: 'Combo nhỏ',
                combo_10: 'Chuyên gia combo',
                combo_20: 'Vua combo',
                level_5: 'Cấp độ 5',
                level_8: 'Cấp độ 8',
                level_max: 'Cấp độ tối đa',
                close_call: 'Thoát hiểm'
            },
            achievementDescs: {
                first_chop: 'Chặt cây đầu tiên của bạn',
                score_10: 'Đạt 10 điểm trong một ván',
                score_50: 'Đạt 50 điểm trong một ván',
                score_100: 'Đạt 100 điểm trong một ván',
                score_200: 'Đạt 200 điểm trong một ván',
                combo_5: 'Đạt combo 5',
                combo_10: 'Đạt combo 10',
                combo_20: 'Đạt combo 20',
                level_5: 'Đạt cấp độ khó 5',
                level_8: 'Đạt cấp độ khó 8',
                level_max: 'Đạt cấp độ khó tối đa 11',
                close_call: 'Chặt 20 lần khi thời gian dưới 10%'
            }
        },

        // ============ 匈牙利语 (Hungarian) ============
        hu: {
            // Cím
            title: 'Favágó',

            // Kezdőképernyő
            startTitle: 'Favágó',
            startHint1: 'Nyomd meg a ← → vagy A/D vágáshoz',
            startHint2: 'Érintsd a képernyő bal/jobb oldalát',
            startHint3: 'Kerüld el az ágakat, győzd le az időt!',
            startHint4: 'Space/Enter Indítás | ESC/P Szünet',
            startBtn: 'Játék indítása',
            dailyBtn: '📅 Napi kihívás',
            skinBtn: '👕 Skinek',
            leaderboardBtn: '📊 Ranglista',
            statsBtn: '📈 Statisztikák',
            tutorialBtn: '❓ Útmutató',

            // Játék vége
            gameOver: 'Játék vége',
            score: 'Pontszám',
            maxCombo: 'Max kombó',
            highScore: 'Rekord',
            restartBtn: 'Újra',
            achievementsBtn: '🏆 Eredmények',

            // Szünet
            paused: '⏸️ Szünet',
            pauseHint: 'Nyomd meg az ESC vagy P gombot a folytatáshoz',
            resumeBtn: 'Folytatás',

            // Napi kihívás
            dailyTitle: '📅 Napi kihívás',
            todayDate: 'Ma',
            todayBest: 'Mai legjobb',
            attempts: 'Próbálkozások',
            dailyHint: 'Ugyanaz a pálya mindenkinek, döntsd meg a rekordod!',
            startChallenge: 'Kihívás indítása',
            back: 'Vissza',
            challengeOver: '📅 Kihívás vége',
            newRecord: '🎉 Új rekord!',
            todayHighScore: 'Mai legjobb',
            todayAttempts: 'Mai próbálkozások',
            times: 'x',
            retry: 'Újra',
            backHome: 'Főmenü',

            // Skinek
            skinTitle: '👕 Skinek',
            skinUnlocked: 'Feloldva',
            skinLocked: '🔒',
            skinUnlockAt: 'pont a feloldáshoz',

            // Ranglista
            leaderboardTitle: '📊 Ranglista',
            rank: 'Helyezés',
            lbScore: 'Pont',
            lbCombo: 'Kombó',
            lbDate: 'Dátum',
            clearRecords: 'Törlés',
            clearConfirm: 'Biztosan törölni akarod az összes rekordot?',
            noRecords: 'Nincs rekord',

            // Eredmények
            achievementsTitle: '🏆 Eredmények',
            achievementUnlock: 'Eredmény feloldva!',

            // Statisztikák
            statsTitle: '📈 Játékstatisztikák',
            totalGames: 'Összes játék',
            totalChops: 'Összes vágás',
            totalTime: 'Összes idő',
            bestCombo: 'Legjobb kombó',
            avgScore: 'Átlagpont',
            unlockedAchievements: '🎖️ Eredmények',
            unlockedSkins: '👕 Skinek',
            dailyAttempts: '📅 Napi kihívások',
            resetStats: 'Visszaállítás',
            resetConfirm: 'Biztosan visszaállítod az összes statisztikát? Ez nem vonható vissza.',

            // Útmutató
            tutorialWelcome: 'Üdv a Favágóban!',
            tutorialWelcome1: 'Te egy bátor favágó vagy',
            tutorialWelcome2: 'Vágd ki a lehető legtöbb fát',
            tutorialWelcome3: 'Kerüld el a veszélyes ágakat',
            tutorialControls: 'Irányítás',
            tutorialMoveLeft: 'Balra mozogj és vágj',
            tutorialMoveRight: 'Jobbra mozogj és vágj',
            tutorialTouchHint: 'Vagy érintsd a képernyő bal/jobb oldalát',
            tutorialBranch: 'Kerüld az ágakat!',
            tutorialBranchWarn: 'Ágnak ütközés = Játék vége!',
            tutorialBranchHint: 'Nézz mielőtt vágsz',
            tutorialTime: 'Időgazdálkodás',
            tutorialTimeHint1: 'Az idősáv folyamatosan csökken',
            tutorialTimeHint2: 'Minden vágás ad',
            tutorialTimeHint3: '+időt',
            tutorialTimeHint4: 'Lejárt idő = Játék vége',
            tutorialAdvanced: 'Haladó tippek',
            tutorialCombo: 'Kombó',
            tutorialComboHint: 'Vágj gyorsan több pontért',
            tutorialDifficulty: 'Nehézség',
            tutorialDifficultyHint: 'Magasabb pont = nehezebb',
            tutorialAchievement: 'Eredmények',
            tutorialAchievementHint: '12 eredmény feloldása',
            tutorialSkin: 'Skinek',
            tutorialSkinHint: 'Magas pontszám új skineket old fel',
            skip: 'Kihagyás',
            prev: 'Előző',
            next: 'Következő',
            finish: 'Befejezés',

            // Érintési tippek
            tapLeft: '← Bal érintés',
            tapRight: 'Jobb érintés →',

            // Hangerő beállítások
            volumeSettings: '🎵 Hangerő beállítások',
            sfxVolume: '🔊 Hangeffektek',
            bgmVolume: '🎵 Zene',
            vibration: '📳 Rezgés',

            // Felugró ablak
            skinUnlockPopup: 'Új skin feloldva!',

            // Visszajátszás
            replayBtn: '🎬 Visszajátszás',
            replayTitle: '🎬 Előző játék',
            replayScore: 'Pontszám',
            replayCombo: 'Max kombó',
            replayChops: 'Vágások',
            replayDuration: 'Időtartam',
            replayStart: 'Visszajátszás indítása',
            replayStop: 'Leállítás',
            replayNoData: 'Nincs adat',
            replayPlaying: '🎬 Visszajátszás...',
            replaySeconds: 'mp',

            // Megosztás
            shareBtn: '📤 Megosztás',
            shareTitle: 'Favágó',
            shareScoreLabel: 'Pont',
            shareComboLabel: 'Kombó',
            shareLevelLabel: 'Szint',
            shareHighScoreLabel: 'Rekord',
            shareDownloading: 'Kép generálása...',
            shareSuccess: 'Kép elmentve!',
            shareFailed: 'Megosztás sikertelen, próbáld újra',
            sharePanelTitle: '📤 Eredmény megosztása',
            shareNativeBtn: '📱 Megosztás',
            shareDownloadBtn: '💾 Kép mentése',
            shareCopyBtn: '📋 Szöveg másolása',
            shareCopySuccess: '✓ Vágólapra másolva!',

            // Végtelen mód
            endlessBtn: '∞ Végtelen mód',
            endlessTitle: '∞ Végtelen mód',
            endlessDesc: 'Nincs időkorlát, teszteld a koncentrációdat!',
            endlessBest: 'Legjobb eredmény',
            endlessTotal: 'Összes játék',
            endlessStart: 'Kihívás indítása',
            endlessOver: '∞ Kihívás vége',
            endlessNewRecord: '🎉 Új rekord!',
            endlessHint: 'Csak kerüld az ágakat, nincs időnyomás',

            // Visszaszámlálás
            countdownGo: 'RAJT!',

            // Téma
            themeDarkTip: 'Váltás sötét módra',
            themeLightTip: 'Váltás világos módra',

            // Sebesség beállítások
            speedBtn: '⚡ Sebesség',
            speedTitle: '⚡ Játéksebesség',
            speedSelectDesc: 'Válaszd ki a neked megfelelő sebességet',
            speedSlow: '🐢 Lassú',
            speedNormal: '🚶 Normál',
            speedFast: '🏃 Gyors',
            speedSlowDesc: 'Időcsökkenés -40%, kezdőknek',
            speedNormalDesc: 'Alapértelmezett játéksebesség',
            speedFastDesc: 'Időcsökkenés +50%, kihívás',
            speedCurrent: 'Jelenlegi',

            // Skin nevek
            skinNames: {
                default: 'Favágó',
                ninja: 'Nindzsa',
                robot: 'Robot',
                golden: 'Arany legenda',
                santa: 'Mikulás',
                pumpkin: 'Tökfej',
                pirate: 'Kalózkapitány',
                snowman: 'Hóember',
                chinese_new_year: 'Gazdagság istene',
                valentine: 'Cupido',
                easter_bunny: 'Húsvéti nyuszi',
                summer_surfer: 'Nyári szörfös'
            },
            skinDescs: {
                default: 'Klasszikus piros inges favágó',
                ninja: 'Titokzatos fekete nindzsa',
                robot: 'Acél mechanikus favágó',
                golden: 'Legendás arany favágó',
                santa: 'Vidám karácsonyi favágó',
                pumpkin: 'Ijesztő halloweeni favágó',
                pirate: 'Bátor tengeri kalandor',
                snowman: 'Favágó a jég világából',
                chinese_new_year: 'Boldog új évet! Sok szerencsét!',
                valentine: 'A szerelem istene szeretetet szór',
                easter_bunny: 'Aranyos nyuszi húsvéti tojásokkal',
                summer_surfer: 'Menő strandon szörföző'
            },

            // Eredmény nevek
            achievementNames: {
                first_chop: 'Első vágás',
                score_10: 'Kezdő favágó',
                score_50: 'Gyakorlott favágó',
                score_100: 'Profi favágó',
                score_200: 'Favágó mester',
                combo_5: 'Mini kombó',
                combo_10: 'Kombó szakértő',
                combo_20: 'Kombó király',
                level_5: '5. szint',
                level_8: '8. szint',
                level_max: 'Maximum szint',
                close_call: 'Hajszálon múlt'
            },
            achievementDescs: {
                first_chop: 'Vágd ki az első fádat',
                score_10: 'Szerezz 10 pontot egy játékban',
                score_50: 'Szerezz 50 pontot egy játékban',
                score_100: 'Szerezz 100 pontot egy játékban',
                score_200: 'Szerezz 200 pontot egy játékban',
                combo_5: 'Érj el 5-ös kombót',
                combo_10: 'Érj el 10-es kombót',
                combo_20: 'Érj el 20-as kombót',
                level_5: 'Érj el 5-ös nehézségi szintet',
                level_8: 'Érj el 8-as nehézségi szintet',
                level_max: 'Érj el maximális 11-es nehézségi szintet',
                close_call: 'Vágj 20-szor 10% alatt lévő idővel'
            }
        },

        // ============ 泰语 (Thai) ============
        th: {
            // หัวข้อ
            title: 'คนตัดไม้',

            // หน้าจอเริ่มต้น
            startTitle: 'คนตัดไม้',
            startHint1: 'กด ← → หรือ A/D เพื่อตัด',
            startHint2: 'แตะซ้าย/ขวาของหน้าจอ',
            startHint3: 'หลบกิ่งไม้ เอาชนะเวลา!',
            startHint4: 'Space/Enter เริ่ม | ESC/P หยุด',
            startBtn: 'เริ่มเกม',
            dailyBtn: '📅 ท้าทายประจำวัน',
            skinBtn: '👕 สกิน',
            leaderboardBtn: '📊 อันดับ',
            statsBtn: '📈 สถิติ',
            tutorialBtn: '❓ สอนเล่น',

            // จบเกม
            gameOver: 'จบเกม',
            score: 'คะแนน',
            maxCombo: 'คอมโบสูงสุด',
            highScore: 'คะแนนสูงสุด',
            restartBtn: 'เล่นอีกครั้ง',
            achievementsBtn: '🏆 ความสำเร็จ',

            // หยุดชั่วคราว
            paused: '⏸️ หยุดชั่วคราว',
            pauseHint: 'กด ESC หรือ P เพื่อเล่นต่อ',
            resumeBtn: 'เล่นต่อ',

            // ท้าทายประจำวัน
            dailyTitle: '📅 ท้าทายประจำวัน',
            todayDate: 'วันนี้',
            todayBest: 'ดีที่สุดวันนี้',
            attempts: 'จำนวนครั้ง',
            dailyHint: 'ด่านเดียวกันสำหรับทุกคน ทำลายสถิติ!',
            startChallenge: 'เริ่มท้าทาย',
            back: 'กลับ',
            challengeOver: '📅 จบการท้าทาย',
            newRecord: '🎉 สถิติใหม่!',
            todayHighScore: 'ดีที่สุดวันนี้',
            todayAttempts: 'ท้าทายวันนี้',
            times: 'ครั้ง',
            retry: 'ลองอีกครั้ง',
            backHome: 'หน้าหลัก',

            // สกิน
            skinTitle: '👕 สกิน',
            skinUnlocked: 'ปลดล็อกแล้ว',
            skinLocked: '🔒',
            skinUnlockAt: 'คะแนนเพื่อปลดล็อก',

            // อันดับ
            leaderboardTitle: '📊 อันดับ',
            rank: 'อันดับ',
            lbScore: 'คะแนน',
            lbCombo: 'คอมโบ',
            lbDate: 'วันที่',
            clearRecords: 'ล้างข้อมูล',
            clearConfirm: 'คุณแน่ใจหรือไม่ที่จะล้างข้อมูลทั้งหมด?',
            noRecords: 'ยังไม่มีข้อมูล',

            // ความสำเร็จ
            achievementsTitle: '🏆 ความสำเร็จ',
            achievementUnlock: 'ปลดล็อกความสำเร็จ!',

            // สถิติ
            statsTitle: '📈 สถิติเกม',
            totalGames: 'เกมทั้งหมด',
            totalChops: 'ตัดทั้งหมด',
            totalTime: 'เวลาทั้งหมด',
            bestCombo: 'คอมโบสูงสุด',
            avgScore: 'คะแนนเฉลี่ย',
            unlockedAchievements: '🎖️ ความสำเร็จ',
            unlockedSkins: '👕 สกิน',
            dailyAttempts: '📅 ท้าทายประจำวัน',
            resetStats: 'รีเซ็ต',
            resetConfirm: 'คุณแน่ใจหรือไม่ที่จะรีเซ็ตข้อมูลทั้งหมด? ไม่สามารถยกเลิกได้',

            // สอนเล่น
            tutorialWelcome: 'ยินดีต้อนรับสู่คนตัดไม้!',
            tutorialWelcome1: 'คุณคือคนตัดไม้ผู้กล้าหาญ',
            tutorialWelcome2: 'ตัดต้นไม้ให้ได้มากที่สุด',
            tutorialWelcome3: 'หลบกิ่งไม้อันตราย',
            tutorialControls: 'การควบคุม',
            tutorialMoveLeft: 'เคลื่อนซ้ายและตัด',
            tutorialMoveRight: 'เคลื่อนขวาและตัด',
            tutorialTouchHint: 'หรือแตะซ้าย/ขวาหน้าจอ',
            tutorialBranch: 'หลบกิ่งไม้!',
            tutorialBranchWarn: 'โดนกิ่ง = จบเกม!',
            tutorialBranchHint: 'มองก่อนตัด',
            tutorialTime: 'จัดการเวลา',
            tutorialTimeHint1: 'แถบเวลาจะลดลงเรื่อยๆ',
            tutorialTimeHint2: 'ตัดแต่ละครั้งจะได้',
            tutorialTimeHint3: '+เวลา',
            tutorialTimeHint4: 'หมดเวลา = จบเกม',
            tutorialAdvanced: 'เทคนิคขั้นสูง',
            tutorialCombo: 'คอมโบ',
            tutorialComboHint: 'ตัดเร็วเพื่อคะแนนสูง',
            tutorialDifficulty: 'ความยาก',
            tutorialDifficultyHint: 'ยิ่งเล่นยิ่งยาก',
            tutorialAchievement: 'ความสำเร็จ',
            tutorialAchievementHint: 'ปลดล็อก 12 ความสำเร็จ',
            tutorialSkin: 'สกิน',
            tutorialSkinHint: 'คะแนนสูงปลดล็อกสกินใหม่',
            skip: 'ข้าม',
            prev: 'ก่อนหน้า',
            next: 'ถัดไป',
            finish: 'เสร็จสิ้น',

            // พื้นที่แตะ
            tapLeft: '← แตะซ้าย',
            tapRight: 'แตะขวา →',

            // ตั้งค่าเสียง
            volumeSettings: '🎵 ตั้งค่าเสียง',
            sfxVolume: '🔊 เสียงเอฟเฟกต์',
            bgmVolume: '🎵 เพลงพื้นหลัง',
            vibration: '📳 สั่น',

            // ป๊อปอัพ
            skinUnlockPopup: 'ปลดล็อกสกินใหม่!',

            // ระบบเล่นซ้ำ
            replayBtn: '🎬 เล่นซ้ำ',
            replayTitle: '🎬 เล่นซ้ำรอบที่แล้ว',
            replayScore: 'คะแนน',
            replayCombo: 'คอมโบสูงสุด',
            replayChops: 'จำนวนตัด',
            replayDuration: 'เวลา',
            replayStart: 'เริ่มเล่นซ้ำ',
            replayStop: 'หยุดเล่นซ้ำ',
            replayNoData: 'ไม่มีข้อมูล',
            replayPlaying: '🎬 กำลังเล่นซ้ำ...',
            replaySeconds: 'วินาที',

            // แชร์
            shareBtn: '📤 แชร์',
            shareTitle: 'คนตัดไม้',
            shareScoreLabel: 'คะแนน',
            shareComboLabel: 'คอมโบ',
            shareLevelLabel: 'ระดับ',
            shareHighScoreLabel: 'คะแนนสูงสุด',
            shareDownloading: 'กำลังสร้างรูปภาพ...',
            shareSuccess: 'บันทึกรูปแล้ว!',
            shareFailed: 'แชร์ล้มเหลว ลองอีกครั้ง',
            sharePanelTitle: '📤 แชร์คะแนน',
            shareNativeBtn: '📱 แชร์',
            shareDownloadBtn: '💾 บันทึกรูป',
            shareCopyBtn: '📋 คัดลอกข้อความ',
            shareCopySuccess: '✓ คัดลอกแล้ว!',

            // โหมดไม่สิ้นสุด
            endlessBtn: '∞ โหมดไม่สิ้นสุด',
            endlessTitle: '∞ โหมดไม่สิ้นสุด',
            endlessDesc: 'ไม่จำกัดเวลา ทดสอบสมาธิของคุณ!',
            endlessBest: 'คะแนนสูงสุด',
            endlessTotal: 'เกมทั้งหมด',
            endlessStart: 'เริ่มท้าทาย',
            endlessOver: '∞ จบการท้าทาย',
            endlessNewRecord: '🎉 สถิติใหม่!',
            endlessHint: 'แค่หลบกิ่ง ไม่มีแรงกดดันเรื่องเวลา',

            // นับถอยหลัง
            countdownGo: 'เริ่ม!',

            // ธีม
            themeDarkTip: 'เปลี่ยนเป็นโหมดมืด',
            themeLightTip: 'เปลี่ยนเป็นโหมดสว่าง',

            // ตั้งค่าความเร็ว
            speedBtn: '⚡ ความเร็ว',
            speedTitle: '⚡ ความเร็วเกม',
            speedSelectDesc: 'เลือกความเร็วที่เหมาะกับคุณ',
            speedSlow: '🐢 ช้า',
            speedNormal: '🚶 ปกติ',
            speedFast: '🏃 เร็ว',
            speedSlowDesc: 'เวลาลด -40% สำหรับมือใหม่',
            speedNormalDesc: 'ความเร็วเกมปกติ',
            speedFastDesc: 'เวลาลด +50% ท้าทาย',
            speedCurrent: 'ปัจจุบัน',

            // ชื่อสกิน
            skinNames: {
                default: 'คนตัดไม้',
                ninja: 'นินจา',
                robot: 'หุ่นยนต์',
                golden: 'ตำนานทอง',
                santa: 'ซานตาคลอส',
                pumpkin: 'หัวฟักทอง',
                pirate: 'กัปตันโจรสลัด',
                snowman: 'มนุษย์หิมะ',
                chinese_new_year: 'เทพเจ้าแห่งความมั่งคั่ง',
                valentine: 'คิวปิด',
                easter_bunny: 'กระต่ายอีสเตอร์',
                summer_surfer: 'นักเซิร์ฟฤดูร้อน'
            },
            skinDescs: {
                default: 'คนตัดไม้เสื้อแดงคลาสสิก',
                ninja: 'นินจาลึกลับในชุดดำ',
                robot: 'คนตัดไม้เครื่องจักรเหล็ก',
                golden: 'คนตัดไม้ทองคำตำนาน',
                santa: 'คนตัดไม้คริสต์มาสสุขสันต์',
                pumpkin: 'คนตัดไม้ฮาโลวีนน่ากลัว',
                pirate: 'นักผจญภัยทะเลผู้กล้าหาญ',
                snowman: 'คนตัดไม้จากโลกน้ำแข็ง',
                chinese_new_year: 'สุขสันต์วันปีใหม่! โชคดี!',
                valentine: 'เทพแห่งความรักกระจายความรัก',
                easter_bunny: 'กระต่ายน่ารักกับไข่อีสเตอร์',
                summer_surfer: 'นักเซิร์ฟเท่ๆ บนชายหาด'
            },

            // ชื่อความสำเร็จ
            achievementNames: {
                first_chop: 'ตัดครั้งแรก',
                score_10: 'มือใหม่',
                score_50: 'ชำนาญ',
                score_100: 'มืออาชีพ',
                score_200: 'ปรมาจารย์',
                combo_5: 'มินิคอมโบ',
                combo_10: 'ผู้เชี่ยวชาญคอมโบ',
                combo_20: 'ราชาคอมโบ',
                level_5: 'ระดับ 5',
                level_8: 'ระดับ 8',
                level_max: 'ระดับสูงสุด',
                close_call: 'หวุดหวิด'
            },
            achievementDescs: {
                first_chop: 'ตัดต้นไม้ต้นแรกของคุณ',
                score_10: 'ทำ 10 คะแนนในเกมเดียว',
                score_50: 'ทำ 50 คะแนนในเกมเดียว',
                score_100: 'ทำ 100 คะแนนในเกมเดียว',
                score_200: 'ทำ 200 คะแนนในเกมเดียว',
                combo_5: 'ทำ 5 คอมโบ',
                combo_10: 'ทำ 10 คอมโบ',
                combo_20: 'ทำ 20 คอมโบ',
                level_5: 'ถึงระดับความยาก 5',
                level_8: 'ถึงระดับความยาก 8',
                level_max: 'ถึงระดับความยากสูงสุด 11',
                close_call: 'ตัด 20 ครั้งเมื่อเวลาต่ำกว่า 10%'
            }
        },

        // ============ 印尼语 (Indonesian) ============
        id: {
            // Judul
            title: 'Penebang Kayu',

            // Layar mulai
            startTitle: 'Penebang Kayu',
            startHint1: 'Tekan ← → atau A/D untuk menebang',
            startHint2: 'Ketuk kiri/kanan layar',
            startHint3: 'Hindari dahan, kalahkan waktu!',
            startHint4: 'Space/Enter Mulai | ESC/P Jeda',
            startBtn: 'Mulai Game',
            dailyBtn: '📅 Tantangan Harian',
            skinBtn: '👕 Skin',
            leaderboardBtn: '📊 Peringkat',
            statsBtn: '📈 Statistik',
            tutorialBtn: '❓ Tutorial',

            // Game selesai
            gameOver: 'Game Selesai',
            score: 'Skor',
            maxCombo: 'Kombo Maks',
            highScore: 'Skor Tertinggi',
            restartBtn: 'Main Lagi',
            achievementsBtn: '🏆 Prestasi',

            // Jeda
            paused: '⏸️ Jeda',
            pauseHint: 'Tekan ESC atau P untuk melanjutkan',
            resumeBtn: 'Lanjutkan',

            // Tantangan harian
            dailyTitle: '📅 Tantangan Harian',
            todayDate: 'Hari ini',
            todayBest: 'Terbaik hari ini',
            attempts: 'Percobaan',
            dailyHint: 'Level sama untuk semua, pecahkan rekor!',
            startChallenge: 'Mulai Tantangan',
            back: 'Kembali',
            challengeOver: '📅 Tantangan Selesai',
            newRecord: '🎉 Rekor Baru!',
            todayHighScore: 'Terbaik hari ini',
            todayAttempts: 'Percobaan hari ini',
            times: 'kali',
            retry: 'Coba lagi',
            backHome: 'Menu Utama',

            // Skin
            skinTitle: '👕 Skin',
            skinUnlocked: 'Terbuka',
            skinLocked: '🔒',
            skinUnlockAt: 'skor untuk membuka',

            // Peringkat
            leaderboardTitle: '📊 Peringkat',
            rank: 'Peringkat',
            lbScore: 'Skor',
            lbCombo: 'Kombo',
            lbDate: 'Tanggal',
            clearRecords: 'Hapus',
            clearConfirm: 'Yakin ingin menghapus semua catatan?',
            noRecords: 'Belum ada catatan',

            // Prestasi
            achievementsTitle: '🏆 Prestasi',
            achievementUnlock: 'Prestasi terbuka!',

            // Statistik
            statsTitle: '📈 Statistik Game',
            totalGames: 'Total game',
            totalChops: 'Total tebangan',
            totalTime: 'Total waktu',
            bestCombo: 'Kombo terbaik',
            avgScore: 'Skor rata-rata',
            unlockedAchievements: '🎖️ Prestasi',
            unlockedSkins: '👕 Skin',
            dailyAttempts: '📅 Tantangan harian',
            resetStats: 'Reset',
            resetConfirm: 'Yakin ingin mereset semua statistik? Tidak dapat dibatalkan.',

            // Tutorial
            tutorialWelcome: 'Selamat datang di Penebang Kayu!',
            tutorialWelcome1: 'Kamu adalah penebang kayu pemberani',
            tutorialWelcome2: 'Tebang sebanyak mungkin pohon',
            tutorialWelcome3: 'Hindari dahan berbahaya',
            tutorialControls: 'Kontrol',
            tutorialMoveLeft: 'Gerak kiri dan tebang',
            tutorialMoveRight: 'Gerak kanan dan tebang',
            tutorialTouchHint: 'Atau ketuk kiri/kanan layar',
            tutorialBranch: 'Hindari dahan!',
            tutorialBranchWarn: 'Terkena dahan = Game selesai!',
            tutorialBranchHint: 'Lihat sebelum menebang',
            tutorialTime: 'Manajemen Waktu',
            tutorialTimeHint1: 'Bar waktu terus berkurang',
            tutorialTimeHint2: 'Setiap tebangan memberi',
            tutorialTimeHint3: '+waktu',
            tutorialTimeHint4: 'Waktu habis = Game selesai',
            tutorialAdvanced: 'Tips Lanjutan',
            tutorialCombo: 'Kombo',
            tutorialComboHint: 'Tebang cepat untuk skor tinggi',
            tutorialDifficulty: 'Kesulitan',
            tutorialDifficultyHint: 'Semakin tinggi skor, semakin sulit',
            tutorialAchievement: 'Prestasi',
            tutorialAchievementHint: 'Buka 12 prestasi',
            tutorialSkin: 'Skin',
            tutorialSkinHint: 'Skor tinggi membuka skin baru',
            skip: 'Lewati',
            prev: 'Sebelumnya',
            next: 'Berikutnya',
            finish: 'Selesai',

            // Area ketuk
            tapLeft: '← Ketuk Kiri',
            tapRight: 'Ketuk Kanan →',

            // Pengaturan volume
            volumeSettings: '🎵 Pengaturan Volume',
            sfxVolume: '🔊 Efek Suara',
            bgmVolume: '🎵 Musik Latar',
            vibration: '📳 Getar',

            // Popup
            skinUnlockPopup: 'Skin baru terbuka!',

            // Sistem replay
            replayBtn: '🎬 Putar Ulang',
            replayTitle: '🎬 Game Terakhir',
            replayScore: 'Skor',
            replayCombo: 'Kombo Maks',
            replayChops: 'Tebangan',
            replayDuration: 'Durasi',
            replayStart: 'Mulai Putar Ulang',
            replayStop: 'Berhenti',
            replayNoData: 'Tidak ada data',
            replayPlaying: '🎬 Memutar ulang...',
            replaySeconds: 'detik',

            // Berbagi
            shareBtn: '📤 Bagikan',
            shareTitle: 'Penebang Kayu',
            shareScoreLabel: 'Skor',
            shareComboLabel: 'Kombo',
            shareLevelLabel: 'Level',
            shareHighScoreLabel: 'Skor Tertinggi',
            shareDownloading: 'Membuat gambar...',
            shareSuccess: 'Gambar tersimpan!',
            shareFailed: 'Gagal berbagi, coba lagi',
            sharePanelTitle: '📤 Bagikan Skor',
            shareNativeBtn: '📱 Bagikan',
            shareDownloadBtn: '💾 Simpan Gambar',
            shareCopyBtn: '📋 Salin Teks',
            shareCopySuccess: '✓ Tersalin!',

            // Mode tanpa batas
            endlessBtn: '∞ Mode Tanpa Batas',
            endlessTitle: '∞ Mode Tanpa Batas',
            endlessDesc: 'Tanpa batas waktu, uji konsentrasimu!',
            endlessBest: 'Skor Tertinggi',
            endlessTotal: 'Total Game',
            endlessStart: 'Mulai Tantangan',
            endlessOver: '∞ Tantangan Selesai',
            endlessNewRecord: '🎉 Rekor Baru!',
            endlessHint: 'Cukup hindari dahan, tanpa tekanan waktu',

            // Hitung mundur
            countdownGo: 'MULAI!',

            // Tema
            themeDarkTip: 'Beralih ke mode gelap',
            themeLightTip: 'Beralih ke mode terang',

            // Pengaturan kecepatan
            speedBtn: '⚡ Kecepatan',
            speedTitle: '⚡ Kecepatan Game',
            speedSelectDesc: 'Pilih kecepatan yang sesuai untukmu',
            speedSlow: '🐢 Lambat',
            speedNormal: '🚶 Normal',
            speedFast: '🏃 Cepat',
            speedSlowDesc: 'Pengurangan waktu -40%, untuk pemula',
            speedNormalDesc: 'Kecepatan game standar',
            speedFastDesc: 'Pengurangan waktu +50%, tantangan',
            speedCurrent: 'Saat ini',

            // Nama skin
            skinNames: {
                default: 'Penebang Kayu',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Legenda Emas',
                santa: 'Sinterklas',
                pumpkin: 'Kepala Labu',
                pirate: 'Kapten Bajak Laut',
                snowman: 'Manusia Salju',
                chinese_new_year: 'Dewa Kekayaan',
                valentine: 'Cupid',
                easter_bunny: 'Kelinci Paskah',
                summer_surfer: 'Peselancar Musim Panas'
            },
            skinDescs: {
                default: 'Penebang kayu klasik berbaju merah',
                ninja: 'Ninja misterius berbaju hitam',
                robot: 'Penebang kayu mekanik baja',
                golden: 'Penebang kayu emas legendaris',
                santa: 'Penebang kayu Natal yang ceria',
                pumpkin: 'Penebang kayu Halloween yang menyeramkan',
                pirate: 'Petualang laut yang berani',
                snowman: 'Penebang kayu dari dunia es',
                chinese_new_year: 'Selamat Tahun Baru! Semoga beruntung!',
                valentine: 'Dewa cinta menyebarkan kasih',
                easter_bunny: 'Kelinci lucu dengan telur Paskah',
                summer_surfer: 'Peselancar keren di pantai'
            },

            // Nama prestasi
            achievementNames: {
                first_chop: 'Tebangan Pertama',
                score_10: 'Pemula',
                score_50: 'Terampil',
                score_100: 'Profesional',
                score_200: 'Master',
                combo_5: 'Mini Kombo',
                combo_10: 'Ahli Kombo',
                combo_20: 'Raja Kombo',
                level_5: 'Level 5',
                level_8: 'Level 8',
                level_max: 'Level Maksimal',
                close_call: 'Hampir Saja'
            },
            achievementDescs: {
                first_chop: 'Tebang pohon pertamamu',
                score_10: 'Raih 10 skor dalam satu game',
                score_50: 'Raih 50 skor dalam satu game',
                score_100: 'Raih 100 skor dalam satu game',
                score_200: 'Raih 200 skor dalam satu game',
                combo_5: 'Raih 5 kombo',
                combo_10: 'Raih 10 kombo',
                combo_20: 'Raih 20 kombo',
                level_5: 'Mencapai level kesulitan 5',
                level_8: 'Mencapai level kesulitan 8',
                level_max: 'Mencapai level kesulitan maksimal 11',
                close_call: 'Tebang 20 kali saat waktu di bawah 10%'
            }
        },

        // 马来语 (Malay)
        ms: {
            // Tajuk
            title: 'Penebang Pokok',

            // Skrin mula
            startTitle: 'Penebang Pokok',
            startHint1: 'Tekan ← → atau A/D untuk menebang',
            startHint2: 'Ketik kiri/kanan skrin',
            startHint3: 'Elak dahan, kalahkan masa!',
            startHint4: 'Space/Enter Mula | ESC/P Jeda',
            startBtn: 'Mula Permainan',
            dailyBtn: '📅 Cabaran Harian',
            skinBtn: '👕 Kulit',
            leaderboardBtn: '📊 Papan Kedudukan',
            statsBtn: '📈 Statistik',
            tutorialBtn: '❓ Tutorial',

            // Permainan tamat
            gameOver: 'Tamat Permainan',
            score: 'Skor',
            maxCombo: 'Kombo Maks',
            highScore: 'Skor Tertinggi',
            restartBtn: 'Main Lagi',
            achievementsBtn: '🏆 Pencapaian',

            // Jeda
            paused: '⏸️ Jeda',
            pauseHint: 'Tekan ESC atau P untuk teruskan',
            resumeBtn: 'Teruskan',

            // Cabaran harian
            dailyTitle: '📅 Cabaran Harian',
            todayDate: 'Hari ini',
            todayBest: 'Terbaik hari ini',
            attempts: 'Percubaan',
            dailyHint: 'Level sama untuk semua, pecahkan rekod!',
            startChallenge: 'Mula Cabaran',
            back: 'Kembali',
            challengeOver: '📅 Cabaran Tamat',
            newRecord: '🎉 Rekod Baru!',
            todayHighScore: 'Terbaik hari ini',
            todayAttempts: 'Percubaan hari ini',
            times: 'kali',
            retry: 'Cuba lagi',
            backHome: 'Menu Utama',

            // Kulit
            skinTitle: '👕 Kulit',
            skinUnlocked: 'Dibuka',
            skinLocked: '🔒',
            skinUnlockAt: 'skor untuk buka',

            // Papan kedudukan
            leaderboardTitle: '📊 Papan Kedudukan',
            rank: 'Kedudukan',
            lbScore: 'Skor',
            lbCombo: 'Kombo',
            lbDate: 'Tarikh',
            clearRecords: 'Padam',
            clearConfirm: 'Pasti mahu padam semua rekod?',
            noRecords: 'Tiada rekod',

            // Pencapaian
            achievementsTitle: '🏆 Pencapaian',
            achievementUnlock: 'Pencapaian dibuka!',

            // Statistik
            statsTitle: '📈 Statistik Permainan',
            totalGames: 'Jumlah permainan',
            totalChops: 'Jumlah tebangan',
            totalTime: 'Jumlah masa',
            bestCombo: 'Kombo terbaik',
            avgScore: 'Skor purata',
            unlockedAchievements: '🎖️ Pencapaian',
            unlockedSkins: '👕 Kulit',
            dailyAttempts: '📅 Cabaran harian',
            resetStats: 'Set semula',
            resetConfirm: 'Pasti mahu set semula semua statistik? Tidak boleh batal.',

            // Tutorial
            tutorialWelcome: 'Selamat datang ke Penebang Pokok!',
            tutorialWelcome1: 'Anda adalah penebang pokok yang berani',
            tutorialWelcome2: 'Tebang sebanyak mungkin pokok',
            tutorialWelcome3: 'Elak dahan berbahaya',
            tutorialControls: 'Kawalan',
            tutorialMoveLeft: 'Gerak kiri dan tebang',
            tutorialMoveRight: 'Gerak kanan dan tebang',
            tutorialTouchHint: 'Atau ketik kiri/kanan skrin',
            tutorialBranch: 'Elak dahan!',
            tutorialBranchWarn: 'Kena dahan = Tamat permainan!',
            tutorialBranchHint: 'Lihat sebelum menebang',
            tutorialTime: 'Pengurusan Masa',
            tutorialTimeHint1: 'Bar masa terus berkurang',
            tutorialTimeHint2: 'Setiap tebangan memberi',
            tutorialTimeHint3: '+masa',
            tutorialTimeHint4: 'Masa habis = Tamat permainan',
            tutorialAdvanced: 'Petua Lanjutan',
            tutorialCombo: 'Kombo',
            tutorialComboHint: 'Tebang cepat untuk skor tinggi',
            tutorialDifficulty: 'Kesukaran',
            tutorialDifficultyHint: 'Semakin tinggi skor, semakin sukar',
            tutorialAchievement: 'Pencapaian',
            tutorialAchievementHint: 'Buka 12 pencapaian',
            tutorialSkin: 'Kulit',
            tutorialSkinHint: 'Skor tinggi membuka kulit baru',
            skip: 'Langkau',
            prev: 'Sebelumnya',
            next: 'Seterusnya',
            finish: 'Selesai',

            // Kawasan ketik
            tapLeft: '← Ketik Kiri',
            tapRight: 'Ketik Kanan →',

            // Tetapan volum
            volumeSettings: '🎵 Tetapan Volum',
            sfxVolume: '🔊 Kesan Bunyi',
            bgmVolume: '🎵 Muzik Latar',
            vibration: '📳 Getaran',

            // Popup
            skinUnlockPopup: 'Kulit baru dibuka!',

            // Sistem main semula
            replayBtn: '🎬 Main Semula',
            replayTitle: '🎬 Permainan Lepas',
            replayScore: 'Skor',
            replayCombo: 'Kombo Maks',
            replayChops: 'Tebangan',
            replayDuration: 'Tempoh',
            replayStart: 'Mula Main Semula',
            replayStop: 'Berhenti',
            replayNoData: 'Tiada data',
            replayPlaying: '🎬 Sedang main semula...',
            replaySeconds: 'saat',

            // Kongsi
            shareBtn: '📤 Kongsi',
            shareTitle: 'Penebang Pokok',
            shareScoreLabel: 'Skor',
            shareComboLabel: 'Kombo',
            shareLevelLabel: 'Tahap',
            shareHighScoreLabel: 'Skor Tertinggi',
            shareDownloading: 'Mencipta gambar...',
            shareSuccess: 'Gambar disimpan!',
            shareFailed: 'Gagal kongsi, cuba lagi',
            sharePanelTitle: '📤 Kongsi Skor',
            shareNativeBtn: '📱 Kongsi',
            shareDownloadBtn: '💾 Simpan Gambar',
            shareCopyBtn: '📋 Salin Teks',
            shareCopySuccess: '✓ Disalin!',

            // Mod tanpa had
            endlessBtn: '∞ Mod Tanpa Had',
            endlessTitle: '∞ Mod Tanpa Had',
            endlessDesc: 'Tanpa had masa, uji fokus anda!',
            endlessBest: 'Skor Tertinggi',
            endlessTotal: 'Jumlah Permainan',
            endlessStart: 'Mula Cabaran',
            endlessOver: '∞ Cabaran Tamat',
            endlessNewRecord: '🎉 Rekod Baru!',
            endlessHint: 'Cuma elak dahan, tanpa tekanan masa',

            // Kira mundur
            countdownGo: 'MULA!',

            // Tema
            themeDarkTip: 'Tukar ke mod gelap',
            themeLightTip: 'Tukar ke mod cerah',

            // Tetapan kelajuan
            speedBtn: '⚡ Kelajuan',
            speedTitle: '⚡ Kelajuan Permainan',
            speedSelectDesc: 'Pilih kelajuan yang sesuai untuk anda',
            speedSlow: '🐢 Perlahan',
            speedNormal: '🚶 Normal',
            speedFast: '🏃 Laju',
            speedSlowDesc: 'Pengurangan masa -40%, untuk pemula',
            speedNormalDesc: 'Kelajuan permainan standard',
            speedFastDesc: 'Pengurangan masa +50%, cabaran',
            speedCurrent: 'Semasa',

            // Nama kulit
            skinNames: {
                default: 'Penebang Pokok',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Legenda Emas',
                santa: 'Santa Claus',
                pumpkin: 'Kepala Labu',
                pirate: 'Kapten Lanun',
                snowman: 'Orang Salji',
                chinese_new_year: 'Dewa Kekayaan',
                valentine: 'Cupid',
                easter_bunny: 'Arnab Easter',
                summer_surfer: 'Peluncur Musim Panas'
            },
            skinDescs: {
                default: 'Penebang pokok klasik berbaju merah',
                ninja: 'Ninja misteri berbaju hitam',
                robot: 'Penebang pokok mekanikal besi',
                golden: 'Penebang pokok emas legenda',
                santa: 'Penebang pokok Krismas yang ceria',
                pumpkin: 'Penebang pokok Halloween yang menyeramkan',
                pirate: 'Pengembara laut yang berani',
                snowman: 'Penebang pokok dari dunia ais',
                chinese_new_year: 'Selamat Tahun Baru! Semoga bertuah!',
                valentine: 'Dewa cinta menyebarkan kasih',
                easter_bunny: 'Arnab comel dengan telur Easter',
                summer_surfer: 'Peluncur bergaya di pantai'
            },

            // Nama pencapaian
            achievementNames: {
                first_chop: 'Tebangan Pertama',
                score_10: 'Pemula',
                score_50: 'Mahir',
                score_100: 'Profesional',
                score_200: 'Master',
                combo_5: 'Mini Kombo',
                combo_10: 'Pakar Kombo',
                combo_20: 'Raja Kombo',
                level_5: 'Tahap 5',
                level_8: 'Tahap 8',
                level_max: 'Tahap Maksimum',
                close_call: 'Hampir Saja'
            },
            achievementDescs: {
                first_chop: 'Tebang pokok pertama anda',
                score_10: 'Raih 10 skor dalam satu permainan',
                score_50: 'Raih 50 skor dalam satu permainan',
                score_100: 'Raih 100 skor dalam satu permainan',
                score_200: 'Raih 200 skor dalam satu permainan',
                combo_5: 'Raih 5 kombo',
                combo_10: 'Raih 10 kombo',
                combo_20: 'Raih 20 kombo',
                level_5: 'Mencapai tahap kesukaran 5',
                level_8: 'Mencapai tahap kesukaran 8',
                level_max: 'Mencapai tahap kesukaran maksimum 11',
                close_call: 'Tebang 20 kali apabila masa di bawah 10%'
            }
        },

        // 乌克兰语
        uk: {
            // Заголовок
            title: 'Лісоруб',

            // Стартовий екран
            startTitle: 'Лісоруб',
            startHint1: 'Натисніть ← → або A/D для рубки',
            startHint2: 'Торкніться лівої/правої частини екрана',
            startHint3: 'Уникайте гілок, перемагайте час!',
            startHint4: 'Пробіл/Enter Старт | ESC/P Пауза',
            startBtn: 'Почати гру',
            dailyBtn: '📅 Щоденний виклик',
            skinBtn: '👕 Скіни',
            leaderboardBtn: '📊 Таблиця лідерів',
            statsBtn: '📈 Статистика',
            tutorialBtn: '❓ Навчання',

            // Кінець гри
            gameOver: 'Гра закінчена',
            score: 'Рахунок',
            maxCombo: 'Макс. комбо',
            highScore: 'Рекорд',
            restartBtn: 'Грати знову',
            achievementsBtn: '🏆 Досягнення',

            // Пауза
            paused: '⏸️ Пауза',
            pauseHint: 'Натисніть ESC або P для продовження',
            resumeBtn: 'Продовжити',

            // Щоденний виклик
            dailyTitle: '📅 Щоденний виклик',
            todayDate: 'Сьогодні',
            todayBest: 'Кращий сьогодні',
            attempts: 'Спроби',
            dailyHint: 'Однаковий рівень для всіх, побийте рекорд!',
            startChallenge: 'Почати виклик',
            back: 'Назад',
            challengeOver: '📅 Виклик завершено',
            newRecord: '🎉 Новий рекорд!',
            todayHighScore: 'Кращий сьогодні',
            todayAttempts: 'Спроби сьогодні',
            times: 'разів',
            retry: 'Повторити',
            backHome: 'Головне меню',

            // Скіни
            skinTitle: '👕 Скіни',
            skinUnlocked: 'Розблоковано',
            skinLocked: '🔒',
            skinUnlockAt: 'очок для розблокування',

            // Таблиця лідерів
            leaderboardTitle: '📊 Таблиця лідерів',
            rank: 'Місце',
            lbScore: 'Рахунок',
            lbCombo: 'Комбо',
            lbDate: 'Дата',
            clearRecords: 'Очистити',
            clearConfirm: 'Дійсно видалити всі записи?',
            noRecords: 'Немає записів',

            // Досягнення
            achievementsTitle: '🏆 Досягнення',
            achievementUnlock: 'Досягнення розблоковано!',

            // Статистика
            statsTitle: '📈 Статистика гри',
            totalGames: 'Всього ігор',
            totalChops: 'Всього ударів',
            totalTime: 'Загальний час',
            bestCombo: 'Найкраще комбо',
            avgScore: 'Середній рахунок',
            unlockedAchievements: '🎖️ Досягнення',
            unlockedSkins: '👕 Скіни',
            dailyAttempts: '📅 Щоденні виклики',
            resetStats: 'Скинути',
            resetConfirm: 'Дійсно скинути всю статистику? Це не можна скасувати.',

            // Навчання
            tutorialWelcome: 'Ласкаво просимо до Лісоруба!',
            tutorialWelcome1: 'Ви - відважний лісоруб',
            tutorialWelcome2: 'Рубайте якомога більше дерев',
            tutorialWelcome3: 'Уникайте небезпечних гілок',
            tutorialControls: 'Керування',
            tutorialMoveLeft: 'Рух вліво та удар',
            tutorialMoveRight: 'Рух вправо та удар',
            tutorialTouchHint: 'Або торкніться лівої/правої частини екрана',
            tutorialBranch: 'Уникайте гілок!',
            tutorialBranchWarn: 'Зачепили гілку = Гра закінчена!',
            tutorialBranchHint: 'Дивіться перед тим як рубати',
            tutorialTime: 'Управління часом',
            tutorialTimeHint1: 'Шкала часу постійно зменшується',
            tutorialTimeHint2: 'Кожен удар дає',
            tutorialTimeHint3: '+час',
            tutorialTimeHint4: 'Час вичерпано = Гра закінчена',
            tutorialAdvanced: 'Просунуті поради',
            tutorialCombo: 'Комбо',
            tutorialComboHint: 'Швидко рубайте для високого рахунку',
            tutorialDifficulty: 'Складність',
            tutorialDifficultyHint: 'Чим вищий рахунок, тим складніше',
            tutorialAchievement: 'Досягнення',
            tutorialAchievementHint: 'Розблокуйте 12 досягнень',
            tutorialSkin: 'Скіни',
            tutorialSkinHint: 'Високий рахунок розблоковує нові скіни',
            skip: 'Пропустити',
            prev: 'Назад',
            next: 'Далі',
            finish: 'Готово',

            // Зона дотику
            tapLeft: '← Торкнутися зліва',
            tapRight: 'Торкнутися справа →',

            // Налаштування гучності
            volumeSettings: '🎵 Налаштування звуку',
            sfxVolume: '🔊 Звукові ефекти',
            bgmVolume: '🎵 Фонова музика',
            vibration: '📳 Вібрація',

            // Спливаюче вікно
            skinUnlockPopup: 'Новий скін розблоковано!',

            // Система повтору
            replayBtn: '🎬 Повтор',
            replayTitle: '🎬 Остання гра',
            replayScore: 'Рахунок',
            replayCombo: 'Макс. комбо',
            replayChops: 'Ударів',
            replayDuration: 'Тривалість',
            replayStart: 'Почати повтор',
            replayStop: 'Зупинити',
            replayNoData: 'Немає даних',
            replayPlaying: '🎬 Відтворення...',
            replaySeconds: 'сек.',

            // Поділитися
            shareBtn: '📤 Поділитися',
            shareTitle: 'Лісоруб',
            shareScoreLabel: 'Рахунок',
            shareComboLabel: 'Комбо',
            shareLevelLabel: 'Рівень',
            shareHighScoreLabel: 'Рекорд',
            shareDownloading: 'Створення зображення...',
            shareSuccess: 'Зображення збережено!',
            shareFailed: 'Помилка поширення, спробуйте ще',
            sharePanelTitle: '📤 Поділитися рахунком',
            shareNativeBtn: '📱 Поділитися',
            shareDownloadBtn: '💾 Зберегти зображення',
            shareCopyBtn: '📋 Копіювати текст',
            shareCopySuccess: '✓ Скопійовано!',

            // Безкінечний режим
            endlessBtn: '∞ Безкінечний режим',
            endlessTitle: '∞ Безкінечний режим',
            endlessDesc: 'Без обмеження часу, випробуй свою зосередженість!',
            endlessBest: 'Рекорд',
            endlessTotal: 'Всього ігор',
            endlessStart: 'Почати виклик',
            endlessOver: '∞ Виклик завершено',
            endlessNewRecord: '🎉 Новий рекорд!',
            endlessHint: 'Тільки уникай гілок, без тиску часу',

            // Зворотний відлік
            countdownGo: 'СТАРТ!',

            // Тема
            themeDarkTip: 'Перемкнути на темну тему',
            themeLightTip: 'Перемкнути на світлу тему',

            // Налаштування швидкості
            speedBtn: '⚡ Швидкість',
            speedTitle: '⚡ Швидкість гри',
            speedSelectDesc: 'Виберіть зручну для вас швидкість',
            speedSlow: '🐢 Повільно',
            speedNormal: '🚶 Нормально',
            speedFast: '🏃 Швидко',
            speedSlowDesc: 'Зменшення часу -40%, для новачків',
            speedNormalDesc: 'Стандартна швидкість гри',
            speedFastDesc: 'Зменшення часу +50%, виклик',
            speedCurrent: 'Поточний',

            // Назви скінів
            skinNames: {
                default: 'Лісоруб',
                ninja: 'Ніндзя',
                robot: 'Робот',
                golden: 'Золота легенда',
                santa: 'Санта Клаус',
                pumpkin: 'Гарбузова голова',
                pirate: 'Капітан піратів',
                snowman: 'Сніговик',
                chinese_new_year: 'Бог багатства',
                valentine: 'Купідон',
                easter_bunny: 'Великодній кролик',
                summer_surfer: 'Літній серфер'
            },
            skinDescs: {
                default: 'Класичний лісоруб у червоному',
                ninja: 'Таємничий ніндзя в чорному',
                robot: 'Механічний сталевий лісоруб',
                golden: 'Легендарний золотий лісоруб',
                santa: 'Веселий різдвяний лісоруб',
                pumpkin: 'Моторошний хелловінський лісоруб',
                pirate: 'Відважний морський мандрівник',
                snowman: 'Лісоруб з крижаного світу',
                chinese_new_year: 'З Новим роком! Бажаю удачі!',
                valentine: 'Бог кохання поширює романтику',
                easter_bunny: 'Милий кролик з великодніми яйцями',
                summer_surfer: 'Стильний серфер на пляжі'
            },

            // Назви досягнень
            achievementNames: {
                first_chop: 'Перший удар',
                score_10: 'Початківець',
                score_50: 'Досвідчений',
                score_100: 'Професіонал',
                score_200: 'Майстер',
                combo_5: 'Міні комбо',
                combo_10: 'Експерт комбо',
                combo_20: 'Король комбо',
                level_5: 'Рівень 5',
                level_8: 'Рівень 8',
                level_max: 'Максимальний рівень',
                close_call: 'На волосині'
            },
            achievementDescs: {
                first_chop: 'Зрубайте своє перше дерево',
                score_10: 'Наберіть 10 очок за одну гру',
                score_50: 'Наберіть 50 очок за одну гру',
                score_100: 'Наберіть 100 очок за одну гру',
                score_200: 'Наберіть 200 очок за одну гру',
                combo_5: 'Досягніть 5 комбо',
                combo_10: 'Досягніть 10 комбо',
                combo_20: 'Досягніть 20 комбо',
                level_5: 'Досягніть рівня складності 5',
                level_8: 'Досягніть рівня складності 8',
                level_max: 'Досягніть максимального рівня складності 11',
                close_call: 'Зрубайте 20 разів коли часу менше 10%'
            }
        },
        ro: {
            // Titlu
            title: 'Tăietor de Lemne',

            // Ecran de start
            startTitle: 'Tăietor de Lemne',
            startHint1: 'Apăsați ← → sau A/D pentru a tăia',
            startHint2: 'Atingeți stânga/dreapta ecranului',
            startHint3: 'Evitați ramurile, învingeți timpul!',
            startHint4: 'Spațiu/Enter Start | ESC/P Pauză',
            startBtn: 'Începe jocul',
            dailyBtn: '📅 Provocare zilnică',
            skinBtn: '👕 Skinuri',
            leaderboardBtn: '📊 Clasament',
            statsBtn: '📈 Statistici',
            tutorialBtn: '❓ Tutorial',

            // Sfârșit de joc
            gameOver: 'Joc terminat',
            score: 'Scor',
            maxCombo: 'Combo max.',
            highScore: 'Scor record',
            restartBtn: 'Joacă din nou',
            achievementsBtn: '🏆 Realizări',

            // Pauză
            paused: '⏸️ Pauză',
            pauseHint: 'Apăsați ESC sau P pentru a continua',
            resumeBtn: 'Continuă',

            // Provocare zilnică
            dailyTitle: '📅 Provocare zilnică',
            todayDate: 'Astăzi',
            todayBest: 'Cel mai bun azi',
            attempts: 'Încercări',
            dailyHint: 'Același nivel pentru toți, depășește recordul!',
            startChallenge: 'Începe provocarea',
            back: 'Înapoi',
            challengeOver: '📅 Provocare terminată',
            newRecord: '🎉 Nou record!',
            todayHighScore: 'Cel mai bun azi',
            todayAttempts: 'Încercări azi',
            times: 'ori',
            retry: 'Reîncearcă',
            backHome: 'Meniu principal',

            // Skinuri
            skinTitle: '👕 Skinuri',
            skinUnlocked: 'Deblocat',
            skinLocked: '🔒',
            skinUnlockAt: 'puncte pentru deblocare',

            // Clasament
            leaderboardTitle: '📊 Clasament',
            rank: 'Loc',
            lbScore: 'Scor',
            lbCombo: 'Combo',
            lbDate: 'Data',
            clearRecords: 'Șterge',
            clearConfirm: 'Ștergeți toate înregistrările?',
            noRecords: 'Nu există înregistrări',

            // Realizări
            achievementsTitle: '🏆 Realizări',
            achievementUnlock: 'Realizare deblocată!',

            // Statistici
            statsTitle: '📈 Statistici joc',
            totalGames: 'Total jocuri',
            totalChops: 'Total tăieri',
            totalTime: 'Timp total',
            bestCombo: 'Cel mai bun combo',
            avgScore: 'Scor mediu',
            unlockedAchievements: '🎖️ Realizări',
            unlockedSkins: '👕 Skinuri',
            dailyAttempts: '📅 Provocări zilnice',
            resetStats: 'Resetează',
            resetConfirm: 'Resetați toate statisticile? Această acțiune nu poate fi anulată.',

            // Tutorial
            tutorialWelcome: 'Bun venit la Tăietor de Lemne!',
            tutorialWelcome1: 'Ești un tăietor de lemne curajos',
            tutorialWelcome2: 'Taie cât mai multe lemne poți',
            tutorialWelcome3: 'Evită ramurile periculoase',
            tutorialControls: 'Controale',
            tutorialMoveLeft: 'Mișcare stânga și tăiere',
            tutorialMoveRight: 'Mișcare dreapta și tăiere',
            tutorialTouchHint: 'Sau atingeți stânga/dreapta ecranului',
            tutorialBranch: 'Evitați ramurile!',
            tutorialBranchWarn: 'Ai atins ramura = Joc terminat!',
            tutorialBranchHint: 'Privește înainte de a tăia',
            tutorialTime: 'Managementul timpului',
            tutorialTimeHint1: 'Bara de timp scade constant',
            tutorialTimeHint2: 'Fiecare tăiere adaugă',
            tutorialTimeHint3: '+timp',
            tutorialTimeHint4: 'Timpul expirat = Joc terminat',
            tutorialAdvanced: 'Sfaturi avansate',
            tutorialCombo: 'Combo',
            tutorialComboHint: 'Taie rapid pentru scor mare',
            tutorialDifficulty: 'Dificultate',
            tutorialDifficultyHint: 'Cu cât scorul e mai mare, cu atât e mai greu',
            tutorialAchievement: 'Realizări',
            tutorialAchievementHint: 'Deblochează 12 realizări',
            tutorialSkin: 'Skinuri',
            tutorialSkinHint: 'Scor mare deblochează skinuri noi',
            skip: 'Sari',
            prev: 'Înapoi',
            next: 'Înainte',
            finish: 'Gata',

            // Zona de atingere
            tapLeft: '← Atingeți stânga',
            tapRight: 'Atingeți dreapta →',

            // Setări volum
            volumeSettings: '🎵 Setări sunet',
            sfxVolume: '🔊 Efecte sonore',
            bgmVolume: '🎵 Muzică de fundal',
            vibration: '📳 Vibrație',

            // Popup
            skinUnlockPopup: 'Skin nou deblocat!',

            // Sistem replay
            replayBtn: '🎬 Replay',
            replayTitle: '🎬 Ultimul joc',
            replayScore: 'Scor',
            replayCombo: 'Combo max.',
            replayChops: 'Tăieri',
            replayDuration: 'Durată',
            replayStart: 'Începe replay',
            replayStop: 'Oprește',
            replayNoData: 'Nu există date',
            replayPlaying: '🎬 Redare...',
            replaySeconds: 'sec.',

            // Partajare
            shareBtn: '📤 Partajează',
            shareTitle: 'Tăietor de Lemne',
            shareScoreLabel: 'Scor',
            shareComboLabel: 'Combo',
            shareLevelLabel: 'Nivel',
            shareHighScoreLabel: 'Record',
            shareDownloading: 'Generare imagine...',
            shareSuccess: 'Imagine salvată!',
            shareFailed: 'Partajare eșuată, încearcă din nou',
            sharePanelTitle: '📤 Partajează scorul',
            shareNativeBtn: '📱 Partajează',
            shareDownloadBtn: '💾 Salvează imagine',
            shareCopyBtn: '📋 Copiază text',
            shareCopySuccess: '✓ Copiat!',

            // Mod nesfârșit
            endlessBtn: '∞ Mod nesfârșit',
            endlessTitle: '∞ Mod nesfârșit',
            endlessDesc: 'Fără limită de timp, testează-ți concentrarea!',
            endlessBest: 'Record',
            endlessTotal: 'Total jocuri',
            endlessStart: 'Începe provocarea',
            endlessOver: '∞ Provocare terminată',
            endlessNewRecord: '🎉 Nou record!',
            endlessHint: 'Doar evită ramurile, fără presiunea timpului',

            // Numărătoare inversă
            countdownGo: 'START!',

            // Temă
            themeDarkTip: 'Comută la modul întunecat',
            themeLightTip: 'Comută la modul luminos',

            // Setări viteză
            speedBtn: '⚡ Viteză',
            speedTitle: '⚡ Viteza jocului',
            speedSelectDesc: 'Alege viteza potrivită pentru tine',
            speedSlow: '🐢 Lent',
            speedNormal: '🚶 Normal',
            speedFast: '🏃 Rapid',
            speedSlowDesc: 'Scădere timp -40%, pentru începători',
            speedNormalDesc: 'Viteza standard a jocului',
            speedFastDesc: 'Scădere timp +50%, provocare',
            speedCurrent: 'Curent',

            // Nume skinuri
            skinNames: {
                default: 'Tăietor de Lemne',
                ninja: 'Ninja',
                robot: 'Robot',
                golden: 'Legendă de Aur',
                santa: 'Moș Crăciun',
                pumpkin: 'Cap de Dovleac',
                pirate: 'Căpitan Pirat',
                snowman: 'Om de Zăpadă',
                chinese_new_year: 'Zeul Bogăției',
                valentine: 'Cupidon',
                easter_bunny: 'Iepuraș de Paște',
                summer_surfer: 'Surfer de Vară'
            },
            skinDescs: {
                default: 'Clasic tăietor de lemne în roșu',
                ninja: 'Ninja misterios în negru',
                robot: 'Tăietor de lemne mecanic de oțel',
                golden: 'Legendarul tăietor de aur',
                santa: 'Tăietor vesel de Crăciun',
                pumpkin: 'Tăietor înfricoșător de Halloween',
                pirate: 'Aventurier curajos al mărilor',
                snowman: 'Tăietor din lumea înghețată',
                chinese_new_year: 'An Nou Fericit! Mult noroc!',
                valentine: 'Zeul iubirii răspândește romantism',
                easter_bunny: 'Iepuraș drăguț cu ouă de Paște',
                summer_surfer: 'Surfer cool pe plajă'
            },

            // Nume realizări
            achievementNames: {
                first_chop: 'Prima tăiere',
                score_10: 'Începător',
                score_50: 'Experimentat',
                score_100: 'Profesionist',
                score_200: 'Maestru',
                combo_5: 'Mini combo',
                combo_10: 'Expert combo',
                combo_20: 'Rege combo',
                level_5: 'Nivel 5',
                level_8: 'Nivel 8',
                level_max: 'Nivel maxim',
                close_call: 'La limită'
            },
            achievementDescs: {
                first_chop: 'Taie primul tău lemn',
                score_10: 'Obține 10 puncte într-un joc',
                score_50: 'Obține 50 puncte într-un joc',
                score_100: 'Obține 100 puncte într-un joc',
                score_200: 'Obține 200 puncte într-un joc',
                combo_5: 'Atinge combo 5',
                combo_10: 'Atinge combo 10',
                combo_20: 'Atinge combo 20',
                level_5: 'Atinge nivelul de dificultate 5',
                level_8: 'Atinge nivelul de dificultate 8',
                level_max: 'Atinge nivelul maxim de dificultate 11',
                close_call: 'Taie de 20 ori când timpul e sub 10%'
            }
        },
        ar: {
            // العنوان
            title: 'الحطّاب',

            // شاشة البداية
            startTitle: 'الحطّاب',
            startHint1: 'اضغط ← → أو A/D للقطع',
            startHint2: 'أو انقر على يسار/يمين الشاشة',
            startHint3: 'تجنب الفروع، تغلب على الوقت!',
            startHint4: 'مسافة/إدخال للبدء | ESC/P للإيقاف',
            startBtn: 'ابدأ اللعبة',
            dailyBtn: '📅 التحدي اليومي',
            skinBtn: '👕 الأشكال',
            leaderboardBtn: '📊 المتصدرون',
            statsBtn: '📈 الإحصائيات',
            tutorialBtn: '❓ الدليل',

            // انتهاء اللعبة
            gameOver: 'انتهت اللعبة',
            score: 'النتيجة',
            maxCombo: 'أعلى كومبو',
            highScore: 'أعلى نتيجة',
            restartBtn: 'حاول مجدداً',
            achievementsBtn: '🏆 الإنجازات',

            // إيقاف مؤقت
            paused: '⏸️ إيقاف مؤقت',
            pauseHint: 'اضغط ESC أو P للمتابعة',
            resumeBtn: 'متابعة',

            // التحدي اليومي
            dailyTitle: '📅 التحدي اليومي',
            todayDate: 'اليوم',
            todayBest: 'أفضل نتيجة اليوم',
            attempts: 'المحاولات',
            dailyHint: 'نفس المستوى للجميع، حطم رقمك القياسي!',
            startChallenge: 'ابدأ التحدي',
            back: 'رجوع',
            challengeOver: '📅 انتهى التحدي',
            newRecord: '🎉 رقم قياسي جديد!',
            todayHighScore: 'أفضل نتيجة اليوم',
            todayAttempts: 'محاولات اليوم',
            times: 'مرة',
            retry: 'حاول مجدداً',
            backHome: 'الرئيسية',

            // الأشكال
            skinTitle: '👕 الأشكال',
            skinUnlocked: 'مفتوح',
            skinLocked: '🔒',
            skinUnlockAt: 'نقطة للفتح',

            // المتصدرون
            leaderboardTitle: '📊 المتصدرون',
            rank: 'الترتيب',
            lbScore: 'النتيجة',
            lbCombo: 'كومبو',
            lbDate: 'التاريخ',
            clearRecords: 'مسح الكل',
            clearConfirm: 'هل أنت متأكد من مسح جميع السجلات؟',
            noRecords: 'لا توجد سجلات',

            // الإنجازات
            achievementsTitle: '🏆 الإنجازات',
            achievementUnlock: 'تم فتح إنجاز!',

            // الإحصائيات
            statsTitle: '📈 إحصائيات اللعبة',
            totalGames: 'إجمالي الألعاب',
            totalChops: 'إجمالي القطعات',
            totalTime: 'إجمالي الوقت',
            bestCombo: 'أفضل كومبو',
            avgScore: 'متوسط النتيجة',
            unlockedAchievements: '🎖️ الإنجازات',
            unlockedSkins: '👕 الأشكال',
            dailyAttempts: '📅 التحديات اليومية',
            resetStats: 'إعادة تعيين',
            resetConfirm: 'هل أنت متأكد من إعادة تعيين جميع الإحصائيات؟ لا يمكن التراجع.',

            // الدليل
            tutorialWelcome: 'مرحباً بك في الحطّاب!',
            tutorialWelcome1: 'أنت حطّاب شجاع',
            tutorialWelcome2: 'اقطع أكبر عدد من الأشجار',
            tutorialWelcome3: 'مع تجنب الفروع الخطيرة',
            tutorialControls: 'التحكم',
            tutorialMoveLeft: 'تحرك يساراً واقطع',
            tutorialMoveRight: 'تحرك يميناً واقطع',
            tutorialTouchHint: 'أو انقر على يسار/يمين الشاشة',
            tutorialBranch: 'تجنب الفروع!',
            tutorialBranchWarn: 'الاصطدام بالفرع = نهاية اللعبة!',
            tutorialBranchHint: 'انظر قبل أن تقطع',
            tutorialTime: 'إدارة الوقت',
            tutorialTimeHint1: 'شريط الوقت يتناقص باستمرار',
            tutorialTimeHint2: 'كل قطعة تعطيك',
            tutorialTimeHint3: '+وقت',
            tutorialTimeHint4: 'انتهاء الوقت = نهاية اللعبة',
            tutorialAdvanced: 'نصائح متقدمة',
            tutorialCombo: 'كومبو',
            tutorialComboHint: 'اقطع بسرعة لنتائج أعلى',
            tutorialDifficulty: 'الصعوبة',
            tutorialDifficultyHint: 'تزداد الصعوبة مع النتيجة',
            tutorialAchievement: 'الإنجازات',
            tutorialAchievementHint: 'افتح 12 إنجازاً',
            tutorialSkin: 'الأشكال',
            tutorialSkinHint: 'النتائج العالية تفتح أشكالاً جديدة',
            skip: 'تخطي',
            prev: 'السابق',
            next: 'التالي',
            finish: 'إنهاء',

            // منطقة اللمس
            tapLeft: '← انقر يساراً',
            tapRight: 'انقر يميناً →',

            // إعدادات الصوت
            volumeSettings: '🎵 إعدادات الصوت',
            sfxVolume: '🔊 المؤثرات',
            bgmVolume: '🎵 الموسيقى',
            vibration: '📳 الاهتزاز',

            // النوافذ المنبثقة
            skinUnlockPopup: 'تم فتح شكل جديد!',

            // نظام الإعادة
            replayBtn: '🎬 إعادة',
            replayTitle: '🎬 إعادة آخر لعبة',
            replayScore: 'النتيجة',
            replayCombo: 'أعلى كومبو',
            replayChops: 'القطعات',
            replayDuration: 'المدة',
            replayStart: 'بدء الإعادة',
            replayStop: 'إيقاف',
            replayNoData: 'لا توجد بيانات',
            replayPlaying: '🎬 جاري الإعادة...',
            replaySeconds: 'ث',

            // المشاركة
            shareBtn: '📤 مشاركة',
            shareTitle: 'الحطّاب',
            shareScoreLabel: 'النتيجة',
            shareComboLabel: 'كومبو',
            shareLevelLabel: 'المستوى',
            shareHighScoreLabel: 'أعلى نتيجة',
            shareDownloading: 'جاري إنشاء الصورة...',
            shareSuccess: 'تم حفظ الصورة!',
            shareFailed: 'فشلت المشاركة، حاول مجدداً',
            sharePanelTitle: '📤 مشاركة النتيجة',
            shareNativeBtn: '📱 مشاركة',
            shareDownloadBtn: '💾 حفظ الصورة',
            shareCopyBtn: '📋 نسخ النص',
            shareCopySuccess: '✓ تم النسخ!',

            // الوضع اللانهائي
            endlessBtn: '∞ الوضع اللانهائي',
            endlessTitle: '∞ الوضع اللانهائي',
            endlessDesc: 'بدون حد زمني، اختبر تركيزك!',
            endlessBest: 'أفضل نتيجة',
            endlessTotal: 'إجمالي الألعاب',
            endlessStart: 'ابدأ التحدي',
            endlessOver: '∞ انتهى التحدي',
            endlessNewRecord: '🎉 رقم قياسي جديد!',
            endlessHint: 'تجنب الفروع فقط، بدون ضغط الوقت',

            // العد التنازلي
            countdownGo: 'انطلق!',

            // السمة
            themeDarkTip: 'التبديل إلى الوضع الداكن',
            themeLightTip: 'التبديل إلى الوضع الفاتح',

            // خيارات السرعة
            speedBtn: '⚡ السرعة',
            speedTitle: '⚡ سرعة اللعبة',
            speedSelectDesc: 'اختر السرعة المناسبة لك',
            speedSlow: '🐢 بطيء',
            speedNormal: '🚶 عادي',
            speedFast: '🏃 سريع',
            speedSlowDesc: 'تناقص الوقت -40%، للمبتدئين',
            speedNormalDesc: 'السرعة الافتراضية للعبة',
            speedFastDesc: 'تناقص الوقت +50%، وضع التحدي',
            speedCurrent: 'الحالي',

            // أسماء الأشكال
            skinNames: {
                default: 'الحطّاب',
                ninja: 'النينجا',
                robot: 'الروبوت',
                golden: 'الأسطورة الذهبية',
                santa: 'بابا نويل',
                pumpkin: 'رأس اليقطين',
                pirate: 'قبطان القراصنة',
                snowman: 'رجل الثلج',
                chinese_new_year: 'إله الثروة',
                valentine: 'كيوبيد',
                easter_bunny: 'أرنب عيد الفصح',
                summer_surfer: 'راكب الأمواج'
            },
            skinDescs: {
                default: 'الحطّاب الكلاسيكي بالقميص الأحمر',
                ninja: 'النينجا الغامض بالأسود',
                robot: 'الحطّاب الآلي الفولاذي',
                golden: 'الحطّاب الذهبي الأسطوري',
                santa: 'حطّاب الأعياد المرح',
                pumpkin: 'حطّاب هالوين المخيف',
                pirate: 'مغامر البحار الشجاع',
                snowman: 'حطّاب العالم الجليدي',
                chinese_new_year: 'سنة جديدة سعيدة! حظ موفق!',
                valentine: 'إله الحب ينشر المحبة',
                easter_bunny: 'أرنب البيض الملون اللطيف',
                summer_surfer: 'راكب أمواج الشاطئ الرائع'
            },

            // أسماء الإنجازات
            achievementNames: {
                first_chop: 'القطعة الأولى',
                score_10: 'حطّاب مبتدئ',
                score_50: 'حطّاب ماهر',
                score_100: 'حطّاب محترف',
                score_200: 'حطّاب خبير',
                combo_5: 'كومبو صغير',
                combo_10: 'محترف الكومبو',
                combo_20: 'ملك الكومبو',
                level_5: 'المستوى 5',
                level_8: 'المستوى 8',
                level_max: 'المستوى الأقصى',
                close_call: 'نجاة بأعجوبة'
            },
            achievementDescs: {
                first_chop: 'اقطع شجرتك الأولى',
                score_10: 'احصل على 10 نقاط في لعبة واحدة',
                score_50: 'احصل على 50 نقطة في لعبة واحدة',
                score_100: 'احصل على 100 نقطة في لعبة واحدة',
                score_200: 'احصل على 200 نقطة في لعبة واحدة',
                combo_5: 'حقق 5 كومبو',
                combo_10: 'حقق 10 كومبو',
                combo_20: 'حقق 20 كومبو',
                level_5: 'الوصول للمستوى 5',
                level_8: 'الوصول للمستوى 8',
                level_max: 'الوصول للمستوى الأقصى 11',
                close_call: 'اقطع 20 مرة والوقت أقل من 10%'
            }
        },
        he: {
            // כותרת
            title: 'חוֹטֵב עֵצִים',

            // מסך פתיחה
            startTitle: 'חוֹטֵב עֵצִים',
            startHint1: 'לחץ ← → או A/D לחטוב',
            startHint2: 'או לחץ על שמאל/ימין המסך',
            startHint3: 'התחמק מענפים, נצח את הזמן!',
            startHint4: 'רווח/Enter להתחלה | ESC/P להשהיה',
            startBtn: 'התחל משחק',
            dailyBtn: '📅 אתגר יומי',
            skinBtn: '👕 סקינים',
            leaderboardBtn: '📊 טבלת הישגים',
            statsBtn: '📈 סטטיסטיקות',
            tutorialBtn: '❓ מדריך',

            // סיום משחק
            gameOver: 'המשחק נגמר',
            score: 'ניקוד',
            maxCombo: 'קומבו מקסימלי',
            highScore: 'שיא',
            restartBtn: 'נסה שוב',
            achievementsBtn: '🏆 הישגים',

            // השהיה
            paused: '⏸️ מושהה',
            pauseHint: 'לחץ ESC או P להמשך',
            resumeBtn: 'המשך',

            // אתגר יומי
            dailyTitle: '📅 אתגר יומי',
            todayDate: 'תאריך היום',
            todayBest: 'השיא של היום',
            attempts: 'ניסיונות',
            dailyHint: 'אותה רמה לכולם, שבור את השיא!',
            startChallenge: 'התחל אתגר',
            back: 'חזרה',
            challengeOver: '📅 האתגר הסתיים',
            newRecord: '🎉 שיא חדש!',
            todayHighScore: 'שיא היום',
            todayAttempts: 'ניסיונות היום',
            times: 'פעמים',
            retry: 'נסה שוב',
            backHome: 'חזרה לדף הבית',

            // סקינים
            skinTitle: '👕 סקינים',
            skinUnlocked: 'פתוח',
            skinLocked: '🔒',
            skinUnlockAt: 'נק׳ לפתיחה',

            // טבלת הישגים
            leaderboardTitle: '📊 טבלת הישגים',
            rank: 'דירוג',
            lbScore: 'ניקוד',
            lbCombo: 'קומבו',
            lbDate: 'תאריך',
            clearRecords: 'נקה הכל',
            clearConfirm: 'בטוח למחוק את כל הרשומות?',
            noRecords: 'אין רשומות',

            // הישגים
            achievementsTitle: '🏆 הישגים',
            achievementUnlock: 'הישג נפתח!',

            // סטטיסטיקות
            statsTitle: '📈 סטטיסטיקות',
            totalGames: 'סה״כ משחקים',
            totalChops: 'סה״כ חטיבות',
            totalTime: 'סה״כ זמן',
            bestCombo: 'קומבו הכי טוב',
            avgScore: 'ניקוד ממוצע',
            unlockedAchievements: '🎖️ הישגים',
            unlockedSkins: '👕 סקינים',
            dailyAttempts: '📅 אתגרים יומיים',
            resetStats: 'אפס נתונים',
            resetConfirm: 'בטוח לאפס את כל הנתונים? לא ניתן לבטל.',

            // מדריך
            tutorialWelcome: 'ברוכים הבאים לחוטב עצים!',
            tutorialWelcome1: 'אתה חוטב עצים אמיץ',
            tutorialWelcome2: 'חטוב כמה שיותר עצים',
            tutorialWelcome3: 'והתחמק מענפים מסוכנים',
            tutorialControls: 'שליטה',
            tutorialMoveLeft: 'זוז שמאלה וחטוב',
            tutorialMoveRight: 'זוז ימינה וחטוב',
            tutorialTouchHint: 'או לחץ על שמאל/ימין המסך',
            tutorialBranch: 'התחמק מענפים!',
            tutorialBranchWarn: 'פגיעה בענף = סוף המשחק!',
            tutorialBranchHint: 'בדוק לפני שאתה חוטב',
            tutorialTime: 'ניהול זמן',
            tutorialTimeHint1: 'סרגל הזמן יורד כל הזמן',
            tutorialTimeHint2: 'כל חטיבה נותנת',
            tutorialTimeHint3: '+זמן',
            tutorialTimeHint4: 'הזמן נגמר = סוף המשחק',
            tutorialAdvanced: 'טיפים מתקדמים',
            tutorialCombo: 'קומבו',
            tutorialComboHint: 'חטוב מהר לניקוד גבוה יותר',
            tutorialDifficulty: 'קושי',
            tutorialDifficultyHint: 'הקושי עולה עם הניקוד',
            tutorialAchievement: 'הישגים',
            tutorialAchievementHint: 'פתח 12 הישגים',
            tutorialSkin: 'סקינים',
            tutorialSkinHint: 'ניקוד גבוה פותח סקינים חדשים',
            skip: 'דלג',
            prev: 'הקודם',
            next: 'הבא',
            finish: 'סיום',

            // אזור מגע
            tapLeft: '← לחץ שמאלה',
            tapRight: 'לחץ ימינה →',

            // הגדרות שמע
            volumeSettings: '🎵 הגדרות שמע',
            sfxVolume: '🔊 אפקטים',
            bgmVolume: '🎵 מוזיקה',
            vibration: '📳 רטט',

            // חלונות קופצים
            skinUnlockPopup: 'סקין חדש נפתח!',

            // מערכת הקלטה
            replayBtn: '🎬 הקלטה',
            replayTitle: '🎬 צפה במשחק האחרון',
            replayScore: 'ניקוד',
            replayCombo: 'קומבו מקסימלי',
            replayChops: 'חטיבות',
            replayDuration: 'משך',
            replayStart: 'התחל צפייה',
            replayStop: 'עצור',
            replayNoData: 'אין נתונים',
            replayPlaying: '🎬 מציג...',
            replaySeconds: 'שנ׳',

            // שיתוף
            shareBtn: '📤 שתף',
            shareTitle: 'חוֹטֵב עֵצִים',
            shareScoreLabel: 'ניקוד',
            shareComboLabel: 'קומבו',
            shareLevelLabel: 'רמה',
            shareHighScoreLabel: 'שיא',
            shareDownloading: 'יוצר תמונה...',
            shareSuccess: 'התמונה נשמרה!',
            shareFailed: 'השיתוף נכשל, נסה שוב',
            sharePanelTitle: '📤 שתף תוצאה',
            shareNativeBtn: '📱 שתף',
            shareDownloadBtn: '💾 שמור תמונה',
            shareCopyBtn: '📋 העתק טקסט',
            shareCopySuccess: '✓ הועתק!',

            // מצב אינסופי
            endlessBtn: '∞ מצב אינסופי',
            endlessTitle: '∞ מצב אינסופי',
            endlessDesc: 'בלי הגבלת זמן, אתגר את הריכוז!',
            endlessBest: 'השיא שלך',
            endlessTotal: 'סה״כ משחקים',
            endlessStart: 'התחל אתגר',
            endlessOver: '∞ האתגר הסתיים',
            endlessNewRecord: '🎉 שיא חדש!',
            endlessHint: 'רק התחמק מענפים, בלי לחץ זמן',

            // ספירה לאחור
            countdownGo: 'קדימה!',

            // ערכת נושא
            themeDarkTip: 'עבור למצב כהה',
            themeLightTip: 'עבור למצב בהיר',

            // אפשרויות מהירות
            speedBtn: '⚡ מהירות',
            speedTitle: '⚡ מהירות משחק',
            speedSelectDesc: 'בחר את המהירות המתאימה לך',
            speedSlow: '🐢 איטי',
            speedNormal: '🚶 רגיל',
            speedFast: '🏃 מהיר',
            speedSlowDesc: 'ירידת זמן -40%, למתחילים',
            speedNormalDesc: 'מהירות משחק רגילה',
            speedFastDesc: 'ירידת זמן +50%, מצב אתגר',
            speedCurrent: 'נוכחי',

            // שמות סקינים
            skinNames: {
                default: 'חוטב עצים',
                ninja: 'נינג׳ה',
                robot: 'רובוט',
                golden: 'אגדה זהובה',
                santa: 'סנטה קלאוס',
                pumpkin: 'ראש דלעת',
                pirate: 'קפטן פיראט',
                snowman: 'איש שלג',
                chinese_new_year: 'אל העושר',
                valentine: 'קופידון',
                easter_bunny: 'ארנב פסחא',
                summer_surfer: 'גולש קיץ'
            },
            skinDescs: {
                default: 'חוטב העצים הקלאסי בחולצה אדומה',
                ninja: 'הנינג׳ה המסתורי בשחור',
                robot: 'חוטב העצים המכני מפלדה',
                golden: 'חוטב העצים הזהוב האגדי',
                santa: 'חוטב העצים החגיגי השמח',
                pumpkin: 'חוטב העצים המפחיד של האלווין',
                pirate: 'הרפתקן הים האמיץ',
                snowman: 'חוטב העצים מעולם הקרח',
                chinese_new_year: 'שנה טובה! מזל טוב!',
                valentine: 'אל האהבה מפיץ אהבה',
                easter_bunny: 'הארנב החמוד עם ביצי צבע',
                summer_surfer: 'גולש החוף המגניב'
            },

            // שמות הישגים
            achievementNames: {
                first_chop: 'החטיבה הראשונה',
                score_10: 'חוטב מתחיל',
                score_50: 'חוטב מיומן',
                score_100: 'חוטב מקצועי',
                score_200: 'חוטב מומחה',
                combo_5: 'קומבו קטן',
                combo_10: 'מאסטר קומבו',
                combo_20: 'מלך הקומבו',
                level_5: 'רמה 5',
                level_8: 'רמה 8',
                level_max: 'רמה מקסימלית',
                close_call: 'הצלה ברגע האחרון'
            },
            achievementDescs: {
                first_chop: 'חטוב את העץ הראשון שלך',
                score_10: 'השג 10 נקודות במשחק אחד',
                score_50: 'השג 50 נקודות במשחק אחד',
                score_100: 'השג 100 נקודות במשחק אחד',
                score_200: 'השג 200 נקודות במשחק אחד',
                combo_5: 'השג קומבו של 5',
                combo_10: 'השג קומבו של 10',
                combo_20: 'השג קומבו של 20',
                level_5: 'הגע לרמה 5',
                level_8: 'הגע לרמה 8',
                level_max: 'הגע לרמה המקסימלית 11',
                close_call: 'חטוב 20 פעמים כשהזמן מתחת ל-10%'
            }
        }
    },

    // 支持的语言列表（循环切换顺序）
    langOrder: ['zh', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'it', 'ru', 'tr', 'pl', 'nl', 'sv', 'fi', 'no', 'da', 'el', 'cs', 'vi', 'hu', 'th', 'id', 'ms', 'uk', 'ro', 'ar', 'he'],

    // 语言按钮显示文本
    langLabels: {
        zh: '中',
        en: 'EN',
        ja: '日',
        ko: '한',
        pt: 'PT',
        es: 'ES',
        fr: 'FR',
        de: 'DE',
        it: 'IT',
        ru: 'RU',
        tr: 'TR',
        pl: 'PL',
        nl: 'NL',
        sv: 'SV',
        fi: 'FI',
        no: 'NO',
        da: 'DA',
        el: 'EL',
        cs: 'CS',
        vi: 'VI',
        hu: 'HU',
        th: 'TH',
        id: 'ID',
        ms: 'MS',
        uk: 'UK',
        ro: 'RO',
        ar: 'ع',
        he: 'עב'
    },

    // 加载语言设置
    load() {
        const saved = localStorage.getItem('timberman_lang');
        if (saved && this.languages[saved]) {
            this.currentLang = saved;
        } else {
            // 根据浏览器语言自动选择
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith('zh')) {
                this.currentLang = 'zh';
            } else if (browserLang.startsWith('ja')) {
                this.currentLang = 'ja';
            } else if (browserLang.startsWith('ko')) {
                this.currentLang = 'ko';
            } else if (browserLang.startsWith('es')) {
                this.currentLang = 'es';
            } else if (browserLang.startsWith('fr')) {
                this.currentLang = 'fr';
            } else if (browserLang.startsWith('de')) {
                this.currentLang = 'de';
            } else if (browserLang.startsWith('pt')) {
                this.currentLang = 'pt';
            } else if (browserLang.startsWith('it')) {
                this.currentLang = 'it';
            } else if (browserLang.startsWith('ru')) {
                this.currentLang = 'ru';
            } else if (browserLang.startsWith('tr')) {
                this.currentLang = 'tr';
            } else if (browserLang.startsWith('pl')) {
                this.currentLang = 'pl';
            } else if (browserLang.startsWith('nl')) {
                this.currentLang = 'nl';
            } else if (browserLang.startsWith('sv')) {
                this.currentLang = 'sv';
            } else if (browserLang.startsWith('fi')) {
                this.currentLang = 'fi';
            } else if (browserLang.startsWith('no') || browserLang.startsWith('nb') || browserLang.startsWith('nn')) {
                this.currentLang = 'no';
            } else if (browserLang.startsWith('da')) {
                this.currentLang = 'da';
            } else if (browserLang.startsWith('el')) {
                this.currentLang = 'el';
            } else if (browserLang.startsWith('cs')) {
                this.currentLang = 'cs';
            } else if (browserLang.startsWith('vi')) {
                this.currentLang = 'vi';
            } else if (browserLang.startsWith('hu')) {
                this.currentLang = 'hu';
            } else if (browserLang.startsWith('th')) {
                this.currentLang = 'th';
            } else if (browserLang.startsWith('id') || browserLang.startsWith('in')) {
                this.currentLang = 'id';
            } else if (browserLang.startsWith('ms')) {
                this.currentLang = 'ms';
            } else if (browserLang.startsWith('uk')) {
                this.currentLang = 'uk';
            } else if (browserLang.startsWith('ro')) {
                this.currentLang = 'ro';
            } else if (browserLang.startsWith('ar')) {
                this.currentLang = 'ar';
            } else if (browserLang.startsWith('he') || browserLang.startsWith('iw')) {
                this.currentLang = 'he';
            } else {
                this.currentLang = 'en';
            }
        }
    },

    // 保存语言设置
    save() {
        localStorage.setItem('timberman_lang', this.currentLang);
    },

    // 切换语言（循环切换：中->英->日->韩->中）
    toggle() {
        const currentIndex = this.langOrder.indexOf(this.currentLang);
        const nextIndex = (currentIndex + 1) % this.langOrder.length;
        this.currentLang = this.langOrder[nextIndex];
        this.save();
        this.updateAllTexts();
    },

    // 设置语言
    setLang(lang) {
        if (this.languages[lang]) {
            this.currentLang = lang;
            this.save();
            this.updateAllTexts();
        }
    },

    // 获取当前语言包
    get t() {
        return this.languages[this.currentLang];
    },

    // 获取翻译文本
    getText(key) {
        return this.t[key] || key;
    },

    // 更新所有界面文本
    updateAllTexts() {
        const t = this.t;

        // 更新HTML lang属性
        const langCodes = { zh: 'zh-CN', en: 'en', ja: 'ja', ko: 'ko', es: 'es', fr: 'fr', de: 'de', pt: 'pt-BR', it: 'it', ru: 'ru', tr: 'tr', pl: 'pl', nl: 'nl', sv: 'sv', fi: 'fi', no: 'no', da: 'da', el: 'el', cs: 'cs', vi: 'vi', hu: 'hu', th: 'th', id: 'id', ms: 'ms', uk: 'uk', ro: 'ro', ar: 'ar', he: 'he' };
        document.documentElement.lang = langCodes[this.currentLang] || 'en';

        // 标题
        const titleEl = document.getElementById('title');
        if (titleEl) titleEl.textContent = t.title;
        document.title = 'Timberman - ' + t.title;

        // 开始界面
        const startScreen = document.getElementById('start-screen');
        if (startScreen) {
            startScreen.querySelector('h2').textContent = t.startTitle;
            const hints = startScreen.querySelectorAll('p');
            if (hints[0]) hints[0].textContent = t.startHint1;
            if (hints[1]) hints[1].textContent = t.startHint2;
            if (hints[2]) hints[2].textContent = t.startHint3;
            if (hints[3]) hints[3].textContent = t.startHint4;
        }

        // 按钮
        const setBtn = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };

        setBtn('start-btn', t.startBtn);
        setBtn('daily-btn', t.dailyBtn);
        setBtn('skin-btn', t.skinBtn);
        setBtn('leaderboard-btn', t.leaderboardBtn);
        setBtn('stats-btn', t.statsBtn);
        setBtn('tutorial-btn', t.tutorialBtn);
        setBtn('restart-btn', t.restartBtn);
        setBtn('achievements-btn', t.achievementsBtn);
        setBtn('resume-btn', t.resumeBtn);
        setBtn('daily-start-btn', t.startChallenge);
        setBtn('daily-back-btn', t.back);
        setBtn('daily-retry-btn', t.retry);
        setBtn('daily-exit-btn', t.backHome);
        setBtn('endless-btn', t.endlessBtn);
        setBtn('endless-start-btn', t.endlessStart);
        setBtn('endless-back-btn', t.back);
        setBtn('endless-retry-btn', t.retry);
        setBtn('endless-exit-btn', t.backHome);
        setBtn('skin-back-btn', t.back);
        setBtn('achievements-back-btn', t.back);
        setBtn('leaderboard-back-btn', t.back);
        setBtn('leaderboard-clear-btn', t.clearRecords);
        setBtn('stats-back-btn', t.back);
        setBtn('stats-reset-btn', t.resetStats);
        setBtn('tutorial-skip-btn', t.skip);
        setBtn('tutorial-prev-btn', t.prev);

        // 教程下一步按钮
        const nextBtn = document.getElementById('tutorial-next-btn');
        if (nextBtn) {
            const currentStep = document.querySelector('.tutorial-step:not(.hidden)');
            const stepNum = currentStep ? parseInt(currentStep.dataset.step) : 1;
            nextBtn.textContent = stepNum === 5 ? t.finish : t.next;
        }

        // 游戏结束界面
        const gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) {
            gameOverScreen.querySelector('h2').textContent = t.gameOver;
            const scoreText = gameOverScreen.querySelector('p');
            if (scoreText) {
                const scoreSpan = document.getElementById('final-score');
                const scoreVal = scoreSpan ? scoreSpan.textContent : '0';
                scoreText.innerHTML = `${t.score}: <span id="final-score">${scoreVal}</span>`;
            }
        }

        // 更新最高连击和最高分文本
        const maxComboText = document.getElementById('max-combo-text');
        if (maxComboText) {
            const val = document.getElementById('max-combo')?.textContent || '0';
            maxComboText.innerHTML = `${t.maxCombo}: <span id="max-combo">${val}</span>`;
        }
        const highScoreText = document.getElementById('high-score-text');
        if (highScoreText) {
            const val = document.getElementById('high-score')?.textContent || '0';
            highScoreText.innerHTML = `${t.highScore}: <span id="high-score">${val}</span>`;
        }

        // 暂停界面
        const pauseScreen = document.getElementById('pause-screen');
        if (pauseScreen) {
            pauseScreen.querySelector('h2').textContent = t.paused;
            pauseScreen.querySelector('p').textContent = t.pauseHint;
        }

        // 每日挑战界面
        const dailyScreen = document.getElementById('daily-screen');
        if (dailyScreen) {
            dailyScreen.querySelector('h2').textContent = t.dailyTitle;
            dailyScreen.querySelector('.daily-date-label').textContent = t.todayDate;
            const stats = dailyScreen.querySelectorAll('.stat-label');
            if (stats[0]) stats[0].textContent = t.todayBest;
            if (stats[1]) stats[1].textContent = t.attempts;
            dailyScreen.querySelector('.daily-hint').textContent = t.dailyHint;
        }

        // 每日挑战结束界面
        const dailyGameOver = document.getElementById('daily-game-over-screen');
        if (dailyGameOver) {
            dailyGameOver.querySelector('h2').textContent = t.challengeOver;
            const newRecordEl = document.getElementById('daily-new-record');
            if (newRecordEl) newRecordEl.textContent = t.newRecord;
        }

        // 无限模式界面
        const endlessScreen = document.getElementById('endless-screen');
        if (endlessScreen) {
            endlessScreen.querySelector('h2').textContent = t.endlessTitle;
            const descEl = endlessScreen.querySelector('.endless-desc');
            if (descEl) descEl.textContent = t.endlessDesc;
            const stats = endlessScreen.querySelectorAll('.stat-label');
            if (stats[0]) stats[0].textContent = t.endlessBest;
            if (stats[1]) stats[1].textContent = t.endlessTotal;
            const hintEl = endlessScreen.querySelector('.endless-hint');
            if (hintEl) hintEl.textContent = t.endlessHint;
        }

        // 无限模式结束界面
        const endlessGameOver = document.getElementById('endless-game-over-screen');
        if (endlessGameOver) {
            endlessGameOver.querySelector('h2').textContent = t.endlessOver;
            const newRecordEl = document.getElementById('endless-new-record');
            if (newRecordEl) newRecordEl.textContent = t.endlessNewRecord;
        }

        // 皮肤界面
        const skinScreen = document.getElementById('skin-screen');
        if (skinScreen) {
            skinScreen.querySelector('h2').textContent = t.skinTitle;
        }

        // 成就界面
        const achieveScreen = document.getElementById('achievements-screen');
        if (achieveScreen) {
            achieveScreen.querySelector('h2').textContent = t.achievementsTitle;
        }

        // 排行榜界面
        const lbScreen = document.getElementById('leaderboard-screen');
        if (lbScreen) {
            lbScreen.querySelector('h2').textContent = t.leaderboardTitle;
            const headers = lbScreen.querySelectorAll('.leaderboard-header span');
            if (headers[0]) headers[0].textContent = t.rank;
            if (headers[2]) headers[2].textContent = t.lbScore;
            if (headers[3]) headers[3].textContent = t.lbCombo;
            if (headers[4]) headers[4].textContent = t.lbDate;
        }

        // 统计界面
        const statsScreen = document.getElementById('stats-screen');
        if (statsScreen) {
            statsScreen.querySelector('h2').textContent = t.statsTitle;
            const labels = statsScreen.querySelectorAll('.stat-label');
            const statsLabels = [t.totalGames, t.totalChops, t.totalTime, t.highScore, t.bestCombo, t.avgScore];
            labels.forEach((el, i) => {
                if (statsLabels[i]) el.textContent = statsLabels[i];
            });
            const rows = statsScreen.querySelectorAll('.stats-row span:first-child');
            if (rows[0]) rows[0].textContent = t.unlockedAchievements;
            if (rows[1]) rows[1].textContent = t.unlockedSkins;
            if (rows[2]) rows[2].textContent = t.dailyAttempts;
        }

        // 音量面板
        const volumePanel = document.getElementById('volume-panel');
        if (volumePanel) {
            volumePanel.querySelector('.volume-panel-header span').textContent = t.volumeSettings;
            const labels = volumePanel.querySelectorAll('.volume-label');
            if (labels[0]) labels[0].textContent = t.sfxVolume;
            if (labels[1]) labels[1].textContent = t.bgmVolume;
            if (labels[2]) labels[2].textContent = t.vibration;
        }

        // 弹窗
        const achievePopup = document.getElementById('achievement-popup');
        if (achievePopup) {
            achievePopup.querySelector('.achievement-label').textContent = t.achievementUnlock;
        }
        const skinPopup = document.getElementById('skin-unlock-popup');
        if (skinPopup) {
            skinPopup.querySelector('.skin-popup-label').textContent = t.skinUnlockPopup;
        }

        // 触摸提示
        const hintLeft = document.querySelector('.hint-left');
        const hintRight = document.querySelector('.hint-right');
        if (hintLeft) hintLeft.textContent = t.tapLeft;
        if (hintRight) hintRight.textContent = t.tapRight;

        // 回放界面
        const replayScreen = document.getElementById('replay-screen');
        if (replayScreen) {
            replayScreen.querySelector('h2').textContent = t.replayTitle;
            const labels = replayScreen.querySelectorAll('.stat-label');
            if (labels[0]) labels[0].textContent = t.replayScore;
            if (labels[1]) labels[1].textContent = t.replayCombo;
            if (labels[2]) labels[2].textContent = t.replayChops;
            if (labels[3]) labels[3].textContent = t.replayDuration;
        }
        setBtn('replay-btn', t.replayBtn);
        setBtn('replay-start-btn', t.replayStart);
        setBtn('replay-back-btn', t.back);
        setBtn('replay-stop-btn', t.replayStop);
        const replayNoData = document.getElementById('replay-no-data');
        if (replayNoData) replayNoData.textContent = t.replayNoData;

        // 分享按钮和面板
        setBtn('share-btn', t.shareBtn);
        setBtn('daily-share-btn', t.shareBtn);
        setBtn('share-native-btn', t.shareNativeBtn);
        setBtn('share-download-btn', t.shareDownloadBtn);
        setBtn('share-copy-btn', t.shareCopyBtn);
        const sharePanelTitle = document.getElementById('share-panel-title');
        if (sharePanelTitle) sharePanelTitle.textContent = t.sharePanelTitle;
        const shareCopyHint = document.getElementById('share-copy-hint');
        if (shareCopyHint) shareCopyHint.textContent = t.shareCopySuccess;

        const replayIndicator = document.getElementById('replay-indicator');
        if (replayIndicator) {
            const span = replayIndicator.querySelector('span');
            if (span) span.textContent = t.replayPlaying;
        }

        // 速度设置界面
        const speedScreen = document.getElementById('speed-screen');
        if (speedScreen) {
            speedScreen.querySelector('h2').textContent = t.speedTitle;
            const descEl = speedScreen.querySelector('.speed-desc');
            if (descEl) descEl.textContent = t.speedSelectDesc || '选择适合你的游戏速度';
            // 更新速度选项文本
            const items = speedScreen.querySelectorAll('.speed-item');
            items.forEach(item => {
                const speed = item.dataset.speed;
                const nameEl = item.querySelector('.speed-name');
                const descElItem = item.querySelector('.speed-detail');
                if (nameEl) {
                    if (speed === 'slow') nameEl.textContent = t.speedSlow;
                    if (speed === 'normal') nameEl.textContent = t.speedNormal;
                    if (speed === 'fast') nameEl.textContent = t.speedFast;
                }
                if (descElItem) {
                    if (speed === 'slow') descElItem.textContent = t.speedSlowDesc;
                    if (speed === 'normal') descElItem.textContent = t.speedNormalDesc;
                    if (speed === 'fast') descElItem.textContent = t.speedFastDesc;
                }
            });
        }
        setBtn('speed-back-btn', t.back);

        // 更新速度按钮显示
        if (typeof SPEED_SETTING !== 'undefined') {
            SPEED_SETTING.updateUI();
        }

        // 教程界面
        this.updateTutorialTexts();

        // 更新语言下拉选择器
        const langSelect = document.getElementById('lang-select');
        if (langSelect) {
            langSelect.value = this.currentLang;
        }

        // 更新返回首页按钮文本
        const homeBtn = document.getElementById('home-btn');
        if (homeBtn) {
            homeBtn.textContent = '🏠 ' + (t.backHome || '返回首页');
        }

        // 更新主题按钮提示文本
        if (typeof THEME !== 'undefined') {
            THEME.updateButton();
        }

        // 刷新动态内容（皮肤列表、成就列表、排行榜）
        if (typeof renderSkinsList === 'function') renderSkinsList();
        if (typeof ACHIEVEMENTS !== 'undefined') ACHIEVEMENTS.render();
        if (typeof LEADERBOARD !== 'undefined') LEADERBOARD.render();
    },

    // 更新教程文本
    updateTutorialTexts() {
        const t = this.t;
        const tutorial = document.getElementById('tutorial-screen');
        if (!tutorial) return;

        // 步骤1
        const step1 = tutorial.querySelector('[data-step="1"]');
        if (step1) {
            step1.querySelector('h2').textContent = t.tutorialWelcome;
            const ps = step1.querySelectorAll('p');
            if (ps[0]) ps[0].textContent = t.tutorialWelcome1;
            if (ps[1]) ps[1].textContent = t.tutorialWelcome2;
            if (ps[2]) ps[2].textContent = t.tutorialWelcome3;
        }

        // 步骤2
        const step2 = tutorial.querySelector('[data-step="2"]');
        if (step2) {
            step2.querySelector('h2').textContent = t.tutorialControls;
            const items = step2.querySelectorAll('.control-item span:not(.key)');
            if (items[0]) items[0].textContent = t.tutorialMoveLeft;
            if (items[1]) items[1].textContent = t.tutorialMoveRight;
            const hint = step2.querySelector('.tutorial-hint');
            if (hint) hint.textContent = t.tutorialTouchHint;
        }

        // 步骤3
        const step3 = tutorial.querySelector('[data-step="3"]');
        if (step3) {
            step3.querySelector('h2').textContent = t.tutorialBranch;
            const warn = step3.querySelector('.tutorial-warning');
            if (warn) warn.textContent = t.tutorialBranchWarn;
            const hint = step3.querySelectorAll('p:not(.tutorial-warning)');
            if (hint[0]) hint[0].textContent = t.tutorialBranchHint;
        }

        // 步骤4
        const step4 = tutorial.querySelector('[data-step="4"]');
        if (step4) {
            step4.querySelector('h2').textContent = t.tutorialTime;
            const ps = step4.querySelectorAll('p');
            if (ps[0]) ps[0].textContent = t.tutorialTimeHint1;
            if (ps[1]) ps[1].innerHTML = `${t.tutorialTimeHint2} <strong>${t.tutorialTimeHint3}</strong>`;
            if (ps[2]) ps[2].textContent = t.tutorialTimeHint4;
        }

        // 步骤5
        const step5 = tutorial.querySelector('[data-step="5"]');
        if (step5) {
            step5.querySelector('h2').textContent = t.tutorialAdvanced;
            const ps = step5.querySelectorAll('.tutorial-tips-list p');
            if (ps[0]) ps[0].innerHTML = `⚡ <strong>${t.tutorialCombo}</strong> - ${t.tutorialComboHint}`;
            if (ps[1]) ps[1].innerHTML = `📈 <strong>${t.tutorialDifficulty}</strong> - ${t.tutorialDifficultyHint}`;
            if (ps[2]) ps[2].innerHTML = `🎖️ <strong>${t.tutorialAchievement}</strong> - ${t.tutorialAchievementHint}`;
            if (ps[3]) ps[3].innerHTML = `👕 <strong>${t.tutorialSkin}</strong> - ${t.tutorialSkinHint}`;
        }
    }
};

// ============ 主题系统 ============
const THEME = {
    current: 'light', // 当前主题：light 或 dark

    // 加载主题设置
    load() {
        const saved = localStorage.getItem('timberman_theme');
        if (saved && (saved === 'light' || saved === 'dark')) {
            this.current = saved;
        } else {
            // 检测系统主题偏好
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.current = 'dark';
            }
        }
        this.apply();
    },

    // 保存主题设置
    save() {
        localStorage.setItem('timberman_theme', this.current);
    },

    // 应用主题
    apply() {
        document.documentElement.setAttribute('data-theme', this.current);
        this.updateButton();
    },

    // 切换主题
    toggle() {
        this.current = this.current === 'light' ? 'dark' : 'light';
        this.save();
        this.apply();
    },

    // 更新主题按钮图标
    updateButton() {
        const btn = document.getElementById('theme-btn');
        if (btn) {
            btn.textContent = this.current === 'light' ? '🌙' : '☀️';
            // 多语言提示
            const tooltips = {
                zh: this.current === 'light' ? '切换到暗色主题' : '切换到亮色主题',
                en: this.current === 'light' ? 'Switch to dark theme' : 'Switch to light theme',
                ja: this.current === 'light' ? 'ダークテーマに切替' : 'ライトテーマに切替',
                ko: this.current === 'light' ? '다크 테마로 전환' : '라이트 테마로 전환',
                es: this.current === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro',
                fr: this.current === 'light' ? 'Passer au thème sombre' : 'Passer au thème clair',
                de: this.current === 'light' ? 'Zum dunklen Design' : 'Zum hellen Design',
                pt: this.current === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro',
                it: this.current === 'light' ? 'Passa al tema scuro' : 'Passa al tema chiaro',
                ru: this.current === 'light' ? 'Переключить на тёмную тему' : 'Переключить на светлую тему',
                tr: this.current === 'light' ? 'Karanlık temaya geç' : 'Açık temaya geç',
                pl: this.current === 'light' ? 'Przełącz na ciemny motyw' : 'Przełącz na jasny motyw',
                nl: this.current === 'light' ? 'Schakel naar donker thema' : 'Schakel naar licht thema',
                sv: this.current === 'light' ? 'Byt till mörkt tema' : 'Byt till ljust tema',
                fi: this.current === 'light' ? 'Vaihda tummaan teemaan' : 'Vaihda valoisaan teemaan',
                no: this.current === 'light' ? 'Bytt til mørk modus' : 'Bytt til lys modus',
                da: this.current === 'light' ? 'Skift til mørk tilstand' : 'Skift til lys tilstand',
                el: this.current === 'light' ? 'Αλλαγή σε σκοτεινό θέμα' : 'Αλλαγή σε φωτεινό θέμα',
                cs: this.current === 'light' ? 'Přepnout na tmavý režim' : 'Přepnout na světlý režim',
                vi: this.current === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng',
                hu: this.current === 'light' ? 'Váltás sötét témára' : 'Váltás világos témára',
                th: this.current === 'light' ? 'เปลี่ยนเป็นธีมมืด' : 'เปลี่ยนเป็นธีมสว่าง',
                id: this.current === 'light' ? 'Beralih ke tema gelap' : 'Beralih ke tema terang',
                ms: this.current === 'light' ? 'Tukar ke tema gelap' : 'Tukar ke tema cerah',
                uk: this.current === 'light' ? 'Перемкнути на темну тему' : 'Перемкнути на світлу тему',
                ro: this.current === 'light' ? 'Comută la tema întunecată' : 'Comută la tema luminoasă',
                ar: this.current === 'light' ? 'التبديل إلى الوضع الداكن' : 'التبديل إلى الوضع الفاتح',
                he: this.current === 'light' ? 'עבור לערכת נושא כהה' : 'עבור לערכת נושא בהיר'
            };
            btn.title = tooltips[I18N.currentLang] || tooltips.en;
        }
    }
};

// ============ 速度设置系统 ============
const SPEED_SETTING = {
    current: 'normal', // 当前速度: 'slow' | 'normal' | 'fast'

    // 速度配置（与CONFIG.SPEED_MODES一致）
    modes: {
        slow: { id: 'slow', decayMultiplier: 0.6, bonusMultiplier: 1.3, icon: '🐢' },
        normal: { id: 'normal', decayMultiplier: 1.0, bonusMultiplier: 1.0, icon: '🏃' },
        fast: { id: 'fast', decayMultiplier: 1.5, bonusMultiplier: 0.75, icon: '🚀' }
    },

    // 加载速度设置
    load() {
        const saved = localStorage.getItem('timberman_speed');
        if (saved && this.modes[saved]) {
            this.current = saved;
        }
        this.apply();
    },

    // 保存速度设置
    save() {
        localStorage.setItem('timberman_speed', this.current);
    },

    // 应用速度设置
    apply() {
        game.speedMode = this.current;
        this.updateUI();
    },

    // 设置速度
    set(speed) {
        if (this.modes[speed]) {
            this.current = speed;
            this.save();
            this.apply();
        }
    },

    // 更新UI显示
    updateUI() {
        const items = document.querySelectorAll('.speed-item');
        items.forEach(item => {
            if (item.dataset.speed === this.current) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });

        // 更新开始界面的速度按钮显示
        const speedBtn = document.getElementById('speed-btn');
        if (speedBtn) {
            const mode = this.modes[this.current];
            speedBtn.textContent = `${mode.icon} ${this.getSpeedName(this.current)}`;
        }
    },

    // 获取速度名称（多语言，去掉表情符号前缀）
    getSpeedName(speed) {
        const t = I18N.t;
        const names = {
            slow: t.speedSlow || '🐢 慢速',
            normal: t.speedNormal || '🚶 普通',
            fast: t.speedFast || '🏃 快速'
        };
        // 移除表情符号前缀（如 "🐢 慢速" → "慢速"）
        const name = names[speed] || speed;
        return name.replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]\s*/u, '');
    },

    // 获取当前速度的乘数
    getDecayMultiplier() {
        return this.modes[this.current].decayMultiplier;
    },

    getBonusMultiplier() {
        return this.modes[this.current].bonusMultiplier;
    }
};

// ============ 游戏回放系统 ============
const REPLAY = {
    // 回放状态
    isRecording: false,     // 是否正在录制
    isPlaying: false,       // 是否正在回放

    // 当前录制数据
    currentRecording: {
        startTime: 0,           // 游戏开始时间戳
        initialTrunks: [],      // 初始树干序列（用于重现）
        actions: [],            // 操作序列 [{time, side}]
        score: 0,               // 最终得分
        maxCombo: 0,            // 最高连击
        skin: 'default',        // 使用的皮肤
        date: null              // 录制日期
    },

    // 上一局的回放数据
    lastReplay: null,

    // 回放播放状态
    playback: {
        actionIndex: 0,         // 当前播放的操作索引
        startTime: 0,           // 回放开始时间
        timer: null             // 定时器
    },

    // 开始录制（游戏开始时调用）
    startRecording(initialTrunks) {
        this.isRecording = true;
        this.currentRecording = {
            startTime: performance.now(),
            initialTrunks: initialTrunks.map(t => t.branch), // 只记录树枝方向
            actions: [],
            score: 0,
            maxCombo: 0,
            skin: SKINS.currentSkin,
            date: new Date().toISOString()
        };
    },

    // 记录操作（砍树时调用）
    recordAction(side) {
        if (!this.isRecording) return;

        const time = performance.now() - this.currentRecording.startTime;
        this.currentRecording.actions.push({
            time: Math.round(time), // 相对时间（毫秒）
            side: side
        });
    },

    // 结束录制（游戏结束时调用）
    endRecording(score, maxCombo) {
        if (!this.isRecording) return;

        this.currentRecording.score = score;
        this.currentRecording.maxCombo = maxCombo;
        this.isRecording = false;

        // 保存为上一局回放
        this.lastReplay = JSON.parse(JSON.stringify(this.currentRecording));

        // 保存到 localStorage
        this.save();
    },

    // 保存回放到 localStorage
    save() {
        if (this.lastReplay) {
            localStorage.setItem('timberman_replay', JSON.stringify(this.lastReplay));
        }
    },

    // 从 localStorage 加载回放
    load() {
        const saved = localStorage.getItem('timberman_replay');
        if (saved) {
            try {
                this.lastReplay = JSON.parse(saved);
            } catch (e) {
                this.lastReplay = null;
            }
        }
    },

    // 检查是否有可用的回放
    hasReplay() {
        return this.lastReplay && this.lastReplay.actions && this.lastReplay.actions.length > 0;
    },

    // 开始回放
    startPlayback() {
        if (!this.hasReplay()) return false;

        this.isPlaying = true;
        this.playback.actionIndex = 0;
        this.playback.startTime = performance.now();

        return true;
    },

    // 更新回放（在游戏循环中调用）
    updatePlayback() {
        if (!this.isPlaying) return;

        const elapsed = performance.now() - this.playback.startTime;

        // 检查是否有待执行的操作
        while (this.playback.actionIndex < this.lastReplay.actions.length) {
            const action = this.lastReplay.actions[this.playback.actionIndex];

            if (action.time <= elapsed) {
                // 执行操作
                chop(action.side);
                this.playback.actionIndex++;
            } else {
                break;
            }
        }

        // 检查回放是否结束
        if (this.playback.actionIndex >= this.lastReplay.actions.length) {
            // 标记回放结束避免重复触发
            this.playback.actionIndex = -1;
            // 延迟一秒结束回放（等待最后动画）
            setTimeout(() => {
                stopReplayPlayback();
            }, 1000);
        }
    },

    // 停止回放（内部方法）
    stopPlayback() {
        this.isPlaying = false;
        this.playback.actionIndex = 0;
        if (this.playback.timer) {
            clearTimeout(this.playback.timer);
            this.playback.timer = null;
        }
    },

    // 获取回放信息（用于 UI 显示）
    getReplayInfo() {
        if (!this.hasReplay()) return null;

        return {
            score: this.lastReplay.score,
            maxCombo: this.lastReplay.maxCombo,
            actionCount: this.lastReplay.actions.length,
            duration: this.lastReplay.actions.length > 0
                ? this.lastReplay.actions[this.lastReplay.actions.length - 1].time
                : 0,
            skin: this.lastReplay.skin,
            date: this.lastReplay.date
        };
    }
};

// ============ 分享系统 ============
const SHARE = {
    // 生成分享图片
    generateShareImage(isDaily = false, isEndless = false) {
        const canvas = elements.shareCanvas;
        const ctx = canvas.getContext('2d');
        const t = i18n[currentLanguage];

        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 背景渐变
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, '#1a1a2e');
        bgGradient.addColorStop(0.5, '#16213e');
        bgGradient.addColorStop(1, '#0f3460');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 装饰性边框
        ctx.strokeStyle = 'rgba(100, 180, 255, 0.4)';
        ctx.lineWidth = 4;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

        // 内边框
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // 游戏标题
        ctx.font = 'bold 32px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fillText(t.shareTitle, canvas.width / 2, 55);
        ctx.shadowBlur = 0;

        // 分数
        const score = isDaily ? game.score : game.score;
        ctx.font = 'bold 64px Arial, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
        ctx.shadowBlur = 8;
        ctx.fillText(score.toString(), canvas.width / 2, 130);
        ctx.shadowBlur = 0;

        // 分数标签
        ctx.font = '16px Arial, sans-serif';
        ctx.fillStyle = '#4FC3F7';
        ctx.fillText(t.shareScoreLabel, canvas.width / 2, 155);

        // 统计信息背景
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(30, 175, canvas.width - 60, 70);

        // 统计信息
        ctx.font = 'bold 18px Arial, sans-serif';
        ctx.textAlign = 'left';

        // 连击
        ctx.fillStyle = '#FFB74D';
        ctx.fillText(`${t.shareComboLabel}: ${game.combo.maxCount}`, 50, 205);

        // 难度等级
        const level = getDifficultyLevel() + 1;
        ctx.fillStyle = level >= 7 ? '#FF5252' : '#81C784';
        ctx.fillText(`${t.shareLevelLabel}: Lv.${level}`, 50, 230);

        // 最高分
        ctx.textAlign = 'right';
        ctx.fillStyle = '#E1BEE7';
        ctx.fillText(`${t.shareHighScoreLabel}: ${game.highScore}`, canvas.width - 50, 205);

        // 皮肤名称
        const skinName = t.skinNames[SKINS.currentSkin] || SKINS.currentSkin;
        ctx.fillStyle = '#90CAF9';
        ctx.fillText(`👕 ${skinName}`, canvas.width - 50, 230);

        // 日期时间
        ctx.textAlign = 'center';
        ctx.font = '12px Arial, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        ctx.fillText(dateStr, canvas.width / 2, 275);

        // 游戏标识
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillText('🪓 Timberman Game', canvas.width / 2, 292);
    },

    // 显示分享面板
    show(isDaily = false, isEndless = false) {
        this.generateShareImage(isDaily, isEndless);
        elements.sharePanel.classList.remove('hidden');
        elements.shareCopyHint.classList.add('hidden');

        // 检查是否支持原生分享
        if (navigator.share && navigator.canShare) {
            elements.shareNativeBtn.classList.remove('hidden');
        } else {
            elements.shareNativeBtn.classList.add('hidden');
        }
    },

    // 隐藏分享面板
    hide() {
        elements.sharePanel.classList.add('hidden');
    },

    // 下载图片
    async downloadImage() {
        const canvas = elements.shareCanvas;
        const t = i18n[currentLanguage];

        try {
            const link = document.createElement('a');
            link.download = `timberman-score-${game.score}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Download failed:', error);
            alert(t.shareFailed);
        }
    },

    // 原生分享（Web Share API）
    async nativeShare() {
        const canvas = elements.shareCanvas;
        const t = i18n[currentLanguage];

        try {
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            const file = new File([blob], `timberman-score-${game.score}.png`, { type: 'image/png' });

            await navigator.share({
                title: t.shareTitle,
                text: `🪓 ${t.shareTitle} - ${t.shareScoreLabel}: ${game.score} | ${t.shareComboLabel}: ${game.combo.maxCount}`,
                files: [file]
            });
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Share failed:', error);
                // 降级到下载
                this.downloadImage();
            }
        }
    },

    // 复制文字结果
    copyText() {
        const t = i18n[currentLanguage];
        const text = `🪓 ${t.shareTitle}\n${t.shareScoreLabel}: ${game.score}\n${t.shareComboLabel}: ${game.combo.maxCount}\n${t.shareLevelLabel}: Lv.${getDifficultyLevel() + 1}`;

        navigator.clipboard.writeText(text).then(() => {
            elements.shareCopyHint.classList.remove('hidden');
            setTimeout(() => {
                elements.shareCopyHint.classList.add('hidden');
            }, 2000);
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    }
};

// ============ 无限模式系统 ============
const ENDLESS_MODE = {
    // 状态
    isActive: false,           // 是否正在进行无限模式
    highScore: 0,              // 无限模式最高分
    totalGames: 0,             // 总游戏次数

    // 加载数据
    load() {
        const saved = localStorage.getItem('timberman_endless');
        if (saved) {
            const data = JSON.parse(saved);
            this.highScore = data.highScore || 0;
            this.totalGames = data.totalGames || 0;
        }
    },

    // 保存数据
    save() {
        localStorage.setItem('timberman_endless', JSON.stringify({
            highScore: this.highScore,
            totalGames: this.totalGames
        }));
    },

    // 开始无限模式
    start() {
        this.isActive = true;
        this.totalGames++;
        this.save();
    },

    // 更新最高分
    updateHighScore(score) {
        if (score > this.highScore) {
            this.highScore = score;
            this.save();
            return true;
        }
        return false;
    },

    // 结束无限模式
    end() {
        this.isActive = false;
    },

    // 获取信息
    getInfo() {
        return {
            highScore: this.highScore,
            totalGames: this.totalGames
        };
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
        // 与 generateBranch 相同：若最近两次为非 none 且左右交替，先插入 none 再抽随机
        this.branchSequence = [];
        for (let i = 0; i < 1000; i++) {
            if (shouldForceNoneBranch(this.branchSequence)) {
                this.branchSequence.push('none');
                continue;
            }
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

            // 获取国际化的成就名称
            const achName = I18N.t.achievementNames[achievement.id] || achievement.name;

            iconEl.textContent = achievement.icon;
            nameEl.textContent = achName;
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
        const t = I18N.t;

        this.definitions.forEach(ach => {
            const item = document.createElement('div');
            const isUnlocked = !!this.unlocked[ach.id];
            // 获取国际化的成就名称和描述
            const achName = t.achievementNames[ach.id] || ach.name;
            const achDesc = t.achievementDescs[ach.id] || ach.desc;

            item.className = `achievement-item rarity-${ach.rarity} ${isUnlocked ? 'unlocked' : 'locked'}`;
            item.innerHTML = `
                <span class="icon">${isUnlocked ? ach.icon : '🔒'}</span>
                <span class="name">${isUnlocked ? achName : '???'}</span>
            `;
            item.title = isUnlocked ? achDesc : (I18N.currentLang === 'zh' ? '未解锁' : 'Locked');
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
        const t = I18N.t;

        if (this.entries.length === 0) {
            const emptyMsg = I18N.currentLang === 'zh' ? '暂无记录，快来挑战吧！' : 'No records yet. Start playing!';
            list.innerHTML = `<div class="leaderboard-empty">${emptyMsg}</div>`;
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

// ============ 游戏统计系统 ============
const GAME_STATS = {
    // 统计数据
    data: {
        totalGames: 0,          // 总游戏次数
        totalChops: 0,          // 总砍树数
        totalPlayTime: 0,       // 总游戏时长（毫秒）
        bestScore: 0,           // 最高分
        bestCombo: 0,           // 最高连击
        firstPlayDate: null,    // 首次游戏时间
        lastPlayDate: null      // 最后游戏时间
    },

    // 当局游戏开始时间
    sessionStartTime: 0,

    // 加载统计数据
    load() {
        const saved = localStorage.getItem('timberman_stats');
        if (saved) {
            this.data = { ...this.data, ...JSON.parse(saved) };
        }
    },

    // 保存统计数据
    save() {
        localStorage.setItem('timberman_stats', JSON.stringify(this.data));
    },

    // 开始新游戏（记录开始时间）
    startSession() {
        this.sessionStartTime = Date.now();
        // 记录首次游戏时间
        if (!this.data.firstPlayDate) {
            this.data.firstPlayDate = this.sessionStartTime;
            this.save();
        }
    },

    // 结束游戏（更新统计）
    endSession(score, maxCombo) {
        const playTime = Date.now() - this.sessionStartTime;

        this.data.totalGames++;
        this.data.totalChops += score;
        this.data.totalPlayTime += playTime;
        this.data.lastPlayDate = Date.now();

        if (score > this.data.bestScore) {
            this.data.bestScore = score;
        }
        if (maxCombo > this.data.bestCombo) {
            this.data.bestCombo = maxCombo;
        }

        this.save();
    },

    // 格式化时间（毫秒 -> 时:分:秒）
    formatPlayTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours}小时 ${minutes}分 ${seconds}秒`;
        } else if (minutes > 0) {
            return `${minutes}分 ${seconds}秒`;
        } else {
            return `${seconds}秒`;
        }
    },

    // 格式化日期
    formatDate(timestamp) {
        if (!timestamp) return '---';
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    // 获取平均分
    getAverageScore() {
        if (this.data.totalGames === 0) return 0;
        return Math.round(this.data.totalChops / this.data.totalGames);
    },

    // 获取平均游戏时长
    getAveragePlayTime() {
        if (this.data.totalGames === 0) return 0;
        return Math.round(this.data.totalPlayTime / this.data.totalGames);
    },

    // 清空统计数据
    clear() {
        this.data = {
            totalGames: 0,
            totalChops: 0,
            totalPlayTime: 0,
            bestScore: 0,
            bestCombo: 0,
            firstPlayDate: null,
            lastPlayDate: null
        };
        this.save();
    },

    // 渲染统计界面
    render() {
        // 更新主要统计数据
        const totalGamesEl = document.getElementById('stats-total-games');
        const totalChopsEl = document.getElementById('stats-total-chops');
        const totalTimeEl = document.getElementById('stats-total-time');
        const highScoreEl = document.getElementById('stats-high-score');
        const bestComboEl = document.getElementById('stats-best-combo');
        const avgScoreEl = document.getElementById('stats-avg-score');

        if (totalGamesEl) totalGamesEl.textContent = this.data.totalGames;
        if (totalChopsEl) totalChopsEl.textContent = this.data.totalChops;
        if (totalTimeEl) totalTimeEl.textContent = this.formatPlayTime(this.data.totalPlayTime);
        if (highScoreEl) highScoreEl.textContent = this.data.bestScore;
        if (bestComboEl) bestComboEl.textContent = this.data.bestCombo + 'x';
        if (avgScoreEl) avgScoreEl.textContent = this.getAverageScore();

        // 更新额外统计数据
        const achievementsEl = document.getElementById('stats-achievements');
        const skinsEl = document.getElementById('stats-skins');
        const dailyEl = document.getElementById('stats-daily-attempts');

        if (achievementsEl) {
            const unlocked = ACHIEVEMENTS.getUnlockedCount();
            achievementsEl.textContent = `${unlocked}/12`;
        }
        if (skinsEl) {
            const unlocked = SKINS.unlockedSkins.length;
            const total = SKINS.definitions.length;
            skinsEl.textContent = `${unlocked}/${total}`;
        }
        if (dailyEl) {
            const times = I18N.currentLang === 'zh' ? ' 次' : '';
            dailyEl.textContent = `${DAILY_CHALLENGE.todayAttempts}${times}`;
        }
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
    },

    // 游戏速度模式配置
    SPEED_MODES: {
        slow: {
            id: 'slow',
            decayMultiplier: 0.6,      // 时间衰减倍率（更慢）
            bonusMultiplier: 1.3       // 时间奖励倍率（更多）
        },
        normal: {
            id: 'normal',
            decayMultiplier: 1.0,      // 标准速度
            bonusMultiplier: 1.0
        },
        fast: {
            id: 'fast',
            decayMultiplier: 1.5,      // 时间衰减更快
            bonusMultiplier: 0.75      // 时间奖励更少
        }
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
    intensity: 1.0,  // 振动强度 (0-1)

    // 检查是否支持振动
    isSupported() {
        return 'vibrate' in navigator;
    },

    // 加载振动强度设置
    loadIntensity() {
        const saved = localStorage.getItem('timberman_vibration_intensity');
        if (saved !== null) {
            this.intensity = parseFloat(saved);
        }
    },

    // 保存振动强度设置
    saveIntensity() {
        localStorage.setItem('timberman_vibration_intensity', this.intensity.toString());
    },

    // 设置振动强度 (0-1)
    setIntensity(value) {
        this.intensity = Math.max(0, Math.min(1, value));
        this.saveIntensity();
    },

    // 根据强度缩放振动时长
    scaleVibration(duration) {
        return Math.round(duration * this.intensity);
    },

    // 砍树振动（短促）
    chop() {
        if (!this.enabled || !this.isSupported() || this.intensity === 0) return;
        navigator.vibrate(this.scaleVibration(30));
    },

    // 游戏结束振动（稍长）
    gameOver() {
        if (!this.enabled || !this.isSupported() || this.intensity === 0) return;
        navigator.vibrate(this.scaleVibration(150));
    },

    // 成就解锁振动（双击模式）
    achievement() {
        if (!this.enabled || !this.isSupported() || this.intensity === 0) return;
        const v = this.scaleVibration(50);
        navigator.vibrate([v, v, v]); // 振动-暂停-振动
    },

    // 时间紧迫振动（轻微）
    warning() {
        if (!this.enabled || !this.isSupported() || this.intensity === 0) return;
        navigator.vibrate(this.scaleVibration(15));
    },

    // 测试振动（用于调节时预览）
    test() {
        if (!this.isSupported() || this.intensity === 0) return;
        navigator.vibrate(this.scaleVibration(50));
    }
};

// ============ 音效系统 ============
const audio = {
    ctx: null,
    enabled: true,
    bgmEnabled: true,
    bgmGain: null,       // 背景音乐音量控制
    sfxGain: null,       // 音效音量控制
    bgmInterval: null,   // 背景音乐循环定时器
    bgmPlaying: false,   // 背景音乐是否正在播放
    sfxVolume: 1.0,      // 音效音量 (0-1)
    bgmVolume: 1.0,      // 背景音乐音量 (0-1)

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
            // 加载保存的音量设置
            this.loadVolume();
            // 创建背景音乐主音量控制节点
            this.bgmGain = this.ctx.createGain();
            this.bgmGain.gain.value = 0.15 * this.bgmVolume;
            this.bgmGain.connect(this.ctx.destination);
            // 创建音效主音量控制节点
            this.sfxGain = this.ctx.createGain();
            this.sfxGain.gain.value = this.sfxVolume;
            this.sfxGain.connect(this.ctx.destination);
        } catch (e) {
            console.warn('Web Audio API 不支持');
            this.enabled = false;
        }
    },

    // 加载音量设置
    loadVolume() {
        const savedSfxVolume = localStorage.getItem('timberman_sfx_volume');
        const savedBgmVolume = localStorage.getItem('timberman_bgm_volume');
        if (savedSfxVolume !== null) {
            this.sfxVolume = parseFloat(savedSfxVolume);
        }
        if (savedBgmVolume !== null) {
            this.bgmVolume = parseFloat(savedBgmVolume);
        }
    },

    // 保存音量设置
    saveVolume() {
        localStorage.setItem('timberman_sfx_volume', this.sfxVolume.toString());
        localStorage.setItem('timberman_bgm_volume', this.bgmVolume.toString());
    },

    // 设置音效音量 (0-1)
    setSfxVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        if (this.sfxGain) {
            this.sfxGain.gain.value = this.sfxVolume;
        }
        this.saveVolume();
    },

    // 设置背景音乐音量 (0-1)
    setBgmVolume(volume) {
        this.bgmVolume = Math.max(0, Math.min(1, volume));
        if (this.bgmGain && this.bgmEnabled) {
            this.bgmGain.gain.value = 0.15 * this.bgmVolume;
        }
        this.saveVolume();
    },

    // 恢复音频上下文（需要用户交互后调用）
    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    // 播放砍树音效（根据连击数调整音调）
    playChop(comboCount = 0) {
        if (!this.enabled || !this.ctx || !this.sfxGain) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.sfxGain); // 连接到音效音量节点

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
        if (!this.enabled || !this.ctx || !this.sfxGain) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.sfxGain); // 连接到音效音量节点

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
        if (!this.enabled || !this.ctx || !this.sfxGain) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.sfxGain); // 连接到音效音量节点

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.15);
    },

    // 播放成就解锁音效
    playAchievement() {
        if (!this.enabled || !this.ctx || !this.sfxGain) return;

        // 上升音阶表示成就解锁
        const notes = [523, 659, 784]; // C5, E5, G5 和弦
        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.connect(gain);
            gain.connect(this.sfxGain); // 连接到音效音量节点

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
        // 确保 releaseStart 不为负数
        const releaseStart = Math.max(now + attackTime + decayTime, now + duration - releaseTime);
        noteGain.gain.setValueAtTime(0.3 * sustainLevel, releaseStart);
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
            this.bgmGain.gain.value = 0.15 * this.bgmVolume;
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
    speedMode: 'normal', // 游戏速度模式: 'slow' | 'normal' | 'fast'

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
    },

    // 倒计时系统
    countdown: {
        active: false,     // 是否正在倒计时
        value: 3,          // 当前倒计时数值 (3, 2, 1, 0=GO!)
        startTime: 0,      // 倒计时开始时间
        scale: 1           // 动画缩放
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
        volumeBtn: document.getElementById('volume-btn'),
        volumePanel: document.getElementById('volume-panel'),
        volumePanelClose: document.getElementById('volume-panel-close'),
        sfxVolumeSlider: document.getElementById('sfx-volume'),
        sfxVolumeValue: document.getElementById('sfx-volume-value'),
        bgmVolumeSlider: document.getElementById('bgm-volume'),
        bgmVolumeValue: document.getElementById('bgm-volume-value'),
        vibrationSlider: document.getElementById('vibration-intensity'),
        vibrationValue: document.getElementById('vibration-value'),
        fullscreenBtn: document.getElementById('fullscreen-btn'),
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
        dailyExitBtn: document.getElementById('daily-exit-btn'),
        dailyShareBtn: document.getElementById('daily-share-btn'),
        // 无限模式相关元素
        endlessBtn: document.getElementById('endless-btn'),
        endlessScreen: document.getElementById('endless-screen'),
        endlessBackBtn: document.getElementById('endless-back-btn'),
        endlessStartBtn: document.getElementById('endless-start-btn'),
        endlessBestScore: document.getElementById('endless-best-score'),
        endlessTotalGames: document.getElementById('endless-total-games'),
        // 无限模式结束界面
        endlessGameOverScreen: document.getElementById('endless-game-over-screen'),
        endlessFinalScore: document.getElementById('endless-final-score'),
        endlessHighScore: document.getElementById('endless-high-score'),
        endlessMaxCombo: document.getElementById('endless-max-combo'),
        endlessNewRecord: document.getElementById('endless-new-record'),
        endlessRetryBtn: document.getElementById('endless-retry-btn'),
        endlessExitBtn: document.getElementById('endless-exit-btn'),
        endlessShareBtn: document.getElementById('endless-share-btn'),
        // 教程相关元素
        tutorialBtn: document.getElementById('tutorial-btn'),
        tutorialScreen: document.getElementById('tutorial-screen'),
        tutorialSkipBtn: document.getElementById('tutorial-skip-btn'),
        tutorialPrevBtn: document.getElementById('tutorial-prev-btn'),
        tutorialNextBtn: document.getElementById('tutorial-next-btn'),
        // 排行榜相关元素
        leaderboardBtn: document.getElementById('leaderboard-btn'),
        leaderboardScreen: document.getElementById('leaderboard-screen'),
        leaderboardBackBtn: document.getElementById('leaderboard-back-btn'),
        leaderboardClearBtn: document.getElementById('leaderboard-clear-btn'),
        // 统计页面相关元素
        statsBtn: document.getElementById('stats-btn'),
        statsScreen: document.getElementById('stats-screen'),
        statsBackBtn: document.getElementById('stats-back-btn'),
        statsResetBtn: document.getElementById('stats-reset-btn'),
        // 语言切换下拉
        langSelect: document.getElementById('lang-select'),
        // 返回首页按钮
        homeBtn: document.getElementById('home-btn'),
        // 主题切换按钮
        themeBtn: document.getElementById('theme-btn'),
        // 速度选择相关元素
        speedBtn: document.getElementById('speed-btn'),
        speedScreen: document.getElementById('speed-screen'),
        speedBackBtn: document.getElementById('speed-back-btn'),
        // 回放相关元素
        replayBtn: document.getElementById('replay-btn'),
        replayScreen: document.getElementById('replay-screen'),
        replayBackBtn: document.getElementById('replay-back-btn'),
        replayStartBtn: document.getElementById('replay-start-btn'),
        replayStopBtn: document.getElementById('replay-stop-btn'),
        replayIndicator: document.getElementById('replay-indicator'),
        replayNoData: document.getElementById('replay-no-data'),
        replayScore: document.getElementById('replay-score'),
        replayCombo: document.getElementById('replay-combo'),
        replayChops: document.getElementById('replay-chops'),
        replayDuration: document.getElementById('replay-duration'),
        // 分享相关元素
        shareBtn: document.getElementById('share-btn'),
        dailyShareBtn: document.getElementById('daily-share-btn'),
        sharePanel: document.getElementById('share-panel'),
        sharePanelClose: document.getElementById('share-panel-close'),
        shareCanvas: document.getElementById('share-canvas'),
        shareNativeBtn: document.getElementById('share-native-btn'),
        shareDownloadBtn: document.getElementById('share-download-btn'),
        shareCopyBtn: document.getElementById('share-copy-btn'),
        shareCopyHint: document.getElementById('share-copy-hint'),
        // 速度设置相关元素
        speedBtn: document.getElementById('speed-btn'),
        speedScreen: document.getElementById('speed-screen'),
        speedBackBtn: document.getElementById('speed-back-btn')
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

    // 加载无限模式数据
    ENDLESS_MODE.load();

    // 加载排行榜数据
    LEADERBOARD.load();

    // 加载回放数据
    REPLAY.load();

    // 加载游戏统计数据
    GAME_STATS.load();

    // 加载语言设置
    I18N.load();

    // 加载主题设置
    THEME.load();

    // 加载速度设置
    SPEED_SETTING.load();

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

    // 初始化音量控制
    initVolumeControl();

    // 初始化教程（首次运行检测、进度点点击）
    initTutorial();

    // 绘制初始画面
    draw();

    // 更新所有界面文本（应用当前语言）
    I18N.updateAllTexts();
}

// 调整画布尺寸
function resizeCanvas() {
    const container = game.canvas.parentElement;
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

    // 获取可用空间尺寸
    let availWidth, availHeight;
    if (isFullscreen) {
        // 全屏模式使用窗口尺寸
        availWidth = window.innerWidth;
        availHeight = window.innerHeight;
    } else {
        const rect = container.getBoundingClientRect();
        availWidth = rect.width;
        availHeight = rect.height;
    }

    game.canvas.width = CONFIG.WIDTH;
    game.canvas.height = CONFIG.HEIGHT;

    // CSS 缩放适配容器
    const scale = Math.min(availWidth / CONFIG.WIDTH, availHeight / CONFIG.HEIGHT);
    const scaledWidth = Math.floor(CONFIG.WIDTH * scale);
    const scaledHeight = Math.floor(CONFIG.HEIGHT * scale);

    game.canvas.style.width = `${scaledWidth}px`;
    game.canvas.style.height = `${scaledHeight}px`;
}

// 绑定事件
function bindEvents() {
    // 键盘控制
    document.addEventListener('keydown', handleKeyDown);

    // 全屏状态变化监听
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

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

    // 全屏按钮
    elements.fullscreenBtn.addEventListener('click', toggleFullscreen);

    // 皮肤选择按钮
    elements.skinsBtn.addEventListener('click', showSkinsScreen);
    elements.skinsBackBtn.addEventListener('click', hideSkinsScreen);

    // 每日挑战按钮
    elements.dailyBtn.addEventListener('click', showDailyScreen);
    elements.dailyBackBtn.addEventListener('click', hideDailyScreen);
    elements.dailyStartBtn.addEventListener('click', startDailyChallenge);
    elements.dailyRetryBtn.addEventListener('click', startDailyChallenge);
    elements.dailyExitBtn.addEventListener('click', dailyReturnToStart);

    // 无限模式按钮
    elements.endlessBtn.addEventListener('click', showEndlessScreen);
    elements.endlessBackBtn.addEventListener('click', hideEndlessScreen);
    elements.endlessStartBtn.addEventListener('click', startEndlessMode);
    elements.endlessRetryBtn.addEventListener('click', startEndlessMode);
    elements.endlessExitBtn.addEventListener('click', endlessReturnToStart);
    elements.endlessShareBtn.addEventListener('click', () => SHARE.show(false, true));

    // 排行榜按钮
    elements.leaderboardBtn.addEventListener('click', showLeaderboard);
    elements.leaderboardBackBtn.addEventListener('click', hideLeaderboard);
    elements.leaderboardClearBtn.addEventListener('click', clearLeaderboard);

    // 统计页面按钮
    elements.statsBtn.addEventListener('click', showStats);
    elements.statsBackBtn.addEventListener('click', hideStats);
    elements.statsResetBtn.addEventListener('click', resetStats);

    // 教程按钮
    elements.tutorialBtn.addEventListener('click', showTutorial);
    elements.tutorialSkipBtn.addEventListener('click', hideTutorial);
    elements.tutorialPrevBtn.addEventListener('click', tutorialPrev);
    elements.tutorialNextBtn.addEventListener('click', tutorialNext);
    // 教程导航点击
    document.querySelectorAll('.tutorial-dots .dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const step = parseInt(dot.dataset.step);
            goToTutorialStep(step);
        });
    });

    // 语言切换下拉
    elements.langSelect.addEventListener('change', (e) => {
        I18N.setLang(e.target.value);
    });

    // 返回首页按钮
    elements.homeBtn.addEventListener('click', returnToTitle);

    // 主题切换按钮
    elements.themeBtn.addEventListener('click', () => {
        THEME.toggle();
    });

    // 速度设置按钮
    elements.speedBtn.addEventListener('click', showSpeedScreen);
    elements.speedBackBtn.addEventListener('click', hideSpeedScreen);
    // 速度选项点击
    document.querySelectorAll('.speed-item').forEach(item => {
        item.addEventListener('click', () => {
            SPEED_SETTING.set(item.dataset.speed);
            // 播放音效反馈
            audio.play('chop');
        });
    });

    // 回放按钮
    elements.replayBtn.addEventListener('click', showReplayScreen);
    elements.replayBackBtn.addEventListener('click', hideReplayScreen);
    elements.replayStartBtn.addEventListener('click', startReplayPlayback);
    elements.replayStopBtn.addEventListener('click', stopReplayPlayback);

    // 分享按钮
    elements.shareBtn.addEventListener('click', () => SHARE.show(false));
    elements.dailyShareBtn.addEventListener('click', () => SHARE.show(true));
    elements.sharePanelClose.addEventListener('click', () => SHARE.hide());
    elements.shareDownloadBtn.addEventListener('click', () => SHARE.downloadImage());
    elements.shareNativeBtn.addEventListener('click', () => SHARE.nativeShare());
    elements.shareCopyBtn.addEventListener('click', () => SHARE.copyText());

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

// ============ 排行榜功能 ============

// 显示排行榜
function showLeaderboard() {
    LEADERBOARD.render();
    elements.startScreen.classList.add('hidden');
    elements.leaderboardScreen.classList.remove('hidden');
}

// 隐藏排行榜
function hideLeaderboard() {
    elements.leaderboardScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
}

// 清空排行榜
function clearLeaderboard() {
    const msg = I18N.t.clearConfirm;
    if (confirm(msg)) {
        LEADERBOARD.clear();
        LEADERBOARD.render();
    }
}

// ============ 统计页面功能 ============

// 显示统计页面
function showStats() {
    renderStats();
    elements.startScreen.classList.add('hidden');
    elements.statsScreen.classList.remove('hidden');
}

// 隐藏统计页面
function hideStats() {
    elements.statsScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
}

// 重置统计数据
function resetStats() {
    const msg = I18N.t.resetConfirm;
    if (confirm(msg)) {
        GAME_STATS.clear();
        renderStats();
    }
}

// ============ 速度设置功能 ============

// 显示速度设置界面
function showSpeedScreen() {
    elements.startScreen.classList.add('hidden');
    elements.speedScreen.classList.remove('hidden');
    SPEED_SETTING.updateUI();
}

// 隐藏速度设置界面
function hideSpeedScreen() {
    elements.speedScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
}

// ============ 回放功能 ============

// 显示回放界面
function showReplayScreen() {
    elements.startScreen.classList.add('hidden');
    elements.replayScreen.classList.remove('hidden');

    // 更新回放信息显示
    updateReplayInfo();
}

// 隐藏回放界面
function hideReplayScreen() {
    elements.replayScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
}

// 更新回放信息显示
function updateReplayInfo() {
    const info = REPLAY.getReplayInfo();

    if (info) {
        // 有回放数据
        elements.replayNoData.classList.add('hidden');
        elements.replayScore.textContent = info.score;
        elements.replayCombo.textContent = info.maxCombo;
        elements.replayChops.textContent = info.actionCount;
        elements.replayDuration.textContent = (info.duration / 1000).toFixed(1) + I18N.t.replaySeconds;
        elements.replayStartBtn.disabled = false;
    } else {
        // 无回放数据
        elements.replayNoData.classList.remove('hidden');
        elements.replayScore.textContent = '-';
        elements.replayCombo.textContent = '-';
        elements.replayChops.textContent = '-';
        elements.replayDuration.textContent = '-';
        elements.replayStartBtn.disabled = true;
    }
}

// 开始回放
function startReplayPlayback() {
    if (!REPLAY.hasReplay()) return;

    // 隐藏回放界面
    elements.replayScreen.classList.add('hidden');

    // 准备游戏状态（与 startGame 类似但不录制）
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

    // 使用回放的初始树干状态
    if (REPLAY.lastReplay.initialTrunks) {
        game.trunks = JSON.parse(JSON.stringify(REPLAY.lastReplay.initialTrunks));
    } else {
        initTrunks();
    }

    // 使用回放的皮肤（如果有）
    if (REPLAY.lastReplay.skin && SKINS.definitions.find(s => s.id === REPLAY.lastReplay.skin)) {
        SKINS.currentSkin = REPLAY.lastReplay.skin;
    }

    // 隐藏其他界面
    elements.startScreen.classList.add('hidden');
    elements.gameOverScreen.classList.add('hidden');
    elements.title.style.display = 'none';

    // 显示回放指示器
    elements.replayIndicator.classList.remove('hidden');

    // 更新 UI
    updateUI();

    // 恢复音频上下文
    audio.resume();

    // 开始背景音乐
    audio.startBGM();

    // 回放模式不使用倒计时
    game.countdown.active = false;

    // 开始回放
    REPLAY.startPlayback();

    // 开始游戏循环
    game.lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

// 停止回放
function stopReplayPlayback() {
    REPLAY.stopPlayback();
    game.isRunning = false;

    // 隐藏回放指示器
    elements.replayIndicator.classList.add('hidden');

    // 停止背景音乐
    audio.stopBGM();

    // 返回开始界面
    elements.title.style.display = 'block';
    elements.startScreen.classList.remove('hidden');
}

// 渲染统计数据到界面
function renderStats() {
    // 主要统计卡片
    document.getElementById('stats-total-games').textContent = GAME_STATS.data.totalGames;
    document.getElementById('stats-total-chops').textContent = GAME_STATS.data.totalChops;
    document.getElementById('stats-total-time').textContent = GAME_STATS.formatPlayTime(GAME_STATS.data.totalPlayTime);
    document.getElementById('stats-high-score').textContent = game.highScore || 0;
    document.getElementById('stats-best-combo').textContent = GAME_STATS.data.bestCombo;
    document.getElementById('stats-avg-score').textContent = GAME_STATS.getAverageScore();

    // 额外统计
    document.getElementById('stats-achievements').textContent =
        `${ACHIEVEMENTS.getUnlockedCount()}/${ACHIEVEMENTS.definitions.length}`;
    document.getElementById('stats-skins').textContent =
        `${SKINS.unlockedSkins.length}/${SKINS.definitions.length}`;

    // 每日挑战次数
    DAILY_CHALLENGE.load();
    document.getElementById('stats-daily-attempts').textContent = `${DAILY_CHALLENGE.todayAttempts} 次`;
}

// ============ 教程功能 ============

// 教程状态
let tutorialCurrentStep = 1;
const TUTORIAL_TOTAL_STEPS = 5;
let tutorialSeen = false;

// 初始化教程系统
function initTutorial() {
    // 加载教程状态
    tutorialSeen = localStorage.getItem('timberman_tutorial_seen') === 'true';

    // 绑定进度点点击事件
    const dots = document.querySelectorAll('.tutorial-dots .dot');
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToTutorialStep(parseInt(dot.dataset.step));
        });
    });

    // 首次运行自动显示教程
    if (!tutorialSeen) {
        setTimeout(() => showTutorial(), 500);
    }
}

// 标记教程已看过
function markTutorialSeen() {
    tutorialSeen = true;
    localStorage.setItem('timberman_tutorial_seen', 'true');
}

// 显示教程
function showTutorial() {
    tutorialCurrentStep = 1;
    updateTutorialUI();
    elements.startScreen.classList.add('hidden');
    elements.tutorialScreen.classList.remove('hidden');
    audio.playChop(0);
}

// 隐藏教程
function hideTutorial() {
    elements.tutorialScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
    markTutorialSeen();
}

// 下一步
function tutorialNext() {
    if (tutorialCurrentStep < TUTORIAL_TOTAL_STEPS) {
        tutorialCurrentStep++;
        updateTutorialUI();
    } else {
        // 最后一步，返回主界面
        hideTutorial();
    }
}

// 上一步
function tutorialPrev() {
    if (tutorialCurrentStep > 1) {
        tutorialCurrentStep--;
        updateTutorialUI();
    }
}

// 跳转到指定步骤
function goToTutorialStep(step) {
    if (step >= 1 && step <= TUTORIAL_TOTAL_STEPS) {
        tutorialCurrentStep = step;
        updateTutorialUI();
    }
}

// 更新教程 UI
function updateTutorialUI() {
    // 更新步骤显示
    const steps = document.querySelectorAll('.tutorial-step');
    steps.forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        if (stepNum === tutorialCurrentStep) {
            step.classList.remove('hidden');
        } else {
            step.classList.add('hidden');
        }
    });

    // 更新导航点
    const dots = document.querySelectorAll('.tutorial-dots .dot');
    dots.forEach(dot => {
        const stepNum = parseInt(dot.dataset.step);
        if (stepNum === tutorialCurrentStep) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // 更新按钮状态
    elements.tutorialPrevBtn.disabled = tutorialCurrentStep === 1;

    // 更新"下一步"按钮文案
    if (tutorialCurrentStep === TUTORIAL_TOTAL_STEPS) {
        elements.tutorialNextBtn.textContent = '开始游戏';
    } else {
        elements.tutorialNextBtn.textContent = '下一步';
    }
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
    const t = I18N.t;

    allSkins.forEach(skin => {
        const item = document.createElement('div');
        item.className = `skin-item ${skin.unlocked ? 'unlocked' : 'locked'} ${skin.id === currentSkin ? 'selected' : ''}`;
        item.dataset.skinId = skin.id;

        // 获取国际化的皮肤名称和描述
        const skinName = t.skinNames[skin.id] || skin.name;
        const skinDesc = t.skinDescs[skin.id] || skin.desc;

        let unlockHint = '';
        let selectedBadge = '';
        if (!skin.unlocked && skin.unlockCondition) {
            unlockHint = `<span class="skin-unlock-hint">${t.skinLocked} ${skin.unlockCondition.value}${t.skinUnlockAt}</span>`;
        } else if (skin.id === currentSkin) {
            selectedBadge = `<span class="skin-selected-badge">✓ ${I18N.currentLang === 'zh' ? '使用中' : 'Selected'}</span>`;
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
            <span class="skin-name">${skinName}</span>
            <span class="skin-desc">${skinDesc}</span>
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

    // 圣诞帽特效（弯曲帽尖 + 白色毛球）
    if (colors.hasSantaHat) {
        // 帽尖向右弯曲
        ctx.fillStyle = colors.hat;
        ctx.beginPath();
        ctx.moveTo(40, 0);
        ctx.quadraticCurveTo(50, -8, 48, -18);
        ctx.quadraticCurveTo(46, -10, 40, 0);
        ctx.fill();
        // 白色毛球
        ctx.fillStyle = isLocked ? '#AAA' : '#FFFFFF';
        ctx.beginPath();
        ctx.arc(48, -18, 5, 0, Math.PI * 2);
        ctx.fill();
        // 帽檐毛边
        ctx.fillStyle = isLocked ? '#AAA' : '#FFFFFF';
        ctx.fillRect(10, 6, 40, 8);
    }

    // 南瓜头特效
    if (colors.hasPumpkinHead) {
        // 覆盖头部为南瓜
        ctx.fillStyle = isLocked ? '#A67C00' : '#FF6F00';
        ctx.beginPath();
        ctx.arc(30, 12, 16, 0, Math.PI * 2);
        ctx.fill();
        // 南瓜纹路
        ctx.strokeStyle = isLocked ? '#8B6914' : '#E65100';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(30, -3);
        ctx.lineTo(30, 26);
        ctx.stroke();
        // 南瓜眼睛
        ctx.fillStyle = isLocked ? '#AAA' : '#FFD54F';
        if (!isLocked) {
            ctx.shadowColor = '#FFD54F';
            ctx.shadowBlur = 5;
        }
        ctx.beginPath();
        ctx.moveTo(22, 6);
        ctx.lineTo(26, 12);
        ctx.lineTo(18, 12);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(38, 6);
        ctx.lineTo(42, 12);
        ctx.lineTo(34, 12);
        ctx.closePath();
        ctx.fill();
        // 南瓜嘴巴
        ctx.beginPath();
        ctx.moveTo(22, 16);
        ctx.lineTo(25, 20);
        ctx.lineTo(28, 17);
        ctx.lineTo(32, 20);
        ctx.lineTo(35, 17);
        ctx.lineTo(38, 20);
        ctx.lineTo(38, 22);
        ctx.lineTo(22, 22);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        // 南瓜茎
        ctx.fillStyle = isLocked ? '#5D4037' : '#4E342E';
        ctx.fillRect(27, -6, 6, 8);
    }

    // 海盗帽特效
    if (colors.hasPirateHat) {
        ctx.fillStyle = isLocked ? '#333' : '#1A1A1A';
        ctx.beginPath();
        ctx.moveTo(5, 10);
        ctx.lineTo(55, 10);
        ctx.lineTo(48, -3);
        ctx.lineTo(30, -10);
        ctx.lineTo(12, -3);
        ctx.closePath();
        ctx.fill();
        // 金色帽边
        ctx.fillStyle = isLocked ? '#AA9900' : '#FFD700';
        ctx.fillRect(8, 6, 44, 4);
        // 骷髅标志
        ctx.fillStyle = isLocked ? '#CCC' : '#FFFFFF';
        ctx.beginPath();
        ctx.arc(30, 0, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isLocked ? '#333' : '#1A1A1A';
        ctx.fillRect(27, -2, 2, 2);
        ctx.fillRect(31, -2, 2, 2);
    }

    // 海盗眼罩
    if (colors.hasEyePatch) {
        ctx.fillStyle = isLocked ? '#333' : '#1A1A1A';
        ctx.fillRect(33, 10, 8, 6);
        // 眼罩带子
        ctx.strokeStyle = isLocked ? '#444' : '#333';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(41, 12);
        ctx.lineTo(48, 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(33, 12);
        ctx.lineTo(15, 10);
        ctx.stroke();
    }

    // 雪人冰霜光环
    if (colors.hasSnowEffect && !isLocked) {
        ctx.strokeStyle = 'rgba(135, 206, 250, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#87CEEB';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(30, 35, 40, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    // 雪人胡萝卜鼻子
    if (colors.noseColor) {
        ctx.fillStyle = isLocked ? '#AA6644' : colors.noseColor;
        ctx.beginPath();
        ctx.moveTo(30, 16);
        ctx.lineTo(38, 18);
        ctx.lineTo(30, 20);
        ctx.closePath();
        ctx.fill();
    }

    // 财神帽特效（中国新年）
    if (colors.hasChineseHat) {
        // 财神帽主体（红色圆顶帽）
        ctx.fillStyle = isLocked ? '#8B4513' : '#C62828';
        ctx.beginPath();
        ctx.arc(30, -2, 16, Math.PI, 0, false);
        ctx.fill();
        // 金色帽边
        ctx.fillStyle = isLocked ? '#AA8800' : '#FFD700';
        ctx.fillRect(12, 6, 36, 7);
        // 帽子顶部金球
        if (!isLocked) {
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 6;
        }
        ctx.beginPath();
        ctx.arc(30, -16, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // 帽子正面福字装饰
        ctx.fillRect(26, -8, 8, 8);
        ctx.fillStyle = isLocked ? '#8B4513' : '#C62828';
        ctx.fillRect(28, -6, 4, 4);
    }

    // 财神金色光晕
    if (colors.hasGoldGlow && !isLocked) {
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(30, 35, 45, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    // 丘比特翅膀
    if (colors.hasWings) {
        ctx.fillStyle = isLocked ? 'rgba(200, 200, 200, 0.7)' : 'rgba(255, 255, 255, 0.85)';
        if (!isLocked) {
            ctx.shadowColor = '#F48FB1';
            ctx.shadowBlur = 4;
        }
        // 左翅膀
        ctx.beginPath();
        ctx.moveTo(10, 35);
        ctx.quadraticCurveTo(-8, 22, -4, 42);
        ctx.quadraticCurveTo(0, 35, 10, 35);
        ctx.fill();
        // 右翅膀
        ctx.beginPath();
        ctx.moveTo(50, 35);
        ctx.quadraticCurveTo(68, 22, 64, 42);
        ctx.quadraticCurveTo(60, 35, 50, 35);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // 丘比特爱心光环
    if (colors.hasHeartAura && !isLocked) {
        ctx.fillStyle = 'rgba(233, 30, 99, 0.5)';
        ctx.shadowColor = '#E91E63';
        ctx.shadowBlur = 5;
        // 头顶小爱心
        const heartX = 30;
        const heartY = -20;
        const heartSize = 5;
        ctx.beginPath();
        ctx.moveTo(heartX, heartY + heartSize / 4);
        ctx.bezierCurveTo(heartX, heartY, heartX - heartSize / 2, heartY, heartX - heartSize / 2, heartY + heartSize / 4);
        ctx.bezierCurveTo(heartX - heartSize / 2, heartY + heartSize / 2, heartX, heartY + heartSize * 0.75, heartX, heartY + heartSize);
        ctx.bezierCurveTo(heartX, heartY + heartSize * 0.75, heartX + heartSize / 2, heartY + heartSize / 2, heartX + heartSize / 2, heartY + heartSize / 4);
        ctx.bezierCurveTo(heartX + heartSize / 2, heartY, heartX, heartY, heartX, heartY + heartSize / 4);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // 复活节兔子耳朵
    if (colors.hasBunnyEars) {
        ctx.fillStyle = isLocked ? '#CCC' : '#FFFFFF';
        if (!isLocked) {
            ctx.shadowColor = '#F48FB1';
            ctx.shadowBlur = 2;
        }
        // 左耳
        ctx.beginPath();
        ctx.ellipse(18, -16, 5, 15, -0.2, 0, Math.PI * 2);
        ctx.fill();
        // 右耳
        ctx.beginPath();
        ctx.ellipse(42, -16, 5, 15, 0.2, 0, Math.PI * 2);
        ctx.fill();
        // 耳朵内部粉色
        ctx.fillStyle = isLocked ? '#AAA' : '#F8BBD0';
        ctx.beginPath();
        ctx.ellipse(18, -14, 2.5, 10, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(42, -14, 2.5, 10, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // 复活节彩蛋装饰
    if (colors.hasEasterEgg) {
        ctx.fillStyle = isLocked ? '#AA9900' : '#FFD54F';
        ctx.beginPath();
        ctx.ellipse(30, 45, 4, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        // 彩蛋条纹
        ctx.strokeStyle = isLocked ? '#888' : '#81D4FA';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(26, 43);
        ctx.lineTo(34, 43);
        ctx.stroke();
        ctx.strokeStyle = isLocked ? '#888' : '#F48FB1';
        ctx.beginPath();
        ctx.moveTo(26, 47);
        ctx.lineTo(34, 47);
        ctx.stroke();
    }

    // 复活节兔子粉色鼻子
    if (colors.noseColor && colors.hasBunnyEars) {
        ctx.fillStyle = isLocked ? '#AAA' : colors.noseColor;
        ctx.beginPath();
        ctx.ellipse(30, 18, 3, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // 夏日草帽特效
    if (colors.hasStrawHat) {
        // 草帽主体
        ctx.fillStyle = isLocked ? '#CCC' : '#FFF59D';
        ctx.beginPath();
        ctx.ellipse(30, 6, 28, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        // 帽顶
        ctx.fillStyle = isLocked ? '#BBB' : '#FFF176';
        ctx.beginPath();
        ctx.ellipse(30, -2, 15, 8, 0, Math.PI, 0);
        ctx.fill();
        // 草帽纹理
        ctx.strokeStyle = isLocked ? '#DDD' : '#FFECB3';
        ctx.lineWidth = 0.8;
        for (let i = -12; i <= 12; i += 4) {
            ctx.beginPath();
            ctx.moveTo(18 + i, -6);
            ctx.lineTo(18 + i, 2);
            ctx.stroke();
        }
        // 帽带
        ctx.fillStyle = isLocked ? '#888' : '#FF7043';
        ctx.fillRect(14, 0, 32, 3);
    }

    // 夏日太阳镜
    if (colors.hasSunglasses) {
        ctx.fillStyle = isLocked ? '#444' : '#212121';
        // 左镜片
        ctx.fillRect(18, 10, 9, 6);
        // 右镜片
        ctx.fillRect(33, 10, 9, 6);
        // 镜架
        ctx.fillRect(27, 12, 6, 2);
        // 镜腿
        ctx.fillRect(15, 12, 4, 1.5);
        ctx.fillRect(41, 12, 4, 1.5);
        // 镜片反光
        if (!isLocked) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(19, 11, 3, 2);
            ctx.fillRect(34, 11, 3, 2);
        }
    }

    // 夏日花衬衫图案
    if (colors.hasFlowerShirt) {
        ctx.fillStyle = isLocked ? '#AA9900' : '#FFEB3B';
        ctx.beginPath();
        ctx.arc(22, 38, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(38, 42, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = isLocked ? '#888' : '#E91E63';
        ctx.beginPath();
        ctx.arc(30, 50, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // 小叶子
        ctx.fillStyle = isLocked ? '#666' : '#4CAF50';
        ctx.beginPath();
        ctx.ellipse(25, 40, 1.5, 3, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(35, 44, 1.5, 3, -0.5, 0, Math.PI * 2);
        ctx.fill();
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

// 初始化音量控制
function initVolumeControl() {
    // 加载音量和振动强度设置并更新滑块
    audio.loadVolume();
    haptics.loadIntensity();
    updateVolumeSliders();

    // 音量设置按钮点击 - 切换面板显示
    elements.volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleVolumePanel();
    });

    // 关闭按钮
    elements.volumePanelClose.addEventListener('click', () => {
        closeVolumePanel();
    });

    // 点击面板外部关闭
    document.addEventListener('click', (e) => {
        if (!elements.volumePanel.classList.contains('hidden') &&
            !elements.volumePanel.contains(e.target) &&
            e.target !== elements.volumeBtn) {
            closeVolumePanel();
        }
    });

    // 音效音量滑块
    elements.sfxVolumeSlider.addEventListener('input', (e) => {
        const volume = parseInt(e.target.value) / 100;
        audio.setSfxVolume(volume);
        elements.sfxVolumeValue.textContent = e.target.value + '%';
        // 播放测试音效
        audio.playChop(0);
    });

    // 背景音乐音量滑块
    elements.bgmVolumeSlider.addEventListener('input', (e) => {
        const volume = parseInt(e.target.value) / 100;
        audio.setBgmVolume(volume);
        elements.bgmVolumeValue.textContent = e.target.value + '%';
    });

    // 振动强度滑块
    if (elements.vibrationSlider) {
        elements.vibrationSlider.addEventListener('input', (e) => {
            const intensity = parseInt(e.target.value) / 100;
            haptics.setIntensity(intensity);
            elements.vibrationValue.textContent = e.target.value + '%';
            // 测试振动反馈
            haptics.test();
        });
    }

    // 音效预览按钮
    const sfxPreviewBtns = document.querySelectorAll('.sfx-preview-btn');
    sfxPreviewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const sfxType = btn.dataset.sfx;

            // 添加播放动画
            btn.classList.add('playing');
            setTimeout(() => btn.classList.remove('playing'), 300);

            // 播放对应音效
            audio.init();
            audio.resume();

            switch (sfxType) {
                case 'chop':
                    audio.playChop(5); // 带一点连击效果
                    break;
                case 'gameover':
                    audio.playGameOver();
                    break;
                case 'warning':
                    audio.playTimeWarning();
                    break;
                case 'achievement':
                    audio.playAchievement();
                    break;
            }
        });
    });
}

// 更新音量滑块显示
function updateVolumeSliders() {
    const sfxPercent = Math.round(audio.sfxVolume * 100);
    const bgmPercent = Math.round(audio.bgmVolume * 100);
    const vibrationPercent = Math.round(haptics.intensity * 100);
    elements.sfxVolumeSlider.value = sfxPercent;
    elements.sfxVolumeValue.textContent = sfxPercent + '%';
    elements.bgmVolumeSlider.value = bgmPercent;
    elements.bgmVolumeValue.textContent = bgmPercent + '%';
    if (elements.vibrationSlider) {
        elements.vibrationSlider.value = vibrationPercent;
        elements.vibrationValue.textContent = vibrationPercent + '%';
    }
}

// 切换音量面板显示
function toggleVolumePanel() {
    const isHidden = elements.volumePanel.classList.contains('hidden');
    if (isHidden) {
        openVolumePanel();
    } else {
        closeVolumePanel();
    }
}

// 打开音量面板
function openVolumePanel() {
    elements.volumePanel.classList.remove('hidden');
    elements.volumeBtn.classList.add('active');
}

// 关闭音量面板
function closeVolumePanel() {
    elements.volumePanel.classList.add('hidden');
    elements.volumeBtn.classList.remove('active');
}

// 切换全屏模式
function toggleFullscreen() {
    const container = document.getElementById('game-container');

    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        // 进入全屏
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            // Safari 支持
            container.webkitRequestFullscreen();
        }
    } else {
        // 退出全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

// 处理全屏状态变化
function handleFullscreenChange() {
    updateFullscreenButton();
    // 延迟调用 resizeCanvas，等待浏览器完成全屏切换
    setTimeout(() => {
        resizeCanvas();
        // 全屏切换后重新绘制
        if (!game.isRunning) {
            draw();
        }
    }, 100);
}

// 更新全屏按钮显示
function updateFullscreenButton() {
    const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    if (isFullscreen) {
        elements.fullscreenBtn.textContent = '⛶';
        elements.fullscreenBtn.classList.add('active');
        elements.fullscreenBtn.title = '退出全屏';
    } else {
        elements.fullscreenBtn.textContent = '⛶';
        elements.fullscreenBtn.classList.remove('active');
        elements.fullscreenBtn.title = '全屏模式';
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

    // F 键切换全屏（任何时候都可用）
    if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
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
    const speedConfig = CONFIG.SPEED_MODES[game.speedMode] || CONFIG.SPEED_MODES.normal;
    return CONFIG.TIME_DECAY * (1 + level * CONFIG.DIFFICULTY.DECAY_MULTIPLIER) * speedConfig.decayMultiplier;
}

// 获取当前砍树时间奖励
function getCurrentTimeBonus() {
    const level = getDifficultyLevel();
    const speedConfig = CONFIG.SPEED_MODES[game.speedMode] || CONFIG.SPEED_MODES.normal;
    const bonus = CONFIG.TIME_BONUS - level * CONFIG.DIFFICULTY.TIME_BONUS_DECAY;
    return Math.max(bonus * speedConfig.bonusMultiplier, 2); // 最少奖励 2 点时间
}

// 开始游戏
function startGame() {
    // 恢复音频上下文（需要用户交互）
    audio.resume();

    // 记录游戏开始时间（用于统计）
    GAME_STATS.startSession();

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

    // 开始录制回放（普通模式且非回放模式时）
    if (!REPLAY.isPlaying) {
        REPLAY.startRecording(game.trunks);
    }

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

    // 启动倒计时
    game.countdown.active = true;
    game.countdown.value = 3;
    game.countdown.startTime = performance.now();
    game.countdown.scale = 1;

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

    // 记录游戏开始时间（用于统计）
    GAME_STATS.startSession();

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

    // 启动倒计时
    game.countdown.active = true;
    game.countdown.value = 3;
    game.countdown.startTime = performance.now();
    game.countdown.scale = 1;

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

// 从普通游戏结束界面返回开始界面
function returnToTitle() {
    elements.gameOverScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
    elements.title.style.display = 'block';
}

// ============ 无限模式函数 ============

// 开始无限模式
function startEndlessMode() {
    // 开始无限模式
    ENDLESS_MODE.start();

    // 恢复音频上下文
    audio.resume();

    // 记录游戏开始时间（用于统计）
    GAME_STATS.startSession();

    // 重置状态
    game.score = 0;
    game.timeLeft = CONFIG.INITIAL_TIME; // 无限模式也初始化时间（但不会衰减）
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
    elements.endlessScreen.classList.add('hidden');
    elements.endlessGameOverScreen.classList.add('hidden');
    elements.title.style.display = 'none';

    // 添加无限模式样式类（隐藏时间条）
    document.getElementById('game-container').classList.add('endless-mode');

    // 更新 UI
    updateUI();

    // 显示触摸区域指示
    touchZones.show();
    setTimeout(() => touchZones.startFadeOut(), 2000);

    // 开始背景音乐
    audio.startBGM();

    // 启动倒计时
    game.countdown.active = true;
    game.countdown.value = 3;
    game.countdown.startTime = performance.now();
    game.countdown.scale = 1;

    // 开始游戏循环
    game.lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

// 显示无限模式界面
function showEndlessScreen() {
    const info = ENDLESS_MODE.getInfo();
    elements.endlessBestScore.textContent = info.highScore;
    elements.endlessTotalGames.textContent = info.totalGames;

    elements.startScreen.classList.add('hidden');
    elements.endlessScreen.classList.remove('hidden');
}

// 隐藏无限模式界面
function hideEndlessScreen() {
    elements.endlessScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
}

// 从无限模式结束界面返回开始界面
function endlessReturnToStart() {
    elements.endlessGameOverScreen.classList.add('hidden');
    elements.startScreen.classList.remove('hidden');
    elements.title.style.display = 'block';
    // 移除无限模式样式类
    document.getElementById('game-container').classList.remove('endless-mode');
}

// 初始化树干
function initTrunks() {
    game.trunks = [];
    game.lastBranches = []; // 记录最近的树枝方向，防止必死局
    for (let i = 0; i < CONFIG.TRUNK_COUNT; i++) {
        game.trunks.push({
            branch: generateBranch(i < 3) // 底部三节不生成树枝，给玩家更多反应时间
        });
    }
}

// 最近两次为非 none 且左右相反时，下一次应强制 none（防必死局）
function shouldForceNoneBranch(history) {
    if (!history || history.length < 2) return false;
    const len = history.length;
    const last = history[len - 1];
    const prev = history[len - 2];
    return last !== 'none' && prev !== 'none' && last !== prev;
}

// 生成树枝 (随机左/右/无)
function generateBranch(forceNone = false) {
    if (forceNone) return 'none';

    // 每日挑战模式使用预生成的序列
    if (DAILY_CHALLENGE.isActive) {
        return DAILY_CHALLENGE.getNextBranch(forceNone);
    }

    // 检查最近的树枝，防止连续交替导致必死局
    // 如果最近2个树枝是 左-右 或 右-左 的交替模式，强制生成 none
    if (shouldForceNoneBranch(game.lastBranches)) {
        // 已经有连续交替，这次强制无树枝，给玩家喘息
        game.lastBranches.push('none');
        if (game.lastBranches.length > 4) game.lastBranches.shift();
        return 'none';
    }

    // 普通模式随机生成
    const rand = Math.random();
    let branch;
    if (rand < 0.3) branch = 'left';
    else if (rand < 0.6) branch = 'right';
    else branch = 'none';

    // 记录树枝历史
    if (!game.lastBranches) game.lastBranches = [];
    game.lastBranches.push(branch);
    if (game.lastBranches.length > 4) game.lastBranches.shift();

    return branch;
}

// 砍树动作
function chop(side) {
    // 倒计时期间禁止砍树
    if (game.countdown.active) return;
    if (game.player.isChopping) return;

    // 记录回放操作（非回放模式时）
    if (!REPLAY.isPlaying) {
        REPLAY.recordAction(side);
    }

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

    // 结束回放录制（普通模式，非回放模式时）
    if (!DAILY_CHALLENGE.isActive && !ENDLESS_MODE.isActive && !REPLAY.isPlaying) {
        REPLAY.endRecording(game.score, game.combo.maxCount);
    }

    // 停止回放（如果正在回放）
    if (REPLAY.isPlaying) {
        REPLAY.stopPlayback();
    }

    // 更新游戏统计
    GAME_STATS.endSession(game.score, game.combo.maxCount);

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
    const isEndless = ENDLESS_MODE.isActive;

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
    } else if (isEndless) {
        // 无限模式处理
        const isNewRecord = ENDLESS_MODE.updateHighScore(game.score);
        ENDLESS_MODE.end();

        // 更新无限模式结束界面
        elements.endlessFinalScore.textContent = game.score;
        elements.endlessHighScore.textContent = ENDLESS_MODE.highScore;
        elements.endlessMaxCombo.textContent = game.combo.maxCount;

        // 新纪录标识
        if (isNewRecord) {
            elements.endlessNewRecord.classList.remove('hidden');
        } else {
            elements.endlessNewRecord.classList.add('hidden');
        }

        // 显示无限模式结束界面
        elements.endlessGameOverScreen.classList.remove('hidden');
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

        // 保存成绩到排行榜（普通模式才记录）
        const level = getDifficultyLevel() + 1;
        LEADERBOARD.add(game.score, game.combo.maxCount, level, SKINS.currentSkin);

        // 更新游戏统计
        GAME_STATS.endSession(game.score, game.combo.maxCount);

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

    // 回放模式：执行回放操作
    if (REPLAY.isPlaying) {
        REPLAY.updatePlayback();
    }

    // 更新
    update(deltaTime);

    // 绘制
    draw();

    // 继续循环
    requestAnimationFrame(gameLoop);
}

// 更新游戏状态
function update(deltaTime) {
    // 更新倒计时
    if (game.countdown.active) {
        const elapsed = performance.now() - game.countdown.startTime;
        const phase = Math.floor(elapsed / 800); // 每800ms切换一次

        if (phase === 0) {
            game.countdown.value = 3;
        } else if (phase === 1) {
            game.countdown.value = 2;
        } else if (phase === 2) {
            game.countdown.value = 1;
        } else if (phase === 3) {
            game.countdown.value = 0; // GO!
        } else {
            // 倒计时结束
            game.countdown.active = false;
        }

        // 计算缩放动画（每阶段从大到小）
        const phaseProgress = (elapsed % 800) / 800;
        game.countdown.scale = 1.5 - phaseProgress * 0.5;

        // 倒计时期间不更新时间和其他逻辑，只绘制
        return;
    }

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

    // 减少时间（使用动态衰减速度）- 无限模式不减时间
    if (!ENDLESS_MODE.isActive) {
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

    // 绘制倒计时
    if (game.countdown.active) {
        drawCountdown();
    }
}

// 绘制倒计时
function drawCountdown() {
    const ctx = game.ctx;
    const centerX = CONFIG.WIDTH / 2;
    const centerY = CONFIG.HEIGHT / 2 - 50;

    // 半透明背景遮罩
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

    // 倒计时文本
    const text = game.countdown.value === 0 ? I18N.t.countdownGo : game.countdown.value.toString();
    const scale = game.countdown.scale;
    const baseSize = game.countdown.value === 0 ? 60 : 100;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);

    // 文字阴影
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    // 文字颜色
    if (game.countdown.value === 0) {
        // GO! - 绿色渐变
        const gradient = ctx.createLinearGradient(0, -baseSize/2, 0, baseSize/2);
        gradient.addColorStop(0, '#4CAF50');
        gradient.addColorStop(1, '#2E7D32');
        ctx.fillStyle = gradient;
    } else {
        // 3, 2, 1 - 白色
        ctx.fillStyle = '#FFFFFF';
    }

    ctx.font = `bold ${baseSize}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 描边
    ctx.strokeStyle = game.countdown.value === 0 ? '#1B5E20' : '#333';
    ctx.lineWidth = 4;
    ctx.strokeText(text, 0, 0);
    ctx.fillText(text, 0, 0);

    ctx.restore();
}

// 绘制背景
function drawBackground() {
    const ctx = game.ctx;
    const isDark = THEME.current === 'dark';

    // 天空渐变 - 根据主题调整颜色
    const gradient = ctx.createLinearGradient(0, 0, 0, CONFIG.HEIGHT);
    if (isDark) {
        // 暗色主题：夜空渐变
        gradient.addColorStop(0, '#0f0f23');
        gradient.addColorStop(0.3, '#1a1a2e');
        gradient.addColorStop(0.6, '#16213e');
        gradient.addColorStop(1, '#1a2a3a');
    } else {
        // 亮色主题：日间天空
        gradient.addColorStop(0, '#7EC8E3');
        gradient.addColorStop(0.4, '#A8E6CF');
        gradient.addColorStop(0.7, '#88C070');
        gradient.addColorStop(1, '#5D8A4D');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CONFIG.WIDTH, CONFIG.HEIGHT);

    // 太阳/月亮
    if (isDark) {
        drawMoon(350, 60, 25);
        drawStars();
    } else {
        drawSun(350, 60, 30);
    }

    // 远处的山（多层次）
    // 最远的山
    ctx.fillStyle = isDark ? '#2a3a4a' : '#6B9D5A';
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
    ctx.fillStyle = isDark ? '#1e2a3a' : '#5D8A4D';
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

    // 云朵（暗色主题下更暗淡）
    ctx.fillStyle = isDark ? 'rgba(100, 120, 140, 0.3)' : 'rgba(255, 255, 255, 0.9)';
    drawCloud(50, 80, 30);
    drawCloud(300, 50, 25);
    drawCloud(180, 120, 20);

    // 飞鸟（仅亮色主题显示）
    if (!isDark) {
        drawBirds();
    }
}

// 绘制月亮（暗色主题）
function drawMoon(x, y, radius) {
    const ctx = game.ctx;

    // 月亮光晕
    const glowGradient = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 2.5);
    glowGradient.addColorStop(0, 'rgba(200, 220, 255, 0.3)');
    glowGradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // 月亮主体
    ctx.fillStyle = '#E8E8E8';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // 月亮阴影（月牙效果）
    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    ctx.arc(x + 8, y - 5, radius * 0.85, 0, Math.PI * 2);
    ctx.fill();

    // 月亮高光
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x - 6, y - 6, radius * 0.15, 0, Math.PI * 2);
    ctx.fill();
}

// 绘制星星（暗色主题）
function drawStars() {
    const ctx = game.ctx;
    ctx.fillStyle = '#FFFFFF';

    // 固定位置的星星
    const stars = [
        { x: 30, y: 40, size: 2 },
        { x: 80, y: 80, size: 1.5 },
        { x: 150, y: 30, size: 2 },
        { x: 200, y: 90, size: 1 },
        { x: 250, y: 50, size: 1.5 },
        { x: 280, y: 110, size: 2 },
        { x: 100, y: 140, size: 1 },
        { x: 320, y: 130, size: 1.5 },
        { x: 380, y: 100, size: 1 },
        { x: 60, y: 180, size: 1 },
        { x: 170, y: 160, size: 2 },
        { x: 240, y: 170, size: 1 },
        { x: 50, y: 250, size: 1.5 },
        { x: 130, y: 220, size: 1 },
        { x: 300, y: 200, size: 1.5 }
    ];

    // 绘制星星（带闪烁效果）
    const time = performance.now() * 0.001;
    stars.forEach((star, i) => {
        const twinkle = Math.sin(time * 2 + i) * 0.3 + 0.7;
        ctx.globalAlpha = twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
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

    // 圣诞帽特效（弯曲帽尖 + 白色毛球）
    if (colors.hasSantaHat) {
        // 帽尖向右弯曲
        ctx.fillStyle = colors.hat;
        ctx.beginPath();
        ctx.moveTo(x + 40, y);
        ctx.quadraticCurveTo(x + 50, y - 8, x + 48, y - 18);
        ctx.quadraticCurveTo(x + 46, y - 10, x + 40, y);
        ctx.fill();
        // 白色毛球
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x + 48, y - 18, 5, 0, Math.PI * 2);
        ctx.fill();
        // 帽檐毛边（覆盖原有帽檐）
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x + 10, y + 6, 40, 8);
    }

    // 南瓜头特效
    if (colors.hasPumpkinHead) {
        // 覆盖头部为南瓜
        ctx.fillStyle = '#FF6F00';
        ctx.beginPath();
        ctx.arc(x + 30, y + 12, 18, 0, Math.PI * 2);
        ctx.fill();
        // 南瓜纹路
        ctx.strokeStyle = '#E65100';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 30, y - 5);
        ctx.lineTo(x + 30, y + 28);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 15, y + 12);
        ctx.quadraticCurveTo(x + 30, y + 5, x + 45, y + 12);
        ctx.stroke();
        // 南瓜眼睛（三角形发光）
        ctx.fillStyle = '#FFD54F';
        ctx.shadowColor = '#FFD54F';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(x + 22, y + 6);
        ctx.lineTo(x + 27, y + 14);
        ctx.lineTo(x + 17, y + 14);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 38, y + 6);
        ctx.lineTo(x + 43, y + 14);
        ctx.lineTo(x + 33, y + 14);
        ctx.closePath();
        ctx.fill();
        // 南瓜嘴巴（锯齿状）
        ctx.beginPath();
        ctx.moveTo(x + 20, y + 18);
        ctx.lineTo(x + 24, y + 24);
        ctx.lineTo(x + 28, y + 19);
        ctx.lineTo(x + 32, y + 24);
        ctx.lineTo(x + 36, y + 19);
        ctx.lineTo(x + 40, y + 24);
        ctx.lineTo(x + 40, y + 26);
        ctx.lineTo(x + 20, y + 26);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        // 南瓜茎
        ctx.fillStyle = '#4E342E';
        ctx.fillRect(x + 27, y - 8, 6, 10);
    }

    // 海盗帽特效
    if (colors.hasPirateHat) {
        // 三角海盗帽
        ctx.fillStyle = '#1A1A1A';
        ctx.beginPath();
        ctx.moveTo(x + 5, y + 10);
        ctx.lineTo(x + 55, y + 10);
        ctx.lineTo(x + 48, y - 5);
        ctx.lineTo(x + 30, y - 12);
        ctx.lineTo(x + 12, y - 5);
        ctx.closePath();
        ctx.fill();
        // 金色帽边
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(x + 8, y + 6, 44, 5);
        // 骷髅标志
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x + 30, y - 1, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(x + 26, y - 3, 3, 3);
        ctx.fillRect(x + 31, y - 3, 3, 3);
        ctx.fillRect(x + 28, y + 2, 4, 2);
    }

    // 海盗眼罩
    if (colors.hasEyePatch) {
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(x + 33, y + 10, 9, 7);
        // 眼罩带子
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + 42, y + 13);
        ctx.lineTo(x + 50, y + 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 33, y + 13);
        ctx.lineTo(x + 15, y + 10);
        ctx.stroke();
    }

    // 雪人冰霜光环
    if (colors.hasSnowEffect) {
        ctx.strokeStyle = 'rgba(135, 206, 250, 0.5)';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#87CEEB';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(x + 30, y + 35, 50, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    // 雪人胡萝卜鼻子
    if (colors.noseColor) {
        ctx.fillStyle = colors.noseColor;
        ctx.beginPath();
        ctx.moveTo(x + 30, y + 16);
        ctx.lineTo(x + 40, y + 18);
        ctx.lineTo(x + 30, y + 20);
        ctx.closePath();
        ctx.fill();
    }

    // 财神帽特效（中国新年）
    if (colors.hasChineseHat) {
        // 财神帽主体（红色圆顶帽）
        ctx.fillStyle = '#C62828';
        ctx.beginPath();
        ctx.arc(x + 30, y - 2, 18, Math.PI, 0, false);
        ctx.fill();
        // 金色帽边
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(x + 10, y + 6, 40, 8);
        // 帽子顶部金球
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x + 30, y - 18, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // 帽子正面福字装饰（简化版）
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(x + 26, y - 8, 8, 8);
        ctx.fillStyle = '#C62828';
        ctx.fillRect(x + 28, y - 6, 4, 4);
    }

    // 财神金色光晕
    if (colors.hasGoldGlow) {
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(x + 30, y + 35, 55, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    // 丘比特翅膀
    if (colors.hasWings) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowColor = '#F48FB1';
        ctx.shadowBlur = 5;
        // 左翅膀
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 35);
        ctx.quadraticCurveTo(x - 15, y + 20, x - 10, y + 45);
        ctx.quadraticCurveTo(x - 5, y + 35, x + 10, y + 35);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 38);
        ctx.quadraticCurveTo(x - 12, y + 28, x - 5, y + 50);
        ctx.quadraticCurveTo(x, y + 40, x + 10, y + 38);
        ctx.fill();
        // 右翅膀
        ctx.beginPath();
        ctx.moveTo(x + 50, y + 35);
        ctx.quadraticCurveTo(x + 75, y + 20, x + 70, y + 45);
        ctx.quadraticCurveTo(x + 65, y + 35, x + 50, y + 35);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 50, y + 38);
        ctx.quadraticCurveTo(x + 72, y + 28, x + 65, y + 50);
        ctx.quadraticCurveTo(x + 60, y + 40, x + 50, y + 38);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // 丘比特爱心光环
    if (colors.hasHeartAura) {
        ctx.fillStyle = 'rgba(233, 30, 99, 0.6)';
        ctx.shadowColor = '#E91E63';
        ctx.shadowBlur = 8;
        // 头顶小爱心
        const heartX = x + 30;
        const heartY = y - 25;
        const heartSize = 6;
        ctx.beginPath();
        ctx.moveTo(heartX, heartY + heartSize / 4);
        ctx.bezierCurveTo(heartX, heartY, heartX - heartSize / 2, heartY, heartX - heartSize / 2, heartY + heartSize / 4);
        ctx.bezierCurveTo(heartX - heartSize / 2, heartY + heartSize / 2, heartX, heartY + heartSize * 0.75, heartX, heartY + heartSize);
        ctx.bezierCurveTo(heartX, heartY + heartSize * 0.75, heartX + heartSize / 2, heartY + heartSize / 2, heartX + heartSize / 2, heartY + heartSize / 4);
        ctx.bezierCurveTo(heartX + heartSize / 2, heartY, heartX, heartY, heartX, heartY + heartSize / 4);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // 复活节兔子耳朵
    if (colors.hasBunnyEars) {
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#F48FB1';
        ctx.shadowBlur = 3;
        // 左耳
        ctx.beginPath();
        ctx.ellipse(x + 18, y - 18, 6, 18, -0.2, 0, Math.PI * 2);
        ctx.fill();
        // 右耳
        ctx.beginPath();
        ctx.ellipse(x + 42, y - 18, 6, 18, 0.2, 0, Math.PI * 2);
        ctx.fill();
        // 耳朵内部粉色
        ctx.fillStyle = '#F8BBD0';
        ctx.beginPath();
        ctx.ellipse(x + 18, y - 16, 3, 12, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x + 42, y - 16, 3, 12, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // 复活节彩蛋装饰（身体上的花纹）
    if (colors.hasEasterEgg) {
        // 身上绘制彩蛋图案
        ctx.fillStyle = '#FFD54F';
        ctx.beginPath();
        ctx.ellipse(x + 30, y + 45, 5, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        // 彩蛋条纹
        ctx.strokeStyle = '#81D4FA';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 25, y + 43);
        ctx.lineTo(x + 35, y + 43);
        ctx.stroke();
        ctx.strokeStyle = '#F48FB1';
        ctx.beginPath();
        ctx.moveTo(x + 25, y + 47);
        ctx.lineTo(x + 35, y + 47);
        ctx.stroke();
    }

    // 复活节兔子粉色鼻子
    if (colors.noseColor && colors.hasBunnyEars) {
        ctx.fillStyle = colors.noseColor;
        ctx.beginPath();
        ctx.ellipse(x + 30, y + 18, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // 夏日草帽特效
    if (colors.hasStrawHat) {
        // 草帽主体（大圆帽檐）
        ctx.fillStyle = '#FFF59D';
        ctx.beginPath();
        ctx.ellipse(x + 30, y + 6, 32, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        // 帽顶
        ctx.fillStyle = '#FFF176';
        ctx.beginPath();
        ctx.ellipse(x + 30, y - 2, 18, 10, 0, Math.PI, 0);
        ctx.fill();
        // 草帽纹理
        ctx.strokeStyle = '#FFECB3';
        ctx.lineWidth = 1;
        for (let i = -15; i <= 15; i += 5) {
            ctx.beginPath();
            ctx.moveTo(x + 15 + i, y - 8);
            ctx.lineTo(x + 15 + i, y + 2);
            ctx.stroke();
        }
        // 帽带
        ctx.fillStyle = '#FF7043';
        ctx.fillRect(x + 12, y + 0, 36, 4);
    }

    // 夏日太阳镜
    if (colors.hasSunglasses) {
        ctx.fillStyle = '#212121';
        // 左镜片
        ctx.fillRect(x + 18, y + 10, 10, 7);
        // 右镜片
        ctx.fillRect(x + 32, y + 10, 10, 7);
        // 镜架
        ctx.fillRect(x + 28, y + 12, 4, 2);
        // 镜腿
        ctx.fillRect(x + 15, y + 12, 4, 2);
        ctx.fillRect(x + 41, y + 12, 4, 2);
        // 镜片反光
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(x + 19, y + 11, 3, 2);
        ctx.fillRect(x + 33, y + 11, 3, 2);
    }

    // 夏日花衬衫图案
    if (colors.hasFlowerShirt) {
        // 衬衫上的花朵图案
        ctx.fillStyle = '#FFEB3B';
        ctx.beginPath();
        ctx.arc(x + 22, y + 38, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 38, y + 42, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#E91E63';
        ctx.beginPath();
        ctx.arc(x + 30, y + 50, 3, 0, Math.PI * 2);
        ctx.fill();
        // 小叶子
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.ellipse(x + 25, y + 40, 2, 4, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x + 35, y + 44, 2, 4, -0.5, 0, Math.PI * 2);
        ctx.fill();
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
