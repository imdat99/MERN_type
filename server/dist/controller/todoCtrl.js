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
const todos_1 = __importDefault(require("../models/todos"));
const todoCtrl = {
    getTodos: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let todosData = yield todos_1.default.find({ id: req.uId });
        const { limit, offset } = req;
        todosData = todosData.filter((d, i) => {
            if (Number(limit) > 0 && Number(offset) > 0)
                return (i + 1 >= Number(offset) && i + 1 < (Number(offset) + Number(limit)));
            else if (Number(limit) > 0)
                return i < (Number(offset) + Number(limit));
            else
                return i >= Number(offset) - 1;
        });
        console.log(todosData.length);
        // { results: todosData, fullUrl }
        returnRes_1.default.res200(res, { results: todosData });
    })),
    addTodos: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, desc, status } = req.body;
        const newTodo = new todos_1.default({ id: req.uId, title, desc, status });
        yield newTodo.save();
        returnRes_1.default.res200(res, { results: newTodo });
    })),
    updateTodos: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, desc, status } = req.body;
        const results = yield todos_1.default.findByIdAndUpdate({ _id: req.params.todoId }, { title, desc, status }, { new: true });
        returnRes_1.default.res200(res, { results });
    })),
    deleteTodos: (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteTodo = yield todos_1.default.findByIdAndDelete({ _id: req.params.todoId });
        if (!deleteTodo)
            return returnRes_1.default.res404(res);
        returnRes_1.default.res200(res, { results: deleteTodo });
    }))
};
exports.default = todoCtrl;
