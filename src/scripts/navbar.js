// hide navigation bar on scroll down, show on scroll up
const navbar = document.getElementById('navbar');
navbar.style = "transform: translateY(0);"
let prev = window.pageYOffset;
window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    if (prev > current) {
        navbar.style = "transform: translateY(0); transition: transform 0.4s ease-in-out;"
    } else {
        navbar.style = "transform: translateY(-60px); transition: transform 0.3s ease-in-out;"
    }
    prev = current;
});