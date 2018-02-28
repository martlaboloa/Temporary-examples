import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import isUndefined from 'lodash/isUndefined'
import { connect } from 'react-redux'
import { getLocaleText, getShowToolPanel } from '../store'

class Whatever extends React.Component {
  onColumnResized = ({ column: { colDef: { field }, actualWidth } }) => {
    this.props.onColumnResized(field, actualWidth)
  }

  onColumnMoved = ({ column: { colDef: { field } }, toIndex }) => {
    this.props.onColumnMoved(field, toIndex)
  }

  onColumnVisible = ({ column: { colDef: { field } }, visible }) => {
    this.props.onColumnVisible(field, visible)
  }

  onGridReady = params => {
    const {
      iOnGridReady,
      ApisOnGridReady,
      defaultSelectionsOnGridReady,
      persSelecRowOnGridReady,
      persistSelRowVisOnGridReady,
    } = this.props

    if (iOnGridReady) {
      iOnGridReady(params)
    }

    ApisOnGridReady(params)

    defaultSelectionsOnGridReady(params)

    persSelecRowOnGridReady(params)

    persistSelRowVisOnGridReady(params)
  }

  onRowSelected = (...args) => {
    const { iOnRowSelected } = this.props

    if (!isUndefined(iOnRowSelected)) {
      iOnRowSelected(...args)
    }
  }

  onSelectionChanged = (...args) => {
    const { persSelecRowOnSelectionChanged } = this.props

    persSelecRowOnSelectionChanged(...args)
  }

  onSortChanged = (...args) => {
    const { persistSortedColumnOnSortChanged } = this.props

    persistSortedColumnOnSortChanged(...args)
  }

  onRangeSelectionChanged = e => {
    const { statusBarRangeSelectionOnRangeSelectionChanged } = this.props

    statusBarRangeSelectionOnRangeSelectionChanged(e)
  }

  getAgGridReactProps() {
    const {
      columnDefs,
      iRowData,

      getContextMenuItems,

      iEnableColumnsResize,

      iEnableColumnsOrder,
      suppressDragLeaveHidesColumns,

      iDeltaRowDataMode,
      iGetRowNodeId,

      iEnableRowSelection,
      iRowDeselection,
      iOnRowDoubleClicked,

      iEnableSorting,

      iGetRowStyle,
      iGetRowClass,

      onCellClicked,

      navigateToNextCell,

      localeText,
      showToolPanel,

      statusBarOn,
    } = this.props

    const agGridReactProps = {
      rowData: iRowData,

      columnDefs,

      onGridReady: this.onGridReady,

      enableColResize: iEnableColumnsResize,
      onColumnResized: this.onColumnResized,

      onColumnMoved: this.onColumnMoved,
      suppressMovableColumns: !iEnableColumnsOrder,
      suppressDragLeaveHidesColumns,

      deltaRowDataMode: iDeltaRowDataMode,

      onColumnVisible: this.onColumnVisible,

      enableSorting: iEnableSorting,

      overlayNoRowsTemplate: ' ',
      suppressMultiSort: true,
      showToolPanel,
      toolPanelSuppressRowGroups: true,
      toolPanelSuppressValues: true,
      toolPanelSuppressPivotMode: true,
      suppressTabbing: true,
      localeText,
    }

    if (!isUndefined(getContextMenuItems)) {
      agGridReactProps.getContextMenuItems = getContextMenuItems
    }

    if (!isUndefined(iGetRowNodeId)) {
      agGridReactProps.getRowNodeId = iGetRowNodeId
    }

    if (iEnableRowSelection) {
      agGridReactProps.rowSelection = 'single'

      agGridReactProps.rowDeselection = iRowDeselection

      agGridReactProps.onRowSelected = this.onRowSelected

      agGridReactProps.onSelectionChanged = this.onSelectionChanged

      agGridReactProps.onSortChanged = this.onSortChanged

      if (!isUndefined(iOnRowDoubleClicked)) {
        agGridReactProps.onRowDoubleClicked = iOnRowDoubleClicked
      }

      agGridReactProps.navigateToNextCell = navigateToNextCell
    }

    if (!isUndefined(iGetRowStyle)) {
      agGridReactProps.getRowStyle = iGetRowStyle
    }

    if (!isUndefined(iGetRowClass)) {
      agGridReactProps.getRowClass = iGetRowClass
    }

    if (!isUndefined(onCellClicked)) {
      agGridReactProps.onCellClicked = onCellClicked
    }

    if (statusBarOn) {
      agGridReactProps.onRangeSelectionChanged = this.onRangeSelectionChanged

      agGridReactProps.enableRangeSelection = true

      agGridReactProps.enableStatusBar = true

      agGridReactProps.alwaysShowStatusBar = true
    }

    return agGridReactProps
  }

  render() {
    return <AgGridReact {...this.getAgGridReactProps()} />
  }
}

export default connect((state, props) => ({
  localeText: getLocaleText(state, props),
  showToolPanel: getShowToolPanel(state, props),
}))(Whatever)
