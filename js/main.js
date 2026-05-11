/* ============================================================
   Marcos Sánchez — main.js
   Nav móvil | Reveal scroll | Lightbox | Nav scroll style
   ============================================================ */

(function () {
  'use strict';

  /* ── Nav: scroll opacity ─────────────────────────────────── */
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.style.background = 'rgba(6,6,6,0.97)';
      } else {
        nav.style.background = 'rgba(6,6,6,0.85)';
      }
    }, { passive: true });
  }

  /* ── Nav: hamburger móvil ────────────────────────────────── */
  var hamburger = document.querySelector('.nav__hamburger');
  var mobileMenu = document.querySelector('.nav__mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Reveal on scroll ────────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Lightbox ────────────────────────────────────────────── */
  var lightbox   = document.getElementById('lightbox');
  var lbImg      = document.getElementById('lightbox-img');
  var lbClose    = document.querySelector('.lightbox__close');

  function openLightbox(src, alt) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (lbClose) {
    lbClose.addEventListener('click', closeLightbox);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /* Attach lightbox to all .photo elements */
  document.querySelectorAll('.photo[data-lightbox]').forEach(function (el) {
    el.addEventListener('click', function () {
      var img = el.querySelector('img');
      if (img) openLightbox(img.src, img.alt);
    });
  });

  /* ── Active nav link ─────────────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY + 120;
      sections.forEach(function (section) {
        if (
          scrollY >= section.offsetTop &&
          scrollY < section.offsetTop + section.offsetHeight
        ) {
          navLinks.forEach(function (a) { a.classList.remove('active'); });
          var active = document.querySelector('.nav__links a[href="#' + section.id + '"]');
          if (active) active.classList.add('active');
        }
      });
    }, { passive: true });
  }

  /* ── Marquee: animación con JS (funciona con reducir movimiento) ── */
  var marquees = document.querySelectorAll('.marquee__track');
  if (marquees.length) {
    marquees.forEach(function (track) {
      var isReverse = track.closest('.marquee--reverse');
      var speed = isReverse ?
        (window.innerWidth <= 540 ? 20 : window.innerWidth <= 768 ? 28 : 60) :
        (window.innerWidth <= 540 ? 18 : window.innerWidth <= 768 ? 25 : 70);
      var offset = 0;

      function animate() {
        offset -= (100 / (speed * 60));
        if (offset <= -50) offset = 0;
        track.style.transform = 'translate3d(' + offset + '%, 0, 0)';
        requestAnimationFrame(animate);
      }

      animate();
    });
  }

  /* ── Touch effects para tarjetas (móviles) ───────────────────── */
  var touchElements = document.querySelectorAll(
    '.problema__card, .servicio, .paso, .angulos__list li, .angulos__img-wrap, ' +
    '.card, .photo, .btn, .stat-item, .red-btn, .metod__card, .bio__img-wrap, ' +
    '.hito, .colaboracion-box, .video__wrap, .marquee__item'
  );

  function clearActive() {
    touchElements.forEach(function (el) { el.classList.remove('active'); });
  }

  touchElements.forEach(function (el) {
    el.addEventListener('touchstart', function (e) {
      clearActive();
      el.classList.add('active');
      e.stopPropagation();
    });
  });

  document.addEventListener('touchstart', clearActive);

  /* ── Modal Contacto ──────────────────────────────────────── */
  var modalContacto = document.getElementById('modal-contacto');
  var btnOpenModal = document.getElementById('open-modal-contacto');
  var modalClose = document.querySelector('.modal-close');
  var formContacto = document.getElementById('form-contacto');

  function openModal() {
    if (modalContacto) {
      modalContacto.classList.add('active');
      modalContacto.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalContacto) {
      modalContacto.classList.remove('active');
      modalContacto.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (btnOpenModal) {
    btnOpenModal.addEventListener('click', openModal);
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalContacto) {
    modalContacto.addEventListener('click', function (e) {
      if (e.target === modalContacto) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalContacto && modalContacto.classList.contains('active')) {
      closeModal();
    }
  });

  if (formContacto) {
    formContacto.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = document.getElementById('nombre').value;
      var email = document.getElementById('email').value;
      var telefono = document.getElementById('telefono').value;
      var asunto = document.getElementById('asunto').value;
      var mensaje = document.getElementById('mensaje').value;

      var whatsappMessage = 'Hola Marcos, soy ' + nombre + '\n\n' +
        'Situación: ' + asunto + '\n\n' +
        'Mi email: ' + email + '\n' +
        'Mi teléfono: ' + (telefono || 'No proporcionado') + '\n\n' +
        'Mensaje:\n' + mensaje;

      var whatsappLink = 'https://wa.me/34614448067?text=' + encodeURIComponent(whatsappMessage);

      window.open(whatsappLink, '_blank');
      closeModal();
      formContacto.reset();
    });
  }

})();
