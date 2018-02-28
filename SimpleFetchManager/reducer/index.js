import { factoryReducer, flattenStringMap } from '../../../../reducers/utils'

import actionTypes from '../actionTypes'
import fetchInstance from './fetchInstance'

export const identityFn = meta => meta.instanceName

/*
temporary fix, for the problem:
FINISH_TASK(possibly other actions too) action is dispatched after instance
is unregistered, which causes instance to re-create(and its equals initial value of
state, because instance reducer does not catch FINISH_TASK action). Other fix could
be to change factoryReducer so that it does not let actions pass if state is not created,
register action is not fired, current implementation lets any action to initialize state.
 */
const { FINISH_TASK, CANCEL_TASK, ...restOfInstanceActions } = actionTypes.instance

export default factoryReducer(
  {
    registerType: actionTypes.factory.REGISTER,
    unregisterType: actionTypes.factory.UNREGISTER,
    resetType: actionTypes.factory.RESET,
  },
  flattenStringMap(restOfInstanceActions),
  fetchInstance,
  identityFn,
)
