
/*

	Function for drawing to the canvas

*/

// Drawing the look of the graph to the canvas
function drawGraph() {
	cxt.clearRect(0, 0, canvas.width, canvas.height);
	// Declare variables
	var w = cxt.canvas.width, h = cxt.canvas.height, xmin = axes.doNegativeX ? 0 : x0;
	for (var i = -20; i < 20; i++) {
		var pixels = i * axes.scale;
		printLine(w / 2 - pixels, 0, w / 2 - pixels, h, "1", 'rgba(0,0,0,0.1)');
		printLine(0, h/2 - pixels, w, h/2 - pixels, "1", 'rgba(0,0,0,0.1)');
	}
	printLine(xmin + .5, axes.y0, w + .5, axes.y0, "3", "#333");
	printLine(axes.x0, 0, axes.x0, h, "3", "#333");
}

function drawCircle(circle) {
    cxt.beginPath();
	cxt.globalCompositeOperation = 'source-over';
    cxt.arc(circle.point.x, circle.point.y, circle.size, 0, 2 * Math.PI, true);
    cxt.fillStyle = circle.colour;
    cxt.fill();


    cxt.font="20px Arial";
    cxt.fillStyle = "black";

    var text = "("+(circle.point.x-axes.x0)/axes.scale+", "+(-circle.point.y+axes.y0)/axes.scale+")";
    var x = circle.point.x + 18;
    var y = circle.point.y+22;

    cxt.strokeStyle = 'white';

	// setup these to match your needs
	cxt.miterLimit = 2;
	cxt.lineJoin = 'circle';

	// draw an outline, then filled
	cxt.lineWidth = 7;
	cxt.strokeText(text, x, y);
	cxt.lineWidth = 1;
	cxt.fillText(text, x, y);

}

function drawEquations() {
	// If there is any equations, print them out
	if (equations.length) {
		for (equation in equations) {
			equations[equation].print();
		}
	}
}

function drawLinear() {
	equations[count] = new LinearEquation(-1, 0);
	equations[count].print();
	count++;
}

function drawQuad() {
	// Take values from user input
	equations[count] = new QuadEquation(1, 0, -4);
	equations[count].print();
	count++;
}

function printLine(from_x, from_y, to_x, to_y, line_width, line_colour) {
	cxt.beginPath();
	cxt.lineWidth = line_width;
	cxt.strokeStyle = line_colour;
	cxt.moveTo(from_x, from_y);
	cxt.lineTo(to_x, to_y);
	cxt.stroke();
}