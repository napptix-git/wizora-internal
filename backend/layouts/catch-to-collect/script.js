// Select elements
const cart = document.getElementById("cart");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const startScreen = document.querySelector(".start-sec");
const playButton = document.getElementById("play-button");

let score = 0;
let timeLeft = 30; // Timer set to 60 seconds
let gameRunning = false;
let gameInterval, timerInterval;

// Function to start the game
function startGame() {
    if (gameRunning) return; // Prevent multiple clicks
    gameRunning = true;

    // Hide the start screen with fade-out effect
    startScreen.style.transition = "opacity 0.2s ease-out";
    startScreen.style.opacity = "0";

    setTimeout(() => {
        startScreen.style.display = "none"; // Remove from view
    }, 200);

    // Start falling items
    gameInterval = setInterval(makeItemFall, 1000);

    // Start timer countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}


// Function to end the game
function endGame() {
    clearInterval(gameInterval); // Stop items from falling
    clearInterval(timerInterval); // Stop timer
    gameRunning = false;
  
    setTimeout(() => {
        scoreElement.textContent = score; // Force final score update before displaying Game Over
        showGameOverDiv();
    }, 700); // Delay showing Game Over div by 0.3 sec
    // Fade out cart, shelf, and rows
    document.removeEventListener("mousemove", moveCart);
    document.removeEventListener("mouseup", stopDragging);
    document.removeEventListener("touchmove", moveCart);
    document.removeEventListener("touchend", stopDragging);
    
}


// Add event listener to Play button
playButton.addEventListener("click", startGame);

// Variables for dragging cart
let isDragging = false;
let offsetX;

// Adjust limits for movement
const leftOffset = 60; // Decrease left limit (stop sooner)
const rightOffset = 60; // Increase right limit (move further)

// Add drag functionality for cart (desktop and mobile)
cart.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - cart.getBoundingClientRect().left;
    cart.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        moveCart(e.clientX);
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    cart.style.cursor = "grab";
});

cart.addEventListener("touchstart", (e) => {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - cart.getBoundingClientRect().left;
});

document.addEventListener("touchmove", (e) => {
    if (isDragging) {
        const touch = e.touches[0];
        moveCart(touch.clientX);
    }
});

document.addEventListener("touchend", () => {
    isDragging = false;
});

// Function to move the cart within adjusted screen boundaries
function moveCart(clientX) {
    const cartWidth = cart.offsetWidth;
    const screenWidth = window.innerWidth;

    let x = clientX - offsetX;

    if (x < leftOffset) x = leftOffset; // Decrease left movement
    if (x + cartWidth > screenWidth + rightOffset) x = screenWidth - cartWidth + rightOffset; // Increase right movement

    cart.style.left = `${x}px`;
}

// Rows containing items
const rows = [
    document.querySelector(".row1"),
    document.querySelector(".row2"),
    document.querySelector(".row3"),
    document.querySelector(".row4"),
];

// List of available images
const imageAssets = [
    "./assets/item1.png",
    "./assets/item2.png",
    "./assets/item3.png",
    "./assets/item4.png",
    "./assets/item5.png",
    "./assets/item6.png",
    "./assets/item7.png",
    "./assets/item8.png"
];

// Function to make an item fall from an existing position in the row
function makeItemFall() {
    const randomRow = rows[Math.floor(Math.random() * rows.length)];
    const items = randomRow.querySelectorAll("img");

    if (items.length === 0) return; // No items in the row

    // Select a random image from the row
    const randomItem = items[Math.floor(Math.random() * items.length)];

    // **Clone the item first before replacing**
    const fallingItem = randomItem.cloneNode(true);
    fallingItem.classList.add("falling-item");

    // Get the exact position and size of the selected item
    const itemRect = randomItem.getBoundingClientRect();

    // **Set falling item's position before replacing**
    fallingItem.style.position = "absolute";
    fallingItem.style.left = `${itemRect.left}px`;
    fallingItem.style.top = `${itemRect.top}px`;
    fallingItem.style.width = `${randomItem.offsetWidth}px`;
    fallingItem.style.height = `${randomItem.offsetHeight}px`;
    fallingItem.style.transformOrigin = "center";
    fallingItem.style.zIndex = "20"; // Ensure it falls above everything

    document.body.appendChild(fallingItem);

    // **Now replace the original item in the row with a new one**
    const newItem = document.createElement("img");
    newItem.src = imageAssets[Math.floor(Math.random() * imageAssets.length)];

    // Copy original item's class to maintain CSS styles
    newItem.className = randomItem.className;

    // Copy all inline styles (for width, height, positioning, etc.)
    newItem.style.width = randomItem.style.width;
    newItem.style.height = randomItem.style.height;
    newItem.style.position = randomItem.style.position;
    newItem.style.objectFit = "cover"; // Ensures image fits perfectly
    newItem.style.zIndex = "10"; // Keep it below the falling item

    // Replace the item in the row
    randomItem.parentNode.replaceChild(newItem, randomItem);

    // Animate falling
    animateFall(fallingItem);
}

