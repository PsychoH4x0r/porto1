// utils.js

// Fungsi untuk mengecek apakah elemen berada dalam viewport
export function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Fungsi untuk animasi scroll
export function animateOnScroll(elements, animationClass) {
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add(animationClass);
        }
    });
}

// Fungsi untuk debounce
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fungsi untuk throttle
export function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Fungsi untuk format tanggal
export function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Fungsi untuk validasi email
export function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Fungsi untuk sanitasi input
export function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Fungsi untuk menangani error
export function handleError(error, element) {
    console.error(error);
    if (element) {
        element.innerHTML = `<div class="error-message">An error occurred. Please try again later.</div>`;
    }
}

// Fungsi untuk loading state
export function setLoadingState(element, isLoading) {
    if (element) {
        if (isLoading) {
            element.classList.add('loading');
            element.disabled = true;
        } else {
            element.classList.remove('loading');
            element.disabled = false;
        }
    }
}

// Fungsi untuk menangani form submission
export function handleFormSubmit(form, onSubmit) {
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        setLoadingState(submitButton, true);

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            await onSubmit(data);
            
            form.reset();
            form.classList.add('success');
            setTimeout(() => form.classList.remove('success'), 3000);
        } catch (error) {
            handleError(error, form);
        } finally {
            setLoadingState(submitButton, false);
        }
    });
}

// Fungsi untuk menangani scroll smooth
export function smoothScroll(target, duration = 800) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Fungsi untuk menangani responsive images
export function handleResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Fungsi untuk menangani theme switching
export function initThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Fungsi untuk menangani mobile menu
export function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
}

// Fungsi untuk menangani scroll to top
export function initScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    scrollButton.addEventListener('click', () => {
        smoothScroll('body');
    });
}

// Fungsi untuk menangani lazy loading
export function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
}

// Fungsi untuk menangani cookie consent
export function initCookieConsent() {
    const cookieConsent = document.querySelector('.cookie-consent');
    if (!cookieConsent) return;

    if (!localStorage.getItem('cookieConsent')) {
        cookieConsent.classList.add('visible');
    }

    const acceptButton = cookieConsent.querySelector('.accept-cookies');
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookieConsent.classList.remove('visible');
        });
    }
}

// Fungsi untuk menangani form validation
export function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    if (!forms.length) return;

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });
        });

        form.addEventListener('submit', (e) => {
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });
}

// Fungsi untuk validasi input
function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;

    if (!value) {
        showError(input, 'This field is required');
        isValid = false;
    } else if (type === 'email' && !isValidEmail(value)) {
        showError(input, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(input);
    }

    return isValid;
}

// Fungsi untuk menampilkan error
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    let errorDiv = formGroup.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        formGroup.appendChild(errorDiv);
    }

    errorDiv.textContent = message;
    input.classList.add('error');
}

// Fungsi untuk menghapus error
function clearError(input) {
    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }

    input.classList.remove('error');
}

// Fungsi untuk menambahkan kelas 'active' ke tautan navigasi yang sesuai dengan bagian yang sedang dilihat.
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

     sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

         if (window.pageYOffset >= sectionTop - (sectionHeight/3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Fungsi untuk menutup modal
function closeProjectDetails() {
    const activeDetails = document.querySelector('.project-details.active');
    if (activeDetails) {
        activeDetails.classList.remove('active');
    }

    const overlay = document.querySelector('.project-overlay-bg');
    if(overlay){
      overlay.classList.remove('active');
    }

    // Kembalikan scrolling pada body
    document.body.style.overflow = '';
}

export { isElementInViewport, animateOnScroll, smoothScroll, updateActiveNavLink, closeProjectDetails };