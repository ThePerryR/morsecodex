import Lesson from '../Lesson'
import Store from '../Store'

/**
 * @extends Store
 */
export default class LessonStore extends Store {
  store = null

  /**
   * @param lessons
   * @param store
   */
  constructor (lessons, store) {
    super(lessons, Lesson, store)
    this.store = store
  }
}
