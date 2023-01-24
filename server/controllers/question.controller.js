import Question from '../models/question.model.js'

export const getQuestions = (req, res) => {
  Question.find({ course: req.params.id, isExam: false })
    .limit(10)
    .exec((err, questions) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving questions.',
        })
      } else {
        res.send(questions)
      }
    })
}

export const getExamQuestions = (req, res) => {
  Question.find({ course: req.params.id, isExam: true })
    .limit(10)
    .exec((err, questions) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving questions.',
        })
      } else {
        res.send(questions)
      }
    })
}

export const createQuestion = (req, res) => {
  new Question({
    ...req.body,
  }).save((err, question) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Question.',
      })
    } else {
      res.send(question)
    }
  })
}

export const deleteQuestion = (req, res) => {
  Question.findByIdAndRemove(req.params.id, (err, question) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving questions.',
      })
    } else {
      res.send(question)
    }
  })
}

export const updateQuestion = (req, res) => {
  Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, question) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving questions.',
        })
      } else {
        res.send(question)
      }
    }
  )
}
