const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { username, email, password } = req.body
  if(!username || !email || !password){
    return res.status(400).json({message: 'Please Enter all fields'})
  }
  
  try {
    const existingUser = await User.findOne({ email })
    if(existingUser){
      return res.status(409).json({message: 'Email is already taken'})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = {
      username,
      email,
      password: hashedPassword
    }
    const savedUser = await User.create(newUser)
    res.status(201).json({ 
      message: 'Registered Successful', 
      user: { id: savedUser._id, username: savedUser.username, email: savedUser.email } 
    })
 } catch (error) {
  console.log(error)
  res.status(500).json({error: 'Internal or Server error'})
 }
}

const login = async (req, res) => {
  const { email, password } = req.body
   if(!email || !password){
    return res.status(400).json({message: 'Please Enter email and password'})
  }
  try {
    const user = await User.findOne({ email }).select('+password')
    if(!user){
      return res.status(401).json({message: 'Invalid Credentials'})
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch){
      return res.status(401).json({message: 'Invalid Credentials'})
    }
    const accessToken = jwt.sign(
      {id: user._id, role: user.role, username: user.username}, 
      process.env.ACCESS_TOKEN_SECRET, 
      {expiresIn: '30m'})
    res.status(200).json({
    message: 'Login Successful',
    user: {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  },
    token: accessToken
  })

  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Internal or Server error'})
  }
}

module.exports ={
  register,
  login
}