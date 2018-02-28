import actions from '../../actionTypes'

const initial = {}

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.gridState.REDUCE_COLUMNS_VISIBILITIES: {
      const { columnsVisibilities } = payload
      return columnsVisibilities
    }
    case actions.gridState.REDUCE_COLUMN_VISIBILITY: {
      const { field, visible } = payload

      return {
        ...state,
        [field]: visible,
      }
    }
    default:
      return state
  }
}
