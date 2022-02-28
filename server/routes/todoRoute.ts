import express from 'express'
import todoCtrl from '../controller/todoCtrl';
import verifyParams from '../middleware/verifyParams';
import verifyToken from '../middleware/verifyToken';

const router = express.Router()

router.get('/', verifyToken, verifyParams, todoCtrl.getTodos)
router.post('/', verifyToken, todoCtrl.addTodos)
router.put('/:todoId', verifyToken, todoCtrl.updateTodos)
router.delete('/:todoId', verifyToken, todoCtrl.deleteTodos)

export default router;