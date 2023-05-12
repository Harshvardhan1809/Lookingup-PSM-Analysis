import { AnswerRateAllData, Types, Coordinate } from "../utilities/types";

const rangeFinder = (scale: number[], expensiveAnswerRate: number[], cheapAnswerRate: number[]): number => {
	// if cheapAnswerRate becomes greater than expensiveAnswerRate; i.e. the parity switches

	for (let i = 0; i < scale.length; i++) {
		if (expensiveAnswerRate[i] < cheapAnswerRate[i]) {
			const upperIndex: number = i;
			return upperIndex;
		}
	}

	return -1;
};

const calculator = (p1: Coordinate, p2: Coordinate, p3: Coordinate, p4: Coordinate): number => {
	const y1 = p1.y;
	const y2 = p2.y;
	const y3 = p3.y;
	const y4 = p4.y;

	const x1 = p1.x;
	const x2 = p2.x;
	const x3 = p3.x;
	const x4 = p4.x;

	let x: number =
		((y3 - y1) * (x1 - x2) * (x3 - x4) + x1 * (y1 - y2) * (x3 - x4) - x3 * (y3 - y4) * (x1 - x2)) /
		((y1 - y2) * (x3 - x4) - (x1 - x2) * (y3 - y4));
	x = Math.ceil(x);
	return x;
};

const intersectionCalculator = (scale: number[], answerRateData: AnswerRateAllData, type: Types): number => {
	// x3,x4 negative slope; cheap curve

	let cheapAnswerRate: number[];
	let expensiveAnswerRate: number[];

	if (type === "ideal") {
		cheapAnswerRate = answerRateData.answerRateTooCheap;
		expensiveAnswerRate = answerRateData.answerRateTooExpensive;
	} else if (type === "compromise") {
		cheapAnswerRate = answerRateData.answerRateCheap;
		expensiveAnswerRate = answerRateData.answerRateExpensive;
	} else if (type === "lowest") {
		cheapAnswerRate = answerRateData.answerRateTooCheap;
		expensiveAnswerRate = answerRateData.answerRateExpensive;
	} else {
		// type === "highest"
		cheapAnswerRate = answerRateData.answerRateCheap;
		expensiveAnswerRate = answerRateData.answerRateTooExpensive;
	}

	const index: number = rangeFinder(scale, cheapAnswerRate, expensiveAnswerRate);

	const p1: Coordinate = {
		x: scale[index - 1],
		y: expensiveAnswerRate[index - 1],
	};

	const p2: Coordinate = {
		x: scale[index],
		y: expensiveAnswerRate[index],
	};

	const p3: Coordinate = {
		x: scale[index - 1],
		y: cheapAnswerRate[index - 1],
	};

	const p4: Coordinate = {
		x: scale[index],
		y: cheapAnswerRate[index],
	};

	return calculator(p1, p2, p3, p4);
};

export default intersectionCalculator;
