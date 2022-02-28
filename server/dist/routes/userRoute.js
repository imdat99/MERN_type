"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userCtrl_1 = __importDefault(require("../controller/userCtrl"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = express_1.default.Router();
router.get('/', verifyToken_1.default, userCtrl_1.default.getInfo);
router.put('/', verifyToken_1.default, userCtrl_1.default.updateInfo);
router.delete('/', verifyToken_1.default, userCtrl_1.default.deleteUser);
exports.default = router;
