import { observable, action } from 'mobx'

export default class Store {
  @observable items = []
  @observable loading = false
  ItemClass

  constructor (initialItems = [], ItemClass, store) {
    this.store = store
    this.ItemClass = ItemClass
    this.updateItems(initialItems)
  }

  /**
   * get
   * Returns an array of items match the query.
   * If query is a string, it's assumed too be an
   * id and a single item will be returned
   * @param query {String|Object}
   * @returns {Array|Object}
   */
  get (query) {
    if (!query) {
      return
    }

    if (typeof query === 'string') {
      return this.items.find(item => item.id === query)
    }

    // is array of id's
    if (Array.isArray(query)) {
      const items = []
      query.forEach(id => {
        const item = this.get(id.toString())
        if (item) {
          items.push(item)
        }
      })
      return items
    }

    if (typeof query !== 'object') {
      return
    }

    return this.items.filter(item => {
      return !Object.keys(query).find(key => {
        return item[key] !== query[key]
      })
    })
  }

  @action.bound
  updateItems (items) {
    items.forEach(this.updateItemFromServer)
  }

  /**
   * updateItemFromServer
   * @param json {Object}
   * @private
   */
  @action.bound
  updateItemFromServer (json) {
    if (!json) {
      return
    }
    let item = this.items.find(item => item.id === (json.id || json._id.toString()))
    if (!item) {
      item = new this.ItemClass(this, json)
      this.items.push(item)
    }
    item.updateFromJson(json)
    return item
  }

  @action.bound
  removeItem (id) {
    const index = this.items.findIndex(item => item.id === id.toString())
    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }

  get asJSON () {
    return this.items.map(item => item.asJSON)
  }
}
