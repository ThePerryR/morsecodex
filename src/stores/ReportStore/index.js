import Report from '../Report'

import Store from '../Store'

export default class ReportStore extends Store {
  store = null

  /**
   * @param reports {[Report]}
   */
  constructor (reports, store) {
    super(reports, Report)
    this.store = store
  }
}
