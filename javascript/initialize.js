/* 

	Initialize everything

*/

//Initialize everything
function init(equation) {

	canvas2 = document.getElementById("drawCanvas");
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    index = 0;
    colour = "#000";
    stroke_size = 5;

    //check to see if we are running in a browser with touch support
    stage = new createjs.Stage(canvas2);
    stage.autoClear = false;
    stage.enableDOMEvents(true);

    createjs.Touch.enable(stage);
    createjs.Ticker.setFPS(24);

    drawingCanvas = new createjs.Shape();

    title = new createjs.Text("Click and Drag to draw", "36px Arial", "#777777");
    title.x = (canvas2.width/2) - 200;
    title.y = (canvas2.height/2) - 40;
    stage.addChild(title);

    stage.addChild(drawingCanvas);
    stage.update();

	equations = [];
	count = 0;
	// Grab the canvas ID from the DOM
    canvas = document.getElementById("myCanvas");
    // Get content of the canvas
    cxt = canvas.getContext("2d");
    // Check canvas width
	canvasWidth();
	// Initialize the equation depending on which type
	if(equation === "linear") {
		// Set type
		type = "linear";
		// Initialize linear points
		circle_m = new Circle(new Point(axes.x0 + axes.scale, axes.y0 - axes.scale), 5, "red", 18);
		circle_c = new Circle(new Point(axes.x0, axes.y0), 5, "red", 18);
		// Create a random equation
		randomEquationLinear();
		// Run the rest through the reinitialise function
		reinit();
		// Draw the linear line
		drawLinear();
	} else {
		// Set type
		type = "quadratic";
		// Initialize quadratic points
		circle_x1 = new Circle(new Point(axes.x0-(2*axes.scale), axes.y0), 5, "red", 18);
		circle_x2 = new Circle(new Point(axes.x0+(2*axes.scale), axes.y0), 5, "red", 18);
		// Create a random equation
		randomEquationQuadratic();
		// Run the rest through the reinitialise function
		reinit();
		// Draw the quadratic line
		drawQuad();
	}
	/*
		Add events to the canvas for moving the points
	*/

	// Touch or mouse down
	canvas.addEventListener('mousedown', startDragging, false);
	canvas.addEventListener('touchstart', startDragging, false);
	// Touch or mouse moving
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('touchmove', drag, false);
    // mouse up or touch removed
    canvas.addEventListener('mouseup', stopDragging, false);
    canvas.addEventListener('mouseout', stopDragging, false);
    canvas.addEventListener('touchend', stopDragging, false);
    // events for createJS stage
    stage.addEventListener("stagemousedown", handleMouseDown);
    stage.addEventListener("stagemouseup", handleMouseUp);
}
// ReInitializing after the browser resizes
function reinit() {
	// Check for canvas width and set appropriate attributes
	canvasWidth();
	// Draw the graph
	drawGraph();
	// Reset the PointsX and PointsY arrays
	pointsX = [];
	pointsY = [];
	// Find all the points in pixels for the X and Y axes
	findPointX();
	findPointY();
	// Draw equations to the graph
	drawEquations();
	if(type === "linear") {
		// Draw two circles for linear
		drawCircle(circle_m);
		drawCircle(circle_c);
	} else {
		// Draw two circles for quadratic
		drawCircle(circle_x1);
		drawCircle(circle_x2);
	}
}