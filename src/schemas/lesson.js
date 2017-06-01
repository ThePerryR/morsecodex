import Mongoose from 'mongoose'

import Message from './message'
import User from './user'

const {Schema} = Mongoose

const Section = Schema({
  name: String,
  messages: {type: [{type: Schema.Types.ObjectId, ref: 'Message'}], default: []}
})

const lessonSchema = Schema({
  name: String,
  about: String,
  type: String,
  image: String,
  value: Object,
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  sections: {type: [Section], default: []},
  category: String,
  subcategory: String,
  completions: {type: Number, default: 0},
  students: {type: Number, default: 0},
  stars: {type: Number, default: 0},
  totalMessages: {type: Number, default: 0},
  active: {type: Boolean, default: true},
  private: {type: Boolean, default: true},
  blocks: [Schema.Types.Mixed],
  meta: Schema.Types.Mixed
}, {
  timestamps: true
})

lessonSchema.index({name: 'text'})

const Lesson = Mongoose.model('Lesson', lessonSchema)
export default Lesson

export const fetchLessons = (req, res) => {
  if (!req.user) {
    return res.sendStatus(500)
  }
  Lesson.find({}).exec((err, lessons) => {
    if (err || !lessons) {
      return res.sendStatus(500)
    }
    return res.json({lessons})
  })
}

export const createLesson = (req, res) => {
  if (!req.user) {
    return res.sendStatus(500)
  }
  const lesson = new Lesson({
    owner: req.user._id,
    blocks: []
  })
  lesson.save(err => {
    if (err) {
      return res.sendStatus(500)
    }
    res.json({lesson})
  })
}

export const updateLesson = (req, res) => {
  if (!req.user) {
    return res.sendStatus(500)
  }
  Lesson.findById(req.params.id, (err, lesson) => {
    if (err || !lesson || !lesson.owner.equals(req.user._id)) {
      return res.sendStatus(500)
    }
    lesson.name = req.body.name || lesson.name
    lesson.type = req.body.type === undefined ? lesson.type : req.body.type
    lesson.meta = req.body.meta === undefined ? lesson.meta : req.body.meta
    lesson.blocks = req.body.blocks === undefined ? lesson.blocks : req.body.blocks
    lesson.active = req.body.active === undefined ? lesson.active : req.body.active
    lesson.private = req.body.private === undefined ? lesson.private : req.body.private
    lesson.value = req.body.value || lesson.value
    lesson.category = req.body.category === undefined ? lesson.category : req.body.category
    lesson.subcategory = req.body.subcategory === undefined ? lesson.subcategory : req.body.subcategory

    lesson.save((err) => {
      if (err) {
        return res.sendStatus(500)
      }
      res.json({lesson})
    })
  })
}

export const deleteLesson = (req, res) => {
  if (!req.user) {
    return res.sendStatus(500)
  }
  Lesson.findById(req.params.id, (err, lesson) => {
    if (err || !lesson || !lesson.owner.equals(req.user._id)) {
      return res.sendStatus(500)
    }
    lesson.remove((err) => {
      if (err) {
        return res.sendStatus(500)
      }
      Message.find({lesson: lesson._id}).remove().exec()
      res.json({success: true})
    })
  })
}

export const toggleStar = (req, res) => {
  if (!req.user) {
    return res.sendStatus(500)
  }
  User.findById(req.user._id, (err, user) => {
    if (err || !user) {
      return res.sendStatus(500)
    }
    const starIndex = user.stars.findIndex(s => s.equals(req.params.id))

    if (starIndex >= 0) {
      user.stars.splice(starIndex, 1)
      Lesson.findByIdAndUpdate(req.params.id, {$inc: {stars: -1}}).exec()
    } else {
      user.stars.push(req.params.id)
      Lesson.findByIdAndUpdate(req.params.id, {$inc: {stars: 1}}).exec()
    }
    user.save((err) => {
      if (err) {
        return res.sendStatus(500)
      }
      res.json({user})
    })
  })
}
