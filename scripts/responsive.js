const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.main-nav-list');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    document.body.classList.toggle('lock-scroll');
});

document.querySelectorAll('.main-nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.classList.remove('lock-scroll');
    });
});

const sectionLW = document.getElementById('jump');
const sectionDP = document.getElementById('experimental');

function updateSlidesToShow() {
    const width = window.innerWidth;
    if (width <= 576) {
        sectionLW.setAttribute("data-slides-to-show", "1");
        sectionDP.setAttribute("data-slides-to-show", "1");
    } else if (width <= 1024) {
        sectionLW.setAttribute("data-slides-to-show", "2");
        sectionDP.setAttribute("data-slides-to-show", "2");
    } else {
        sectionLW.setAttribute("data-slides-to-show", "3");
        sectionDP.setAttribute("data-slides-to-show", "3");
    }
}

window.addEventListener("resize", updateSlidesToShow);
updateSlidesToShow();
