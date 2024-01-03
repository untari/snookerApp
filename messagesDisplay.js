// Displays the instructions for selecting the game mode
function displayModeSelection() {
    // Set fill color to white
    fill(255);
    // Set text alignment to center
    textAlign(CENTER, CENTER);
    // Set text size to 16 pixels
    textSize(16);

    // Display message to press 1 for standard snooker
    text("Press 1 for standard snooker", width / 2, height / 5);

    // Display message to press 2 for all random balls
    text("Press 2 for all random balls", width / 2, (height / 5)*2);

    // Display message to press 3 for random red balls
    text("Press 3 for random red balls", width / 2, (height / 5)*3);

    // Display message to press 4 for EXTREME MODE (Extension)
    text("Press 4 for EXTREME MODE (Extension)", width / 2, (height / 5)*4);
}

// Prompts the user to place the cueball inside the D semi-circle before starting the game
function displayPlacementMessage() {
    // Set fill color to white
    fill(255);
    // Set text alignment to center
    textAlign(CENTER, CENTER, 100);
    // Set text size to 16 pixels
    textSize(18);

    // Display message to click on the D semi-circle to place the cueball and start the game
    text("Start the game by click-on and placing the cue ball in the designated D semi-circle", width / 2, height / 4);
}

// Indicates that the cueball has been pocketed and prompts the user to re-place it within the D semi-circle to continue playing
function displayRePlaceMessage() {
    // Set fill color to white
    fill(255);
    // Set text alignment to center
    textAlign(CENTER, CENTER);
    // Set text size to 16 pixels
    textSize(16);

    // Display message to click on the D semi-circle to place the cue ball to continue playing
    text("Click and drag the cue ball into the D semi-circle to continue playing", width / 2, height / 4);
}

// Handles the situation where two consecutive colored balls are pocketed
function displayTwoColorBallsPocketedMessage() {
    // Check if the global variable 'displayFaultMessage' is true
    if (displayErrorMessage) {
        // Display a fault message with a red color, centered on the canvas
        fill(136, 8, 8); // Red color for the fault message
        textAlign(CENTER, CENTER);
        text("Fault, two consecutive colored balls potted", width / 2, height / 2);

        // Set a timeout of 2 seconds to reset the game state after the message is displayed
        setTimeout(() => {
        resetAfterFault();
        }, 2000); // Hide the message after 2 seconds for example
    }
}
  
// Displays a message indicating that the ball has fallen into a malignant hole (specifically for Extreme Mode)
function displayLostBallMessage() {
    // Use a red color for the message
    fill(136, 8, 8);
    // Set text alignment to center
    textAlign(CENTER, CENTER);

    // Display message indicating the ball has been lost
    text("You lost the ball :(", width / 2, height / 2);
}

// Instructions when Extreme Mode selected
function displayExtremeModeInstructions(){
    push();

    // Draw a semi-transparent rectangle as the background for the instructions
    fill(0, 0, 0, 150); // Semi-transparent black
    rectMode(CENTER);
    let rectWidth = 300;
    let rectHeight = 80;
    rect(width / 2, height / 2, rectWidth, rectHeight, 20); // Rounded corners

    // Display the instruction text
    fill(255); // White text
    textAlign(CENTER, CENTER);
    textSize(16);
    textFont('Arial', 11);
    text("Extreme Mode: Balls are half size with random holes\nappearing every 5 seconds.\nPotting in holes loses the ball and points.\nPress ENTER to start.", width / 2, height / 2);

    pop();
}

// Alert user the type of collision of the cueball
function displayCollisionMessage() {
    if (millis() - collisionMessageTime < collisionMessageDuration) {
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(16); 
        text(collisionMessage, width / 2, 50); // Display at the top of the canvas
    } else {
        collisionMessage = ""; // Clear the message after the duration
    }
}