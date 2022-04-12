"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ranStr = function (length, type) {
    var result = '';
    var characters = type
        ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        : '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.default = ranStr;