// Function to animate the falling items
function animateFall(item) {
    let position = parseInt(item.style.top, 10);
    let speed = 5;

    // Random tilt angle (45°, 60°, 75°)
    const tiltAngle = [45, 60, 75][Math.floor(Math.random() * 3)];
    item.style.transform = `rotate(${tiltAngle}deg)`;

    function fall() {
        if (position >= window.innerHeight - 100) {
            item.remove(); // If it reaches the bottom and is not caught, disappear
            return;
        }

        position += speed;
        item.style.top = `${position}px`;

        if (isAccurateCollision(cart, item)) {
            handleCollision(item);
            return;
        }

        requestAnimationFrame(fall);
    }

    requestAnimationFrame(fall);
}
function showGameOverDiv() {
    const gameOverDiv = document.createElement("div");
    gameOverDiv.id = "game-over-div";
    gameOverDiv.classList.add("game-over-style");

    // Create heading
    const h3 = document.createElement("h3");
    h3.textContent = "GREAT JOB !";
    h3.style.color = "black"; // Ensure visibility
    h3.style.fontSize = "24px"; // Increase visibility
    h3.style.marginBottom = "10px";

    // Create message text
    const textDiv = document.createElement("div");
    textDiv.style.textAlign = "center";
    textDiv.style.marginBottom = "20px";
    textDiv.innerHTML = `You delivered <strong>${score}</strong> items and won $0 delivery fees on your first DoorDash grocery order!`;

    // Create image
    const image = document.createElement("img");
    image.src = "./assets/bag.png";
    image.alt = "Meal";
    image.id = "bag";
  
    image.style.margin = "0 auto";
    image.style.display = "block";

    // Append elements to gameOverDiv
    gameOverDiv.appendChild(h3); // Append heading first
    gameOverDiv.appendChild(textDiv);
    gameOverDiv.appendChild(image);
    gameOverDiv.style.display = "block";
    

    // Append to game container
    document.querySelector(".game-container").appendChild(gameOverDiv);
}
// **Collision Detection**
function isAccurateCollision(cart, item) {
    const cartRect = cart.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const overlapWidth = Math.max(0, Math.min(cartRect.right, itemRect.right) - Math.max(cartRect.left, itemRect.left));
    const overlapHeight = Math.max(0, Math.min(cartRect.bottom, itemRect.bottom) - Math.max(cartRect.top, itemRect.top));
    return (overlapWidth * overlapHeight) / (itemRect.width * itemRect.height) >= 0.2;
}

// **Handle Collision & Show Overlay Effect**
function handleCollision(item) {
    score++; // Increment score
    scoreElement.textContent = score; // Force UI update immediately

    // Show overlay animation when an item is collected
    showOverlayEffect();

    // Scale up and fade out
    item.style.transform += " scale(2.00)";
    item.style.transition = "transform 0.5s, opacity 0.5s";
    item.style.opacity = "0";

    // Remove the item after animation
    setTimeout(() => {
        item.remove();
    }, 300);
}


// **Function to Show Overlay Effect on Top**
function showOverlayEffect() {
    const overlay = document.createElement("img");
    overlay.src = "./assets/overlay2-1.png"; // Path to overlay image
    overlay.classList.add("overlay-effect");

    document.body.appendChild(overlay);

    setTimeout(() => overlay.remove(), 300);
}

const style = document.createElement("style");
style.innerHTML = `
    .overlay-effect {
        position: absolute; 
        top: 30%;
        width: 300px;
        transform: scale(1);
        z-index: 9999;
        user-select:none;
        transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
    }
`;

document.head.appendChild(style);
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
      img.onerror = () => {
        img.remove();
        console.warn(`Removed missing image: ${img.src}`);
      };
    });
  });
  