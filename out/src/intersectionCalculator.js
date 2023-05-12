"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rangeFinder = function (scale, expensiveAnswerRate, cheapAnswerRate) {
    // if cheapAnswerRate becomes greater than expensiveAnswerRate; i.e. the parity switches
    for (var i = 0; i < scale.length; i++) {
        if (expensiveAnswerRate[i] < cheapAnswerRate[i]) {
            var upperIndex = i;
            return upperIndex;
        }
    }
    return -1;
};
var calculator = function (p1, p2, p3, p4) {
    var y1 = p1.y;
    var y2 = p2.y;
    var y3 = p3.y;
    var y4 = p4.y;
    var x1 = p1.x;
    var x2 = p2.x;
    var x3 = p3.x;
    var x4 = p4.x;
    var x = ((y3 - y1) * (x1 - x2) * (x3 - x4) + x1 * (y1 - y2) * (x3 - x4) - x3 * (y3 - y4) * (x1 - x2)) /
        ((y1 - y2) * (x3 - x4) - (x1 - x2) * (y3 - y4));
    x = Math.ceil(x);
    return x;
};
var intersectionCalculator = function (scale, answerRateData, type) {
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
    var index = rangeFinder(scale, cheapAnswerRate, expensiveAnswerRate);
    var p1 = {
        x: scale[index - 1],
        y: expensiveAnswerRate[index - 1],
    };
    var p2 = {
        x: scale[index],
        y: expensiveAnswerRate[index],
    };
    var p3 = {
        x: scale[index - 1],
        y: cheapAnswerRate[index - 1],
    };
    var p4 = {
        x: scale[index],
        y: cheapAnswerRate[index],
    };
    return calculator(p1, p2, p3, p4);
};
exports.default = intersectionCalculator;
