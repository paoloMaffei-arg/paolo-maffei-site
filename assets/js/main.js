/* Paolo Maffei - portfolio DJ
   Sin listeners de scroll: todo lo que depende del scroll usa IntersectionObserver. */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');

  /* ---------- intro con el logo ----------
     Aparece en cada carga. Tras un instante, el fondo se degrada y el logo
     viaja hasta su lugar en el nav (superior izquierdo), donde queda fijo.
     El <head> la enciende; si main.js no corriera, el CSS la cierra solo. */
  (function () {
    var root = document.documentElement;
    if (!root.classList.contains('intro-on')) return;
    var intro = document.getElementById('intro');
    if (!intro) return;

    /* El logo del nav arranca invisible (CSS) y se revela solo, sincronizado con
       la llegada del logo grande: el crossfade lo maneja una animacion CSS, no el
       JS, para que sin JS el logo del nav igual aparezca (fail-safe). */
    var cerrada = false;
    function irAlNav() {
      if (cerrada) return;
      cerrada = true;
      var navImg = document.querySelector('.nav__mark img');
      var introImg = intro.querySelector('.intro__logo');
      if (navImg && introImg && navImg.getBoundingClientRect().width) {
        var a = introImg.getBoundingClientRect();   // logo grande, centrado
        var b = navImg.getBoundingClientRect();      // logo chico del nav (destino)
        introImg.style.transformOrigin = 'top left';
        intro.classList.add('is-leaving');
        void introImg.offsetWidth;                   // fija el punto de partida antes de transicionar
        introImg.style.transform =
          'translate(' + (b.left - a.left) + 'px,' + (b.top - a.top) + 'px) scale(' + (b.width / a.width) + ')';
      } else {
        intro.classList.add('is-leaving');           // sin destino medible: solo degradado
      }
      setTimeout(function () {
        root.classList.remove('intro-on');
        if (intro.parentNode) intro.remove();
      }, 1150);
    }

    /* saltear si la persona interactúa */
    intro.addEventListener('click', irAlNav);
    window.addEventListener('keydown', irAlNav, { once: true });
    window.addEventListener('wheel', irAlNav, { once: true, passive: true });
    window.addEventListener('touchstart', irAlNav, { once: true, passive: true });

    /* salida automática tras el hold */
    setTimeout(irAlNav, 1200);
  })();

  /* ---------- año del footer ---------- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- fondo del nav al salir del tope ----------
     Un centinela de 56px arriba de todo: cuando deja de verse,
     el nav ya no está sobre el borde superior del hero. */
  var sentinel = document.getElementById('navSentinel');
  if (sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(sentinel);
  } else {
    nav.classList.add('is-stuck');
  }

  /* ---------- nav mobile ---------- */
  var closeNav = function () {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeNav();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) closeNav();
  });

  /* ---------- CTA flotante: visible en todo el scroll, se esconde sobre #booking ---------- */
  var fab = document.getElementById('fab');
  var booking = document.getElementById('booking');
  if (fab) {
    fab.classList.add('is-visible');   // visible por defecto; el observer solo lo esconde en #booking
    if (booking && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        fab.classList.toggle('is-visible', !entries[0].isIntersecting);
      }, { rootMargin: '0px 0px -18% 0px' }).observe(booking);
    }
  }

  /* ---------- link activo según la sección visible ---------- */
  var links = Array.prototype.slice.call(navLinks.querySelectorAll('a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- reveal al entrar en pantalla ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en, i) {
        if (!en.isIntersecting) return;
        en.target.style.transitionDelay = Math.min(i * 70, 280) + 'ms';
        en.target.classList.add('is-in');
        obs.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.06 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  }

  /* ---------- lightbox de la galería ---------- */
  var gal = document.getElementById('gal');
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var items = Array.prototype.slice.call(gal.querySelectorAll('.gal__i'));
  var idx = 0;
  var lastFocus = null;

  function render(i) {
    idx = (i + items.length) % items.length;
    var fig = items[idx];
    var img = fig.querySelector('img');
    var cap = fig.querySelector('figcaption');
    lbImg.src = img.getAttribute('data-full') || img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = cap ? cap.textContent : '';
  }

  function open(i) {
    lastFocus = document.activeElement;
    render(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    void lb.offsetWidth; // fuerza reflow para que la transición arranque desde opacity:0
    lb.classList.add('is-on');
    document.getElementById('lbX').focus();
  }

  function close() {
    lb.classList.remove('is-on');
    document.body.style.overflow = '';
    setTimeout(function () {
      lb.hidden = true;
      lbImg.removeAttribute('src');
      if (lastFocus) lastFocus.focus();
    }, 300);
  }

  items.forEach(function (fig, i) {
    fig.setAttribute('tabindex', '0');
    fig.setAttribute('role', 'button');
    fig.addEventListener('click', function () { open(i); });
    fig.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  document.getElementById('lbX').addEventListener('click', close);
  document.getElementById('lbP').addEventListener('click', function () { render(idx - 1); });
  document.getElementById('lbN').addEventListener('click', function () { render(idx + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') render(idx - 1);
    if (e.key === 'ArrowRight') render(idx + 1);
  });

  /* swipe en mobile */
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 55) render(dx < 0 ? idx + 1 : idx - 1);
    x0 = null;
  }, { passive: true });

  /* un solo video reproduciéndose a la vez */
  var vids = document.querySelectorAll('.vgrid video');
  Array.prototype.forEach.call(vids, function (v) {
    v.addEventListener('play', function () {
      Array.prototype.forEach.call(vids, function (o) { if (o !== v) o.pause(); });
    });
  });
})();
