import { observable } from 'mobx'
import Block from '../Block'

export default class extends Block {
  type = 'lessonPointer'
  @observable lessonId = ''

  constructor (lesson, initialData = {}) {
    super(lesson, initialData)
    this.lessonId = initialData.lessonId ? initialData.lessonId.toString() : ''
  }

  get asJSON () {
    return {
      type: 'lessonPointer',
      lessonId: this.lessonId,
      ...super.asJSON
    }
  }
}
