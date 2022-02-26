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
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())


//Routes
app.get('/', (req, res) => {
    res.json({ msg: 'chào' })
})

app.use('/api/auth', routes.authRouter);

//server listenning
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('running on port', PORT)
})