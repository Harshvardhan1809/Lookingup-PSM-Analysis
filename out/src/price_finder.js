"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intersection_calculator_1 = require("./intersection_calculator");
var range_finder_1 = require("./range_finder");
var price_finder = function (scale, answerRateData) {
    // find the 理想価格 - too cheap and too expensive
    var idealPriceIndex = (0, range_finder_1.default)(scale, answerRateData["answerRateTooCheap"], answerRateData["answerRateTooExpensive"]);
    var idealPrice = (0, intersection_calculator_1.default)(idealPriceIndex, scale, answerRateData["answerRateTooCheap"], answerRateData["answerRateTooExpensive"]);
    // find the 妥協価格 - cheap and expensive
    var compromisePriceIndex = (0, range_finder_1.default)(scale, answerRateData["answerRateCheap"], answerRateData["answerRateExpensive"]);
    var compromisePrice = (0, intersection_calculator_1.default)(compromisePriceIndex, scale, answerRateData["answerRateCheap"], answerRateData["answerRateExpensive"]);
    // find the 最高価格 - cheap and too expensive
    var highestPriceIndex = (0, range_finder_1.default)(scale, answerRateData["answerRateCheap"], answerRateData["answerRateTooExpensive"]);
    var highestPrice = (0, intersection_calculator_1.default)(highestPriceIndex, scale, answerRateData["answerRateCheap"], answerRateData["answerRateTooExpensive"]);
    // find the 最低品質保証価格 - too cheap and expensive
    var lowestPriceIndex = (0, range_finder_1.default)(scale, answerRateData["answerRateTooCheap"], answerRateData["answerRateExpensive"]);
    var lowestPrice = (0, intersection_calculator_1.default)(lowestPriceIndex, scale, answerRateData["answerRateTooCheap"], answerRateData["answerRateExpensive"]);
    var priceObject = {
        idealPrice: idealPrice,
        compromisePrice: compromisePrice,
        highestPrice: highestPrice,
        lowestPrice: lowestPrice
    };
    return priceObject;
};
exports.default = price_finder;
