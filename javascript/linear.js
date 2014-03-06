
/*

	Linear object equation

*/

var LinearEquation = function(m, c) {
	// Set default values if none are set
	this.m = (m === undefined) ? 1 : m;
	this.c = (c === undefined) ? 0 : -c;
	// check to see if the equation is negative
	this.isNegative = function() {
		return this.m < 0;
	};
	this.c_point = function() {
		return axes.y0 + (this.c * axes.scale);
	};
	this.first_x_end = function() {
		return axes.y0 + find_y(this.m, -25, this.c);
	};
	this.second_x_end = function() {
		return axes.y0 + find_y(this.m , 25, this.c);
	};
	this.findNewPoint = function(x, y) {
		this.m = (y + this.c) / x;
	};
	this.print = function() {
		printLine(axes.x0 - (25 * axes.scale), this.first_x_end(), axes.x0 + (25 * axes.scale), this.second_x_end(), "2", "red")
	};
};

function find_y(m, x, c){
	return ((m * x) + c) * axes.scale;
}

function randomEquationLinear() {
	answer_m = randomNumber();
	answer_c = randomNumber();
	var output_c = answer_c;
	var output_m = answer_m;
	if (output_c > 0) {
		output_c = "+ " + output_c;
	} else if (output_c === 0) {
		output_c = "";
	} else {
		output_c = "- " + -output_c;
	}
	if(output_m === 1) {
		output_m = "";
	}
	m.innerHTML = output_m;
	c.innerHTML = output_c;
	a.innerHTML = "";
}