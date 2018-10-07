// Refresh frame function (carries most other functions)

function refreshFrame(){

updatePosition(playerObj);
updatePosition(monsterObj);

if (isColliding(playerEntities, mapEntities).length > 0){
	detectCollisionSide(isColliding(playerEntities, mapEntities), mapEntities);
}else{
	clearCollision(playerEntities);
}

if (isColliding(monsterEntities, mapEntities).length > 0){
	detectCollisionSide(isColliding(monsterEntities, mapEntities), mapEntities);
}else{
	clearCollision(monsterEntities);
}

if (isColliding(playerEntities, monsterEntities).length > 0){
	for (index in isColliding(playerEntities, monsterEntities)){
		let entRef = isColliding(playerEntities, monsterEntities)[index];
		let x1 = entRef.x1
		let y1 = entRef.y1
		
		ctx2.clearRect(x1, y1, entRef.width, entRef.height);
		entRef.x1 = 403;
		entRef.y1 = 403;
		
		entRef.lives -= 1
		if (entRef.lives <= 0){
			ctx.clearRect(0, 0, canvasHeight, canvasWidth);
			ctx2.clearRect(0, 0, canvasHeight, canvasWidth);
			ctx.fillText("Game Over", 403, 403);
		}
	}
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

var wMapBarrier = new MapEntity (0, 0, 0, canvasHeight, mapEntities);
var eMapBarrier = new MapEntity (canvasWidth, 0, 0, canvasHeight, mapEntities);
var nMapBarrier = new MapEntity (0, 0, canvasWidth, 0, mapEntities);
var sMapBarrier = new MapEntity (0, canvasHeight, canvasWidth, 0, mapEntities);

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
