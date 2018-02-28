import { createSelector } from 'reselect'
import has from 'lodash/has'
import reduce from 'lodash/reduce'
import isUndefined from 'lodash/isUndefined'
import getPropSelector from 'helpers/getPropSelector'
import { getData, getFetchSucceeded, getPending, getInstanceExistence } from 'shared/SimpleFetchManager'
import includes from 'lodash/includes'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import { translateMain, translateColName } from '../../../../helpers'
import { getColumnsHeaders, getColumnsVisibilities, getApisExist, getApisRepresentative } from '../../selectors'
import {
  SEARCHES_GRID_STATES_FETCHER_NAME,
  SEARCHES_FORM_NAMES,
  CLIENT_VIEW_GRID_STATES_FETCHER_NAME,
  APPLICATION_VIEW_GRID_STATES_FETCHER_NAME,
  COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME,
  LOAN_VIEW_GRID_STATES_FETCHER_NAME,
  clientViewFormName,
  applicationViewFormName,
  collateralViewFormName,
  loanViewFormName,
  CLIENT_VIEW_GRID_STATE_GROUP_ADDITIONS,
  LOAN_VIEW_GRID_STATE_GROUP_ADDITIONS,
  APPLICATION_VIEW_GRID_STATE_GROUP_ADDITIONS,
} from '../../../constants'
import { stringifyGridIdentity, checkGridIdentity } from '../../../helpers'
import { apisOutsideStore } from '../../reducer/apisRepresentative'

export const getColumnsHeadersTranslated = createSelector(
  // todo
  getColumnsHeaders,
  getPropSelector('iGridIdentity'),
  (columnsHeaders, { formName, objectName }) =>
    reduce(
      columnsHeaders,
      (result, value, key) => ({
        ...result,
        [key]: translateColName(formName, objectName, value),
      }),
      {},
    ),
)

export const makeGetIconColumns = () =>
  createSelector(getPropSelector('iColumnConfigs'), iColumnConfigs => {
    if (isUndefined(iColumnConfigs)) {
      return []
    }
    return Object.keys(iColumnConfigs).filter(columnName => !isUndefined(iColumnConfigs[columnName].iconComponent))
  })

export const getLocaleText = () => ({
  excelExport: translateMain('lbl_exp_excel'),

  average: 'sashualo',
  count: 'raodenoba',
  min: 'minimaluri',
  max: 'maximaluri',
  sum: 'jami',
})

export const getShowToolPanel = createSelector(
  getColumnsVisibilities,
  makeGetIconColumns(),
  (columnsVisibilities, iconColumns) =>
    !isEmpty(columnsVisibilities) &&
    !includes(filter(columnsVisibilities, (unused, colName) => !includes(iconColumns, colName)), true),
)

export const gridStateExists = createSelector(
  getPropSelector('formName'),
  getPropSelector('objectName'),

  getFetchSucceeded(SEARCHES_GRID_STATES_FETCHER_NAME),

  getFetchSucceeded(CLIENT_VIEW_GRID_STATES_FETCHER_NAME),
  getData(CLIENT_VIEW_GRID_STATES_FETCHER_NAME),

  getFetchSucceeded(APPLICATION_VIEW_GRID_STATES_FETCHER_NAME),
  getData(APPLICATION_VIEW_GRID_STATES_FETCHER_NAME),

  getFetchSucceeded(COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME),
  getData(COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME),

  getFetchSucceeded(LOAN_VIEW_GRID_STATES_FETCHER_NAME),
  getData(LOAN_VIEW_GRID_STATES_FETCHER_NAME),

  (state, { formName, objectName }) => getFetchSucceeded(stringifyGridIdentity(formName, objectName))(state),
  (
    formName,
    objectName,
    searchesGridStatesFetchSucc,
    clientViewGridStatesFetchSucc,
    clientViewGridStates,
    applicationViewGridStatesFetchSucc,
    applicationViewGridStates,
    collateralViewGridStatesFetchSucc,
    collateralViewGridStates,
    loanViewGridStatesFetchSucc,
    loanViewGridStates,
    SMFFetchSucc,
  ) =>
    (SEARCHES_FORM_NAMES.includes(formName) && searchesGridStatesFetchSucc) ||
    ((formName === clientViewFormName ||
      CLIENT_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1) &&
      clientViewGridStatesFetchSucc &&
      has(clientViewGridStates, objectName)) ||
    ((formName === applicationViewFormName ||
      APPLICATION_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1) &&
      applicationViewGridStatesFetchSucc &&
      has(applicationViewGridStates, objectName)) ||
    (formName === collateralViewFormName &&
      collateralViewGridStatesFetchSucc &&
      has(collateralViewGridStates, objectName)) ||
    ((formName === loanViewFormName ||
      LOAN_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1) &&
      loanViewGridStatesFetchSucc &&
      has(loanViewGridStates, objectName)) ||
    SMFFetchSucc,
)

