import { observable, computed, action } from 'mobx'

class Report {
  id = null
  _lesson

  @observable currentIndex
  @observable complete
  @observable viewed = {}

  constructor (store, json) {
    this.store = store
    this.id = json._id.toString()
    this._lesson = json.lesson.toString()
  }

  @computed get percentComplete () {
    return (this.currentIndex / (this.lesson.totalMessages - 1)) * 100
  }

  @computed get lesson () {
    return this.store.store.LessonStore.items.find(lesson => lesson.id === this._lesson)
  }

  @computed get currentMessage () {
    const lesson = this.lesson
    return lesson ? lesson.messages.sort((a, b) => a.order - b.order)[this.currentIndex] : undefined
  }

  @action.bound save () {
    clearTimeout(this.saveTimeout)
    this.saveTimeout = setTimeout(() => {
      if (!this.complete && this.lesson && this.currentIndex >= (this.lesson.blocks.length - 1)) {
        this.complete = true
      }
      this.store.store.TransportLayer.updateReport(this)
    }, 3000)
  }

  updateFromJson (json) {
    this.currentIndex = json.currentIndex
    this.complete = json.complete
    this.viewed = json.viewed || {}
  }

  get asJSON () {
    return {
      _id: this.id,
      lesson: this._lesson,
      currentIndex: this.currentIndex,
      complete: this.complete,
      viewed: this.viewed
    }
  }
}

export default Report
