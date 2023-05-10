"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XLSX = require("xlsx");
var max_data_value_calculator_1 = require("./max_data_value_calculator");
var price_finder_js_1 = require("./price_finder.js");
var answer_rate_calculator_1 = require("./answer_rate_calculator");
//// READ ALL DATA FROM CSV 
var unitPrice = 50;
var data = XLSX.readFile("PSMrawdata.csv");
var sheetData = data["Sheets"]["Sheet1"];
console.log(sheetData);
var rsmData = {
    data: [],
    idealPrice: 0,
    compromisePrice: 0,
    highestPrice: 0,
    lowestPrice: 0
};
var rowRSMData = {
    expensiveData: 0,
    cheapData: 0,
    tooExpensiveData: 0,
    tooCheapData: 0,
};
for (var _i = 0, _a = Object.entries(sheetData); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], val = _b[1];
    var value = sheetData[key];
    if (key[0] == "B" && value.t === "n")
        rowRSMData['expensiveData'] = value.v;
    else if (key[0] == "C" && value.t === "n")
        rowRSMData['cheapData'] = value.v;
    else if (key[0] == "D" && value.t === "n")
        rowRSMData['tooExpensiveData'] = value.v;
    else if (key[0] == "E" && value.t === "n") {
        rowRSMData['tooCheapData'] = value.v;
        rsmData['data'].push(rowRSMData);
        rowRSMData = {
            expensiveData: 0,
            cheapData: 0,
            tooExpensiveData: 0,
            tooCheapData: 0,
        };
    }
    ;
}
//// MAKE THE SCALE FOR THE X-AXIS
var maxValue = (0, max_data_value_calculator_1.default)(rsmData);
var sampleSize = rsmData["data"].length;
var scale = [];
for (var i = 1; i < maxValue / unitPrice + 1; i++)
    scale.push(unitPrice * i);
//// CALCULATE ANSWER RATE FOR EACH TYPE
var answerRateData = (0, answer_rate_calculator_1.default)(scale, sampleSize, rsmData);
// FIND ALL THE PRICES
var prices = (0, price_finder_js_1.default)(scale, answerRateData);
var ideal = prices.idealPrice, compromise = prices.compromisePrice, highest = prices.highestPrice, lowest = prices.lowestPrice;
console.log("lowestPrice", lowest); // correct 246
console.log("highestPrice", highest); // 293
console.log("compromisePrice", compromise); // 279
console.log("idealPrice", ideal); // correct 265
