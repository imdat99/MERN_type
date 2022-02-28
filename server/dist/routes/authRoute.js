"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authCtrl_1 = require("../controller/authCtrl");
const verifyCookie_1 = __importDefault(require("../middleware/verifyCookie"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = express_1.default.Router();
router.get('/', verifyToken_1.default, authCtrl_1.authCtrl.setAuth);
router.post('/register', authCtrl_1.authCtrl.register);
router.post('/login', authCtrl_1.authCtrl.login);
router.get('/refreshtoken', verifyCookie_1.default, authCtrl_1.authCtrl.reqRefreshtoken);
router.get('/logout', verifyCookie_1.default, authCtrl_1.authCtrl.logout);
exports.default = router;
