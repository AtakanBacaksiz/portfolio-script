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
  // Check if animation has already run
  if (!localStorage.getItem("navbarAnimationPlayed")) {
    // Mark animation as played
    localStorage.setItem("navbarAnimationPlayed", "true");

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
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Hide initially
  document
    .querySelectorAll(".section_header .heading-style-h1")
    .forEach((el) => {
      el.setAttribute("data-gsap-hidden", "");
    });

  // Initialize SplitType
  let splitText = new SplitType(".section_header .heading-style-h1", {
    types: "lines",
  });

  // GSAP Timeline
  let tl = gsap.timeline({
    onStart: () => {
      document
        .querySelectorAll(".section_header [data-gsap-hidden]")
        .forEach((el) => {
          el.style.visibility = "visible";
        });
    },
  });

  // Animate lines
  splitText.lines.forEach((line, index) => {
    tl.from(
      line,
      {
        opacity: 0,
        y: 60,
        duration: 1 + index * 0.5,
        ease: "expo.out",
      },
      index * 0.1
    );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Animate .heading-style-h2
  document.querySelectorAll("#header-case").forEach((heading) => {
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
      opacity: 0, // Fade in
      y: "2rem", // Slide in from below
      duration: 0.8, // Smooth duration
      ease: "expo.out", // Smooth easing
      stagger: 0.1, // Cascading effect
    });
  });

  // Animate .text-size-regular
  document.querySelectorAll("#paragraph").forEach((text) => {
    // Split text into words
    let split = new SplitType(text, { types: "lines" });

    // Animate each word
    gsap.from(split.lines, {
      scrollTrigger: {
        trigger: text,
        start: "top bottom",
        end: "top 70%",
        toggleActions: "play none none reverse",
      },
      opacity: 0, // Fade in
      y: "2rem", // Slide in from below
      duration: 0.8, // Smooth duration
      ease: "expo.out", // Smooth easing
      stagger: 0.1, // Cascading effect
      delay: 0.2, // Added delay before the animation starts
    });
  });

  // Animate .button-group
  document.querySelectorAll("#case").forEach((group) => {
    // Animate the entire button group
    gsap.from(group, {
      scrollTrigger: {
        trigger: group,
        start: "top bottom",
        end: "top 70%",
        toggleActions: "play none none reverse",
      },
      opacity: 0, // Fade in
      y: "2rem", // Slide in from below
      duration: 1, // Smooth, slightly slower duration
      ease: "expo.out", // Smooth easing for group animation
      delay: 0.3, // Added delay before the animation starts
    });
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

document.addEventListener("DOMContentLoaded", function () {
  // Register the ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Animate #head-about
  gsap.from("#head-about", {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "expo.out",
    scrollTrigger: {
      trigger: "#head-about",
      start: "top 80%", // Start animation when #head-about is in view
      end: "top 50%", // Animation progress ends here
      toggleActions: "play none none none", // Only play on enter
    },
  });

  // Animate each .resume-item
  document.querySelectorAll(".resume-item").forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: item, // Each .resume-item triggers itself
        start: "top 90%", // Start animation when the element enters view
        end: "top 70%", // Animation progress ends here
        toggleActions: "play none none none", // Only play on enter
      },
    });
  });
});

