// FAQ Toggle/Divs – Only one open at a time
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    // Close all other open FAQs
    document.querySelectorAll('.faq-item.active').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('active');
      }
    });

    // Toggle current
    item.classList.toggle('active');
  });
});
// Modal functionality with event delegation
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.read-more-btn, .product-item-btn');
  if (btn) {
    const modalId = btn.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    } else {
      console.error(`Modal with ID ${modalId} not found`);
    }
  }
});

// Close modal when clicking the close button
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    if (modal) {
      modal.classList.remove('active');
    }
  });
});

// Close modal when clicking outside the modal content
window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});

// Back to top
document.querySelector('.back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Carousel initialization for larger screens
function initializeFaqCarousel() {
  const $faqContainer = $('.faq-container');
  if (window.innerWidth >= 769) {
    if (!$faqContainer.hasClass('slick-initialized')) {
      $faqContainer.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: true,
        centerMode: true,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: { slidesToShow: 3 }
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 2 }
          }
        ]
      });
    }
  } else {
    if ($faqContainer.hasClass('slick-initialized')) {
      $faqContainer.slick('unslick');
    }
  }
}

$(document).ready(function(){
  initializeFaqCarousel();
  $('.product-carousel').slick({
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
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { 
          slidesToShow: 1,
          dots: false
        }
      }
    ]
  });

  // Rebind event listeners for product carousel buttons after initialization or slide change
  $('.product-carousel').on('init reInit afterChange', function(event, slick) {
    document.querySelectorAll('.product-item-btn').forEach(btn => {
      btn.removeEventListener('click', handleModalClick); // Prevent duplicate listeners
      btn.addEventListener('click', handleModalClick);
    });
  });

  function handleModalClick(e) {
    const modalId = e.currentTarget.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    } else {
      console.error(`Modal with ID ${modalId} not found`);
    }
  }
});

// Reinitialize FAQ carousel on window resize
$(window).resize(function() {
  initializeFaqCarousel();
});

// CTA POPUP – Book Site Visit
const popup = document.getElementById('cta-popup');
const openButtons = document.querySelectorAll('.book-site-visit-btn');
const closeBtn = popup.querySelector('.modal-close');
const whatsappBtn = document.getElementById('whatsapp-cta-popup');

openButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  popup.classList.remove('active');
});

window.addEventListener('click', e => {
  if (e.target === popup) {
    popup.classList.remove('active');
  }
});

whatsappBtn.addEventListener('click', () => {
  const message = "Hi! I'd like to speak to a consultant or book a free site visit for a GAS GEYSER installation. Please assist.";
  window.open(`https://wa.me/27673447891?text=${encodeURIComponent(message)}`, '_blank');
});
