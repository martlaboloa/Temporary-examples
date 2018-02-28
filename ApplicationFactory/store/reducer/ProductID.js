import actions from '../actionTypes'

const initial = null

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.SET_PRODUCT_ID: {
      return payload
    }
    default:
      return state
  }
}
