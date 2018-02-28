import isEqual from 'lodash/isEqual'
import { call, select, put } from 'redux-saga/effects'
import { Grids } from '../../../../../../../WebAPI'
import { fetchSFM, getData, getFetchSucceeded } from '../../../../../../shared/SimpleFetchManager'
import {
  getSyncedGridIdentity,
  getInfoToSave,
  getInitialGridState,
  gridStateExists as gridStateExistsSel,
} from '../../selectors'
import {
  SEARCHES_FORM_NAMES,
  clientViewFormName,
  collateralViewFormName,
  CLIENT_VIEW_GRID_STATE_GROUP_ADDITIONS,
  applicationViewFormName,
  loanViewFormName,
  LOAN_VIEW_GRID_STATE_GROUP_ADDITIONS,
  APPLICATION_VIEW_GRID_STATE_GROUP_ADDITIONS,
  SEARCHES_GRID_STATES_FETCHER_NAME,
  CLIENT_VIEW_GRID_STATES_FETCHER_NAME,
  APPLICATION_VIEW_GRID_STATES_FETCHER_NAME,
  COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME,
  LOAN_VIEW_GRID_STATES_FETCHER_NAME,
} from '../../../constants'
import { stringifyGridIdentity, checkGridIdentity } from '../../../helpers'

function* updateGridStateSource(formName, objectName, fieldStates) {
  const gridStateExists = yield select(gridStateExistsSel, { formName, objectName })

  if (gridStateExists) {
    const reduceGridStateAction = fetchSFM({
      instanceName: stringifyGridIdentity(formName, objectName),
      callApi: () => fieldStates,
    })

    switch (true) {
      case SEARCHES_FORM_NAMES.includes(formName): {
        const fetchSucc = yield select(getFetchSucceeded(SEARCHES_GRID_STATES_FETCHER_NAME), {
          formName,
          objectName,
        })

        if (fetchSucc) {
          const currentGridStates = yield select(getData(SEARCHES_GRID_STATES_FETCHER_NAME))

          const updatedGridStates = { ...currentGridStates, [formName]: fieldStates }

          yield put(fetchSFM({ instanceName: SEARCHES_GRID_STATES_FETCHER_NAME, callApi: () => updatedGridStates }))
        } else {
          yield put(reduceGridStateAction)
        }

        break
      }
      case formName === clientViewFormName ||
        CLIENT_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1: {
        const fetchSucc = yield select(getFetchSucceeded(CLIENT_VIEW_GRID_STATES_FETCHER_NAME), {
          formName,
          objectName,
        })

        if (fetchSucc) {
          const currentGridStates = yield select(getData(CLIENT_VIEW_GRID_STATES_FETCHER_NAME))

          const updatedGridStates = { ...currentGridStates, [objectName]: fieldStates }

          yield put(fetchSFM({ instanceName: CLIENT_VIEW_GRID_STATES_FETCHER_NAME, callApi: () => updatedGridStates }))
        } else {
          yield put(reduceGridStateAction)
        }

        break
      }
      case formName === applicationViewFormName ||
        APPLICATION_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1: {
        const fetchSucc = yield select(getFetchSucceeded(APPLICATION_VIEW_GRID_STATES_FETCHER_NAME), {
          formName,
          objectName,
        })

        if (fetchSucc) {
          const currentGridStates = yield select(getData(APPLICATION_VIEW_GRID_STATES_FETCHER_NAME))

          const updatedGridStates = { ...currentGridStates, [objectName]: fieldStates }

          yield put(
            fetchSFM({ instanceName: APPLICATION_VIEW_GRID_STATES_FETCHER_NAME, callApi: () => updatedGridStates }),
          )
        } else {
          yield put(reduceGridStateAction)
        }

        break
      }
      case formName === collateralViewFormName ||
        CLIENT_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1: {
        const fetchSucc = yield select(getFetchSucceeded(COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME), {
          formName,
          objectName,
        })

        if (fetchSucc) {
          const currentGridStates = yield select(getData(COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME))

          const updatedGridStates = { ...currentGridStates, [objectName]: fieldStates }

          yield put(
            fetchSFM({ instanceName: COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME, callApi: () => updatedGridStates }),
          )
        } else {
          yield put(reduceGridStateAction)
        }

        break
      }
      case formName === loanViewFormName ||
        LOAN_VIEW_GRID_STATE_GROUP_ADDITIONS.findIndex(checkGridIdentity(formName, objectName)) !== -1: {
        const fetchSucc = yield select(getFetchSucceeded(LOAN_VIEW_GRID_STATES_FETCHER_NAME), {
          formName,
          objectName,
        })

        if (fetchSucc) {
          const currentGridStates = yield select(getData(LOAN_VIEW_GRID_STATES_FETCHER_NAME))

          const updatedGridStates = { ...currentGridStates, [objectName]: fieldStates }

          yield put(fetchSFM({ instanceName: LOAN_VIEW_GRID_STATES_FETCHER_NAME, callApi: () => updatedGridStates }))
        } else {
          yield put(reduceGridStateAction)
        }

        break
      }
      default: {
        yield put(reduceGridStateAction)

        break
      }
    }
  }
}

export default function* save(getReducerRoot) {
  try {
    const { formName, objectName } = yield select(getSyncedGridIdentity, { getReducerRoot })
    const initialGridState = yield select(getInitialGridState, { getReducerRoot })

    const { columnsOrder, columnsVisibilities, columnsWidths } = yield select(getInfoToSave, {
      getReducerRoot,
    })

    /**
     * prepare data for API call
     */
    const fieldStates = columnsOrder.map((col, index) => ({
      FieldName: col,
      Width: columnsVisibilities[col] ? columnsWidths[col] : -1,
      Pos: index,
    }))

    if (!isEqual(fieldStates, initialGridState)) {
      /**
       * fieldStates must be JSON
       */
      const fieldStatesStrigified = JSON.stringify(fieldStates)

      /**
       * Naming for API must be exactly as expected(case sensitive)
       */
      const FormName = formName
      const ObjectName = objectName
      const fieldstates = fieldStatesStrigified

      yield call(Grids.save, FormName, ObjectName, fieldstates)

      yield updateGridStateSource(formName, objectName, fieldStates)
    }
  } catch (e) {
    console.warn(e, `couldn't save grid state`)
  }
}
