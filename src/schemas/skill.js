import Mongoose from 'mongoose'

const {Schema} = Mongoose

const skillSchema = new Schema(
  {
    name: {type: String, required: true},
    category: String,
    image: String,
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    meta: {
      completed: {type: Number, default: 0}
    }
  },
  {timestamps: true}
)

skillSchema.statics.get = function (query) {
  return typeof query === 'string' ? this.findOne(query) : this.find(query)
}

export default Mongoose.model('Skill', skillSchema)
