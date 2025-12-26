function updateTime() {
  const timeElement = document.getElementById("current-time");
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

updateTime();
setInterval(updateTime, 1000);

// Loading Screen Animation - Only once per session
(function () {
  const loadingScreen = document.getElementById("loading-screen");
  const percentElement = document.querySelector(".loading-percent");
  const quoteElement = document.querySelector(".loading-quote");

  // Check if already visited this session
  if (sessionStorage.getItem("hasVisited")) {
    // Skip loading screen
    loadingScreen.style.display = "none";
    return;
  }

  // Mark as visited
  sessionStorage.setItem("hasVisited", "true");

  // Random quotes
  const quotes = [
    "Code is poetry.",
    "First, solve the problem. Then, write the code.",
    "Simplicity is the soul of efficiency.",
    "Make it work, make it right, make it fast.",
    "Talk is cheap. Show me the code.",
    "The best error message is the one that never shows up.",
    "Clean code always looks like it was written by someone who cares.",
  ];

  // Set random quote
  quoteElement.textContent = `"${
    quotes[Math.floor(Math.random() * quotes.length)]
  }"`;

  let progress = 0;
  const duration = 2500; // 2.5 seconds total
  const interval = 25; // Update every 25ms
  const increment = 100 / (duration / interval);

  const counter = setInterval(() => {
    progress += increment;

    if (progress >= 100) {
      progress = 100;
      percentElement.textContent = "100";
      clearInterval(counter);

      // Trigger reveal animation after a small delay
      setTimeout(() => {
        loadingScreen.classList.add("hide");

        // Remove from DOM after animation completes (1.5s animation + 200ms buffer)
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 1700);
      }, 200);
    } else {
      percentElement.textContent = Math.floor(progress);
    }
  }, interval);
})();

document.addEventListener("DOMContentLoaded", () => {
  const marqueeLeft = document.querySelector(".marquee-left");
  const marqueeRight = document.querySelector(".marquee-right");
  const textContainer = document.querySelector(".w-full.space-y-4");

  let isSwapped = false;

  function swapMarquees() {
    isSwapped = !isSwapped;

    marqueeLeft.style.transition =
      "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    marqueeRight.style.transition =
      "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

    if (isSwapped) {
      const leftHeight = marqueeLeft.offsetHeight;
      const rightHeight = marqueeRight.offsetHeight;
      const gap = 16;

      marqueeLeft.style.transform = `translateY(${rightHeight + gap}px)`;
      marqueeRight.style.transform = `translateY(-${leftHeight + gap}px)`;
    } else {
      marqueeLeft.style.transform = "translateY(0)";
      marqueeRight.style.transform = "translateY(0)";
    }
  }

  [marqueeLeft, marqueeRight].forEach((marquee) => {
    marquee.style.cursor = "pointer";
    marquee.addEventListener("dblclick", swapMarquees);
  });

  // Smooth Scroll for scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = scrollIndicator.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Animated Counter for Stats
  const statNumbers = document.querySelectorAll(".stat-number");
  let hasAnimated = false;

  function animateCounters() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"));
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;

      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  // Observe About Me section
  const aboutSection = document.getElementById("about-me");
  if (aboutSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(aboutSection);
  }
});
