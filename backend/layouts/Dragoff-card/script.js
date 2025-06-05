const bottomCanvas = document.getElementById('bottomCanvas');
const topCanvas = document.getElementById('topCanvas');
const ctxBottom = bottomCanvas.getContext('2d');
const ctxTop = topCanvas.getContext('2d');

let startX = 0;
let currentX = 0;
let isDragging = false;
let animationFrameId = null;
let hasMoved = false; // Detect actual drag

const bottomImage = new Image();
const topImage = new Image();

function preloadImages(sources) {
  const promises = sources.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  });
  return Promise.all(promises);
}

// Load both images and draw only when ready
preloadImages(['./assets/12.png', './assets/11.png']).then(([bottom, top]) => {
  bottomImage.src = bottom.src;
  topImage.src = top.src;
  drawImages();
});


function resizeCanvases() {
  const rect = document.querySelector('.container').getBoundingClientRect();
  bottomCanvas.width = topCanvas.width = rect.width;
  bottomCanvas.height = topCanvas.height = rect.height;
  drawImages();
}

function drawImages() {
  if (bottomImage.complete) {
    ctxBottom.clearRect(0, 0, bottomCanvas.width, bottomCanvas.height);
    ctxBottom.drawImage(bottomImage, 0, 0, bottomCanvas.width, bottomCanvas.height);
  }
  if (topImage.complete) {
    ctxTop.clearRect(0, 0, topCanvas.width, topCanvas.height);
    ctxTop.drawImage(topImage, 0, 0, topCanvas.width, topCanvas.height);
  }
}

function updateTransform() {
  const deltaX = currentX - startX;
  topCanvas.style.transform = `translateX(${deltaX}px) rotate(${deltaX / 15}deg)`;
  animationFrameId = requestAnimationFrame(updateTransform);
}

// Start drag
function onStart(x) {
  isDragging = true;
  hasMoved = false;
  startX = x;
  currentX = x;

  // ✅ Hide gesture when dragging starts
  document.getElementById('gesture').style.display = 'none';

  animationFrameId = requestAnimationFrame(updateTransform);
}


// Move
function onMove(x) {
  if (!isDragging) return;
  currentX = x;
  if (Math.abs(currentX - startX) > 5) {
    hasMoved = true;
  }
}

// End drag
function onEnd() {
  if (!isDragging) return;
  isDragging = false;
  cancelAnimationFrame(animationFrameId);

  const deltaX = currentX - startX;

  // Only if user actually dragged beyond 80px
  if (hasMoved && Math.abs(deltaX) > 80) {
    topCanvas.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    topCanvas.style.transform = `translateX(${deltaX > 0 ? '150%' : '-150%'}) rotate(${deltaX / 10}deg)`;
    topCanvas.style.opacity = '0';

    setTimeout(() => {
      topCanvas.remove();
    }, 500);
  } else {
    topCanvas.style.transition = 'transform 0.3s ease';
    topCanvas.style.transform = 'translateX(0) rotate(0)';
  }
}

// Mouse events
topCanvas.addEventListener('mousedown', e => onStart(e.clientX));
window.addEventListener('mousemove', e => onMove(e.clientX));
window.addEventListener('mouseup', onEnd);

// Touch events
topCanvas.addEventListener('touchstart', e => onStart(e.touches[0].clientX));
topCanvas.addEventListener('touchmove', e => onMove(e.touches[0].clientX));
topCanvas.addEventListener('touchend', onEnd);

// Load images
bottomImage.src = './assets/12.png';
topImage.src = './assets/11.png';
bottomImage.onload = drawImages;
topImage.onload = drawImages;

window.addEventListener('resize', resizeCanvases);
resizeCanvases();
function closeAd() {
  document.querySelector('.container').style.display = 'none';
}
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.onerror = () => {
      img.remove();
      console.warn(`Removed missing image: ${img.src}`);
    };
  });
});