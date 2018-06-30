
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

function detectCollision(needleArr, haystackArr){
	var collisionArr = [];	

	for (var index in needleArr){
		for (var counter in haystackArr){
			if (
			haystackArr[counter].x2 < needleArr[index].x1 ||  
			needleArr[index].x2 < haystackArr[counter].x1 ||
			haystackArr[counter].y2 < needleArr[index].y1 ||
			needleArr[index].y2 < haystackArr[counter].y1
			){
				console.log("hi");
				collisionArr.push(needleArr[index])
				break;
			}
		}
	}
	
	return collisionArr;
}

function detectCollisionSide (needleArr, haystackArr){
	let northSignal = false
	let southSignal = false
	let eastSignal = false
	let westSignal = false

	for (var index in needleArr){
		for (var counter in haystackArr){
			if ((isInRange(needleArr[index].x1, haystackArr[counter].x1, haystackArr[counter].x2) &&
			isInRange(needleArr[index].y1, (haystackArr[counter].y2 - 1), (haystackArr[counter].y2 + 1))) || 
			(isInRange(haystackArr[counter].x2, needleArr[index].x1, needleArr[index].x2) &&
			isInRange(needleArr[index].y1, (haystackArr[counter].y2 - 1), (haystackArr[counter].y2 + 1)))){
				northSignal = true
				if (needleArr[index].ySpeed < 0 ){
					needleArr[index].ySpeed = 0
				}
			}
			if ((isInRange(needleArr[index].x2, haystackArr[counter].x1, haystackArr[counter].x2) &&
			isInRange(needleArr[index].y2, (haystackArr[counter].y1 - 1), (haystackArr[counter].y1 + 1))) ||
			(isInRange(haystackArr[counter].x1, needleArr[index].x1, needleArr[index].x2) &&
			isInRange(needleArr[index].y2, (haystackArr[counter].y1 - 1), (haystackArr[counter].y1 + 1)))){
				southSignal = true
				if (needleArr[index].ySpeed > 0){
					needleArr[index].ySpeed = 0
				}
			}
			if ((isInRange(needleArr[index].y1, haystackArr[counter].y1, haystackArr[counter].y2) &&
			isInRange(needleArr[index].x1, (haystackArr[counter].x2 - 1), (haystackArr[counter].x2 + 1))) ||
			(isInRange(haystackArr[counter].y2, needleArr[index].y1, needleArr[index].y2) &&
			isInRange(needleArr[index].x1, (haystackArr[counter].x2 - 1), (haystackArr[counter].x2 + 1)))){
				westSignal = true
				if (needleArr[index].xSpeed < 0){
					needleArr[index].xSpeed = 0
				}
			}
			if ((isInRange(needleArr[index].y2, haystackArr[counter].y1, haystackArr[counter].y2) &&
			isInRange(needleArr[index].x2, (haystackArr[counter].x1 - 1), (haystackArr[counter].x1 + 1)))||
			(isInRange(haystackArr[counter].y1, needleArr[index].y1, needleArr[index].y2) &&
			isInRange(needleArr[index].x2, (haystackArr[counter].x1 - 1), (haystackArr[counter].x1 + 1)))){
				eastSignal = true
				if (needleArr[index].xSpeed > 0){
					needleArr[index].xSpeed = 0
				}
			}
		}

		needleArr[index].collisionDirectionNorth = northSignal;
		needleArr[index].collisionDirectionSouth = southSignal;
		needleArr[index].collisionDirectionEast = eastSignal;
		needleArr[index].collisionDirectionWest = westSignal;
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


