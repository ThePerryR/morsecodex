import React from 'react'
import { shallow } from 'enzyme'
import Align from './'

const wrapper = shallow(<Align><span/><span/></Align>)

test('renders it\'s children', () => {
  expect(wrapper.find('span')).toHaveLength(2)
})
