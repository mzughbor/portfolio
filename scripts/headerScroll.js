
/* making the header showing and desapering when scroll up and down...*/
document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector(".header");
    let lastScrollTop = 0;
    const headerHeight = header.offsetHeight;

    // Ensure the header is visible on first page load
    header.classList.add("sticky");

    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.remove("small", "sticky");
        } else {
            // Scrolling up
            if (scrollTop < headerHeight) {
                header.classList.add("small");
                header.classList.remove("sticky");
            } else {
                header.classList.add("sticky");
                header.classList.remove("small");
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative values
    });    
});
