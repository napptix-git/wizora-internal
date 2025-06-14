document.addEventListener('DOMContentLoaded', async () => {
    const cube = document.querySelector('.cube');
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;
    let startRotation = 0;

    // Helper to set transform with smoothness
    function setCubeTransform(rotation, smooth = false) {
        cube.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none';
        cube.style.transform = `rotateY(${rotation}deg)`;
    }

    // Mouse events
    cube.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startRotation = currentRotation;
        setCubeTransform(currentRotation, false);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            // Increase sensitivity by reducing the divisor (was 1.5, now 0.5)
            currentRotation = startRotation + deltaX / 0.5;
            setCubeTransform(currentRotation, false);
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            setCubeTransform(currentRotation, true);
        }
    });

    document.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            setCubeTransform(currentRotation, true);
        }
    });

    // Touch events for mobile
    cube.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX;
            startRotation = currentRotation;
            setCubeTransform(currentRotation, false);
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length === 1) {
            const deltaX = e.touches[0].clientX - startX;
            // Increase sensitivity for touch as well
            currentRotation = startRotation + deltaX / 0.5;
            setCubeTransform(currentRotation, false);
        }
    });

    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            setCubeTransform(currentRotation, true);
        }
    });

    document.addEventListener('touchcancel', () => {
        if (isDragging) {
            isDragging = false;
            setCubeTransform(currentRotation, true);
        }
    });

    // Close Ad Functionality
    function closeAd() {
        document.getElementById('interstitialAd').style.display = 'none';
    }
});
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
      img.onerror = () => {
        img.remove();
        console.warn(`Removed missing image: ${img.src}`);
      };
    });
  });
