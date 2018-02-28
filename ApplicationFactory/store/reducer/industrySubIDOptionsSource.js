import actions from '../actionTypes'

const nonexistentState = null

const initial = nonexistentState

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.industrySubIDOptionsSource.SET: {
      return payload
    }
    case actions.industrySubIDOptionsSource.DELETE: {
      return nonexistentState
    }
    default:
      return state
  }
}
