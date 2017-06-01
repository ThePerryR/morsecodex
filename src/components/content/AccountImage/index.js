import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

const Image = styled.div`
   width: 32px;
   height: 32px;
   border-radius: 8px;
   background-image: url("${props => props.url}");
   background-size: cover;
   background-position: center;
   box-sizing: border-box;
`

const AccountImage = ({account, style, className}) =>
  <Link to={`/account/${account.id}`} style={style} className={className}>
    <Image url={account.image}/>
  </Link>

AccountImage.propsTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
}

export default AccountImage
