import { combineReducers } from 'redux'

import columnsWidths from './columnsWidths'
import columnsVisibilities from './columnsVisibilities'
import columnsOrder from './columnsOrder'
import columnsHeaders from './columnsHeaders'
import syncedGridIdentity from './syncedGridIdentity'
import gridStateSourceIsWebAPI from './gridStateSourceIsWebAPI'

export default combineReducers({
  columnsWidths,
  columnsVisibilities,
  columnsOrder,
  columnsHeaders,
  syncedGridIdentity,
  gridStateSourceIsWebAPI,
})
