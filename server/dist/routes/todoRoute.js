"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoCtrl_1 = __importDefault(require("../controller/todoCtrl"));
const verifyParams_1 = __importDefault(require("../middleware/verifyParams"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = express_1.default.Router();
router.get('/', verifyToken_1.default, verifyParams_1.default, todoCtrl_1.default.getTodos);
router.post('/', verifyToken_1.default, todoCtrl_1.default.addTodo);
router.put('/:todoId', verifyToken_1.default, todoCtrl_1.default.updateTodos);
router.delete('/:todoId', verifyToken_1.default, todoCtrl_1.default.deleteTodos);
exports.default = router;
