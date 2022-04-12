"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
var app_1 = __importDefault(require("./app"));
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
exports.port = process.env.PORT || 80;
var app = express_1.default();
var server = http_1.createServer(app);
app.use(app_1.default);
app.use(express_1.default.json());
server.listen(exports.port, function () {
    console.log("Server is now ready, http://127.0.0.1:" + exports.port);
});
