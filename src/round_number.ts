const round = (value: number): number => {
	const answer: number = Math.round(value * 10) / 10;
	return answer;
};

export default round;
