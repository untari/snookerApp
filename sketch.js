function setup() {
    // Set the size of the canvas according to the table size
    createCanvas(tblWidth, tblHeight).mouseClicked(handleMouseClick);
    // Initiate Matter.js engine
    engine = Engine.create();
    world = engine.world;
    // Disable gravity in the horizontal direction for a snooker table
    world.gravity.y = 0;
    // Set up the snooker environment, such as placing balls and cushions
    setupSnookerEnvironment();
    // Create the constraints of the cushions, defining their boundaries
    cushionConstraints();

    // Handle collision events between snooker balls
    Matter.Events.on(engine, 'collisionStart', function(event) {
        // Get the pairs of colliding balls
        let pairs = event.pairs;
        // Iterate through each pair of colliding balls
        for (let i = 0, j = pairs.length; i < j; ++i) {
            // Get the current colliding ball pair
            let pair = pairs[i];
            // Check if the cueball is involved in the collision
            let cueBallInvolved = pair.bodyA.label === 'cueBall' || pair.bodyB.label === 'cueBall';
            // Identify the ball that collided with the cueball
            let otherBody = pair.bodyA.label === 'cueBall' ? pair.bodyB : pair.bodyA;
            // Only print if the cueball is involved, determine the type of collision
            if (cueBallInvolved) {
                if (otherBody.label === 'redBall') {
                    collisionMessage = 'cueball-red';
                } else if (otherBody.label === 'colorBall') {
                    collisionMessage = 'cueball-color';
                } else if (otherBody.label === 'cushion') {
                    collisionMessage = 'cueball-cushion';
                }
                // Store the time of the collision message for timing
                collisionMessageTime = millis();
            }
        }
    });
}

function setupSnookerEnvironment() {
    // Define the snooker table with correct proportions
    table = {
        // Center the table horizontally and vertically
        x: width / 2,
        y: height / 2,
        // Dark green color for the table
        color: [78,136,52,255]
    };
}

function drawTable() {
    // Draw the brown borders
    const cornerRadius = 10;

    noStroke()
    // Brown color for the borders
    fill(64,36,13,255);
    // The entire canvas is the border initially
    rect(0, 0, tblWidth, tblHeight, cornerRadius);

    // Draw the green baize, inset by the border width
    fill(table.color);
    rect(widthBorder, widthBorder, tblWidth - widthBorder * 2, tblHeight - widthBorder * 2, cornerRadius);

    // Set the fill color to yellow for the pocket covers
    fill(243,213,70,255);

    // Draw the corner pocket covers with rounded top left corner
    rect(0, 0, pocketPaddSize, pocketPaddSize, cornerRadius, 0, cornerRadius, 0);
    rect(tblWidth - pocketPaddSize, 0, pocketPaddSize, pocketPaddSize, 0, cornerRadius, 0, cornerRadius);
    rect(0, tblHeight - pocketPaddSize, pocketPaddSize, pocketPaddSize, 0, cornerRadius, 0, cornerRadius);
    rect(tblWidth - pocketPaddSize, tblHeight - pocketPaddSize, pocketPaddSize, pocketPaddSize, cornerRadius, 0, cornerRadius, 0);

    // Draw the side pocket covers without rounded corners
    rect(tblWidth / 2 - pocketPaddSize / 2, 0, pocketPaddSize, widthBorder);
    rect(tblWidth / 2 - pocketPaddSize / 2, tblHeight - widthBorder, pocketPaddSize, widthBorder);
    
    // Set the fill color to white for the lines
    stroke(255);
    // Set the outline thickness to 1 pixel
    strokeWeight(1); 

    // Draw baulk line, 1/5th from the left side of the table
    line(baulkLineX, widthBorder+cushionDepth, baulkLineX, (tblHeight-widthBorder-cushionDepth));
    // The D-line is not filled, so we use noFill()
    noFill();
    stroke(255);
    // Drawing the left part of the D-line circle
    arc(dLineCenterX, dLineCenterY, dLineDiameter, dLineDiameter, HALF_PI,-HALF_PI);
    // Reset drawing settings
    noStroke();
    // Draw all the Cushions
    Cushion();
    // Black color for the pockets
    fill(0);

    // Correct size for the pockets
    const ballRadius = ballDiameter / 2;
    // 1.5 times the ball's radius
    const pocketRadius = 1.5 * ballRadius;

    // Draw the corner pocket holes aligned with the bottom right of the yellow covers
    ellipse(widthBorder, widthBorder, pocketRadius * 2);
    ellipse(tblWidth - widthBorder, widthBorder, pocketRadius * 2);
    ellipse(widthBorder, tblHeight - widthBorder, pocketRadius * 2);
    ellipse(tblWidth - widthBorder, tblHeight - widthBorder, pocketRadius * 2);
    // Draw the side pocket holes aligned with the bottom of the yellow covers
    ellipse(tblWidth / 2, widthBorder, pocketRadius * 2);
    ellipse(tblWidth / 2, tblHeight - widthBorder, pocketRadius * 2);
}

