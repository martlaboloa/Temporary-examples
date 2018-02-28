import createAction from '../../../reducers/actionHelpers'
import actionTypes from './actionTypes'

/*
interface actions
 */
export const userFetch = ({
  instanceName,
  callApi,
  callApiArgs = [],
  transformResponse,
  savePreviousResponse = false,
  resolve,
  reject,
}) =>
  createAction(
    actionTypes.instance.USER_FETCH,
    {
      callApi,
      callApiArgs,
      transformResponse,
      savePreviousResponse,
    },
    {
      instanceName,
      resolve,
      reject,
    },
  )

export const prevUserFetch = ({ instanceName, resolve, reject }) =>
  createAction(actionTypes.instance.PREV_USER_FETCH, undefined, { instanceName, resolve, reject })

/*
factory actions: register, unregister, reset instance
of single fetched data
 */
export const register = instanceName => createAction(actionTypes.factory.REGISTER, undefined, { instanceName })

export const unregister = instanceName => createAction(actionTypes.factory.UNREGISTER, undefined, { instanceName })

export const reset = instanceName => createAction(actionTypes.factory.RESET, undefined, { instanceName })

/*
instance actions
 */
export const fetch = (instanceName, savePreviousResponse) =>
  createAction(actionTypes.instance.FETCH, { savePreviousResponse }, { instanceName })

export const fetchSucceeded = (instanceName, data) =>
  createAction(actionTypes.instance.FETCH_SUCCEEDED, data, { instanceName })

export const fetchFailed = (instanceName, error) =>
  createAction(actionTypes.instance.FETCH_FAILED, error, { instanceName })

export const uncontrolledErrorHappened = (instanceName, uncontrolledError) =>
  createAction(actionTypes.instance.UNCONTROLLED_ERROR_HAPPENED, uncontrolledError, {
    instanceName,
  })

export const finishTask = (instanceName, trySucceeded, result) =>
  createAction(actionTypes.instance.FINISH_TASK, { trySucceeded, result }, { instanceName })

export const cancelTask = instanceName => createAction(actionTypes.instance.CANCEL_TASK, undefined, { instanceName })
