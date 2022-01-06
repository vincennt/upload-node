const verifyUser = (req, res, next) => {
    if (req.user) {
      next()
    } else {
      res.status(401).json({ error: "Unauthorized" })
    }
  }
  
  module.exports = verifyUser