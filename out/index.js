"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XLSX = require("xlsx");
var intersection_calculator_js_1 = require("./intersection_calculator.js");
var range_finder_js_1 = require("./range_finder.js");
//// READ ALL DATA FROM CSV 
var unitPrice = 50;
var data = XLSX.readFile("PSMrawdata.csv");
var sheetData = data["Sheets"];
sheetData = sheetData["Sheet1"];
var expensiveData = [];
var cheapData = [];
var tooExpensiveData = [];
var tooCheapData = [];
for (var _i = 0, _a = Object.entries(sheetData); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], val = _b[1];
    var value = sheetData[key];
    if (key[0] == "B" && value.t === "n")
        expensiveData.push(value.v);
    else if (key[0] == "C" && value.t === "n")
        cheapData.push(value.v);
    else if (key[0] == "D" && value.t === "n")
        tooExpensiveData.push(value.v);
    else if (key[0] == "E" && value.t === "n")
        tooCheapData.push(value.v);
}
//// MAKE THE SCALE FOR THE X-AXIS
var maxSamples = [];
// maxSamples finds the max input value to create the scale
maxSamples.push(Math.max.apply(Math, expensiveData));
maxSamples.push(Math.max.apply(Math, cheapData));
maxSamples.push(Math.max.apply(Math, tooExpensiveData));
maxSamples.push(Math.max.apply(Math, tooCheapData));
var maxValue = Math.max.apply(Math, maxSamples);
var sampleSize = expensiveData.length;
// next step: create X-axis 0 to maxValue with unit as 50yen // cheap - 50, ..... 600
// kaitouritsu:
var scale = [];
for (var i = 1; i < maxValue / unitPrice + 1; i++) {
    scale.push(unitPrice * i);
}
// CALCULATE KAITOURITSU FOR EACH TYPE
var kaitouritsu_expensive = Array(scale.length).fill(0);
var kaitouritsu_cheap = Array(scale.length).fill(0);
var kaitouritsu_tooExpensive = Array(scale.length).fill(0);
var kaitouritsu_tooCheap = Array(scale.length).fill(0);
// calculate values for cheap
for (var i = 0; i < sampleSize; i++) {
    for (var j = scale.length - 1; j >= 0; j--) {
        if (cheapData[i] >= scale[j])
            kaitouritsu_cheap[j] += (1 / 36) * 100;
    }
}
// calculate values for expensive
for (var i = 0; i < sampleSize; i++) {
    for (var j = 0; j < scale.length; j++) {
        if (expensiveData[i] <= scale[j])
            kaitouritsu_expensive[j] += (1 / 36) * 100;
    }
}
// calculate values for too cheap
for (var i = 0; i < sampleSize; i++) {
    for (var j = 0; j < scale.length; j++) {
        if (tooCheapData[i] >= scale[j])
            kaitouritsu_tooCheap[j] += (1 / 36) * 100;
    }
}
// calculate values for too expensive
for (var i = 0; i < sampleSize; i++) {
    for (var j = 0; j < scale.length; j++) {
        if (tooExpensiveData[i] <= scale[j])
            kaitouritsu_tooExpensive[j] += (1 / 36) * 100;
    }
}
// round the result of all kaitouritsu to 3 digits
for (var i = 0; i < scale.length; i++) {
    kaitouritsu_cheap[i] = Number(kaitouritsu_cheap[i].toFixed(1));
    kaitouritsu_tooCheap[i] = Number(kaitouritsu_tooCheap[i].toFixed(1));
    kaitouritsu_expensive[i] = Number(kaitouritsu_expensive[i].toFixed(1));
    kaitouritsu_tooExpensive[i] = Number(kaitouritsu_tooExpensive[i].toFixed(1));
}
// find the 理想価格 - too cheap and too expensive
var risouKakakuIndex = (0, range_finder_js_1.default)(scale, kaitouritsu_tooCheap, kaitouritsu_tooExpensive);
var risouKakaku = (0, intersection_calculator_js_1.default)(risouKakakuIndex, scale, kaitouritsu_tooCheap, kaitouritsu_tooExpensive);
// find the 妥協価格 - cheap and expensive
var dakyouKakakuIndex = (0, range_finder_js_1.default)(scale, kaitouritsu_cheap, kaitouritsu_expensive);
var dakyouKakaku = (0, intersection_calculator_js_1.default)(dakyouKakakuIndex, scale, kaitouritsu_cheap, kaitouritsu_expensive);
// find the 最高価格 - cheap and too expensive
var saikouKakakuIndex = (0, range_finder_js_1.default)(scale, kaitouritsu_cheap, kaitouritsu_tooExpensive);
var saikouKakaku = (0, intersection_calculator_js_1.default)(saikouKakakuIndex, scale, kaitouritsu_cheap, kaitouritsu_tooExpensive);
// find the 最低品質保証価格 - too cheap and expensive
var saiteiKakakuIndex = (0, range_finder_js_1.default)(scale, kaitouritsu_tooCheap, kaitouritsu_expensive);
var saiteiKakaku = (0, intersection_calculator_js_1.default)(saiteiKakakuIndex, scale, kaitouritsu_tooCheap, kaitouritsu_expensive);
console.log("saiteikakaku", saiteiKakaku); // correct 246
console.log("saikoukakaku", saikouKakaku); // 293
console.log("dakyoukakaku", dakyouKakaku); // 279
console.log("risoukakaku", risouKakaku); // correct 265
