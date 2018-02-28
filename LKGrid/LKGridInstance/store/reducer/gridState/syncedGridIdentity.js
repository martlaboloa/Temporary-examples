import actions from '../../actionTypes'

const initial = null

export default function(state = initial, { type, payload }) {
  switch (type) {
    case actions.gridState.REDUCE_SYNCED_GRID_IDENTITY: {
      const { syncedGridIdentity } = payload
      return syncedGridIdentity
    }
    default:
      return state
  }
}
