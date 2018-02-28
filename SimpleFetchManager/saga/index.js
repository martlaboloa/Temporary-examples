import { all } from 'redux-saga/effects'

import userFetch from './userFetch'
import prevUserFetch from './prevUserFetch'

export default function* saga() {
  yield all([userFetch(), prevUserFetch()])
}
