import Mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const {Schema} = Mongoose

const userSchema = new Schema(
  {
    email: String,
    name: String,
    image: String,

    validated: {type: Boolean, default: false},
    stars: [{type: Schema.Types.ObjectId, ref: 'Lesson'}]
  },
  {
    timestamps: true
  }
)

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  passwordField: 'email'
})

const User = Mongoose.model('User', userSchema)
export default User

export const updateAccount = (req, res) => {
  if (!req.user || !req.user._id.equals(req.body._id)) {
    return res.sendStatus(500)
  }
  User.findById(req.user._id, (err, user) => {
    if (err || !user) {
      return res.sendStatus(500)
    }

    const update = {
      name: req.body.name || user.name,
      image: req.body.image || user.image
    }

    user.update(update, (err) => {
      if (err) {
        return res.sendStatus(500)
      }
      res.json({user})
    })
  })
}
