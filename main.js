
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 800);
});

// ── NAV scroll effect ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ── Hamburger ──
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  function closeMobile() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));

  // ── Counter animation ──
  const counters = document.querySelectorAll('.count');
  let counted = false;
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted) {
        counted = true;
        counters.forEach(counter => {
          const target = +counter.dataset.target;
          const duration = 1800;
          const step = target / (duration / 16);
          let current = 0;
          const update = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(update);
            } else {
              counter.textContent = target;
            }
          };
          requestAnimationFrame(update);
        });
      }
    });
  }, { threshold: 0.5 });
  document.querySelector('.hero-stats') && heroObserver.observe(document.querySelector('.hero-stats'));

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });