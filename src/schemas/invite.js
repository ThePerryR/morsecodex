import Mongoose from 'mongoose'

const { Schema } = Mongoose

const inviteSchema = new Schema(
  {
    email: { type: String, required: true },
    validation_id: { type: String, required: true },
    tempID: String
  },
  {
    timestamps: true
  }
)

const Invite = Mongoose.model('Invite', inviteSchema)

export default Invite
