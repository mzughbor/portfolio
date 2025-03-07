document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".main-nav-link, .header-logo"); // Include logo

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            const href = this.getAttribute("href");

            // Skip smooth scroll for external links
            if (href.startsWith("http")) return;

            event.preventDefault();
            
            // Scroll to top if href is "#"
            if (href === "#") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const startPosition = window.scrollY;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let startTime = null;

                function easeInOutQuad(t) {
                    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                }

                function animationStep(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const timeElapsed = timestamp - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easedProgress = easeInOutQuad(progress);
                    window.scrollTo(0, startPosition + distance * easedProgress);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animationStep);
                    }
                }

                requestAnimationFrame(animationStep);
            }
        });
    });
});
