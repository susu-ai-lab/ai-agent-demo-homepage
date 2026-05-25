# AI Agent 业务落地 Demo 集

这是一个可部署到 Vercel 的公开入口页，用于展示从真实业务场景到 Agent 工作流落地的项目能力：

- 服装商品尺码风险协同处理中心
- AIHOT 趋势雷达

主页重点说明业务痛点、Agent 规划、数据调用、角色审批、模拟执行和反馈指标。两个 Demo 建议分别部署到 Render。

## 本地预览

```bash
npm start
```

访问：

```text
http://localhost:3010
```

## 修改 Demo 链接

部署 Render 后，修改：

```text
public/config.js
```

把占位地址替换为真实地址：

```js
window.DEMO_LINKS = {
  retailAgent: "https://你的电商-agent-demo.onrender.com",
  aiHot: "https://你的-aihot-demo.onrender.com"
};
```

## 部署说明

详细步骤见：

```text
docs/部署说明.md
```
