"use strict";
// Provide how many places you want to round to
// eg. if place = 1, then round to 1 place after decimal
Object.defineProperty(exports, "__esModule", { value: true });
var round = function (value, place) {
    var val = Math.pow(10, place);
    var answer = Math.round(value * val) / val;
    return answer;
};
exports.default = round;
