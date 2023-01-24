import express from 'express'
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getExamQuestions,
} from '../controllers/question.controller.js'
import { isFaculty } from '../middlewares/verify.role.js'
import { authenticateToken } from '../middlewares/verify.token.js'

const router = express.Router()

router.post('/', [authenticateToken, isFaculty], createQuestion)
router.get('/e/:id', [authenticateToken], getExamQuestions)
router.put('/q/:id', [authenticateToken, isFaculty], updateQuestion)
router.delete('/q/:id', [authenticateToken, isFaculty], deleteQuestion)
router.get('/:id', [authenticateToken], getQuestions)

export { router as assignmentRouter }
