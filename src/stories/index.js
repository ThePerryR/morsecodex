import { configure } from '@kadira/storybook'

import appConfig from '../appConfig'

const req = require.context('components', true, /.stories.js$/)

function loadStories () {
  appConfig()

  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
