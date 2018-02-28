import { withLazyLoading } from '../../shared'
import {
  REDUCER_NAME,
  isRowSelected as isRowSelectedInternal,
  getSelectedRow as getSelectedRowInternal,
  getApisExist as getApisExistInternal,
  getApi as getApiInternal,
  getColumnApi as getColumnApiInternal,
  makeGetGetInstanceReducerRoot,
} from './store'
import ExportButton from './ExportButton'

const constants = { REDUCER_NAME }

const getSelectedRow = (state, instanceName) =>
  getSelectedRowInternal(state, {
    instanceName,
    getReducerRoot: makeGetGetInstanceReducerRoot()(state, { instanceName }),
  })
const isRowSelected = (state, instanceName) =>
  isRowSelectedInternal(state, {
    instanceName,
    getReducerRoot: makeGetGetInstanceReducerRoot()(state, { instanceName }),
  })
const getApisExist = (state, instanceName) =>
  getApisExistInternal(state, {
    instanceName,
    getReducerRoot: makeGetGetInstanceReducerRoot()(state, { instanceName }),
  })
const getApi = (state, instanceName) =>
  getApiInternal(state, { instanceName, getReducerRoot: makeGetGetInstanceReducerRoot()(state, { instanceName }) })
const getColumnApi = (state, instanceName) =>
  getColumnApiInternal(state, {
    instanceName,
    getReducerRoot: makeGetGetInstanceReducerRoot()(state, { instanceName }),
  })

export { constants, ExportButton, isRowSelected, getSelectedRow, getApisExist, getApi, getColumnApi }

export {
  reducer,
  saga,
  destroyInstance as destroy,
  fetchSearchesGridStates,
  fetchApplicationViewGridStates,
  fetchClientViewGridStates,
  fetchCollateralViewGridStates,
  fetchLoanViewGridStates,
  getLKGrid,
  apisMiddleware,
} from './store'

export { getIconComponent } from './LKGridInstance'

export default withLazyLoading(() => import(/* webpackChunkName: "LKGrid" */ './components/LKGrid'))
