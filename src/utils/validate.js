import passport from 'passport'

import Invite from '../schemas/invite'
import Report from '../schemas/report'
import User from '../schemas/user'

export default (req, res, next) => {
  Invite.findOne({validation_id: req.params.validation_id}, (_, invite) => {
    if (!invite) {
      return res.redirect('/login?invalid=true')
    }
    const diffMs = (new Date() - invite.createdAt) // milliseconds between now & Christmas
    const diffDays = Math.floor(diffMs / 86400000) // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000) // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
    if (diffDays >= 1 || diffHrs >= 1 || diffMins >= 15) {
      invite.remove()
      return res.redirect('/login?invalid=true')
    }
    User.findOne({email: invite.email}, (_, user) => {
      if (user) {
        invite.remove()
        // Validate the email
        if (!user.validated) {
          user.validated = true
          user.save()
        }

        /*
         * If user created reports while logged out we need to update their account.
         * First, get all of the tempReports created and loop through them.
         * If the user already has a report for this lesson we update it if progression occurred,
         * otherwise we reassign the tempReport to the user
         */
        if (invite.tempID) {
          Report.find({owner: {$in: [invite.tempID, user._id]}}, (err, reports) => {
            if (!err && reports) {
              const tempReports = reports.filter(report => report.owner.equals(invite.tempID))
              const usersReports = reports.filter(report => report.owner.equals(user._id))
              if (tempReports.length) {
                tempReports.forEach(tempReport => {
                  let shouldSave = false
                  let userReport = usersReports.find(report => report.lesson.equals(tempReport.lesson))
                  if (userReport) {
                    if (tempReport.currentIndex > userReport.currentIndex) {
                      userReport.currentIndex = tempReport.currentIndex
                      shouldSave = true
                    }
                  } else {
                    userReport = tempReport
                    userReport.owner = user._id
                    shouldSave = true
                  }
                  if (shouldSave) {
                    userReport.save()
                  }
                })
              }
            }
          })
        }

        // Log user in
        req.body.email = user.email
        passport.authenticate('local', (err, user) => {
          if (err) {
            return res.status(400).json({error: err.errors})
          }
          if (!user) {
            return res.status(400).json({error: {auth: true}})
          }
          req.logIn(user, (err) => {
            if (err) { return res.sendStatus(500) }
            return res.redirect('/')
          })
        })(req, res, next)
      } else {
        invite.remove()
        res.redirect('/login?invalid=true')
      }
    })
  })
}
