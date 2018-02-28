import React, { Component } from 'react'
import isUndefined from 'lodash/isUndefined'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PersistSelectedRow from './PersistSelectedRow'
import { stateSortToAgGrid } from '../helpers'
import {
  isColumnSorted as isColumnSortedSel,
  getSortedColumn,
  sortAscColumn as sortAscColumnUndisp,
  sortDescColumn as sortDescColumnUndisp,
  sortNoneColumn as sortNoneColumnUndisp,
} from '../store'

class PersistSortedColumn extends Component {
  componentWillReceiveProps(nextProps) {
    const { sortNoneColumn } = this.props

    if (this.props.iRowData !== nextProps.iRowData) {
      sortNoneColumn()
    }
  }

  // persistSortedColumnOnGridReady = ({ api }) => {
  //   const { isColumnSorted, sortedColumn: { name, sortState } } = this.props
  //
  //   if (isColumnSorted) {
  //     const sort = [{ colId: name, sort: stateSortToAgGrid(sortState) }]
  //
  //     api.setSortModel(sort)
  //   }
  // }

  persistSortedColumnOnSortChanged = ({ api }) => {
    const { sortAscColumn, sortDescColumn, sortNoneColumn } = this.props

    const sortedColumn = api.getSortModel()[0]

    if (!isUndefined(sortedColumn)) {
      const { colId, sort } = sortedColumn

      if (sort === 'asc') {
        sortAscColumn(colId)
      } else if (sort === 'desc') {
        sortDescColumn(colId)
      }
    } else {
      sortNoneColumn()
    }
  }

  render() {
    return (
      <PersistSelectedRow {...this.props} persistSortedColumnOnSortChanged={this.persistSortedColumnOnSortChanged} />
    )
  }
}

export default connect(
  (state, props) => ({
    isColumnSorted: isColumnSortedSel(state, props),
    sortedColumn: getSortedColumn(state, props),
  }),
  (dispatch, { getInstancedActions }) =>
    bindActionCreators(
      getInstancedActions({
        sortAscColumn: sortAscColumnUndisp,
        sortDescColumn: sortDescColumnUndisp,
        sortNoneColumn: sortNoneColumnUndisp,
      }),
      dispatch,
    ),
)(PersistSortedColumn)
