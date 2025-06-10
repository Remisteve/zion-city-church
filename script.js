/**
 * GCCI Nanyuki Website - Main JavaScript File
 * Handles navigation, interactions, and dynamic features
 */

// Global variables
let isMenuOpen = false;
let currentPage = '';

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

/**
 * Initialize the website functionality
 */
function initializeWebsite() {
    setCurrentPage();
    initializeNavigation();
    initializeMenuToggle();
    initializeButtonInteractions();
    initializeGivingAmountButtons();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeSearchFunctionality();
    showWelcomeMessage();
    
    // Add loading states
    hideLoadingStates();
    
    console.log('GCCI Nanyuki website initialized successfully');
}

/**
 * Set the current page based on URL
 */
function setCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    currentPage = page.replace('.html', '');
    
    // Highlight current navigation item
    highlightCurrentNavItem();
}

/**
 * Highlight the current navigation item
 */
function highlightCurrentNavItem() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href) {
            const linkPage = href.split('/').pop().replace('.html', '');
            if (linkPage === currentPage || 
                (currentPage === 'index' && (href === 'index.html' || href === '/'))) {
                link.classList.add('active');
            }
        }
    });
}

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu when clicking a link
            closeMobileMenu();
            
            // Add loading state for page transitions
            if (this.href && !this.href.includes('#')) {
                showPageLoadingState();
            }
        });
    });
}

/**
 * Initialize mobile menu toggle functionality
 */
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && menuToggle && 
            !navMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navMenu && menuToggle) {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        isMenuOpen = !isMenuOpen;
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navMenu && menuToggle) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        isMenuOpen = false;
        document.body.style.overflow = '';
    }
}

/**
 * Initialize button interactions
 */
function initializeButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle buttons without specific functionality
            if (!this.getAttribute('onclick') && 
                !this.href && 
                !this.type === 'submit') {
                e.preventDefault();
                showComingSoonMessage(this);
            }
        });
        
        // Add hover effects for accessibility
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * Show "Coming Soon" message for placeholder buttons
 */
function showComingSoonMessage(button) {
    const originalText = button.textContent;
    const originalBackground = button.style.backgroundColor;
    
    button.textContent = 'Coming Soon!';
    button.style.backgroundColor = '#95a5a6';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = originalBackground;
        button.disabled = false;
    }, 2000);
}

/**
 * Initialize giving amount buttons
 */
function initializeGivingAmountButtons() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from siblings
            const siblings = this.parentElement.querySelectorAll('.amount-btn');
            siblings.forEach(sibling => {
                sibling.classList.remove('active');
                sibling.style.background = 'rgba(255,255,255,0.2)';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.style.background = 'rgba(255,255,255,0.4)';
            
            // Store selected amount
            const amount = this.textContent.replace('KSh ', '').replace(',', '');
            sessionStorage.setItem('selectedAmount', amount);
        });
    });
}

/**
 * Initialize contact form functionality
 */
function initializeContactForm() {
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

/**
 * Handle form submission
 */
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('[type="submit"]');
    
    if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Sent!';
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    }
    
    console.log('Form submitted:', Object.fromEntries(formData));
}

/**
 * Initialize smooth scrolling
 */
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize search functionality
 */
function initializeSearchFunctionality() {
    const searchInputs = document.querySelectorAll('input[type="search"], .search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            performSearch(searchTerm);
        });
    });
}

/**
 * Perform search functionality
 */
function performSearch(searchTerm) {
    const searchableElements = document.querySelectorAll('.event-item, .card, .satellite-item');
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        const isVisible = text.includes(searchTerm) || searchTerm === '';
        
        element.style.display = isVisible ? 'block' : 'none';
        
        // Add highlight effect for found terms
        if (searchTerm && isVisible && searchTerm.length > 2) {
            highlightSearchTerm(element, searchTerm);
        } else {
            removeSearchHighlight(element);
        }
    });
}

/**
 * Highlight search terms
 */
function highlightSearchTerm(element, term) {
    const originalHTML = element.getAttribute('data-original-html') || element.innerHTML;
    element.setAttribute('data-original-html', originalHTML);
    
    const regex = new RegExp(`(${term})`, 'gi');
    const highlightedHTML = originalHTML.replace(regex, '<mark>$1</mark>');
    element.innerHTML = highlightedHTML;
}

/**
 * Remove search highlights
 */
function removeSearchHighlight(element) {
    const originalHTML = element.getAttribute('data-original-html');
    if (originalHTML) {
        element.innerHTML = originalHTML;
        element.removeAttribute('data-original-html');
    }
}

/**
 * Show welcome message for first-time visitors
 */
function showWelcomeMessage() {
    if (!localStorage.getItem('hasVisited')) {
        setTimeout(() => {
            showNotification(
                'Welcome to Grace Community Church International - Nanyuki! 🙏',
                'We are blessed to have you visit our website. Feel free to explore and learn more about our church family.',
                'info'
            );
            localStorage.setItem('hasVisited', 'true');
        }, 2000);
    }
}

/**
 * Show notification/toast message
 */
function showNotification(title, message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db',
        color: 'white',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: '10001',
        maxWidth: '300px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeNotification(notification);
        }
    }, 5000);
}

/**
 * Close notification
 */
function closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 300);
}

/**
 * Show page loading state
 */
function showPageLoadingState() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="loading"></div>
            <p>Loading...</p>
        </div>
    `;
    
    Object.assign(loadingOverlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(255,255,255,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000'
    });
    
    document.body.appendChild(loadingOverlay);
    
    // Remove after page loads
    window.addEventListener('load', () => {
        if (document.body.contains(loadingOverlay)) {
            document.body.removeChild(loadingOverlay);
        }
    });
}

/**
 * Hide loading states
 */
function hideLoadingStates() {
    const loadingElements = document.querySelectorAll('.loading-state');
    loadingElements.forEach(element => {
        element.style.display = 'none';
    });
}

/**
 * Initialize lazy loading for images
 */
function initializeLazyLoading() {
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

/**
 * Scroll to top functionality
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Initialize scroll to top button
 */
function initializeScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.onclick = scrollToTop;
    
    Object.assign(scrollButton.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: '#3498db',
        color: 'white',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        display: 'none',
        zIndex: '1000',
        transition: 'all 0.3s'
    });
    
    document.body.appendChild(scrollButton);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
}

/**
 * Handle window resize
 */
function handleWindowResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}

// Window event listeners
window.addEventListener('resize', handleWindowResize);

// Initialize scroll to top when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollToTop();
    initializeLazyLoading();
});

/**
 * Utility functions
 */

// Format currency
function formatCurrency(amount, currency = 'KSh') {
    return `${currency} ${Number(amount).toLocaleString()}`;
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Debounce function for search
function debounce(func, wait) {
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

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // Implement actual analytics tracking here
}

// Export functions for use in other files
window.GCCIWebsite = {
    showNotification,
    closeNotification,
    toggleMobileMenu,
    closeMobileMenu,
    scrollToTop,
    trackEvent,
    formatCurrency,
    validateEmail
};

// Service Worker registration (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}