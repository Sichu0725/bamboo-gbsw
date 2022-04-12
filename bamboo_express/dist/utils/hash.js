"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sha3_1 = __importDefault(require("sha3"));
function hash(text) {
    var hasher = new sha3_1.default(512);
    hasher.update(text);
    return hasher.digest('hex');
}
exports.default = hash;
