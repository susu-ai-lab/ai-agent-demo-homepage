const links = window.DEMO_LINKS || {};

function bindDemoLink(id, href) {
  const element = document.getElementById(id);
  if (!element) return;
  if (!href || href.includes("your-")) {
    element.textContent = "本地演示";
    element.removeAttribute("target");
    element.href = "#";
    element.classList.add("disabled");
    return;
  }
  element.href = href;
}

bindDemoLink("retailAgentLink", links.retailAgent);
bindDemoLink("aiHotLink", links.aiHot);
