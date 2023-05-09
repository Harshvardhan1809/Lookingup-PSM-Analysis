"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var range_finder = function (scale, yasuiKaitouritsu, takaiKaitouritsu) {
    // if yasuikaitouritsu becomes greater than takaikaitouritsu; i.e. the parity switches
    for (var i = 0; i < scale.length; i++) {
        if (yasuiKaitouritsu[i] < takaiKaitouritsu[i]) {
            var upperIndex = i;
            return upperIndex;
        }
    }
};
exports.default = range_finder;
