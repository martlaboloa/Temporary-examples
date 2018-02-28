import isUndefined from 'lodash/isUndefined'
import isFunction from 'lodash/isFunction'
import mapValues from 'lodash/mapValues'
import { translate } from '../../../helpers'

export const getGetInstancedActions = instanceName => actionCreators => {
  const getInstancedAction = actionCreator => (...args) => {
    const action = actionCreator(...args)

    if (isUndefined(action.meta)) {
      action.meta = {}
    }

    action.meta.instanceName = instanceName

    return action
  }

  if (isFunction(actionCreators)) {
    return getInstancedAction(actionCreators)
  }

  return mapValues(actionCreators, actionCreator => getInstancedAction(actionCreator))
}

const getTranslateKey = (formName, objectName, column) => `${formName}-${objectName}.${column}`

export const translateColName = (formName, objectName, column) =>
  translate(getTranslateKey(formName, objectName, column))

export const translateMain = key => translate('frm_Main', key)
