document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    const scoreElement = document.getElementById("score");
    const timeLeftElement = document.getElementById("time-left");
    const result = document.getElementById("result");

    let score = 0;
    let timeLeft = 60;
    let isGameActive = false;
    let characterX = canvas.width / 2;
    let characterY = canvas.height / 2;
    const characterWidth = 50;
    const characterHeight = 50;
    const movementSpeed = 5;
    const boxWidth = canvas.width - characterWidth;
    const boxHeight = canvas.height - characterHeight;

})

