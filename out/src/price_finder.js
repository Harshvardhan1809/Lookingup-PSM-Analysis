"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var intersection_calculator_1 = require("./intersection_calculator");
var range_finder_1 = require("./range_finder");
var price_finder = function (scale, kaitouritsuAllData) {
    // find the 理想価格 - too cheap and too expensive
    var risouKakakuIndex = (0, range_finder_1.default)(scale, kaitouritsuAllData["kaitouritsu_tooCheap"], kaitouritsuAllData["kaitouritsu_tooExpensive"]);
    var risouKakaku = (0, intersection_calculator_1.default)(risouKakakuIndex, scale, kaitouritsuAllData["kaitouritsu_tooCheap"], kaitouritsuAllData["kaitouritsu_tooExpensive"]);
    // find the 妥協価格 - cheap and expensive
    var dakyouKakakuIndex = (0, range_finder_1.default)(scale, kaitouritsuAllData["kaitouritsu_cheap"], kaitouritsuAllData["kaitouritsu_expensive"]);
    var dakyouKakaku = (0, intersection_calculator_1.default)(dakyouKakakuIndex, scale, kaitouritsuAllData["kaitouritsu_cheap"], kaitouritsuAllData["kaitouritsu_expensive"]);
    // find the 最高価格 - cheap and too expensive
    var saikouKakakuIndex = (0, range_finder_1.default)(scale, kaitouritsuAllData["kaitouritsu_cheap"], kaitouritsuAllData["kaitouritsu_tooExpensive"]);
    var saikouKakaku = (0, intersection_calculator_1.default)(saikouKakakuIndex, scale, kaitouritsuAllData["kaitouritsu_cheap"], kaitouritsuAllData["kaitouritsu_tooExpensive"]);
    // find the 最低品質保証価格 - too cheap and expensive
    var saiteiKakakuIndex = (0, range_finder_1.default)(scale, kaitouritsuAllData["kaitouritsu_tooCheap"], kaitouritsuAllData["kaitouritsu_expensive"]);
    var saiteiKakaku = (0, intersection_calculator_1.default)(saiteiKakakuIndex, scale, kaitouritsuAllData["kaitouritsu_tooCheap"], kaitouritsuAllData["kaitouritsu_expensive"]);
    var priceObject = {
        risou: risouKakaku,
        dakyou: dakyouKakaku,
        saikou: saikouKakaku,
        saitei: saiteiKakaku
    };
    return priceObject;
};
exports.default = price_finder;
