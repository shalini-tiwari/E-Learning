import mongoose from 'mongoose'
import Mongoose from 'mongoose'

const receiptSchema = new mongoose.Schema({
  course: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const Receipt = mongoose.model('Receipt', receiptSchema)

export default Receipt
