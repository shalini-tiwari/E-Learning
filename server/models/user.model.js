import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: undefined,
  },
  role: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    default: undefined,
  },
})

userSchema.methods.comparePassword = (password) => {
  return bcryptjs.compareSync(password, this.hash_password)
}

const User = mongoose.model('User', userSchema)

export default User
