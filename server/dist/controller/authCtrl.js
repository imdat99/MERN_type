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
exports.authCtrl = void 0;
const argon2_1 = __importDefault(require("argon2"));
const users_1 = __importDefault(require("../models/users"));
const generateTokens_1 = __importDefault(require("../middleware/generateTokens"));
const asyncWrapper_1 = __importDefault(require("../middleware/asyncWrapper"));
const returnRes_1 = __importDefault(require("../middleware/returnRes"));
exports.authCtrl = {
    setAuth: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(req)
        const user = yield users_1.default.findById(req.uId).select('-password');
        if (!user)
            return returnRes_1.default.res400(res, "User not found");
        return returnRes_1.default.res200(res, user);
        // res.json({ success: true, user })
    })),
    register: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        if (!username || !password)
            return returnRes_1.default.res400(res, "Missing username or password");
        // check exitsting user
        const user = yield users_1.default.findOne({ username });
        if (user)
            return returnRes_1.default.res400(res, "Username is Used");
        // All good
        const hashedPassword = yield argon2_1.default.hash(password);
        const newUser = new users_1.default({ username, password: hashedPassword });
        yield newUser.save();
        // return token
        const token = (0, generateTokens_1.default)({ uId: newUser._id });
        returnRes_1.default.resCookie(res, token);
    })),
    login: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        const user = yield users_1.default.findOne({ username });
        const Res = () => returnRes_1.default.res400(res, "Incorrect username or password");
        if (!user)
            return Res;
        const passwordValid = yield argon2_1.default.verify(user.password, password);
        if (!passwordValid)
            return Res;
        const token = (0, generateTokens_1.default)({ uId: user._id });
        returnRes_1.default.resCookie(res, token);
    })),
    reqRefreshtoken: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    }))
};