import { select, put } from 'redux-saga/effects'
import isNull from 'lodash/isNull'
import { getSyncedGridIdentity } from '../../selectors'
import { deleteApis as deleteApisUninst } from '../../actions'
import gridStateSave from '../gridState/save'

export default function* destroy({ payload: { getReducerRoot, getInstancedActions } }) {
  const syncedGridIdentity = yield select(getSyncedGridIdentity, { getReducerRoot })
  const deleteApis = getInstancedActions(deleteApisUninst)

  yield put(deleteApis())

  if (!isNull(syncedGridIdentity)) {
    yield* gridStateSave(getReducerRoot)
  }
}
