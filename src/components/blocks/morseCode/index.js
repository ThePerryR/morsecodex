import Block from '../Block'
import { observable } from 'mobx'

export default class extends Block {
  type = 'morseCode'
  @observable auto = false
  @observable message = ''
  @observable label = ''

  constructor (lesson, initialData = {}) {
    super(lesson, initialData)
    this.auto = initialData.auto || false
    this.message = initialData.message || ''
    this.label = initialData.label || ''
  }

  get asJSON () {
    return {
      type: this.type,
      auto: this.auto,
      message: this.message,
      label: this.label,
      ...super.asJSON
    }
  }
}
