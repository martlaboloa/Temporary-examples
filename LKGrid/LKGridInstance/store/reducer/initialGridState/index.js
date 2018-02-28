import actions from '../../actionTypes'

const initial = null

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.initialGridState.REDUCE: {
      return payload
    }
    default:
      return state
  }
}
