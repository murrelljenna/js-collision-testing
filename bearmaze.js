
// Refresh frame function (carries most other functions)

function refreshFrame(){

updatePosition(playerObj);
updatePosition(monsterObj);

detectCollisionSide(playerEntities, mapEntities);
detectCollisionSide(monsterEntities, mapEntities);

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

// Canvas Drawing & Collision Loop

var mapEntities = [];
var playerEntities = [];
var monsterEntities = [];

var playerObj = new Player (403, 403, 15, 15, playerEntities);
var monsterObj = new Monster (200, 200, 25, 25, monsterEntities);

randomLines(14, mapEntities);
drawMap(ctx, mapEntities)

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

