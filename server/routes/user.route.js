import express from 'express'
import {
  addUser,
  deleteUser,
  updateUser,
  loginUser,
  getUser,
  getAchievement,
} from '../controllers/user.controller.js'
import { isAdmin } from '../middlewares/verify.role.js'
import { authenticateToken } from '../middlewares/verify.token.js'

const router = express.Router()

router.post('/', addUser)
router.get('/achievements', authenticateToken, getAchievement)
router.get('/profile', authenticateToken, getUser)
router.delete('/:id', [authenticateToken, isAdmin], deleteUser)
router.put('/:id', authenticateToken, updateUser)
router.post('/login', loginUser)

export { router as userRouter }
