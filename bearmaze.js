function pickRange(start, end){
	return Math.floor(Math.random() * ((end - start + 1)) + start)
}

function isInRange(needle, min, max){
	if ((needle >= min) && (needle <= max)){
		return true
	}else{
		return false
	}
}

function range(startAt, size) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function playerDirection(x, y){

	if (y < yPosControl){
		playerDirectionNorth = true;
		playerDirectionSouth = false;
	} else if (y >= yPosControl){
		playerDirectionSouth = true;
		playerDirectionNorth = false;
	}

	if (x < xPosControl){
		playerDirectionWest = true;
		playerDirectionEast = false;
	}else if (x >= xPosControl){
		playerDirectionEast = true;
		playerDirectionWest = false;
	}

}	

/*

function findPath(){
	
	pathFound = false
	let counter = 0		
	let pathQueue = []
	let neighbourTile = []
	let pathQueuePriority = {}
	let movementCost
	let totalMovementCost
	
	pathQueue[counter] = {}	
	pathQueue[counter].x = mobX
	pathQueue[counter].y = mobY

	while (pathQueue.length > 0) {
		
		
		neighbourTile = (pathQueue[0])			
								

		pathFound = true;	
					
		counter += 1	
	}					
}

*/

// Collision detection functions

function detectCollision(){
	for (var counter in masterColArray){
		if (
		masterColArray[counter].x2 < playerColArray.x1 ||  
		playerColArray.x2 < masterColArray[counter].x1 ||
		masterColArray[counter].y2 < playerColArray.y1 ||
		playerColArray.y2 < masterColArray[counter].y1
		){
			return false
		}else{	
			return true
		}
	}
}

function collisionDetectDebug(counter){
	if (!(masterColArray[counter].x2 <= playerColArray.x1)){
		console.log (counter + " [1]masterColArray[counter].x2 <= playerColArray.x1 = false")
	}  
	if (!(playerColArray.x2 <= masterColArray[counter].x1)){
		console.log (counter + " [2] playerColArray.x2 <= masterColArray[counter].x1 = false")
	}
	if (!(masterColArray[counter].y2 <= playerColArray.y1)){
		console.log (counter + " [3] masterColArray[counter].y2 <= playerColArray.y1 = false")
	}
	if (!(playerColArray.y2 <= masterColArray[counter].y1)){
		console.log (counter + " [4] playerColArray.y2 <= masterColArray[counter].y1 = false")
	}
}

function detectCollisionSide(){

	let northSignal = false
	let southSignal = false
	let eastSignal = false
	let westSignal = false

	for (var counter in masterColArray){
		
		if ((isInRange(playerColArray.x1, masterColArray[counter].x1, masterColArray[counter].x2) &&
		isInRange(playerColArray.y1, (masterColArray[counter].y2 - 1), (masterColArray[counter].y2 + 1))) || 
		(isInRange(masterColArray[counter].x2, playerColArray.x1, playerColArray.x2) &&
		isInRange(playerColArray.y1, (masterColArray[counter].y2 - 1), (masterColArray[counter].y2 + 1)))){
			northSignal = true
			if (ySpeed < 0 ){
				ySpeed = 0
			}
		}

		if ((isInRange(playerColArray.x2, masterColArray[counter].x1, masterColArray[counter].x2) &&
		isInRange(playerColArray.y2, (masterColArray[counter].y1 - 1), (masterColArray[counter].y1 + 1))) ||
		(isInRange(masterColArray[counter].x1, playerColArray.x1, playerColArray.x2) &&
		isInRange(playerColArray.y2, (masterColArray[counter].y1 - 1), (masterColArray[counter].y1 + 1)))){
			southSignal = true
			if (ySpeed > 0){
				ySpeed = 0
			}
		}

		if ((isInRange(playerColArray.y1, masterColArray[counter].y1, masterColArray[counter].y2) &&
		isInRange(playerColArray.x1, (masterColArray[counter].x2 - 1), (masterColArray[counter].x2 + 1))) ||
		(isInRange(masterColArray[counter].y2, playerColArray.y1, playerColArray.y2) &&
		isInRange(playerColArray.x1, (masterColArray[counter].x2 - 1), (masterColArray[counter].x2 + 1)))){
			westSignal = true
			if (xSpeed < 0){
				xSpeed = 0
			}
		}

		if ((isInRange(playerColArray.y2, masterColArray[counter].y1, masterColArray[counter].y2) &&
		isInRange(playerColArray.x2, (masterColArray[counter].x1 - 1), (masterColArray[counter].x1 + 1)))||
		(isInRange(masterColArray[counter].y1, playerColArray.y1, playerColArray.y2) &&
		isInRange(playerColArray.x2, (masterColArray[counter].x1 - 1), (masterColArray[counter].x1 + 1)))){
			eastSignal = true
			if (xSpeed > 0){
				xSpeed = 0
			}
		}
	}

collisionDirectionNorth = northSignal;
collisionDirectionSouth = southSignal;
collisionDirectionEast = eastSignal;
collisionDirectionWest = westSignal;
	
}

