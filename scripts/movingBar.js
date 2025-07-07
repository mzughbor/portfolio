const marquee = document.querySelector('.marquee');
const trackNewsBar = marquee.querySelector('.track');
const clone = trackNewsBar.cloneNode(true);
marquee.appendChild(clone);
