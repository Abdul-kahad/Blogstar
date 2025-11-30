const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User'
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)