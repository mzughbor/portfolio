const marquee = document.querySelector('.marquee');
const trackNewsBar = marquee.querySelector('.track');
const clone = trackNewsBar.cloneNode(true);

clone.classList.add('clone');
marquee.appendChild(clone);

// Measure total width after DOM rendered
function updateAnimationSpeed() {
    const totalWidth = trackNewsBar.offsetWidth;
    const duration = totalWidth / 40; // 40px/sec speed

    trackNewsBar.style.animationDuration = `${duration}s`;
    clone.style.animationDuration = `${duration}s`;
}

window.addEventListener('load', updateAnimationSpeed);
window.addEventListener('resize', updateAnimationSpeed);
