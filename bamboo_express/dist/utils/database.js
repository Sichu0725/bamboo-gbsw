"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var knex_1 = __importDefault(require("knex"));
exports.db = knex_1.default({
    client: "mysql",
    connection: {
        host: 'terminal.kro.kr',
        port: 3306,
        user: 'cth',
        password: 'xogur38997',
        database: 'bamboo'
    }
});
