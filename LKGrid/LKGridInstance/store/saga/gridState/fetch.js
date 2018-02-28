import { select, put } from 'redux-saga/effects'
import { Grids } from '../../../../../../../WebAPI'
import { fetchSFM } from '../../../../../../shared/SimpleFetchManager'
import {
  SEARCHES_GRID_STATES_FETCHER_NAME,
  CLIENT_VIEW_GRID_STATES_FETCHER_NAME,
  APPLICATION_VIEW_GRID_STATES_FETCHER_NAME,
  COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME,
  LOAN_VIEW_GRID_STATES_FETCHER_NAME,
  clientViewFormName,
  applicationViewFormName,
  collateralViewFormName,
  loanViewFormName,
  searchesFormName,
} from '../../../constants'
import { stringifyGridIdentity, gridStateCategories } from '../../../helpers'
import {
  clientViewGridStatesInstanceExists as clientViewGridStatesInstanceExistsSel,
  applicationViewGridStatesInstanceExists as applicationViewGridStatesInstanceExistsSel,
  collateralViewGridStatesInstanceExists as collateralViewGridStatesInstanceExistsSel,
  loanViewGridStatesInstanceExists as loanViewGridStatesInstanceExistsSel,
} from '../../selectors'

export default function* fetchGridState({ payload: { category, formName, objectName, resolve, reject } }) {
  switch (category) {
    case gridStateCategories.identity: {
      yield put(
        fetchSFM({
          instanceName: stringifyGridIdentity(formName, objectName),
          callApi: Grids.view,
          callApiArgs: [formName, objectName],
          transformResponse: ({ GridState }) => GridState,
          resolve,
          reject,
        }),
      )

      break
    }
    case gridStateCategories.searches: {
      yield put(
        fetchSFM({
          instanceName: SEARCHES_GRID_STATES_FETCHER_NAME,
          callApi: Grids.view,
          callApiArgs: [searchesFormName],
          transformResponse: ({ Data }) => Data,
        }),
      )

      break
    }
    case gridStateCategories.clientView: {
      const instExists = yield select(clientViewGridStatesInstanceExistsSel)

      if (!instExists) {
        yield put(
          fetchSFM({
            instanceName: CLIENT_VIEW_GRID_STATES_FETCHER_NAME,
            callApi: Grids.view,
            callApiArgs: [clientViewFormName],
            transformResponse: ({ Data }) => Data,
          }),
        )
      }

      break
    }
    case gridStateCategories.applicationView: {
      const instExists = yield select(applicationViewGridStatesInstanceExistsSel)

      if (!instExists) {
        yield put(
          fetchSFM({
            instanceName: APPLICATION_VIEW_GRID_STATES_FETCHER_NAME,
            callApi: Grids.view,
            callApiArgs: [applicationViewFormName],
            transformResponse: ({ Data }) => Data,
          }),
        )
      }

      break
    }
    case gridStateCategories.collateralView: {
      const instExists = yield select(collateralViewGridStatesInstanceExistsSel)

      if (!instExists) {
        yield put(
          fetchSFM({
            instanceName: COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME,
            callApi: Grids.view,
            callApiArgs: [collateralViewFormName],
            transformResponse: ({ Data }) => Data,
          }),
        )
      }

      break
    }
    case gridStateCategories.loanView: {
      const instExists = yield select(loanViewGridStatesInstanceExistsSel)

      if (!instExists) {
        yield put(
          fetchSFM({
            instanceName: LOAN_VIEW_GRID_STATES_FETCHER_NAME,
            callApi: Grids.view,
            callApiArgs: [loanViewFormName],
            transformResponse: ({ Data }) => Data,
          }),
        )
      }

      break
    }
    default:
      return null
  }
}
