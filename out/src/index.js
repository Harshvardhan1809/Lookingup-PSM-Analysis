"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XLSX = require("xlsx");
var max_data_value_calculator_1 = require("./max_data_value_calculator");
var price_finder_js_1 = require("./price_finder.js");
var expensiveData = [];
var cheapData = [];
var tooExpensiveData = [];
var tooCheapData = [];
// improvements - exploit type creation to the max, categorise data as rows, get rid of 4 function calls, rename objects in english
//// READ ALL DATA FROM CSV 
var unitPrice = 50;
var data = XLSX.readFile("PSMrawdata.csv");
var sheetData = data["Sheets"]["Sheet1"];
console.log(sheetData);
var rsmData = {
    data: [],
    risouKakaku: 0,
    dakyouKakaku: 0,
    saikouKakaku: 0,
    saiteiKakaku: 0
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
for (var i = 1; i < maxValue / unitPrice + 1; i++) {
    scale.push(unitPrice * i);
}
// CALCULATE KAITOURITSU FOR EACH TYPE
var kaitouritsuAllData = {
    kaitouritsu_expensive: Array(scale.length).fill(0),
    kaitouritsu_cheap: Array(scale.length).fill(0),
    kaitouritsu_tooExpensive: Array(scale.length).fill(0),
    kaitouritsu_tooCheap: Array(scale.length).fill(0),
};
for (var i = 0; i < sampleSize; i++) {
    for (var j = scale.length - 1; j >= 0; j--) {
        var _c = rsmData["data"][i], e = _c.expensiveData, c = _c.cheapData, te = _c.tooExpensiveData, tc = _c.tooCheapData;
        if (c >= scale[j])
            kaitouritsuAllData["kaitouritsu_cheap"][j] += (1 / sampleSize) * 100;
        if (e <= scale[j])
            kaitouritsuAllData["kaitouritsu_expensive"][j] += (1 / sampleSize) * 100;
        if (tc >= scale[j])
            kaitouritsuAllData["kaitouritsu_tooCheap"][j] += (1 / sampleSize) * 100;
        if (te <= scale[j])
            kaitouritsuAllData["kaitouritsu_tooExpensive"][j] += (1 / sampleSize) * 100;
    }
}
// round the result of all kaitouritsu to 3 digits
for (var i = 0; i < scale.length; i++) {
    kaitouritsuAllData["kaitouritsu_cheap"][i] = Number(kaitouritsuAllData["kaitouritsu_cheap"][i].toFixed(1));
    kaitouritsuAllData["kaitouritsu_tooCheap"][i] = Number(kaitouritsuAllData["kaitouritsu_tooCheap"][i].toFixed(1));
    kaitouritsuAllData["kaitouritsu_expensive"][i] = Number(kaitouritsuAllData["kaitouritsu_expensive"][i].toFixed(1));
    kaitouritsuAllData["kaitouritsu_tooExpensive"][i] = Number(kaitouritsuAllData["kaitouritsu_tooExpensive"][i].toFixed(1));
}
// FIND ALL THE PRICES
var _d = (0, price_finder_js_1.default)(scale, kaitouritsuAllData), risouKakaku = _d.risou, dakyouKakaku = _d.dakyou, saikouKakaku = _d.saikou, saiteiKakaku = _d.saitei;
console.log("saiteikakaku", saiteiKakaku); // correct 246
console.log("saikoukakaku", saikouKakaku); // 293
console.log("dakyoukakaku", dakyouKakaku); // 279
console.log("risoukakaku", risouKakaku); // correct 265
