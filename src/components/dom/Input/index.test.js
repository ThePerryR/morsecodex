import React from 'react'
import { shallow } from 'enzyme'

import Input from './'

const wrapper = shallow(<Input value="foo" />)

test('it renders an input', () => {
  expect(wrapper.props().value).toBe('foo')
})
