import Block from '../Block'
import { observable } from 'mobx'

export default class extends Block {
  type = 'text'
  @observable value = ''
  @observable size = 'label'
  @observable align = 'left'
  @observable weight = 400
  @observable margin = true

  constructor (lesson, initialData = {}) {
    super(lesson)
    this.value = initialData.value || ''
    this.size = initialData.size || 'label'
    this.align = initialData.align || 'left'
    this.weight = initialData.weight || 400
    this.margin = initialData.margin === undefined ? true : initialData.margin
  }

  get asJSON () {
    return {
      type: this.type,
      value: this.value,
      size: this.size,
      align: this.align,
      weight: this.weight,
      margin: this.margin
    }
  }
}
