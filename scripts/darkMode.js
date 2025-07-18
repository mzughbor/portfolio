const themeToggle = document.getElementById('themeToggle');
const logo = document.getElementById('header-logo');
const sun = themeToggle.querySelector('.sun-icon');
const moon = themeToggle.querySelector('.moon-icon');
const darkLogo = logo.querySelector('.darkMode');
const lightLogo = logo.querySelector('.lightMode');
const header = document.querySelector('.full-header');
const headerText = document.querySelectorAll('.main-nav-link');
const heroBg = document.querySelector('.hero-container');
const bgGrid = document.getElementById('bg-grid');
const fullContainerBg = document.querySelector('.full-container');
const hamburgerSpan = document.querySelectorAll('.hamburger span');
const testimonialSection = document.getElementById('testimonials');
const mainTrackersContainer = document.getElementById('main-trackers-container');
const trackItems = document.querySelectorAll('.track-item');
const latestWork = document.getElementById('jump');
const darkBgHamburger = document.getElementById('main-nav-list');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
        moon.classList.remove('active');
        sun.classList.add('active');
        darkLogo.classList.add('active');
        lightLogo.classList.remove('active');
        header.classList.add('h-black');
        header.classList.remove('h-white');
        headerText.forEach(element => {
            element.classList.add('w-text-color');
            element.classList.remove('d-text-color');
        });
        heroBg.classList.add('d-bg-color');
        heroBg.classList.remove('w-bg-color');
        bgGrid.classList.add('background-grid-dark');
        bgGrid.classList.remove('background-grid-light');
        fullContainerBg.classList.add('d-bg-color');
        fullContainerBg.classList.remove('w-bg-color');
        //themeToggle.style.backgroundColor = '#FFC107';
        hamburgerSpan.forEach(element => {
            element.style.backgroundColor = '#F0EB8D';
        });
        testimonialSection.classList.add('adaptive-bg-black');
        testimonialSection.classList.remove('adaptive-bg-white');
        mainTrackersContainer.classList.add('d-bg-color');
        mainTrackersContainer.classList.remove('w-bg-color');
        trackItems.forEach(element => {
            element.style.border = '1px solid var(--main-color-p2)';
            element.style.color = 'var(--bg-white-color)';
            element.style.backgroundColor = '#7952b38a';

        });
        latestWork.classList.add('adaptive-bg-black');
        latestWork.classList.remove('adaptive-bg-white');
        darkBgHamburger.classList.remove('main-nav-list-w-bg');
        darkBgHamburger.classList.add('main-nav-list-d-bg');

    } else {
        sun.classList.remove('active');
        moon.classList.add('active');
        lightLogo.classList.add('active');
        darkLogo.classList.remove('active');
        header.classList.add('h-white');
        header.classList.remove('h-black');
        headerText.forEach(element => {
            element.classList.add('d-text-color');
            element.classList.remove('w-text-color');
        });
        heroBg.classList.add('w-bg-color');
        heroBg.classList.remove('d-bg-color');
        bgGrid.classList.add('background-grid-light');
        bgGrid.classList.remove('background-grid-dark');
        fullContainerBg.classList.add('w-bg-color');
        fullContainerBg.classList.remove('d-bg-color');
        //themeToggle.style.backgroundColor = '#7952b38a';
        hamburgerSpan.forEach(element => {
            element.style.backgroundColor = '#7952b38a';
        });
        testimonialSection.classList.add('adaptive-bg-white');
        testimonialSection.classList.remove('adaptive-bg-black');
        mainTrackersContainer.classList.add('w-bg-color');
        mainTrackersContainer.classList.remove('d-bg-color');

        trackItems.forEach(element => {
            element.style.border = '1px solid var(--main-color-p2)';
            element.style.color = '#6700ff';//'var(--main-color)';
            element.style.backgroundColor = 'var(--light-main-transparent-box-shadow)';

        });
        latestWork.classList.add('adaptive-bg-white');
        latestWork.classList.remove('adaptive-bg-black');
        darkBgHamburger.classList.remove('main-nav-list-d-bg');
        darkBgHamburger.classList.add('main-nav-list-w-bg');

    }
});
