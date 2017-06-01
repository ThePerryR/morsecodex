import Store from './'

class MockClass {
  name = null

  constructor (store, json) {
    this.store = store
    this.id = json._id.toString()
  }

  updateFromJson = (json) => {
    this.name = json.name
  }

  get asJSON () {
    return {
      _id: this.id,
      name: this.name
    }
  }
}
const items = [{_id: 1, name: 'foo'}, {_id: 2, name: 'bar'}]
const parentStore = {}
const store = new Store(items, MockClass, parentStore)

test('Initializes with items', () => {
  expect(store.items.length).toBe(2)
  store.items.forEach((item, i) => {
    expect(item instanceof MockClass).toBe(true)
    expect(item.name).toBe(items[i].name)
  })
})
test('Passes self to child items', () => {
  expect(store.items[0].store).toBe(store)
  expect(store.items[0].store.store).toBe(parentStore)
})

test('.get returns query undefined', () => {
  expect(store.get()).toBe(undefined)
})

test('.get returns query if ID is passed in', () => {
  expect(store.get('1')).toBe(store.items[0])
  expect(store.get(1)).toBe(undefined)
})

test('.get returns query if array of IDs are passed in', () => {
  const results = store.get(['1', '2'])
  expect(results[0]).toBe(store.items[0])
  expect(results[1]).toBe(store.items[1])
})

test('.get returns query if key/value query is passed in', () => {
  expect(store.get({name: 'bar'})[0]).toBe(store.items[1])
})

test('updateItemFromServer adds new items', () => {
  store.updateItemFromServer({_id: 3, name: 'hello'})
  expect(store.items.length).toBe(3)
  expect(store.get('3').name).toBe('hello')
})

test('updateItemFromServer updates existing items', () => {
  store.updateItemFromServer({_id: 1, name: 'world'})
  expect(store.items.length).toBe(3)
  expect(store.items[0].name).toBe('world')
})

test('updateItems updates each one', () => {
  store.updateItems([
    {_id: 3, name: 'dog'},
    {_id: 4, name: 'cat'}
  ])
  expect(store.items.length).toBe(4)
  expect(store.get('3').name).toBe('dog')
  expect(store.get('4').name).toBe('cat')
})

test('remove item removes an item', () => {
  store.removeItem('2')
  store.removeItem(3)
  expect(store.items.length).toBe(2)
  expect(store.get('2')).not.toBeTruthy()
})

test('returns each item\'s "asJSON" when called asJSON', () => {
  expect(store.asJSON.length).toBe(2)
  expect(store.asJSON[1].name).toBe('cat')
})
