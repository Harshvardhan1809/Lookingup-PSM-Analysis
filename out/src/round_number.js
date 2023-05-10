"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var round = function (value) {
    var answer = Math.round(value * 10) / 10;
    return answer;
};
exports.default = round;
