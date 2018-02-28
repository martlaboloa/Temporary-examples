import actions from '../actionTypes'

const nonexistentState = null

const initial = nonexistentState

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.reqCurrencyValData.SET: {
      return payload
    }
    case actions.reqCurrencyValData.DELETE: {
      return nonexistentState
    }
    default:
      return state
  }
}
