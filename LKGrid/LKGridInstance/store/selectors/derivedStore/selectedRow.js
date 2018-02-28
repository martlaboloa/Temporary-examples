import { createSelector } from 'reselect'
import isUndefined from 'lodash/isUndefined'
import { getSelectedRow, getApisRepresentative } from '../../selectors'
import { deselectedRowState } from '../../reducer/selectedRow'
import { nonexistentApisRepresentativeState } from '../../reducer/apisRepresentative'

export const isRowSelected = createSelector(
  getSelectedRow,
  selectedRow => selectedRow !== undefined && selectedRow !== deselectedRowState,
)

export const getApisExist = createSelector(
  getApisRepresentative,
  apisRepresentative => !isUndefined(apisRepresentative) && apisRepresentative !== nonexistentApisRepresentativeState,
)
