
/*
	General Functions
*/

function pickRange (start, end) {
	return Math.floor(Math.random() * ((end - start + 1)) + start)
}

function isInRange (needle, min, max) {
	if ((needle >= min) && (needle <= max)){	
		return true
	}else{
		return false
	}
}

function range (startAt, size) {
	return [...Array(size).keys()].map(i => i + startAt);
}

/*
	Object Constructor Functions
*/

function MapEntity (x1, y1, width, height, arr) {
	this.x1 = x1
	this.y1 = y1
	this.width = width
	this.height = height
	this.x2 = x1 + width
	this.y2 = y1 + height
	arr = arr || 0	

	if (arr !== 0) {
		arr.push(this)
	}
}

function Player (x1, y1, width, height, arr) {
	this.x1 = x1
	this.y1 = y1
	this.width = width
	this.height = height
	this.xSpeed = 0
	this.ySpeed = 0
	this.collisionNorth = false
	this.collisionSouth = false
	this.collisionEast = false
	this.collisionWest = false
	arr = arr || 0

	if (arr !== 0) {
		arr.push(this)
	}
}

function Monster (x1, y1, width, height, arr) {
	this.x1 = x1
	this.y1 = y1
	this.width = width
	this.height = height
	this.xSpeed = 0
	this.ySpeed = 0
	this.collisionNorth = false
	this.collisionSouth = false
	this.collisionEast = false
	this.collisionWest = false
	arr = arr || 0

	if (arr !== 0) {
		arr.push(this)
	}
}

/*
	Pathfinding functions.
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

function detectCollisionSide(needleArr, haystackArr){
	let northSignal = false
	let southSignal = false
	let eastSignal = false
	let westSignal = false

	for (var counter in haystackArr){
		if ((isInRange(needleArr.x1, haystackArr[counter].x1, haystackArr[counter].x2) &&
		isInRange(needleArr.y1, (haystackArr[counter].y2 - 1), (haystackArr[counter].y2 + 1))) || 
		(isInRange(haystackArr[counter].x2, needleArr.x1, needleArr.x2) &&
		isInRange(needleArr.y1, (haystackArr[counter].y2 - 1), (haystackArr[counter].y2 + 1)))){
			northSignal = true
			if (needleArr.ySpeed < 0 ){
				needleArr.ySpeed = 0
			}
		}
		if ((isInRange(needleArr.x2, haystackArr[counter].x1, haystackArr[counter].x2) &&
		isInRange(needleArr.y2, (haystackArr[counter].y1 - 1), (haystackArr[counter].y1 + 1))) ||
		(isInRange(haystackArr[counter].x1, needleArr.x1, needleArr.x2) &&
		isInRange(needleArr.y2, (haystackArr[counter].y1 - 1), (haystackArr[counter].y1 + 1)))){
			southSignal = true
			if (needleArr.ySpeed > 0){
				needleArr.ySpeed = 0
			}
		}
		if ((isInRange(needleArr.y1, haystackArr[counter].y1, haystackArr[counter].y2) &&
		isInRange(needleArr.x1, (haystackArr[counter].x2 - 1), (haystackArr[counter].x2 + 1))) ||
		(isInRange(haystackArr[counter].y2, needleArr.y1, needleArr.y2) &&
		isInRange(needleArr.x1, (haystackArr[counter].x2 - 1), (haystackArr[counter].x2 + 1)))){
			westSignal = true
			if (needleArr.xSpeed < 0){
				needleArr.xSpeed = 0
			}
		}
		if ((isInRange(needleArr.y2, haystackArr[counter].y1, haystackArr[counter].y2) &&
		isInRange(needleArr.x2, (haystackArr[counter].x1 - 1), (haystackArr[counter].x1 + 1)))||
		(isInRange(haystackArr[counter].y1, needleArr.y1, needleArr.y2) &&
		isInRange(needleArr.x2, (haystackArr[counter].x1 - 1), (haystackArr[counter].x1 + 1)))){
			eastSignal = true
			if (needleArr.xSpeed > 0){
				needleArr.xSpeed = 0
			}
		}
	}

	needleArr.collisionDirectionNorth = northSignal;
	needleArr.collisionDirectionSouth = southSignal;
	needleArr.collisionDirectionEast = eastSignal;
	needleArr.collisionDirectionWest = westSignal;
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

/*
	Map Object Generation
*/

function randomLines(count, arr){
	for (counter = 0; counter < count;){
		x1 = pickRange(0, canvasWidth);
		y1 = pickRange(0, canvasHeight);
		
		coinFlip = Math.floor(Math.random() * 2);
		if (coinFlip === 0){
			width = pickRange(0, canvasWidth);
			height = 1;		
		}				
		else if (coinFlip === 1){
			width = 1;
			height = pickRange(0, canvasHeight);
		}
		
		new MapEntity (x1, y1, width, height, arr);	
		counter += 1
	}

	return arr
}

// Canvas Drawing Functions

function drawMap(canvas, arr){
	for (index in arr){
		x1 = arr[index].x1;
		y1 = arr[index].y1;
		width = arr[index].width;
		height = arr[index].height;

		canvas.fillRect(x1, y1, width, height);
	} 
}


