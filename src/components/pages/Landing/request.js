import mongoose from 'mongoose'

import Lesson from '../../../schemas/lesson'
import User from '../../../schemas/user'
import Report from '../../../schemas/report'

/*
 * Landing Page Request
 */
export default ({req, res, params, location}) => new Promise((resolve, reject) => {
  if (!req.user && !req.session.tempID) {
    req.session.tempID = new mongoose.Types.ObjectId()
  }
  const owner = req.user ? req.user._id : req.session.tempID
  Lesson.find({}).sort('-stars').limit(20).populate('owner', 'name image stars')
    .exec((err, lessons) => {
      if (err || !lessons) {
        return reject()
      }
      const owners = []
      lessons.forEach(l => {
        if (!owners.includes(l.owner)) {
          owners.push(l.owner)
        }
      })

      resolve({data: {lessons}, blueprint: {lessons: lessons.map(l => l._id.toString())}})
    })
})
