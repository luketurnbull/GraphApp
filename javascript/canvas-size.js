/* 

	Finding and setting graph attributes according to the users window length

*/

// Find canvas size, and set appropriate settings to the axes object
function canvasWidth(){
	// Set width and height of canvas
	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Change scale of graph to size of window
	if (canvas.width < 400 && canvas.height < 400){
		axes.scale = 20;
	} else if (canvas.width < 800 && canvas.height < 800) {
		axes.scale = 30;
	} else {
		axes.scale = 40;
	}
	if (null === canvas || !canvas.getContext) return;
	// x0 pixels from left to x=0
	axes.x0 = canvas.width / 2;
	// y0 pixels from top to y=0
	axes.y0 = canvas.height / 2;
	//
	axes.doNegativeX = true;
}

function findPointX() {
	var point;
	for(var x = -20; x < 21; x++){
		if(x === 0) {
			point = axes.x0;
		} else {
			point = axes.x0 + (x * axes.scale);
		}
		pointsX.push(point);
	}
}

function findPointY() {
	var point;
	for(var y = -20; y < 21; y++){
		if(y === 0) {
			point = axes.y0;
		} else {
			point = axes.y0 + (y * axes.scale);
		}
		pointsY.push(point);
	}
}