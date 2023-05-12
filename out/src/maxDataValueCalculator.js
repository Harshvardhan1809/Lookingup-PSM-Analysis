"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var maxDataValueCalculator = function (psmData) {
    var rowArray = __spreadArray([], psmData.data, true);
    var allValues = [];
    rowArray.forEach(function (element) {
        var e = element.expensiveData, c = element.cheapData, te = element.tooExpensiveData, tc = element.tooCheapData;
        allValues.push(e, c, te, tc);
    });
    var maxValue = Math.max.apply(Math, allValues);
    return maxValue;
};
exports.default = maxDataValueCalculator;
