document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const player = document.getElementById('player');
    const gameOverMessage = document.getElementById('gameOver');
    const scoreDisplay = document.getElementById('scoreDisplay');
    let rewardsCollected = 0;
    let score = 0;
    let gameRunning = true; // Flag to track if the game is running

    // Ensure elements are found before proceeding
    if (!gameContainer || !player || !gameOverMessage || !scoreDisplay) {
        console.error('Cannot find gameContainer, player, gameOverMessage, or scoreDisplay element.');
        return;
    }

    // Variables for background movement
    let backgroundPositionY = 0;
    let backgroundMovementId = null; // To store requestAnimationFrame ID

    // Function to move the background
    function moveBackground() {
        backgroundPositionY += 6; // Adjust this value for speed
        gameContainer.style.backgroundPositionY = `${backgroundPositionY}px`;
        backgroundMovementId = requestAnimationFrame(moveBackground);
    }

    // Start the background movement
    moveBackground();

    // Set initial player position
    const containerWidth = gameContainer.clientWidth;
    const playerWidth = player.clientWidth;
    let currentLeft = containerWidth / 2 - playerWidth / 2; // Initial player position

    player.style.left = `${currentLeft}px`;

    // Function to handle key presses (for laptop/desktop)
    function handleKeyPress(e) {
        if (!gameRunning) return; // Don't handle key presses if game is over

        const step = 40; // Step size for each key press

        // Move the player based on the key pressed
        if (e.key === 'ArrowLeft') {
            currentLeft -= step; // Decrease the left position
            if (currentLeft < 0) currentLeft = 0; // Prevent the player from moving out of the left boundary
        } else if (e.key === 'ArrowRight') {
            currentLeft += step; // Increase the left position
            // Prevent the player from moving out of the right boundary
            if (currentLeft > containerWidth - playerWidth) {
                currentLeft = containerWidth - playerWidth;
            }
        }

        // Update the left position of the player
        player.style.left = `${currentLeft}px`;
    }

    // Function to handle touch events (for mobile devices)
    function handleTouchMove(e) {
        if (!gameRunning) return;

        const touchX = e.touches[0].clientX; // X-coordinate of touch

        // Calculate the new player position based on touch movement
        const newLeft = touchX - playerWidth / 2;
        if (newLeft >= 0 && newLeft <= containerWidth - playerWidth) {
            currentLeft = newLeft;
            player.style.left = `${currentLeft}px`;
        }
    }

    // Attach event listeners based on device type
    if ('ontouchstart' in window) {
        // Mobile touch events
        gameContainer.addEventListener('touchmove', handleTouchMove);
    } else {
        // Desktop keyboard events
        document.addEventListener('keydown', handleKeyPress);
    }

    // Function to close the ad
    window.closeAd = function() {
        document.getElementById('interstitialAd').style.display = 'none';
    }

    // Function to spawn obstacles
    function spawnObstacle() {
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        obstacle.innerHTML = '<img src="./assets/Obstacle.png" alt="Obstacle">';
        
        let obstaclePositionX, obstaclePositionY;
        
        obstaclePositionX = Math.random() * (gameContainer.clientWidth - 100);
        obstaclePositionY = -200;
        
        obstacle.style.left = `${obstaclePositionX}px`;
        obstacle.style.top = `${obstaclePositionY}px`;
        gameContainer.appendChild(obstacle);

        // Move obstacle down
        function moveObstacle() {
            if (!gameRunning) return; // Stop moving obstacles if game is over

            const obstacleTop = parseFloat(obstacle.style.top);
            if (obstacleTop > gameContainer.clientHeight) {
                obstacle.remove();
            } else {
                obstacle.style.top = `${obstacleTop + 2}px`; // Adjust speed if needed
                requestAnimationFrame(moveObstacle);
            }
        }
        moveObstacle();
    }

    // Function to spawn rewards
    function spawnReward() {
        const reward = document.createElement('div');
        reward.className = 'reward';
        reward.innerHTML = '<img src="./assets/Reward.png" alt="Reward">';
        
        let rewardPositionX, rewardPositionY;
        
        rewardPositionX = Math.random() * (gameContainer.clientWidth - 100);
        rewardPositionY = -200;
        
        reward.style.left = `${rewardPositionX}px`;
        reward.style.top = `${rewardPositionY}px`;
        gameContainer.appendChild(reward);

        // Move reward down
        function moveReward() {
            if (!gameRunning) return; // Stop moving rewards if game is over

            const rewardTop = parseFloat(reward.style.top);
            if (rewardTop > gameContainer.clientHeight) {
                reward.remove();
            } else {
                reward.style.top = `${rewardTop + 2}px`; // Adjust speed if needed
                requestAnimationFrame(moveReward);
            }
        }
        moveReward();
    }

    // Function to check collision area with obstacle
    function checkObstacleCollision(player, obstacle) {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        // Adjusted collision area for obstacles
        const obstacleCollisionArea = {
            top: obstacleRect.top + obstacleRect.height * 0.85,
            bottom: obstacleRect.bottom - obstacleRect.height * 0.85,
            left: obstacleRect.left + obstacleRect.width * 0.85,
            right: obstacleRect.right - obstacleRect.width * 0.85
        };

        return !(
            playerRect.top >= obstacleCollisionArea.bottom ||
            playerRect.bottom <= obstacleCollisionArea.top ||
            playerRect.right <= obstacleCollisionArea.left ||
            playerRect.left >= obstacleCollisionArea.right
        );
    }

    // Function to check collision area with reward
    function checkRewardCollision(player, reward) {
        const playerRect = player.getBoundingClientRect();
        const rewardRect = reward.getBoundingClientRect();

        // Adjusted collision area for rewards
        const rewardCollisionArea = {
            top: rewardRect.top + rewardRect.height * 0.8,
            bottom: rewardRect.bottom - rewardRect.height * 0.8,
            left: rewardRect.left + rewardRect.width * 0.8,
            right: rewardRect.right - rewardRect.width * 0.8
        };

        return !(
            playerRect.top >= rewardCollisionArea.bottom ||
            playerRect.bottom <= rewardCollisionArea.top ||
            playerRect.right <= rewardCollisionArea.left ||
            playerRect.left >= rewardCollisionArea.right
        );
    }

    // Function to end the game
    function endGame(message) {
        gameRunning = false; // Set gameRunning to false
        gameOverMessage.textContent = message;
        gameOverMessage.style.display = 'block';
        cancelAnimationFrame(backgroundMovementId); // Stop background movement
        if ('ontouchstart' in window) {
            gameContainer.removeEventListener('touchmove', handleTouchMove);
        } else {
            document.removeEventListener('keydown', handleKeyPress);
        }
        clearInterval(obstacleInterval);
        clearInterval(rewardInterval);
    }

    // Periodically spawn obstacles and rewards
    const obstacleInterval = setInterval(spawnObstacle, 3000); // Adjust interval as needed
    const rewardInterval = setInterval(spawnReward, 4000); // Adjust interval as needed

    // Function to check for collisions and handle game logic
    function gameLoop() {
        if (!gameRunning) return;

        const obstacles = document.querySelectorAll('.obstacle');
        const rewards = document.querySelectorAll('.reward');

        obstacles.forEach(obstacle => {
            if (checkObstacleCollision(player, obstacle)) {
                endGame('Game Over');
            }
        });

        rewards.forEach(reward => {
            if (checkRewardCollision(player, reward)) {
                rewardsCollected += 1;
                score += 10; // Increase score
                reward.remove();
                scoreDisplay.textContent = `${rewardsCollected}/9`;

                if (rewardsCollected >= 9) {
                    endGame('Congratulations! You collected all rewards!');
                }

                console.log(`Score: ${score}`);
            }
        });

        requestAnimationFrame(gameLoop);
    }

    // Start game loop
    gameLoop();
});
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
      img.onerror = () => {
        img.remove();
        console.warn(`Removed missing image: ${img.src}`);
      };
    });
  });
  
