"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var database_1 = require("../utils/database");
var ranStr_1 = __importDefault(require("../utils/ranStr"));
var hash_1 = __importDefault(require("../utils/hash"));
var isNumber_1 = __importDefault(require("../utils/isNumber"));
var cors_1 = __importDefault(require("cors"));
var Question_1 = require("../utils/Question");
var router = express_1.Router();
var Master_Key = 'xogur38997';
router.use(express_1.default.json());
router.use(cors_1.default());
router.get('/', function (req, res) {
    res.sendStatus(200).send('Bamboo Express Your IP:' + req.ip);
});
router.post('/upload', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, content, category, title, Question_id, Question_Answer, password, category_, salt, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, content = _a.content, category = _a.category, title = _a.title, Question_id = _a.Question_id, Question_Answer = _a.Question_Answer, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 17, , 18]);
                if (!(!content || !category || !title || !Question_Answer || !Question_id)) return [3 /*break*/, 3];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'upload',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 2:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 400,
                    Code: '001-2',
                    reason: '필요한 데이터가 포함되어 있지 않습니다.'
                });
            case 3: return [4 /*yield*/, Question_1.checkQuestion(Question_id)];
            case 4:
                if ((_b.sent()) == false)
                    throw ({
                        Success: false,
                        Status: 'Error',
                        Code: '003-3',
                        reason: '존재하지 않는 질문입니다.'
                    });
                return [4 /*yield*/, Question_1.Question(Question_id, Question_Answer)];
            case 5:
                if (!((_b.sent()) === false)) return [3 /*break*/, 6];
                return [2 /*return*/, res.send({
                        Success: false,
                        Status: 'Error',
                        Code: '003-3',
                        reason: '잘못된 답안을 제출 하셨습니다.'
                    })];
            case 6:
                if (!!password) return [3 /*break*/, 8];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'upload',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 7:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '002-1',
                    reason: '비밀번호가 필요합니다.'
                });
            case 8:
                if (!(password <= 4)) return [3 /*break*/, 10];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'upload',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 9:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '002-2',
                    reason: '비밀번호는 5글자 이상이어야 합니다.'
                });
            case 10: return [4 /*yield*/, database_1.db.select('*').from('categorys').where('title', category)];
            case 11:
                category_ = (_b.sent())[0];
                if (!!category_) return [3 /*break*/, 13];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'upload',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 12:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '003-2',
                    reason: '존재하지 않는 카테고리입니다.'
                });
            case 13:
                salt = ranStr_1.default(20, true);
                return [4 /*yield*/, database_1.db.insert({
                        Internet_Protocol: req.ip,
                        category: category_.title,
                        status: 1,
                        title: title,
                        content: content,
                        password: hash_1.default(password + salt),
                        salt: salt,
                    }).into('bamboo')];
            case 14:
                _b.sent();
                return [4 /*yield*/, database_1.db.insert({
                        type: 'upload',
                        status: 1,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 15:
                _b.sent();
                return [2 /*return*/, res.send({
                        Success: true,
                        Status: 'Success',
                        reason: '정상적으로 처리되었습니다.'
                    })];
            case 16: return [3 /*break*/, 18];
            case 17:
                e_1 = _b.sent();
                return [2 /*return*/, res.send({
                        Success: e_1.Success,
                        Status: e_1.Status,
                        Code: e_1.Code,
                        reason: e_1.reason
                    })];
            case 18: return [2 /*return*/];
        }
    });
}); });
router.get('/form', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, _a, _b, e_2;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                return [4 /*yield*/, database_1.db.select('title', 'creater').from('categorys')];
            case 1:
                category = _d.sent();
                _b = (_a = res).send;
                _c = {
                    Success: true,
                    Status: 'Success',
                    reason: '정상적으로 처리되었습니다.'
                };
                return [4 /*yield*/, Question_1.getQuestion()];
            case 2: return [2 /*return*/, _b.apply(_a, [(_c.Question = (_d.sent()).Question,
                        _c.category = category,
                        _c)])];
            case 3:
                e_2 = _d.sent();
                return [2 /*return*/, res.send({
                        Success: e_2.Success,
                        Status: e_2.Status,
                        Code: e_2.Code,
                        reason: e_2.reason
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/getPost', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.query.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, database_1.db.select('id', 'category', 'title', 'content', 'date').from('bamboo').where('id', String(id)).andWhere('status', 1)];
            case 2:
                post = (_a.sent())[0];
                if (!post) {
                    throw ({
                        Success: false,
                        Status: 'Error',
                        Code: '003-1',
                        reason: '존재하지 않는 게시물입니다.'
                    });
                }
                else {
                    return [2 /*return*/, res.send({
                            Success: true,
                            Status: 'Success',
                            reason: '정상적으로 처리되었습니다.',
                            post: post
                        })];
                }
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                return [2 /*return*/, res.send({
                        Success: e_3.Success,
                        Status: e_3.Status,
                        Code: e_3.Code,
                        reason: e_3.reason
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/delete', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, password, bamboo, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                _a = req.body, id = _a.id, password = _a.password;
                if (!(!id || !password)) return [3 /*break*/, 2];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'delete',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 1:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-2',
                    reason: '필요한 데이터가 포함되어 있지 않습니다.'
                });
            case 2: return [4 /*yield*/, database_1.db.select('*').from('bamboo').where('id', id)];
            case 3:
                bamboo = (_b.sent())[0];
                if (!!bamboo) return [3 /*break*/, 5];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'delete',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 4:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '003-1',
                    reason: '존재하지 않는 게시물입니다.'
                });
            case 5:
                if (!(bamboo.password === hash_1.default(password + bamboo.salt) || password === Master_Key)) return [3 /*break*/, 8];
                return [4 /*yield*/, database_1.db.update({ status: 0 }).from('bamboo').where({ id: id })];
            case 6:
                _b.sent();
                return [4 /*yield*/, database_1.db.insert({
                        type: 'delete',
                        status: 1,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 7:
                _b.sent();
                return [2 /*return*/, res.send({
                        Success: true,
                        Status: 'Success',
                        reason: '정상적으로 처리되었습니다.'
                    })];
            case 8: return [3 /*break*/, 10];
            case 9:
                e_4 = _b.sent();
                return [2 /*return*/, res.send({
                        Success: e_4.Success,
                        Status: e_4.Status,
                        Code: e_4.Code,
                        reason: e_4.reason
                    })];
            case 10: return [2 /*return*/];
        }
    });
}); });
router.post('/update', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, id, data, bamboo, e_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                _a = req.body, password = _a.password, id = _a.id, data = _a.data;
                if (!(!password || !id || !data)) return [3 /*break*/, 2];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'update',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 1:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-2',
                    reason: '필요한 데이터가 포함되어 있지 않습니다.'
                });
            case 2: return [4 /*yield*/, database_1.db.select('*').from('bamboo').where('id', id)];
            case 3:
                bamboo = (_b.sent())[0];
                if (!!bamboo) return [3 /*break*/, 5];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'update',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 4:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '003-1',
                    reason: '존재하지 않는 게시물입니다.'
                });
            case 5:
                if (!(bamboo.password === hash_1.default(password + bamboo.salt) || bamboo.password === Master_Key)) return [3 /*break*/, 8];
                return [4 /*yield*/, database_1.db.update({
                        content: data
                    }).from('bamboo').where({ id: id })];
            case 6:
                _b.sent();
                return [4 /*yield*/, database_1.db.insert({
                        type: 'update',
                        status: 1,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 7:
                _b.sent();
                return [2 /*return*/, res.send({
                        Success: true,
                        Status: 'Success',
                        reason: '정상적으로 처리되었습니다.'
                    })];
            case 8: return [3 /*break*/, 10];
            case 9:
                e_5 = _b.sent();
                return [2 /*return*/, res.send({
                        Success: e_5.Success,
                        Status: e_5.Status,
                        Code: e_5.Code,
                        reason: e_5.reason
                    })];
            case 10: return [2 /*return*/];
        }
    });
}); });
router.get('/get', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, limit, offset, category, bamboo_1, bamboo, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 12, , 13]);
                _a = req.query, limit = _a.limit, offset = _a.offset, category = _a.category;
                if (!(limit || offset || Number(limit) > 25)) return [3 /*break*/, 2];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'get',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 1:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-2',
                    reason: '필요한 데이터가 포함되어 있지 않습니다.'
                });
            case 2:
                if (!(Number(limit) < 0 || Number(offset) < 0 || Number(limit) > 25 || isNumber_1.default(String(limit)) === false || isNumber_1.default(String(offset)) === false)) return [3 /*break*/, 4];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'get',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 3:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-3',
                    reason: '데이터가 규정에 맞지 않습니다.'
                });
            case 4:
                if (!category) return [3 /*break*/, 9];
                return [4 /*yield*/, database_1.db.select('id', 'data', 'date', 'category').from('bamboo').where('status', 1).andWhere('category', String(category)).orderBy('id', 'desc').limit(Number(limit)).offset(Number(offset))];
            case 5:
                bamboo_1 = _b.sent();
                if (!!bamboo_1) return [3 /*break*/, 7];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'get',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 6:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-3',
                    reason: '데이터가 규정에 맞지 않습니다.'
                });
            case 7: return [4 /*yield*/, database_1.db.insert({
                    type: 'get',
                    status: 1,
                    Internet_Protocol: req.ip,
                }).into('logs')];
            case 8:
                _b.sent();
                return [2 /*return*/, res.send({
                        Success: true,
                        Status: 'Success',
                        bamboo: bamboo_1,
                        reason: '정상적으로 처리되었습니다.'
                    })];
            case 9: return [4 /*yield*/, database_1.db.select('id', 'data', 'date', 'category').from('bamboo').where('status', 1).orderBy('id', 'desc').limit(20).offset(Number(offset))];
            case 10:
                bamboo = _b.sent();
                return [4 /*yield*/, database_1.db.insert({
                        type: 'get',
                        status: 1,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 11:
                _b.sent();
                return [2 /*return*/, res.send({
                        Success: true,
                        Status: 'Success',
                        data: bamboo,
                        reason: '정상적으로 처리되었습니다.'
                    })];
            case 12:
                e_6 = _b.sent();
                return [2 /*return*/, res.send({
                        Success: e_6.Success,
                        Status: e_6.Status,
                        Code: e_6.Code,
                        reason: e_6.reason
                    })];
            case 13: return [2 /*return*/];
        }
    });
}); });
router.post('/admin_post_del', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, username, password, bamboo, admin, e_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 12, , 13]);
                _a = req.body, id = _a.id, username = _a.username, password = _a.password;
                if (!(!id || !username || !password)) return [3 /*break*/, 2];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_post_del',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 1:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-2',
                    reason: '필요한 데이터가 포함되어 있지 않습니다.'
                });
            case 2: return [4 /*yield*/, database_1.db.select('*').from('bamboo').where({ id: id })];
            case 3:
                bamboo = (_b.sent())[0];
                if (!!bamboo) return [3 /*break*/, 5];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_post_del',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 4:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-4',
                    reason: '해당하는 데이터가 없습니다.'
                });
            case 5: return [4 /*yield*/, database_1.db.select('*').from('admin').where({ username: username })];
            case 6:
                admin = (_b.sent())[0];
                if (!!admin) return [3 /*break*/, 8];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_post_del',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 7:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '004-1',
                    reason: '존재하지 않는 관리자입니다.'
                });
            case 8:
                if (!(admin.password === hash_1.default(password + admin.salt))) return [3 /*break*/, 11];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_post_del',
                        status: 1,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 9:
                _b.sent();
                return [4 /*yield*/, database_1.db.update({ status: 0 }).from('bamboo').where({ id: id })];
            case 10:
                _b.sent();
                return [2 /*return*/, res.send({
                        Success: true,
                        Status: 'Success',
                        reason: '정상적으로 처리되었습니다.'
                    })];
            case 11: return [3 /*break*/, 13];
            case 12:
                e_7 = _b.sent();
                return [2 /*return*/, res.send({
                        Success: e_7.Success,
                        Status: e_7.Status,
                        Code: e_7.Code,
                        reason: e_7.reason
                    })];
            case 13: return [2 /*return*/];
        }
    });
}); });
router.post('/admin_category_inc', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, password, username, admin, e_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                _a = req.body, title = _a.title, password = _a.password, username = _a.username;
                if (!(!title || !password || !username)) return [3 /*break*/, 2];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_category_inc',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 1:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-2',
                    reason: '필요한 데이터가 포함되어 있지 않습니다.'
                });
            case 2: return [4 /*yield*/, database_1.db.select('*').from('admin').where('username', username)];
            case 3:
                admin = (_b.sent())[0];
                if (!!admin) return [3 /*break*/, 5];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_category_inc',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 4:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-1',
                    reason: '존재하지 않는 관리자입니다.'
                });
            case 5:
                if (!(password === Master_Key || admin.password === hash_1.default(password + admin.salt))) return [3 /*break*/, 8];
                return [4 /*yield*/, database_1.db.insert({
                        id: ranStr_1.default(10, true),
                        title: title,
                        creater: admin.realname + ', ' + admin.username,
                    }).into('categorys')];
            case 6:
                _b.sent();
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_category_inc',
                        status: 1,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 7:
                _b.sent();
                return [2 /*return*/, res.send({
                        Success: true,
                        Status: 'Success',
                        reason: '정상적으로 처리되었습니다.'
                    })];
            case 8: return [4 /*yield*/, database_1.db.insert({
                    type: 'admin_category_inc',
                    status: 0,
                    Internet_Protocol: req.ip,
                }).into('logs')];
            case 9:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '002-3',
                    reason: '비밀번호가 일치하지 않습니다.'
                });
            case 10: return [3 /*break*/, 12];
            case 11:
                e_8 = _b.sent();
                return [2 /*return*/, res.send({
                        Success: e_8.Success,
                        Status: e_8.Status,
                        Code: e_8.Code,
                        reason: e_8.reason
                    })];
            case 12: return [2 /*return*/];
        }
    });
}); });
router.post('/admin_category_del', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, password, username, admin, e_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 11, , 12]);
                _a = req.body, title = _a.title, password = _a.password, username = _a.username;
                if (!(!title || !password || !username)) return [3 /*break*/, 2];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_category_del',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 1:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-2',
                    reason: '필요한 데이터가 포함되어 있지 않습니다.'
                });
            case 2: return [4 /*yield*/, database_1.db.select('*').from('admin').where('username', username)];
            case 3:
                admin = (_b.sent())[0];
                if (!!admin) return [3 /*break*/, 5];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_category_del',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 4:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-1',
                    reason: '존재하지 않는 관리자입니다.'
                });
            case 5:
                if (!(password === Master_Key || admin.password === hash_1.default(password + admin.salt))) return [3 /*break*/, 8];
                return [4 /*yield*/, database_1.db.delete().from('categorys').where('title', title)];
            case 6:
                _b.sent();
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_category_del',
                        status: 1,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 7:
                _b.sent();
                return [2 /*return*/, res.send({
                        Success: true,
                        Status: 'Success',
                        reason: '정상적으로 처리되었습니다.'
                    })];
            case 8: return [4 /*yield*/, database_1.db.insert({
                    type: 'admin_category_del',
                    status: 0,
                    Internet_Protocol: req.ip,
                }).into('logs')];
            case 9:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '002-3',
                    reason: '비밀번호가 일치하지 않습니다.'
                });
            case 10: return [3 /*break*/, 12];
            case 11:
                e_9 = _b.sent();
                return [2 /*return*/, res.send({
                        Success: e_9.Success,
                        Status: e_9.Status,
                        Code: e_9.Code,
                        reason: e_9.reason
                    })];
            case 12: return [2 /*return*/];
        }
    });
}); });
router.post('/admin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, username, realname, admin_password, admin, salt, e_10;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 12, , 13]);
                _a = req.body, password = _a.password, username = _a.username, realname = _a.realname, admin_password = _a.admin_password;
                if (!(!password || !username || !realname || !password)) return [3 /*break*/, 2];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 1:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-2',
                    reason: '필요한 데이터가 포함되어 있지 않습니다.'
                });
            case 2:
                if (!(password === Master_Key)) return [3 /*break*/, 9];
                return [4 /*yield*/, database_1.db.select('*').from('admin').where('username', username)];
            case 3:
                admin = (_b.sent())[0];
                if (!!admin) return [3 /*break*/, 6];
                salt = ranStr_1.default(20, true);
                return [4 /*yield*/, database_1.db.insert({
                        username: username,
                        realname: realname,
                        password: hash_1.default(admin_password + salt),
                        salt: salt
                    }).into('admin')];
            case 4:
                _b.sent();
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin',
                        status: 1,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 5:
                _b.sent();
                return [2 /*return*/, res.send({
                        Success: true,
                        Status: 'Success',
                        reason: '정상적으로 처리되었습니다.'
                    })];
            case 6: return [4 /*yield*/, database_1.db.insert({
                    type: 'admin',
                    status: 0,
                    Internet_Protocol: req.ip,
                }).into('logs')];
            case 7:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '004-2',
                    reason: '이미 존재하는 관리자입니다.'
                });
            case 8: return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, database_1.db.insert({
                    type: 'admin',
                    status: 0,
                    Internet_Protocol: req.ip,
                }).into('logs')];
            case 10:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '002-3',
                    reason: '비밀번호가 일치하지 않습니다.'
                });
            case 11: return [3 /*break*/, 13];
            case 12:
                e_10 = _b.sent();
                return [2 /*return*/, res.send({
                        Success: e_10.Success,
                        Status: e_10.Status,
                        Code: e_10.Code,
                        reason: e_10.reason
                    })];
            case 13: return [2 /*return*/];
        }
    });
}); });
router.post('/admin_del', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, username, admin, e_11;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 12, , 13]);
                _a = req.body, password = _a.password, username = _a.username;
                if (!(!username || !password)) return [3 /*break*/, 2];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_del',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 1:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '001-2',
                    reason: '필요한 데이터가 포함되어 있지 않습니다.'
                });
            case 2:
                if (!(password === Master_Key)) return [3 /*break*/, 9];
                return [4 /*yield*/, database_1.db.select('*').from('admin').where('username', username)];
            case 3:
                admin = (_b.sent())[0];
                if (!!admin) return [3 /*break*/, 5];
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_del',
                        status: 0,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 4:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '004-1',
                    reason: '존재하지 않는 관리자입니다.'
                });
            case 5: return [4 /*yield*/, database_1.db.delete().from('admin').where('username', username)];
            case 6:
                _b.sent();
                return [4 /*yield*/, database_1.db.insert({
                        type: 'admin_del',
                        status: 1,
                        Internet_Protocol: req.ip,
                    }).into('logs')];
            case 7:
                _b.sent();
                return [2 /*return*/, res.send({
                        Success: true,
                        Status: 'Success',
                        reason: '정상적으로 처리되었습니다.'
                    })];
            case 8: return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, database_1.db.insert({
                    type: 'admin_del',
                    status: 0,
                    Internet_Protocol: req.ip,
                }).into('logs')];
            case 10:
                _b.sent();
                throw ({
                    Success: false,
                    Status: 'Error',
                    Code: '002-3',
                    reason: '비밀번호가 일치하지 않습니다.'
                });
            case 11: return [3 /*break*/, 13];
            case 12:
                e_11 = _b.sent();
                return [2 /*return*/, res.send({
                        Success: e_11.Success,
                        Status: e_11.Status,
                        Code: e_11.Code,
                        reason: e_11.reason
                    })];
            case 13: return [2 /*return*/];
        }
    });
}); });
// router.get('/ClassTest', async (req, res) => {
//   const { type } = req.query
//   if (type === '정답') {
//     const perfect = fs.readFileSync('perfect.txt').toString()
//     return res.send(perfect)
//   } else if (type === '시간') {
//     const time = fs.readFileSync('time_lock.txt').toString()
//     return res.send(time)
//   } else {
//     const normal = fs.readFileSync('normal.txt').toString()
//     return res.send(normal)
//   }
// })
exports.default = router;
