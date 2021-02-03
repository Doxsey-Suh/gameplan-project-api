'use strict'

const mongoose = require('mongoose')
const stepSchema = require('./step')

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
    // required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  step: [stepSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)
