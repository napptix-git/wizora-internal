window.onload = function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const logo = document.getElementById("Logo");
  const overlay = document.getElementById("Overlay");


  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, false);
  
  // Get logo position and size to prevent fireworks in that area
  function isInLogoArea(x, y) {
    const logoRect = logo.getBoundingClientRect();
    return (
      x >= logoRect.left - 50 &&  // Slightly enlarge the logo bounding box
      x <= logoRect.right + 50 &&
      y >= logoRect.top - 50 &&
      y <= logoRect.bottom + 50
    );
  }
  // function isOverlayArea(x, y) {
  //   const overlayRect = overlay.getBoundingClientRect();
  //   return (
  //     x >= logoRect.left - 50 &&  // Slightly enlarge the logo bounding box
  //     x <= logoRect.right + 50 &&
  //     y >= logoRect.top - 50 &&
  //     y <= logoRect.bottom + 50
  //   );
  // }
  // Firework class
 // Firework class
class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.color1 = this.generateBrightColor();
    this.color2 = this.generateBrightColor();
    this.createParticles();
  }

  generateBrightColor() {
    const hue = Math.random() * 360;
    const saturation = 100;
    const lightness = 60;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  createParticles() {
    const particleCount = 100;
    const angleIncrement = (Math.PI * 2) / particleCount;

    for (let i = 0; i < particleCount; i++) {
      const angle = i * angleIncrement;
      const speed = Math.random() * 3 + 2;  // Increase speed (previously Math.random() * 2 + 1)
      const sx = Math.cos(angle) * speed;
      const sy = Math.sin(angle) * speed;
      const color = i % 2 === 0 ? this.color1 : this.color2;
      this.particles.push(new Particle(this.x, this.y, sx, sy, color));
    }
  }

  update() {
    this.particles.forEach((particle, i) => {
      particle.update();
      particle.draw();
    });
  }

  isDone() {
    return this.particles.every(particle => particle.life <= 0);
  }
}

// Particle class remains the same


  // Particle class
  class Particle {
    constructor(x, y, sx, sy, color) {
      this.x = x;
      this.y = y;
      this.sx = sx;
      this.sy = sy;
      this.size = Math.random() * 3 + 1;
      this.life = 200;
      this.color = color;
      this.prevX = this.x;
      this.prevY = this.y;
      this.lineLengthMultiplier = 5;
    }

    update() {
      this.prevX = this.x;
      this.prevY = this.y;
      this.x += this.sx;
      this.y += this.sy;
      this.life -= 2;
    }

    draw() {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size;
      ctx.beginPath();
      ctx.moveTo(this.prevX - this.sx * this.lineLengthMultiplier, this.prevY - this.sy * this.lineLengthMultiplier);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
    }
  }

  let fireworks = [];

  // Event listener for clicks (Desktop)
  canvas.addEventListener("click", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Prevent fireworks in the logo area
    if (!isInLogoArea(x, y)) {
      fireworks.push(new Firework(x, y));
    }
    // if (!isOverlayArea(x, y)) {
    //   fireworks.push(new Firework(x, y));
    // }
  });

  // Event listener for touch (Mobile)
  canvas.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // Prevent fireworks in the logo area
    if (!isInLogoArea(x, y)) {
      fireworks.push(new Firework(x, y));
    }
  });

  function animate() {
    ctx.fillStyle = "rgba(31, 26, 72, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, i) => {
      firework.update();
      if (firework.isDone()) {
        fireworks.splice(i, 1);
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
};

function closeAd() {
  document.getElementById('canvasContainer').style.display = 'none';
}
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.onerror = () => {
      img.remove();
      console.warn(`Removed missing image: ${img.src}`);
    };
  });
});
