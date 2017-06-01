import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import categories from '../../../constants/categories'
import { colors, type } from '../../../utils/style'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 98px;
  padding-bottom: 98px;
`

const Title = styled(type.title)`
  position: relative;
  text-transform: uppercase;
  padding-bottom: 4px;
  margin-bottom: 6px;
  &:after {
  content: "";
  background: ${colors.primary};
  position: absolute;
  height: 3px;
  width: 14px;
  left: 50%;
  margin-left: -12px;
  bottom: 0;
  }
`

const Category = styled.div`
  width: 240px;
  height: 42px;
  background-color: ${props => props.color};
  font-size: 18px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-family: 'Roboto';
`

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 782px;
  cursor: pointer;
`

const Subcategory = styled.div`
  color: ${colors.primary};
  cursor: pointer;
  width: 240px;
  text-align: center;
  margin-bottom: 16px;
`

const SubcategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 782px;
`

@observer
class EditAccess extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  selectCategory = value => {
    this.props.lesson.category = value
    this.props.lesson.subcategory = null
    this.props.lesson.save(true)
  }

  selectSubcategory = value => {
    this.props.lesson.subcategory = value
    this.props.lesson.save(true)
    this.props.close()
  }

  reset = () => {
    this.props.lesson.category = null
    this.props.lesson.subcategory = null
  }

  get category () {
    const {category, subcategory} = this.props.lesson
    if (!category) {
      return 'Please choose a category'
    }
    const {name, subs} = categories.find(c => c.value === category)
    if (!subcategory) {
      return name
    }
    return subs.find(s => s.value === subcategory).name
  }

  render () {
    return (
      <Wrapper>
        <Title color={colors.black}>
          <b>{this.category}</b>
        </Title>
        <type.label style={{marginBottom: 32}} color={colors.grey}>
          <b>{this.props.lesson.category ? 'CHOOSE A SUBCATEGORY' : 'CHOOSE A CATEGORY'}</b>
        </type.label>
        {!this.props.lesson.category &&
        <CategoryWrapper>
          {categories.map(category =>
            <Category
              key={category.value}
              color={category.color}
              onClick={this.selectCategory.bind(null, category.value)}>
              {category.name}
            </Category>
          )}
        </CategoryWrapper>
        }
        {this.props.lesson.category &&
        <SubcategoryWrapper>
          <CategoryWrapper>
            {categories.find(c => c.value === this.props.lesson.category).subs.map(sub => (
              <Subcategory
                key={sub.value}
                onClick={this.selectSubcategory.bind(null, sub.value)}>
                <type.label>{sub.name}</type.label>
              </Subcategory>
            ))}
          </CategoryWrapper>
          <type.label
            color={colors.link}
            style={{cursor: 'pointer'}}
            onClick={this.reset}>
            ← Choose a different category
          </type.label>
        </SubcategoryWrapper>
        }
      </Wrapper>
    )
  }
}

export default EditAccess
