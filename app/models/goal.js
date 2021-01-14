const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  steps: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Step'
  } ,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)
