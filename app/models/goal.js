const mongoose = require('mongoose')
const stepSchema = require('./step')

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  steps: [stepSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)
