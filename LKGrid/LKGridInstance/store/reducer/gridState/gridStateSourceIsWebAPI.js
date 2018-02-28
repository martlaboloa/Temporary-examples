import actions from '../../actionTypes'

const initial = false

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.gridState.REDUCE_GRIDSTATE_SOURCE_IS_WEBAPI: {
      const { gridStateSourceIsWebAPI } = payload
      return gridStateSourceIsWebAPI
    }
    default:
      return state
  }
}
