const links = window.DEMO_LINKS || {};

function bindDemoLink(id, href) {
  const element = document.getElementById(id);
  if (!element) return;
  if (!href || href.includes("your-")) {
    element.textContent = "查看项目说明";
    element.removeAttribute("target");
    element.href = id === "aiHotLink" ? "#aihot-project" : "#main-project";
    element.classList.remove("disabled");
    return;
  }
  element.textContent = "查看 Demo";
  element.href = href;
}

bindDemoLink("retailAgentLink", links.retailAgent);
bindDemoLink("aiHotLink", links.aiHot);

const tourSteps = [
  {
    badge: "业务入口",
    title: "业务异常出现",
    description: "某款连衣裙出现尺码咨询上升、偏小差评增加、M/L 码退货率上升和 L 码库存告急，系统将其识别为需要跨部门处理的尺码风险事件。",
    business: "创建风险事件，明确商品、SKU、渠道和异常描述。",
    agent: "判断事件类型，准备读取客服、商品、售后和库存数据。",
    value: "把分散问题收敛成一个可追踪、可审批、可复盘的业务事件。"
  },
  {
    badge: "数据调用",
    title: "读取多系统数据",
    description: "系统模拟读取客服会话、商品评价、退换货记录和尺码库存数据，让 Agent 不只看单点指标，而是看跨系统关联。",
    business: "接入客服、商品、售后、库存样例数据。",
    agent: "调用数据读取工具，检查字段质量和可分析范围。",
    value: "把客服压力、详情页表达、售后原因和库存结构放到同一张图里看。"
  },
  {
    badge: "任务规划",
    title: "Planner 拆解任务",
    description: "Planner Agent 根据异常类型决定先看哪些数据、调用哪些业务 Agent，以及哪些建议后续必须进入人工审批。",
    business: "确定处理目标和跨部门排查顺序。",
    agent: "拆成客服分析、商品分析、售后分析、库存分析和协同汇总任务。",
    value: "体现 Agent 的规划能力，而不是一次性生成静态报告。"
  },
  {
    badge: "子任务执行",
    title: "子 Agent 分析",
    description: "客服、商品运营、售后/库存 Agent 分别分析咨询高频问题、评价与详情页缺口、退换货原因和尺码库存风险。",
    business: "按部门视角查看问题证据和建议动作。",
    agent: "各自读取对应数据，输出发现、证据和建议。",
    value: "把复杂问题拆给不同业务 Agent，减少人工跨系统排查成本。"
  },
  {
    badge: "协同推理",
    title: "协同汇总链路",
    description: "协同 Agent 将咨询、评价、售后、库存结论串联起来，判断问题是否来自尺码表表达不清、话术不一致或尺码库存结构异常。",
    business: "形成跨部门问题链路，而不是孤立看指标。",
    agent: "汇总多 Agent 结论，识别共同原因和优先级。",
    value: "帮助团队看到真正的因果链路，避免只处理表面现象。"
  },
  {
    badge: "人工确认",
    title: "角色审批",
    description: "客服话术、详情页修改、售后策略和补货建议不能由 Agent 直接执行，需要进入客服主管、商品运营、售后或库存负责人审批。",
    business: "对应角色查看建议、证据和风险边界。",
    agent: "把高风险动作生成审批任务，并记录审批状态。",
    value: "符合企业真实权限机制，体现 AI 落地的风险控制意识。"
  },
  {
    badge: "模拟落地",
    title: "模拟执行",
    description: "审批通过后，系统模拟生成客服话术、FAQ、详情页修改建议、售后策略和补货/调拨建议。",
    business: "把通过的建议转为可执行动作。",
    agent: "根据审批结果生成执行内容和后续跟踪项。",
    value: "从分析走向业务动作，避免停留在洞察展示。"
  },
  {
    badge: "复盘指标",
    title: "ROI 反馈",
    description: "系统记录处理建议、审批结果和关键指标，用于后续复盘尺码咨询率、退货率、差评率、转化率和库存周转变化。",
    business: "用指标判断处理动作是否有效。",
    agent: "沉淀执行结果和 ROI 观察口径。",
    value: "让 Agent 工作流形成可衡量、可迭代的业务闭环。"
  }
];

function bindTour() {
  const buttons = [...document.querySelectorAll("[data-tour-step]")];
  const badge = document.getElementById("tourBadge");
  const title = document.getElementById("tourTitle");
  const description = document.getElementById("tourDescription");
  const business = document.getElementById("tourBusiness");
  const agent = document.getElementById("tourAgent");
  const value = document.getElementById("tourValue");
  const counter = document.getElementById("tourCounter");
  const progress = document.getElementById("tourProgressFill");
  const toggle = document.getElementById("tourToggle");

  if (!buttons.length || !badge || !title || !description || !business || !agent || !value || !counter || !progress || !toggle) return;

  const intervalMs = 6500;
  let activeIndex = 0;
  let isPlaying = true;
  let startedAt = Date.now();
  let rafId = 0;
  let timerId = 0;

  function setTourStep(index) {
    const step = tourSteps[index] || tourSteps[0];
    activeIndex = index;
    startedAt = Date.now();
    badge.textContent = step.badge;
    title.textContent = step.title;
    description.textContent = step.description;
    business.textContent = step.business;
    agent.textContent = step.agent;
    value.textContent = step.value;
    counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(tourSteps.length).padStart(2, "0")}`;

    buttons.forEach((button) => {
      const isActive = Number(button.dataset.tourStep) === index;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
  }

  function updateProgress() {
    if (!isPlaying) return;
    const elapsed = Date.now() - startedAt;
    const stepProgress = Math.min(elapsed / intervalMs, 1);
    const totalProgress = ((activeIndex + stepProgress) / tourSteps.length) * 100;
    progress.style.width = `${totalProgress}%`;
    rafId = window.requestAnimationFrame(updateProgress);
  }

  function scheduleNext() {
    window.clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      setTourStep((activeIndex + 1) % tourSteps.length);
      scheduleNext();
    }, intervalMs);
  }

  function playTour() {
    isPlaying = true;
    startedAt = Date.now();
    toggle.textContent = "暂停播放";
    scheduleNext();
    window.cancelAnimationFrame(rafId);
    updateProgress();
  }

  function pauseTour() {
    isPlaying = false;
    toggle.textContent = "继续播放";
    window.clearTimeout(timerId);
    window.cancelAnimationFrame(rafId);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      pauseTour();
      setTourStep(Number(button.dataset.tourStep));
      progress.style.width = `${((activeIndex + 1) / tourSteps.length) * 100}%`;
    });
  });

  toggle.addEventListener("click", () => {
    if (isPlaying) {
      pauseTour();
      return;
    }
    playTour();
  });

  setTourStep(0);
  playTour();
}

bindTour();
