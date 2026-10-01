# Timberman · 伐木人

纯 HTML、CSS 和 JavaScript 实现的浏览器砍树游戏。选择树干两侧砍树、躲避树枝，在时间耗尽前争取更高分；无需安装依赖。

[在线试玩](https://majiayu000.github.io/timberman-game/) · [本地运行](#本地运行) · [操作说明](#操作说明)


[玩法与常见问题](https://majiayu000.github.io/timberman-game/guide.html)
## 本地运行

克隆仓库后，在项目目录启动静态 HTTP 服务：

```bash
git clone https://github.com/majiayu000/timberman-game.git
cd timberman-game
python3 -m http.server 8080
```

打开 <http://localhost:8080/>。此项目没有构建步骤。

## 操作说明

- `←` / `A`：在左侧砍树。
- `→` / `D`：在右侧砍树。
- 触屏：点击画布左侧或右侧砍树。
- `Space` / `Enter`：开始游戏。
- `Esc` / `P`：暂停或继续。

## 文件

- `index.html`：游戏页面和菜单。
- `game.js`：游戏逻辑、输入、音效和界面状态。
- `style.css`：页面样式。
- `favicon.svg`：站点图标。
