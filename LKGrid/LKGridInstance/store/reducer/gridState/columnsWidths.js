import actions from '../../actionTypes'

const initial = {}

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.gridState.REDUCE_COLUMNS_WIDTHS: {
      const { columnsWidths } = payload
      return columnsWidths
    }
    case actions.gridState.REDUCE_COLUMN_WIDTH: {
      const { field, width } = payload
      return {
        ...state,
        [field]: width,
      }
    }
    default:
      return state
  }
}
