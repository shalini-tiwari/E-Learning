import Feedback from '../models/feedback.model.js'

// send a feedback email
export const sendFeedback = async (req, res) => {
  const { name, email, message } = req.body
  await new Feedback({ name, email, message }).save()
  const templateParams = {
    name,
    email,
    message,
  }
  res.status(200).json({ message: 'Feedback sent' })
}
