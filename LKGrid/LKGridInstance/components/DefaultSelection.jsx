import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getDefaultSelected, makeDefaultSelectedTrue as makeDefaultSelectedTrueUndisp } from '../store'
import StatusBarRangeSelection from './StatusBarRangeSelection'

const noop = () => {}

class DefaultSelection extends React.Component {
  onGridReady = ({ api }) => {
    const { defaultSelected, makeDefaultSelectedTrue, iSelectFirstRow, iSelectLastRow } = this.props

    const selectRowSafely = () => {
      const rowModel = api.getModel()

      const lastRowIndex = rowModel.getRowCount() - 1

      const rowToSelect = iSelectFirstRow ? api.getDisplayedRowAtIndex(0) : api.getDisplayedRowAtIndex(lastRowIndex)

      if (rowToSelect) {
        rowToSelect.setSelected(true, true)

        if (iSelectLastRow) {
          api.ensureIndexVisible(lastRowIndex)
        }
      }
    }

    if (!defaultSelected) {
      selectRowSafely()

      makeDefaultSelectedTrue()
    }

    api.addEventListener('rowDataChanged', () => {
      selectRowSafely(api)
    })
  }

  getChildComponentProps() {
    const { iSelectFirstRow, iSelectLastRow } = this.props

    if (iSelectFirstRow && iSelectLastRow) {
      console.error(
        "LKGrid, default row selection: selectFirstRow and selectLastRow props are both true, you can't select both rows",
      )
    }

    const childComponentProps = {
      ...this.props,
    }

    childComponentProps.defaultSelectionsOnGridReady = iSelectFirstRow || iSelectLastRow ? this.onGridReady : noop

    return childComponentProps
  }

  render() {
    return <StatusBarRangeSelection {...this.getChildComponentProps()} />
  }
}

export default connect(
  (state, props) => ({
    defaultSelected: getDefaultSelected(state, props),
  }),
  (dispatch, { getInstancedActions }) =>
    bindActionCreators(
      getInstancedActions({
        makeDefaultSelectedTrue: makeDefaultSelectedTrueUndisp,
      }),
      dispatch,
    ),
)(DefaultSelection)
