import { factoryReducer, flattenStringMap } from '../../../../../reducers/utils'

import LKGridActionTypes from '../actionTypes'
import { reducer, actionTypes as LKGridInstanceActionTypes } from '../../LKGridInstance'

export const identityFn = meta => meta.instanceName

export default factoryReducer(
  {
    registerType: LKGridActionTypes.regUnreg.REGISTER_INSTANCE,
    unregisterType: LKGridActionTypes.regUnreg.UNREGISTER_INSTANCE,
  },
  flattenStringMap(LKGridInstanceActionTypes),
  reducer,
  identityFn,
)
