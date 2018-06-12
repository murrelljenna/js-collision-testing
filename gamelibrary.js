
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

// Pathfinding functions.

function playerDirection(x, y){

	if (y > playerPosY){
		playerDirectionNorth = true;
		playerDirectionSouth = false;
	} else if (y <= playerPosY){
		playerDirectionSouth = true;
		playerDirectionNorth = false;
	}

	if (x > playerPosX){
		playerDirectionWest = true;
		playerDirectionEast = false;
	}else if (x <= playerPosX){
		playerDirectionEast = true;
		playerDirectionWest = false;
	}

}	

function getPlayerLocation(){
	return {"x" : playerPosX, "y" : playerPosY}
}
function obstacleCheck(x, y){
	for (var counter in masterColArray){
		if (
		masterColArray[counter].x2 < x ||  
		x < masterColArray[counter].x1 ||
		masterColArray[counter].y2 < y ||
		y < masterColArray[counter].y1
		){
			return false
		}else{	
			return true
		}
	}
}
/*
function findPath(){
	
	pathFound = false
	let counter = 0		
	let closedQueue = []
	let openQueue = []
	let queuePriority = {}
	let cameFrom = []
	let target = getPlayerLocation()	

	let movementCost
	let totalMovementCost
		
	let neighbourTileNorth = {}
	let neighbourTileSouth = {}
	let neighbourTileEast = {}
	let neighbourTileWest = {}					

	closedQueue[counter] = {}	
	closedQueue[counter].x = mobX
	closedQueue[counter].y = mobY

	while (closedQueue.length < 100) {
		
		openQueue = []
		
		neighbourTileNorth = {}
		neighbourTileNorth.x = (closedQueue[counter].x)
		neighbourTileNorth.y = (closedQueue[counter].y - 1)
	
		console.log("blah")

		neighbourTileSouth = {}
		neighbourTileSouth.x = (closedQueue[counter].x)
		neighbourTileSouth.y = (closedQueue[counter].y + 1)
		
		neighbourtileEast = {}
		neighbourTileEast.x = (closedQueue[counter].x + 1)
		neighbourTileEast.y = (closedQueue[counter].y)

		neighbourtileWest = {}
		neighbourTileWest.x = (closedQueue[counter].x - 1)		
		neighbourTileWest.y = (closedQueue[counter].y)
		
		openQueue.push(neighbourTileNorth);
		openQueue.push(neighbourTileSouth);
		openQueue.push(neighbourTileEast);
		openQueue.push(neighbourTileWest);

		for (var index in openQueue){
			if (openQueue[index].x == target.x && openQueue[index].y == target.y){
				console.log("WINRAR")
				break;
			}
			if (obstacleCheck(openQueue[index].x, openQueue[index].y) !== true){

				console.log(closedQueue)
				closedQueue.push(openQueue[index])
			}	
		}

		pathFound = true;	
					
		counter += 1	
	}					
}

*/

function roombaMovement(movingEntity){

	if (movingEntity.collisionDirectionNorth === true && movingEntity.collisionDirectionWest === false && movingEntity.collisionDirectionEast === false){
		
		coinFlip = Math.floor(Math.random() * 2);
		if (coinFlip === 0){
			movingEntity.xSpeed = 2
		}else{
			movingEntity.xSpeed = 2
		}
	}

	if (movingEntity.collisionDirectionSouth === true && movingEntity.collisionDirectionWest === false && movingEntity.collisionDirectionEast === false){
		
		coinFlip = Math.floor(Math.random() * 2);
		if (coinFlip === 0){
			movingEntity.xSpeed = 2
		}else{
			movingEntity.xSpeed = 2
		}
	
	}

	if (movingEntity.collisionDirectionWest === true && movingEntity.collisionDirectionNorth === false && movingEntity.collisionDirectionSouth === false){
		
		coinFlip = Math.floor(Math.random() * 2);
		if (coinFlip === 0){
			movingEntity.ySpeed = 2
		}else{
			movingEntity.ySpeed = 2
		}
	}

	if (movingEntity.collisionDirectionEast === true && movingEntity.collisionDirectionNorth === false && movingEntity.collisionDirectionSouth === false){
		
		coinFlip = Math.floor(Math.random() * 2);
		if (coinFlip === 0){
			movingEntity.ySpeed = 2
		}else{
			movingEntity.ySpeed = 2
		}	
	}
}

// Outside canvas checks.

function outsideCanvas(movingEntity){
	if (
	movingEntity.x1 < 0 ||
	movingEntity.y1 < 0 ||
	movingEntity.x2 > canvasWidth ||
	movingEntity.y2 > canvasHeight
	){
		return true
	}else{
		return false
	}
}

// Collision detection functions