export const getAPIGridState = createSelector(
  getPropSelector('formName'),
  getPropSelector('objectName'),

  getFetchSucceeded(SEARCHES_GRID_STATES_FETCHER_NAME),
  getData(SEARCHES_GRID_STATES_FETCHER_NAME),

  getFetchSucceeded(CLIENT_VIEW_GRID_STATES_FETCHER_NAME),
  getData(CLIENT_VIEW_GRID_STATES_FETCHER_NAME),

  getFetchSucceeded(APPLICATION_VIEW_GRID_STATES_FETCHER_NAME),
  getData(APPLICATION_VIEW_GRID_STATES_FETCHER_NAME),

  getFetchSucceeded(COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME),
  getData(COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME),

  getFetchSucceeded(LOAN_VIEW_GRID_STATES_FETCHER_NAME),
  getData(LOAN_VIEW_GRID_STATES_FETCHER_NAME),

  (state, { formName, objectName }) => getData(stringifyGridIdentity(formName, objectName))(state),

  (
    formName,
    objectName,
    searchesGridStatesFetchSucc,
    searchesGridStates,
    clientViewGridStatesFetchSucc,
    clientViewGridStates,
    applicationViewGridStatesFetchSucc,
    applicationViewGridStates,
    collateralViewGridStatesFetchSucc,
    collateralViewGridStates,
    loanViewGridStatesFetchSucc,
    loanViewGridStates,
    gridState,
  ) =>
    (searchesGridStatesFetchSucc && searchesGridStates[formName]) ||
    (clientViewGridStatesFetchSucc &&
      (formName === clientViewFormName ||
        CLIENT_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1) &&
      clientViewGridStates[objectName]) ||
    (applicationViewGridStatesFetchSucc &&
      (formName === applicationViewFormName ||
        APPLICATION_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1) &&
      applicationViewGridStates[objectName]) ||
    (collateralViewGridStatesFetchSucc &&
      formName === collateralViewFormName &&
      collateralViewGridStates[objectName]) ||
    (loanViewGridStatesFetchSucc &&
      (formName === loanViewFormName ||
        LOAN_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1) &&
      loanViewGridStates[objectName]) ||
    gridState,
)

export const isGridStateFetching = createSelector(
  getPropSelector('formName'),
  getPropSelector('objectName'),

  getPending(SEARCHES_GRID_STATES_FETCHER_NAME),
  getPending(CLIENT_VIEW_GRID_STATES_FETCHER_NAME),

  getPending(APPLICATION_VIEW_GRID_STATES_FETCHER_NAME),

  getPending(COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME),

  getPending(LOAN_VIEW_GRID_STATES_FETCHER_NAME),

  (state, { formName, objectName }) => getPending(stringifyGridIdentity((formName, objectName)))(state),
  (
    formName,
    objectName,
    searchesGridStatesFetching,
    clientViewGridStatesFetching,
    applicationViewGridStatesFetching,
    collateralViewGridStatesFetching,
    loanViewGridStatesFetching,
    gridStateFetching,
  ) =>
    (SEARCHES_FORM_NAMES.includes(formName) && searchesGridStatesFetching) ||
    ((formName === clientViewFormName ||
      CLIENT_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1) &&
      clientViewGridStatesFetching) ||
    ((formName === applicationViewFormName ||
      APPLICATION_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1) &&
      applicationViewGridStatesFetching) ||
    (formName === collateralViewFormName && collateralViewGridStatesFetching) ||
    ((formName === loanViewFormName ||
      LOAN_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1) &&
      loanViewGridStatesFetching) ||
    gridStateFetching,
)

export const clientViewGridStatesInstanceExists = state =>
  getInstanceExistence(CLIENT_VIEW_GRID_STATES_FETCHER_NAME)(state)

export const applicationViewGridStatesInstanceExists = state =>
  getInstanceExistence(APPLICATION_VIEW_GRID_STATES_FETCHER_NAME)(state)

export const collateralViewGridStatesInstanceExists = state =>
  getInstanceExistence(COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME)(state)

export const loanViewGridStatesInstanceExists = state => getInstanceExistence(LOAN_VIEW_GRID_STATES_FETCHER_NAME)(state)

export const getGridStateFetcherName = ({ formName, objectName }) => {
  if (SEARCHES_FORM_NAMES.includes(formName)) {
    return SEARCHES_GRID_STATES_FETCHER_NAME
  }

  if (formName === clientViewFormName) {
    return CLIENT_VIEW_GRID_STATES_FETCHER_NAME
  }

  if (formName === applicationViewFormName) {
    return APPLICATION_VIEW_GRID_STATES_FETCHER_NAME
  }

  if (formName === collateralViewFormName) {
    return COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME
  }

  if (formName === loanViewFormName) {
    return LOAN_VIEW_GRID_STATES_FETCHER_NAME
  }

  return stringifyGridIdentity((formName, objectName))
}

export const getApi = createSelector(
  getApisExist,
  getApisRepresentative, // this is here to force createStore run again if apis is re-set
  getPropSelector('instanceName'),
  (apisExist, apisRepresentative, instanceName) => (apisExist ? apisOutsideStore[instanceName].api : null),
)

export const getColumnApi = createSelector(
  getApisExist,
  getApisRepresentative, // this is here to force createStore run again if apis is re-set
  getPropSelector('instanceName'),
  (apisExist, apisRepresentative, instanceName) => (apisExist ? apisOutsideStore[instanceName].columnApi : null),
)
