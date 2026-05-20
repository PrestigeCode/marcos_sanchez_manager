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

  /* ── YT Carousel ─────────────────────────────────────────── */
  function initYtCarousel(root) {
    var raw = root.getAttribute('data-videos');
    if (!raw) return;
    var videos;
    try { videos = JSON.parse(raw); } catch (e) { return; }
    if (!Array.isArray(videos) || videos.length === 0) return;

    var track = root.querySelector('[data-yt-track]');
    var prev = root.querySelector('[data-yt-prev]');
    var next = root.querySelector('[data-yt-next]');
    var dotsWrap = root.querySelector('[data-yt-dots]');
    var counter = root.querySelector('[data-yt-counter]');
    if (!track || !prev || !next) return;

    var active = 0;
    var slides = [];

    // Construir slides
    videos.forEach(function (v, i) {
      var slide = document.createElement('div');
      slide.className = 'yt-carousel__slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'video');
      slide.setAttribute('aria-label', (i + 1) + ' de ' + videos.length + ': ' + (v.title || 'Video'));

      var frame = document.createElement('div');
      frame.className = 'video-frame';

      var ph = document.createElement('div');
      ph.className = 'video-frame__placeholder';
      ph.setAttribute('aria-hidden', 'true');
      ph.textContent = 'Cargando…';
      frame.appendChild(ph);

      var iframe = document.createElement('iframe');
      iframe.setAttribute('title', v.title || 'Video de YouTube');
      iframe.setAttribute('allow', 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('loading', 'lazy');
      // lazy real: src se setea sólo para el slide activo y vecinos
      iframe.setAttribute('data-src', v.url + (v.url.indexOf('?') === -1 ? '?' : '&') + 'rel=0&modestbranding=1');
      iframe.style.opacity = '0';
      iframe.addEventListener('load', function () {
        iframe.style.transition = 'opacity 0.4s ease';
        iframe.style.opacity = '1';
        if (ph.parentNode) ph.parentNode.removeChild(ph);
      });
      frame.appendChild(iframe);

      slide.appendChild(frame);

      if (v.title || v.desc) {
        var meta = document.createElement('div');
        meta.className = 'video-meta';
        if (v.title) {
          var h = document.createElement('h3');
          h.className = 'video-meta__title';
          h.textContent = v.title;
          meta.appendChild(h);
        }
        if (v.desc) {
          var p = document.createElement('p');
          p.className = 'video-meta__desc';
          p.textContent = v.desc;
          meta.appendChild(p);
        }
        slide.appendChild(meta);
      }

      track.appendChild(slide);
      slides.push(slide);
    });

    // Dots
    var dots = [];
    if (dotsWrap) {
      videos.forEach(function (v, i) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'yt-carousel__dot';
        d.setAttribute('role', 'tab');
        d.setAttribute('aria-label', 'Ir al video ' + (i + 1));
        d.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(d);
        dots.push(d);
      });
    }

    function loadNearby() {
      slides.forEach(function (s, i) {
        var iframe = s.querySelector('iframe');
        if (!iframe) return;
        var nearby = Math.abs(i - active) <= 1;
        if (nearby && !iframe.src && iframe.getAttribute('data-src')) {
          iframe.src = iframe.getAttribute('data-src');
        }
      });
    }

    function update(animate) {
      if (animate === false) {
        track.style.transition = 'none';
        // forzar reflow
        // eslint-disable-next-line no-unused-expressions
        track.offsetWidth;
      } else {
        track.style.transition = '';
      }
      var viewport = root.querySelector('.yt-carousel__viewport');
      var vw = viewport.offsetWidth;
      // offsetWidth da el ancho de layout (ignora transform: scale),
      // a diferencia de getBoundingClientRect que lo incluye y rompe el cálculo
      var sw = slides[0].offsetWidth;
      var offset = vw / 2 - sw / 2 - active * sw;
      track.style.transform = 'translate3d(' + offset + 'px, 0, 0)';

      slides.forEach(function (s, i) {
        var isActive = i === active;
        s.classList.toggle('is-active', isActive);
        s.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        var iframe = s.querySelector('iframe');
        if (iframe && !isActive && iframe.src) {
          // pausar video al salir del centro: recargando con el mismo src lo detiene
          // (sólo si tiene src ya cargado)
          var src = iframe.src;
          iframe.src = src;
        }
      });

      dots.forEach(function (d, i) {
        var isActive = i === active;
        d.classList.toggle('is-active', isActive);
        d.setAttribute('aria-selected', isActive ? 'true' : 'false');
        d.tabIndex = isActive ? 0 : -1;
      });

      if (counter) {
        counter.innerHTML = '<span>' + String(active + 1).padStart(2, '0') + '</span> / ' + String(videos.length).padStart(2, '0');
      }

      loadNearby();
    }

    function goTo(i) {
      active = ((i % videos.length) + videos.length) % videos.length;
      update();
    }

    prev.addEventListener('click', function () { goTo(active - 1); });
    next.addEventListener('click', function () { goTo(active + 1); });

    // Teclado: flechas izquierda/derecha cuando el carrusel está enfocado o visible
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(videos.length - 1); }
    });
    root.setAttribute('tabindex', '0');

    // Swipe táctil
    var touchStartX = 0;
    var touchDeltaX = 0;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
      touchDeltaX = 0;
    }, { passive: true });
    track.addEventListener('touchmove', function (e) {
      touchDeltaX = e.touches[0].clientX - touchStartX;
    }, { passive: true });
    track.addEventListener('touchend', function () {
      if (Math.abs(touchDeltaX) > 50) {
        goTo(active + (touchDeltaX < 0 ? 1 : -1));
      }
    });

    // Recalcular en resize
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { update(false); }, 120);
    });

    update(false);
  }

  document.querySelectorAll('.yt-carousel[data-videos]').forEach(initYtCarousel);

  /* ── Testimonios Carousel ────────────────────────────────── */
  function initTestiCarousel(root) {
    var track = root.querySelector('[data-testi-track]');
    var prev = root.querySelector('[data-testi-prev]');
    var next = root.querySelector('[data-testi-next]');
    var dotsWrap = root.querySelector('[data-testi-dots]');
    var counter = root.querySelector('[data-testi-counter]');
    if (!track || !prev || !next) return;

    var slides = Array.prototype.slice.call(track.children);
    if (slides.length === 0) return;
    var active = Math.floor(slides.length / 2);

    var dots = [];
    if (dotsWrap) {
      slides.forEach(function (s, i) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'testi-carousel__dot';
        d.setAttribute('role', 'tab');
        d.setAttribute('aria-label', 'Ir al testimonio ' + (i + 1));
        d.addEventListener('click', function () { goTo(i); });
        dotsWrap.appendChild(d);
        dots.push(d);
      });
    }

    function update(animate) {
      if (animate === false) {
        track.style.transition = 'none';
        // eslint-disable-next-line no-unused-expressions
        track.offsetWidth;
      } else {
        track.style.transition = '';
      }
      var viewport = root.querySelector('.testi-carousel__viewport');
      var vw = viewport.offsetWidth;
      var sw = slides[0].offsetWidth;
      var offset = vw / 2 - sw / 2 - active * sw;
      track.style.transform = 'translate3d(' + offset + 'px, 0, 0)';

      slides.forEach(function (s, i) {
        var isActive = i === active;
        s.classList.toggle('is-active', isActive);
        s.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      dots.forEach(function (d, i) {
        var isActive = i === active;
        d.classList.toggle('is-active', isActive);
        d.setAttribute('aria-selected', isActive ? 'true' : 'false');
        d.tabIndex = isActive ? 0 : -1;
      });

      if (counter) {
        counter.innerHTML = '<span>' + String(active + 1).padStart(2, '0') + '</span> / ' + String(slides.length).padStart(2, '0');
      }
    }

    function goTo(i) {
      active = ((i % slides.length) + slides.length) % slides.length;
      update();
    }

    prev.addEventListener('click', function () { goTo(active - 1); });
    next.addEventListener('click', function () { goTo(active + 1); });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(slides.length - 1); }
    });
    root.setAttribute('tabindex', '0');

    var touchStartX = 0;
    var touchDeltaX = 0;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
      touchDeltaX = 0;
    }, { passive: true });
    track.addEventListener('touchmove', function (e) {
      touchDeltaX = e.touches[0].clientX - touchStartX;
    }, { passive: true });
    track.addEventListener('touchend', function () {
      if (Math.abs(touchDeltaX) > 50) {
        goTo(active + (touchDeltaX < 0 ? 1 : -1));
      }
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { update(false); }, 120);
    });

    update(false);
  }

  document.querySelectorAll('.testi-carousel').forEach(initTestiCarousel);

})();
