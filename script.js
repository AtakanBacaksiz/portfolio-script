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
  };
}

// Current state functionality for main navigation
function addCurrentStateEffect(elementId, clipPathClass) {
  document.querySelectorAll(elementId).forEach((trigger) => {
    trigger.addEventListener("click", () => {
      // Remove the class from all elements first
      document.querySelectorAll(".bg-on-hover").forEach((target) => {
        if (target.parentElement) {
          [...target.parentElement.children]
            .filter((c) => c === target)
            .forEach((sibling) => sibling.classList.remove(clipPathClass));
        }
      });

      // Add the class to the clicked element
      document.querySelectorAll(".bg-on-hover").forEach((target) => {
        if (target.parentElement && target.parentElement.contains(trigger)) {
          [...target.parentElement.children]
            .filter((c) => c === target)
            .forEach((sibling) => sibling.classList.add(clipPathClass));
        }
      });
    });
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

// Function to update current state based on section visibility
function updateCurrentStateOnScroll(sections, navItems, clipPathClasses) {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Adjust this threshold as needed
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const index = sections.indexOf(entry.target);
      if (entry.isIntersecting) {
        // Add current state class to the corresponding nav item
        navItems.forEach((navItem, i) => {
          if (i === index) {
            navItem.classList.add(clipPathClasses[i]);
          } else {
            navItem.classList.remove(clipPathClasses[i]);
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

// Wait for DOM to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  const sections = [
    document.querySelector("#showcase"),
    document.querySelector("#testimonial"),
    document.querySelector("#about-me")
  ];

  const navItems = [
    document.querySelector("#navbar-h"),
    document.querySelector("#navbar-1"),
    document.querySelector("#navbar-2")
  ];

  const clipPathClasses = ["clip-path-1", "clip-path-2", "clip-path-3"];

  // Update current state based on scroll
  updateCurrentStateOnScroll(sections, navItems, clipPathClasses);

  // Add hover effects for social links
  addSocialHoverEffect("#resume", "clip-path-1");
  addSocialHoverEffect("#x", "clip-path-2");
  addSocialHoverEffect("#linkedin", "clip-path-3");
  addSocialHoverEffect("#dribbble", "clip-path-4");
});
