$(window).on("load", function () {
  Webflow.validClick = function () {
    return true;
  };
});

function getModalElements() {
  return {
    cmodal: document.querySelector("#contact-modal"),
    cmodalcard: document.querySelector("#contact-card"),
    contactBtn: document.querySelector("#contact-btn"),
    contactBtn2: document.querySelector("#contact-btn2"),
    cspan: document.querySelector("#modal-bg"),
    copyc: document.querySelector("#copy-mail-cbtn"),
    switch:document.querySelector("#switch"),
  };
}

// Hover and current state functionality for main navigation
function addHoverAndCurrentEffect(elementId, clipPathClass) {
  document.querySelectorAll(elementId).forEach((trigger) => {
    const applyClass = (action) => {
      document.querySelectorAll(".bg-on-hover").forEach((target) => {
        if (target.parentElement) {
          [...target.parentElement.children]
            .filter((c) => c === target)
            .forEach((sibling) => sibling.classList[action](clipPathClass));
        }
      });
    };

    // Apply class on hover
    trigger.addEventListener("mouseover", () => applyClass('add'));
    trigger.addEventListener("mouseout", () => applyClass('remove'));

    // Apply class if the element is in the current state
    if (trigger.classList.contains('current')) {
      applyClass('add');
    }
  });
}

// Hover functionality for social links
function addSocialHoverEffect(elementId, clipPathClass) {
  document.querySelectorAll(elementId).forEach((trigger) => {
    trigger.addEventListener("mouseover", () => {
      document.querySelectorAll(".bg-on-hover-social").forEach((target) => {
        if (target.parentElement) {
          [...target.parentElement.children]
            .filter((c) => c === target)
            .forEach((sibling) => sibling.classList.add(clipPathClass));
        }
      });
    });

    trigger.addEventListener("mouseout", () => {
      document.querySelectorAll(".bg-on-hover-social").forEach((target) => {
        if (target.parentElement) {
          [...target.parentElement.children]
            .filter((c) => c === target)
            .forEach((sibling) => sibling.classList.remove(clipPathClass));
        }
      });
    });
  });
}

// Wait for DOM to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Add hover and current effects for main navigation
  addHoverAndCurrentEffect("#navbar-h", "clip-path-1");
  addHoverAndCurrentEffect("#navbar-1", "clip-path-2");
  addHoverAndCurrentEffect("#navbar-2", "clip-path-3");
  addHoverAndCurrentEffect("#contact-btn", "clip-path-4");
  addHoverAndCurrentEffect("#switch", "clip-path-5");

  // Add hover effects for social links
  addSocialHoverEffect("#resume", "clip-path-1");
  addSocialHoverEffect("#x", "clip-path-2");
  addSocialHoverEffect("#linkedin", "clip-path-3");
  addSocialHoverEffect("#dribbble", "clip-path-4");
});
