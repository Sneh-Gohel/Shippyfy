document.addEventListener("DOMContentLoaded", function () {
    const h1 = document.querySelector(".customer h1");
    const images = document.querySelectorAll(".customer .mainContent img");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`;
                    entry.target.dataset.animated = "true"; // Prevent re-animation
                }
            });
        },
        { threshold: 0.3 }
    );

    images.forEach((image) => {
        observer.observe(image);
    });

    if (h1) {
        observer.observe(h1);
        h1.style.animation = "fadeInUp 0.8s ease-out forwards";
    }
});
