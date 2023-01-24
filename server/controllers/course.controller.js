import Course from '../models/course.model.js'
import Receipt from '../models/receipt.model.js'
import Achievement from '../models/achievement.model.js'

// Add a new course
export const addCourse = (req, res) => {
  try {
    const course = new Course({
      name: req.body.name,
      category: req.body.category,
      instructors: req.user.id,
      description: req.body.description,
      imgUrl: req.body.imgUrl,
      videos: req.body.videos,
    })

    course.save((err) => {
      if (err) {
        res.send(err)
      }
      res.status(201).json({
        message: 'Course created!',
      })
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}

// Delete a course
export const deleteCourse = (req, res) => {
  try {
    Course.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        res.send(err)
      }
      res.status(200).json({
        message: 'Course deleted!',
      })
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}

// Update a course
export const updateCourse = (req, res) => {
  try {
    Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (err) => {
        if (err) {
          res.send(err)
        }
        res.status(200).json({
          message: 'Course updated!',
        })
      }
    )
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}

// List enrolled courses
export const listCourse = (req, res) => {
  if (req.user.role === 'student') {
    try {
      Receipt.find({ user: req.user.id }, (err, courses) => {
        if (err) {
          res.send(err)
        }
        res.status(200).json(courses)
      }).populate({
        path: 'course',
        populate: {
          path: 'instructors',
          model: 'User',
          select: 'name photoUrl',
        },
      })
    } catch (error) {
      res.status(400).json({
        message: error,
      })
    }
  } else {
    try {
      Course.find({ instructors: [req.user.id] }, (err, courses) => {
        if (err) {
          res.send(err)
        }
        res.status(200).json(courses)
      })
    } catch (error) {
      res.status(400).json({
        message: error,
      })
    }
  }
}

export const enrollCourse = (req, res) => {
  try {
    const receipt = Receipt.findOne({
      course: req.body.course,
      user: req.user.id,
    }).then((receipt) => {
      if (receipt) {
        res.status(409).json({
          message: 'You are already enrolled in this course!',
        })
      } else {
        const receipt = new Receipt({
          course: req.body.course,
          user: req.user.id,
          amount: req.body.amount,
        })

        receipt.save((err) => {
          if (err) {
            res.send(err)
          }
          res.status(201).json({
            message: 'Course enrolled!',
          })
        })
      }
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}

export const getCourse = (req, res) => {
  try {
    Course.findById(req.params.id, (err, course) => {
      if (err) {
        res.send(err)
      }
      res.status(200).json(course)
    }).populate({
      path: 'instructors',
      model: 'User',
      select: 'name photoUrl',
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}

export const exploreCourse = (req, res) => {
  try {
    Course.find({}, (err, courses) => {
      if (err) {
        res.send(err)
      }
      res.status(200).json(courses)
    }).limit(9)
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}

export const exploreAllCourse = (req, res) => {
  try {
    Course.find({}, (err, courses) => {
      if (err) {
        res.send(err)
      }
      res.status(200).json(courses)
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}

//Update course score
export const updateCourseScore = (req, res) => {
  Achievement.findOne(
    { course: req.params.id, user: req.user.id },
    (err, achievement) => {
      if (err) {
        res.send(err)
      }
      if (achievement) {
        try {
          Course.findById(req.params.id, (err, course) => {
            if (err) {
              res.send(err)
            }
            if (course) {
              if (req.body.score.assignment) {
                achievement.score.assignment = req.body.score.assignment
              }
              if (req.body.score.exam) {
                achievement.score.exam = req.body.score.exam
                if (req.body.score.exam >= 4) {
                  Receipt.findOneAndUpdate(
                    { user: req.user.id, course: req.params.id },
                    { isCompleted: true },
                    (err) => {
                      if (err) {
                        res.send(err)
                      }
                    }
                  )
                }
              }
              achievement.save((err) => {
                if (err) {
                  res.send(err)
                }
                res.status(200).json({
                  data: achievement,
                })
              })
            }
          })
        } catch (error) {
          res.status(400).json({
            message: error,
          })
        }
      } else {
        try {
          const achievement = new Achievement({
            course: req.params.id,
            user: req.user.id,
            score: {
              assignment: req.body.score.assignment,
              exam: req.body.score.exam,
            },
          })

          achievement.save((err) => {
            if (err) {
              res.send(err)
            }
            res.status(201).json({
              message: 'Course score updated!',
            })
          })
        } catch (error) {
          res.status(400).json({
            message: error,
          })
        }
      }
    }
  )
}

export const getScore = (req, res) => {
  try {
    Achievement.findOne(
      { course: req.params.id, user: req.user.id },
      (err, achievement) => {
        if (err) {
          res.send(err)
        }
        if (achievement) {
          res.status(200).json({
            achievement,
          })
        } else {
          res.status(404).json({
            message: 'No score found!',
          })
        }
      }
    )
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}

export const unenrollCourse = (req, res) => {
  try {
    Receipt.findOneAndDelete(
      { course: req.params.id, user: req.user.id, isCompleted: false },
      (err) => {
        if (err) {
          res.send(err)
        }
        res.status(200).json({
          message: 'Course unenrolled!',
        })
      }
    )
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}
