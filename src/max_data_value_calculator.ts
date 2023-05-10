import { type rsmData } from "../utilities/types";

const max_data_value_calculator = (rsmData: rsmData): number => {
	const rowArray = [...rsmData.data];
	const allValues: number[] = [];
	rowArray.forEach((element) => {
		const { expensiveData: e, cheapData: c, tooExpensiveData: te, tooCheapData: tc } = element;
		allValues.push(e, c, te, tc);
	});
	const maxValue: number = Math.max(...allValues);

	return maxValue;
};

export default max_data_value_calculator;
