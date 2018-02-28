import get from 'lodash/get'

// zero layer
export const getLKGridInstance = (state, { getReducerRoot }) => getReducerRoot(state)

// first layer
export const getGridState = (state, props) => getLKGridInstance(state, props).gridState

export const getInitialGridState = (state, props) => getLKGridInstance(state, props).initialGridState

export const getDefaultSelected = (state, props) => getLKGridInstance(state, props).defaultSelected

export const getSelectedRow = (state, props) => get(getLKGridInstance(state, props), 'selectedRow')

export const getSortedColumn = (state, props) => getLKGridInstance(state, props).sortedColumn

export const getApisRepresentative = (state, props) => get(getLKGridInstance(state, props), 'apisRepresentative')

// second layer

/*
grid State
 */
export const getColumnsWidths = (state, props) => getGridState(state, props).columnsWidths

export const getColumnsVisibilities = (state, props) => getGridState(state, props).columnsVisibilities

export const getColumnsOrder = (state, props) => getGridState(state, props).columnsOrder

export const getColumnsHeaders = (state, props) => getGridState(state, props).columnsHeaders

export const getSyncedGridIdentity = (state, props) => getGridState(state, props).syncedGridIdentity

export const getGridStateSourceIsWebAPI = (state, props) => getGridState(state, props).gridStateSourceIsWebAPI

/*
sorted column
 */
export const getSortedColumnName = (state, props) => getSortedColumn(state, props).name

export const getSortedColumnState = (state, props) => getSortedColumn(state, props).sortState
