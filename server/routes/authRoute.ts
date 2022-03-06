import express from 'express'
import authCtrl from '../controller/authCtrl';
import verifyRefreshToken from '../middleware/verifyRefreshToken';
import verifyToken from '../middleware/verifyToken';

const router = express.Router()

router.get('/', verifyToken, authCtrl.setAuth)

router.post('/', verifyToken, authCtrl.changePass)

router.post('/register', authCtrl.register)

router.post('/login', authCtrl.login)

router.get('/refreshtoken', verifyRefreshToken, authCtrl.reqRefreshtoken)

router.get('/logout', verifyRefreshToken, authCtrl.logout)

router.post('/forgot', authCtrl.forgot)

router.put('/reset', verifyToken, authCtrl.resetPass)

export default router;