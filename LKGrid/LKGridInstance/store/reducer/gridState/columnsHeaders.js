import actions from '../../actionTypes'

const initial = {}

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.gridState.REDUCE_COLUMNS_HEADERS: {
      const { columnsHeaders } = payload
      return columnsHeaders
    }
    default:
      return state
  }
}
