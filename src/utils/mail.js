import sendgrid, { mail as helper } from 'sendgrid'

export default function (to, template, subject, subs, cb) {
  const fromEmail = new helper.Email('perryratcliff@gmail.com', 'TeachOK')
  const toEmail = new helper.Email(to)
  const mail = new helper.Mail()
  const personalization = new helper.Personalization()

  personalization.addTo(toEmail)

  subs.forEach((s) => {
    const substitution = new helper.Substitution(s.key, s.value)
    personalization.addSubstitution(substitution)
  })

  mail.setFrom(fromEmail)
  mail.setSubject(subject)
  mail.setTemplateId(template)
  mail.addPersonalization(personalization)
  const sg = sendgrid(process.env.SENDGRID_API_KEY)
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  })

  sg.API(request, () => {
    if (typeof cb === 'function') {
      cb()
    }
  })
}
