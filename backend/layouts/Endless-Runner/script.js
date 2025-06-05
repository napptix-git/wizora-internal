let board, context;
let backgroundX = 0; // Background starting position
let speed = 2; // Background movement speed
let isPlaying = false;
let score = 0; // Initialize score
const progressThreshold = 69; // Maximum score for the progress bar
const boardWidth = window.innerWidth;
const boardHeight = window.innerHeight;
const jumpHeight = 200; // Height of the jump (in pixels)
const characterInitialBottom = 8; // Initial bottom position of the character (percentage)
let isJumping = false; // To prevent multiple jumps simultaneously

// Select progress bar and text elements
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

// Load the background image
const backgroundImage = new Image();
backgroundImage.src = "./assets/Background.png";

// Load collectible images
const burgerImage = new Image();
burgerImage.src = "./assets/Burger.png";
burgerImage.id = "burger"; // Set the id for burger image

const beverageImage = new Image();
beverageImage.src = "./assets/Beverage.png";
beverageImage.id = "beverage"; // Set the id for beverage image

// Collectibles array
const collectibles = [];

// Function to make the character jump
function jumpCharacter() {
  if (isJumping || !isPlaying) return; // Prevent jumps if not playing or already jumping

  isJumping = true; // Set jumping state
  const character = document.getElementById("charachter");

  // Add the jumping class to change the sprite/image
  character.classList.add("jumping");

  // Move the character upwards
  character.style.transition = "bottom 0.4s ease-out"; // Smooth upward motion
  character.style.bottom = `${characterInitialBottom + jumpHeight}px`;

  // Return the character to the original position after 800ms
  setTimeout(() => {
    character.style.transition = "bottom 0.4s ease-in"; // Smooth downward motion
    character.style.bottom = `${characterInitialBottom}%`;
    setTimeout(() => {
      character.classList.remove("jumping"); // Reset jumping state
      isJumping = false;
    }, 400);
  }, 500);
}

// Add event listener for jump functionality
document.getElementById("game-container").addEventListener("click", jumpCharacter);

// Initialize the canvas when the window loads
window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  // Draw the static background before the game starts
  drawStaticBackground();

  document.getElementById("playButton").addEventListener("click", startGame);
};

// Function to draw a static background
function drawStaticBackground() {
  context.clearRect(0, 0, boardWidth, boardHeight); // Clear the canvas
  context.drawImage(backgroundImage, 0, 0, boardWidth, boardHeight); // Draw the static background
}

// Spawn collectibles with random scoring
function spawnCollectible() {
  if (!isPlaying) return;

  const minY = boardHeight - 300; // Upper limit for collectibles
  const maxY = boardHeight - 100; // Lower limit for collectibles
  const collectibleType = Math.random() < 0.5 ? burgerImage : beverageImage;

  const randomScore = Math.floor(Math.random() * 16) + 5; // Random score between 5 and 20

  const collectible = {
    image: collectibleType,
    x: boardWidth, // Start at the far right
    y: Math.random() * (maxY - minY) + minY,
    width: 50,
    height: 50,
    score: randomScore, // Assign random score
  };

  collectibles.push(collectible);
}

// Update and draw collectibles
function updateCollectibles(characterElem) {
  for (let i = collectibles.length - 1; i >= 0; i--) {
    const collectible = collectibles[i];
    collectible.x -= speed; // Move collectible

    // Check for collision
    const collectibleElem = {
      getBoundingClientRect: () => ({
        left: collectible.x,
        right: collectible.x + collectible.width,
        top: collectible.y,
        bottom: collectible.y + collectible.height,
      }),
    };

    if (isCollidingWithCollectible(characterElem, collectibleElem)) {
      // Handle collision
      handleCollision(collectible);

      // Remove the collectible from the array immediately
      collectibles.splice(i, 1);
      continue; // Skip drawing this collectible
    }

    // Draw the collectible on the canvas
    context.drawImage(
      collectible.image,
      collectible.x,
      collectible.y,
      collectible.width,
      collectible.height
    );
  }
}



// Handle collision and update progress bar
function handleCollision(collectible) {
  score += collectible.score; // Add collectible's score

  // Ensure the score doesn't exceed the threshold
  if (score > progressThreshold) {
    score = progressThreshold;
  }

  const progressPercentage = Math.min((score / progressThreshold) * 100, 100); // Calculate progress percentage
  progressBar.style.width = `${progressPercentage}%`;
  progressText.textContent = `${Math.floor(score)}/${progressThreshold}`;

  // Create and position the glow effect
  const glowEffect = document.createElement("div");
  glowEffect.classList.add("glow-effect");

  // Position the glow effect at the collectible's position
  glowEffect.style.left = `${collectible.x}px`;
  glowEffect.style.top = `${collectible.y}px`;

  // Append the glow effect to the game container
  document.getElementById("game-container").appendChild(glowEffect);

  // Remove the glow effect after the animation completes (1 second)
  setTimeout(() => {
    glowEffect.remove();
  }, 1000);

  // Check if this is the last collectible
  if (score === progressThreshold) {
    // Delay the game-ending logic slightly to ensure the collectible is removed
    setTimeout(() => {
      endGame();
    }, 100); // Small delay (100ms) to sync removal and game-ending
  }
}



