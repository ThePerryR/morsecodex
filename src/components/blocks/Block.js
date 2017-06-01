import { action, observable } from 'mobx'

export default class {
  @observable blocking = false

  constructor (lesson, initialData = {}) {
    this.lesson = lesson
    this.blocking = initialData.blocking || false
  }

  @action.bound save = () => this.lesson.save()

  get asJSON () {
    return {
      blocking: this.blocking
    }
  }
}
