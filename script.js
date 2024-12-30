$(window).on("load", function () {
  Webflow.validClick = function () {
    return true;
  };
});

function getModalElements() {
  return {
    contactBtn: document.querySelector("#contact-btn"),
    contactBtn2: document.querySelector("#contact-btn2"),
  };
}

// Hover functionality for main navigation
function addHoverEffect(elementId, clipPathClass) {
  document.querySelectorAll(elementId).forEach((trigger) => {
    trigger.addEventListener("mouseover", () => {
      document.querySelectorAll(".bg-on-hover").forEach((target) => {
        if (target.parentElement) {
          [...target.parentElement.children]
            .filter((c) => c === target)
            .forEach((sibling) => sibling.classList.add(clipPathClass));
        }
      });
    });

    trigger.addEventListener("mouseout", () => {
      document.querySelectorAll(".bg-on-hover").forEach((target) => {
        if (target.parentElement) {
          [...target.parentElement.children]
            .filter((c) => c === target)
            .forEach((sibling) => sibling.classList.remove(clipPathClass));
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

// Wait for DOM to be fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects for main navigation
  addHoverEffect("#navbar-h", "clip-path-1");
  addHoverEffect("#navbar-1", "clip-path-2");
  addHoverEffect("#navbar-2", "clip-path-3");
  addHoverEffect("#contact-btn", "clip-path-4");
  addHoverEffect("#switch", "clip-path-5");

  // Add hover effects for social links
  addSocialHoverEffect("#resume", "clip-path-1");
  addSocialHoverEffect("#x", "clip-path-2");
  addSocialHoverEffect("#linkedin", "clip-path-3");
  addSocialHoverEffect("#dribbble", "clip-path-4");
});

document.addEventListener("DOMContentLoaded", function () {
  const connectModal = document.querySelector(".connect-modal");
  const modalCard = document.querySelector(".modal-card.inline");

  let isExpanded = false; // Track the modal's expanded state

  // Define the custom springEase
  CustomEase.create(
    "springEase",
    "M0,0 C0.0059,0.01 0.0225,0.02 0.048,0.03 0.0806,0.04 0.1191,0.05 0.1621,0.06 0.2085,0.07 0.2573,0.08 0.3075,0.09 0.3583,0.1 0.4092,0.11 0.4594,0.12 0.5084,0.13 0.556,0.14 0.6018,0.15 0.6454,0.16 0.6867,0.17 0.7256,0.18 0.762,0.19 0.7958,0.2 0.827,0.21 0.8557,0.22 0.8818,0.23 0.9054,0.24 0.9267,0.25 0.9457,0.26 0.9626,0.27 0.9774,0.28 0.9903,0.29 1.0014,0.3 1.0109,0.31 1.0189,0.32 1.0255,0.33 1.0308,0.34 1.035,0.35 1.0382,0.36 1.0404,0.37 1.0419,0.38 1.0427,0.39 1.0425,0.4 1.0417,0.41 1.0405,0.42 1.0391,0.43 1.0374,0.44 1.0355,0.45 1.0335,0.46 1.0314,0.47 1.0292,0.48 1.027,0.49 1.0249,0.5 1.0227,0.51 1.0206,0.52 1.0186,0.53 1.0167,0.54 1.0148,0.55 1.0131,0.56 1.0114,0.57 1.0099,0.58 1.0085,0.59 1.0071,0.6 1.0059,0.61 1.0048,0.62 1.0039,0.63 1.0029,0.64 1.0022,0.65 1.0015,0.66 1.0008,0.67 1.0003,0.68 0.9998,0.69 0.9995,0.7 0.9991,0.71 0.9989,0.72 0.9986,0.73 0.9985,0.74 0.9983,0.75 0.9983,0.76 0.9982,0.77 0.9982,0.78 0.9982,0.79 0.9982,0.8 0.9982,0.81 0.9982,0.82 0.9983,0.83 0.9983,0.84 0.9984,0.85 0.9985,0.86 0.9986,0.87 0.9987,0.88 0.9988,0.89 0.9989,0.9 0.999,0.91 0.9991,0.92 0.9992,0.93 0.9993,0.94 0.9994,0.95 0.9995,0.96 0.9995,0.97 0.9996,0.98 0.9996,0.99 0.9996,1"
  );

  // Function to toggle modal state
  const toggleModal = (expand) => {
    const state = Flip.getState(modalCard); // Capture the initial state
    modalCard.style.height = expand ? "auto" : "0px"; // Set the target height
    modalCard.style.opacity = expand ? "1" : "0"; // Set the target opacity

    Flip.from(state, {
      duration: 0.582, // Matches your timing
      ease: "springEase", // Use the custom springEase
      x: expand ? 300 : 0, // Shift horizontally on expand
      onEnter: () => {
        modalCard.style.pointerEvents = "all"; // Enable interactions on expand
        gsap.to(modalCard, { opacity: 1, duration: 0.4 }); // Smooth fade-in
      },
      onLeave: () => {
        modalCard.style.pointerEvents = "none"; // Disable interactions on collapse
        gsap.to(modalCard, { opacity: 0, duration: 0.4 }); // Smooth fade-out
      },
    });
  };

  // Show the modal
  const showModal = () => {
    if (!isExpanded) {
      isExpanded = true;
      toggleModal(true); // Expand the modal
    }
  };

  // Hide the modal
  const hideModal = () => {
    if (isExpanded) {
      isExpanded = false;
      toggleModal(false); // Collapse the modal
    }
  };

  // Check if the cursor is outside both elements
  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!connectModal.matches(":hover") && !modalCard.matches(":hover")) {
        hideModal(); // Collapse only if neither element is hovered
      }
    }, 50); // Small delay to avoid flickering
  };

  // Add event listeners
  connectModal.addEventListener("mouseenter", showModal);
  modalCard.addEventListener("mouseenter", showModal);

  connectModal.addEventListener("mouseleave", handleMouseLeave);
  modalCard.addEventListener("mouseleave", handleMouseLeave);
});

document.addEventListener("DOMContentLoaded", function () {
  // GSAP Timeline for animations
  let tl = gsap.timeline();

  // Animate Navbar Container from bottom with blur
  tl.from(".navbar_container", {
    opacity: 0,
    y: 200, // Navbar comes from farther away
    duration: 1, // Smooth longer duration
    ease: "expo.out", // Smooth deceleration
    filter: "blur(10px)", // Start with blur
  });

  // Animate Heading as a single block with fade-in effect
  tl.from(".heading-style-h1", {
    opacity: 0, // Fading in
    y: -30, // Slight upward movement
    duration: 0.8, // Smooth duration
    ease: "expo.out", // Smooth easing for fade-in
    filter: "blur(10px)", // Start with blur
  }).to(".heading-style-h1", {
    filter: "blur(0px)", // Remove blur after animation
    duration: 0.2,
    ease: "expo.out", // Smooth easing for blur removal
  });
});
