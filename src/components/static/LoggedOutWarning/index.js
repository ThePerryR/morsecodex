import React from 'react'
import { Link } from 'react-router'

import { colors } from '../../../utils/style'
import Note from '../Note'

export default () => (
  <Note>
    <div><b>Note:</b>&nbsp;You are not logged in and any progress will be lost.</div>
    <div>
      <Link to="/login" style={{color: colors.link}}>
        Click here to login or sign up.
      </Link>
    </div>
  </Note>
)
