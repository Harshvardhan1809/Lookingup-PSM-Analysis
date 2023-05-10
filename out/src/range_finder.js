"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var range_finder = function (scale, expensiveAnswerRate, cheapAnswerRate) {
    // if yasuikaitouritsu becomes greater than takaikaitouritsu; i.e. the parity switches
    for (var i = 0; i < scale.length; i++) {
        if (expensiveAnswerRate[i] < cheapAnswerRate[i]) {
            var upperIndex = i;
            return upperIndex;
        }
    }
    return -1;
};
exports.default = range_finder;
