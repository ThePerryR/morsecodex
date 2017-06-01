import React from 'react'
import { mount } from 'enzyme'

import { type } from '../../../utils/style'
import Logo from '../Logo'
import CombinationLogo from './'

const wrapper = mount(<CombinationLogo />)

test('renders with a logo and text', () => {
  expect(wrapper.find(Logo)).toHaveLength(1)
  expect(wrapper.find(type.heading)).toHaveLength(1)
  expect(wrapper.text()).toBe('TeachOK')
})
