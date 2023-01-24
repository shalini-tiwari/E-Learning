import express from 'express'
import {
  addCourse,
  deleteCourse,
  updateCourse,
  listCourse,
  enrollCourse,
  exploreAllCourse,
  getCourse,
  exploreCourse,
  updateCourseScore,
  getScore,
  unenrollCourse,
} from '../controllers/course.controller.js'
import { isAdmin, isFaculty, isStudent } from '../middlewares/verify.role.js'
import { authenticateToken } from '../middlewares/verify.token.js'

const router = express.Router()

router.get('/', [authenticateToken], listCourse)
router.post('/', [authenticateToken, isFaculty], addCourse)
router.put('/update/score/:id', [authenticateToken], updateCourseScore)
router.get('/score/:id', [authenticateToken], getScore)
router.get('/explore', exploreCourse)
router.get('/exploreall', exploreAllCourse)
router.put('/enroll', [authenticateToken, isStudent], enrollCourse)
router.delete('/unenroll/:id', [authenticateToken, isStudent], unenrollCourse)
router.get('/:id', [authenticateToken], getCourse)
router.delete('/:id', [authenticateToken, isAdmin], deleteCourse)
router.put('/:id', [authenticateToken, isFaculty], updateCourse)

export { router as courseRouter }
