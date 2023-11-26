const parentAcc = document.getElementById("parent-accordion");
const stepAcc = document.querySelectorAll(".step-accordion");
const notificationIconEle = document.getElementById("notification-icon");
const navProfileTagEle = document.getElementById("menu-trigger");
const crossIconBtn = document.getElementById("cancel-cross-icon");
const trialCalloutEle = document.getElementById("trial-callout");
const panelArrowEle = document.getElementById("panel-toggle");
const stepsCompletedEle = document.getElementById("steps-completed");
const progressBarEle = document.getElementById("progress-bar");
const menuEle = document.getElementById("menu-dialog");
const allMenuItems = document
  .getElementById("menu-dialog")
  .querySelectorAll('[role="menuitem"]');

let rotated = false;
let stepsCompleted = 0;
function completeStep(number) {
  const svgContainer = document.getElementById(`svgContainer${number}`);
  if (svgContainer?.classList?.contains("completed")) {
    svgContainer.innerHTML = `<svg
    id="svg${number}"
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
    </svg>`;
    svgContainer.classList.remove("completed");
    stepsCompleted--;
    stepsCompletedEle.innerText = `${stepsCompleted} / 5 completed`;
  } else {
    stepsCompleted++;
    stepsCompletedEle.innerText = `${stepsCompleted} / 5 completed`;
    svgContainer.classList.add("completed");
    svgContainer.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" fill="#303030"></circle>
  <path
    d="M17.2738 8.52629C17.6643 8.91682 17.6643 9.54998 17.2738 9.94051L11.4405 15.7738C11.05 16.1644 10.4168 16.1644 10.0263 15.7738L7.3596 13.1072C6.96908 12.7166 6.96908 12.0835 7.3596 11.693C7.75013 11.3024 8.38329 11.3024 8.77382 11.693L10.7334 13.6525L15.8596 8.52629C16.2501 8.13577 16.8833 8.13577 17.2738 8.52629Z"
    fill="#fff"
  ></path>
</svg>`;
  }
  progressBarEle.style.display = "block";
  progressBarEle.style.width = `${stepsCompleted * 20}%`;
}

function rotateImage() {
  if (rotated) {
    panelArrowEle.style.transform = "rotate(0deg)";
  } else {
    panelArrowEle.style.transform = "rotate(180deg)";
  }
  rotated = !rotated;
}

crossIconBtn.addEventListener("click", () => {
  trialCalloutEle.style.visibility = "hidden";
});
function toggleMenu() {
  toggleDisplay(".menu-wrapper");
  const isExpanded =
    navProfileTagEle?.attributes["aria-expanded"].value === "true";
  if (isExpanded) {
    closeMenu();
  } else {
    openMenu();
  }
}
function handleMenuEscape(event) {
  if (event.key === "Escape") {
    toggleMenu();
  }
}
function handleMenuItemArrowKeyPress(event, menuItemIndex) {
  const isLastMenuItem = menuItemIndex === allMenuItems.length - 1;
  const firstMenuItem = menuItemIndex === 0;
  const nextMenuItem = allMenuItems.item(menuItemIndex + 1);
  const prevMenuItem = allMenuItems.item(menuItemIndex - 1);

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    if (isLastMenuItem) {
      allMenuItems.item(0).focus();
      return;
    }
    nextMenuItem.focus();
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    if (firstMenuItem) {
      allMenuItems.item(allMenuItems.length - 1).focus();
      return;
    }
    prevMenuItem.focus();
  }
}
function openMenu() {
  navProfileTagEle.ariaExpanded = "true";
  allMenuItems.item(0).focus();
  menuEle.addEventListener("keyup", handleMenuEscape);
  allMenuItems.forEach(function (menuItem, menuItemIndex) {
    menuItem.addEventListener("keyup", (e) =>
      handleMenuItemArrowKeyPress(e, menuItemIndex)
    );
  });
}
function closeMenu() {
  navProfileTagEle.ariaExpanded = "false";
  navProfileTagEle?.focus();
}

navProfileTagEle.addEventListener("click", toggleMenu);

notificationIconEle.addEventListener("click", () => {
  toggleDisplay(".alert-wrapper");
  const isExpanded =
    notificationIconEle?.attributes["aria-expanded"].value === "true";
  if (isExpanded) {
    notificationIconEle.ariaExpanded = "false";
  } else {
    notificationIconEle.ariaExpanded = "true";
  }
});

panelArrowEle.addEventListener("click", () => {
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
  accordion.addEventListener("click", (e) => {
    e.stopPropagation();

    document.querySelectorAll(".step-accordion").forEach((otherAccordion) => {
      if (otherAccordion !== accordion) {
        otherAccordion.classList.remove("active");
        const otherPanel = otherAccordion.querySelector(".step-description");
        if (otherPanel.style.display === "flex")
          otherPanel.style.display = "none";
      }
    });
    if (!accordion?.classList?.contains("active")) {
      accordion.classList.toggle("active");
      const panel = accordion.querySelector(".step-description");
      panel.style.display = panel.style.display === "flex" ? "none" : "flex";
    }
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
function redirect(url) {
  window.open(url, "_blank");
}
