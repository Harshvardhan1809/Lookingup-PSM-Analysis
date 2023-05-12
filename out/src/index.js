"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maxDataValueCalculator_1 = require("./maxDataValueCalculator");
var priceFinder_js_1 = require("./priceFinder.js");
var answerRateCalculator_1 = require("./answerRateCalculator");
var XLSX = require("xlsx");
//// READ ALL DATA FROM CSV
var unitPrice = 50;
var data = XLSX.readFile("PSMrawdata.csv");
var sheetData = data.Sheets.Sheet1;
// console.log(sheetData);
var psmData = {
    data: [],
    idealPrice: 0,
    compromisePrice: 0,
    highestPrice: 0,
    lowestPrice: 0,
};
var rowPsmData = {
    expensiveData: 0,
    cheapData: 0,
    tooExpensiveData: 0,
    tooCheapData: 0,
};
for (var _i = 0, _a = Object.entries(sheetData); _i < _a.length; _i++) {
    var key = _a[_i][0];
    var value = sheetData[key];
    if (key[0] === "B" && value.t === "n")
        rowPsmData.expensiveData = value.v;
    else if (key[0] === "C" && value.t === "n")
        rowPsmData.cheapData = value.v;
    else if (key[0] === "D" && value.t === "n")
        rowPsmData.tooExpensiveData = value.v;
    else if (key[0] === "E" && value.t === "n") {
        rowPsmData.tooCheapData = value.v;
        psmData.data.push(rowPsmData);
        rowPsmData = {
            expensiveData: 0,
            cheapData: 0,
            tooExpensiveData: 0,
            tooCheapData: 0,
        };
    }
}
/// / MAKE THE SCALE FOR THE X-AXIS
var maxValue = (0, maxDataValueCalculator_1.default)(psmData);
var sampleSize = psmData.data.length;
var scale = [];
for (var i = 1; i < maxValue / unitPrice + 1; i++)
    scale.push(unitPrice * i);
/// / CALCULATE ANSWER RATE FOR EACH TYPE
var answerRateData = (0, answerRateCalculator_1.default)(scale, sampleSize, psmData);
// FIND ALL THE PRICES
var prices = (0, priceFinder_js_1.default)(scale, answerRateData);
var ideal = prices.idealPrice, compromise = prices.compromisePrice, highest = prices.highestPrice, lowest = prices.lowestPrice;
console.log("lowestPrice", lowest); // correct 246
console.log("highestPrice", highest); // 293
console.log("compromisePrice", compromise); // 279
console.log("idealPrice", ideal); // correct 265
