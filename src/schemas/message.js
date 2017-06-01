import Mongoose from 'mongoose'

import Lesson from './lesson'

const {Schema} = Mongoose

const messageSchema = new Schema(
  {
    name: String,
    order: {type: Number, default: 0},
    section: {type: Number, default: 0},
    blocks: {type: [Schema.Types.Mixed], default: []},
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  },
  {timestamps: true}
)

const Message = Mongoose.model('Message', messageSchema)

export default Message

export const createMessage = (req, res) => {
  if (!req.user) {
    return res.sendStatus(500)
  }
  Lesson.findById(req.params.id, (err, lesson) => {
    if (err || !lesson) { return res.sendStatus(500) }

    const section = lesson.sections.id(req.params.section)
    if (!section) { return res.sendStatus(500) }

    const message = new Message({owner: req.user._id})
    message.save(err => {
      if (err) { return res.sendStatus(500) }
      section.messages.push(message._id)
      lesson.save(err => {
        if (err) { return res.sendStatus(500) }
        return res.json({lesson, message})
      })
    })
  })
}

export const updateMessage = (req, res) => {
  if (!req.user) {
    return res.sendStatus(500)
  }
  Message.findById(req.params.id, (err, message) => {
    if (err || !message || !message.owner.equals(req.user._id)) {
      return res.sendStatus(500)
    }
    message.update(req.body, (err) => {
      if (err) {
        return res.sendStatus(500)
      }
      res.json({message})
    })
  })
}

export const deleteMessage = (req, res) => {
  if (!req.user) {
    return res.sendStatus(500)
  }
  Message.findById(req.params.id, (err, message) => {
    if (err || !message || !message.owner.equals(req.user._id)) {
      return res.sendStatus(500)
    }
    message.remove((err) => {
      if (err) {
        return res.sendStatus(500)
      }
      res.json({success: true})
    })
  })
}
