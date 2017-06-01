import React from 'react'
import { mount } from 'enzyme'
import { Link } from 'react-router'

import { type } from '../../../utils/style'
import LoginButton from './'

const wrapper = mount(<LoginButton />)

test('renders a Link to /login', () => {
  expect(wrapper.find(Link).props().to).toBe('/login')
})

test('renders "Join / Login"', () => {
  expect(wrapper.find(type.label).text()).toBe('Join / Login')
})
