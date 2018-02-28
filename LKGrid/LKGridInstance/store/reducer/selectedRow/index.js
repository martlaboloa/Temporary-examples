import actions from '../../actionTypes'

export const deselectedRowState = null

const initial = deselectedRowState

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.selectedRow.SELECT: {
      return payload
    }
    case actions.selectedRow.DESELECT: {
      return deselectedRowState
    }
    default:
      return state
  }
}
