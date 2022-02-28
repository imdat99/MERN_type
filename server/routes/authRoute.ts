import express from 'express'
import authCtrl from '../controller/authCtrl';
import verifyCookie from '../middleware/verifyCookie';
import verifyToken from '../middleware/verifyToken';

const router = express.Router()

router.get('/', verifyToken, authCtrl.setAuth)
router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)
router.get('/refreshtoken', verifyCookie, authCtrl.reqRefreshtoken)
router.get('/logout', verifyCookie, authCtrl.logout)

export default router;