$(document).ready(function () {
  // Register the Flip plugin
  gsap.registerPlugin(Flip);

  // Create overlay with blur effect
  const overlay = $("<div class='blur-overlay'></div>")
    .css({
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(4px)", // Apply blur effect
      display: "none",
      zIndex: 9997, // Positioned behind the card and close button
    })
    .appendTo("body");

  let currentCardIndex = -1; // Tracks the currently scaled-up card

  // Create navigation buttons (Next/Previous)
  const nextButton = $("<div class='button is-next'>Next</div>")
    .css({
      position: "absolute",
      top: "50%",
      right: "2rem",
      transform: "translateY(-50%)",
      cursor: "pointer",
      zIndex: 10000,
      display: "none",
    })
    .appendTo("body");

  const prevButton = $("<div class='button is-prev'>Previous</div>")
    .css({
      position: "absolute",
      top: "50%",
      left: "2rem",
      transform: "translateY(-50%)",
      cursor: "pointer",
      zIndex: 10000,
      display: "none",
    })
    .appendTo("body");

  $(".bento-card").each(function (index) {
    const $card = $(this);
    const originalParent = $card.parent(); // Save the original parent
    const originalIndex = $card.index(); // Save the card's index in the grid
    let placeholder; // Placeholder for maintaining grid position
    let closeButton; // Close button reference

    // Scale up on click
    $card.on("click", function () {
      if (currentCardIndex === -1) {
        currentCardIndex = index; // Set the current card index

        overlay.fadeIn(300);
        nextButton.show();
        prevButton.show();

        // Create close button dynamically if it doesn't exist
        if (!closeButton) {
          closeButton = $(
            `<div class="button is-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="embed-icon.24">
                <path d="M7.75 7.75L16.25 16.25M16.25 7.75L7.75 16.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </div>`
          )
            .css({
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              cursor: "pointer",
              zIndex: 10000,
              display: "none",
              padding: "var(--size--6)",
            })
            .appendTo($card)
            .on("click", function (e) {
              e.stopPropagation(); // Prevent re-triggering the card's click event
              closeCard();
            });
        }

        closeButton.show(); // Show the close button

        // Create a placeholder to maintain grid position
        placeholder = $("<div class='placeholder'></div>")
          .css({
            width: $card.outerWidth(),
            height: $card.outerHeight(),
            visibility: "hidden",
          })
          .insertBefore($card);

        const state = Flip.getState($card); // Capture the card's current state
        $("body").append($card); // Move to the body for fixed positioning

        // Set the scaled-up styles
        gsap.set($card, {
          width: "80vw",
          height: "80vh",
          position: "fixed",
          top: "10vh",
          left: "10vw",
          zIndex: 9999,
        });

        // Animate only the selected card
        Flip.from(state, {
          duration: 0.4,
          ease: "expo.out",
        });
      }
    });

    // Close the modal
    const closeCard = function () {
      if (currentCardIndex !== -1) {
        currentCardIndex = -1; // Reset the current card index

        overlay.fadeOut(300);
        nextButton.hide();
        prevButton.hide();

        // Hide the close button
        if (closeButton) {
          closeButton.hide();
        }

        const state = Flip.getState($card); // Capture the card's current state

        // Return the card to its original parent and position
        if (placeholder) {
          placeholder.replaceWith($card);
          placeholder = null; // Remove the placeholder
        }

        // Reset styles to integrate back into the grid
        $card.css({ position: "", zIndex: "" });
        gsap.set($card, { clearProps: "all" });

        // Animate only the selected card back to its original state
        Flip.from(state, {
          duration: 0.4,
          ease: "expo.out",
        });
      }
    };

    // Slide to next card
    const showNextCard = function () {
      if (currentCardIndex < $(".bento-card").length - 1) {
        const $nextCard = $(".bento-card").eq(currentCardIndex + 1);
        currentCardIndex += 1;

        const state = Flip.getState($nextCard);
        $("body").append($nextCard);

        // Animate the transition
        Flip.from(state, {
          duration: 0.4,
          ease: "expo.out",
        });
      }
    };

    // Slide to previous card
    const showPrevCard = function () {
      if (currentCardIndex > 0) {
        const $prevCard = $(".bento-card").eq(currentCardIndex - 1);
        currentCardIndex -= 1;

        const state = Flip.getState($prevCard);
        $("body").append($prevCard);

        // Animate the transition
        Flip.from(state, {
          duration: 0.4,
          ease: "expo.out",
        });
      }
    };

    // Add event listeners for Next and Previous buttons
    nextButton.on("click", showNextCard);
    prevButton.on("click", showPrevCard);

    // Close on Escape key
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        closeCard();
      }
    });

    // Close when clicking on the overlay
    overlay.on("click", closeCard);
  });
});
