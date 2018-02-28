import actions from '../../actionTypes'

const initial = false

export default function(state = initial, { type }) {
  switch (type) {
    case actions.MAKE_DEFAULT_SELECTED_TRUE: {
      return true
    }
    default:
      return state
  }
}
