"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./config/database");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const corsOptions = {
    //To allow requests from client
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1",
        "http://104.142.122.231",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
//Routes
app.get('/', (req, res) => {
    res.json({ msg: 'chào' });
});
app.use('/api/v1/auth', routes_1.default.authRouter);
app.use('/api/v1/todo', routes_1.default.todoRouter);
app.use('/api/v1/user', routes_1.default.userRouter);
//server listenning
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('running on port', PORT);
});
