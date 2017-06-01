import { observable } from 'mobx'
import Block from '../Block'

export default class extends Block {
  type = 'divider'
  @observable small = false

  constructor (lesson, initialData = {}) {
    super(lesson, initialData)
    this.small = initialData.small || false
  }

  get asJSON () {
    return {
      type: 'divider',
      small: this.small
    }
  }
}
