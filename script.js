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
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            updateScore();
            if (timeLeft <= 0 || score >= 25) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        isGameActive = false;
        clearInterval(timerInterval); 
        canvas.style.display = "none";
        instructions.style.display = "block";
        startButton.style.display = "block";
        if (score >= 25) {
            alert("You Win!");
        } else {
            alert("You Lose!");
        }
    }

    function resetGame() {
        score = 0;
        timeLeft = 60;
        characterX = canvas.width / 2;
        characterY = canvas.height / 2;
        moveTarget();
        updateScore();
    }



   







