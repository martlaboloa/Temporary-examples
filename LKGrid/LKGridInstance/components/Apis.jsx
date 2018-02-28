import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GridState from './GridState'
import { setApis as setApisUndisp } from '../store'

class Apis extends Component {
  ApisOnGridReady = ({ api, columnApi }) => {
    const { setApis } = this.props

    setApis({ api, columnApi })
  }

  render() {
    return <GridState {...this.props} ApisOnGridReady={this.ApisOnGridReady} />
  }
}

export default connect(undefined, (dispatch, { getInstancedActions }) =>
  bindActionCreators(
    getInstancedActions({
      setApis: setApisUndisp,
    }),
    dispatch,
  ),
)(Apis)
