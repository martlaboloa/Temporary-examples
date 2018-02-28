import get from 'lodash/get'
import { getInstance } from './pathSelectors'

export const getNotFetched = instanceName => state => get(getInstance(instanceName)(state), 'notFetched')

export const getPending = instanceName => state => get(getInstance(instanceName)(state), 'pending')

export const getFetchSucceeded = instanceName => state => get(getInstance(instanceName)(state), 'fetchSucceeded')
export const getPrevData = instanceName => state => get(getInstance(instanceName)(state), 'prevData')
export const getData = instanceName => state => get(getInstance(instanceName)(state), 'data')

export const getFetchFailed = instanceName => state => get(getInstance(instanceName)(state), 'fetchFailed')
export const getPrevError = instanceName => state => get(getInstance(instanceName)(state), 'prevError')
export const getError = instanceName => state => get(getInstance(instanceName)(state), 'error')

export const getUncontrolledErrorHappened = instanceName => state =>
  get(getInstance(instanceName)(state), 'uncontrolledErrorHappened')
export const getPrevUncontrolledError = instanceName => state =>
  get(getInstance(instanceName)(state), 'prevUncontrolledError')
export const getUncontrolledError = instanceName => state => get(getInstance(instanceName)(state), 'uncontrolledError')

export const getPreviousUserFetchAction = instanceName => state =>
  get(getInstance(instanceName)(state), 'previousUserFetchAction')
