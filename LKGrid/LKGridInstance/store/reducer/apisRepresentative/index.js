import { unsafeGUID } from 'helpers'
import actions from '../../actionTypes'

export const nonexistentApisRepresentativeState = null

export const apisOutsideStore = {}

// setInterval(() => {
//   console.log('apisOutsideStore: ', apisOutsideStore)
// }, 5000)

const initial = nonexistentApisRepresentativeState

export default function(state = initial, { type }) {
  switch (type) {
    case actions.apisRepresentative.SET: {
      return unsafeGUID()
    }
    case actions.apisRepresentative.DELETE: {
      return nonexistentApisRepresentativeState
    }
    default:
      return state
  }
}
