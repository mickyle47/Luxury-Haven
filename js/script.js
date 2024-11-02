// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

mobileMenu?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu?.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Stats Counter Animation
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        obj.textContent = Math.floor(easeProgress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Handle stat counter animation
            if (entry.target.classList.contains('stat')) {
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement && !numberElement.classList.contains('animated')) {
                    const finalValue = parseInt(numberElement.textContent);
                    animateValue(numberElement, 0, finalValue, 2000);
                    numberElement.classList.add('animated');
                }
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const elementsToAnimate = [
    '.room-card', 
    '.amenity-item', 
    '.stat', 
    '.about-content', 
    'h2', 
    '.contact-container', 
    '.footer-content',
    '.quick-links li'
];

elementsToAnimate.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
        observer.observe(element);
    });
});

// Handle scroll events for navbar
let lastScroll = 0;
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class based on scroll position
    if (currentScroll > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Contact form handling with email functionality
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitButton = this.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonIcon = submitButton.querySelector('.button-icon');
    
    // Disable button and show loading state
    submitButton.disabled = true;
    buttonText.textContent = 'Sending...';
    buttonIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // Prepare email content
    const emailContent = `
        Name: ${formData.get('name')}
        Email: ${formData.get('email')}
        Phone: ${formData.get('phone')}
        Message: ${formData.get('message')}
    `;

    // Send email using SMTP.js
    Email.send({
        SecureToken: "your-smtp-secure-token", // Replace with your SMTP.js secure token
        To: 'mickylegs4@gmail.com',
        From: formData.get('email'),
        Subject: "New Contact Form Submission - Luxury Haven",
        Body: emailContent
    }).then(message => {
        // Reset button state
        submitButton.disabled = false;
        buttonText.textContent = 'Send Message';
        buttonIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';

        if (message === "OK") {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('There was an error sending your message. Please try again later.');
        }
    });
});

// Quick Links Animation
const quickLinks = document.querySelectorAll('.quick-links li');
quickLinks.forEach((link, index) => {
    link.style.transitionDelay = `${index * 0.1}s`;
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger hero content animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('visible');
    }
    
    // Add smooth transition for page load
    document.body.classList.add('loaded');

    // Animate quick links
    setTimeout(() => {
        quickLinks.forEach(link => link.classList.add('visible'));
    }, 500);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 768) { // Only apply parallax on larger screens
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.backgroundPositionY = `${rate}px`;
    }
});

// Add hover effects for interactive elements
const interactiveElements = document.querySelectorAll(
    '.cta-button, .room-button, .submit-button, .amenity-item, .social-links a'
);

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
