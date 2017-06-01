import React, { PropTypes } from 'react'
import styled from 'styled-components'

import { type } from '../../../utils/style'
import Note from '../../static/Note'

const Wrapper = styled.div`
  position: absolute;
  top: 24px;
  width: 100%;
  max-width: 320px;
`

const PageStatus = ({submitting, sent}) =>
  <Wrapper>
    {(submitting || sent) &&
    <Note type={sent ? 'positive' : 'default'}>
      {submitting && <type.label>Sending email...</type.label>}
      {sent &&
      <type.label>
        Next step: Now go check your email for a link to finish joining or logging in.
      </type.label>
      }
    </Note>
    }
  </Wrapper>

PageStatus.propTypes = {
  submitting: PropTypes.bool,
  sent: PropTypes.bool
}
PageStatus.defaultProps = {
  submitting: false,
  sent: false
}

export default PageStatus
