import { observable, action, computed } from 'mobx'

export default class User {
  id = null
  store = null

  @observable _name = ''
  @observable email = ''
  @observable _image = ''
  @observable admin = ''
  @observable stars = []

  constructor (store, json) {
    this.store = store
    this.id = json._id.toString()
  }

  @computed get image () {
    return this._image || '/default-profile-picture.svg'
  }

  set image (image) {
    this._image = image
  }

  @computed get name () {
    return this._name || 'Unnamed'
  }

  set name (name) {
    this._name = name
  }

  @action.bound toggleStar (id) {
    const index = this.stars.indexOf(id)
    const lesson = this.store.store.LessonStore.get(id)

    if (index >= 0) {
      this.stars.splice(index, 1)
      if (lesson) {
        lesson.stars -= 1
      }
    } else {
      this.stars.push(id)
      if (lesson) {
        lesson.stars += 1
      }
    }
    this.store.store.TransportLayer.toggleStar(id)
  }

  @action.bound
  updateFromJson (json) {
    this.email = json.email
    this._name = json.name
    this._image = json.image
    this.admin = json.admin
    this.stars = (json.stars || []).map(s => s.toString())
  }

  @computed get asJSON () {
    return {
      _id: this.id,
      email: this.email,
      name: this._name,
      image: this._image,
      admin: this.admin,
      stars: this.stars
    }
  }
}
