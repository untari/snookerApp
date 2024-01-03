// All global variables are declared in this file

// matter.js aliases for easy reference
let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

let engine;
let world;
let balls = [];
let cushions = [];

// Flag to check if the game has started
let selectedMode= false; // Flag to check if a mode has been selected
let cueBallLocated = false; // Flag to check if the cue ball has been placed
let cueBallPocketed = false; // Cueball pocketed
// Global variable for the cue ball
let cueBall; 
// Variables to track the drag start and end points
let dragStart = null;
let dragging = false;

// Define constants for the table and balls
const pixelsSize = 800 / 12; // Since the tblWidth is 800 pixels and the table length is 12 feet
const tblWidth = 12 * pixelsSize; // This would now be the total canvas width
const tblHeight = tblWidth / 2; // This would now be the total canvas height, as the table is 6 feet in width
const widthBorder = pixelsSize / 5; // Assuming a 6-inch border for the table
const ballDiameter = tblHeight / 36; // Diameter of a snooker ball
const pocketDiameter = ballDiameter * 2.7; // Diameter of the pockets
// Define the pocket cover size and corner radius
const pocketPaddSize = pocketDiameter/1.5; // The size can be the same as the pocket diameter
const xCenterPocket = tblWidth / 2 - pocketPaddSize / 2;

const cushionDepth = 8; // How far the cushion extends onto the table
const halfTable = tblHeight/2;
// Baulk line, 1/5th from the left side of the table
const baulkLineX = tblWidth / 5;
// The D-line, a semi-circle on the baulk line
const dLineDiameter = tblHeight / 3; // The diameter is one third of the table height
const dLineRadius = dLineDiameter / 2; // Radius is half the diameter
const dLineCenterX = tblWidth / 5; // The center of the D is 1/5th into the table's width
const dLineCenterY = tblHeight / 2; // The center of the D is at half the table's height


// Define a maximum power level for the shot
const MAX_LINE_LENGTH = tblWidth / 5; // The maximum length of the aiming line
const MAX_POWER = 10; // Adjust this value as needed for the maximum power
// Constants for maximum force
const MAX_FORCE_VALUE = 0.2; // Adjust as necessary to prevent tunneling

// Pocket positions
const pockets = [
    { x: widthBorder, y: widthBorder }, // Top-left pocket
    { x: tblWidth - widthBorder, y: widthBorder }, // Top-right pocket
    { x: widthBorder, y: tblHeight - widthBorder }, // Bottom-left pocket
    { x: tblWidth - widthBorder, y: tblHeight - widthBorder }, // Bottom-right pocket
    { x: tblWidth / 2, y: widthBorder }, // Top-middle pocket
    { x: tblWidth / 2, y: tblHeight - widthBorder }, // Bottom-middle pocket
  ];

// Calculate positions based on table proportions for coloured balls
dLineY = tblHeight/3

// Default positions for the colored balls
const coloredBallPos = {
    yellow: { x: tblWidth / 5, y: dLineY*2 },
    green: { x: tblWidth / 5, y: dLineY },
    brown: { x: tblWidth / 5, y: halfTable },
    blue: { x: tblWidth / 2, y: halfTable },
    pink: { x: (((tblWidth / 5) * 4)-(ballDiameter * 4) - 2) - ballDiameter -1, y: halfTable },
    black: { x: tblWidth - (tblWidth / 11), y: halfTable }
  };

// Keep track of colorballs pocketed variable
let multipleColoredBallsPotted = 0;
let displayErrorMessage= false;

let extremeModeFlag = false;

let ballLostAlert= false;
let errorMessageStart = 0;
let errorMessageDuration = 2000; // Duration to display the message in milliseconds

let nextHoleTime = 0;
let holeInterval = 5000; // New hole every 5 seconds

// Global variable to track if Extreme Mode instructions should be displayed
let showExtremeModeInstructions = false;

let collisionMessage = "";
let collisionMessageTime = 0;
const collisionMessageDuration = 2000; // 2 seconds to display message