import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs, text } from '@kadira/storybook-addon-knobs'

import LessonListItem from './'

storiesOf('Items', module)
  .addDecorator(withKnobs)
  .add('LessonListItem', () => (
    <LessonListItem
      lesson={{
        owner: {
          name: text('Owner Name', 'Harvard'),
          image: 'http://darrowmillerandfriends.com/wp-content/uploads/2013/01/harvard_shield_wreath-284x300.png'
        },
        name: text('Name', 'Astrophysics'),
        updatedAt: new Date(),
        stars: 800,
        students: 22480
      }}
    />
  ))
