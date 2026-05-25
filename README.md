# AI Agent 业务落地 Demo 集

这是一个可部署到 GitHub Pages 的公开入口页，用于展示从真实业务场景到 Agent 工作流落地的项目能力：

- 服装商品尺码风险协同处理中心
- AIHOT 趋势雷达

主页重点说明业务痛点、Agent 规划、数据调用、角色审批、模拟执行和反馈指标。当前 Demo 支持本地运行演示，线上交互版后续部署。

## GitHub Pages

项目已提供 GitHub Actions 配置：

```text
.github/workflows/pages.yml
```

它会把 `public/` 目录发布为 GitHub Pages 静态站点。

## 本地预览

```bash
npm start
```

访问：

```text
http://localhost:3010
```

## Demo 链接配置

当前线上入口只展示项目说明，`public/config.js` 保持空值：

```text
public/config.js
```

```js
window.DEMO_LINKS = {
  retailAgent: "",
  aiHot: ""
};
```

后续如果交互版 Demo 部署到公网，再把这里替换为真实可访问链接。

## 部署说明

详细步骤见：

```text
docs/部署说明.md
```
