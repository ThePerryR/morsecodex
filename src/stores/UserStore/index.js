import User from '../User'
import Store from '../Store'

export default class UserStore extends Store {
  /**
   * @param users {[Object]}
   */
  constructor (users, store) {
    super(users, User)
    this.store = store
  }
}
