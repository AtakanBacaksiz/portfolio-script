<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Flip.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Draggable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>


<script>
gsap.registerPlugin(ScrollTrigger);

// Ensure refresh after images or content loads
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

ScrollTrigger.create({
  trigger: ".section_about-me",
  start: "bottom bottom", // Trigger when the bottom of .section_about-me enters the viewport
  end: "bottom top", // End when the bottom of .section_about-me exits the viewport
  onUpdate: (self) => {
    if (self.direction === 1) { // Scrolling down
      gsap.to(".navbar_component", { y: "8rem", duration: 2, ease: "expo.out" });
    } else if (self.direction === -1) { // Scrolling up
      gsap.to(".navbar_component", { y: "0", duration: 2, ease: "expo.out" });
    }
  }
});

$(".case-image-wrapper").each(function () {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top bottom", // Adjust as needed
      end: "top 70%", // Adjust as needed
      toggleActions: "play none none none", // Adjust as needed
    }
  });

  tl.from($(this), {
    y: "2rem", // Move from bottom
    ease: "expo.out",
    duration: 1,
  });
});
        // Save scroll position before navigating away
        window.addEventListener('scroll', () => {
            sessionStorage.setItem('scrollPosition', window.scrollY);
        });

        // Restore scroll position when page loads with smooth animation
        window.addEventListener('load', () => {
            const scrollPosition = sessionStorage.getItem('scrollPosition');
            if (scrollPosition) {
                window.scrollTo({
                    top: parseInt(scrollPosition, 10),
                    behavior: 'smooth' // Smooth scrolling effect
                });
            }
        });
    </script>
<script>
$(".button.is-secondary").on("mouseenter", function () {
  // Rotate the .embed-icon on hover
  gsap.to($(this).find(".embed-icon"), {
    rotation: -90, // Counter-clockwise
    duration: 0.4,
    ease: "expo.out",
  });
});

$(".button.is-secondary").on("mouseleave", function () {
  // Reset the .embed-icon rotation on hover out
  gsap.to($(this).find(".embed-icon"), {
    rotation: 0, // Reset to original
    duration: 0.4,
    ease: "expo.out",
  });
});
</script>
<style>
  /* Ensure z-index is capped at 3 */
  .about_image-card {
    z-index: 3; /* Default value */
  }
</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(Draggable);

  // Constrain dragging within the parent element
  Draggable.create(".about_image-card", {
    type: "x,y",
    bounds: ".image-wrapper.about.no-padding", // Constrain to the parent element
    onPress: function () {
      console.log("Drag started!");
      // Ensure z-index doesn't exceed 3 on press
      if (parseInt(window.getComputedStyle(this.target).zIndex, 10) > 3) {
        this.target.style.zIndex = "3";
      }
    },
    onRelease: function () {
      console.log("Drag ended!");
      // Re-validate z-index on release
      if (parseInt(window.getComputedStyle(this.target).zIndex, 10) > 3) {
        this.target.style.zIndex = "3";
      }
    },
  });
});
</script>
<script>
gsap.registerPlugin(Flip);

const follower = document.querySelector(".navbar-tooltip");
const followerList = document.querySelector(".navbar-tooltip-wrapper");
const followerItems = document.querySelectorAll(".navbar_link");
const navContainer = document.querySelector(".navbar_container");

// Set tooltip to absolute positioning
gsap.set(follower, { position: "absolute" });

followerList.addEventListener("mouseenter", function () {
  gsap.to(follower, { autoAlpha: 1 });
});

followerList.addEventListener("mouseleave", function () {
  gsap.to(follower, { autoAlpha: 0, duration: 0.2, ease: "expo.out" });
});

followerItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    // Record current state
    const state = Flip.getState(follower);

    // Update tooltip text
    follower.textContent = this.getAttribute("follower-name");

    // Get bounding positions
    const itemBounds = this.getBoundingClientRect();
    const containerBounds = navContainer.getBoundingClientRect();

    // Calculate position
    gsap.set(follower, {
      left:
        itemBounds.left -
        containerBounds.left +
        (itemBounds.width - follower.offsetWidth) / 2,
      top: -follower.offsetHeight - 8, // Adjusted to place above the container with 8px gap
    });

    // Animate to new state
    Flip.from(state, {
      targets: follower, // Specify the target for the Flip animation
      duration: 0.2,
      ease: "expo.out",
    });
  });
});


gsap.registerPlugin(ScrollTrigger);

$(".testimonial-container").each(function () {
  let container = $(this);

  gsap.from(container, {
    scrollTrigger: {
      trigger: container,
      start: "top bottom",
      end: "top 70%",
      toggleActions: "play none none reverse",
    },
    opacity: 0,
    y: "3rem", // Move from the bottom
    duration: 1.2,
    ease: "expo.out",
  });
});

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

const observer = new ResizeObserver(() => {
  ScrollTrigger.refresh();
});

const showcaseSection = document.querySelector(".section_showcase");
if (showcaseSection) observer.observe(showcaseSection);

// Refresh ScrollTrigger on tab change
$(".showcase-tab-link").on("click", function () {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300); // Delay to allow for layout adjustments
});


$(document).ready(function () {
    // Ensure hidden elements are visible when the page loads
    gsap.set("[data-gsap-hidden]", { visibility: "visible" });

    // Add smooth animations to tab changes
    $(".showcase_tab-link").on("click", function () {
        // Find the content of the currently active tab
        let tabContent = $(".w-tab-pane").filter(".w--tab-active").find(".showcase-cms-wrapper");
        let tl = gsap.timeline();

        // Hide current content before animating new content
        tl.set(tabContent, { visibility: "visible" });
        
        // Animate the content into view
        tl.from(tabContent, {
            opacity: 0,
            y: "1rem",
            duration: 2.5,
            ease: "expo.out"
        });
    });

    // Optional: Add different animations for breakpoints
    gsap.matchMedia().add("(min-width: 992px)", () => {
        // Desktop-specific animations can be added here
    });

    gsap.matchMedia().add("(max-width: 991px)", () => {
        // Mobile-specific animations can be added here
    });
});
</script>
