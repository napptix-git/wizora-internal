document.addEventListener("DOMContentLoaded", () => {
  const coinsContainer = document.querySelector(".coins");
  const stand = document.querySelector(".stand");
  const bottle = document.querySelector(".bottle");
  const bottleBody = document.querySelector(".body"); // Select the bottle body
  const progressBar = document.querySelector(".progress"); // Progress bar fill
  const progressText = document.querySelector(".progress-text"); // Progress percentage text
  const progressbar= document.querySelector(".progress-bar")
  const handIcon = document.querySelector(".fa-hand-o-left");
  const greatWorkText = document.querySelector(".great-work");
  const logo = document.querySelector(".logo")
  const submitBtn=document.querySelector(".submit")
  const totalRows = 3; // Number of rows to generate
  const coinsPerRow = 5; // Number of coins per row
  const totalCoins = totalRows * coinsPerRow; // Total number of coins
  let collectedCoins = 0; // Track how many coins are collected
  let rows = []; // Array to store rows of coins

  // Function to generate rows and coins
  function generateCoins() {
    for (let row = 0; row < totalRows; row++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("coin-row");
      rowDiv.style.display = "flex";
      rowDiv.style.justifyContent = "space-evenly";
      rowDiv.style.marginBottom = "5px";

      const coins = [];
      for (let i = 0; i < coinsPerRow; i++) {
        const coin = document.createElement("div");
        coin.classList.add("coin");
        coin.style.width = "18px";
        coin.style.height = "18px";
        coin.innerHTML = "$";
        coin.style.color = "#ffffff";
        coin.style.fontSize = "12px";
        coin.style.textAlign = "center";
        coin.style.lineHeight = "20px";
        coin.style.transition = "transform 1.5s ease, opacity 1.5s ease";
        coin.style.pointerEvents = "none";
        coin.style.userSelect = "none";
        rowDiv.appendChild(coin);
        coins.push(coin);
      }

      rows.push(coins); // Save each row of coins
      coinsContainer.appendChild(rowDiv);
    }
  }

  // Function to make coins fall row by row and collect in the bottle
  function dropCoinsRowByRow() {
    const bottleRect = bottleBody.getBoundingClientRect(); // Get the position of the bottle
    const bottleWidth = bottleRect.width; // Width of the bottle
    const bottleHeight = bottleRect.height; // Height of the bottle
    const bottleTopY = bottleRect.top; // Bottle top Y

    // Start from the last row
    rows.reverse().forEach((row, rowIndex) => {
      row.forEach((coin, coinIndex) => {
        setTimeout(() => {
          const coinRect = coin.getBoundingClientRect(); // Get the coin's current position
          const dx = bottleRect.left + Math.random() * bottleWidth - coinRect.left; // Random X offset within the bottle
          const dy = bottleTopY + Math.random() * bottleHeight - coinRect.top; // Random Y offset within the bottle

          // Animate the coin falling to the bottle
          coin.style.transform = `translate(${dx}px, ${dy}px) scale(0.5)`; // Move to bottle and shrink
          coin.style.opacity = "0"; // Fade out the coin

          // Append coin to bottle for stacking effect
          setTimeout(() => {
            const newCoin = coin.cloneNode(true); // Create a clone of the coin
            newCoin.style.transform = ""; // Reset transform
            newCoin.style.position = "absolute";
            newCoin.style.top = `${Math.random() * 80}%`; // Random Y position within the bottle
            newCoin.style.left = `${Math.random() * 80}%`; // Random X position within the bottle
            newCoin.style.opacity = "1";
            bottleBody.appendChild(newCoin); // Add the coin to the bottle
            coin.style.display = "none"; // Hide the original coin

            // Update the progress
            collectedCoins++;
            const progressPercentage = Math.floor((collectedCoins / totalCoins) * 100);
            progressBar.style.width = `${progressPercentage}%`; // Update progress bar width
            progressText.textContent = `${progressPercentage}%`; // Update progress text

            if (progressPercentage === 100) {
              showGreatWork(); // Call function to display "Great Work"
            }
          }, 1500); // Matches the animation duration
        }, coinIndex * 600 + rowIndex * 2000); // Staggered delay for rows and coins
      });
    });
  }

  // Function to show "Great Work" text
  function showGreatWork() {
    greatWorkText.style.display = "block"; // Make the "Great Work" text visible
    setTimeout(() => {
      greatWorkText.style.display = "none"; // Hide it after 2 seconds

      // Hide all content after "Great Work" disappears
      stand.style.display = "none";
      coinsContainer.style.display = "none";
      bottle.style.display = "none";
      // level.style.display = "none";
      handIcon.style.display = "none";
      progressBar.style.display = "none"// Hide the hand icon as well
      progressbar.style.display = "none"
      progressText.style.display="none"
   
      logo.style.display = "flex"; // Change logo to flex
    submitBtn.style.display = "flex"; // Change submit button to flex
    submitBtn.style.justifyContent = "center"; // Optional: center content
    submitBtn.style.alignItems = "center"; // Optional: center content
  }, 2000); // Wait 2 seconds before hiding content
}

  // Generate coins on load
  generateCoins();

  const lineContainer = document.querySelector(".line-container");
  let isDragging = false;
  let startX;
  let moveTimer;

  // Handle the start of a drag (mouse and touch)
  lineContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    handIcon.style.opacity = "0";
  });

  lineContainer.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    handIcon.style.opacity = "0";
  });

  // Handle the movement (mouse and touch)
  const handleMove = (currentX) => {
    if (!isDragging) return;

    const dx = currentX - startX;
    const currentLeft = parseFloat(window.getComputedStyle(lineContainer).left || 0);
    const newLeft = currentLeft + dx;

    if (newLeft <= window.innerWidth) {
      lineContainer.style.left = `${newLeft}px`;
      startX = currentX;

      const opacity = Math.max(0, 1 - newLeft / window.innerWidth);
      lineContainer.style.opacity = opacity;

      clearTimeout(moveTimer);

      moveTimer = setTimeout(() => {
        lineContainer.style.display = "none";
        dropCoinsRowByRow(); // Trigger the coin drop when line container disappears
      }, 300);
    }
  };

  // Mouse move
  document.addEventListener("mousemove", (e) => {
    handleMove(e.clientX);
  });

  // Touch move
  document.addEventListener("touchmove", (e) => {
    handleMove(e.touches[0].clientX);
  });

  // End dragging (mouse and touch)
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  document.addEventListener("touchend", () => {
    isDragging = false;
  });
});
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.onerror = () => {
      img.remove();
      console.warn(`Removed missing image: ${img.src}`);
    };
  });
});
