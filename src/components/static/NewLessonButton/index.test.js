import React from 'react'
import { mount } from 'enzyme'

import NewLessonButton from './'
import AppStore from '../../../stores/AppStore'
import TestLayer from '../../../stores/TestLayer'

const TransportLayer = new TestLayer()
const store = new AppStore({}, {}, TransportLayer)
const wrapper = mount(<NewLessonButton store={store}/>)

test('displays the button', () => {
  expect(wrapper.text()).toBe('+ New Lesson')
})

test('creates a lesson when clicked and redirects', () => {
  const createLesson = jest.fn()
  createLesson.mockReturnValueOnce(new Promise((resolve) => resolve({_id: 1008, owner: 1009})))
  TransportLayer.createLesson = createLesson

  wrapper.simulate('click')

  expect(createLesson).toHaveBeenCalledTimes(1)
})
