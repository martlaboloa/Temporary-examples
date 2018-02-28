import { createSelector } from 'reselect'
import getPropSelector from 'helpers/getPropSelector'
import { REDUCER_NAME } from '../../constants'
import { identityFn } from '../../reducer'

// zero layer
export const getLKGrid = state => state[REDUCER_NAME]

// first layer
export const getInstance = createSelector(
  getLKGrid,
  getPropSelector('instanceName'),
  (LKGrid, instanceName) => LKGrid[identityFn({ instanceName })],
)
