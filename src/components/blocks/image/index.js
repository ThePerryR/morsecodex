import { observable } from 'mobx'
import Block from '../Block'

export default class extends Block {
  type = 'image'
  @observable url = null

  constructor (lesson, initialData = {}) {
    super(lesson, initialData)
    this.url = initialData.url
  }

  get asJSON () {
    return {
      type: 'image',
      url: this.url
    }
  }
}
