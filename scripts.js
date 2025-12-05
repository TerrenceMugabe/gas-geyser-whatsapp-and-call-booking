document.addEventListener('DOMContentLoaded', function() {

  // ===== FAQ Toggle – Only one open at a time =====
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other active FAQs
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('active');
      });

      // Toggle current
      item.classList.toggle('active');
    });
  });

  // ===== Modal Functionality =====
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
    else console.error(`Modal with ID ${modalId} not found`);
  }

  function closeModal(modal) {
    if (modal) modal.classList.remove('active');
  }

  // Open modal buttons
  document.addEventListener('click', e => {
    const btn = e.target.closest('.read-more-btn, .product-item-btn');
    if (!btn) return;

    const modalId = btn.dataset.modal;
    openModal(modalId);
  });

  // Close modal buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      closeModal(modal);
    });
  });

  // Close modal by clicking outside content
  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) closeModal(e.target);
  });

  // ===== Back to Top =====
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Slick Carousel Alternative (Vanilla JS) =====
  // You can keep slick if desired, but here is a safe fallback:
  function initCarousel(selector, options = {}) {
    const container = document.querySelector(selector);
    if (!container) return;

    if (window.innerWidth >= (options.minWidth || 0)) {
      if (!container.classList.contains('carousel-initialized')) {
        container.classList.add('carousel-initialized');
        // You can call Slick here if loaded, or implement vanilla slider
        if (window.jQuery && $(container).slick) {
          $(container).slick(options.slickOptions || {});
        } else {
          console.warn('Slick not loaded, consider including it for carousel functionality.');
        }
      }
    } else {
      if (container.classList.contains('carousel-initialized')) {
        container.classList.remove('carousel-initialized');
        if (window.jQuery && $(container).slick) $(container).slick('unslick');
      }
    }
  }

  // Initialize FAQ carousel
  initCarousel('.faq-container', {
    minWidth: 769,
    slickOptions: {
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      dots: true,
      centerMode: true,
      variableWidth: true,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } }
      ]
    }
  });

  // Initialize product carousel
  initCarousel('.product-carousel', {
    slickOptions: {
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      dots: true,
      centerMode: true,
      variableWidth: true,
      infinite: true,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1, dots: false } }
      ]
    }
  });

  window.addEventListener('resize', () => {
    initCarousel('.faq-container', {
      minWidth: 769,
      slickOptions: {}
    });
  });

  // ===== CTA Popup – Book Site Visit =====
  const popup = document.getElementById('cta-popup');
  if (popup) {
    document.querySelectorAll('.book-site-visit-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        popup.classList.add('active');
      });
    });

    const closeBtn = popup.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => popup.classList.remove('active'));
    }

    window.addEventListener('click', e => {
      if (e.target === popup) popup.classList.remove('active');
    });

    const whatsappBtn = document.getElementById('whatsapp-cta-popup');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        const message = "Hi! I'd like to speak to a consultant or book a free site visit for a GAS GEYSER installation. Please assist.";
        window.open(`https://wa.me/27673447891?text=${encodeURIComponent(message)}`, '_blank');
      });
    }
  }

  // ===== Cal.com Embed (Async) =====
  (function(C, A, L){
    try {
      let p = function(a, ar){ a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function() {
        let cal = C.Cal;
        let ar = arguments;
        if(!cal.loaded){
          cal.ns = {};
          cal.q = cal.q || [];
          let script = d.createElement("script");
          script.src = A;
          script.async = true;
          d.head.appendChild(script);
          cal.loaded = true;
        }
        if(ar[0] === L){
          const api = function(){ p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if(typeof namespace === "string"){
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
      C.Cal("init", "installation-site-visits", { origin: "https://cal.gascompany.co.za" });
    } catch(err){
      console.error("Cal.com embed failed:", err);
    }
  })(window, "https://cal.gascompany.co.za/embed/embed.js", "init");

});
