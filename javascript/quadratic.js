/*

	Object to hold Quadratic equation

*/

var QuadEquation = function(a, b, c) {
	// initialize the input, if the input is undefined put defaults
	this.a = (a === undefined) ? 1 : a;
	this.b = (b === undefined) ? 0 : b;
	this.c = (c === undefined) ? 0 : c;
	// Check to see if it's a negative equation
	this.new_x1;
	this.new_x2;
	this.isNegative = function() {
		return this.a < 0;
	};
	// Find the first x intercept point
	this.x1 = function() {
		return factorise_plus(this.a, this.b, this.c);
	};
	// Find the second x intercept
	this.x2 = function() {
		return factorise_minus(this.a, this.b, this.c);
	};
	// Find where the vertex point is on the X axis
	this.vertex_h = function() {
		return -this.b / (2 * this.a);
	};
	// Find where the vertex is on the Y axis
	this.vertex_k = function() {
		var k1 = Math.pow(this.vertex_h(), 2), k2 = k1 * this.a, k3 = this.b * this.vertex_h(), k4 = this.c;
		return k2 + k3 + k4;
	};
	// Find first x when y equals a certain number
	this.first_x_end = function(num) {
		var x = factorise_minus(this.a, this.b, this.c - num) * axes.scale;
		return axes.x0 + x;
	};
	// Find the second x when y equals a certains number
	this.second_x_end = function(num) {
		var x = factorise_plus(this.a, this.b, this.c - num) * axes.scale;
		return axes.x0 + x;
	};
	this.findNewPoint = function(negative) {
		this.a = 1;
		this.c = this.new_x1 * this.new_x2;
		this.b = this.new_x1 + this.new_x2;
	};
	this.findNewPointNegative = function() {
		this.a = -1;
		var ting = this.new_x1 * this.new_x2;
		// Make these minus to get the minus form
		this.c = -ting;
		// Make this minus to get the minus form
		var ting2 = this.new_x1 + this.new_x2;
		this.b = -ting2;
	};
	// Print equation to graph method
	this.print = function() {
			// Multiply the answers by the scale of the graph
	      	var x_point = this.x1() * axes.scale, x_point2 = this.x2() * axes.scale,
	      	vertex1 = this.vertex_h() * axes.scale, vertex2 = this.vertex_k() * axes.scale;
	      	// Print the line from the x axis to the point of where y = 20
	      	// Print it in the right direction from the x axis
	      	if (this.isNegative()) {
	      		// negative: -x^2
	      		for (var i = -0.1; i > -20; i-=0.1) {
					var t = i + 0.1;
					printLine(this.first_x_end(t), axes.y0 - (t * axes.scale), this.first_x_end(i), axes.y0 - (i * axes.scale), "2", "red");
					printLine(this.second_x_end(t), axes.y0 - (t * axes.scale), this.second_x_end(i), axes.y0 - (i * axes.scale), "2", "red");
				}
	      	} else {
	      		// positive: x^2
	      		for (var i = 0.1; i < 20; i+=0.1) {
					var t = i - 0.1;
					printLine(this.first_x_end(t), axes.y0 - (t * axes.scale), this.first_x_end(i), axes.y0 - (i * axes.scale), "2", "red");
					printLine(this.second_x_end(t), axes.y0 - (t * axes.scale), this.second_x_end(i), axes.y0 - (i * axes.scale), "2", "red");
				}
	      	}
	      	// Print out the curving to vertex point from the x points
	      	cxt.beginPath();
			cxt.moveTo(axes.x0 + x_point, axes.y0);
			cxt.quadraticCurveTo(axes.x0 + vertex1, axes.y0 - (vertex2 * 2), axes.x0 + x_point2, axes.y0);
			cxt.lineWidth = "2";
	    	cxt.strokeStyle = 'red';
			cxt.stroke();
		}
	};

/* 

	Function to find both x's through the quadratic equation.

*/

function factorise_plus(a, b, c) {
	return -b / 2 / a + Math.pow(Math.pow(b, 2) - 4 * a * c, 0.5) / 2 / a; 
}

function factorise_minus(a, b, c) {
	return -b / 2 / a - Math.pow(Math.pow(b, 2) - 4 * a * c, 0.5) / 2 / a; 
}


/*

	Function to produce a random quadratic equation.

*/

function randomEquationQuadratic() {
	randomx1 = randomNumber();
	randomx2 = randomNumber();
	answer = new QuadEquation();
	answer.new_x1 = randomx1;
	answer.new_x2 = randomx2;
	var new_a = randomA();
	answer.a = new_a;

	if (answer.a === 1){
		answer.findNewPoint();
	} else {
		answer.findNewPointNegative();
	}

	var output_a = answer.a;
	var output_b = answer.b;
	var output_c = answer.c;

	if (output_c > 0) {
		output_c = "+ " + output_c;
	} else if (output_c === 0) {
		output_c = "";
	} else {
		output_c = "- " + -output_c;
	}
	if(output_b === 1) {
		output_b = "+ ";
	} else if(output_b === 0) {
		output_b = "+ 0";
	} else if(output_b < 0) {
		output_b + "- " + output_b;
	} else {
		output_b = "+ " + output_b;
	}
	if(output_a === 1) {
		output_a = "x&sup2;";
	}else{
		output_a = "-x&sup2;";
	}
	a.innerHTML = output_a;
	m.innerHTML = output_b;
	c.innerHTML = output_c;
}

/* 

	Moving from -x2 to x2 through gestures.

*/

function moveQuadUp(e,date) {
	if(type == "quadratic") {
		equations[0].new_x1 = (axes.x0 - circle_x1.point.x)/axes.scale;
		equations[0].new_x2 = (axes.x0 - circle_x2.point.x)/axes.scale;
		equations[0].findNewPointNegative();
		drawEverything();
	}
}
function moveQuadDown(e, date){
	if(type == "quadratic") {
		equations[0].new_x1 = (axes.x0 - circle_x1.point.x)/axes.scale;
		equations[0].new_x2 = (axes.x0 - circle_x2.point.x)/axes.scale;
		equations[0].findNewPoint();
		drawEverything();
	}
}

function drawEverything(){
	drawGraph();
	drawEquations();
	drawCircle(circle_x1);
	drawCircle(circle_x2);	
}