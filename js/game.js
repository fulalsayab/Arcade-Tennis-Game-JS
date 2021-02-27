/**
 * The main functionality for the game
 * @author Ful Al Sayab
 */

// the sound of the ball
const tickSound = "https://www.ponggame.org/paddleBounce.mp3";
// the sound of the ball
const audio = new Audio(tickSound);
//The info about dimensions of the display area
let
    canvas;
// The graphical info used to draw forms
let
    canvasContext;
//The ball's position in x-axis
let
    ballX = 50;

//The ball's position in y-axis
let
    ballY = 50;
// The ball's speed in the x-axis
let
    ballSpeedX = 10;
// The ball's speed in the y-axis
let
    ballSpeedY = 5;
// The left paddle's position in y-axis
let
    paddle1Y = 250;
// The left paddle's position in y-axis
let
    paddle2Y = 250;
// The paddles' width
const
    PADDLE_THICKNESS = 10;
//The paddles' height
const
    PADDLE_HEIGHT = 100;
// total of points for player
let
    player1Score = 0;
// total of points for Computer
let
    player2Score = 0;
// flag to indicating end of the game
let
    endGame = false;
// biggest score one player can achieve
const
    WINNING_SCORE = 15;


/**
 * The main function that lets the HTML page load before running js code
 */
window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.font = "30px Arial";
    // set the ball's movement
    let framesPerSecond = 30;
    setInterval(function () {
            drawEverything();
            moveEverything();
        },
        1000 / framesPerSecond);
    canvas.addEventListener('mousemove', function (evt) {
        let mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    })
    canvas.addEventListener('mousedown', handleMouseClick);

}

/**
 * Function calculate the mouse position
 * @param evt the event of the mouse
 * @return the coordinate of the mouse
 */
function

calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    }

}

/**
 * Function that handels the mouse click
 * @param evt the event of the mouse click
 * @return the click of the mouse
 */
function

handleMouseClick(evt) {
    if (endGame) {
        player1Score = 0;
        player2Score = 0;
        endGame = false;
    }

}


/**
 * Function that control the AI of the second puddle
 */
function

pcMovement() {
    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);

    if (paddle2YCenter < ballY - 60) {
        paddle2Y += 6;
    } else if (paddle2YCenter > ballY + 60) {
        paddle2Y -= 6;
    }
}


/**
 * Function that makes the game's motion
 */
function

moveEverything() {
    pcMovement();
    ballX += ballSpeedX // moves the ball in the x-axis
    ballY += ballSpeedY // moves the ball in the y-axis

    if (ballX > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX < 20) {
        if (ballY > paddle1Y) {
            if (ballY < (paddle1Y + PADDLE_HEIGHT)) {
                ballSpeedX = -ballSpeedX;
                audio.play();
                let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
                ballSpeedY = deltaY * 0.35;
            } else {
                player2Score++;
                ballReset();
            }
        } else {
            player2Score++;
            ballReset();
        }
    }

    if (ballX > canvas.width - 20) {
        if (ballY > paddle2Y && ballY < (paddle2Y + PADDLE_HEIGHT)) {
            ballSpeedX = -ballSpeedX;
            audio.play();
            // calculates the angle for hitting the ball
            let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++;
            ballReset();
        }
    }

    // test y-axis limits
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
        audio.play();
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
        audio.play();
    }

}

/**
 * Function that draws every element
 */
function

drawEverything() {

    //The next line blanks out the screen with black
    colorRect(0, 0, canvas.width, canvas.height, 'green')
    if (endGame) {
        canvasContext.fillStyle = 'white';
        if (player1Score >= WINNING_SCORE) {
            canvasContext.fillText("Player1 Wins!! ", 300, 200);
        } else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Player1 Wins!! ", 300, 200);
        }
        canvasContext.fillText("Click to continue ", 280, 500);
        return;
    }
    //The next line is left player paddle
    colorRect(10, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white')
    //The next line is right player paddle
    colorRect(canvas.width - 20, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white')
    //The next line is middle net of the game
    drawNet();
    //The next line is drawing a circle
    colorCircle(ballX, ballY, 10, 'red');
    //This next line is the score of the player
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(player1Score, 100, 50);
    canvasContext.fillText(player2Score, canvas.width - 100, 50);

}

/**
 * Function that draw the middle net
 */
function

drawNet() {
    for (let i = 0; i < canvas.height; i += 40) {
        colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
}

/**
 * Function that manges the quality of the game ball
 * @param centerX the x coordinate of the ball
 * @param centerY the y coordinate of the ball
 * @param radius the radius of the ball
 * @param drawColor the color of the ball
 */
function

colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

/**
 * Function that manges the quality of the game figures
 * @param leftX the x coordinate of the figure
 * @param topY the y coordinate of the figure
 * @param width the width of the figure
 * @param height the height of the figure
 * @param drawColor the color of the figure
 */
function

colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

/**
 *Function that rests the paddle if missed
 */
function

ballReset() {
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
        endGame = true;
    }
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

}

