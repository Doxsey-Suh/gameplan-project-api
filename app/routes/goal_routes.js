const express = require('express')
const passport = require('passport')

const Goal = require('../models/goal')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Create Goal
router.post('/goals', requireToken, (req, res, next) => {
  req.body.goal.owner = req.user.id

  Goal.create(req.body.goal)
    .then(goal => {
      res.status(201).json({ goal: goal.toObject() })
    })
    .catch(next)
})

// Delete Goal
router.delete('/goals/:id', requireToken, (req, res, next) => {
  Goal.findById(req.params.id)
    .then(handle404)
    .then(goal => {
      requireOwnership(req, goal)
      goal.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// Show all Goals
router.get('/goals', (req, res, next) => {
  Goal.find()
    .then(goals => {
      return goals.map(goal => goal.toObject())
    })
    .then(goals => res.status(200).json({ goals: goals }))
    .catch(next)
})

// Show one Goal
router.get('/goals/:id', (req, res, next) => {
  Goal.findById(req.params.id)
    .then(handle404)
    .then(goal => res.status(200).json({ goal: goal.toObject() }))
    .catch(next)
})

// Show User's Goals
router.get('/goals-user', requireToken, (req, res, next) => {
  // console.log(req.user)
  Goal.find({'owner': req.user.id})
    .then(handle404)
    .then(goals => {
      return goals.map(goal => {
        requireOwnership(req, goal)
        return goal.toObject()
      })
    })
    .then(goals => {
    // console.log(goals)
      res.status(200).json({ goals: goals })
    })
    .catch(next)
})

// Update Goal
router.patch('/goals/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.goal.owner

  Goal.findById(req.params.id)
    .then(handle404)
    .then(goal => {
      requireOwnership(req, goal)
      return goal.updateOne(req.body.goal)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.get('/goals-tag/:tag', (req, res, next) => {
  // console.log(req.user)
  Goal.find({'tag': req.params.tag})
    .then(handle404)
    .then(goals => {
      return goals.map(goal => {
        return goal.toObject()
      })
    })
    .then(goals => {
      res.status(200).json({ goals: goals })
    })
    .catch(next)
})

module.exports = router