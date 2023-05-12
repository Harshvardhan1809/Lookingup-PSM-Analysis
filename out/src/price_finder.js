"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intersection_calculator_1 = require("./intersection_calculator");
var price_finder = function (scale, answerRateData) {
    // find the 理想価格 - too cheap and too expensive
    // Replace with const idealPrice: number = intersection_calculator(scale, answerRateTooCheap, answerRateTooExpensive)
    var idealPrice = (0, intersection_calculator_1.default)(scale, answerRateData, "ideal");
    var compromisePrice = (0, intersection_calculator_1.default)(scale, answerRateData, "compromise");
    var highestPrice = (0, intersection_calculator_1.default)(scale, answerRateData, "highest");
    var lowestPrice = (0, intersection_calculator_1.default)(scale, answerRateData, "lowest");
    var priceObject = {
        idealPrice: idealPrice,
        compromisePrice: compromisePrice,
        highestPrice: highestPrice,
        lowestPrice: lowestPrice,
    };
    return priceObject;
};
exports.default = price_finder;
