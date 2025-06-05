// Select slider, car, range value, and ad container elements
const slider = document.getElementById("range-slider");
const car = document.querySelector(".car");
const rangeValue = document.querySelector(".range-value");
const adContainer = document.querySelector(".ad-container");

let isDragging = false; // To track whether the user is actively dragging

// Function to update the car's scale and slider value
function updateCarScale(value) {
    const minScale = 1; // Scale at min slider value
    const maxScale = 3; // Scale at max slider value
    const scale = minScale + (value / 400) * (maxScale - minScale); // Scale calculation

    // Update car scale
    car.style.transform = `scale(${scale})`;

    // Update slider value and range text
    slider.value = value;
    rangeValue.textContent = `${value}`;
}

// Listen for slider input
slider.addEventListener("input", (e) => {
    const value = e.target.value;
    updateCarScale(value);
});

// Handle dragging on the ad container
adContainer.addEventListener("mousedown", (e) => {
    isDragging = true; // Enable dragging
});

adContainer.addEventListener("mousemove", (e) => {
    if (!isDragging) return; // Only handle movement when dragging

    // Calculate slider value based on mouse position
    const rect = adContainer.getBoundingClientRect();
    const relativeX = e.clientX - rect.left; // Mouse X relative to container
    const value = Math.round(Math.min(400, Math.max(0, (relativeX / rect.width) * 400))); // Map position to slider range [0, 400] and round

    updateCarScale(value); // Pass the rounded value
});

adContainer.addEventListener("mouseup", () => {
    isDragging = false; // Disable dragging
});

// Handle touch dragging on the ad container
adContainer.addEventListener("touchstart", () => {
    isDragging = true; // Enable dragging
});

adContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return; // Only handle movement when dragging

    // Calculate slider value based on touch position
    const rect = adContainer.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left; // Touch X relative to container
    const value = Math.round(Math.min(400, Math.max(0, (touchX / rect.width) * 400))); // Map position to slider range [0, 400] and round

    updateCarScale(value); // Pass the rounded value
});

adContainer.addEventListener("touchend", () => {
    isDragging = false; // Disable dragging
});
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
      img.onerror = () => {
        img.remove();
        console.warn(`Removed missing image: ${img.src}`);
      };
    });
  });
  