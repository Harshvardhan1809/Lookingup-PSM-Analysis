import { RowPsmData } from "../utilities/types";

const maxDataValueCalculator = (psmData: RowPsmData[]): number => {
	const rowArray = [...psmData];
	const allValues: number[] = [];
	rowArray.forEach((element) => {
		const { expensiveData: e, cheapData: c, tooExpensiveData: te, tooCheapData: tc } = element;
		allValues.push(e, c, te, tc);
	});
	const maxValue: number = Math.max(...allValues);

	return maxValue;
};

export default maxDataValueCalculator;
