let restartButton = document.createElement("button");
let score = 0;
let toWin = 0;

document.getElementById("play").addEventListener("click", function game() {
    const scoreDisplay = document.getElementById("score");
    const width = 20; // Reduced width from 28 to 20
    const grid = document.querySelector(".grid");
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,0,1,4,4,1,0,0,0,0,0,0,0,4,4,1,4,4,0,1,
        1,0,1,4,4,1,0,1,1,1,1,1,0,4,4,1,1,1,0,1,
        1,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,1,4,4,4,4,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,4,4,4,4,4,0,1,1,1,1,1,4,4,4,4,4,4,4,0,
        0,4,4,4,4,4,0,0,0,0,0,0,4,4,4,4,4,4,4,0,
        1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,
        1,0,1,4,4,1,0,0,0,0,0,0,0,4,4,1,4,4,0,1,
        1,0,1,4,4,1,0,1,1,1,1,1,0,4,4,1,1,1,0,1,
        1,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,1,4,4,4,4,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ];
    
    // 0 = pac-dot ; 1 = wall ; 2 = ghost-lair ; 3 = power-pellet ; 4 = empty;
    const squares = [];
    
    // Draw the grid
    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement("div");
            grid.appendChild(square);
            squares.push(square);

            // Add layout to the board
            if (layout[i] === 0) {
                squares[i].classList.add("pac-dot");
            } else if (layout[i] === 1) {
                squares[i].classList.add("wall");
            } else if (layout[i] === 2) {
                squares[i].classList.add("ghost-lair");
            } else if (layout[i] === 3) {
                squares[i].classList.add("power-pellet");
            } else if (layout[i] === 4) {
                squares[i].classList.add("empty");
            }
        }
    }
    createBoard();

    // Starting position of Pac-Man
   // Existing Pac-Man movement logic
let pacmanCurrentIndex = 188;
squares[pacmanCurrentIndex].classList.add("pac-man");

// Move Pac-Man
function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove("pac-man");
    switch(e.keyCode){
        case 37: // Left arrow key
            if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex - 1].classList.contains("wall") && !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")) {
                pacmanCurrentIndex -= 1;
                squares[pacmanCurrentIndex].style.transform = "scaleX(-1) rotate(95deg)";
                // If Pac-Man is on the left exit
                if (pacmanCurrentIndex - 1 === 363) {
                    pacmanCurrentIndex = 391;
                }
            }
            break;
        case 38: // Up arrow key
            if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains("wall") && !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")) { 
                pacmanCurrentIndex -= width;
                squares[pacmanCurrentIndex].style.transform = "scaleY(1)";
            }
            break;
        case 39: // Right arrow key
            if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex + 1].classList.contains("wall") && !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")) { 
                pacmanCurrentIndex += 1;
                squares[pacmanCurrentIndex].style.transform = "scaleY(1) rotate(95deg)";
                // If Pac-Man is on the right exit
                if (pacmanCurrentIndex + 1 === 392) {
                    pacmanCurrentIndex = 364;
                }
            }
            break;
        case 40: // Down arrow key
            if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains("wall") && !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")) {
                pacmanCurrentIndex += width;
                squares[pacmanCurrentIndex].style.transform = "rotate(190deg)";
            }
            break;
    }

    squares[pacmanCurrentIndex].classList.add("pac-man");

    pacDotEaten();
    powerPelletEaten();
    checkForGameOver();
    checkForWin();
}
const pacman = document.querySelector('.pac-man');

// Function to increase the size of Pac-Man
function resizePacmanForScreen() {
    const pacman = document.querySelector('.pac-man');
    
    if (window.innerWidth <= 500) {
        // Screen width is 768px or less, apply mobile size
        pacman.style.width = '22px';
        pacman.style.height = '22px';
    } else {
        // Larger screens, apply normal size
        pacman.style.width = '25px';
        pacman.style.height = '25px';
    }
}

// Run the function when the page loads and when the window is resized
resizePacmanForScreen();
window.addEventListener('resize', resizePacmanForScreen);
document.addEventListener("keydown", movePacman);

// Touchpad functionality
document.getElementById('up-btn').addEventListener('touchstart', function() {
    simulateKeyPress(38); // Up arrow key code
});

document.getElementById('down-btn').addEventListener('touchstart', function() {
    simulateKeyPress(40); // Down arrow key code
});

document.getElementById('left-btn').addEventListener('touchstart', function() {
    simulateKeyPress(37); // Left arrow key code
});

document.getElementById('right-btn').addEventListener('touchstart', function() {
    simulateKeyPress(39); // Right arrow key code
});

