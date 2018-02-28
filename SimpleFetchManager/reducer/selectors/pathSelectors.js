import { createSelector } from 'reselect'

import { REDUCER_NAME } from '../../constants'
import { identityFn } from '../../reducer'

// zero layer
export const getSimpleFetchManager = state => state[REDUCER_NAME]

// first layer
export const getInstance = instanceName =>
  createSelector(getSimpleFetchManager, simpleFetchManager => simpleFetchManager[identityFn({ instanceName })])
