document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    const scoreElement = document.getElementById("score");
    const timeLeftElement = document.getElementById("time-left");
    const instructions = document.querySelector(".instructions");
    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
    resetGame();
    startGame(); // Start the game again
});
    // Define the obstacles array
    const obstacles = [];

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

    // Function to generate a new set of obstacles
    function generateNewObstacles() {
        obstacles.length = 0; // Clear existing obstacles
        // Generate and add new obstacles (you can adjust positions and sizes)
        const maxObstacles = 3; // Maximum number of obstacles
        const minObstacleWidth = 30;
        const maxObstacleWidth = 80;
        const minObstacleHeight = 30;
        const maxObstacleHeight = 150;
    
        for (let i = 0; i < maxObstacles; i++) {
            let obstacle;
            do {
                // Generate a random position and size for the obstacle
                obstacle = {
                    x: Math.random() * (canvas.width - maxObstacleWidth),
                    y: Math.random() * (canvas.height - maxObstacleHeight),
                    width: minObstacleWidth + Math.random() * (maxObstacleWidth - minObstacleWidth),
                    height: minObstacleHeight + Math.random() * (maxObstacleHeight - minObstacleHeight)
                };
            } while (obstacles.some(existingObstacle => isColliding(obstacle, existingObstacle)));
    
            obstacles.push(obstacle);
        }
    }

    // Collision detection function
    function isColliding(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    // Function to draw obstacles
    function drawObstacles() {
        ctx.fillStyle = "#c0392b"; // Color for obstacles
        for (const obstacle of obstacles) {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
       // ctx.fillStyle = "#27ae60"; // Color for new obstacles
        //for (const obstacle of newObstacles) {
            //ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        //}
    }

    // Inside the gameLoop function
    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (isGameActive) {
            ctx.strokeStyle = "#333";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Draw obstacles
            drawObstacles();

            ctx.fillStyle = "#3498db";
            ctx.fillRect(characterX, characterY, characterWidth, characterHeight);

            ctx.fillStyle = "#e74c3c";
            ctx.fillRect(targetX, targetY, targetWidth, targetHeight);
            ctx.drawImage(document.getElementById("house-img"), targetX, targetY, targetWidth, targetHeight);

            let obstacleCollision = false;
            // Check for collision with obstacles
            for (const obstacle of obstacles) {
                if (isColliding({ x: characterX, y: characterY, width: characterWidth, height: characterHeight }, obstacle)) {
                    // Character is colliding with an obstacle, prevent movement
                    obstacleCollision = true;
                    break;
                }
            }
            if (!obstacleCollision) {
                if (
                    characterX < targetX + targetWidth &&
                    characterX + characterWidth > targetX &&
                    characterY < targetY + targetHeight &&
                    characterY + characterHeight > targetY
                ) {
                    score++;
                    moveTarget(); // Move the target when the player scores
                    generateNewObstacles(); // Generate new obstacles when the player scores
                    updateScore();
                }

                if (timeLeft <= 0 || score >= 5) {
                    alert("you win");
                    endGame();
                }
            }
        }

        if (isGameActive) {
            requestAnimationFrame(gameLoop);
        }
    }

    function startGame() {
        isGameActive = true;
        instructions.style.display = "none";
        startButton.style.display = "none";
        canvas.style.display = "block";
        resetGame();
        startTimer();
        gameLoop(); // Call the gameLoop function after it's defined
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            updateScore();
            if (timeLeft <= 0 || score >= 5) {
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
        if (score >= 5) {
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
        generateNewObstacles();
    }

    function moveTarget() {
        do {
            targetX = Math.random() * (canvas.width - targetWidth);
            targetY = Math.random() * (canvas.height - targetHeight);
        } while (obstacles.some(obstacle => isColliding({ x: targetX, y: targetY, width: targetWidth, height: targetHeight }, obstacle)));
    }
    

    function updateScore() {
        scoreElement.innerText = score;
        timeLeftElement.innerText = timeLeft;
    }

    document.addEventListener("keydown", (event) => {
        if (isGameActive) {
            switch (event.key) {
                case "ArrowRight":
                    // Check if moving right would cause a collision with any obstacle
                    const canMoveRight = obstacles.every(obstacle => {
                        return (
                            characterX + movementSpeed + characterWidth <= obstacle.x ||
                            characterY >= obstacle.y + obstacle.height ||
                            characterY + characterHeight <= obstacle.y
                        );
                    });
    
                    if (characterX < boxWidth && canMoveRight) {
                        characterX += movementSpeed;
                    }
                    break;
    
                case "ArrowLeft":
                    // Check if moving left would cause a collision with any obstacle
                    const canMoveLeft = obstacles.every(obstacle => {
                        return (
                            characterX - movementSpeed >= obstacle.x + obstacle.width ||
                            characterY >= obstacle.y + obstacle.height ||
                            characterY + characterHeight <= obstacle.y
                        );
                    });
    
                    if (characterX > 0 && canMoveLeft) {
                        characterX -= movementSpeed;
                    }
                    break;
    
                case "ArrowUp":
                    // Check if moving up would cause a collision with any obstacle
                    const canMoveUp = obstacles.every(obstacle => {
                        return (
                            characterY - movementSpeed >= obstacle.y + obstacle.height ||
                            characterX >= obstacle.x + obstacle.width ||
                            characterX + characterWidth <= obstacle.x
                        );
                    });
    
                    if (characterY > 0 && canMoveUp) {
                        characterY -= movementSpeed;
                    }
                    break;
    
                case "ArrowDown":
                    // Check if moving down would cause a collision with any obstacle
                    const canMoveDown = obstacles.every(obstacle => {
                        return (
                            characterY + movementSpeed + characterHeight <= obstacle.y ||
                            characterX >= obstacle.x + obstacle.width ||
                            characterX + characterWidth <= obstacle.x
                        );
                    });
    
                    if (characterY < boxHeight && canMoveDown) {
                        characterY += movementSpeed;
                    }
                    break;
            }
        }
    });
    
    
    
    
        startButton.addEventListener("click", startGame);
    });
    



