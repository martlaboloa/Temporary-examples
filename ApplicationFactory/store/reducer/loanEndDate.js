import actions from '../actionTypes'

const nonexistentState = null

const initial = nonexistentState

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.loanEndDate.SET: {
      return payload
    }
    case actions.loanEndDate.DELETE: {
      return nonexistentState
    }
    default:
      return state
  }
}
