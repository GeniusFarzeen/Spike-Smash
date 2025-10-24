const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let spikes = [];
let score = 0;
let gameRunning = false;
let playerY = canvas.height - 100;
let playerX = canvas.width / 2;
let playerSize = 40;

document.getElementById("playButton").addEventListener("click", startGame);

function startGame() {
    document.getElementById("playButton").style.display = "none";
    canvas.style.display = "block";
    gameRunning = true;
    score = 0;
    spikes = [];
    loop();
}

function spawnSpike() {
    spikes.push({
        x: Math.random() * (canvas.width - 30),
        y: -40,
        size: 30
    });
}

function drawPlayer() {
    ctx.fillStyle = "cyan";
    ctx.fillRect(playerX - playerSize/2, playerY, playerSize, playerSize);
}

function drawSpikes() {
    ctx.fillStyle = "red";
    spikes.forEach(spike => {
        ctx.beginPath();
        ctx.moveTo(spike.x, spike.y);
        ctx.lineTo(spike.x + spike.size, spike.y);
        ctx.lineTo(spike.x + spike.size/2, spike.y + spike.size);
        ctx.fill();
        spike.y += 5;
    });
}

function checkCollision() {
    spikes.forEach(spike => {
        if (spike.y + spike.size >= playerY &&
            spike.x < playerX + playerSize &&
            spike.x + spike.size > playerX - playerSize) {
            endGame();
        }
    });
}

function endGame() {
    gameRunning = false;
    alert("Game Over! Score: " + score);
    location.reload();
}

function loop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawSpikes();
    checkCollision();

    if (Math.random() < 0.05) {
        spawnSpike();
    }

    score++;
    requestAnimationFrame(loop);
}

window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    playerX = e.clientX - rect.left;
});
