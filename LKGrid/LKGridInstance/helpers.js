import { columnSortStates } from './store/reducer/sortedColumn'
import { GRID_STATE_FETCHER_NAME_UNIQUE_PREFIX } from './constants'

export const stateSortToAgGrid = stateSort => {
  switch (stateSort) {
    case columnSortStates.ASCENDING: {
      return 'asc'
    }
    case columnSortStates.DESCENDING: {
      return 'desc'
    }
    case columnSortStates.NONE: {
      return 'none'
    }
    default:
      return 'none'
  }
}

export const stringifyGridIdentity = (formName, objectName) =>
  `${GRID_STATE_FETCHER_NAME_UNIQUE_PREFIX}${formName}-${objectName}`

export const gridStateCategories = {
  identity: 0,
  searches: 1,
  clientView: 2,
  applicationView: 3,
  collateralView: 4,
  loanView: 5,
}

export const checkGridIdentity = (formName, objectName) => gridIdentity =>
  gridIdentity.formName === formName && gridIdentity.objectName === objectName

export const getContextMenuItemConfirmModalName = instanceName => `contextMenuItemConfirm-of-${instanceName}-grid`
