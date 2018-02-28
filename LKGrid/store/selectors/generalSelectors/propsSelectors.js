import { createSelector } from 'reselect'
import has from 'lodash/has'
import getPropSelector from 'helpers/getPropSelector'
import { getGetInstancedActions as getGetInstancedActionsHelper } from '../../../helpers'
import { getInstance } from '../../selectors'

export const makeGetGetInstancedActions = () =>
  createSelector(getPropSelector('instanceName'), instanceName => getGetInstancedActionsHelper(instanceName))

export const makeGetGetInstanceReducerRoot = () =>
  createSelector(getPropSelector('instanceName'), instanceName => state => getInstance(state, { instanceName }))
