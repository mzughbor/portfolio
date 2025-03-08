document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".slider-section").forEach((section) => {
        const track = section.querySelector(".slider-track");
        const slides = Array.from(section.querySelectorAll(".slide"));
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
});
