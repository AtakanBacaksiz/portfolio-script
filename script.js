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

  let isHovering = false; // Track if the cursor is in the hover zone

  // Function to expand the modal
  const showModal = () => {
    if (!isHovering) {
      // Only play animation if not already active
      isHovering = true; // Set hover state to true
      gsap.killTweensOf(modalCard); // Stop ongoing animations
      gsap.fromTo(
        modalCard,
        { height: 0, opacity: 0 }, // Start collapsed
        {
          height: "auto",
          opacity: 1,
          duration: 0.8,
          ease: "expo.out", // Smooth easing for expansion
        }
      );
    }
  };

  // Function to collapse the modal
  const hideModal = () => {
    if (isHovering) {
      // Only play collapse animation if hover state is active
      isHovering = false; // Set hover state to false
      gsap.killTweensOf(modalCard); // Stop ongoing animations
      gsap.to(modalCard, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in", // Faster, sharper easing for collapse
      });
    }
  };

  // Function to check if the cursor leaves both elements
  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!connectModal.matches(":hover") && !modalCard.matches(":hover")) {
        hideModal(); // Trigger collapse animation only if neither element is hovered
      }
    }, 50); // Delay to avoid flickering
  };

  // Handle mouseenter for both elements
  connectModal.addEventListener("mouseenter", showModal);
  modalCard.addEventListener("mouseenter", showModal);

  // Handle mouseleave for both elements
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
