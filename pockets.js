// Function to check if any balls have been potted
function pocketedBalls() {
    // Check if the cue ball is pocketed
    if (cueBall && isCueBallPocketed()) {
        handleCueBallPocketed(); // Handle scenario when cue ball is pocketed
    }

    // Iterate over all balls
    for (let i = balls.length - 1; i >= 0; i--) {
        let ball = balls[i]; // Get the current ball
        let ballPos = ball.body.position; // Get its position on the canvas

        // Check if the ball is pocketed by any of the pockets
        for (let pocket of pockets) {
            if (isBallPocketed(ballPos, pocket)) {
                console.log(`Pocketed ball color: ${ball.color}`); // Log the color of the pocketed ball

                // Check if the pocketed ball is a colored ball (not red)
                if (ball.color !== 'red') {
                // Respawn the colored ball to its designated position
                moveBallToPos(ball, coloredBallPos[ball.color]);

                // Increment the counter for consecutive colored balls potted
                multipleColoredBallsPotted++;

                // Check if two consecutive colored balls have been potted
                if (multipleColoredBallsPotted === 2) {
                    // Set the flag to display the fault message
                    displayErrorMessage= true;
                }
                } else {
                // If the pocketed ball is red, remove it from the world and the balls array
                Matter.World.remove(world, ball.body);
                balls.splice(i, 1); // Remove the ball from the balls array

                // Reset the counter for consecutive colored balls potted
                multipleColoredBallsPotted = 0;

                // Break out of the loop since the ball is removed and no need to check further pockets
                break;
                }
            }
        }
    }
}

// Function to reposition a ball to a specified location
function moveBallToPos(ball, position) {
    // Update the position of the ball's Matter.js body
    Matter.Body.setPosition(ball.body, position);
    // Stop the ball's motion by setting its velocity to zero
    Matter.Body.setVelocity(ball.body, { x: 0, y: 0 });
    // Stop any rotation of the ball by setting its angular velocity to zero
    Matter.Body.setAngularVelocity(ball.body, 0);
  }
  
// Function to determine if the cue ball has been pocketed
function isCueBallPocketed() {
    // Check if any of the pockets contain the cue ball's position
    for (const pocket of pockets) {
        if (isBallPocketed(cueBall.body.position, pocket)) {
        // Return true if the cue ball is pocketed
        return true;
        }
    }
    // Return false if the cue ball is not pocketed
    return false;
}

// Function to handle the situation when the cue ball is pocketed
function handleCueBallPocketed() {
    // Inform the user that the cue ball has been pocketed
    console.log('Cue ball pocketed!');
    // // Remove the cue ball from the Matter.js world and set it to null
    Matter.World.remove(world, cueBall.body);
    cueBall = null;
    // Reset the cueBallLocated flag to allow the user to place the cue ball again
    cueBallLocated = false;
    // Set the cueBallPocketed flag to true indicating that the cue ball has been pocketed
    cueBallPocketed = true;
}

// Function to determine if a ball is within the boundaries of a pocket
function isBallPocketed(ballPos, pocketPos) {
    // Calculate the distance between the ball and the center of the pocket
    let distance = dist(ballPos.x, ballPos.y, pocketPos.x, pocketPos.y);
    // Check if the distance is less than half the diameter of the pocket
    // (allowing for some overlap with the pocket's edge)
    return distance < (pocketDiameter * 0.6) / 2; 
}

// Function to reset the game state after a fault
// (such as potting two consecutive colored balls)
function resetAfterFault() {
    multipleColoredBallsPotted = 0;
    displayErrorMessage= false;
}