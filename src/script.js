// ==========================================
// GLOBAL PLANT GENETICS - INTERACTIONS
// ==========================================

// Wrap everything in an IIFE to prevent global scope pollution
(function() {
'use strict';

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 100) {
        nav.style.padding = '0.75rem 0';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.padding = '1rem 0';
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only prevent default for anchor links that point to elements on the page
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80; // Account for fixed nav

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
const animateOnScroll = document.querySelectorAll('.program-card, .stat-item, .youtube-card, .feature-item');

animateOnScroll.forEach(el => {
    // Set initial state
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

    observer.observe(el);
});

// ==========================================
// PROGRAM CARDS INTERACTION
// ==========================================

const programCards = document.querySelectorAll('.program-card');

programCards.forEach((card, index) => {
    // Add subtle parallax effect on mouse move
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// ==========================================
// YOUTUBE CARDS - CLICK TO OPEN
// ==========================================

const youtubeCards = document.querySelectorAll('.youtube-card');

youtubeCards.forEach(card => {
    card.addEventListener('click', () => {
        // Open YouTube channel in new tab
        window.open('https://www.youtube.com/c/GlobalPlantGenetics', '_blank');
    });

    // Add cursor pointer
    card.style.cursor = 'pointer';

    // Enhance play button interaction
    const playButton = card.querySelector('.youtube-play-button');
    if (playButton) {
        card.addEventListener('mouseenter', () => {
            playButton.style.transform = 'scale(1.15)';
        });

        card.addEventListener('mouseleave', () => {
            playButton.style.transform = 'scale(1)';
        });
    }
});

// ==========================================
// HERO PARALLAX EFFECT
// ==========================================

const heroGradient = document.querySelector('.hero-gradient');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = document.querySelector('.hero').offsetHeight;

    if (scrolled < heroHeight) {
        // Parallax effect - move slower than scroll
        heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroGradient.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
    }
});

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const finalText = statNumber.textContent;

            // Only animate if it's a number
            if (!isNaN(parseInt(finalText))) {
                const finalNumber = parseInt(finalText);
                const duration = 1000; // 1 second - faster animation
                const stepTime = 50;
                const steps = duration / stepTime;
                const increment = finalNumber / steps;
                let current = 0;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= finalNumber) {
                        statNumber.textContent = finalText;
                        clearInterval(counter);
                    } else {
                        statNumber.textContent = Math.floor(current) + '+';
                    }
                }, stepTime);
            }

            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// GRADIENT ANIMATION VARIATION
// ==========================================

// Add subtle mouse movement effect to hero gradient
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
});

function animateGradient() {
    const hero = document.querySelector('.hero-gradient::before');
    if (hero) {
        const xOffset = (mouseX - 0.5) * 20;
        const yOffset = (mouseY - 0.5) * 20;
        // This would be applied via CSS custom properties in a more complex setup
    }
    requestAnimationFrame(animateGradient);
}

// Start gradient animation
requestAnimationFrame(animateGradient);

// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

// Debounce function for scroll/resize events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    // Any expensive scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==========================================
// LAZY LOAD OPTIMIZATION
// ==========================================

// Add loading states for images when we add them
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Add keyboard navigation for cards
programCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');

    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// Ensure focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid #4a9d6f;
        outline-offset: 4px;
    }
`;
document.head.appendChild(focusStyle);

// ==========================================
// CONSOLE WELCOME MESSAGE
// ==========================================

console.log(
    '%c🌱 Global Plant Genetics',
    'color: #4a9d6f; font-size: 24px; font-weight: bold; font-family: "Crimson Pro", serif;'
);
console.log(
    '%cPioneering Excellence in Plant Genetics Since 2015',
    'color: #2d7a4f; font-size: 14px; font-family: "DM Sans", sans-serif;'
);
console.log(
    '%cWebsite designed and developed with passion 🚀',
    'color: #666; font-size: 12px; font-style: italic;'
);

// ==========================================
// INITIALIZATION COMPLETE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Global Plant Genetics website initialized successfully');

    // Add loaded class to body for any CSS animations that need it
    document.body.classList.add('loaded');
});

})(); // End of IIFE
