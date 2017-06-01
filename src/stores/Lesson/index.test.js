import AppStore from '../AppStore'
import LessonStore from '../LessonStore'
import TestLayer from '../TestLayer'
import Lesson from './'

const lessonJSON = {
  _id: '1',
  name: 'history',
  owner: '1000',
  active: true,
  private: true,
  students: 8,
  stars: 8
}
const TransportLayer = new TestLayer()
const store = new AppStore({
  currentUserId: '200',
  lessons: [lessonJSON],
  users: [{_id: '1000', name: 'Kanye'}]
}, {}, TransportLayer)

const lesson = store.LessonStore.get('1')

test('initializes', () => {
  expect(lesson instanceof Lesson).toBe(true)
  expect(lesson.store instanceof LessonStore).toBe(true)
  expect(lesson.store.store).toBe(store)
  expect(lesson.id).toBe('1')
  expect(lesson.owner).toBe('1000')
})

test('returns the correct report', () => {
  expect(lesson.report).toBe(undefined)
  store.ReportStore.updateItemFromServer({_id: '444', lesson: 1})
  expect(lesson.report).toBe(store.ReportStore.get('444'))
})

test('returns correct image', () => {
  expect(lesson.image).toBe('/emptycard.svg')
  lesson._image = 'foobar'
  expect(lesson.image).toBe('foobar')
  lesson.tempImage = 'barbar'
  expect(lesson.image).toBe('barbar')
})

test('returns the user/owner', () => {
  expect(lesson.user).toBe(store.UserStore.get('1000'))
})

test('returns if current user can edit', () => {
  expect(lesson.canEdit).toBe(false)
  store.currentUserId = '1000'
  expect(lesson.canEdit).toBe(true)
})

test('returns account as a proxy for user', () => {
  expect(lesson.account).toBe(lesson.user)
})

test('can initialize populated owner fields', () => {
  store.LessonStore.updateItemFromServer({_id: 17, owner: {_id: 18, name: 'West'}})
  expect(store.UserStore.get(store.LessonStore.get('17').owner)).toBe(store.UserStore.get('18'))
})
