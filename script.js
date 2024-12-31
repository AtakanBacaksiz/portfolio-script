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
  // Prevent flashing on page load
  document.querySelectorAll(".heading-style-h1").forEach((el) => {
    el.style.visibility = "hidden"; // Hide initially
  });

  // Split the text into lines
  let splitText = new SplitType(".heading-style-h1", { types: "lines" });

  // GSAP Timeline for animations
  let tl = gsap.timeline({
    onStart: () => {
      // Set visibility to visible once GSAP starts
      document.querySelectorAll(".heading-style-h1").forEach((el) => {
        el.style.visibility = "visible";
      });
    },
  });

  // Apply overflow:hidden to the parent container of each line
  splitText.lines.forEach((line) => {
    let parent = line.parentElement;
    gsap.set(parent, { overflow: "hidden" });
  });

  // Animate Heading Lines with fade-in and upward motion
  tl.from(splitText.lines, {
    opacity: 0, // Fading in
    y: -30, // Moves in from the top
    duration: 0.8, // Duration for each line
    ease: "expo.out", // Smooth easing
    stagger: { each: 0.2, overlap: -0.3 }, // Overlapping animations
  });
});

$(".section_testimonial").each(function () {
  let section = $(this);

  // Timeline
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  // Reveal section elements
  tl.set(section.find("[data-gsap-hidden]"), { visibility: "visible" });

  // Animate heading
  tl.from(section.find(".heading-style-h2"), {
    opacity: 0,
    y: "1.5rem",
    duration: 0.8,
    ease: "power2.out",
  });

  // Animate rich text
  tl.from(
    section.find(".text-rich-text"),
    {
      opacity: 0,
      y: "1rem",
      duration: 0.6,
      ease: "power2.out",
    },
    "-=0.5"
  );

  // Animate label and sublabel
  tl.from(
    section.find(".label-text"),
    {
      opacity: 0,
      x: "-1rem",
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.4"
  );

  tl.from(
    section.find(".sublabel-text"),
    {
      opacity: 0,
      x: "1rem",
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.4"
  );

  // Animate image
  tl.from(
    section.find(".test-image"),
    {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    },
    "-=0.5"
  );
});
