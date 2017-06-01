import { observable } from 'mobx'

import ServerLayer from '../TransportLayer'
import LessonStore from '../LessonStore'
import UserStore from '../UserStore'
import ReportStore from '../ReportStore'

/**
 * AppStore
 * Maintains session information
 */
class AppStore {
  @observable blueprints = {}
  @observable currentUserId = null

  constructor (initialData = {}, blueprints = {}, TransportLayer) {
    console.log('yyyy', blueprints)
    this.csrf = initialData.csrf
    this.userHash = initialData.user_hash
    this.currentUserId = initialData.currentUserId && initialData.currentUserId.toString()

    this.TransportLayer = TransportLayer || new ServerLayer()
    this.TransportLayer.csrf = this.csrf

    this.UserStore = new UserStore(initialData.users, this)
    this.LessonStore = new LessonStore(initialData.lessons, this)
    this.ReportStore = new ReportStore(initialData.reports, this)

    this.blueprints = initialData.blueprints || blueprints
  }

  loadData = ({data, blueprint}) => new Promise((resolve) => {
    if (data.users) {
      this.UserStore.updateItems(data.users)
    }
    if (data.lessons) {
      this.LessonStore.updateItems(data.lessons)
    }
    if (data.reports) {
      this.ReportStore.updateItems(data.reports)
    }
    this.blueprints = {...this.blueprints, [window.location.pathname]: blueprint}
    resolve()
  })

  get currentUser () {
    if (!this._currentUser) {
      this._currentUser = this.UserStore.get(this.currentUserId)
    }
    return this._currentUser
  }

  get asJSON () {
    return {
      csrf: this.csrf,
      currentUserId: this.currentUserId,
      user_hash: this.userHash,

      lessons: this.LessonStore.asJSON,
      users: this.UserStore.asJSON,
      reports: this.ReportStore.asJSON,
      blueprints: this.blueprints
    }
  }
}

export default AppStore
