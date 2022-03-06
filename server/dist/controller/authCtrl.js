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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const users_1 = __importDefault(require("../models/users"));
const dbRefreshToken_1 = __importDefault(require("../models/dbRefreshToken"));
const profiles_1 = __importDefault(require("../models/profiles"));
const generateTokens_1 = __importStar(require("../middleware/generateTokens"));
const asyncWrapper_1 = __importDefault(require("../middleware/asyncWrapper"));
const returnRes_1 = __importDefault(require("../middleware/returnRes"));
const sendMail_1 = __importDefault(require("../middleware/sendMail"));
const authCtrl = {
    setAuth: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield users_1.default.findById(req.uId).select('-password');
        if (!user)
            return returnRes_1.default.res400(res, "User not found");
        return returnRes_1.default.res200(res, user);
    })),
    register: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, username, password } = req.body;
        if (!email || !username || !password)
            return returnRes_1.default.res400(res, "Missing email, username or password");
        // check exitsting user
        const user = yield users_1.default.findOne({ username });
        if (user)
            return returnRes_1.default.res400(res, "Username is Used");
        // All good
        // register new user
        const hashedPassword = yield argon2_1.default.hash(password);
        const newUser = new users_1.default({ username, password: hashedPassword });
        yield newUser.save();
        // create new profile
        const newProfile = new profiles_1.default({
            id: newUser._id,
            fullName: null,
            phoneNumber: null,
            dob: null,
            email
        });
        yield newProfile.save();
        // create new refreshtoken array
        const newRefreshToken = new dbRefreshToken_1.default({
            id: newUser._id,
            refreshToken: []
        });
        yield newRefreshToken.save();
        // create accesstoken and refreshtoken
        const token = (0, generateTokens_1.default)({ uId: newUser._id });
        // return token
        returnRes_1.default.resCookie(res, token);
    })),
    login: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        const user = yield users_1.default.findOne({ username });
        if (!user)
            return returnRes_1.default.res400(res, "Incorrect username or password");
        const passwordValid = yield argon2_1.default.verify(user.password, password);
        if (!passwordValid)
            return returnRes_1.default.res400(res, "Incorrect username or password");
        const token = (0, generateTokens_1.default)({ uId: user._id });
        returnRes_1.default.resCookie(res, token);
    })),
    changePass: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { oldpass, password } = req.body;
        const user = yield users_1.default.findById({ _id: req.uId });
        if (!user)
            return returnRes_1.default.res400(res, "User not found");
        const passwordValid = yield argon2_1.default.verify(user.password, oldpass);
        if (!passwordValid)
            return returnRes_1.default.res400(res, "Incorrect password");
        const hashedPassword = yield argon2_1.default.hash(password);
        let updatedpass = { password: hashedPassword };
        updatedpass = (yield users_1.default.findByIdAndUpdate({ _id: req.uId }, updatedpass, { new: true }));
        returnRes_1.default.res200(res);
    })),
    reqRefreshtoken: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield dbRefreshToken_1.default.findOneAndUpdate({ id: req.uId }, { $pull: { refreshToken: { $in: [req.refreshToken] } } });
        const token = (0, generateTokens_1.default)({ uId: req.uId });
        returnRes_1.default.resCookie(res, token);
    })),
    logout: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield dbRefreshToken_1.default.findOneAndUpdate({ id: req.uId }, { $pull: { refreshToken: { $in: [req.refreshToken] } } });
        const token = {
            accessToken: '',
            refreshToken: ''
        };
        returnRes_1.default.resCookie(res, token);
    })),
    resetPass: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { password } = req.body;
        console.log(password);
        const hashedPassword = yield argon2_1.default.hash(password);
        let updatedpass = { password: hashedPassword };
        updatedpass = (yield users_1.default.findByIdAndUpdate({ _id: req.uId }, updatedpass, { new: true }));
        returnRes_1.default.res200(res);
    })),
    forgot: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = req.body;
        const user = yield users_1.default.findOne({ username });
        if (!user)
            return returnRes_1.default.res400(res, 'User not found');
        const profile = yield profiles_1.default.findOne({ id: user._id });
        yield (0, sendMail_1.default)(profile.email, (0, generateTokens_1.tempToken)({ uId: user._id }), res);
    })),
};
exports.default = authCtrl;
