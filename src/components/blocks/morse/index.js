import Block from '../Block'
import { observable } from 'mobx'

export default class extends Block {
  type = 'morse'
  @observable answer = ''
  @observable count = 1

  constructor (lesson, initialData = {}) {
    super(lesson, initialData)
    this.answer = initialData.answer
    this.count = initialData.count
  }

  get asJSON () {
    return {
      type: this.type,
      count: this.count,
      answer: this.answer,
      ...super.asJSON
    }
  }
}
