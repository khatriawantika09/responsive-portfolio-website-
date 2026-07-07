/* ── TYPING EFFECT ── */
    const text = "Awantika Khatri!";
    const nameEl = document.getElementById("typed-name");
    let i = 0;
    function type() {
      if (i < text.length) {
        nameEl.textContent += text[i++];
        setTimeout(type, 120);
      }
    }
    setTimeout(type, 400);

    /* ── HERO IMAGE FADE ── */
    const heroImg = document.getElementById("hero-img");
    setTimeout(() => heroImg.classList.add("loaded"), 200);

    /* ── DARK / LIGHT MODE ── */
    const themeBtn = document.getElementById("theme-btn");
    function toggleTheme() {
      const html = document.documentElement;
      const isDark = html.getAttribute("data-theme") === "dark";
      html.setAttribute("data-theme", isDark ? "light" : "dark");
      themeBtn.textContent = isDark ? "🌙 Dark" : "☀️ Light";
    }

    /* ── RESPONSIVE HAMBURGER MENU ── */
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");

    function toggleMenu() {
      navMenu.classList.toggle("open");
      hamburgerBtn.classList.toggle("active");
      const isOpen = navMenu.classList.contains("open");
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    function closeMenu() {
      navMenu.classList.remove("open");
      hamburgerBtn.classList.remove("active");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    }

    // Close menu if user clicks outside it (mobile)
    document.addEventListener("click", (e) => {
      const clickedInsideNav = e.target.closest("nav");
      if (!clickedInsideNav && navMenu.classList.contains("open")) {
        closeMenu();
      }
    });

    /* ── PROJECT FILTER ── */
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");

        projectCards.forEach(card => {
          const category = card.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            card.classList.remove("hidden-card");
          } else {
            card.classList.add("hidden-card");
          }
        });
      });
    });

    /* ── FORM VALIDATION ── */
    const form = document.getElementById("contact-form");
    const successMsg = document.getElementById("success-msg");
    const submitBtn = form.querySelector("button[type='submit']");
    const msgInput = document.getElementById("inp-msg");
    const charCount = document.getElementById("char-count");

    function setValid(inputId, groupId) {
      document.getElementById(inputId).classList.remove("invalid");
      document.getElementById(inputId).classList.add("valid");
      document.getElementById(groupId).classList.remove("has-error");
    }
    function setInvalid(inputId, groupId) {
      document.getElementById(inputId).classList.remove("valid");
      document.getElementById(inputId).classList.add("invalid");
      document.getElementById(groupId).classList.add("has-error");
    }

    function validateName() {
      const ok = document.getElementById("inp-name").value.trim().length >= 2;
      ok ? setValid("inp-name","fg-name") : setInvalid("inp-name","fg-name");
      return ok;
    }
    function validateEmail() {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("inp-email").value.trim());
      ok ? setValid("inp-email","fg-email") : setInvalid("inp-email","fg-email");
      return ok;
    }
    function validateSubject() {
      const ok = document.getElementById("inp-subject").value.trim().length >= 2;
      ok ? setValid("inp-subject","fg-subject") : setInvalid("inp-subject","fg-subject");
      return ok;
    }
    function validateMsg() {
      const ok = msgInput.value.trim().length >= 10;
      ok ? setValid("inp-msg","fg-msg") : setInvalid("inp-msg","fg-msg");
      return ok;
    }

    // Live validation on blur
    document.getElementById("inp-name").addEventListener("blur", validateName);
    document.getElementById("inp-email").addEventListener("blur", validateEmail);
    document.getElementById("inp-subject").addEventListener("blur", validateSubject);
    document.getElementById("inp-msg").addEventListener("blur", validateMsg);

    // Live character counter for message field
    msgInput.addEventListener("input", () => {
      const len = msgInput.value.trim().length;
      if (len >= 10) {
        charCount.textContent = `${len} characters ✓`;
        charCount.classList.add("ok");
      } else {
        charCount.textContent = `${len} / 10 characters minimum`;
        charCount.classList.remove("ok");
      }
    });

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const nameOk = validateName();
      const emailOk = validateEmail();
      const subjectOk = validateSubject();
      const msgOk = validateMsg();

      const valid = nameOk && emailOk && subjectOk && msgOk;

      if (valid) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        // Simulate sending (replace with real backend/API call if needed)
        setTimeout(() => {
          successMsg.style.display = "block";
          form.reset();
          ["inp-name","inp-email","inp-subject","inp-msg"].forEach(id => {
            document.getElementById(id).classList.remove("valid","invalid");
          });
          charCount.textContent = "0 / 10 characters minimum";
          charCount.classList.remove("ok");
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message ✉️";
          setTimeout(() => { successMsg.style.display = "none"; }, 4000);
        }, 800);
      }
    });

    /* ── SCROLL REVEAL ── */
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(r => observer.observe(r));

    /* ── SCROLL TO TOP BUTTON ── */
    const scrollBtn = document.getElementById("scroll-top");
    window.addEventListener("scroll", () => {
      scrollBtn.classList.toggle("show", window.scrollY > 400);
    });