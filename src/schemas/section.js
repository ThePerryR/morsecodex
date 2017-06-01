import Mongoose from 'mongoose'

const {Schema} = Mongoose

const sectionSchema = Schema({
  name: String,
  about: String,
  type: {type: String, required: true},
  image: String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  skill: {type: Schema.Types.ObjectId, ref: 'Skill'}, // If not set, this Section is a standalone
  category: String,
  completions: {type: Number, default: 0},
  students: {type: Number, default: 0},
  totalMessages: {type: Number, default: 0},
  active: {type: Boolean, default: false},
  private: {type: Boolean, default: false}
}, {
  timestamps: true
})

sectionSchema.statics.incrementStudents = function (id) {
  this.findById(id, (_, section) => {
    if (section) {
      section.students += 1
      section.save()
    }
  })
}

export default Mongoose.model('Section', sectionSchema)
