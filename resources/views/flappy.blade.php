<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Flappy Bird</title>
    <style>
        html, body { 
            margin: 0;
             padding: 0; 
            }
        canvas { 
            display: block;
            margin: 0 auto;
            background: #70c5ce;
            width: 450px;
            height: 100vh;
            touch-action: manipulation;
        }
        @media (min-width: 420px) {
            canvas {
                width: 1500px;  
                height: 100vh;
            }
        }
        #saveScorePopup button {
            padding: 10px 20px;
            font-size: 16px;
            background: #70c5ce;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            color: white;
            margin-top: 10px;
        }
        #saveScorePopup {
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <canvas id="flappyBird" width="650" height="700"></canvas>

    <div id="startScreen" style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 3px solid #222;
        border-radius: 10px;
        padding: 20px 30px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        font-family: Arial, sans-serif;
        z-index: 999;
    ">
        <h2>Flappy Bird</h2>

        <label for="birdSkinSelector">Choose your Skin:</label>
        <select id="birdSkinSelector">
        <option value="/images/Yellow-Flappy-Bird.png">Classic</option>
        <option value="/images/Red-Flappy-Bird.png">Red Bird</option>
        <option value="/images/Blue-Flappy-Bird.png">Blue Bird</option>
        <option value="/images/Green-Flappy-Bird.png">Green Bird</option>
        </select>

        <p>Click Start to Play!</p>
        <button onclick="startGame()" style="
            padding: 10px 20px;
            font-size: 16px;
            background: #70c5ce;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            color: white;
        ">Start</button>
        <button id="backToDashboardBtn" onclick="goToDashboard()" style="
            padding: 10px 20px;
            font-size: 16px;
            background: #70c5ce;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            color: white;
        ">Back</button>
    </div>

    <div id="gameOverPopup" style="
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 3px solid #222;
        border-radius: 10px;
        padding: 20px 30px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        font-family: Arial, sans-serif;
        z-index: 999;
    ">
        <h2>Game Over</h2>

        <p id="finalScore"></p>
        <button onclick="restartGame()" style="
            padding: 10px 20px;
            font-size: 16px;
            background: #70c5ce;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            color: white;
        ">Restart</button>

        <button onclick="goBackToStart()" style="
            padding: 10px 20px;
            font-size: 16px;
            background: #70c5ce;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            color: white;
        ">Back</button>
    </div>

    <div id="saveScorePopup" style="display: none; position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 20px; border: 2px solid black; z-index: 10; border-radius: 10px;">
        <h3>Save Your Score</h3>
        <p>Your Score: <span id="popupScoreDisplay"></span></p>
        <input type="text" id="playerNameInput" placeholder="Enter your name" style="width: 100%; margin-bottom: 10px;" />
        <button onclick="submitFinalScore()">Submit</button>
        <button onclick="closeScorePopup()">Cancel</button>
    </div>

    <script src="{{ asset('js/flappy.js') }}"></script>
</body>
</html>
