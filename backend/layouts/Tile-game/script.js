const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const scene3 = document.getElementById('scene3');
const playButton = document.getElementById('playButton');
const shopNowButton = document.getElementById('shopNowButton');

const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 10;
let countdown;
let firstTile = null;
let lockBoard = false;

const tileImages = [
    './assets/frooty.png',
    './assets/mango.png'
];

const tileValues = [];
for (let i = 0; i < 9; i++) {
    tileValues.push(tileImages[i % 2]);
}
tileValues.sort(() => Math.random() - 0.5);

playButton.addEventListener('click', () => {
    scene1.classList.add('hidden');
    scene2.classList.remove('hidden');

    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            tiles.forEach(tile => tile.style.pointerEvents = 'none');
            scene2.classList.add('hidden');
            scene3.classList.remove('hidden');

            // Stagger animations
            setTimeout(() => {
                scene3.querySelector('.overlay2').style.animation = 'overlayDrop 1s ease-in-out forwards';
            }, 1000); // After background fade-in (1s)

            setTimeout(() => {
                scene3.querySelector('.scene3-content').style.animation = 'fadeUp 1s ease-in-out forwards';
            }, 2000); // After overlay2 animation (1s + 1s)
        }
    }, 1000);
});

const gameBoard = document.getElementById('gameBoard');
tileValues.forEach(imagePath => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.image = imagePath;

    const tileInner = document.createElement('div');
    tileInner.classList.add('tile-inner');

    const front = document.createElement('div');
    front.classList.add('tile-front');
    const logoImg = document.createElement('img');
    logoImg.src = './assets/logo.png';
    logoImg.alt = 'Logo';
    front.appendChild(logoImg);

    const back = document.createElement('div');
    back.classList.add('tile-back');
    const itemImg = document.createElement('img');
    itemImg.src = imagePath;
    itemImg.alt = 'Item';
    back.appendChild(itemImg);

    tileInner.appendChild(front);
    tileInner.appendChild(back);
    tile.appendChild(tileInner);
    gameBoard.appendChild(tile);
});

const tiles = document.querySelectorAll('.tile');

tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        if (lockBoard || tile.classList.contains('flipped')) return;

        tile.classList.add('flipped');

        if (!firstTile) {
            firstTile = tile;
        } else {
            lockBoard = true;

            if (firstTile.dataset.image === tile.dataset.image) {
                score += 10;
                scoreDisplay.textContent = `Score: ${score}`;
                scoreDisplay.classList.add('bump');
                setTimeout(() => {
                    scoreDisplay.classList.remove('bump');
                }, 400);
                firstTile = null;
                lockBoard = false;
            } else {
                setTimeout(() => {
                    firstTile.classList.remove('flipped');
                    tile.classList.remove('flipped');
                    firstTile = null;
                    lockBoard = false;
                }, 1000);
            }
        }
    });
});