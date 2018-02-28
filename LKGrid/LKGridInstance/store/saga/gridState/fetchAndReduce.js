import { select, call, put, all, take } from 'redux-saga/effects'
import { patternOfFetchFinish } from '../../../../../../shared/SimpleFetchManager'
import {
  gridStateExists as gridStateExistsSel,
  getAPIGridState,
  isGridStateFetching as isGridStateFetchingSel,
} from '../../selectors'
import {
  reduceColumnsVisibilities as reduceColumnsVisibilitiesUninstanced,
  reduceColumnsWidths as reduceColumnsWidthsUninstanced,
  reduceColumnsOrder as reduceColumnsOrderUninstanced,
  reduceColumnsHeaders as reduceColumnsHeadersUninstanced,
  reduceSyncedGridIdentity as reduceSyncedGridIdentityUninstanced,
  reduceGridStateSourceIsWebAPI as reduceGridStateSourceIsWebAPIUninstanced,
  reduceInitialGridState as reduceInitialGridStateUninstanced,
  fetchIdentityGridState as fetchIdentityGridStateUninstanced,
} from '../../actions'
import {
  COLUMN_WIDTH_DEFAULT,
  ICON_COLUMN_WIDTH,
  SEARCHES_GRID_STATES_FETCHER_NAME,
  CLIENT_VIEW_GRID_STATES_FETCHER_NAME,
  APPLICATION_VIEW_GRID_STATES_FETCHER_NAME,
  COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME,
  LOAN_VIEW_GRID_STATES_FETCHER_NAME,
} from '../../../constants'
import { stringifyGridIdentity } from '../../../helpers'

function* reduceGridState(gridState, iconColumns, gridIdentity, getInstancedActions) {
  const reduceColumnsVisibilities = getInstancedActions(reduceColumnsVisibilitiesUninstanced)
  const reduceColumnsWidths = getInstancedActions(reduceColumnsWidthsUninstanced)
  const reduceColumnsOrder = getInstancedActions(reduceColumnsOrderUninstanced)
  const reduceColumnsHeaders = getInstancedActions(reduceColumnsHeadersUninstanced)

  const columnsVisibilities = gridState.reduce((acc, { FieldName, Width }) => {
    acc[FieldName] = Width !== -1
    return acc
  }, {})

  const columnsWidth = gridState.reduce((acc, { FieldName, Width }) => {
    if (iconColumns.includes(FieldName)) {
      acc[FieldName] = ICON_COLUMN_WIDTH
    } else if (Width !== -1) {
      acc[FieldName] = Width
    } else {
      acc[FieldName] = COLUMN_WIDTH_DEFAULT
    }
    return acc
  }, {})

  const columnsOrder = gridState.sort((col1, col2) => col1.Pos - col2.Pos).map(col => col.FieldName)

  const columnsHeaders = gridState.reduce((acc, { FieldName }) => {
    acc[FieldName] = FieldName
    return acc
  }, {})

  // /**
  //  * widths must exist before list of order is created,
  //  * so lineup of "puts" is important.
  //  */
  yield all([
    put(reduceColumnsWidths(columnsWidth)),
    put(reduceColumnsVisibilities(columnsVisibilities)),
    put(reduceColumnsOrder(columnsOrder)),
    put(reduceColumnsHeaders(columnsHeaders)),
  ])
}

function* getIdentityGridState(formName, objectName, getInstancedActions) {
  const fetchIdentityGridState = getInstancedActions(fetchIdentityGridStateUninstanced)
  const gridStateExists = yield select(gridStateExistsSel, { formName, objectName })
  const gridState = yield select(getAPIGridState, { formName, objectName })
  const isGridStateFetching = yield select(isGridStateFetchingSel, { formName, objectName })

  if (gridStateExists) {
    return gridState
  }

  if (isGridStateFetching) {
    yield take([
      patternOfFetchFinish(SEARCHES_GRID_STATES_FETCHER_NAME),
      patternOfFetchFinish(CLIENT_VIEW_GRID_STATES_FETCHER_NAME),
      patternOfFetchFinish(APPLICATION_VIEW_GRID_STATES_FETCHER_NAME),
      patternOfFetchFinish(COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME),
      patternOfFetchFinish(LOAN_VIEW_GRID_STATES_FETCHER_NAME),
      stringifyGridIdentity(formName, objectName),
    ])

    const grdStateExists = yield select(gridStateExistsSel, { formName, objectName })
    const grdState = yield select(getAPIGridState, { formName, objectName })

    if (!grdStateExists) {
      throw new Error('grid state does not exist, even after fetching it has completed.')
    }

    return grdState
  }

  let res
  let rej

  const p = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  yield put(
    fetchIdentityGridState({
      formName,
      objectName,
      resolve: response => {
        res(response)
      },
      reject: error => {
        rej(error)
      },
    }),
  )

  return yield call(() => p)
}

export default function* fetchAndReduce({
  payload: { gridIdentity, gridIdentity: { formName, objectName }, iconColumns, getInstancedActions },
}) {
  const reduceSyncedGridIdentity = getInstancedActions(reduceSyncedGridIdentityUninstanced)
  const reduceGridStateSourceIsWebAPI = getInstancedActions(reduceGridStateSourceIsWebAPIUninstanced)
  const reduceInitialGridState = getInstancedActions(reduceInitialGridStateUninstanced)

  try {
    const gridState = yield getIdentityGridState(formName, objectName, getInstancedActions)

    // yield call(delay, 5000)

    yield put(reduceInitialGridState(gridState))

    if (gridState.length !== 0) {
      yield reduceGridState(gridState, iconColumns, gridIdentity, getInstancedActions)
    } else {
      yield put(reduceGridStateSourceIsWebAPI(false))
    }
  } catch (e) {
    yield put(reduceGridStateSourceIsWebAPI(false))

    console.warn(`couldn't get grid state from server`)

    console.error(e)
  } finally {
    yield put(reduceSyncedGridIdentity(gridIdentity))
  }
}
