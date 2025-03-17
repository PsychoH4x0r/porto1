// animations.js
import { isElementInViewport, animateOnScroll } from './utils.js';

// Intersection Observer untuk animasi scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Fungsi untuk menginisialisasi animasi scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Fungsi untuk animasi cursor kustom
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Efek hover pada elemen yang bisa diklik
    const clickableElements = document.querySelectorAll('a, button, .clickable');
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Fungsi untuk animasi navbar
function initNavbarAnimation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// Fungsi untuk animasi mobile menu
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
}

// Fungsi untuk animasi progress bar
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    if (!progressBars.length) return;

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-progress') + '%';
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Fungsi untuk animasi parallax
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    if (!parallaxElements.length) return;

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(window.pageYOffset * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Fungsi untuk animasi glitch text
function initGlitchText() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    if (!glitchTexts.length) return;

    glitchTexts.forEach(text => {
        text.addEventListener('mouseover', () => {
            text.style.animation = 'none';
            text.offsetHeight; // Trigger reflow
            text.style.animation = null;
        });
    });
}

// Fungsi untuk animasi hover cards
function initHoverCards() {
    const cards = document.querySelectorAll('.featured-card, .update-card');
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;

            card.style.transform = `
                translateZ(40px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateZ(40px) rotateX(0) rotateY(0)';
        });
    });
}

// Fungsi untuk animasi typing effect
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    if (!typingElements.length) return;

    typingElements.forEach(element => {
        const text = element.getAttribute('data-text');
        if (!text) return;

        let i = 0;
        element.textContent = '';
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(element);
    });
}

// Inisialisasi semua animasi
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initCustomCursor();
    initNavbarAnimation();
    initMobileMenu();
    initProgressBars();
    initParallax();
    initGlitchText();
    initHoverCards();
    initTypingEffect();
});

export { initAnimations };