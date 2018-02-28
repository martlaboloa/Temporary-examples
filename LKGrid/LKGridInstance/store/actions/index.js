import { Grids } from 'WebAPI'
import { fetch } from 'shared/SimpleFetchManager'
import createAction from '../../../../../../reducers/actionHelpers'
import actions, { GRID_STATE_FETCH } from '../actionTypes'
import {
  SEARCHES_GRID_STATES_FETCHER_NAME,
  CLIENT_VIEW_GRID_STATES_FETCHER_NAME,
  searchesFormName,
  clientViewFormName,
} from '../../constants'
import { gridStateCategories } from '../../helpers'

export const destroy = (getReducerRoot, getInstancedActions) =>
  createAction(actions.DESTROY, { getReducerRoot, getInstancedActions })

/*
grid state
 */
export const fetchAndReduceGridState = (gridIdentity, iconColumns, getInstancedActions) =>
  createAction(actions.gridState.FETCH_AND_REDUCE, {
    gridIdentity,
    iconColumns,
    getInstancedActions,
  })

export const fetchGridState = (category, additionalProps) =>
  createAction(GRID_STATE_FETCH, { category, ...additionalProps })

export const fetchIdentityGridState = ({ formName, objectName, resolve, reject }) =>
  fetchGridState(gridStateCategories.identity, { formName, objectName, resolve, reject })

export const saveGridState = (gridIdentity, getReducerRoot) =>
  createAction(actions.gridState.SAVE, { gridIdentity, getReducerRoot })

export const reduceSyncedGridIdentity = syncedGridIdentity =>
  createAction(actions.gridState.REDUCE_SYNCED_GRID_IDENTITY, { syncedGridIdentity })

export const reduceGridStateSourceIsWebAPI = gridStateSourceIsWebAPI =>
  createAction(actions.gridState.REDUCE_GRIDSTATE_SOURCE_IS_WEBAPI, { gridStateSourceIsWebAPI })

export const reduceColumnsHeaders = columnsHeaders =>
  createAction(actions.gridState.REDUCE_COLUMNS_HEADERS, { columnsHeaders })

export const reduceColumnsWidths = columnsWidths =>
  createAction(actions.gridState.REDUCE_COLUMNS_WIDTHS, { columnsWidths })
export const reduceColumnWidth = (field, width) => createAction(actions.gridState.REDUCE_COLUMN_WIDTH, { field, width })

export const reduceColumnsVisibilities = columnsVisibilities =>
  createAction(actions.gridState.REDUCE_COLUMNS_VISIBILITIES, { columnsVisibilities })
export const reduceColumnVisibility = (field, visible) =>
  createAction(actions.gridState.REDUCE_COLUMN_VISIBILITY, { field, visible })

export const reduceColumnsOrder = columnsOrder => createAction(actions.gridState.REDUCE_COLUMNS_ORDER, { columnsOrder })
export const reduceColumnIndex = (field, index) => createAction(actions.gridState.REDUCE_COLUMN_INDEX, { field, index })

/*
initial grid state
 */
export const reduceInitialGridState = gridState => createAction(actions.initialGridState.REDUCE, gridState)

/*
default selected
 */
export const makeDefaultSelectedTrue = () => createAction(actions.MAKE_DEFAULT_SELECTED_TRUE)

/*
selected row
 */
export const selectRow = row => createAction(actions.selectedRow.SELECT, row)

export const deselectRow = () => createAction(actions.selectedRow.DESELECT)

/*
sorted Column
 */
export const sortAscColumn = colName => createAction(actions.sortedColumn.SORT_ASC, colName)

export const sortDescColumn = colName => createAction(actions.sortedColumn.SORT_DESC, colName)

export const sortNoneColumn = () => createAction(actions.sortedColumn.SORT_NONE)

/*
searches grid states. frm_Main.
 */
export const fetchSearchesGridStates = () => fetchGridState(gridStateCategories.searches)

/*
views grid states
 */
export const fetchClientViewGridStates = () => fetchGridState(gridStateCategories.clientView)

export const fetchApplicationViewGridStates = () => fetchGridState(gridStateCategories.applicationView)

export const fetchCollateralViewGridStates = () => fetchGridState(gridStateCategories.collateralView)

export const fetchLoanViewGridStates = () => fetchGridState(gridStateCategories.loanView)

/*
apis representative
*/
export const setApis = ({ api, columnApi }) => createAction(actions.apisRepresentative.SET, { api, columnApi })

export const deleteApis = () => createAction(actions.apisRepresentative.DELETE)
