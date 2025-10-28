// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
// Close mobile menu when clicking on a normal nav link (not language or dark mode)
document.querySelectorAll('.nav-link').forEach(n => {
    if (!n.classList.contains('language-toggle-btn') && !n.classList.contains('dark-mode-toggle')) {
        n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    }
});


// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(17, 24, 39, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(17, 24, 39, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const subject = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.objective-card, .leader-card, .benefit-item, .timeline-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Counter animation for statistics (if needed in future)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Lazy loading for images (if added in future)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Back to top button
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #1e40af;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'translateY(-3px)';
        backToTopBtn.style.boxShadow = '0 6px 25px rgba(30, 64, 175, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'translateY(0)';
        backToTopBtn.style.boxShadow = '0 4px 20px rgba(30, 64, 175, 0.3)';
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Preloader functionality removed

// Language Toggle Functionality
function toggleLanguage() {
    const currentLang = window.location.pathname.includes('index-bm.html') ? 'BM' : 'EN';
    const switchTo = currentLang === 'EN' ? 'BM' : 'EN';
    const switchUrl = currentLang === 'EN' ? 'index-bm.html' : 'index.html';
    
    // Add toggle animation
    const toggleBtn = document.querySelector('.language-toggle-btn');
    if (toggleBtn) {
        toggleBtn.classList.add('toggling');
        setTimeout(() => {
            toggleBtn.classList.remove('toggling');
        }, 600);
    }
    
    // Save language preference
    localStorage.setItem('sogwa-language', switchTo);
    
    // Add loading effect
    setTimeout(() => {
        window.location.href = switchUrl;
    }, 300);
}

// Floating Language Toggle Button - REMOVED
// The floating toggle button has been removed as requested

// Language preference management
function setLanguagePreference() {
    const savedLang = localStorage.getItem('sogwa-language');
    const currentPath = window.location.pathname;

    const isBMPage = currentPath.includes('-bm.html');
    const isENPage = !isBMPage;

    // only redirect if the saved language and current language do not match
    if (savedLang === 'BM' && isENPage) {
        // user prefers BM but currently on EN
        const newUrl = currentPath.replace('.html', '-bm.html');
        if (newUrl !== currentPath) {
            window.location.href = newUrl;
        }
    } else if (savedLang === 'EN' && isBMPage) {
        // user prefers EN but currently on BM
        const newUrl = currentPath.replace('-bm.html', '.html');
        if (newUrl !== currentPath) {
            window.location.href = newUrl;
        }
    }
}


// Initialize language preference
document.addEventListener('DOMContentLoaded', setLanguagePreference);

// Dark Mode Functionality
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log('Toggling dark mode:', { currentTheme, newTheme });
    
    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    
    // Save preference
    localStorage.setItem('sogwa-theme', newTheme);
    
    // Update toggle button
    updateDarkModeToggle(newTheme);
    
    // Reset navbar styles to use CSS variables
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = '';
        navbar.style.boxShadow = '';
    }
    
    // Add toggle animation
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        toggleBtn.style.animation = 'togglePulse 0.6s ease-in-out';
        setTimeout(() => {
            toggleBtn.style.animation = '';
        }, 600);
    }
}

function updateDarkModeToggle(theme) {
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');
        const text = toggleBtn.querySelector('span');
        
        // Check if we're on a BM page
        const isBMPage = window.location.pathname.includes('-bm.html');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            text.textContent = isBMPage ? 'Terang' : 'Light';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = isBMPage ? 'Gelap' : 'Dark';
        }
    }
}

function initializeDarkMode() {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('sogwa-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    console.log('Initializing dark mode:', { savedTheme, systemPrefersDark, theme });
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme);
    
    
    // Update toggle button
    updateDarkModeToggle(theme);
    
    // Reset navbar styles to use CSS variables
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = '';
        navbar.style.boxShadow = '';
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('sogwa-theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateDarkModeToggle(newTheme);
            
            // Reset navbar styles when system theme changes
            if (navbar) {
                navbar.style.background = '';
                navbar.style.boxShadow = '';
            }
        }
    });
}

// Initialize dark mode when DOM is ready
document.addEventListener('DOMContentLoaded', initializeDarkMode);

// Also initialize when window loads (fallback)
window.addEventListener('load', () => {
    // Double-check that dark mode is properly initialized
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (!currentTheme) {
        console.log('Dark mode not initialized, re-initializing...');
        initializeDarkMode();
    }
});

// Debug function to test dark mode
function testDarkMode() {
    console.log('Testing dark mode...');
    document.documentElement.setAttribute('data-theme', 'dark');
    console.log('Dark mode applied, data-theme:', document.documentElement.getAttribute('data-theme'));
}

// Make test function available globally for debugging
window.testDarkMode = testDarkMode;

// Function to ensure dark mode toggle is properly set up
function ensureDarkModeToggle() {
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        // Ensure the toggle button has the correct event listener
        toggleBtn.onclick = toggleDarkMode;
        console.log('Dark mode toggle button found and configured');
    } else {
        console.log('Dark mode toggle button not found on this page');
    }
}

// Run this on every page load
document.addEventListener('DOMContentLoaded', ensureDarkModeToggle);
window.addEventListener('load', ensureDarkModeToggle);

// Add a simple test to check if dark mode is working
setTimeout(() => {
    console.log('Dark mode test - Current theme:', document.documentElement.getAttribute('data-theme'));
    console.log('Dark mode test - Body background:', getComputedStyle(document.body).backgroundColor);
    console.log('Dark mode test - Body color:', getComputedStyle(document.body).color);
    
    // Test if dark mode toggle is present
    const toggleBtn = document.querySelector('.dark-mode-toggle');
    if (toggleBtn) {
        console.log('Dark mode toggle button found:', toggleBtn);
    } else {
        console.log('ERROR: Dark mode toggle button not found on this page!');
    }
}, 1000);

// Global function to test dark mode on any page
window.testDarkModeOnPage = function() {
    console.log('=== Dark Mode Test ===');
    console.log('Page URL:', window.location.href);
    console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
    console.log('Toggle button found:', !!document.querySelector('.dark-mode-toggle'));
    console.log('Script loaded:', typeof toggleDarkMode === 'function');
    
    // Try to toggle dark mode
    if (typeof toggleDarkMode === 'function') {
        console.log('Attempting to toggle dark mode...');
        toggleDarkMode();
        console.log('New theme:', document.documentElement.getAttribute('data-theme'));
    } else {
        console.log('ERROR: toggleDarkMode function not found!');
    }
};

// Print functionality removed

// Console welcome message
console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║    Welcome to SOGWA Website!                                 ║
║    Sarawak Oil and Gas Workers Association                   ║
║                                                              ║
║    Built with modern web technologies                        ║
║    For the welfare of oil and gas workers in Sarawak        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);

// Automatically set the current year in the footer
// ✅ Auto-update footer year
window.addEventListener('load', () => {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        const thisYear = new Date().getFullYear();
        console.log("✅ Setting footer year to:", thisYear);
        yearSpan.textContent = thisYear;
    } else {
        console.warn("⚠️ Footer year span not found!");
    }
});



// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
