import { type answerRateAllData, type priceObject } from "../utilities/types";
import intersection_calculator from "./intersection_calculator";

const price_finder = (scale: number[], answerRateData: answerRateAllData): priceObject => {
	// find the 理想価格 - too cheap and too expensive

	// Replace with const idealPrice: number = intersection_calculator(scale, answerRateTooCheap, answerRateTooExpensive)

	const idealPrice: number = intersection_calculator(scale, answerRateData, "ideal");
	const compromisePrice: number = intersection_calculator(scale, answerRateData, "compromise");
	const highestPrice: number = intersection_calculator(scale, answerRateData, "highest");
	const lowestPrice: number = intersection_calculator(scale, answerRateData, "lowest");

	const priceObject: priceObject = {
		idealPrice,
		compromisePrice,
		highestPrice,
		lowestPrice,
	};

	return priceObject;
};

export default price_finder;