function draw() {
    // Clear the canvas to make it transparent
    clear(); 
    // Update the Matter.js simulation
    Engine.update(engine);
    // Draw the snooker table
    drawTable();

    // Check if Extreme Mode is enabled and display instructions if necessary
    if (showExtremeModeInstructions) {
        displayExtremeModeInstructions(); // Display instructions for Extreme Mode
        } else {
        // Add random holes for Extreme Mode if enabled
        if (extremeModeFlag) {
            // Check if it's time to add another hole
            if (millis() > nextHoleTime) {
            // Add a random hole
            addRandomHole();
            // Schedule the next hole to be added after a specified interval
            nextHoleTime = millis() + holeInterval;
            }
            // Draw existing holes
            drawHoles(); // Display holes on the table
            // Check if any balls have fallen into holes
            checkForBallsInHoles(); // Check for balls that have fallen into the holes
        }
        // Check if the game mode has been selected
        if (!selectedMode) {
            // Display the message to select the game mode
            displayModeSelection(); // Display instructions to select the game mode
        } else {
            // Check if the cueball has been placed
            if (cueBallLocated) {
            // If cueball is placed, display balls and handle cueball interactions
            displayBalls(); // Display all the balls on the table
            // Handle interactions with the cueball, such as cueball movement and collisions
            handleCueBallInteractions();
            } else if (cueBallPocketed && !cueBallLocated) {
            // If cueball was pocketed and hasn't been re-placed, display message and balls
            displayRePlaceMessage(); // Prompt the user to place the cueball back on the table
            displayBalls(); // Display all the balls
            } else if (!cueBallLocated && !showExtremeModeInstructions) {
            // If cueball is not placed and Extreme Mode instructions aren't showing, display placement message
            displayPlacementMessage(); // Display instructions to place the cueball
            displayBalls(); // Display all the balls
            }
        }

        // Check if a ball has been lost in Extreme Mode and display message if necessary
        if (ballLostAlert) {
            // Check if the time since the ball was lost is within the message duration
            if (millis() - errorMessageStart < errorMessageDuration) {
                // Display the message that the ball was lost
                displayLostBallMessage();
            } else {
                // Clear the message flag after the duration has passed
                ballLostAlert= false;
            }
        }

        // Check for pocketed balls and display relevant messages
        // Check for balls that have been pocketed
       pocketedBalls();
        // Display a message if two color balls were pocketed in a row
        displayTwoColorBallsPocketedMessage();
        // Display a message after a collision between a ball and the cushion or another ball
        displayCollisionMessage();
    }
}

// Function to display all the snooker balls on the table
function displayBalls() {
    // Iterate through the array of snooker balls
    for (let i = 0; i < balls.length; i++) {
        // Show the current ball in the array and display  the current ball on the canvas
        balls[i].show();
    }
}

// Function to handle interactions with the cue ball
function handleCueBallInteractions() {
    // Check if the cueball exists
    if (cueBall) {
        // Show the cueball on the canvas and display it
        cueBall.show();
        // Handle cueball aiming and hitting operations
        handleAimingAndHitting();
    }
}

// Function for aiming and hitting the cue ball
function handleAimingAndHitting() {
    // Check if the user is dragging the mouse and if the drag started at the cueball
    if (dragging && dragStart && cueBall) {
        // Draw the cue stick on the canvas based on the mouse position
        drawCueStick();
        // Display the power level based on the mouse position and angle
        displayPowerLevel();
    }
}

// Function to display the power level
function displayPowerLevel() {
    // Check if the user is dragging the mouse and if the drag started at the cueball
    let dragDistance = dist(dragStart.x, dragStart.y, mouseX, mouseY);
    // Cap the power at MAX_POWER
    let power = map(dragDistance, 0, MAX_LINE_LENGTH, 0, MAX_POWER);
    // Constrain the power between 0 and MAX_POWER
    power = constrain(power, 0, MAX_POWER); 

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    // Display power level, capped at MAX_POWER
    text("Power: " + power.toFixed(0), width / 2, 30);
}

// Function to draw the cue stick based on the mouse position and angle
function drawCueStick() {
    // Get the position of the cue ball
    let cueBallPos = cueBall.body.position;

    // Calculate the angle between the mouse cursor and the cue ball
    let angle = atan2(mouseY - cueBallPos.y, mouseX - cueBallPos.x);

    // Set a fixed length and width for the cue stick
    let cueLength = 100;
    let cueWidth = 5; 
    // Calculate the offset from the cue ball to the cue stick's start
    let offset = 65;
    let startX = cueBallPos.x + (offset * cos(angle));
    let startY = cueBallPos.y + (offset * sin(angle));
    // Push the current drawing state onto the stack for local changes
    push();
    // Translate the canvas to the start position of the cue stick
    translate(startX, startY);
    // Rotate the canvas to align with the stick angle
    rotate(angle);
    // Set the drawing properties for the cue stick
    fill(205, 127, 50);
    noStroke();
    // Draw the cue stick as a rectangle centered at the current position
    rectMode(CENTER);
    rect(0, 0, cueLength, cueWidth);
    fill(128, 0, 32);
    rect(-50, 0, 5, cueWidth);
    fill(225, 193, 110);
    rect(45, 0, 20, cueWidth);
    pop();
}

