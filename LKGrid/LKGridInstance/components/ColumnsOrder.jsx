import { connect } from 'react-redux'
import isUndefined from 'lodash/isUndefined'
import { bindActionCreators } from 'redux'
import React from 'react'
import ColumnsVisibilities from './ColumnsVisibilities'
import { reduceColumnIndex as reduceColumnIndexUndisp } from '../store'

class ColumnsOrder extends React.Component {
  onColumnMoved = (field, index) => {
    const { iGetContextMenuItems, reduceColumnIndex } = this.props

    reduceColumnIndex(field, !isUndefined(iGetContextMenuItems) ? index - 1 : index)
  }

  render() {
    return <ColumnsVisibilities {...this.props} onColumnMoved={this.onColumnMoved} suppressDragLeaveHidesColumns />
  }
}

export default connect(undefined, (dispatch, { getInstancedActions }) =>
  bindActionCreators(
    getInstancedActions({
      reduceColumnIndex: reduceColumnIndexUndisp,
    }),
    dispatch,
  ),
)(ColumnsOrder)
