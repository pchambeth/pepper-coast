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

  // ── Waitlist form ─────────────────────────────────────────
  const form = document.getElementById('waitlistForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      // If Formspree is not configured yet, prevent default and show message
      const action = form.getAttribute('action') || '';
      if (action.includes('YOUR_FORM_ID')) {
        e.preventDefault();
        showFormMessage('Thank you — we\'ll be in touch soon.', false);
        form.reset();
        return;
      }
      // Otherwise let Formspree handle it, but intercept for UX
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          showFormMessage('Thank you — we\'ll be in touch soon.', false);
          form.reset();
        } else {
          showFormMessage('Something went wrong. Please try again.', true);
        }
      } catch {
        showFormMessage('Something went wrong. Please try again.', true);
      } finally {
        btn.textContent = 'Subscribe';
        btn.disabled = false;
      }
    });
  }

  function showFormMessage(msg, isError) {
    let el = document.querySelector('.form-msg');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form-msg';
      form.after(el);
    }
    el.textContent = msg;
    el.style.cssText = `
      margin-top: 14px;
      font-size: 13px;
      letter-spacing: .04em;
      color: ${isError ? '#B04040' : 'var(--olive)'};
      opacity: 0;
      transition: opacity .4s;
    `;
    requestAnimationFrame(() => { el.style.opacity = 1; });
  }
})();
