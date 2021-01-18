const express = require('express')
const router = express.Router()

// require step model
const Goal = require('./../models/step')
// const handle404 = require('./../lib/custom_errors')

// CREATE
// POST /steps/
router.post('/steps', (req, res, next) => {
  // get the step data from the body of the request
  const stepData = req.body.step
  // get the step id from the body
  const stepId = stepData.stepId
  // find the step by its id
  Goal.findById(stepId)
    // .then(handle404)
    .then(step => {
      // add step to step
      step.steps.push(stepData)
      // save step
      return step.save()
    })
    // send responsne back to client
    .then(step => res.status(201).json({step: step}))
    .catch(next)
})

// DESTROY
// DELETE /steps/:id
router.delete('/steps/:stepId', (req, res, next) => {
  const stepId = req.params.stepId
  Goal.findById(stepId)
    // .then(handle404)
    .then(step => {
      step.steps.id(stepId).remove()
      // Alternatively
      // steps.steps.pull(id)

      return step.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// UPDATE
// PATCH /steps/:id
router.patch('/steps/:stepId', (req, res, next) => {
  const stepId = req.params.stepId
  const stepData = req.body.step

  Goal.findById(stepId)
    // .then(handle404)
    .then(step => {
      const step = step.steps.id(stepId)
      step.set(stepData)
      return step.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
