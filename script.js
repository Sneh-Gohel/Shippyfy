document.addEventListener("DOMContentLoaded", function () {
    const h1 = document.querySelector(".customer h1");
    const images = document.querySelectorAll(".customer .mainContent img");
    const leftSide = document.querySelector(".section3 .leftSide");
    const rightSide = document.querySelector(".section3 .rightSide img");
    const textElements = document.querySelectorAll(".section3 .leftSide > *");
    const section4text = document.querySelectorAll(".section4 h1");
    const cards = document.querySelectorAll(".section4 .card");
    const testimonials = document.querySelectorAll(".testimonials .testimonial-card");
    const faqItems = document.querySelectorAll(".faq-item");
    const contactElements = document.querySelectorAll(".contact-method, .contact-section h2, .website-credits");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    if (entry.target.classList.contains("leftSide")) {
                        textElements.forEach((el, i) => {
                            el.style.animation = `fadeInLeft 0.8s ease-out ${i * 0.2}s forwards`;
                        });
                    } else if (entry.target.classList.contains("rightSide")) {
                        entry.target.style.animation = `fadeInRight 0.8s ease-out forwards`;
                    } else if (entry.target.classList.contains("section4text")) {
                        entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
                    } else if (entry.target.classList.contains("card")) {
                        entry.target.style.animation = `slideInFromLeft 0.6s ease-out ${index * 0.2}s forwards`;
                    } else if (entry.target.classList.contains("testimonial-card")) {
                        entry.target.style.animation = `slideInFromRight 0.6s ease-out ${index * 0.2}s forwards`;
                    } else if (entry.target.classList.contains("faq-item")) {
                        entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`;
                    } else if (entry.target.classList.contains("contact-method")) {
                        entry.target.style.animation = `bounceIn 0.8s ease-out ${index * 0.2}s forwards`;
                    } else if (entry.target.classList.contains("website-credits")) {
                        entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
                    } else {
                        entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`;
                    }
                    entry.target.dataset.animated = "true"; // Prevent re-animation
                }
            });
        },
        { threshold: 0.3 }
    );

    images.forEach((image) => observer.observe(image));
    if (h1) observer.observe(h1);
    if (leftSide) observer.observe(leftSide);
    if (rightSide) observer.observe(rightSide);
    if (section4text) section4text.forEach((text) => observer.observe(text));
    cards.forEach((card) => observer.observe(card));
    testimonials.forEach((testimonial) => observer.observe(testimonial));
    faqItems.forEach((faq) => observer.observe(faq));
    contactElements.forEach((contact) => observer.observe(contact));
});

document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.faq-item.active');
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        item.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('.section');

    // Set home as active by default
    // document.getElementById('home').classList.add('active');
    document.getElementById('about').classList.add('active');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetSection = link.getAttribute('data-section');
            if (!targetSection) return;

            // Remove active class from all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Add active class to the target section
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                
                // Smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const priceFilterContainer = document.querySelector('.price-filter-container');
    const priceFilterToggle = document.querySelector('.price-filter-toggle');
    const priceFilterDropdown = document.querySelector('.price-filter-dropdown');
    const customRangeContainer = document.querySelector('.custom-range-container');
    const customRangeRadio = document.querySelector('#custom-range');
    const rangeInputs = document.querySelectorAll('input[name="price-range"]');
    
    // Toggle dropdown visibility
    priceFilterToggle.addEventListener('click', function() {
      const isVisible = priceFilterDropdown.style.display === 'block';
      priceFilterDropdown.style.display = isVisible ? 'none' : 'block';
    });
    
    // Show/hide custom range based on selection
    rangeInputs.forEach(input => {
      input.addEventListener('change', function() {
        customRangeContainer.style.display = this.id === 'custom-range' ? 'block' : 'none';
      });
    });
    
    // Range slider functionality
    const rangeMin = document.querySelector('.range-min');
    const rangeMax = document.querySelector('.range-max');
    const inputMin = document.querySelector('.input-min');
    const inputMax = document.querySelector('.input-max');
    const progress = document.querySelector('.progress');
    
    function updateSlider() {
      const minVal = parseInt(rangeMin.value);
      const maxVal = parseInt(rangeMax.value);
      
      inputMin.value = minVal;
      inputMax.value = maxVal;
      
      progress.style.left = (minVal / rangeMin.max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeMax.max) * 100 + "%";
    }
    
    rangeMin.addEventListener('input', updateSlider);
    rangeMax.addEventListener('input', updateSlider);
    
    inputMin.addEventListener('change', function() {
      rangeMin.value = this.value;
      updateSlider();
    });
    
    inputMax.addEventListener('change', function() {
      rangeMax.value = this.value;
      updateSlider();
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!priceFilterContainer.contains(e.target)) {
        priceFilterDropdown.style.display = 'none';
      }
    });
    
    // Set predefined ranges
    document.querySelector('#range1').addEventListener('change', function() {
      rangeMin.value = 0;
      rangeMax.value = 100;
      updateSlider();
    });
    
    document.querySelector('#range2').addEventListener('change', function() {
      rangeMin.value = 100;
      rangeMax.value = 300;
      updateSlider();
    });
    
    document.querySelector('#range3').addEventListener('change', function() {
      rangeMin.value = 300;
      rangeMax.value = 600;
      updateSlider();
    });
    
    document.querySelector('#range4').addEventListener('change', function() {
      rangeMin.value = 600;
      rangeMax.value = 1000;
      updateSlider();
    });
  });

document.addEventListener('DOMContentLoaded', function() {
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(img => {
        const loader = img.parentElement.querySelector('.image-loader');
        loader.style.display = 'block';
        
        if (img.complete) {
            // Image already loaded
            img.classList.add('loaded');
            loader.style.display = 'none';
        } else {
            img.addEventListener('load', function() {
                img.classList.add('loaded');
                loader.style.display = 'none';
            });
            
            img.addEventListener('error', function() {
                loader.style.display = 'none';
                // Handle error (maybe show placeholder)
            });
        }
    });
});

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Add these variables at the top
const loginSignupContainer = document.querySelector('.login_signup_container');
const loginButtons = document.querySelectorAll('.login, .signUp');
const closeModal = document.createElement('button');

// Create close button
closeModal.className = 'close-modal';
closeModal.innerHTML = '&times;';
loginSignupContainer.appendChild(closeModal);

// Toggle modal function
function toggleModal() {
    loginSignupContainer.classList.toggle('active');
    document.body.style.overflow = loginSignupContainer.classList.contains('active') ? 'hidden' : '';
}

// Event listeners for login/signup buttons
loginButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal();
        
        // Switch to the correct panel based on which button was clicked
        if (button.classList.contains('signUp')) {
            container.classList.add("right-panel-active");
        } else {
            container.classList.remove("right-panel-active");
        }
    });
});

// Close modal when clicking close button, overlay, or pressing ESC
closeModal.addEventListener('click', toggleModal);
loginSignupContainer.addEventListener('click', (e) => {
    if (e.target === loginSignupContainer) {
        toggleModal();
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginSignupContainer.classList.contains('active')) {
        toggleModal();
    }
});

// Updated sign up/in button handlers
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const suffix = stat.textContent.includes('%') ? '%' : '';
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            
            let current = start;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('about-stats')) {
                    animateStats();
                }
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe about sections
    document.querySelectorAll('.about-mission, .about-timeline, .about-team, .about-stats').forEach(section => {
        aboutObserver.observe(section);
    });
});