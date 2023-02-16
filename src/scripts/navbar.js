// hide navigation bar on scroll down, show on scroll up
const navbar = document.getElementById('navbar');
const userbar = document.getElementById('userbar');
navbar.style = "transform: translateY(0);"
userbar.style = "transform: translateY(0); transition: transform 0.4s ease-in;"
let prev = window.pageYOffset;
window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (prev > current) {
        navbar.style = "transform: translateY(0); transition: transform 0.4s ease-in-out;"
        userbar.style = "transform: translateY(0px); transition: transform 0.4s ease-in-out;"
    } else {
        navbar.style = "transform: translateY(-60px); transition: transform 0.3s ease-in-out;"
        userbar.style = "transform: translateY(-40px); transition: transform 0.3s ease-in-out;"
    }
    prev = current;
});
// Set active nav links
const navbarLinks = document.querySelectorAll('.nav-button');
const currentUrl = window.location.pathname;
navbarLinks.forEach(link => {
    if (link.getAttribute('href') === currentUrl) {
        link.classList.add('nav-button-active');
    }
});