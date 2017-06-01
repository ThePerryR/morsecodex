import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import Button from '../../static/Button'
import Loading from '../../static/Loading'
import SectionEditor from '../SectionEditor'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 320px;
  flex-shrink: 0;
  padding: 16px;
  box-sizing: border-box;
`

const SectionList = ({lesson, toggleSection, toggleMessage, openSection, openMessage}) =>
  <Wrapper>
    <div style={{flex: 1, width: '100%'}}>
      {/* list each Section */}
      {lesson.sections.filter(s => !!s._id).map(section =>
        <SectionEditor
          key={section._id}
          section={section}
          lesson={lesson}
          open={openSection === section._id}
          openMessage={openMessage}
          handleToggle={() => toggleSection(section._id)}
          handleToggleMessage={toggleMessage}
        />
      )}

      {/* show each pending Section as Loading */}
      {lesson.sections.filter(s => !s._id).map((_, i) =>
        <Loading key={i} style={{marginTop: 16}}/>
      )}
    </div>
    {/* new Section button */}
    <Button handleClick={lesson.addSection} label="+ New Chapter"/>
  </Wrapper>

export default observer(SectionList)
