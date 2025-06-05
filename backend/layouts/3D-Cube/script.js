document.addEventListener('DOMContentLoaded', async () => {
    const cube = document.querySelector('.cube');
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;
    let startRotation = 0;

    // Cube rotation functionality
    cube.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startRotation = currentRotation;
        cube.style.transition = 'none'; // Disable transition during drag
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - startX;
            currentRotation = startRotation + deltaX / 1.5; // Adjust sensitivity as needed
            cube.style.transform = `rotateY(${currentRotation}deg)`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            cube.style.transition = 'transform 0.5s ease-in-out'; // Re-enable smooth transition after drag
            cube.style.transform = `rotateY(${currentRotation}deg)`;
        }
    });

    document.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            cube.style.transition = 'transform 0.5s ease-in-out'; // Re-enable smooth transition after drag
            cube.style.transform = `rotateY(${currentRotation}deg)`;
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
  