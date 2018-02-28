import 'ag-grid-enterprise'
import { LicenseManager } from 'ag-grid-enterprise/main'
import LKGrid from './components'
import { REDUCER_NAME } from './store'
import ExportButtonInstance from './shared/ExportButtonInstance'
import apisMiddleware from './store/middlewares/apis'

const AGGridLicenseKey =
  'Evaluation_License_Valid_Until_23_April_2018__MTUyNDQzODAwMDAwMA==026f634e7af389e6e87c3f2fb7dcfbf4'
LicenseManager.setLicenseKey(AGGridLicenseKey)

const constants = { REDUCER_NAME }

export default LKGrid
export {
  reducer,
  saga,
  actionTypes,
  destroy,
  fetchSearchesGridStates,
  fetchApplicationViewGridStates,
  fetchClientViewGridStates,
  fetchCollateralViewGridStates,
  fetchLoanViewGridStates,
} from './store'

export { getIconComponent } from './shared/IconCell'

export { constants, ExportButtonInstance, apisMiddleware }
