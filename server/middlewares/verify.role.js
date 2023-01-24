export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.sendStatus(403)
  }
  next()
}
export const isFaculty = (req, res, next) => {
  if (req.user.role !== 'faculty') {
    return res.sendStatus(403)
  }
  next()
}

export const isStudent = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.sendStatus(403)
  }
  next()
}
