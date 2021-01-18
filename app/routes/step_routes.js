const express = require('express')
const router = express.Router()

// require goal model
const Goal = require('./../models/goal')
// const handle404 = require('./../lib/custom_errors')

// CREATE
// POST /steps/
router.post('/steps', (req, res, next) => {
  // get the step data from the body of the request
  const stepData = req.body.step
  // get the goal id from the body
  const goalId = stepData.goalId
  // find the goal by its id
  Goal.findById(goalId)
    // .then(handle404)
    .then(goal => {
      // add step to goal
      goal.step.push(stepData)
      // save goal
      return goal.save()
    })
    // send responsne back to client
    .then(goal => res.status(201).json({goal: goal}))
    .catch(next)
})

// DESTROY
// DELETE /steps/:id
router.delete('/steps/:stepId', (req, res, next) => {
  const stepId = req.params.stepId
  const goalId = req.body.step.goalId
  Goal.findById(goalId)
    // .then(handle404)
    .then(goal => {
      goal.steps.id(stepId).remove()
      // Alternatively
      // goals.steps.pull(id)

      return goal.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// UPDATE
// PATCH /steps/:id
router.patch('/steps/:stepId', (req, res, next) => {
  const stepId = req.params.stepId
  const stepData = req.body.step
  const goalId = stepData.goalId

  Goal.findById(goalId)
    // .then(handle404)
    .then(goal => {
      const step = goal.steps.id(stepId)
      step.set(stepData)
      return goal.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
