import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import './config/database'
import routes from './routes'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const corsOptions = {
    //To allow requests from client
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1",
        "https://vite-todo123.netlify.app/",
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(cookieParser())


//Routes
app.get('/', (req, res) => {
    res.json({ msg: 'chào' })
})

app.use('/api/v1/auth', routes.authRouter);
app.use('/api/v1/todo', routes.todoRouter);
app.use('/api/v1/user', routes.userRouter);

//server listenning
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('running on port', PORT)
})