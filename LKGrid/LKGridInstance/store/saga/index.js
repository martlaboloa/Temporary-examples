import { takeEvery, all, take, actionChannel, call } from 'redux-saga/effects'
import actions, { GRID_STATE_FETCH } from '../actionTypes'
import fetchGridState from './gridState/fetch'
import fetchAndReduceGridState from './gridState/fetchAndReduce'
import destroy from './destroy'

function* takeEachFetchAndReduceSeparately() {
  const chan = yield actionChannel(actions.gridState.FETCH_AND_REDUCE)
  while (true) {
    const action = yield take(chan)

    yield call(fetchAndReduceGridState, action)
  }
}

export default function*() {
  yield all([
    takeEvery(actions.DESTROY, destroy),
    takeEvery(GRID_STATE_FETCH, fetchGridState),

    // takeEvery(actions.gridState.FETCH_AND_REDUCE, fetchAndReduceGridState),
    takeEachFetchAndReduceSeparately(),
  ])
}
