import React, { Component } from 'react'
import styled from 'styled-components'
import 'ag-grid-root/dist/styles/ag-theme-blue.css'
import { loadFont } from '../../../../../helpers/styles'
import Whatever from './Whatever'

const AgGridThemeProvider = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;

  .ag-header {
    color: black;
    background-color: #d4eaff;
  }

  .ag-header-row *:not(i) {
    ${props => loadFont(props.theme.gridHeaderFont || '12px BPG Algeti')};
  }

  .ag-body *:not(i) {
    ${props => loadFont(props.theme.gridFont)};
  }

  .ag-menu-list :not(i) {
    ${props => loadFont(props.theme.gridContextMenuFont)};
  }

  .ag-row-selected {
    font-weight: bold;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    background-color: white;
  }

  .ag-cell-focus {
    border: 2px solid transparent;
    border-right: 1px dotted #9bc2e6;
    border-bottom: 1px dotted #9bc2e6;
    outline: none;
  }

  .ag-header-cell {
    padding-left: 3px;
    padding-right: 0px;
  }

  .ag-header-cell-menu-button .ag-icon-menu {
    height: 15px;
  }

  .ag-header-cell-label .ag-header-cell-text {
    overflow: initial;
    text-overflow: initial;
    font-weight: bold;
  }

  .ag-header-cell-menu-button {
    position: absolute;
    top: 4px;
    height: 15px;
    right: 3px;
  }

  .ag-header .ag-icon-asc,
  .ag-header .ag-icon-desc,
  .ag-header .ag-icon-expanded,
  .ag-header .ag-icon-contracted,
  .ag-header .ag-icon-menu,
  .ag-header .ag-icon-filter {
    background-color: #5b9bd5;
  }

  .ag-header .ag-icon-asc,
  .ag-header .ag-icon-desc {
    position: absolute;
    right: 17px;
    top: 5px;
    height: 15px;
  }

  .ag-header-cell-label {
    width: 100%;
  }

  .ag-row-odd {
    background-color: #fff;
  }

  .ag-react-container img {
    height: 1.4em;
  }

  .ag-menu-option-text {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ag-menu-column-select-wrapper {
    height: auto;
    padding-bottom: 10px;
    max-height: 400px;
  }

  .ag-menu-option-text {
    min-width: 120px;
    max-width: 170px;
    text-align: center;
  }

  .ag-theme-blue .ag-menu .lk-row-identifier {
    font-weight: bold;
    opacity: 1;
    background-color: #d4eaff;
  }

  // status bar todo
  // .ag-cell-range-selected:not(.ag-cell-focus) {
  //   background-color: rgba(120, 120, 120, 0);
  // }
  //
  // [col-id='ReqAmount'].ag-cell.ag-cell-range-selected {
  //   background-color: rgba(120, 120, 120, 0.4);
  // }
  //
  // [col-id='ReqAmount'].ag-header-cell {
  //   border: 2px solid black;
  // }

  // status bar temporary
  .ag-cell-range-selected.ag-cell-focus {
    background-color: rgba(120, 120, 120, 0.4);
  }
`

class AgGridTheme extends Component {
  render() {
    return (
      <AgGridThemeProvider className="ag-theme-blue">
        <Whatever {...this.props} />
      </AgGridThemeProvider>
    )
  }
}

export default AgGridTheme
