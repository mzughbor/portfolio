/* old slider - was including the testimonial  */
function initSlider(sectionId) {
  const sections = sectionId
    ? [document.getElementById(sectionId)]
    : Array.from(document.querySelectorAll(".slider-section"));
  sections.forEach((section) => {
    if (!section) return;
    const track = section.querySelector(".slider-track");
    const slides = Array.from(section.querySelectorAll(".slide"));
    if (slides.length === 0) return;
    const prevButton = section.querySelector(".prev");
    const nextButton = section.querySelector(".next");
    const dotsContainer = section.querySelector(".dots");

    const slidesToShow = parseInt(section.getAttribute("data-slides-to-show")) || 1;
    const slideWidth = slides[0].offsetWidth + 40;
    let index = slidesToShow;
    const totalSlides = slides.length;
    let isDragging = false;
    let startX = 0;

    const firstClone = slides.slice(0, slidesToShow).map(slide => slide.cloneNode(true));
    const lastClone = slides.slice(-slidesToShow).map(slide => slide.cloneNode(true));
    lastClone.reverse().forEach(clone => track.insertBefore(clone, slides[0]));
    firstClone.forEach(clone => track.appendChild(clone));

    const allSlides = section.querySelectorAll(".slide");
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i + slidesToShow;
        updateSlidePosition();
      });
      dotsContainer.appendChild(dot);
    });

    function updateSlidePosition(smooth = true) {
      track.style.transition = smooth ? "transform 0.5s ease-in-out" : "none";
      track.style.transform = `translateX(-${index * slideWidth}px)`;
      updateDots();
    }

    function updateDots() {
      dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index - slidesToShow);
      });
    }

    function nextSlide() {
      if (index >= totalSlides) {
        index++;
        updateSlidePosition();
        setTimeout(() => {
          track.style.transition = "none";
          index = slidesToShow;
          updateSlidePosition(false);
        }, 500);
      } else {
        index++;
        updateSlidePosition();
      }
    }

    function prevSlide() {
      if (index <= 0) {
        index--;
        updateSlidePosition();
        setTimeout(() => {
          track.style.transition = "none";
          index = totalSlides;
          updateSlidePosition(false);
        }, 500);
      } else {
        index--;
        updateSlidePosition();
      }
    }

    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    track.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isDragging = true;
      startX = e.clientX;
    });

    track.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      let moveX = e.clientX - startX;
      if (moveX > 50) {
        prevSlide();
        isDragging = false;
      } else if (moveX < -50) {
        nextSlide();
        isDragging = false;
      }
    });

    track.addEventListener("mouseup", () => { isDragging = false; });
    track.addEventListener("mouseleave", () => { isDragging = false; });

    setInterval(nextSlide, 9000);
  });
}
document.addEventListener("DOMContentLoaded", () => initSlider());


/* new code for the testimonial slider */
const track = document.querySelector('.carousel-track');
const dotsContainer = document.querySelector('.carousel-dots');
let currentIndex = 0;
let slides;

// hook to your theme toggle:
const testimonialThemeToggle = document.getElementById('themeToggle');

fetch('testimonials.json')
  .then(response => response.json())
  .then(data => {
    const slidesData = [data[data.length - 1], ...data, data[0]];

    slidesData.forEach((testimonial, index) => {
      const slide = document.createElement('div');
      slide.className = 'testimonial';
      slide.innerHTML = `
            <p>"${testimonial.description}"</p>
            <div class="author">              
              <div class="author-info">
                <img class="testimonial-person" src="${testimonial.image}" alt="${testimonial.name}">  
                <strong>${testimonial.name}</strong>  
                <span></span>
              </div>
              <img class="testimonial-review" src="${testimonial.review}" alt="${testimonial.name}">
            </div>
          `;
      track.appendChild(slide);
    });

    slides = document.querySelectorAll('.testimonial');

    data.forEach((testimonial, index) => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      if (index === 1) dot.classList.add('active'); // second active on first load
      dotsContainer.appendChild(dot);
      dot.addEventListener('click', () => updateSlide(index + 1));
    });

    const dots = document.querySelectorAll('.dot');
    currentIndex = 2; // start on second real slide
    updateSlide(currentIndex, false);

    // gray slides click logic
    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        if (index === currentIndex) return; // center, do nothing
        if (index === currentIndex - 1) {
          currentIndex--;
          updateSlide(currentIndex);
        } else if (index === currentIndex + 1) {
          currentIndex++;
          updateSlide(currentIndex);
        }
      });
    });

    function updateSlide(index, animate = true) {
      const slideWidth = slides[0].offsetWidth + 20;
      const containerCenter = document.querySelector('.carousel-wrapper').offsetWidth / 2;
      const offset = (slideWidth * index) + (slideWidth / 2) - containerCenter;
      if (!animate) {
        track.style.transition = "none";
      } else {
        track.style.transition = "transform 0.5s ease";
      }
      track.style.transform = `translateX(-${offset}px)`;
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
        // handle dark theme coloring:
        if (document.body.classList.contains('dark-theme')) {
          if (i === index) {
            s.style.backgroundColor = "#413543"; // active in dark
            s.style.color = "#ffffff";
          } else {
            s.style.backgroundColor = "#222"; // inactive in dark
            s.style.color = "#b3a8b5eb";
          }
        } else {
          if (i === index) {
            s.style.backgroundColor = "#7952B3"; // active in light
            s.style.color = "#ffffff"; // is the one i need
          } else {
            s.style.backgroundColor = "#eee"; // inactive in light
            s.style.color = "#080808";
          }
        }
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === index - 1));
      currentIndex = index;
    }

    // themeToggle hook
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        slides.forEach((s, i) => {
          if (document.body.classList.contains('dark-theme')) {
            if (i === currentIndex) {
              s.style.backgroundColor = "#413543";
              s.style.color = "#ffffff";
            } else {
              s.style.backgroundColor = "#222";
              s.style.color = "#ffffff";
            }
          } else {
            if (i === currentIndex) {
              s.style.backgroundColor = "#7952B3";
              s.style.color = "#ffffff";
            } else {
              s.style.backgroundColor = "#eee";
              s.style.color = "#080808";
            }
          }
        });
      });
    }

    // swipe
    let startX = 0;
    let isDragging = false;

    track.addEventListener('pointerdown', (e) => {
      startX = e.clientX;
      isDragging = true;
      track.style.cursor = "grabbing";
    });

    track.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const diff = e.clientX - startX;
      track.style.transition = "none";
      const slideWidth = slides[0].offsetWidth + 20;
      const containerCenter = document.querySelector('.carousel-wrapper').offsetWidth / 2;
      const baseOffset = (slideWidth * currentIndex) + (slideWidth / 2) - containerCenter;
      track.style.transform = `translateX(-${baseOffset - diff}px)`;
    });

    track.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = "grab";
      const diff = e.clientX - startX;
      if (diff > 50) {
        currentIndex--;
      } else if (diff < -50) {
        currentIndex++;
      }
      updateSlide(currentIndex);
    });

    // infinite loop transition fix
    track.addEventListener("transitionend", () => {
      if (currentIndex === 0) {
        currentIndex = data.length;
        updateSlide(currentIndex, false);
      }
      if (currentIndex === data.length + 1) {
        currentIndex = 1;
        updateSlide(currentIndex, false);
      }
    });

    window.addEventListener('resize', () => updateSlide(currentIndex));
    document.dispatchEvent(new Event('testimonialsReady'));

  })
  .catch(console.error);
