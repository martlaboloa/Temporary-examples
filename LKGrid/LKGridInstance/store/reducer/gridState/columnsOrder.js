import actions from '../../actionTypes'

const initial = []

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.gridState.REDUCE_COLUMNS_ORDER: {
      const { columnsOrder } = payload
      return columnsOrder
    }
    case actions.gridState.REDUCE_COLUMN_INDEX: {
      const { field, index } = payload

      const withoutMovedIndex = state.filter(currField => currField !== field)

      withoutMovedIndex.splice(index, 0, field)

      return withoutMovedIndex
    }
    default:
      return state
  }
}
