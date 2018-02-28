import { createSelector } from 'reselect'
import size from 'lodash/size'
import reduce from 'lodash/reduce'
import startsWith from 'lodash/startsWith'
import { getSimpleFetchManager, getData } from 'shared/SimpleFetchManager'
import { getColumnsVisibilities, getColumnsWidths, getColumnsOrder } from '../../selectors'
import {
  GRID_STATE_FETCHER_NAME_UNIQUE_PREFIX,
  SEARCHES_GRID_STATES_FETCHER_NAME,
  CLIENT_VIEW_GRID_STATES_FETCHER_NAME,
} from '../../../constants'

export const getInfoToSave = createSelector(
  getColumnsVisibilities,
  getColumnsWidths,
  getColumnsOrder,
  (columnsVisibilities, columnsWidths, columnsOrder) => ({
    columnsVisibilities,
    columnsWidths,
    columnsOrder,
  }),
)

export const getGridStatesCount = createSelector(
  getData(SEARCHES_GRID_STATES_FETCHER_NAME),
  getData(CLIENT_VIEW_GRID_STATES_FETCHER_NAME),
  getSimpleFetchManager,
  (searchGridStates, clientViewGridStates, simpleFetchManager) =>
    size(searchGridStates) +
    size(clientViewGridStates) +
    reduce(
      simpleFetchManager,
      (count, unused, key) => (startsWith(key, GRID_STATE_FETCHER_NAME_UNIQUE_PREFIX) ? count + 1 : count),
      0,
    ),
)
