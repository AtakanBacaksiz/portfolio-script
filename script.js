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
      backdropFilter: "blur(4px)",
      display: "none",
      zIndex: 9997,
    })
    .appendTo("body");

  let currentCardIndex = -1;

  // Create navigation buttons
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
    const cards = $(".bento-card"); // Reference all cards

    // Scale up the card
    $card.on("click", function () {
      if (currentCardIndex === -1) {
        currentCardIndex = index;

        overlay.fadeIn(300);
        nextButton.show();
        prevButton.show();

        // Scale up the clicked card
        scaleUpCard($card);
      }
    });

    // Function to scale up a card
    const scaleUpCard = function ($targetCard) {
      const state = Flip.getState($targetCard);
      $("body").append($targetCard);

      // Set scaled-up styles
      gsap.set($targetCard, {
        width: "80vw",
        height: "80vh",
        position: "fixed",
        top: "10vh",
        left: "10vw",
        zIndex: 9999,
      });

      // Animate transition
      Flip.from(state, {
        duration: 0.4,
        ease: "expo.out",
      });
    };

    // Close the modal
    const closeCard = function () {
      if (currentCardIndex !== -1) {
        const $currentCard = cards.eq(currentCardIndex);
        currentCardIndex = -1;

        overlay.fadeOut(300);
        nextButton.hide();
        prevButton.hide();

        const state = Flip.getState($currentCard);

        // Return the card to its original grid position
        $(".showcase-item_bento-wrapper").append($currentCard);
        gsap.set($currentCard, { position: "", zIndex: "" });
        Flip.from(state, {
          duration: 0.4,
          ease: "expo.out",
        });
      }
    };

    // Navigate to the next card
    const showNextCard = function () {
      if (currentCardIndex < cards.length - 1) {
        const $currentCard = cards.eq(currentCardIndex);
        currentCardIndex++;
        const $nextCard = cards.eq(currentCardIndex);

        // Replace current card with the next card
        slideCard($currentCard, $nextCard, "next");
      }
    };

    // Navigate to the previous card
    const showPrevCard = function () {
      if (currentCardIndex > 0) {
        const $currentCard = cards.eq(currentCardIndex);
        currentCardIndex--;
        const $prevCard = cards.eq(currentCardIndex);

        // Replace current card with the previous card
        slideCard($currentCard, $prevCard, "prev");
      }
    };

    // Slide animation between cards
    const slideCard = function ($fromCard, $toCard, direction) {
      const state = Flip.getState($toCard);

      // Animate out the current card
      gsap.to($fromCard, {
        x: direction === "next" ? "-100vw" : "100vw",
        duration: 0.4,
        ease: "expo.out",
        onComplete: function () {
          // Hide the current card after sliding out
          $fromCard.hide();
        },
      });

      // Animate in the next/previous card
      $("body").append($toCard.show());
      Flip.from(state, {
        duration: 0.4,
        ease: "expo.out",
      });
    };

    // Event listeners for Next and Previous buttons
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
