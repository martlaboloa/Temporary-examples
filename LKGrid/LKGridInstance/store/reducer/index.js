import { combineReducers } from 'redux'

import gridState from './gridState'
import initialGridState from './initialGridState'
import defaultSelected from './defaultSelected'
import selectedRow from './selectedRow'
import sortedColumn from './sortedColumn'
import apisRepresentative from './apisRepresentative'

export default combineReducers({
  gridState,
  initialGridState,
  defaultSelected,
  selectedRow,
  sortedColumn,
  apisRepresentative,
})
