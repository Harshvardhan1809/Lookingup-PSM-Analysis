"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var range_finder = function (scale, expensiveAnswerRate, cheapAnswerRate) {
    // if cheapAnswerRate becomes greater than expensiveAnswerRate; i.e. the parity switches
    for (var i = 0; i < scale.length; i++) {
        if (expensiveAnswerRate[i] < cheapAnswerRate[i]) {
            var upperIndex = i;
            return upperIndex;
        }
    }
    return -1;
};
var intersection_calculator = function (scale, answerRateData, type) {
    // x3,x4 negative slope; cheap curve
    var cheapAnswerRate;
    var expensiveAnswerRate;
    if (type === "ideal") {
        cheapAnswerRate = answerRateData.answerRateTooCheap;
        expensiveAnswerRate = answerRateData.answerRateTooExpensive;
    }
    else if (type === "compromise") {
        cheapAnswerRate = answerRateData.answerRateCheap;
        expensiveAnswerRate = answerRateData.answerRateExpensive;
    }
    else if (type === "lowest") {
        cheapAnswerRate = answerRateData.answerRateTooCheap;
        expensiveAnswerRate = answerRateData.answerRateExpensive;
    }
    else {
        // type === "highest"
        cheapAnswerRate = answerRateData.answerRateCheap;
        expensiveAnswerRate = answerRateData.answerRateTooExpensive;
    }
    var index = range_finder(scale, cheapAnswerRate, expensiveAnswerRate);
    var y1 = expensiveAnswerRate[index - 1];
    var y2 = expensiveAnswerRate[index];
    var y3 = cheapAnswerRate[index - 1];
    var y4 = cheapAnswerRate[index];
    var x1 = scale[index - 1];
    var x2 = scale[index];
    var x3 = scale[index - 1];
    var x4 = scale[index];
    var x = ((y3 - y1) * (x1 - x2) * (x3 - x4) + x1 * (y1 - y2) * (x3 - x4) - x3 * (y3 - y4) * (x1 - x2)) /
        ((y1 - y2) * (x3 - x4) - (x1 - x2) * (y3 - y4));
    x = Math.ceil(x);
    return x;
};
exports.default = intersection_calculator;