function detectCollision(){
	for (var counter in masterColArray){
		if (
		masterColArray[counter].x2 < playerObj.x1 ||  
		playerObj.x2 < masterColArray[counter].x1 ||
		masterColArray[counter].y2 < playerObj.y1 ||
		playerObj.y2 < masterColArray[counter].y1
		){
			return false
		}else{	
			return true
		}
	}
}

function collisionDetectDebug(counter){
	if (!(masterColArray[counter].x2 <= playerObj.x1)){
		console.log (counter + " [1]masterColArray[counter].x2 <= playerObj.x1 = false")
	}  
	if (!(playerObj.x2 <= masterColArray[counter].x1)){
		console.log (counter + " [2] playerObj.x2 <= masterColArray[counter].x1 = false")
	}
	if (!(masterColArray[counter].y2 <= playerObj.y1)){
		console.log (counter + " [3] masterColArray[counter].y2 <= playerObj.y1 = false")
	}
	if (!(playerObj.y2 <= masterColArray[counter].y1)){
		console.log (counter + " [4] playerObj.y2 <= masterColArray[counter].y1 = false")
	}
}

function detectCollisionSide(needleColArray){

	let northSignal = false
	let southSignal = false
	let eastSignal = false
	let westSignal = false

	for (var counter in masterColArray){
		
		if ((isInRange(needleColArray.x1, masterColArray[counter].x1, masterColArray[counter].x2) &&
		isInRange(needleColArray.y1, (masterColArray[counter].y2 - 1), (masterColArray[counter].y2 + 1))) || 
		(isInRange(masterColArray[counter].x2, needleColArray.x1, needleColArray.x2) &&
		isInRange(needleColArray.y1, (masterColArray[counter].y2 - 1), (masterColArray[counter].y2 + 1)))){
			northSignal = true
			if (needleColArray.ySpeed < 0 ){
				needleColArray.ySpeed = 0
			}
		}

		if ((isInRange(needleColArray.x2, masterColArray[counter].x1, masterColArray[counter].x2) &&
		isInRange(needleColArray.y2, (masterColArray[counter].y1 - 1), (masterColArray[counter].y1 + 1))) ||
		(isInRange(masterColArray[counter].x1, needleColArray.x1, needleColArray.x2) &&
		isInRange(needleColArray.y2, (masterColArray[counter].y1 - 1), (masterColArray[counter].y1 + 1)))){
			southSignal = true
			if (needleColArray.ySpeed > 0){
				needleColArray.ySpeed = 0
			}
		}

		if ((isInRange(needleColArray.y1, masterColArray[counter].y1, masterColArray[counter].y2) &&
		isInRange(needleColArray.x1, (masterColArray[counter].x2 - 1), (masterColArray[counter].x2 + 1))) ||
		(isInRange(masterColArray[counter].y2, needleColArray.y1, needleColArray.y2) &&
		isInRange(needleColArray.x1, (masterColArray[counter].x2 - 1), (masterColArray[counter].x2 + 1)))){
			westSignal = true
			if (needleColArray.xSpeed < 0){
				needleColArray.xSpeed = 0
			}
		}

		if ((isInRange(needleColArray.y2, masterColArray[counter].y1, masterColArray[counter].y2) &&
		isInRange(needleColArray.x2, (masterColArray[counter].x1 - 1), (masterColArray[counter].x1 + 1)))||
		(isInRange(masterColArray[counter].y1, needleColArray.y1, needleColArray.y2) &&
		isInRange(needleColArray.x2, (masterColArray[counter].x1 - 1), (masterColArray[counter].x1 + 1)))){
			eastSignal = true
			if (needleColArray.xSpeed > 0){
				needleColArray.xSpeed = 0
			}
		}
	}

needleColArray.collisionDirectionNorth = northSignal;
needleColArray.collisionDirectionSouth = southSignal;
needleColArray.collisionDirectionEast = eastSignal;
needleColArray.collisionDirectionWest = westSignal;
	
}

function masterColArrayDebug(){
	
	ctx.strokeStyle="#FF0000";
	for (index in masterColArray){
		ctx.moveTo((masterColArray[index].x1), (masterColArray[index].y1))
		ctx.lineTo((masterColArray[index].x2), (masterColArray[index].y2))
		ctx.stroke()
	}

}

function updatePosition(movingEntity){

	xClear = movingEntity.x1
	yClear = movingEntity.y1

	movingEntity.x1 += movingEntity.xSpeed;
	movingEntity.y1 += movingEntity.ySpeed;
	x2 = movingEntity.x1 + movingEntity.width
	y2 = movingEntity.y1 + movingEntity.height

	movingEntity.x2 = x2;
	movingEntity.y2 = y2;
	
	ctx2.clearRect(xClear, yClear, movingEntity.width, movingEntity.height);
	ctx2.fillRect(movingEntity.x1, movingEntity.y1, movingEntity.width, movingEntity.height);



}

// Canvas Drawing Functions

function drawLines(){

	for (counter = 0; counter < 14;){

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

}


