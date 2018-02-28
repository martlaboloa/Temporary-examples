import { createSelector } from 'reselect'
import { getSortedColumnName } from '../../selectors'

export const isColumnSorted = createSelector(getSortedColumnName, sortedColumnName => sortedColumnName !== undefined)
