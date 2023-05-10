"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intersection_calculator = function (index, scale, cheapAnswerRate, expensiveAnswerRate) {
    // x3,x4 negative slope; cheap curve
    var y1 = expensiveAnswerRate[index - 1];
    var y2 = expensiveAnswerRate[index];
    var y3 = cheapAnswerRate[index - 1];
    var y4 = cheapAnswerRate[index];
    var x1 = scale[index - 1];
    var x2 = scale[index];
    var x3 = scale[index - 1];
    var x4 = scale[index];
    var x = ((y3 - y1) * (x1 - x2) * (x3 - x4) + x1 * (y1 - y2) * (x3 - x4) - x3 * (y3 - y4) * (x1 - x2)) / ((y1 - y2) * (x3 - x4) - (x1 - x2) * (y3 - y4));
    return Math.round(x);
};
exports.default = intersection_calculator;
