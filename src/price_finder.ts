import { answerRateAllData, priceObject } from "../utilities/types";
import intersection_calculator from "./intersection_calculator";
import range_finder from "./range_finder";

const price_finder = (scale: number[], answerRateData: answerRateAllData) => {

    

    // find the 理想価格 - too cheap and too expensive
    let idealPriceIndex: number = range_finder(scale, answerRateData["answerRateTooCheap"], answerRateData["answerRateTooExpensive"]);
    let idealPrice: number = intersection_calculator(idealPriceIndex, scale, answerRateData["answerRateTooCheap"], answerRateData["answerRateTooExpensive"]);

    // find the 妥協価格 - cheap and expensive

    let compromisePriceIndex: number = range_finder(scale, answerRateData["answerRateCheap"], answerRateData["answerRateExpensive"]);
    let compromisePrice: number = intersection_calculator(compromisePriceIndex, scale, answerRateData["answerRateCheap"], answerRateData["answerRateExpensive"]);

    // find the 最高価格 - cheap and too expensive
    let highestPriceIndex: number = range_finder(scale, answerRateData["answerRateCheap"], answerRateData["answerRateTooExpensive"]);
    let highestPrice: number = intersection_calculator(highestPriceIndex, scale, answerRateData["answerRateCheap"], answerRateData["answerRateTooExpensive"]);

    // find the 最低品質保証価格 - too cheap and expensive
    let lowestPriceIndex: number = range_finder(scale, answerRateData["answerRateTooCheap"], answerRateData["answerRateExpensive"]);
    let lowestPrice: number = intersection_calculator(lowestPriceIndex, scale, answerRateData["answerRateTooCheap"], answerRateData["answerRateExpensive"]);

    const priceObject: priceObject = {

        idealPrice: idealPrice,  
        compromisePrice: compromisePrice,
        highestPrice: highestPrice,
        lowestPrice: lowestPrice
    }

    return priceObject;
}

export default price_finder;