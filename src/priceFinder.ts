import { AnswerRateAllData, PriceObject } from "../utilities/types";
import intersectionCalculator from "./intersectionCalculator";

const priceFinder = (scale: number[], answerRateData: AnswerRateAllData): PriceObject => {
	// find the 理想価格 - too cheap and too expensive

	const idealPrice: number = intersectionCalculator(scale, answerRateData, "ideal");
	const compromisePrice: number = intersectionCalculator(scale, answerRateData, "compromise");
	const highestPrice: number = intersectionCalculator(scale, answerRateData, "highest");
	const lowestPrice: number = intersectionCalculator(scale, answerRateData, "lowest");

	const priceObject: PriceObject = {
		idealPrice,
		compromisePrice,
		highestPrice,
		lowestPrice,
	};

	return priceObject;
};

export default priceFinder;
