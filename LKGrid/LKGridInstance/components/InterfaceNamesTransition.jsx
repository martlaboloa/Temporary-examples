import React from 'react'
import reduce from 'lodash/reduce'
import isUndefined from 'lodash/isUndefined'
import PropTypesAndDefaultProps from './PropTypesAndDefaultProps'

const interfaceNamesTransitionObject = {
  columnDefs: 'iColumnDefs',
  rowData: 'iRowData',

  getContextMenuItems: 'iGetContextMenuItems',
  sortConfig: 'iSortConfig',
  iconsConfig: 'iIconsConfig',

  gridIdentity: 'iGridIdentity',

  syncGridState: 'iSyncGridState',
  disabled: 'iDisabled',
  selectFirstRow: 'iSelectFirstRow',
  selectLastRow: 'iSelectLastRow',
  enableColumnsResize: 'iEnableColumnsResize',
  enableColumnsOrder: 'iEnableColumnsOrder',
  enableColumnsHide: 'iEnableColumnsHide',

  deltaRowDataMode: 'iDeltaRowDataMode',
  getRowNodeId: 'iGetRowNodeId',

  enableRowSelection: 'iEnableRowSelection',
  rowDeselection: 'iRowDeselection',
  onRowSelected: 'iOnRowSelected',
  onRowDoubleClicked: 'iOnRowDoubleClicked',
  onGridReady: 'iOnGridReady',

  onCellClicked: 'iOnCellClicked',

  enableSorting: 'iEnableSorting',
  columnConfigs: 'iColumnConfigs',

  getRowStyle: 'iGetRowStyle',
  getRowClass: 'iGetRowClass',

  loading: 'iLoading',

  statusBarConfig: 'iStatusBarConfig',
}

const getRenamedProps = props =>
  reduce(
    props,
    (acc, value, key) => {
      let finalKey = key

      const newKey = interfaceNamesTransitionObject[key]
      if (!isUndefined(newKey)) {
        finalKey = newKey
      }
      acc[finalKey] = value

      return acc
    },
    {},
  )

const InterfaceNamesTransition = props => {
  const renamedProps = getRenamedProps(props)

  return <PropTypesAndDefaultProps {...renamedProps} />
}

export default InterfaceNamesTransition
