import { takeEvery, all } from 'redux-saga/effects'

import actions from '../actionTypes'
import manageDestroyInstance from './manageDestroyInstance'

import { saga as LKGridInstanceSaga } from '../../LKGridInstance'

export default function*() {
  yield all([takeEvery(actions.saga.DESTROY_INSTANCE, manageDestroyInstance), LKGridInstanceSaga()])
}
