
// Refresh frame function (carries most other functions)

function refreshFrame(){

updatePosition(playerObj);
updatePosition(monsterObj);

detectCollisionSide(playerObj);
detectCollisionSide(monsterObj);

if (outsideCanvas(playerObj)){
	drawLines()
}

roombaMovement(monsterObj);

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

var lineCount = masterColArray.length;
drawLines()


// Player starting placement

var playerObj = {
	"x1" : 403, 
	"y1" : 403, 
	"width" : 15, 
	"height" : 15, 
	"xSpeed" : 0, 
	"ySpeed" : 0,
	"collisionDirectionNorth" : false,
	"collisionDirectionSouth" : false,
	"collisionDirectionEast" : false,
	"collisionDirectionWest" : false
};

ctx2.fillRect(playerObj.x1, playerObj.y1, playerObj.width, playerObj.height);


// Monster starting placement

var monsterObj = {
	"x1" : 200, 
	"y1" : 200, 
	"width" : 25, 
	"height" : 25, 
	"xSpeed" : 1, 
	"ySpeed" : 1,
	"collisionDirectionNorth" : false,
	"collisionDirectionSouth" : false,
	"collisionDirectionEast" : false,
	"collisionDirectionWest" : false
}

ctx2.fillStyle="#FF0000";
ctx2.fillRect(monsterObj.x1, monsterObj.y1, monsterObj.width, monsterObj.height);

var mobContact = false;
var pathFound = false;

var playerDirectionNorth = false;
var playerDirectionSouth = false;
var playerDirectionEast = false;
var playerDirectionWest = false;

// WASD keys event listener

document.addEventListener("keydown", function(event) {
	if ((event.code == 'KeyW') && (playerObj.collisionDirectionNorth != true))  {
		playerObj.ySpeed = -2;
	} else if ((event.code == 'KeyS') && (playerObj.collisionDirectionSouth != true)) {
		playerObj.ySpeed = 2;
	} else if ((event.code == 'KeyA') && (playerObj.collisionDirectionWest != true)){
		playerObj.xSpeed = -2;
	} else if ((event.code == 'KeyD') && (playerObj.collisionDirectionEast != true)){
		playerObj.xSpeed = 2;
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
		playerObj.ySpeed = 0;
	} else if (event.code == 'KeyS') {
		playerObj.ySpeed = 0;
	} else if (event.code == 'KeyA'){
		playerObj.xSpeed = 0;
	} else if (event.code == 'KeyD'){
		playerObj.xSpeed = 0;
	}

}
)


refreshFrame();

