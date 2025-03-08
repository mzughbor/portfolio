
/* slides the latest work section*/
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".slider-section").forEach((section) => {
        const track = section.querySelector(".slider-track");
        const slides = section.querySelectorAll(".slide");
        const prevButton = section.querySelector(".prev");
        const nextButton = section.querySelector(".next");
        const dotsContainer = section.querySelector(".dots");
        let index = 1;
        const totalSlides = slides.length;
        let isDragging = false;
        let startX = 0;

        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);
        track.insertBefore(lastClone, slides[0]);
        track.appendChild(firstClone);

        const allSlides = section.querySelectorAll(".slide");
        const slideWidth = slides[0].offsetWidth + 40;
        track.style.transform = `translateX(-${index * slideWidth}px)`;

        slides.forEach((_, i) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                index = i + 1;
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
                dot.classList.toggle("active", i === index - 1);
            });
        }

        function nextSlide() {
            if (index >= totalSlides) {
                index++;
                updateSlidePosition();
                setTimeout(() => {
                    track.style.transition = "none";
                    index = 1;
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

        track.addEventListener("mouseup", () => {
            isDragging = false;
        });

        track.addEventListener("mouseleave", () => {
            isDragging = false;
        });

        setInterval(nextSlide, 9000);
    });
});