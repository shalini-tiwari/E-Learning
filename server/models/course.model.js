import mongoose from 'mongoose'
import Mongoose from 'mongoose'

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      minlength: 3,
      maxlength: 1000,
    },
    instructors: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
    imgUrl: {
      type: String,
      default: undefined,
    },
  },
  { timestamps: true }
)

const Course = mongoose.model('Course', courseSchema)

export default Course
