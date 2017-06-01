import Mongoose from 'mongoose'

const { Schema } = Mongoose

const Sticker = new Schema({
  img: String,
  x: { type: Number, default: 0 },
  y: { type: Number, default: 0 },
  rotate: { type: Number, default: 0 }
})

export default Sticker
