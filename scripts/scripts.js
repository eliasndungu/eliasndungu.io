// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link (for mobile)
    const navLinks = document.querySelectorAll('.navbar-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Counter Animation Function
    function animateCounter(elementId, targetValue, duration = 2000, prefix = '', suffix = '') {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startValue = 0;
        const increment = targetValue / (duration / 16);
        let currentValue = startValue;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            
            // Format numbers with commas for thousands
            const formattedValue = Number(currentValue.toFixed(1)).toLocaleString();
            element.textContent = prefix + formattedValue + suffix;
        }, 16);
    }

    // Testimonial Slider
    const testimonialSlider = document.getElementById('testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;

    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = testimonialSlides.length - 1;
            showSlide(newIndex);
        });

        nextButton.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonialSlides.length) newIndex = 0;
            showSlide(newIndex);
        });
    }

    // Dot navigation for testimonials
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-index'));
            showSlide(slideIndex);
        });
    });

    // Auto-slide testimonials
    let testimonialInterval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonialSlides.length) newIndex = 0;
        showSlide(newIndex);
    }, 5000);

    // Pause testimonial auto-slide on hover
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonialSlides.length) newIndex = 0;
                showSlide(newIndex);
            }, 5000);
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                company: this.querySelector('#company').value,
                message: this.querySelector('#message').value
            };
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Neural network animation effects for hero section
    function animateNeuralNetwork() {
        const nodes = document.querySelectorAll('.node');
        const connections = document.querySelectorAll('.connection');
        
        // Randomly activate nodes
        nodes.forEach(node => {
            setInterval(() => {
                node.classList.add('active');
                setTimeout(() => {
                    node.classList.remove('active');
                }, 500 + Math.random() * 1000);
            }, 1000 + Math.random() * 3000);
        });
        
        // Randomly activate connections
        connections.forEach(connection => {
            setInterval(() => {
                connection.classList.add('pulse');
                setTimeout(() => {
                    connection.classList.remove('pulse');
                }, 500);
            }, 2000 + Math.random() * 2000);
        });
    }
    
    // Start neural network animation
    animateNeuralNetwork();

    // Scroll-triggered animations
    // Initialize counters when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hero metrics
                if (entry.target.id === 'hero') {
                    setTimeout(() => {
                        animateCounter('payment-counter', 7.2);
                        animateCounter('accuracy-counter', 99.8);
                        animateCounter('client-counter', 3);
                    }, 500);
                }
                
                // Stats section metrics
                if (entry.target.id === 'stats') {
                    setTimeout(() => {
                        animateCounter('farmers-counter', 12000, '', '+');
                        animateCounter('processed-counter', 7.2);
                        animateCounter('fraud-counter', 230);
                        animateCounter('speed-counter', 98);
                    }, 500);
                }
                
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
    
    // Observe stats section
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Sticky navigation on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
});
