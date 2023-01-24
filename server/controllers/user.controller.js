import User from '../models/user.model.js'
import Achievement from '../models/achievement.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const addUser = (req, res) => {
  const newUser = new User(req.body)
  newUser.password = bcryptjs.hashSync(req.body.password, 10)
  newUser.save(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err,
      })
    } else {
      user.password = undefined
      return res.json(user)
    }
  })
}

export const deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      return res.status(400).send({
        message: err,
      })
    } else {
      return res.json(user)
    }
  })
}

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    console.log(updatedUser)
    return res.json(updatedUser)
  } catch (err) {
    return res.status(400).send({
      message: err,
    })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send({
        message: 'User not found',
      })
    }
    const isPasswordValid = bcryptjs.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).send({
        message: 'Invalid Password',
      })
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET
    )
    return res.json({
      token,
    })
  } catch (err) {
    return res.status(400).send({
      message: err,
    })
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    user.password = undefined
    return res.status(200).json(user)
  } catch (err) {
    res.status(400).send({
      message: err,
    })
  }
}

export const getAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.find({
      user: req.user.id,
    })
      .where('score.exam')
      .gt(4)
      .populate({
        path: 'course',
        select: 'name score category',
        model: 'Course',
      })
      .lean()
      .exec()
    return res.status(200).json(achievement)
  } catch (err) {
    res.status(400).send({
      message: err,
    })
  }
}
