import Divider from './divider'
import DividerOptions from './divider/options'
import DividerPreview from './divider/preview'
import DividerEditor from './divider/editor'
import Image from './image'
import ImageOptions from './image/options'
import ImagePreview from './image/preview'
import ImageEditor from './image/editor'
import LessonPointer from './lessonPointer'
import LessonPointerOptions from './lessonPointer/options'
import LessonPointerPreview from './lessonPointer/preview'
import LessonPointerEditor from './lessonPointer/editor'
import Morse from './morse'
import MorsePreview from './morse/preview'
import MorseOptions from './morse/options'
import MorseCode from './morseCode'
import MorseCodeEditor from './morseCode/editor'
import MorseCodeOptions from './morseCode/options'
import MorseCodePreview from './morseCode/preview'
import Text from './text'
import TextEditor from './text/editor'
import TextOptions from './text/options'
import TextPreview from './text/preview'

export default {
  image: {
    Constructor: Image,
    Editor: ImageEditor,
    Preview: ImagePreview,
    OptionEditor: ImageOptions
  },
  text: {
    Constructor: Text,
    Editor: TextEditor,
    OptionEditor: TextOptions,
    Preview: TextPreview
  },
  lessonPointer: {
    Constructor: LessonPointer,
    Editor: LessonPointerEditor,
    Preview: LessonPointerPreview,
    OptionEditor: LessonPointerOptions
  },
  morse: {
    Constructor: Morse,
    Editor: MorsePreview,
    Preview: MorsePreview,
    OptionEditor: MorseOptions
  },
  morseCode: {
    Constructor: MorseCode,
    Editor: MorseCodeEditor,
    OptionEditor: MorseCodeOptions,
    Preview: MorseCodePreview
  },
  divider: {
    Constructor: Divider,
    Editor: DividerEditor,
    Preview: DividerPreview,
    OptionEditor: DividerOptions
  }
}
