import Mongoose from 'mongoose'

const { Schema } = Mongoose

const sessionSchema = new Schema({
  sessionActivity: { type: Date, expires: '15s', default: Date.now }, // Expire after 15 s
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Session = Mongoose.model('Session', sessionSchema)

export default Session
