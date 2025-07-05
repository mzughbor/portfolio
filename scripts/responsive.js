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
