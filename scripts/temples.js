// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.textContent = '☰';
    });
});

// Dynamic footer dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Lazy loading images
const templeImages = document.querySelectorAll('img[data-src]');

const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 50px 0px'
};

const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImages(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, imageOptions);

    templeImages.forEach(image => {
        imageObserver.observe(image);
    });
} else {
    templeImages.forEach(image => {
        loadImages(image);
    });
}