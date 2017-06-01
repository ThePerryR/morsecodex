import { observable, computed, action } from 'mobx'

import blocks from '../../components/blocks'

export default class Lesson {
  id = null
  chapter = null
  owner = null

  @observable name = ''
  @observable _image = ''
  @observable tempName = ''
  @observable tempImage = ''
  @observable updatedAt = ''
  @observable category = ''
  @observable subcategory = ''
  @observable active = false
  @observable private = false
  @observable type = 'documentation'
  createdAt = ''
  students = 0
  @observable stars = 0
  @observable value = null

  @observable saving = false
  @observable blocks = []
  meta = observable.map({})

  constructor (store, json) {
    this.store = store
    this.id = json._id.toString()
    this._image = json.image
    if (typeof json.owner === 'string' || !json.owner._id) {
      this.owner = json.owner.toString()
    } else {
      this.owner = store.store.UserStore.updateItemFromServer(json.owner).id
    }
  }

  @computed get report () {
    return this.store.store.ReportStore.items.find(report => report._lesson === this.id)
  }

  @computed get image () {
    return this.tempImage || this._image || '/emptycard.svg'
  }

  @computed get user () {
    if (!this._user) {
      this._user = this.store.store.UserStore.get(this.owner)
    }
    return this._user
  }

  @computed get canEdit () {
    return this.user && this.user.id === this.store.store.currentUserId
  }

  @computed get account () {
    return this.user
  }

  @action.bound addBlock (block = {}) {
    this.blocks.push(block)
    this.save(true)
  }

  @action.bound save (auto = false) {
    clearTimeout(this.saveTimeout)
    this.saving = true
    this.saveTimeout = setTimeout(() => {
      this.store.store.TransportLayer.updateLesson(this).then(({lesson}) => {
        if (auto) {
          this.updateFromJson(lesson)
        }
        this.saving = false
      }).catch(() => {
        this.saving = false
      })
    }, auto ? 0 : 2000)
  }

  updateFromJson (json) {
    this.active = json.active
    this.private = json.private
    this.type = json.type
    this.category = json.category
    this.subcategory = json.subcategory
    this.name = json.name || ''
    this._image = json.image
    this.updatedAt = json.updatedAt
    this.createdAt = json.createdAt
    this.students = json.students || 0
    this.stars = json.stars || 0
    this.value = json.value && JSON.parse(json.value)
    this.blocks = json.blocks || []
    this.meta = observable.map(json.meta || {})
  }

  get asJSON () {
    return {
      _id: this.id,
      name: this.name,
      owner: this.owner,
      image: this._image,
      active: this.active,
      private: this.private,
      type: this.type,
      category: this.category,
      subcategory: this.subcategory,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      students: this.students,
      stars: this.stars,
      value: this.value && JSON.stringify(this.value),
      blocks: this.blocks,
      meta: this.meta.toJS() || {}
    }
  }
}
