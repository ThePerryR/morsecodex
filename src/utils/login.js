import uuid from 'node-uuid'

import Invite from '../schemas/invite'
import User from '../schemas/user'
import mail from './mail'

const register = (email, cb) => {
  const newUser = new User({email})
  User.register(newUser, email, cb)
}

const sendLoginEmail = (user, res, first, tempID, host) => {
  const newInvite = new Invite({email: user.email, validation_id: uuid.v4(), tempID})
  newInvite.save()
  mail(user.email,
    first ? '85e02b4d-5763-48e7-910c-5bf6b21ad103' : '42c03300-9e3c-4224-9010-b3efff1595cb',
    first ? 'Finish creating your account on TeachOK' : 'Sign in to TeachOK',
    [{
      key: '%code%',
      value: `${host}/validate/${newInvite.validation_id}`
    }])
  res.status(200).json({first})
}

export default function (req, res) {
  if (!req.body.email) {
    res.status(401).json({err: {email: true}})
  }
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      return res.status(500).json({err: err.errors})
    }
    if (!user) {
      register(req.body.email, (err, user) => {
        if (err) {
          return res.status(400).json({err: err.errors})
        }
        if (!user) {
          return res.status(500).json({err: {email: true}})
        }
        sendLoginEmail(user, res, true, req.session.tempID, req.get('host'))
      })
    } else {
      sendLoginEmail(user, res, false, req.session.tempID, req.get('host'))
    }
  })
}
