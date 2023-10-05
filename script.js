document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    const scoreElement = document.getElementById("score");
    const timeLeftElement = document.getElementById("time-left");
    const instructions = document.querySelector(".instructions");
    const startButton = document.getElementById("start-button");

    let score = 0;
    let timeLeft = 60;
    let isGameActive = false;
    let characterX = canvas.width / 2;
    let characterY = canvas.height / 2;
    const characterWidth = 20;
    const characterHeight = 20;
    const movementSpeed = 5;
    const boxWidth = canvas.width - characterWidth;
    const boxHeight = canvas.height - characterHeight;

    let targetX = canvas.width - 100;
    let targetY = canvas.height / 2;
    const targetWidth = 30;
    const targetHeight = 30;

    let timerInterval;

    function startGame() {
        isGameActive = true;
        instructions.style.display = "none";
        startButton.style.display = "none";
        canvas.style.display = "block";
        resetGame();
        startTimer();
        gameLoop();
    }

   







