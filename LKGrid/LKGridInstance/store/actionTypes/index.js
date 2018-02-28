export const GRID_STATE_FETCH = 'LKGridInstance/GRID_STATE_FETCH'

export default {
  DESTROY: 'LKGridInstance/DESTROY',

  gridState: {
    FETCH_AND_REDUCE: 'LKGridInstance/gridState/FETCH_AND_REDUCE',

    SAVE: 'LKGridInstance/gridState/SAVE',

    REDUCE_SYNCED_GRID_IDENTITY: 'LKGridInstance/gridState/REDUCE_SYNCED_GRID_IDENTITY',
    REDUCE_GRIDSTATE_SOURCE_IS_WEBAPI: 'LKGridInstance/gridState/REDUCE_GRIDSTATE_SOURCE_IS_WEBAPI',

    REDUCE_COLUMNS_HEADERS: 'LKGridInstance/gridState/REDUCE_COLUMNS_HEADERS',

    REDUCE_COLUMNS_WIDTHS: 'LKGridInstance/gridState/REDUCE_COLUMNS_WIDTHS',
    REDUCE_COLUMN_WIDTH: 'LKGridInstance/gridState/REDUCE_COLUMN_WIDTH',

    REDUCE_COLUMNS_VISIBILITIES: 'LKGridInstance/gridState/REDUCE_COLUMNS_VISIBILITIES',
    REDUCE_COLUMN_VISIBILITY: 'LKGridInstance/gridState/REDUCE_COLUMN_VISIBILITY',

    REDUCE_COLUMNS_ORDER: 'LKGridInstance/gridState/REDUCE_COLUMNS_ORDER',
    REDUCE_COLUMN_INDEX: 'LKGridInstance/gridState/REDUCE_COLUMN_INDEX',
  },

  initialGridState: {
    REDUCE: 'LKGridInstance/initialGridState/REDUCE',
  },

  MAKE_DEFAULT_SELECTED_TRUE: 'LKGridInstance/MAKE_DEFAULT_SELECTED_TRUE',

  selectedRow: {
    SELECT: 'LKGridInstance/selectedRow/SELECT',
    DESELECT: 'LKGridInstance/selectedRow/DESELECT',
  },

  sortedColumn: {
    SORT_ASC: 'LKGridInstance/sortedColumn/SORT_ASC',
    SORT_DESC: 'LKGridInstance/sortedColumn/SORT_DESC',
    SORT_NONE: 'LKGridInstance/sortedColumn/SORT_NONE',
  },

  apisRepresentative: {
    SET: 'LKGridInstance/apisRepresentative/SET',
    DELETE: 'LKGridInstance/apisRepresentative/DELETE',
  },
}
