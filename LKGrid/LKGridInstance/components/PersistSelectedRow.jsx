import React, { Component } from 'react'
import isUndefined from 'lodash/isUndefined'
import isEqual from 'lodash/isEqual'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PersistSelectedRowVisibility from './PersistSelectedRowVisibility'
import {
  getSelectedRow,
  isRowSelected as isRowSelectedSel,
  selectRow as selectRowUndisp,
  deselectRow as deselectRowUndisp,
} from '../store'

class PersistSelectedRow extends Component {
  componentWillMount() {
    const { isRowSelected, iRowData, iGetRowNodeId, selectedRow, deselectRow } = this.props

    if (isRowSelected) {
      const hasSelectRow = iRowData.reduce(
        (hasSelectedRow, nextRow) =>
          hasSelectedRow ||
          (!isUndefined(iGetRowNodeId)
            ? iGetRowNodeId(nextRow) === iGetRowNodeId(selectedRow)
            : isEqual(nextRow, selectedRow)),
        false,
      )

      if (!hasSelectRow) {
        deselectRow()
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isRowSelected, selectedRow, deselectRow, iGetRowNodeId } = this.props

    if (isRowSelected) {
      if (this.props.iRowData !== nextProps.iRowData) {
        const hasSelectRow = nextProps.iRowData.reduce(
          (hasSelectedRow, nextRow) =>
            hasSelectedRow ||
            (!isUndefined(iGetRowNodeId)
              ? iGetRowNodeId(nextRow) === iGetRowNodeId(selectedRow)
              : isEqual(nextRow, selectedRow)),

          false,
        )

        if (!hasSelectRow) {
          // console.log('ddddddddddddddddddd', nextProps.iRowData, isUndefined(iGetRowNodeId), !hasSelectRow)

          deselectRow()
        }
      }
    }
  }

  getSelectedRowNode = api => {
    const { iGetRowNodeId, selectedRow } = this.props

    // console.log('oooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', selectedRow)

    let selectedRowNode

    if (!isUndefined(iGetRowNodeId)) {
      selectedRowNode = api.getRowNode(iGetRowNodeId(selectedRow))
    } else {
      api.forEachNode(node => {
        const nodeData = node.data

        if (isEqual(nodeData, selectedRow)) {
          selectedRowNode = node
        }
      })
    }

    return selectedRowNode
  }

  persSelecRowOnGridReady = ({ api }) => {
    const { instanceName, isRowSelected } = this.props

    // console.log('persSelecRowOnGridReadyyyyyyyyyyy')

    if (isRowSelected) {
      const selectedRowNode = this.getSelectedRowNode(api)

      selectedRowNode.setSelected(true, true)
    }

    api.addEventListener('rowDataChanged', () => {
      console.log('rowDataChangeddddddddddD: ', this.props.isRowSelected)

      if (this.props.isRowSelected) {
        const selectedRowNode = this.getSelectedRowNode(api)

        selectedRowNode.setSelected(true, true)
      }
    })
  }

  persSelecRowOnSelectionChanged = ({ api }) => {
    const { selectRow, deselectRow } = this.props

    const selectedRows = api.getSelectedRows()

    if (selectedRows.length > 1) {
      console.error('LKGrid error: there is more than one rows selected')
    }

    const firstSelectedRow = selectedRows[0]

    if (!isUndefined(firstSelectedRow)) {
      selectRow(firstSelectedRow)
    } else {
      deselectRow()
    }
  }

  render() {
    return (
      <PersistSelectedRowVisibility
        {...this.props}
        persSelecRowOnSelectionChanged={this.persSelecRowOnSelectionChanged}
        persSelecRowOnGridReady={this.persSelecRowOnGridReady}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    selectedRow: getSelectedRow(state, props),
    isRowSelected: isRowSelectedSel(state, props),
  }),
  (dispatch, { getInstancedActions }) =>
    bindActionCreators(
      getInstancedActions({
        selectRow: selectRowUndisp,
        deselectRow: deselectRowUndisp,
      }),
      dispatch,
    ),
)(PersistSelectedRow)
