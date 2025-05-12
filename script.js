document.addEventListener("DOMContentLoaded", function () {
    // Animation observer for elements
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
                    entry.target.dataset.animated = "true";
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

    // FAQ toggle functionality
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // Section navigation
    const links = document.querySelectorAll('.nav a');
    const sections = document.querySelectorAll('.section');
    document.getElementById('home').classList.add('active');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            if (!targetSection) return;

            sections.forEach(section => {
                section.classList.remove('active');
            });

            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Price filter functionality
    const priceFilterContainer = document.querySelector('.price-filter-container');
    if (priceFilterContainer) {
        const priceFilterToggle = priceFilterContainer.querySelector('.price-filter-toggle');
        const priceFilterDropdown = priceFilterContainer.querySelector('.price-filter-dropdown');
        const customRangeContainer = priceFilterContainer.querySelector('.custom-range-container');
        const rangeInputs = priceFilterContainer.querySelectorAll('input[name="price-range"]');
        
        priceFilterToggle.addEventListener('click', function() {
            const isVisible = priceFilterDropdown.style.display === 'block';
            priceFilterDropdown.style.display = isVisible ? 'none' : 'block';
        });
        
        rangeInputs.forEach(input => {
            input.addEventListener('change', function() {
                customRangeContainer.style.display = this.id === 'custom-range' ? 'block' : 'none';
            });
        });
        
        const rangeMin = priceFilterContainer.querySelector('.range-min');
        const rangeMax = priceFilterContainer.querySelector('.range-max');
        const inputMin = priceFilterContainer.querySelector('.input-min');
        const inputMax = priceFilterContainer.querySelector('.input-max');
        const progress = priceFilterContainer.querySelector('.progress');
        
        function updateSlider() {
            const minVal = parseInt(rangeMin.value);
            const maxVal = parseInt(rangeMax.value);
            
            inputMin.value = minVal;
            inputMax.value = maxVal;
            
            progress.style.left = (minVal / rangeMin.max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeMax.max) * 100 + "%";
        }
        
        if (rangeMin && rangeMax) {
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
        }
        
        document.addEventListener('click', function(e) {
            if (!priceFilterContainer.contains(e.target)) {
                priceFilterDropdown.style.display = 'none';
            }
        });
    }

    // Image loading animation
    document.querySelectorAll('.product-image').forEach(img => {
        const loader = img.parentElement.querySelector('.image-loader');
        if (loader) {
            loader.style.display = 'block';
            
            if (img.complete) {
                img.classList.add('loaded');
                loader.style.display = 'none';
            } else {
                img.addEventListener('load', function() {
                    img.classList.add('loaded');
                    loader.style.display = 'none';
                });
                
                img.addEventListener('error', function() {
                    loader.style.display = 'none';
                });
            }
        }
    });

    // Login/Signup modal functionality
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const loginSignupContainer = document.querySelector('.login_signup_container');
    const loginButtons = document.querySelectorAll('.login, .signUp');
    
    // Create close button
    const closeModal = document.createElement('button');
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
            
            if (button.classList.contains('signUp')) {
                container.classList.add("right-panel-active");
            } else {
                container.classList.remove("right-panel-active");
            }
        });
    });

    // Close modal handlers
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

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    // Form submissions
    document.querySelector('.sign-up-container form')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = this;
        const formData = new URLSearchParams();
        formData.append('name', form.querySelector('input[type="text"]').value);
        formData.append('email', form.querySelector('input[type="email"]').value);
        formData.append('password', form.querySelector('input[type="password"]').value);

        const submitBtn = form.querySelector('button');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing Up...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('http://localhost/Shippyfy/signup.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP error! status: ${response.status}`);
            }

            const data = await response.text();
            
            if (data.trim() === 'successful') {
                setCookie('user_email', form.querySelector('input[type="email"]').value, 24);
                setCookie('user_token', 'authenticated', 24);
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                setTimeout(() => {
                    toggleModal();
                    updateUserUI();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 1500);
            } else {
                throw new Error(data || 'Unknown error occurred');
            }
        } catch (error) {
            console.error('Signup Error:', error);
            submitBtn.innerHTML = '<i class="fas fa-times"></i> ' + (error.message || 'Signup failed');
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });

    document.querySelector('.sign-in-container form')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = this;
        const formData = new URLSearchParams();
        formData.append('email', form.querySelector('input[type="email"]').value);
        formData.append('password', form.querySelector('input[type="password"]').value);

        const submitBtn = form.querySelector('button');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('http://localhost/Shippyfy/login.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `HTTP error! status: ${response.status}`);
            }

            const data = await response.text();
            
            if (data.trim() === 'successful') {
                setCookie('user_email', form.querySelector('input[type="email"]').value, 24);
                setCookie('user_token', 'authenticated', 24);
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                setTimeout(() => {
                    toggleModal();
                    updateUserUI();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 1500);
            } else {
                throw new Error(data || 'Unknown error occurred');
            }
        } catch (error) {
            console.error('Login Error:', error);
            submitBtn.innerHTML = '<i class="fas fa-times"></i> ' + (error.message || 'Login failed');
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });

    // Cookie functions
    function setCookie(name, value, hours) {
        const date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }
        return null;
    }

    // User UI functions
    function updateUserUI() {
        const userEmail = getCookie('user_email');
        const loginButtons = document.querySelectorAll('.login, .signUp');
        const userDisplay = document.querySelector('.user-display');
        
        if (userEmail) {
            loginButtons.forEach(btn => btn.style.display = 'none');
            
            if (!userDisplay) {
                const userDisplayDiv = document.createElement('div');
                userDisplayDiv.className = 'user-display mainButton';
                userDisplayDiv.innerHTML = `
                    <i class="fas fa-user"></i>
                    ${userEmail.split('@')[0]}
                `;
                
                userDisplayDiv.addEventListener('click', () => {
                    document.cookie = "user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    location.reload();
                });
                
                const subNav = document.querySelector('.subNav');
                const cartBtn = document.querySelector('.cart');
                if (subNav && cartBtn) {
                    subNav.insertBefore(userDisplayDiv, cartBtn.nextSibling);
                }
            } else {
                userDisplay.style.display = 'flex';
            }
        } else {
            loginButtons.forEach(btn => btn.style.display = 'flex');
            if (userDisplay) {
                userDisplay.style.display = 'none';
            }
        }
    }

    // Buy Containers data loading
    let isBuyContainerDataLoaded = false;

    function fetchBuyContainerData() {
        const productContainer = document.querySelector('#buyContainers .product');
        if (!productContainer) return;
        
        productContainer.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Loading available containers...</p>
            </div>
        `;

        fetch('http://localhost/Shippyfy/getBuyContainerData.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    renderBuyContainerData(data);
                } else {
                    showEmptyState();
                }
                isBuyContainerDataLoaded = true;
            })
            .catch(error => {
                console.error('Error fetching container data:', error);
                showErrorState(error);
            });
    }

    function renderBuyContainerData(containers) {
        const productContainer = document.querySelector('#buyContainers .product');
        if (!productContainer) return;
        
        productContainer.innerHTML = `
            <div class="product">
                ${containers.map(container => `
                    <div class="productContainers">
                        <div class="leftSide">
                            <div class="image-loader"></div>
                            <img src="${container.image}" alt="${container.name}" class="product-image">
                        </div>
                        <div class="rightSide">
                            <div class="productName">
                                <h2>${container.name}</h2>
                            </div>
                            <div class="productPrice">
                                <h3>₹ ${container.price}</h3>
                            </div>
                            <div class="productDescription">
                                <div class="spec">
                                    <h4>Length:</h4>
                                    <p>${container.length}</p>
                                </div>
                                <div class="spec">
                                    <h4>Material:</h4>
                                    <p>${container.material}</p>
                                </div>
                                <div class="spec">
                                    <h4>Usage:</h4>
                                    <p>${container.usage}</p>
                                </div>
                                <div class="spec">
                                    <h4>Weight:</h4>
                                    <p>${container.weight} kg</p>
                                </div>
                            </div>
                            <div class="buttonGroup">
                                <button class="addToCart mainButton">
                                    <i class="fas fa-cart-plus"></i> Add to Cart
                                </button>
                                <button class="buyNow secondaryButton">
                                    <i class="fas fa-bolt"></i> Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        initializeImageLoaders();
    }

    function showEmptyState() {
        const productContainer = document.querySelector('#buyContainers .product');
        if (!productContainer) return;
        
        productContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>No Containers Available</h3>
                <p>We currently don't have any containers available for purchase. Please check back later.</p>
            </div>
        `;
    }

    function showErrorState(error) {
        const productContainer = document.querySelector('#buyContainers .product');
        if (!productContainer) return;
        
        productContainer.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error Loading Data</h3>
                <p>${error.message || 'Failed to load container data'}</p>
                <button class="retry-button" id="retryButton">Retry</button>
            </div>
        `;

        document.getElementById('retryButton')?.addEventListener('click', fetchBuyContainerData);
    }

    function initializeImageLoaders() {
        document.querySelectorAll('#buyContainers .product-image').forEach(img => {
            const loader = img.parentElement.querySelector('.image-loader');
            if (loader) {
                loader.style.display = 'block';
                
                if (img.complete) {
                    img.classList.add('loaded');
                    loader.style.display = 'none';
                } else {
                    img.addEventListener('load', function() {
                        img.classList.add('loaded');
                        loader.style.display = 'none';
                    });
                    
                    img.addEventListener('error', function() {
                        loader.style.display = 'none';
                        img.src = 'images/containers/container1.png';
                    });
                }
            }
        });
    }

    // Setup buy container observer
    const buyContainerSection = document.getElementById('buyContainers');
    if (buyContainerSection) {
        const buyContainerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isBuyContainerDataLoaded) {
                    fetchBuyContainerData();
                }
            });
        }, { threshold: 0.1 });

        buyContainerObserver.observe(buyContainerSection);
    }

    // Initialize user UI
    updateUserUI();

    // Contact form submission
    document.querySelector('.animated-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                form.reset();
            }, 2000);
        }, 1500);
    });

    // 3D container interaction
    const floatingContainer = document.querySelector('.floating-container model-viewer');
    if (floatingContainer) {
        floatingContainer.addEventListener('mouseenter', () => {
            floatingContainer.setAttribute('auto-rotate-delay', '0');
            floatingContainer.setAttribute('rotation-per-second', '30deg');
        });
        
        floatingContainer.addEventListener('mouseleave', () => {
            floatingContainer.setAttribute('auto-rotate-delay', '3000');
            floatingContainer.setAttribute('rotation-per-second', '10deg');
        });
    }

    // Mouse movement effect for floating container
    document.addEventListener('mousemove', (e) => {
        const container = document.querySelector('.floating-container');
        if (!container) return;
        
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        container.style.transform = `
            translateX(${x * 20}px) 
            translateY(${y * 20}px)
            rotateX(${y * 5}deg) 
            rotateY(${x * 5}deg)
        `;
    });
});