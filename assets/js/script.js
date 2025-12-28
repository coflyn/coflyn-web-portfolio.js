document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("constellation-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= dx * force * 0.02;
            this.y -= dy * force * 0.02;
          }
        }
      }

      draw() {
        ctx.fillStyle = `rgba(148, 163, 184, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const numberOfParticles = Math.floor(
        (canvas.width * canvas.height) / 15000
      );
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const opacity = 1 - dist / 120;
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      connectParticles();

      requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });
  }

  const navbarBrand = document.querySelector(".navbar-brand");

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  navbarBrand?.addEventListener("dblclick", (e) => {
    e.preventDefault();
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });

  const navbarToggle = document.getElementById("navbar-toggle");
  const offcanvas = document.getElementById("offcanvas");
  const offcanvasOverlay = document.getElementById("offcanvas-overlay");
  const offcanvasClose = document.getElementById("offcanvas-close");

  function openOffcanvas() {
    offcanvas?.classList.add("active");
    offcanvasOverlay?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeOffcanvas() {
    offcanvas?.classList.remove("active");
    offcanvasOverlay?.classList.remove("active");
    document.body.style.overflow = "";
  }

  navbarToggle?.addEventListener("click", openOffcanvas);
  offcanvasClose?.addEventListener("click", closeOffcanvas);
  offcanvasOverlay?.addEventListener("click", closeOffcanvas);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOffcanvas();
  });

  const typewriterElement = document.querySelector(".typewriter-text");
  const cursorElement = document.querySelector(".typewriter-cursor");

  if (typewriterElement) {
    const roles = ["Frontend Developer", "Web Enthusiast", "Photography"];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        cursorElement?.classList.add("hidden");
        const chars = typewriterElement.querySelectorAll(
          ".char:not(.deleting)"
        );
        if (chars.length > 0) {
          const lastChar = chars[chars.length - 1];
          lastChar.classList.add("deleting");
          setTimeout(() => lastChar.remove(), 300);
        }
        charIndex--;
        typingSpeed = 60;
      } else {
        cursorElement?.classList.remove("hidden");
        if (charIndex < currentRole.length) {
          const char = currentRole[charIndex];
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = char === " " ? "\u00A0" : char;
          typewriterElement.appendChild(span);
          charIndex++;
          typingSpeed = 80;
        }
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(typeWriter, typingSpeed);
    }

    setTimeout(typeWriter, 1000);
  }

  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    sidebarLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      e.preventDefault();
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

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

  const carouselCards = document.querySelectorAll(".carousel-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentIndex = 2;

  function updateCarousel() {
    carouselCards.forEach((card, index) => {
      card.classList.remove("active", "adjacent");

      if (index === currentIndex) {
        card.classList.add("active");
      } else if (index === currentIndex - 1 || index === currentIndex + 1) {
        card.classList.add("adjacent");
      }
    });
  }

  if (prevBtn && nextBtn && carouselCards.length > 0) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex < carouselCards.length - 1) {
        currentIndex++;
        updateCarousel();
      }
    });

    carouselCards.forEach((card, index) => {
      card.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    updateCarousel();
  }
});
