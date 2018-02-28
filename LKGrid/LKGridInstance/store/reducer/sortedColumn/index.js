import actions from '../../actionTypes'

export const columnSortStates = {
  NONE: 0,
  ASCENDING: 1,
  DESCENDING: 2,
}

const initial = {
  name: undefined,
  sortState: columnSortStates.NONE,
}

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.sortedColumn.SORT_ASC: {
      return { name: payload, sortState: columnSortStates.ASCENDING }
    }
    case actions.sortedColumn.SORT_DESC: {
      return { name: payload, sortState: columnSortStates.DESCENDING }
    }
    case actions.sortedColumn.SORT_NONE: {
      return { name: undefined, sortState: columnSortStates.NONE }
    }
    default:
      return state
  }
}
