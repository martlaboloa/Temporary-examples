import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import isUndefined from 'lodash/isUndefined'
import SelectionWithArrowKeys from './SelectionWithArrowKeys'
import { getSelectedRow, isRowSelected as isRowSelectedSel } from '../store'

class PersistSelectedRowVisibility extends Component {
  onGridReady = ({ api }) => {
    const { isRowSelected, iGetRowNodeId, selectedRow } = this.props

    if (isRowSelected) {
      api.ensureNodeVisible(
        ({ data }) =>
          !isUndefined(iGetRowNodeId) ? iGetRowNodeId(data) === iGetRowNodeId(selectedRow) : isEqual(data, selectedRow),
      )
    }
  }

  render() {
    return <SelectionWithArrowKeys {...this.props} persistSelRowVisOnGridReady={this.onGridReady} />
  }
}
export default connect((state, props) => ({
  selectedRow: getSelectedRow(state, props),
  isRowSelected: isRowSelectedSel(state, props),
}))(PersistSelectedRowVisibility)
