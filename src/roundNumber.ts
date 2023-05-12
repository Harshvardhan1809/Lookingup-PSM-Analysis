// Provide how many places you want to round to
// eg. if place = 1, then round to 1 place after decimal

const round = (value: number, place: number): number => {
	const val: number = Math.pow(10, place);
	const answer: number = Math.round(value * val) / val;
	return answer;
};

export default round;
