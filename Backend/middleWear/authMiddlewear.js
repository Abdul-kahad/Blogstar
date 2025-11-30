const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' })
  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    next()
  } catch (error) {
    console.log(error)
    if (error.name === 'TokenExpiredError') {
    return res.status(403).json({ message: 'Token expired. Please log in again.' })
    }
    res.status(403).json({ message: 'Invalid token' })
    }
}

const authorize = (roles = []) => {
  if(typeof(roles) === 'string'){
    roles = [roles]
  }
   return (req, res, next) => {
    const userRole = req.user.role
     if(roles.length && !roles.includes(userRole)){
       return res.status(403).json({message: 'You are not Authorized'})
     }
     next()
  }
}

module.exports = {
  authenticate,
  authorize
}