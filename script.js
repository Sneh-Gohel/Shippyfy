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
        if(currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        item.classList.toggle('active');
    });
});