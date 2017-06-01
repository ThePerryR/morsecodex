import uuid from 'node-uuid'
class TransportLayer {
  csrf = null
  fetch = (path, method, body, query) => new Promise((resolve) => {
    resolve()
  })

  login = email => this.fetch('/login', 'post', {email})
  fetchPage = (page, params) => this.fetch(`/api/page/${page}`, 'post', params)
  toggleStar = id => this.fetch(`/api/lesson/${id}/star`, 'put')
  updateAccount = account => this.fetch(`/api/account`, 'put', account.asJSON)
  createLesson = () => new Promise((resolve) => {
    resolve({
      lesson: {
        _id: uuid.v4(),
        owner: 1009
      }
    })
  })
  updateLesson = lesson => this.fetch(`/api/lesson/${lesson.id}`, 'put', lesson.asJSON)
  createMessage = message => this.fetch(`/api/message`, 'post', message)
  updateMessage = message => this.fetch(`/api/message/${message.id}`, 'put', message.asJSON)
  updateReport = report => this.fetch(`/api/report/${report.id}`, 'put', report.asJSON)
  delete = (type, id) => this.fetch(`/api/${type}/${id}`, 'delete')
}

export default TransportLayer
