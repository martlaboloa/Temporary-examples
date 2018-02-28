import React from 'react'
import isUndefined from 'lodash/isUndefined'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ColumnsResizing from './ColumnsResizing'
import { COLUMN_WIDTH_DEFAULT, ICON_COLUMN_WIDTH } from '../constants'
import {
  getSyncedGridIdentity,
  getGridStateSourceIsWebAPI,
  makeGetIconColumns,
  fetchAndReduceGridState as fetchAndReduceGridStateUndisp,
  reduceSyncedGridIdentity as reduceSyncedGridIdentityUndisp,
  reduceGridStateSourceIsWebAPI as reduceGridStateSourceIsWebAPIUndisp,
  reduceColumnsHeaders as reduceColumnsHeadersUndisp,
  reduceColumnsWidths as reduceColumnsWidthsUndisp,
  reduceColumnsVisibilities as reduceColumnsVisibilitiesUndisp,
  reduceColumnsOrder as reduceColumnsOrderUndisp,
} from '../store'

class GridState extends React.Component {
  componentWillMount() {
    const { reduceGridStateSourceIsWebAPI } = this.props
    reduceGridStateSourceIsWebAPI()
    this.defineGridState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.defineGridState(nextProps)
  }

  defineGridState(props) {
    const {
      iGridIdentity,
      gridStateSourceIsWebAPI,
      iconColumns,

      syncedGridIdentity,

      fetchAndReduceGridState,
    } = props

    if (gridStateSourceIsWebAPI) {
      if (syncedGridIdentity === null || iGridIdentity !== syncedGridIdentity) {
        fetchAndReduceGridState(iGridIdentity, iconColumns)
      }
    } else {
      this.defineGridStateFromProps(props)
    }
  }

  defineGridStateFromProps(props) {
    this.defineSyncedGridIdentityFromProps(props)
    this.defineColumnsPropertiesFromProps(props)
  }

  defineSyncedGridIdentityFromProps(props) {
    const { reduceSyncedGridIdentity, iSyncGridState } = props
    if (!iSyncGridState) {
      reduceSyncedGridIdentity(null)
    }
  }

  defineColumnsPropertiesFromProps(props) {
    const { iColumnDefs, iRowData } = props
    const rowSample = iRowData[0]

    let columnDefs = []
    if (!isUndefined(iColumnDefs)) {
      columnDefs = iColumnDefs
    } else if (!isUndefined(rowSample)) {
      columnDefs = Object.keys(rowSample).map(field => ({
        headerName: field,
        field,
      }))
    }

    this.defineColumnsPropertiesFromColumnDefs(columnDefs, props)
  }

  defineColumnsPropertiesFromColumnDefs(columnDefs, props) {
    const {
      reduceColumnsHeaders,
      reduceColumnsWidths,
      reduceColumnsVisibilities,
      reduceColumnsOrder,
      iconColumns,
    } = props

    const columnsHeaders = columnDefs.reduce((acc, { field, headerName }) => ({ ...acc, [field]: headerName }), {})

    const getWidth = (field, width) => {
      if (!iconColumns.includes(field)) {
        if (width) {
          return width
        }
        return COLUMN_WIDTH_DEFAULT
      }

      return ICON_COLUMN_WIDTH
    }
    const columnsWidths = columnDefs.reduce(
      (acc, { field, width }) => ({
        ...acc,
        [field]: getWidth(field, width),
      }),
      {},
    )

    const columnsVisibilities = columnDefs.reduce((acc, { field }) => ({ ...acc, [field]: true }), {})

    const columnsOrder = columnDefs.map(({ field }) => field)

    reduceColumnsHeaders(columnsHeaders)
    reduceColumnsWidths(columnsWidths)
    reduceColumnsVisibilities(columnsVisibilities)
    reduceColumnsOrder(columnsOrder)
  }

  render() {
    return <ColumnsResizing {...this.props} />
  }
}

export default connect(
  () => {
    const getIconColumns = makeGetIconColumns()
    return (state, props) => ({
      syncedGridIdentity: getSyncedGridIdentity(state, props),
      gridStateSourceIsWebAPI: getGridStateSourceIsWebAPI(state, props),
      iconColumns: getIconColumns(state, props),
    })
  },
  (dispatch, { getInstancedActions, iSyncGridState }) =>
    bindActionCreators(
      getInstancedActions({
        fetchAndReduceGridState: (gridIdentity, iconColumns) =>
          fetchAndReduceGridStateUndisp(gridIdentity, iconColumns, getInstancedActions),
        reduceGridStateSourceIsWebAPI: () => reduceGridStateSourceIsWebAPIUndisp(iSyncGridState),
        reduceSyncedGridIdentity: reduceSyncedGridIdentityUndisp,
        reduceColumnsHeaders: reduceColumnsHeadersUndisp,
        reduceColumnsWidths: reduceColumnsWidthsUndisp,
        reduceColumnsVisibilities: reduceColumnsVisibilitiesUndisp,
        reduceColumnsOrder: reduceColumnsOrderUndisp,
      }),
      dispatch,
    ),
)(GridState)
