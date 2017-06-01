import TestLayer from '../TestLayer'
import AppStore from './'

const TransportLayer = new TestLayer()
const store = new AppStore({}, {}, TransportLayer)

test('loads initial data', () => {
  expect(store).toBeTruthy()
})
test('updates when loadData is called', () => {})
