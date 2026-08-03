/* Pepper Coast — Main Script */
(function () {
  'use strict';

  // ── Navigation ────────────────────────────────────────────
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const mobileNav = document.getElementById('navMobile');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 56);
  }, { passive: true });

  burger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  mobileNav.querySelectorAll('.nm-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    });
  });

  // ── Parallax on hero ship ─────────────────────────────────
  const heroShip = document.getElementById('heroShip');

  if (heroShip) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        heroShip.style.transform = `translateY(${y * 0.22}px)`;
      }
    }, { passive: true });
  }

  // ── Scroll reveal ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));


})();
