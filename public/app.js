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
