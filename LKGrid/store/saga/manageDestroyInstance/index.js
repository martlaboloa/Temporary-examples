import { select, put } from 'redux-saga/effects'

import { unregisterInstance } from '../../actions'
import { getInstanceExistence, makeGetGetInstancedActions, makeGetGetInstanceReducerRoot } from '../../selectors'

import { destroy as destroyInstanceUninstanced } from '../../../LKGridInstance'

export default function*({ meta: { instanceName } }) {
  const instanceExists = yield select(getInstanceExistence, { instanceName })
  const getInstancedActions = yield select(makeGetGetInstancedActions(), { instanceName })
  const getInstanceReducerRoot = yield select(makeGetGetInstanceReducerRoot(), { instanceName })

  if (instanceExists) {
    const destroyInstance = getInstancedActions(destroyInstanceUninstanced)
    yield put(destroyInstance(getInstanceReducerRoot, getInstancedActions))
    yield put(unregisterInstance(instanceName))
  }
}