// Collision detection function
function isCollidingWithCollectible(characterElem, collectibleElem) {
  const rect1 = characterElem.getBoundingClientRect();
  const rect2 = collectibleElem.getBoundingClientRect();

  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

// End game function
function endGame() {
  isPlaying = false; // Stop the game

  // Hide all collectibles
  collectibles.forEach((collectible) => {
    collectible.x = -collectible.width; // Move collectibles off the screen
  });

  // Step 1: Add the first animation (moveRight)
  charachter.classList.add("skating-right");

  // Wait for `moveRight` animation to complete (4 seconds)
  setTimeout(() => {
    charachter.classList.remove("skating-right"); // Remove the first animation
    charachter.style.transition = "opacity 0.4s ease-out"; // Smooth fade-out transition
    charachter.style.opacity = "0"; // Start fade-out
    charachter.style.display = "none"; // Fully hide the character after fade-out
    showOutletImage(); // Display the outlet image

    // Step 3: Wait 1 second after showing the outlet image
    setTimeout(() => {
      charachter.style.display = "flex"; // Make the character visible again
      charachter.style.transition = "opacity 0.4s ease-out"; // Ensure fade-in transition
      charachter.style.opacity = "1"; // Fade back in
      charachter.classList.add("skating-left"); // Add the second animation

      // Step 4: Wait for `skating-left` animation to complete (3 seconds)
      setTimeout(() => {
        charachter.classList.remove("skating-left");
        charachter.style.transition = "transform 0.4s ease-out, opacity 0.4s ease-out"; // Smooth transition
        charachter.style.transform = "translateX(20vw) scaleX(0.65) scaleY(0.85)"; // Apply transform
        charachter.classList.add("new-sprite"); // Start the smooth walking animation

        // Step 5: Wait for the `smoothWalking` animation to complete (4 seconds)
        setTimeout(() => {
          charachter.style.opacity = "0"; // Start fade-out again

          // Step 6: Fully hide the character after fade-out
          setTimeout(() => {
            charachter.style.display = "none"; // Hide the character

            // Step 7: Call showGameOverDiv after a 4-second delay
            setTimeout(() => {
              showGameOverDiv();
            }, 4000); // 4-second delay after the entire sequence
          }, 400); // Match the fade-out duration
        }, 4000); // Duration of the `smoothWalking` animation
      }, 3000); // Duration of the `skating-left` animation
    }, 1000); // 1-second delay after the outlet image
  }, 4000); // Duration of the `moveRight` animation
}


function showGameOverDiv() {
  const gameOverDiv = document.createElement("div");
  gameOverDiv.id = "game-over-div";
  gameOverDiv.classList.add("game-over-style");

  const textDiv = document.createElement("div");
  textDiv.style.textAlign = "center";
  textDiv.style.marginBottom = "20px";
  textDiv.innerHTML = `Get McSavers starting at just <strong>₹ 69</strong>`;

  const image = document.createElement("img");
  image.src = "./assets/Meal.png";
  image.alt = "Meal";
  image.id = "meal";
  image.style.width = "80%";
  image.style.margin = "0 auto";
  image.style.display = "block";

  gameOverDiv.appendChild(textDiv);
  gameOverDiv.appendChild(image);

  document.getElementById("game-container").appendChild(gameOverDiv);
}
function showOutletImage() {
  const outletImage = document.createElement("img");
  outletImage.src = "./assets/Outlet2.png";
  outletImage.alt = "Outlet";
  outletImage.id = "outlet";

  console.log("Appending outlet image to the DOM"); // Debugging log
  document.getElementById("game-container").appendChild(outletImage);

  // Trigger fade-in
  setTimeout(() => {
    outletImage.style.opacity = "1"; // Make visible
  }, 100);
}


// Start the game
function startGame() {
  if (!isPlaying) {
    isPlaying = true;
    score = 0;
    progressBar.style.width = "0%";
    progressText.textContent = `0/${progressThreshold}`;
    document.getElementById("playButton").style.display = "none";

    requestAnimationFrame(gameLoop);
    setInterval(spawnCollectible, 3000); // Spawn collectibles every 3 seconds
  }
}

// Game loop
function gameLoop() {
  if (!isPlaying) return;

  context.clearRect(0, 0, boardWidth, boardHeight);

  backgroundX -= speed;
  if (backgroundX <= -boardWidth) backgroundX = 0;

  context.drawImage(backgroundImage, backgroundX, 0, boardWidth, boardHeight);
  context.drawImage(backgroundImage, backgroundX + boardWidth, 0, boardWidth, boardHeight);

  const characterElem = document.getElementById("charachter");
  updateCollectibles(characterElem);

  requestAnimationFrame(gameLoop);
}
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.onerror = () => {
      img.remove();
      console.warn(`Removed missing image: ${img.src}`);
    };
  });
});
