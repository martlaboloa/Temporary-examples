import actionTypes from './actionTypes'

export const patternOfFetchFinish = instanceName => action =>
  action.type === actionTypes.instance.FINISH_TASK && action.meta.instanceName === instanceName
