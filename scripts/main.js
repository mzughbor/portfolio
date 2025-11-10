// ============================================
// Dark Mode Toggle
// ============================================
(function () {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        body.classList.add('light-mode');
    }

    // Update theme toggle icon based on current theme
    function updateThemeIcon() {
        // Icons are handled via CSS classes
    }

    // Toggle theme
    themeToggle.addEventListener('click', function () {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
        updateThemeIcon();
    });

    updateThemeIcon();
})();

// ============================================
// Mobile Menu Toggle
// ============================================
(function () {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        let scrollPosition = 0;
        let isMenuOpen = false;
        
        // Helper function to lock body scroll
        function lockBodyScroll() {
            if (window.innerWidth <= 768) {
                scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                document.body.style.position = 'fixed';
                document.body.style.top = `-${scrollPosition}px`;
                document.body.style.width = '100%';
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Helper function to unlock body scroll
        function unlockBodyScroll() {
            if (window.innerWidth <= 768) {
                const savedScrollPosition = scrollPosition;
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                // Restore scroll position after a brief delay to ensure styles are applied
                requestAnimationFrame(function() {
                    window.scrollTo(0, savedScrollPosition);
                });
            }
        }
        
        mobileMenuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                navMenu.classList.add('active');
                mobileMenuToggle.classList.add('active');
                lockBodyScroll();
            } else {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                unlockBodyScroll();
            }
        });

        // Helper function to close menu
        function closeMenu() {
            if (isMenuOpen) {
                isMenuOpen = false;
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                unlockBodyScroll();
            }
        }

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        for (const link of navLinks) {
            link.addEventListener('click', function(e) {
                // Allow smooth scroll to happen first, then close menu
                setTimeout(closeMenu, 100);
            });
        }

        // Close menu when clicking on theme toggle (but don't prevent theme toggle)
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function(e) {
                // Small delay to allow theme toggle to work first
                setTimeout(closeMenu, 150);
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (isMenuOpen && window.innerWidth <= 768) {
                const isClickInsideNav = navMenu.contains(event.target);
                const isClickOnToggle = mobileMenuToggle.contains(event.target);

                if (!isClickInsideNav && !isClickOnToggle) {
                    closeMenu();
                }
            }
        }, true); // Use capture phase to catch clicks earlier

        // Close menu on window resize (if resized to desktop)
        let resizeTimeout;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                if (window.innerWidth > 768 && isMenuOpen) {
                    closeMenu();
                }
            }, 100);
        });

        // Note: Scroll event won't fire when body is fixed (menu open),
        // so we don't need to handle scroll closing when menu is open
    }
})();

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
(function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip empty hash or just #
            if (href === '#' || href === '') {
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// ============================================
// Update Current Year in Footer
// ============================================
(function () {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
})();

// ============================================
// Navbar Background on Scroll
// ============================================
(function () {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
})();

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================
(function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards, client project cards, special cards, expertise items, sections, and skill categories
    const elementsToObserve = document.querySelectorAll('.project-card, .client-project-card, .special-card, .expertise-item, .section-header, .skill-category');
    for (const element of elementsToObserve) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    }
})();

// ============================================
// Contact Form Handling
// ============================================
(function () {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // For now, just show a success message
            // Later: Send data to backend API
            formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon. (Note: Backend integration coming soon)';
            formMessage.className = 'form-message success';

            // Reset form
            contactForm.reset();

            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Hide message after 5 seconds
            setTimeout(function () {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }, 5000);

      // TODO: When backend is ready, uncomment and modify this:
      /*
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      })
      .then(response => response.json())
      .then(data => {
        formMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        formMessage.className = 'form-message success';
        contactForm.reset();
      })
      .catch(error => {
        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact me directly.';
        formMessage.className = 'form-message error';
      });
      */
    });
  }
})();

