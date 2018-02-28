import { createSelector } from 'reselect'

import { getInstance } from '../../selectors'

export const getInstanceExistence = instanceName =>
  createSelector(getInstance(instanceName), instance => Boolean(instance))
