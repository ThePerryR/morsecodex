import Mongoose from 'mongoose'

const {Schema} = Mongoose

const chapterSchema = new Schema(
  {
    name: String,
    skill: {type: Schema.Types.ObjectId, ref: 'Skill'},
    order: Number,
    sections: [{type: Schema.Types.ObjectId, ref: 'Section'}]
  },
  {timestamps: true}
)

export default Mongoose.model('Chapter', chapterSchema)
