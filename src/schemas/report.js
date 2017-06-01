import Mongoose from 'mongoose'

const {Schema} = Mongoose

const reportSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  lesson: {type: Schema.Types.ObjectId, ref: 'Lesson'},
  currentIndex: {type: Number, default: 0},
  complete: {type: Boolean, default: false},
  viewed: {type: Schema.Types.Mixed, default: {}}
}, {
  timestamps: true
})

const Report = Mongoose.model('Report', reportSchema)

export default Report

export const updateReport = (req, res) => {
  if (!req.user && !req.session.tempID) {
    return res.sendStatus(500)
  }
  const update = {}
  if (Number.isInteger(req.body.currentIndex)) {
    update.currentIndex = req.body.currentIndex
  }

  const query = {_id: req.params.id, owner: req.user ? req.user._id : req.session.tempID}
  Report.findOne(query, (err, report) => {
    if (err || !report) {
      return res.sendStatus(500)
    }
    report.update(update, (err) => {
      if (err) {
        return res.sendStatus(500)
      }
      res.json({report})
    })
  })
}
