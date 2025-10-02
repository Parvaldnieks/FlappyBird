const canvas = document.getElementById('flappyBird');

if (canvas) {
    const ctx = canvas.getContext('2d');

    // Game state variables
    let gameOver = false;
    let isGameStarted = false;

    // Sounds
    const flapSound = new Audio('/sounds/Flying.mp3');
    const scoreSound = new Audio('/sounds/Score.mp3');
    const hitSound = new Audio('/sounds/Hit.mp3');
    const dieSound = new Audio('/sounds/Die.mp3');

    // Game variables
    const gravity = 0.2;
    let score = 0;
    const bird = new Image();
    const bg = '#70c5ce';
    let pipes = [];
    let pipeGap = 200;
    let pipeWidth = 50;
    let pipeSpeed = 1.2;
    const initialPipeSpeed = 1.2;
    let passedPipes = 0;
    let pipeSpacing = 170;
    let distanceSinceLastPipe = 0;

    let birdX = 50;
    let birdY = 150;
    let birdVelocity = 0;

    function drawBird() {
        ctx.drawImage(bird, birdX, birdY, 32, 32);
    }

    function drawPipes() {
        ctx.fillStyle = 'green';
        pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
            ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
        });
    }

    function drawScore() {
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${score}`, 10, 25);
    }

    function showGameOverPopup() {
        const popup = document.getElementById('gameOverPopup');
        const finalScore = document.getElementById('finalScore');
        finalScore.innerText = `Your Score: ${score}`;
        popup.style.display = 'block';

        document.getElementById('popupScoreDisplay').innerText = score;
        document.getElementById('playerNameInput').value = 'Player'; // default name
        document.getElementById('saveScorePopup').style.display = 'block';
    }

        function submitScore(name, score) {
            const meta = document.querySelector('meta[name="csrf-token"]');
            const token = meta ? meta.getAttribute('content') : '';

            fetch('/leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, score })
            })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Score submitted:', data);
            // Optionally redirect to leaderboard page:
            window.location.href = '/leaderboard';
        })
        .catch(error => {
            console.error('Error submitting score:', error);
            alert('Failed to submit score. Please try again.');
        });
    }

        function submitFinalScore() {
        const nameInput = document.getElementById('playerNameInput');
        const name = nameInput ? nameInput.value.trim() : 'Anonymous';
        if (!name) {
            alert('Please enter your name before submitting.');
            return;
        }
        submitScore(name, score);
        closeScorePopup();
    }

    function closeScorePopup() {
        const popup = document.getElementById('saveScorePopup');
        if (popup) popup.style.display = 'none';
    }

    function update() {
        birdVelocity += gravity;
        birdY += birdVelocity;
        distanceSinceLastPipe += pipeSpeed;

        if (distanceSinceLastPipe >= pipeSpacing) {
            const top = Math.random() * (canvas.height / 2);
            pipes.push({ x: canvas.width, top: top, scored: false });
            distanceSinceLastPipe = 0;
        }

        pipes.forEach((pipe, i) => {
            pipe.x -= pipeSpeed;

            if (
                birdX + 32 > pipe.x &&
                birdX < pipe.x + pipeWidth &&
                (
                    birdY < pipe.top ||
                    birdY > pipe.top + pipeGap
                )
            ) {
                if (!gameOver) {
                    gameOver = true;
                    hitSound.currentTime = 0;
                    hitSound.play();
                    showGameOverPopup();
                }
            }

            if (!pipe.scored && pipe.x + pipeWidth < birdX) {
                score++;
                pipe.scored = true;
                passedPipes++;

                scoreSound.currentTime = 0;
                scoreSound.play();

                if (passedPipes % 5 === 0) {
                    pipeSpeed += 0.2;
                }
            }

            if (pipe.x + pipeWidth < 0) {
                pipes.splice(i, 1);
            }
        });

        if (birdY + 32 > canvas.height) {
            if (!gameOver) {
                gameOver = true;
                dieSound.currentTime = 0;
                dieSound.play();
                showGameOverPopup();
            }
        }
    }

    function draw() {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawBird();
        drawPipes();
        drawScore();
    }

    function loop() {
        if (!gameOver && isGameStarted) {
            update();
            draw();
            requestAnimationFrame(loop);
        }
    }

    function startGame() {
        const skinSelector = document.getElementById('birdSkinSelector');
        bird.src = skinSelector?.value || '/images/Flappy-Bird.png';
        document.getElementById('startScreen').style.display = 'none';
        isGameStarted = true;
        loop();
    }

    function restartGame() {
        gameOver = false;
        score = 0;
        passedPipes = 0;
        pipes = [];
        birdX = 50;
        birdY = 150;
        birdVelocity = 0;
        pipeSpeed = initialPipeSpeed;
        distanceSinceLastPipe = 0;

        document.getElementById('gameOverPopup').style.display = 'none';

        closeScorePopup();

        isGameStarted = true;
        loop();
    }

    function goBackToStart() {
        gameOver = false;
        isGameStarted = false;
        score = 0;
        passedPipes = 0;
        pipes = [];
        birdX = 50;
        birdY = 150;
        birdVelocity = 0;
        pipeSpeed = initialPipeSpeed;

        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        document.getElementById('gameOverPopup').style.display = 'none';

        closeScorePopup();

        document.getElementById('startScreen').style.display = 'block';
    }

    function goToDashboard() {
        window.location.href = '/dashboard';
    }

    // Input listeners
    document.addEventListener('keydown', function (e) {
        if (isGameStarted && !gameOver) {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                birdVelocity = -6.5;
                flapSound.currentTime = 0;
                flapSound.play();
            } else if (e.code === 'ArrowDown') {
                birdVelocity += 2;
            } else if (e.code === 'ArrowLeft') {
                birdX -= 10;
            } else if (e.code === 'ArrowRight') {
                birdX += 10;
            }
        }
    });

    document.addEventListener('click', function () {
        if (isGameStarted && !gameOver) {
            birdVelocity = -6.5;
            flapSound.currentTime = 0;
            flapSound.play();
        }
    });

    bird.onload = () => {
        // Preload complete
    };

    // Expose functions globally
    window.startGame = startGame;
    window.restartGame = restartGame;
    window.goBackToStart = goBackToStart;
    window.goToDashboard = goToDashboard;
    window.closeScorePopup = closeScorePopup;
}