// Function to simulate a key press event
function simulateKeyPress(keyCode) {
    const event = new KeyboardEvent('keydown', {
        keyCode: keyCode,
        which: keyCode,
        bubbles: true
    });
    document.dispatchEvent(event);
}

  
    // What happens when Pac-Man eats a pac-dot
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains("pac-dot")) {
			score++;
			toWin++;
			scoreDisplay.innerHTML = score;
			squares[pacmanCurrentIndex].classList.remove("pac-dot");
			fillBar(score); // Update the fill bar after eating a Pac-Dot
		}

    }

    // What happens when Pac-Man eats a power-pellet
    function powerPelletEaten() {
        if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
            score += 10;
            toWin += 10;
            ghosts.forEach((ghost) => (ghost.isScared = true));
            setTimeout(unScareGhosts, 10000);
            squares[pacmanCurrentIndex].classList.remove("power-pellet");
        }
    }

    // Make the ghosts stop appearing as aquamarine
    function unScareGhosts() {
        ghosts.forEach((ghost) => (ghost.isScared = false));
    }

    // Create ghosts using Constructors
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerId = NaN;
            this.isScared = false;
        }
    }

    const ghosts = [
        // new Ghost("blinky", 140, 250),
        new Ghost("pinky", 160, 400),
        new Ghost("inky", 180, 300),
        // new Ghost("clyde", 200, 500),
    ];

    // Draw my ghosts onto the grid
    ghosts.forEach((ghost) => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add("ghost");
    });

    // Move the ghosts
    ghosts.forEach((ghost) => moveGhost(ghost));

    // Write the function to move the ghosts
    function moveGhost(ghost) {
        const directions = [-1, +1, width, -width];
        let direction = directions[Math.floor(Math.random() * directions.length)];

        ghost.timerId = setInterval(function () {
            if (!squares[ghost.currentIndex + direction].classList.contains("wall") && !squares[ghost.currentIndex + direction].classList.contains("ghost")) {
                squares[ghost.currentIndex].classList.remove(ghost.className);
                squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
                ghost.currentIndex += direction;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            } else direction = directions[Math.floor(Math.random() * directions.length)];

            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add("scared-ghost");
            }

            if (ghost.isScared && squares[ghost.currentIndex].classList.contains("pac-man")) {
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
                ghost.currentIndex = ghost.startIndex;
                score += 100;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            }

            checkForGameOver();
        }, ghost.speed);
    }

    // Check for a game over
    function checkForGameOver () {
		if (squares[pacmanCurrentIndex].classList.contains("ghost") && !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
			ghosts.forEach(ghost => clearInterval(ghost.timerId));
			document.removeEventListener("keydown", movePacman);
			scoreDisplay.innerHTML = score;
			let gameOver = document.createElement("div");
			gameOver.classList.add("gameOver");
			document.body.append(gameOver);
			restartButton.classList.add("restart");
			document.body.append(restartButton);
			document.getElementById("play").removeEventListener("click", game);
			restartButton.addEventListener("click", () => {window.location.reload(false)})				
		}	
	}

    // Check for a win
    function checkForWin() {
        if (toWin === 100) {
            ghosts.forEach((ghost) => clearInterval(ghost.timerId));
			document.removeEventListener("keydown", movePacman);
			let won = document.createElement("div");
			won.classList.add("won");
			document.body.append(won);
            
        }
    }

    // Filling fill-bar based on score
	function fillBar(score) {
		const fill = document.getElementById("fill");
		if (fill) {
			const maxScore = 100; // Total number of pac-dots in the game
			const widthPercentage = (score / maxScore) * 100; // 100% when all pac-dots are collected
			fill.style.width = `${widthPercentage}%`;
		} else {
			console.error('Fill element not found');
		}
	}

    fillBar(score);

    // Reset and Restart the Game
    restartButton.classList.add("restart-button");
    restartButton.addEventListener("click", function restart() {
        score = 0;
        toWin = 0;
        scoreDisplay.innerHTML = score;
        fillBar(score);
        squares.forEach((square) => {
            square.className = "";
        });
        createBoard();
        ghosts.forEach((ghost) => {
            clearInterval(ghost.timerId);
            ghost.currentIndex = ghost.startIndex;
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            moveGhost(ghost);
        });
        pacmanCurrentIndex = 142;
        squares[pacmanCurrentIndex].classList.add("pac-man");
        document.addEventListener("keydown", movePacman);
        grid.removeChild(restartButton);
    });
});
function closeAd() {
    document.querySelector('.game-container').style.display = 'none';
    document.getElementById('play').style.display = 'none';
    // Remove the background image
    document.body.style.backgroundImage = 'none';
    // Set the background color to white
    document.body.style.backgroundColor = 'white';
}
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
      img.onerror = () => {
        img.remove();
        console.warn(`Removed missing image: ${img.src}`);
      };
    });
  });
  