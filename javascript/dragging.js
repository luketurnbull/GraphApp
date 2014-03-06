/*

	Function to allow user inputs for both dragging with mouse and touch input.

*/

// Set points to point object
var Point = function (x, y) {
    this.x = x;
    this.y = y;
    return this;
}
// Set attributes to circle objects
var Circle = function (point, radius, colour, size) {
    this.point = point;
    this.radius = radius;
    this.colour = colour;
    this.size = size;
    this.isInside = function (pt) {
        return Math.pow(pt.x - point.x, 2) + Math.pow(pt.y - point.y, 2) <
                                                          Math.pow(radius, 4); 
    };
    return this;
}
// This is the function that runs once the event listener for mousedown is done
function startDragging(e) {
	// Find point of where the mouse has clicked
    var p = new Point(mouseX(e), mouseY(e));
    // Check to see what dot has been pressed
    if(type === "linear"){
    	if(circle_m.isInside(p)) {
	        deltaCenter = new Point(p.x - circle_m.point.x, p.y - circle_m.point.y);
	        dragging = circle_m;
	    }
	    if(circle_c.isInside(p)) {
	    	deltaCenter = new Point(p.x - circle_c.point.x, p.y - circle_c.point.y);
	    	dragging = circle_c;
	    }
    } else if(type === "quadratic") {
    	if(circle_x1.isInside(p)) {
	        deltaCenter = new Point(p.x - circle_x1.point.x, p.y - circle_x1.point.y);
	        dragging = circle_x1;
	    }
	    if(circle_x2.isInside(p)) {
	    	deltaCenter = new Point(p.x - circle_x2.point.x, p.y - circle_x2.point.y);
	    	dragging = circle_x2;
	    }
	}
    e.preventDefault(); 
}
// This is the function that is triggered when the mousemoves
function drag(e) {
	// check to see if the dragging variable is defined
	if(dragging != undefined) {
		if(type === "linear"){
			if (dragging === circle_c){
				dragging.point.x = axes.x0;
			} else {
				dragging.point.x = (mouseX(e) - deltaCenter.x);
			}
	        dragging.point.y = (mouseY(e) - deltaCenter.y);
	        equations[0].c = -(axes.y0 - circle_c.point.y)/axes.scale;
			equations[0].findNewPoint((axes.x0 - circle_m.point.x)/axes.scale, (axes.y0 - circle_m.point.y)/axes.scale);
	        drawGraph();
	        dragging.colour = "green";
			drawEquations();
			drawCircle(circle_m);
	        drawCircle(circle_c);
		} else {
			dragging.point.x = (mouseX(e) - deltaCenter.x);
	        dragging.point.y = axes.y0;
	        equations[0].new_x1 = (axes.x0 - circle_x1.point.x)/axes.scale;
	        equations[0].new_x2 = (axes.x0 - circle_x2.point.x)/axes.scale;
			if(equations[0].a === 1){
		    	equations[0].findNewPoint();
		    } else {
		    	equations[0].findNewPointNegative();
		    }
	        drawGraph();
	        dragging.colour = "green";
			drawEquations();
			drawCircle(circle_x1);
	        drawCircle(circle_x2);
		}
    }
    e.preventDefault(); 
}
// This function is triggered once the mouse has unclicked
function stopDragging(e) {
	// Set delaCenter to null and dragging to undefined
    deltaCenter = null;
    dragging = undefined;
    if (type === "linear") {
	    for(var i = 0; i < 40; i++) {
			if(Math.abs(circle_m.point.x-pointsX[i]) <= axes.scale / 2) {
				circle_m.point.x = pointsX[i];
			}
		}
		circle_c.point.x = axes.x0;
		for(var i = 0; i < 40; i++) {
			if(Math.abs(circle_m.point.y-pointsY[i]) <= axes.scale / 2) {
				circle_m.point.y = pointsY[i];
			}
			if(Math.abs(circle_c.point.y-pointsY[i]) <= axes.scale / 2) {
				circle_c.point.y = pointsY[i];
			}
		}
		equations[0].c = -(axes.y0 - circle_c.point.y)/axes.scale;
		equations[0].findNewPoint((axes.x0 - circle_m.point.x)/axes.scale, (axes.y0 - circle_m.point.y)/axes.scale);
		drawGraph();
		circle_m.colour="red";
		circle_c.colour="red";
		drawCircle(circle_m);
		drawCircle(circle_c);
    } else if(type === "quadratic") {
    	for(var i = 0; i < 40; i++) {
			if(Math.abs(circle_x1.point.x-pointsX[i]) <= axes.scale / 2) {
				circle_x1.point.x = pointsX[i];
			}
			if(Math.abs(circle_x2.point.x-pointsX[i]) <= axes.scale / 2) {
				circle_x2.point.x = pointsX[i];
			}
		}
	    equations[0].new_x1 = (axes.x0 - circle_x1.point.x)/axes.scale;
	    equations[0].new_x2 = (axes.x0 - circle_x2.point.x)/axes.scale;
	    if(equations[0].a === 1){
	    	equations[0].findNewPoint();
	    } else {
	    	equations[0].findNewPointNegative();
	    }
		drawGraph();
		circle_x1.colour="red";
		circle_x2.colour="red";
		drawCircle(circle_x1);
		drawCircle(circle_x2);
    }
    drawEquations();
	e.preventDefault(); 
}
// Where the users mouse is on the X axes
function mouseX(e) {
	var spot = e.clientX || e.targetTouches[0].clientX;
    return spot - canvas.offsetLeft;
}
// Where the users mouse is on the Y axes
function mouseY(e) {
	var spot = e.clientY || e.targetTouches[0].clientY;
    return spot; - canvas.offsetTop;
}