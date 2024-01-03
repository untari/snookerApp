class Ball {
  // Constructor for the Ball class
  constructor(x, y, radius, color, label) {
    // Define the properties of the Ball
    this.x = x; // X coordinate of the ball
    this.y = y; // Y coordinate of the ball
    this.radius = radius; // Radius of the ball
    this.color = color; // Color of the ball

    // Create the ball as a Matter.js body
    this.body = Bodies.circle(x, y, radius, { // Create a circle-shaped body
      restitution: 0.9, // High restitution makes the ball bouncy (0-1)
      friction: 0.005, // Low friction to slide easily (0-1)
      density: 0.05, // Density can affect the mass of the ball (kg/m^3)
      label: label || 'ball' // Label helps with collision filtering (optional)
    });

    // Add the body to the Matter.js world
    World.add(world, this.body);
  }

  // Method to draw the Ball
  show() {
    const pos = this.body.position; // Get the position of the ball
    const angle = this.body.angle; // Get the angle of the ball

    push(); // Push the current drawing state to the stack
    translate(pos.x, pos.y); // Translate to the position of the ball
    rotate(angle); // Rotate to the angle of the ball

    // Drawing the ball
    stroke(0); // Black stroke for the contour line
    strokeWeight(1); // Set stroke weight to 1 pixel
    fill(this.color); // Set fill color to the ball's color
    ellipse(0, 0, this.radius * 2); // Draw the ball

    // Adding light reflection
    let reflectionSize = this.radius / 4; // Radius of the reflection
    fill(255, 255, 255, 128); // Semi-transparent white fill color
    noStroke(); // No stroke for the reflection
    ellipse(this.radius / 2, -this.radius / 2, reflectionSize, reflectionSize); // Draw the reflection

    pop(); // Undo the translation and rotation, restoring the original drawing state
  }
}