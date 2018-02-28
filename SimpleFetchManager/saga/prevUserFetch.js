import { takeEvery, select, put } from 'redux-saga/effects'
import actionTypes from '../actionTypes'
import { getPreviousUserFetchAction } from '../selectors'

function* prevUserFetchSaga({ meta: { instanceName, resolve, reject } }) {
  const previousUserFetchAction = yield select(getPreviousUserFetchAction(instanceName))

  const previousUserFetchActionWithCallbacks = {
    ...previousUserFetchAction,
    meta: { ...previousUserFetchAction.meta, resolve, reject },
  }

  yield put(previousUserFetchActionWithCallbacks)
}

export default function* watchPrevUserFetch() {
  yield takeEvery(actionTypes.instance.PREV_USER_FETCH, prevUserFetchSaga)
}
