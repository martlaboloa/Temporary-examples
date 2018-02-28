import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduceColumnVisibility } from '../store'
import CellEvents from './CellEvents'

class ColumnsVisibilities extends React.Component {
  onColumnVisible = (field, visible) => {
    this.props.reduceColumnVisibility(field, visible)
  }

  render() {
    return <CellEvents {...this.props} onColumnVisible={this.onColumnVisible} />
  }
}

export default connect(undefined, (dispatch, { getInstancedActions }) =>
  bindActionCreators(
    getInstancedActions({
      reduceColumnVisibility,
    }),
    dispatch,
  ),
)(ColumnsVisibilities)
