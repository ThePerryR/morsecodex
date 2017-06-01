import React from 'react'
import { convertFromRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'

import { marginObj, type } from '../../../utils/style'
import Preview from '../Preview'

class TextPreview extends Preview {
  render () {
    const html = this.props.lesson.value ? stateToHTML(convertFromRaw(this.props.lesson.value)) : ''
    return (
      <div
        dangerouslySetInnerHTML={{__html: html}}
      />
    )
  }
}

export default TextPreview