function handleMouseClick() {
    // Check if the game mode has been selected and the cueball hasn't been placed yet,
    // and determine if the mouse click is within the D semicircle
    if (selectedMode&& !cueBallLocated && isClickWithinD(mouseX, mouseY)) {
        // Place the cueball at the clicked position
        placeCueBall(mouseX, mouseY);
        // Set the cueball placement flag to true
        cueBallLocated = true;
    }
}

function isClickWithinD(x, y) {
    // Check if within the bounding box of the D
    if (mouseX > dLineCenterX - dLineRadius && mouseX < dLineCenterX &&
        mouseY > dLineCenterY - dLineRadius && mouseY < dLineCenterY + dLineRadius) {
        // Get the distance between the mouse position and the D's center
        let distToCenter = dist(mouseX, mouseY, dLineCenterX, dLineCenterY);
        // Check if the mouse click is within the semicircle's radius
        if (distToCenter < dLineRadius) {
            // The click is within the D semicircle
            return true;
        }
    }
    return false;
}

function placeCueBall(x, y) {
    // Create an instance of Ball class with cueball properties
    cueBall = new Ball(x, y, ballDiameter / 2, 'white', 'cueBall');
}

// This function will be responsible for initiating the drag
function startDragging() {
    let cueBallPos = cueBall.body.position;
    // Check if the mouse is hover the cue ball
    if (dist(mouseX, mouseY, cueBallPos.x, cueBallPos.y) < cueBall.radius) {
        // Set the initial drag position
        dragStart = createVector(mouseX, mouseY);
        // Set the dragging flag to true
        dragging = true;
    }
}

// This function calculates the force based on the drag distance and applies it to the cue ball
function applyForceToCueBall() {
    // Get the current mouse position
    let dragEnd = createVector(mouseX, mouseY);
    // Calculate the force vector by subtracting the initial drag position from the current mouse position
    let forceDirection = p5.Vector.sub(dragStart, dragEnd);
    // Normalize the force vector to ensure it has a magnitude of 1
    forceDirection.normalize();
    
    // Calculate the distance between the drag start and end positions
    let dragDistance = dist(dragStart.x, dragStart.y, mouseX, mouseY);
    // Scale the distance to a value between 0 and MAX_POWER
    let power = min(map(dragDistance, 0, width, 0, MAX_POWER), MAX_POWER);
    // Calculate the force magnitude by multiplying the power by a constant value
    let forceMagnitude = power * 0.1;
    
    // Clamp the force magnitude to a maximum value
    forceDirection.mult(min(forceMagnitude, MAX_FORCE_VALUE));
    // Set the cueball's body to dynamic to enable movement
    Matter.Body.setStatic(cueBall.body, false);
    // Apply the force to the cueball's body at its current position
    Matter.Body.applyForce(cueBall.body, cueBall.body.position, forceDirection);
}

// Detects when the mouse is pressed
function mousePressed() {
    // Check if the game mode is selected, cueball is placed, not dragging, and cueball exists
    if (selectedMode&& cueBallLocated && !dragging && cueBall) {
        // Call the function to start dragging the cueball
        startDragging();
    }
}

function mouseReleased() {
    // Apply the force to the cue ball only if dragging has occurred
    if (selectedMode&& cueBallLocated && dragging && cueBall) {
        // Apply the calculated force to the cueball
        applyForceToCueBall();
        // Set dragStart to null to indicate no drag in progress
        dragStart = null;
        dragging = false;
    }
}

// Main menu mode selection logic
function keyPressed() {
    // Check if mode hasn't been selected and the key pressed is one of the allowed options (1, 2, 3, or 4)
    if (!selectedMode&& (key === '1' || key === '2' || key === '3' || key === '4')) {
        // If the pressed key is '4', transition to Extreme Mode instructions
        if (key === '4') {
            showExtremeModeInstructions = true;
        } else {
            // Set the mode selection flag to true and initiate the selected mode
            selectedMode= true;
            if (key === '1') {
                standardMode();
            } else if (key === '2') {
                randomRedMode();
            } else if (key === '3') {
                randomMode();
            }
        }
    }
    // If the user has selected Extreme Mode and presses 'Enter', start the game
    if (showExtremeModeInstructions && key === 'Enter') {
        // Hide the Extreme Mode instructions
        showExtremeModeInstructions = false;
        // Set the mode selection flag to true and initiate Extreme Mode
        selectedMode= true;
        // Start Extreme Mode
        extremeMode();
    }
}