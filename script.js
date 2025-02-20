document.addEventListener("DOMContentLoaded", function () {
    const h1 = document.querySelector(".customer h1");
    const images = document.querySelectorAll(".customer .mainContent img");
    const leftSide = document.querySelector(".section3 .leftSide");
    const rightSide = document.querySelector(".section3 .rightSide img");
    const textElements = document.querySelectorAll(".section3 .leftSide > *");

    // Select all cards for animation
    const cards = document.querySelectorAll(".section4 .card");

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
                    } else if (entry.target.classList.contains("card")) {
                        // Apply staggered left-side animation for each card
                        entry.target.style.animation = `slideInFromLeft 0.6s ease-out ${index * 0.2}s forwards`;
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

    // Observe cards for animation
    cards.forEach((card) => observer.observe(card));
});
