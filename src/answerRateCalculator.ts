import { AnswerRateAllData, RowPsmData } from "../utilities/types";
import round from "./roundNumber";

const answerRateCalculator = (scale: number[], sampleSize: number, psmData: RowPsmData[]): AnswerRateAllData => {
	const answerRateData: AnswerRateAllData = {
		answerRateExpensive: Array(scale.length).fill(0),
		answerRateCheap: Array(scale.length).fill(0),
		answerRateTooExpensive: Array(scale.length).fill(0),
		answerRateTooCheap: Array(scale.length).fill(0),
	};

	for (let i = 0; i < sampleSize; i++) {
		for (let j = scale.length - 1; j >= 0; j--) {
			const { expensiveData: e, cheapData: c, tooExpensiveData: te, tooCheapData: tc } = psmData[i];
			if (c >= scale[j]) answerRateData.answerRateCheap[j] += (1 / sampleSize) * 100;
			if (e <= scale[j]) answerRateData.answerRateExpensive[j] += (1 / sampleSize) * 100;
			if (tc >= scale[j]) answerRateData.answerRateTooCheap[j] += (1 / sampleSize) * 100;
			if (te <= scale[j]) answerRateData.answerRateTooExpensive[j] += (1 / sampleSize) * 100;
		}
	}

	// round the result of all kaitouritsu to 3 digits
	for (let i = 0; i < scale.length; i++) {
		answerRateData.answerRateCheap[i] = round(answerRateData.answerRateCheap[i], 1);
		answerRateData.answerRateTooCheap[i] = round(answerRateData.answerRateTooCheap[i], 1);
		answerRateData.answerRateExpensive[i] = round(answerRateData.answerRateExpensive[i], 1);
		answerRateData.answerRateTooExpensive[i] = round(answerRateData.answerRateTooExpensive[i], 1);
	}

	return answerRateData;
};

export default answerRateCalculator;