function masterColArrayDebug(){
	
	ctx.strokeStyle="#FF0000";
	for (index in masterColArray){
		ctx.moveTo((masterColArray[index].x1), (masterColArray[index].y1))
		ctx.lineTo((masterColArray[index].x2), (masterColArray[index].y2))
		ctx.stroke()
	}

}

// Refresh frame function (carries most other functions)

function refreshFrame(){

xPosClear = xPosControl
yPosClear = yPosControl

xPosControl += xSpeed;
yPosControl += ySpeed;
xPosControl2 = xPosControl + 15
yPosControl2 = yPosControl + 15

ctx2.clearRect(xPosClear, yPosClear, 15, 15);
ctx2.fillRect(xPosControl, yPosControl, 15, 15);
ctx2.fillRect(xPosControl, yPosControl, 15, 15);

playerColArray.x1 = xPosControl;
playerColArray.y1 = yPosControl;
playerColArray.x2 = xPosControl2;
playerColArray.y2 = yPosControl2;

detectCollisionSide();

requestAnimationFrame(refreshFrame);


}


// Canvas Setup

var canvas = document.getElementById("layerOne");
var ctx = canvas.getContext("2d");
var canvasHeight = canvas.height;
var canvasWidth = canvas.width;

var canvas2 = document.getElementById("layerTwo");
var ctx2 = canvas2.getContext("2d");

// Canvas Drawing & Collision Loop Variable Declarations

var compLineCounter = 0;
var coinFlip;
var xCoord;
var yCoord;
var x1
var y1
var x2
var y2
var masterColArray = [];

// Canvas Drawing & Collision Loop

for (counter = 0; counter < 7;){

	xCoord = pickRange(0, canvasWidth);
	yCoord = pickRange(0, canvasHeight);

	ctx.beginPath();
	ctx.moveTo(xCoord, yCoord);
	while (pickRange(0, 1) === 0){	

		x1 = xCoord;
		y1 = yCoord;

		coinFlip = Math.floor(Math.random() * 2);
		if (coinFlip === 0){
			xCoord = pickRange(x1, canvasWidth);
		}else{
			yCoord = pickRange(y1, canvasHeight);
		}
		ctx.lineTo(xCoord, yCoord);
		

		// Ending coordinate capture (for collision array)

		
		x2 = xCoord
		y2 = yCoord

		masterColArray[counter] = {};;
		masterColArray[counter].x1 = x1;
		masterColArray[counter].y1 = y1;
		masterColArray[counter].x2 = x2;
		masterColArray[counter].y2 = y2;


		counter++ 
	}
	ctx.stroke();
}


var lineCount = masterColArray.length;

// Player starting placement

var yPosControl = 403;
var xPosControl = 403;
var ySpeed = 0;
var xSpeed = 0;
var playerColArray = {};

ctx2.fillRect(xPosControl, yPosControl, 15, 15);

var collisionDirectionNorth = false;
var collisionDirectionSouth = false;
var collisionDirectionEast = false;
var collisionDirectionWest = false;

// Monster starting placement

var mobY = 200;
var mobX = 200;

ctx.fillStyle="#FF0000";
ctx.fillRect(mobY, mobX, 25, 25);	

var mobContact = false;
var pathFound = false;

var playerDirectionNorth = false;
var playerDirectionSouth = false;
var playerDirectionEast = false;
var palyerDirectionWest = false;

// WASD keys event listener

document.addEventListener("keydown", function(event) {
	if ((event.code == 'KeyW') && (collisionDirectionNorth != true))  {
		ySpeed = -2;
	} else if ((event.code == 'KeyS') && (collisionDirectionSouth != true)) {
		ySpeed = 2;
	} else if ((event.code == 'KeyA') && (collisionDirectionWest != true)){
		xSpeed = -2;
	} else if ((event.code == 'KeyD') && (collisionDirectionEast != true)){
		xSpeed = 2;
	} else if (event.code == 'KeyX'){
		
		for (var counter in masterColArray){
			collisionDetectDebug(counter);
		}

	} else if (event.code == 'KeyC'){
		masterColArrayDebug();
	} 
})

document.addEventListener("keyup", function(event) {
	if (event.code == 'KeyW') {
		ySpeed = 0;
	} else if (event.code == 'KeyS') {
		ySpeed = 0;
	} else if (event.code == 'KeyA'){
		xSpeed = 0;
	} else if (event.code == 'KeyD'){
		xSpeed = 0;
	}

}
)


refreshFrame();

