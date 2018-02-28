import { createSelector } from 'reselect'

import { getInstance } from '../../selectors'

export const getInstanceExistence = createSelector(getInstance, instance => Boolean(instance))
