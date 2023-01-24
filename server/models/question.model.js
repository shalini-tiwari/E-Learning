import mongoose from 'mongoose'
import Mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    course: {
      type: Mongoose.Schema.Types.ObjectId,
    },
    isExam: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Question = mongoose.model('Question', questionSchema)

export default Question
