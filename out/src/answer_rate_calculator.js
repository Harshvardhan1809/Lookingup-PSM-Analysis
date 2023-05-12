"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var round_number_1 = require("./round_number");
var answer_rate_calculator = function (scale, sampleSize, rsmData) {
    var answerRateData = {
        answerRateExpensive: Array(scale.length).fill(0),
        answerRateCheap: Array(scale.length).fill(0),
        answerRateTooExpensive: Array(scale.length).fill(0),
        answerRateTooCheap: Array(scale.length).fill(0),
    };
    for (var i = 0; i < sampleSize; i++) {
        for (var j = scale.length - 1; j >= 0; j--) {
            var _a = rsmData.data[i], e = _a.expensiveData, c = _a.cheapData, te = _a.tooExpensiveData, tc = _a.tooCheapData;
            if (c >= scale[j])
                answerRateData.answerRateCheap[j] += (1 / sampleSize) * 100;
            if (e <= scale[j])
                answerRateData.answerRateExpensive[j] += (1 / sampleSize) * 100;
            if (tc >= scale[j])
                answerRateData.answerRateTooCheap[j] += (1 / sampleSize) * 100;
            if (te <= scale[j])
                answerRateData.answerRateTooExpensive[j] += (1 / sampleSize) * 100;
        }
    }
    // round the result of all kaitouritsu to 3 digits
    for (var i = 0; i < scale.length; i++) {
        answerRateData.answerRateCheap[i] = (0, round_number_1.default)(answerRateData.answerRateCheap[i], 1);
        answerRateData.answerRateTooCheap[i] = (0, round_number_1.default)(answerRateData.answerRateTooCheap[i], 1);
        answerRateData.answerRateExpensive[i] = (0, round_number_1.default)(answerRateData.answerRateExpensive[i], 1);
        answerRateData.answerRateTooExpensive[i] = (0, round_number_1.default)(answerRateData.answerRateTooExpensive[i], 1);
    }
    return answerRateData;
};
exports.default = answer_rate_calculator;
