"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intersectionCalculator_1 = require("./intersectionCalculator");
var priceFinder = function (scale, answerRateData) {
    // find the 理想価格 - too cheap and too expensive
    var idealPrice = (0, intersectionCalculator_1.default)(scale, answerRateData, "ideal");
    var compromisePrice = (0, intersectionCalculator_1.default)(scale, answerRateData, "compromise");
    var highestPrice = (0, intersectionCalculator_1.default)(scale, answerRateData, "highest");
    var lowestPrice = (0, intersectionCalculator_1.default)(scale, answerRateData, "lowest");
    var priceObject = {
        idealPrice: idealPrice,
        compromisePrice: compromisePrice,
        highestPrice: highestPrice,
        lowestPrice: lowestPrice,
    };
    return priceObject;
};
exports.default = priceFinder;
