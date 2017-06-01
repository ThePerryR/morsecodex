import React from 'react'
import styled from 'styled-components'

import { colors, type } from '../../../utils/style'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-left: -16px;
  margin-right: 16px;
  max-width: 576px;
  margin-left: auto;
  margin-right: auto;
`

const Sub = styled.div`
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 42px;
  .name { 
    color: ${colors.black};
    transition: color 150ms linear;
  }
  &:hover {
    .name {
      color: ${colors.grey};
    }
  }
`

const Pic = styled.div`
  background: white;
  background-image: url("${props => props.img}");
  background-size: cover;
  background-position: contain;
  width: 112px;
  height: 112px;
  margin-bottom: 20px;
`

const SubcategoryList = ({category}) =>
  <Wrapper>
    {category.subs.map(sub =>
      <Sub key={sub.value}>
        <Pic img={sub.img}/>
        <type.note style={{textAlign: 'center'}} className="name">{sub.name}</type.note>
      </Sub>
    )}
  </Wrapper>

export default SubcategoryList
