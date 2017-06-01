import Lesson from '../Lesson'
import LessonStore from './'

const parentStore = {}
const store = new LessonStore([
  {_id: 1, name: 'history', owner: '1000'},
  {_id: 2, name: 'geology', owner: '1000'}
], parentStore)

test('initializes with lessons', () => {
  expect(store.items.length).toBe(2)
  const geology = store.get('2')
  expect(geology instanceof Lesson).toBe(true)
  expect(geology.name).toBe('geology')
})
