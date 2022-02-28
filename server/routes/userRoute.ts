import express from 'express'
import userCtrl from '../controller/userCtrl';
import verifyToken from '../middleware/verifyToken';

const router = express.Router()

router.get('/', verifyToken, userCtrl.getInfo)
router.put('/', verifyToken, userCtrl.updateInfo)
router.delete('/', verifyToken, userCtrl.deleteUser)


export default router;