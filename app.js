var parentAcc = document.getElementById("parent-accordion");
var stepAcc = document.getElementsByClassName("step-accordion");
var allStepAccordions = document.getElementsByClassName("step-accordion");

parentAcc.addEventListener("click", function () {
  var panel = document.getElementById("panel");
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
    var firstStepAccordion = document.querySelector(".step-accordion");
    if (firstStepAccordion) {
      firstStepAccordion.classList.add("active");
      var firstPanel = firstStepAccordion.querySelector(".step-description");
      if (firstPanel) {
        firstPanel.style.display = "flex";
      }
    }
  }
});

for (var i = 0; i < stepAcc.length; i++) {
  stepAcc[i].addEventListener("click", function (event) {
    event.stopPropagation();

    for (var j = 0; j < allStepAccordions.length; j++) {
      if (allStepAccordions[j] !== this) {
        allStepAccordions[j].classList.remove("active");
        var otherPanel =
          allStepAccordions[j].querySelector(".step-description");
        if (otherPanel.style.display === "flex") {
          otherPanel.style.display = "none";
        }
      }
    }

    this.classList.toggle("active");
    var panel = this.querySelector(".step-description");
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  });
}
