"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncWrapper_1 = __importDefault(require("../middleware/asyncWrapper"));
const returnRes_1 = __importDefault(require("../middleware/returnRes"));
const dbRefreshToken_1 = __importDefault(require("../models/dbRefreshToken"));
const profiles_1 = __importDefault(require("../models/profiles"));
const todos_1 = __importDefault(require("../models/todos"));
const users_1 = __importDefault(require("../models/users"));
const userCtrl = {
    getInfo: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const results = yield profiles_1.default.findOne({ id: req.uId });
        const { username } = yield users_1.default.findOne({ _id: req.uId });
        returnRes_1.default.res200(res, { results: { profile: results, username } });
    })),
    updateInfo: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { fullName, phoneNumber, dob, email } = req.body;
        const results = yield profiles_1.default.findOneAndUpdate({ id: req.uId }, { fullName, phoneNumber, dob, email }, { new: true });
        returnRes_1.default.res200(res, { results });
    })),
    deleteUser: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield users_1.default.findByIdAndRemove({ _id: req.uId });
        yield profiles_1.default.findOneAndRemove({ id: req.uId });
        yield dbRefreshToken_1.default.findOneAndRemove({ id: req.uId });
        yield todos_1.default.deleteMany({ id: req.uId });
        returnRes_1.default.res200(res);
    }))
};
exports.default = userCtrl;
