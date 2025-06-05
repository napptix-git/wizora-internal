document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider");
    const leftImage = document.querySelector(".left-image");
    const rightImage = document.querySelector(".right-image");
    const overlay1 = document.querySelector(".overlay1");
    const overlay2 = document.querySelector(".overlay2");

    const minSliderLimit = 20; // ✅ Fixed minimum limit
    const maxSliderLimit = 90; // ✅ Maximum limit

    let isDragging = false;
    let startX = 0;
    let hasMoved = false;

    // Set initial slider position
    const initialPosition = 20;
    slider.style.left = `${initialPosition}%`;
    leftImage.style.clipPath = `inset(0 0 0 ${initialPosition}%)`;
    rightImage.style.clipPath = `inset(0 ${100 - initialPosition}% 0 0)`;
    overlay1.style.display = "block";
    overlay2.style.display = "none";

    // Mouse events
    slider.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX;
        hasMoved = false;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = Math.abs(e.pageX - startX);
        if (dx > 5) {
            hasMoved = true;
            updateSlider(e.pageX);
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        hasMoved = false;
    });

    // Touch events
    slider.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        hasMoved = false;
    }, { passive: false });

    document.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const dx = Math.abs(e.touches[0].pageX - startX);
        if (dx > 5) {
            hasMoved = true;
            updateSlider(e.touches[0].pageX);
        }
    }, { passive: false });

    document.addEventListener("touchend", () => {
        isDragging = false;
        hasMoved = false;
    });

    // ✅ Update slider visuals
    function updateSlider(x) {
        const container = document.querySelector(".ad-container");
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerLeft = containerRect.left;

        let newPosition = (x - containerLeft) / containerWidth * 100;

        // ✅ Restrict between 20% and 90%
        newPosition = Math.max(minSliderLimit, Math.min(maxSliderLimit, newPosition));
        slider.style.left = `${newPosition}%`;

        // ✅ Update image reveal effect
        leftImage.style.clipPath = `inset(0 0 0 ${newPosition}%)`;
        rightImage.style.clipPath = `inset(0 ${100 - newPosition}% 0 0)`;

        // ✅ Show overlay based on slider position
        if (newPosition < 50) {
            overlay1.style.display = "block";
            overlay2.style.display = "none";
        } else {
            overlay1.style.display = "none";
            overlay2.style.display = "block";
        }
    }
});
