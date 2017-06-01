import { injectGlobal } from 'styled-components'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { colors } from './utils/style'

injectTapEventPlugin()
export default () => {
  return injectGlobal`
    html, body {
      font-size: 13px;
      font-weight: normal;
      font-family: 'Source Sans Pro', sans-serif;
      line-height: 0;
      color: ${colors.black};
      margin: 0;
      -webkit-font-smoothing: antialiased;
    }
    
    a {
      text-decoration: none;
      color: ${colors.black};
      display: flex;
      align-items: center;
    }
    p {
     line-height: 24px;
    }
    
    input {
      font-family: 'Source Sans Pro', sans-serif;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }
    
    tr {
      padding-left: 24px;
      padding-right: 24px;
      box-sizing: border-box;
      &:not(:last-child) {
        td {
          border-bottom: 1px solid #E3E4E9; 
        }
      }
      > :first-child {
        padding-left: 24px;
      }
    }
    
    thead tr {
      height: 56px;
      font-size: 13px;
      font-weight: bold;
      font-family: 'Source Sans Pro', sans-serif;
      color: #999999;
    }
    
    tbody tr {
      height: 48px;
    }
    
    th {
      border-bottom: 1px solid #E3E4E9;
      &:not(:first-child) {
        padding-left: 56px;
      }
      &:first-child {
       padding-left: 24px;
      }
      &:last-child {
       padding-right: 24px;
      }
    }
    
    th, td {
     white-space: nowrap;
    }
    
    td.center {
      text-align: center;
    }
  `
}
