const parentAcc = document.getElementById("parent-accordion");
const stepAcc = document.querySelectorAll(".step-accordion");
const notificationIconEle = document.getElementById("notification-icon");
const navProfileTagEle = document.getElementById("menu-trigger");

navProfileTagEle.addEventListener("click", () =>
  toggleDisplay(".menu-wrapper")
);
notificationIconEle.addEventListener("click", () =>
  toggleDisplay(".alert-wrapper")
);

parentAcc.addEventListener("click", () => {
  const panel = document.getElementById("panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";

  const firstStepAccordion = document.querySelector(".step-accordion");
  if (firstStepAccordion) {
    firstStepAccordion.classList.add("active");
    const firstPanel = firstStepAccordion.querySelector(".step-description");
    if (firstPanel) firstPanel.style.display = "flex";
  }
});

stepAcc.forEach((accordion) => {
  accordion.addEventListener("click", (event) => {
    event.stopPropagation();

    document.querySelectorAll(".step-accordion").forEach((otherAccordion) => {
      if (otherAccordion !== accordion) {
        otherAccordion.classList.remove("active");
        const otherPanel = otherAccordion.querySelector(".step-description");
        if (otherPanel.style.display === "flex")
          otherPanel.style.display = "none";
      }
    });

    accordion.classList.toggle("active");
    const panel = accordion.querySelector(".step-description");
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
  });
});

function toggleDisplay(selector) {
  const element = document.querySelector(selector);
  element.style.display = element.style.display === "block" ? "none" : "block";
}

function replaceSVG(stepNumber) {
  const svgContainer = document.getElementById(`svg${stepNumber}`);
  svgContainer.innerHTML = `
  <svg
  id="svg${stepNumber}"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  >
  <circle
    cx="12"
    cy="12"
    r="10"
    stroke="#8A8A8A"
    stroke-width="2.08333"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  </svg>
  `;
}
function restoreSVG(stepNumber) {
  const svgContainer = document.getElementById(`svg${stepNumber}`);
  svgContainer.innerHTML = `
  <svg
  id="svg${stepNumber}"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
>
  <circle
    cx="12"
    cy="12"
    r="10"
    stroke="#8A8A8A"
    stroke-width="2.08333"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-dasharray="5 5"
  />
</svg>
  `;
}
