const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    index: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema)