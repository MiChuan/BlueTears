# 蓝眼泪 · 追泪指南

一个关于「蓝眼泪」（夜光藻 / 海萤引起的海面生物发光）的静态知识站：**发光原理 → 生成条件 → 追泪地图 → 出现概率 → 图集**。

纯前端实现，零依赖、零构建、零后端、零追踪，把文件丢到任何静态托管上就能跑。

## 包含什么

| 板块 | 内容 |
| --- | --- |
| 01 原理 | 荧光素–荧光素酶反应链、为什么是蓝光（474 nm / 海水衰减最小 / 人眼暗视觉峰值）、夜光藻与海萤的对比卡；一个可以用光标划动「点亮」的 canvas 海面 |
| 02 条件 | 水温、盐度、营养盐、风向、潮汐、月光、季节、地形八张条件卡；「黄金窗口」公式条；赤潮风险提示 |
| 03 地图 | 手绘风 SVG 追泪地图，10 个点位由北向南排列，可点击查看季节 / 最佳风向 / 地形 / 提示 |
| 04 概率 | 八项加权模型 + 交互计算器（点位 / 月份 / 水温 / 风向 / 风力 / 潮汐 / 月相 / 天况 / 白天迹象），输出命中率、因子分解、针对性建议、各点位横向排名 |
| 05 图集 | 瀑布流卡片 + 灯箱（← → 切换、Esc 关闭、移动端滑动） |

## 目录结构

```
.
├── index.html              # 单页结构（含手绘 SVG 地图）
├── assets/
│   ├── css/style.css       # 全部样式，深色海洋主题
│   ├── js/main.js          # 数据 + 概率模型 + canvas + 地图 + 灯箱
│   ├── img/*.jpg           # 图集图片（AI 生成，可替换）
│   └── favicon.svg
└── .nojekyll               # 让 GitHub Pages 跳过 Jekyll 处理
```

所有资源使用**相对路径**（`./assets/...`），因此放在仓库根目录，或任意子路径（如 `https://<用户名>.github.io/BlueTears/`）都能正常加载。

## 本地预览

```bash
python -m http.server 8000
# 打开 http://localhost:8000
```

直接双击 `index.html` 也能看，只是 `file://` 下浏览器可能限制部分行为。

## 部署

### GitHub Pages

**方式 A：分支部署（最简单）**

1. 把本仓库推到 GitHub；
2. 仓库 → Settings → Pages；
3. Source 选 `Deploy from a branch`，Branch 选 `main`、目录选 `/ (root)`，Save；
4. 一两分钟后访问 `https://<用户名>.github.io/<仓库名>/`。

**方式 B：Actions 部署**（需要自定义域名或额外构建流程时）

在 `.github/workflows/deploy.yml` 用 `actions/upload-pages-artifact` + `actions/deploy-pages`，把仓库根目录作为 artifact 上传即可，没有构建步骤。

> `.nojekyll` 已就位，避免以下划线开头的文件被 Jekyll 忽略。

### Cloudflare Pages

**方式 A：连 Git（推荐，推送即部署）**

1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git；
2. 选择本仓库；
3. 构建设置：Framework preset 选 `None`，**Build command 留空**，**Build output directory 填 `/`**（或 `.`）；
4. Save and Deploy。之后每次 push 自动发布，PR 还会生成预览链接。

**方式 B：直接上传（不需要仓库）**

Workers & Pages → Create → Pages → Upload assets，把 `index.html`、`assets/`、`.nojekyll` 一起拖进去即可。

> 两个平台可以同时部署同一个仓库，互不影响。

## 想改点什么

- **换图**：把 `assets/img/` 里的 `wave / aerial / rocks / couple / bay / macro / footprints / pier.jpg` 换成你自己的照片（同名覆盖即可）；图集卡片在 `index.html` 的 `#gallery-grid` 里，`data-cap` 是灯箱字幕。
- **改点位**：`assets/js/main.js` 顶部的 `SPOTS` 数组，一条一个点位：
  - `k`：点位自身系数（0.42–0.92，越大越容易出现）；
  - `peak`：盛期月份数组；`wind`：最佳向岸风（0 北 / 1 东北 / 2 东 / 3 东南 / 4 南 / 5 西南 / 6 西 / 7 西北）；
  - `x / y`：手绘地图上的坐标（viewBox 1100×820），改完记得同步改 SVG 里 `.route` 那条虚线路径。
- **调模型权重**：`main.js` 里的 `WEIGHTS` 与 `F_LEVEL / F_TIDE / F_MOON / F_SKY` 等映射表，页面上「模型说明」那段文字也要一起改。
- **换主题色**：`style.css` 顶部 `:root` 的 `--glow / --glow-2 / --bg` 等变量。

## 数据与合规说明

- 概率是**经验加权模型**的输出，参数参考公开海洋生物学资料与长期观测经验，**不是**任何机构的预报，也不构成出行或安全建议。现实中藻华分布极不均匀，同一条海湾的两端都可能一明一暗。
- 地图为**手绘示意图**：只表达点位的相对位置与由北向南的顺序，非等比、不表示行政区划边界，不可用于导航。
- 图集图片由 AI 生成，用于还原目击场景；真实蓝眼泪亮度更低、更细碎，通常需要长曝光才能拍成那样。
- 蓝眼泪高密度出现往往伴随夜光藻赤潮，可能造成缺氧与鱼贝死亡。观赏即可，不要下水、不要投掷石块、不要带走活体。

## License

MIT
