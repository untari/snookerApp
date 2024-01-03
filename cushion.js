function Cushion() {
    // Draw the cushions
    // Set the color of the cushions to dark green
    fill(51, 97, 24, 255);
  
    // Disable stroke drawing
    noStroke();
  
    // Calculate the x-coordinate of the center of the pocket
    const xCenterPocket = tblWidth / 2 - pocketPaddSize / 2;
  
    // Draw the top left cushion
    // Draw a quad with the specified coordinates and fill color
    quad(pocketPaddSize, widthBorder, // x1, y1
      xCenterPocket, widthBorder, // x2, y2
      xCenterPocket - cushionDepth, widthBorder + cushionDepth, // x3, y3
      pocketPaddSize + cushionDepth+8, widthBorder + cushionDepth); // x4, y4
  
    // Draw the top right cushion
    // Draw a quad with the specified coordinates and fill color
    quad(xCenterPocket+pocketPaddSize, widthBorder, // x1, y1
      tblWidth-pocketPaddSize, widthBorder,// x2, y2
      (tblWidth-pocketPaddSize) - cushionDepth-8, widthBorder + cushionDepth, // x3, y3
      xCenterPocket+pocketPaddSize + cushionDepth, widthBorder + cushionDepth); // x4, y4
  
    // Draw the bottom left cushion
    // Draw a quad with the specified coordinates and fill color
    quad(pocketPaddSize, tblHeight - widthBorder, // x1, y1
      xCenterPocket, tblHeight - widthBorder, // x2, y2
      xCenterPocket - cushionDepth, tblHeight - (widthBorder + cushionDepth), // x3, y3
      pocketPaddSize + cushionDepth+8, tblHeight - (widthBorder + cushionDepth)); // x4, y4
  
    // Draw the bottom right cushion
    // Draw a quad with the specified coordinates and fill color
    quad(xCenterPocket + pocketPaddSize, tblHeight - widthBorder,
      tblWidth - pocketPaddSize, tblHeight - widthBorder,
      tblWidth - (pocketPaddSize + cushionDepth+8), tblHeight - (widthBorder + cushionDepth),
      xCenterPocket + pocketPaddSize + cushionDepth, tblHeight - (widthBorder + cushionDepth));
  
    // Draw the left cushion
    // Draw a quad with the specified coordinates and fill color
    quad(widthBorder, pocketPaddSize,
      widthBorder, tblHeight - pocketPaddSize,
      widthBorder + cushionDepth, (tblHeight - pocketPaddSize) - cushionDepth-8,
      widthBorder + cushionDepth, pocketPaddSize + cushionDepth+8);
  
    // Draw the right cushion
    // Draw a quad with the specified coordinates and fill color
    quad(tblWidth - widthBorder, pocketPaddSize,
      tblWidth - widthBorder, tblHeight - pocketPaddSize,
      tblWidth - (widthBorder + cushionDepth), (tblHeight - pocketPaddSize) - cushionDepth-8,
      tblWidth - (widthBorder + cushionDepth), pocketPaddSize + cushionDepth+8);
  }
  
  function cushionConstraints() {
    // Define properties for the cushions
    // Define the cushion properties: static (cannot move), bouncy (restitution = 0.5), friction (0.1), label ('cushion')
    const cushionOptions = {
      isStatic: true, // Static object
      restitution: 0.5, // Elasticity (bounciness) of the cushion
      friction: 0.1, // Resistance to movement
      label: 'cushion' // Label to identify as cushion for collision detection
    };
  
    // Top left cushion vertices based on quad coordinates
    // Create a Matter.js body for the top left cushion using the specified coordinates, options, and add it to the world
    let leftTopCushionVertices = [
      { x: 0, y: 0 }, // Top left corner
      { x: tblWidth/2, y: 0 }, // Top right corner
      { x: xCenterPocket - cushionDepth, y: widthBorder + cushionDepth }, // Bottom left corner
      { x: pocketPaddSize + cushionDepth+8, y: widthBorder + cushionDepth } // Bottom right corner
    ];  
    
    // Create a Matter.js body for the top left cushion
    let leftTopCushionBody = Bodies.fromVertices(
        ((pocketPaddSize / 2) + tblWidth / 2) / 2, // X-coordinate
        (widthBorder + cushionDepth) / 2, // Y-coordinate
        [leftTopCushionVertices], // Cushion vertices array
        cushionOptions, // Cushion options object
        true // Add the cushion to the world
    );

    // Top right cushion vertices
    let rightTopCushionVertices = [
        { x: tblWidth / 2, y: 0 }, // Top left corner
        { x: tblWidth - (cushionDepth * 2), y: 0 }, // Top right corner
        { x: (tblWidth - pocketPaddSize) - cushionDepth - 8, y: widthBorder + cushionDepth }, // Bottom left corner
        { x: xCenterPocket + pocketPaddSize + cushionDepth, y: widthBorder + cushionDepth } // Bottom right corner
    ];
    
    let rightTopCushionBody = Bodies.fromVertices(
        (tblWidth / 4) * 3, // Coordinates of the center of the cushion
        (widthBorder + cushionDepth) / 2, // Coordinates of the center of the cushion
        [rightTopCushionVertices], // Cushion vertices
        cushionOptions, // Cushion options
        true // Add the cushion to the world
    );
    
    // Bottom left cushion vertices
    let bottomLeftCushionVertices = [
        { x: cushionDepth * 2, y: tblHeight }, // Top left corner
        { x: tblWidth / 2 - 5, y: tblHeight }, // Top right corner
        { x: xCenterPocket - cushionDepth, y: tblHeight - (widthBorder + cushionDepth) }, // Bottom left corner
        { x: pocketPaddSize + cushionDepth + 8, y: tblHeight - (widthBorder + cushionDepth) } // Bottom right corner
    ];
    
    let leftBottomCushionBody = Bodies.fromVertices(
        (tblWidth / 4), // Coordinates of the center of the cushion
        tblHeight - ((widthBorder + cushionDepth) / 2), // Coordinates of the center of the cushion
        [bottomLeftCushionVertices], // Cushion vertices
        cushionOptions, // Cushion options
        true // Add the cushion to the world
    );
    
    // Bottom right cushion vertices
    let bottomRightCushionVertices = [
        { x: tblWidth / 2 + 5, y: tblHeight }, // Top left corner
        { x: tblWidth - (cushionDepth * 2), y: tblHeight }, // Top right corner
        { x: tblWidth - pocketPaddSize - cushionDepth - 8, y: tblHeight - (widthBorder + cushionDepth) }, // Bottom left corner
        { x: xCenterPocket + pocketPaddSize + cushionDepth, y: tblHeight - (widthBorder + cushionDepth) } // Bottom right corner
    ];
    
    let rightBottomCushionBody = Bodies.fromVertices(
        (tblWidth / 4) * 3, // Coordinates of the center of the cushion
        tblHeight - ((widthBorder + cushionDepth) / 2), // Coordinates of the center of the cushion
        [bottomRightCushionVertices], // Cushion vertices
        cushionOptions, // Cushion options
        true // Add the cushion to the world
    );
    
    // Left cushion vertices
    let leftCushionVertices = [
        { x: 0, y: 0 }, // Top left corner
        { x: 0, y: tblHeight - (cushionDepth * 2) }, // Bottom left corner
        { x: widthBorder + cushionDepth, y: (tblHeight - pocketPaddSize) - cushionDepth - 8 }, // Top right corner
        { x: widthBorder + cushionDepth, y: pocketPaddSize + cushionDepth + 8 } // Bottom right corner
    ];
    
    let leftCushionBody = Bodies.fromVertices(
        (widthBorder + cushionDepth) / 2, // Coordinates of the center of the cushion
        tblHeight / 2, // Coordinates of the center of the cushion
        [leftCushionVertices], // Cushion vertices
        cushionOptions, // Cushion options
        true // Add the cushion to the world
    );
    
    // Right cushion vertices
    let rightCushionVertices = [
        { x: tblWidth, y: cushionDepth * 2 }, // Top left corner
        { x: tblWidth, y: tblHeight - (cushionDepth * 2) }, // Bottom left corner
        { x: tblWidth - (widthBorder + cushionDepth), y: (tblHeight - pocketPaddSize) - cushionDepth - 8 }, // Top right corner
        { x: tblWidth - (widthBorder + cushionDepth), y: pocketPaddSize + cushionDepth + 8 } // Bottom right corner
    ];

    // Create the right cushion body
    let rightCushionBody = Bodies.fromVertices(
        tblWidth - ((widthBorder + cushionDepth) / 2),  // Coordinates of the center of the cushion
        tblHeight / 2, // Coordinates of the center of the cushion
        [rightCushionVertices], // Cushion vertices
        cushionOptions, // Cushion options
        true // Add the cushion to the world
    );

    // Add the cushion to the world
    World.add(world, [
        leftTopCushionBody, 
        rightTopCushionBody, 
        leftBottomCushionBody, 
        rightBottomCushionBody, 
        leftCushionBody, 
        rightCushionBody
    ]);
}