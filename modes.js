// Function for setting up the standard Snooker ball distribution
function standardMode(){
    // Clear all existing balls from the canvas
    clearBalls();

    // Calculate the x-position for the first column of red balls
    const firstXColumn = Math.floor(tblWidth / 5) * 4;

    // Calculate the y-position for the bottom ball in the first column
    const groundBallY = Math.floor(tblHeight / 2) + 2 * ballDiameter; 

    // Create the first column of 5 red balls
    for (let i = 0; i < 5; i++) {
        // Calculate the x and y coordinates for each red ball
        const x = firstXColumn;
        const y = groundBallY - i * (ballDiameter); // Add 1 for a small gap between balls

        // Create a new red ball object with the specified parameters
        const redBall = new Ball(x, y, ballDiameter / 2, 'red', 'redBall');

        // Add the red ball object to the balls array
        balls.push(redBall);
    }

    // Calculate the x-position for the second column of red balls
    const secondXColumn = firstXColumn - ballDiameter - 1; // Subtract the diameter and a gap

    // Array of y-positions for the 4 balls in the second column
    const yPositions = [
        halfTable + (ballDiameter + (ballDiameter / 2)),
        halfTable + (ballDiameter / 2),
        halfTable - (ballDiameter / 2),
        halfTable - (ballDiameter + (ballDiameter / 2))
    ];

    // Create the second column of 4 red balls
    for (let i = 0; i < 4; i++) {
        // Calculate the x and y coordinates for each red ball
        const x = secondXColumn;
        const y = yPositions[i];

        // Create a new red ball object with the specified parameters
        const redBall = new Ball(x, y, ballDiameter / 2, 'red', 'redBall');

        // Add the red ball object to the balls array
        balls.push(redBall);
    }

    // Calculate the x-position for the third column of red balls
    const thirdXColumn = firstXColumn - (ballDiameter * 2) - 2; // Subtract twice the diameter and a gap for the third column

    // Array of y-positions for the 3 balls in the third column
    const thirdPositionY = [
        halfTable + ballDiameter,
        halfTable,
        halfTable - ballDiameter
    ];

    // Create the third column of 3 red balls
    for (let i = 0; i < 3; i++) {
        // Calculate the x and y coordinates for each red ball
        const x = thirdXColumn;
        const y = thirdPositionY[i];
        // Create a new red ball object with the specified parameters
        const redBall = new Ball(x, y, ballDiameter / 2, 'red', 'redBall');
        // Add the red ball object to the balls array
        balls.push(redBall);
    }

    // Calculate the x-position for the fourth column of red balls
    const fourthXColumn = firstXColumn - (ballDiameter * 3) - 2; // Subtract thrice the diameter and a gap for the fourth column

    // Array of y-positions for the 2 balls in the fourth column
    const fourthPositionY = [
        halfTable + (ballDiameter / 2),
        halfTable - (ballDiameter / 2)
    ];

    // Create the fourth column of 2 red balls
    for (let i = 0; i < 2; i++) {
        // Calculate the x and y coordinates for each red ball
        const x = fourthXColumn;
        const y = fourthPositionY[i];
        let redBall = new Ball(x, y, ballDiameter / 2, 'red', 'redBall');
        balls.push(redBall);
    }

    // The x position for the single ball at the top of the triangle
    const fifthColumnX = firstXColumn - (ballDiameter * 4) - 2; // Subtract four times the diameter and a gap for the fifth column

    // Y position for the single ball in the fifth column
    const fifthY = halfTable; // The center of the table height

    // Create the single ball at the top of the triangle
    let singleRedBall = new Ball(fifthColumnX, fifthY, ballDiameter / 2, 'red', 'redBall');
    balls.push(singleRedBall);

    // Iterate over the coloredBallPos dictionary to create each colored ball
    for (const [color, position] of Object.entries(coloredBallPos)) {
        balls.push(new Ball(position.x, position.y, ballDiameter / 2, color, 'colorBall'));
    }
}

// Function for setting up the random ball distribution
function randomMode() {

    // Clear all existing balls from the canvas
    clearBalls();

    // Define padding and safe zone around the table to avoid placing balls outside the boundaries
    const padding = 10; // 10 pixels of padding around the table
    const minX = widthBorder + cushionDepth + padding; // Minimum x-coordinate within the safe zone
    const maxX = tblWidth - (widthBorder + cushionDepth + padding); // Maximum x-coordinate within the safe zone
    const minY = widthBorder + cushionDepth + padding; // Minimum y-coordinate within the safe zone
    const maxY = tblHeight - (widthBorder + cushionDepth + padding); // Maximum y-coordinate within the safe zone

    // Create 15 random positions for red balls within the safe zone
    for (let i = 0; i < 15; i++) {
        // Variables to store the random x, y coordinates and a flag indicating a safe position
        let x, y, safeSpot;

        // Perform a do-while loop to ensure the generated position is within the safe zone
        do {
        // Generate random x and y coordinates within the safe zone
        x = random(minX, maxX);
        y = random(minY, maxY);

        // Check if the generated position is safe (not occupied by existing balls)
        safeSpot = isSafePos(x, y, balls, ballDiameter);
        } while (!safeSpot); // Repeat if the position is not safe

        // Create a new red ball object at the generated position
        let redBall = new Ball(x, y, ballDiameter / 2, 'red', 'redBall');

        // Add the red ball object to the balls array
        balls.push(redBall);
    }

    // Iterate over the coloredBallPos dictionary to create each colored ball
    for (const [color, position] of Object.entries(coloredBallPos)) {
        balls.push(new Ball(position.x, position.y, ballDiameter / 2, color, 'colorBall'));
    }
}  

//  Function for setting up the random red balls distribution
function randomRedMode() {
    // Clear all existing balls from the canvas
    clearBalls();
    // Define padding and safe zone around the table to avoid placing balls outside the boundaries
    const padding = 10;
    const minX = widthBorder + cushionDepth + padding;
    const maxX = tblWidth - (widthBorder + cushionDepth + padding);
    const minY = widthBorder + cushionDepth + padding;
    const maxY = tblHeight - (widthBorder + cushionDepth + padding);

  // Place 15 random red balls within the safe zone
  for (let i = 0; i < 15; i++) {
    // Variables to store the random x, y coordinates and a flag indicating a safe position
    let x, y, safeSpot;
    // Generate random x and y coordinates within the safe zone
    do {
      x = random(minX, maxX);
      y = random(minY, maxY);
      // Check if the generated position is safe (not occupied by existing balls)
      safeSpot = isSafePos(x, y, balls, ballDiameter);
    } while (!safeSpot); // Repeat if the position is not safe
    // Create a new red ball object at the generated position
    let redBall = new Ball(x, y, ballDiameter / 2, 'red', 'redBall');
    // Add the red ball object to the balls array
    balls.push(redBall);
  }

  // Randomly place colored balls
  const colors = ['pink', 'black', 'yellow', 'green', 'brown', 'blue',];
  for (const color of colors) {
    // Variables to store the random x, y coordinates and a flag indicating a safe position
    let x, y, safeSpot;
    // Generate random x and y coordinates within the safe zone
    do {
      x = random(minX, maxX);
      y = random(minY, maxY);
      // Check if the generated position is safe (not occupied by existing balls)
      safeSpot = isSafePos(x, y, balls, ballDiameter);
    } while (!safeSpot); // Repeat if the position is not safe
    // Create a new colored ball object at the generated position
    let coloredBall = new Ball(x, y, ballDiameter / 2, color, 'colorBall');
    // Add the colored ball object to the balls array
    balls.push(coloredBall);
  }
}