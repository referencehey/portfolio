/* Navigation Bar */

document.querySelectorAll('a[href^="#').forEach
(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute
        ('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    window.scrollY > 50 ?
    navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)' :
    navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)' ;
});

/* Contact Button */

const button = document.querySelector('.cta-button');

const startGradient = [89, 198, 255];
const endGradient = [0, 102, 255];
let animationFrame;
let progress = 0;
let direction = 1;

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function animateGradient() {
    const r = Math.round(lerp(startGradient[0], endGradient[0], progress));
    const g = Math.round(lerp(startGradient[1], endGradient[1], progress));
    const b = Math.round(lerp(startGradient[2], endGradient[2], progress));
    button.style.background = `linear-gradient(45deg, rgb(${r},${g},${b}), #0066ff)`;
}

function step() {
    progress += direction * 0.02;
    if (progress > 1) progress = 1;
    if (progress < 0) progress = 0;
    animateGradient();
    if ((direction === 1 && progress < 1) || (direction === -1 && progress > 0)) {
        animationFrame = requestAnimationFrame(step);
    }
}

button.addEventListener('mouseenter', () => {
    direction = 1;
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(step);
});

button.addEventListener('mouseleave', () => {
    direction = -1;
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(step);
});