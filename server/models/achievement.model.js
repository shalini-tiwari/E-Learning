import mongoose from 'mongoose'
import Mongoose from 'mongoose'

const achievementSchema = new mongoose.Schema({
  course: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    assignment: {
      type: Number,
      default: 0,
    },
    exam: {
      type: Number,
      default: 0,
    },
  },
})

const Achievement = mongoose.model('Achievement', achievementSchema)

export default Achievement
