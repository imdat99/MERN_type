import express from 'express'
import { authCtrl } from '../controller/authCtrl';
import verfytoken from '../middleware/verifyToken';

const router = express.Router()

router.get('/', verfytoken, authCtrl.setAuth)
router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)

export default router;