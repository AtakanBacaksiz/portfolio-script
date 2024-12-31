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

  // Function to toggle modal state
  const toggleModal = (expand) => {
    const state = Flip.getState(modalCard); // Capture the initial state
    modalCard.style.height = expand ? "auto" : "0px"; // Set the target height

    Flip.from(state, {
      duration: 1.2, // Smooth duration
      ease: "expo.out", // Smooth deceleration for expand/collapse
      onEnter: () => {
        modalCard.style.pointerEvents = "all"; // Enable interactions on expand
        gsap.to(modalCard, { opacity: 1, duration: 0.6, ease: "expo.out" }); // Smooth fade-in
      },
      onLeave: () => {
        gsap.to(modalCard, { opacity: 0, duration: 0.6, ease: "expo.in" }); // Smooth fade-out
        modalCard.style.pointerEvents = "none"; // Disable interactions on collapse
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
});

document.addEventListener("DOMContentLoaded", function () {
  // Target elements only inside .section_header
  document
    .querySelectorAll(".section_header .heading-style-h1")
    .forEach((el) => {
      el.setAttribute("data-gsap-hidden", ""); // Add data attribute to hide initially
    });

  // Split the text into lines only inside .section_header
  let splitText = new SplitType(".section_header .heading-style-h1", {
    types: "lines",
  });

  // GSAP Timeline for animations
  let tl = gsap.timeline({
    onStart: () => {
      // Set visibility to visible for elements inside .section_header
      document
        .querySelectorAll(".section_header [data-gsap-hidden]")
        .forEach((el) => {
          el.style.visibility = "visible";
        });
    },
  });

  // Apply overflow:hidden to the parent container of each line in .section_header
  splitText.lines.forEach((line) => {
    let parent = line.parentElement;
    gsap.set(parent, { overflow: "hidden" });
  });

  // Animate Heading Lines within .section_header
  tl.from(splitText.lines, {
    opacity: 0, // Fading in
    y: -30, // Moves in from the top
    duration: 0.8, // Duration for each line
    ease: "expo.out", // Smooth easing
    stagger: { each: 0.2, overlap: -0.3 }, // Overlapping animations
  });
});

$(".heading-style-h2").each(function () {
  let heading = $(this);

  // Split text into words
  let split = new SplitType(heading, { types: "words" });

  // Animate each word
  gsap.from(split.words, {
    scrollTrigger: {
      trigger: heading,
      start: "top bottom",
      end: "top 70%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: "1rem", // Move each word upward
    duration: 0.6,
    ease: "expo.out",
    stagger: 0.1, // Stagger animations for a wave effect
  });
});

$(".testimonial-container").each(function () {
  let container = $(this);

  // Animate each testimonial-container independently
  gsap.from(container, {
    scrollTrigger: {
      trigger: container,
      start: "top bottom",
      end: "top 70%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: "3rem", // Move from bottom
    duration: 1.2,
    ease: "expo.out",
  });
});
