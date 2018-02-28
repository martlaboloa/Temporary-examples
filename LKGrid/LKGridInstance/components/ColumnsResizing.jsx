import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ColumnsOrder from './ColumnsOrder'
import { reduceColumnWidth } from '../store'

class ColumnsResizing extends React.Component {
  onColumnResized = (field, width) => {
    this.props.reduceColumnWidth(field, width)
  }

  render() {
    return <ColumnsOrder {...this.props} onColumnResized={this.onColumnResized} />
  }
}

export default connect(undefined, (dispatch, { getInstancedActions }) =>
  bindActionCreators(
    getInstancedActions({
      reduceColumnWidth,
    }),
    dispatch,
  ),
)(ColumnsResizing)
