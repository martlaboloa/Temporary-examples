import React from 'react'
import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'
import Disabling from '../Disabling'
import container from './container'

class ColumnDefsJamming extends React.Component {
  componentWillMount() {
    this.columnDefsJammed = false
    this.defineColumnDefs(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.shallowCompareProps('gridStateSourceIsWebAPI', nextProps)) {
      this.columnDefsJammed = false
    }
    this.defineColumnDefs(nextProps)
  }

  defineColumnDefs(props) {
    const { columnDefsJammed } = this
    const { syncedGridIdentity, columnDefs, gridStateSourceIsWebAPI, iColumnDefs, iRowData } = props

    if (gridStateSourceIsWebAPI) {
      if (!columnDefsJammed) {
        this.columnDefs = columnDefs
      }
      if (!columnDefsJammed && !isNull(syncedGridIdentity)) {
        this.columnDefsJammed = true
      }
    } else {
      if (!columnDefsJammed) {
        this.columnDefs = columnDefs
      }
      if (!columnDefsJammed && (!isUndefined(iColumnDefs) || !isUndefined(iRowData[0]))) {
        this.columnDefsJammed = true
      }
    }
  }

  shallowCompareProps(propName1, nextProps) {
    return this.props[propName1] === nextProps[propName1]
  }

  render() {
    return <Disabling {...this.props} columnDefs={this.columnDefs} />
  }
}

export default container(ColumnDefsJamming)
