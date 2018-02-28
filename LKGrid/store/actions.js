import createAction from '../../../../reducers/actionHelpers'
import actions from './actionTypes'

export const destroyInstance = instanceName => createAction(actions.saga.DESTROY_INSTANCE, undefined, { instanceName })

export const registerInstance = instanceName =>
  createAction(actions.regUnreg.REGISTER_INSTANCE, undefined, { instanceName })

export const unregisterInstance = instanceName =>
  createAction(actions.regUnreg.UNREGISTER_INSTANCE, undefined, { instanceName })
