import { delay } from 'redux-saga'
import { race, take, put, fork, cancel, call, select, cancelled } from 'redux-saga/effects'
import has from 'lodash/has'

import {
  register,
  reset,
  fetch,
  fetchSucceeded,
  fetchFailed,
  uncontrolledErrorHappened,
  finishTask,
  cancelTask,
} from '../actions'
import actionTypes from '../actionTypes'
import { identityFn } from '../reducer'
import { getInstanceExistence } from '../selectors'

// eslint-disable-next-line
const isUncontrolledFailure = error => false

function* fetchSaga({
  payload: { callApi, callApiArgs, transformResponse, savePreviousResponse },
  meta: { instanceName },
}) {
  let trySucceeded = true
  let result
  try {
    // if (instanceName === 'SEARCHES_GRID_STATES') {
    //   yield call(delay, 5000)
    // }

    yield put(fetch(instanceName, savePreviousResponse))

    const response = yield call(callApi, ...callApiArgs)

    const transformedData = transformResponse ? transformResponse(response) : response

    result = transformedData

    yield put(fetchSucceeded(instanceName, transformedData))
  } catch (error) {
    trySucceeded = false

    result = error

    if (!isUncontrolledFailure(error)) {
      yield put(fetchFailed(instanceName, error))
    } else {
      yield put(uncontrolledErrorHappened(instanceName, error))
    }
  } finally {
    if (!(yield cancelled())) {
      yield put(finishTask(instanceName, trySucceeded, result))
    }
  }
}

function* userFetchSaga(action, instanceName, taskCancelled) {
  if (taskCancelled) {
    yield put(reset(instanceName))
  } else {
    const instanceExists = yield select(getInstanceExistence, { instanceName })
    if (!instanceExists) {
      yield put(register(instanceName))
    }
  }

  yield fetchSaga(action)
}

function* userFetchManagerSaga({ meta: { resolve, reject } }, instanceName, tasks) {
  const getPattern = expectedType => ({ type, meta }) => type === expectedType && identityFn(meta) === instanceName

  const { finished } = yield race({
    finished: take(getPattern(actionTypes.instance.FINISH_TASK)),
    cancelled: take(getPattern(actionTypes.instance.CANCEL_TASK)),
  })

  if (finished) {
    const { payload: { trySucceeded, result } } = finished
    if (trySucceeded && resolve) {
      resolve(result)
    } else if (reject) {
      reject(result)
    }
  } else {
    yield cancel(tasks[instanceName])
  }

  delete tasks[instanceName] // eslint-disable-line
}

export default function* watchUserFetch() {
  const tasks = {}

  while (true) {
    const action = yield take(actionTypes.instance.USER_FETCH)

    const instanceName = identityFn(action.meta)

    const isInTasks = has(tasks, instanceName)

    if (isInTasks) {
      yield put(cancelTask(instanceName))
    }

    yield fork(userFetchManagerSaga, action, instanceName, tasks)

    tasks[instanceName] = yield fork(userFetchSaga, action, instanceName, isInTasks)
  }
}