// ============================================
// Testimonials Carousel
// ============================================
(function() {
  const testimonialsCarousel = document.getElementById('testimonialsCarousel');
  const prevBtn = document.getElementById('testimonialsPrev');
  const nextBtn = document.getElementById('testimonialsNext');
  const dotsContainer = document.getElementById('testimonialsDots');
  
  if (!testimonialsCarousel) return;
  
  let currentIndex = 0;
  let testimonials = [];
  let itemsPerView = 1;
  let totalSlides = 0;
  
  // Calculate items per view based on screen size
  function getItemsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }
  
  // Update items per view and recalculate
  function updateItemsPerView() {
    itemsPerView = getItemsPerView();
    totalSlides = Math.max(0, testimonials.length - itemsPerView);
    // Ensure current index is valid
    if (currentIndex > totalSlides) {
      currentIndex = totalSlides;
    }
    updateCarousel();
    updateButtons();
    updateDots();
  }
  
  // Load testimonials from JSON
  function loadTestimonials() {
    fetch('testimonials.json')
      .then(response => response.json())
      .then(data => {
        testimonials = data;
        renderTestimonials();
        updateItemsPerView();
        
        // Observe testimonial cards for animations
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }
          }
        }, observerOptions);
        
        const testimonialCards = testimonialsCarousel.querySelectorAll('.testimonial-card');
        for (const card of testimonialCards) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(card);
        }
      })
      .catch(error => {
        console.error('Error loading testimonials:', error);
        testimonialsCarousel.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: var(--spacing-lg);">Testimonials loading...</p>';
      });
  }
  
  // Render testimonials
  function renderTestimonials() {
    testimonialsCarousel.innerHTML = '';
    
    for (const testimonial of testimonials) {
      const testimonialCard = document.createElement('div');
      testimonialCard.className = 'testimonial-card';
      
      testimonialCard.innerHTML = `
        <div class="testimonial-quote">"</div>
        <p class="testimonial-text">${testimonial.description}</p>
        <footer class="testimonial-footer">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-avatar" loading="lazy">
          <div class="testimonial-author">
            <p class="testimonial-name">${testimonial.name}</p>
            <p class="testimonial-title">${testimonial.title}</p>
          </div>
        </footer>
      `;
      
      testimonialsCarousel.appendChild(testimonialCard);
    }
  }
  
  // Update carousel position
  function updateCarousel() {
    if (testimonials.length === 0 || totalSlides < 0) {
      testimonialsCarousel.style.transform = 'translateX(0)';
      return;
    }
    
    // Use requestAnimationFrame to ensure layout is ready
    requestAnimationFrame(function() {
      const container = document.querySelector('.testimonials-carousel-container');
      if (!container) return;
      
      const containerWidth = container.offsetWidth;
      const gapValue = getComputedStyle(testimonialsCarousel).gap;
      const gap = gapValue ? parseInt(gapValue) : 24;
      
      // Calculate card width based on container and items per view
      const cardWidth = (containerWidth - (gap * (itemsPerView - 1))) / itemsPerView;
      const translateX = -(currentIndex * (cardWidth + gap));
      
      testimonialsCarousel.style.transform = `translateX(${translateX}px)`;
    });
  }
  
  // Update navigation buttons
  function updateButtons() {
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex >= totalSlides;
    }
  }
  
  // Update dots
  function updateDots() {
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    const dotsCount = totalSlides + 1;
    
    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      if (i === currentIndex) {
        dot.classList.add('active');
      }
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        updateButtons();
        updateDots();
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  // Navigate to previous slide
  function goToPrev() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
      updateButtons();
      updateDots();
    }
  }
  
  // Navigate to next slide
  function goToNext() {
    if (currentIndex < totalSlides) {
      currentIndex++;
      updateCarousel();
      updateButtons();
      updateDots();
    }
  }
  
  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', goToPrev);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', goToNext);
  }
  
  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      const oldItemsPerView = itemsPerView;
      updateItemsPerView();
      
      // Adjust current index if needed
      if (itemsPerView !== oldItemsPerView) {
        currentIndex = Math.min(currentIndex, totalSlides);
        updateCarousel();
      }
    }, 150);
  });
  
  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  testimonialsCarousel.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  testimonialsCarousel.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentIndex < totalSlides) {
        goToNext();
      } else if (diff < 0 && currentIndex > 0) {
        goToPrev();
      }
    }
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (document.activeElement.closest('.testimonials')) {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowRight' && currentIndex < totalSlides) {
        e.preventDefault();
        goToNext();
      }
    }
  });
  
  // Initialize
  loadTestimonials();
})();

