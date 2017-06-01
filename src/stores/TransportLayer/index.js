import fetchUtil, { checkStatus, parseJSON } from '../../utils/fetch'

class TransportLayer {
  csrf = null
  fetch = (path, method, body, query) => new Promise((resolve, reject) => {
    fetchUtil(path, method, body, query, this.csrf)
      .then(checkStatus)
      .then(parseJSON)
      .then(resolve)
      .catch(reject)
  })

  createLesson = () => this.fetch('/api/lesson', 'post')

  login = email => this.fetch('/login', 'post', {email})
  fetchPage = (page, params, search) => this.fetch(`/api/page/${page}`, 'post', params, search)
  fetchLessons = () => this.fetch(`/api/lesson/`)
  toggleStar = id => this.fetch(`/api/lesson/${id}/star`, 'put')
  updateAccount = account => this.fetch(`/api/account`, 'put', account.asJSON)
  updateLesson = lesson => this.fetch(`/api/lesson/${lesson.id}`, 'put', lesson.asJSON)
  createMessage = (lesson, section) => this.fetch(`/api/lesson/${lesson}/${section}`, 'post')
  updateMessage = message => this.fetch(`/api/message/${message.id}`, 'put', message.asJSON)
  updateReport = report => this.fetch(`/api/report/${report.id}`, 'put', report.asJSON)
  delete = (type, id) => this.fetch(`/api/${type}/${id}`, 'delete')
}

export default TransportLayer
