import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import dbConnection from './config/db.js'
import { userRouter } from './routes/user.route.js'
import { courseRouter } from './routes/course.route.js'
import { assignmentRouter } from './routes/assignment.route.js'
import { feedbackRouter } from './routes/feedback.route.js'

dotenv.config()

const app = express()

app.disable('x-powered-by')

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// Routes
app.use('/user', userRouter)
app.use('/course', courseRouter)
app.use('/assignment', assignmentRouter)
app.use('/feedback', feedbackRouter)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to  E-Learning-Platform' })
})

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' })
})

const PORT = process.env.PORT || 3000

const connect = () => {
  dbConnection().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
}

connect()
