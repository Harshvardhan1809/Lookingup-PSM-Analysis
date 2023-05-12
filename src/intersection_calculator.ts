import { answerRateAllData } from "../utilities/types";

const range_finder = (scale: number[], expensiveAnswerRate: number[], cheapAnswerRate: number[]): number => {
	// if cheapAnswerRate becomes greater than expensiveAnswerRate; i.e. the parity switches

	for (let i = 0; i < scale.length; i++) {
		if (expensiveAnswerRate[i] < cheapAnswerRate[i]) {
			const upperIndex: number = i;
			return upperIndex;
		}
	}

	return -1;
};

const intersection_calculator = (scale: number[], answerRateData: answerRateAllData, type: string): number => {
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

	const index: number = range_finder(scale, cheapAnswerRate, expensiveAnswerRate);

	const y1 = expensiveAnswerRate[index - 1];
	const y2 = expensiveAnswerRate[index];
	const y3 = cheapAnswerRate[index - 1];
	const y4 = cheapAnswerRate[index];

	const x1 = scale[index - 1];
	const x2 = scale[index];
	const x3 = scale[index - 1];
	const x4 = scale[index];

	let x: number =
		((y3 - y1) * (x1 - x2) * (x3 - x4) + x1 * (y1 - y2) * (x3 - x4) - x3 * (y3 - y4) * (x1 - x2)) /
		((y1 - y2) * (x3 - x4) - (x1 - x2) * (y3 - y4));
	x = Math.ceil(x);
	return x;
};

export default intersection_calculator;
