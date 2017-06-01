import express from 'express'
import RateLimit from 'express-rate-limit'

import * as requests from '../components/pages/requests'
import { fetchLessons, createLesson, updateLesson, deleteLesson, toggleStar } from '../schemas/lesson'
import { createMessage, updateMessage, deleteMessage } from '../schemas/message'
import { updateAccount } from '../schemas/user'
import { updateReport } from '../schemas/report'

const router = express.Router({mergeParams: true})

router.use(new RateLimit({
  windowMs: 60 * 1000,
  max: 5000,
  delayMs: 0
}))

router.post('/page/:page', (req, res) => {
  requests[req.params.page]({req, res, params: req.body, location: req.originalUrl})
    .then(({data, blueprint}) => {
      res.json({data, blueprint})
    })
    .catch(() => res.sendStatus(500))
})
router.put('/report/:id', updateReport)

router.use((req, res, next) => {
  if (!req.user) {
    return res.sendStatus(404)
  }
  next()
})

router.put('/account', updateAccount)
router.get('/lesson', fetchLessons)
router.post('/lesson', createLesson)
router.put('/lesson/:id', updateLesson)
router.put('/lesson/:id/star', toggleStar)
router.delete('/lesson/:id', deleteLesson)
router.post('/lesson/:id/:section', createMessage)
router.put('/message/:id', updateMessage)
router.delete('/message/:id', deleteMessage)

export default router
