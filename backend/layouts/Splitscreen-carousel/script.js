document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("slider");
    const radioButtons = Array.from(document.querySelectorAll('input[name="slider"]'));
    const sliderLabels = document.querySelectorAll("#slider label");
    const closebtn = document.querySelector(".close-btn");
    const audioButton = document.getElementById("audioButton"); // Select the audio button
    const video = document.querySelector('.responsive-video'); // Select the video element
    const interstitialAd = document.getElementById('interstitialAd'); // The parent div to hide
    const volumeIcon = audioButton.querySelector('img[src*="volume.png"]'); // Volume icon
    const unmuteIcon = audioButton.querySelector('img[src*="unmute.png"]'); // Unmute icon

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = radioButtons.findIndex(radio => radio.checked);

    // Add event listeners for drag functionality
    slider.addEventListener("mousedown", dragStart);
    slider.addEventListener("mousemove", dragMove);
    slider.addEventListener("mouseup", dragEnd);
    slider.addEventListener("mouseleave", dragEnd);

    slider.addEventListener("touchstart", dragStart);
    slider.addEventListener("touchmove", dragMove);
    slider.addEventListener("touchend", dragEnd);

    // Attach muteAudio function to the audioButton
    audioButton.addEventListener("click", toggleAudio);

    // Attach closeAd functionality to close button
    closebtn.addEventListener("click", () => {
        interstitialAd.style.display = "none";
    });

    // Start dragging
    function dragStart(e) {
        isDragging = true;
        startX = getEventX(e);
        slider.style.cursor = "grabbing"; // Update cursor for dragging
        sliderLabels.forEach(label => {
            label.style.transition = "none"; // Disable transition during dragging
        });
    }

    // Move the slide while dragging
    function dragMove(e) {
        if (!isDragging) return;

        const currentX = getEventX(e);
        const deltaX = currentX - startX;

        // Calculate current translation (horizontal movement)
        currentTranslate = prevTranslate + deltaX;

        // Apply flat transformation during dragging
        sliderLabels.forEach((label, index) => {
            const offset = (index - currentIndex) * 115 + (deltaX / slider.clientWidth) * 115; // Match CSS 115%
            label.style.transform = `translateX(${offset}%)`; // No depth during drag
        });
    }

    // End dragging
    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        slider.style.cursor = "grab"; // Reset cursor

        // Determine if drag was enough to switch slides
        const dragThreshold = slider.clientWidth * 0.2; // Minimum drag distance to change slide
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy > dragThreshold) {
            // Dragged right to show previous slide
            currentIndex = (currentIndex - 1 + sliderLabels.length) % sliderLabels.length; // Loop backward
        } else if (movedBy < -dragThreshold) {
            // Dragged left to show next slide
            currentIndex = (currentIndex + 1) % sliderLabels.length; // Loop forward
        }

        // Snap to the correct slide with depth effect
        setPositionByIndex();
    }

    // Snap slides into position based on the current index
    function setPositionByIndex() {
        prevTranslate = -currentIndex * slider.clientWidth;
        currentTranslate = prevTranslate;

        sliderLabels.forEach((label, index) => {
            const offset = (index - currentIndex) * 115; // Match CSS 115%
            const zDepth = Math.abs(index - currentIndex) * -140; // Match CSS -140px
            const farOffset = Math.abs(index - currentIndex) > 1 ? 230 : offset; // Match CSS far position
            const opacity = Math.abs(index - currentIndex) > 1 ? 0 : 0.8; // Match CSS opacity rules
            const zIndex = Math.abs(index - currentIndex) === 0 ? 3 : Math.abs(index - currentIndex) === 1 ? 2 : 1; // Match CSS z-index rules

            // Apply the correct transformation
            label.style.transition = "transform 0.3s ease, opacity 0.3s ease"; // Smooth snapping
            label.style.transform =
                Math.abs(index - currentIndex) > 1
                    ? `translate3d(${farOffset}%, 0, -280px)` // Far slides
                    : `translate3d(${offset}%, 0, ${zDepth}px)`; // Active/adjacent slides
            label.style.opacity = index === currentIndex ? 1 : opacity;
            label.style.zIndex = zIndex;
        });

        // Update the checked radio button
        radioButtons[currentIndex].checked = true;

        // Remove transition after snapping
        setTimeout(() => {
            sliderLabels.forEach(label => (label.style.transition = "none"));
        }, 300);
    }

    // Toggle mute/unmute and switch the image
    function toggleAudio() {
        if (video.muted) {
            video.muted = false; // Unmute the video
            video.play(); // Ensure the video continues playing
            unmuteIcon.style.display = "inline"; // Show volume icon
            volumeIcon.style.display = "none"; // Hide unmute icon
        } else {
            video.muted = true; // Mute the video
            unmuteIcon.style.display = "none"; // Hide volume icon
            volumeIcon.style.display = "inline"; // Show unmute icon
        }
    }

    // Get the X-coordinate of the current event
    function getEventX(e) {
        return e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
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
  
