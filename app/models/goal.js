const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  step1: {
    type: Array,
    ref: 'User',
    required: false
  }, 
    step2: {
    type: Array,
    ref: 'User',
    required: false
  }, 
    step3: {
    type: Array,
    ref: 'User',
    required: false
  }, 
    step4: {
    type: Array,
    ref: 'User',
    required: false
  }, 
    step5: {
    type: Array,
    ref: 'User',
    required: false
  }, 
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)
