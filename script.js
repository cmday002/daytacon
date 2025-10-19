// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Handle navigation link clicks
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Handle CTA button clicks
  const ctaButtons = document.querySelectorAll(".btn");
  ctaButtons.forEach((button) => {
    if (button.getAttribute("href") === "#contact") {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const contactSection = document.querySelector("#contact");
        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    }
  });

  // Video loading animation
  const videoWrapper = document.querySelector(".video-wrapper");
  const iframe = document.querySelector(".video-wrapper iframe");

  if (iframe) {
    iframe.addEventListener("load", function () {
      videoWrapper.classList.add("loaded");
    });
  }

  // Form submission handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector("textarea").value;

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Simulate form submission
      const submitButton = this.querySelector(".btn-primary");
      const originalText = submitButton.textContent;

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert("Thank you for your message! We'll get back to you soon.");
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Add navbar transition
  navbar.style.transition = "transform 0.3s ease-in-out";

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe service cards and other elements
  const animatedElements = document.querySelectorAll(
    ".service-card, .stat, .contact-item"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Counter animation for stats
  const stats = document.querySelectorAll(".stat h3");
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      if (target >= 100) {
        element.textContent = Math.floor(current) + "%";
      } else {
        element.textContent = Math.floor(current) + "+";
      }
    }, 20);
  };

  // Trigger counter animation when stats come into view
  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statElement = entry.target;
          const text = statElement.textContent;

          if (text.includes("%")) {
            const number = parseInt(text.replace("%", ""));
            animateCounter(statElement, number);
          } else if (text.includes("+")) {
            const number = parseInt(text.replace("+", ""));
            animateCounter(statElement, number);
          }

          statsObserver.unobserve(statElement);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => {
    statsObserver.observe(stat);
  });
});
