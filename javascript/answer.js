
/* 

	Check andswer against the input of the user 

*/

function checkAnswer() {
	if(type === "linear"){
		if(-answer_m === equations[0].m && -answer_c === equations[0].c){
			points += 15;
			return true;
		} else {
			points -= 5;
			return false;
		}
	} else {
		if(answer.new_x1 === equations[0].new_x1 || answer.new_x1 === equations[0].new_x2) {
			if(answer.new_x2 === equations[0].new_x1 || answer.new_x2 === equations[0].new_x2) {
				if(answer.a === equations[0].a){
					points += 20;
					return true;
				} else {
					points -= 5;
					return false;
				}
			} else {
				points -= 5;
				return false;
			}
		} else {
			points -= 5;
			return false;
		}
	}
}