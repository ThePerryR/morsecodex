import React from 'react'
import { Link } from 'react-router'
import { mount } from 'enzyme'
import AccountImage from './'

const wrapper = mount(<AccountImage account={{id: '123', image: 'foobar-img'}}/>)

test('renders a link to the account', () => {
  expect(wrapper.find(Link).props().to).toBe('/account/123')
})
test('renders the account\'s image', () => {
  expect(wrapper.childAt(0).props().url).toBe('foobar-img')
})
