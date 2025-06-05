document.addEventListener('DOMContentLoaded', function () {
    const bottomImg = document.getElementById('bottomImg');
    const topCanvas = document.getElementById('topCanvas');
    const ctx = topCanvas.getContext('2d');
    let timeout;
    let scratching = false;
    const brushSize = 30; // Increase the size of the scratching brush

    function resizeCanvas() {
        const container = document.getElementById('container');
        topCanvas.width = container.clientWidth;
        topCanvas.height = container.clientHeight;
    }

    function handleFadeOut() {
        topCanvas.style.transition = 'opacity 1s ease';
        topCanvas.style.opacity = '0';
    }

    function startScratching() {
        scratching = true;
        if (!timeout) {
            timeout = setTimeout(handleFadeOut, 2000);
        }
    }

    function stopScratching() {
        scratching = false;
    }

    function scratch(e) {
        if (!scratching) return;
        let x, y;
        if (e.touches) {
            // For touch events
            const touch = e.touches[0];
            x = touch.clientX - topCanvas.getBoundingClientRect().left;
            y = touch.clientY - topCanvas.getBoundingClientRect().top;
        } else {
            // For mouse events
            x = e.clientX - topCanvas.getBoundingClientRect().left;
            y = e.clientY - topCanvas.getBoundingClientRect().top;
        }

        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineJoin = 'round';
        ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    // Mouse Events
    topCanvas.addEventListener('mousedown', startScratching);
    topCanvas.addEventListener('mouseup', stopScratching);
    topCanvas.addEventListener('mousemove', scratch);

    // Touch Events
    topCanvas.addEventListener('touchstart', startScratching);
    topCanvas.addEventListener('touchend', stopScratching);
    topCanvas.addEventListener('touchmove', scratch);

    bottomImg.src = 'assets/Bottom Image.png';
    const topImg = new Image();
    topImg.src = 'assets/Top Image.png';

    topImg.onload = function () {
        resizeCanvas();
        ctx.drawImage(topImg, 0, 0, topCanvas.width, topCanvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
});
function closeAd() {
    document.getElementById('container').style.display = 'none';
}
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
      img.onerror = () => {
        img.remove();
        console.warn(`Removed missing image: ${img.src}`);
      };
    });
  });
  
