import actionTypes from '../actionTypes'
import { apisOutsideStore } from '../reducer/apisRepresentative'

export default () => next => action => {
  if (action.type === actionTypes.apisRepresentative.SET) {
    const { payload: { api, columnApi, ...restOfPayload }, meta: { instanceName } } = action

    apisOutsideStore[instanceName] = { api, columnApi }

    const newAction = { type: action.type, payload: restOfPayload, meta: action.meta }

    return next(newAction)
  } else if (action.type === actionTypes.apisRepresentative.DELETE) {
    const { meta: { instanceName } } = action

    delete apisOutsideStore[instanceName]
  }
  return next(action)
}
