import { destroy as destroyRF, change } from 'redux-form'
import { destroy as destroySFM, prevFetch } from 'shared/SimpleFetchManager'
import { destroy as destroyLKG } from 'shared/LKGrid'

export const obtainChangeField = instanceName => (...args) => change(instanceName, ...args)

export const closeClientGrid = instanceName => destroyLKG(instanceName)

export const closeSearchBar = instanceName => destroyRF(instanceName)

export const deleteClients = instanceName => destroySFM(instanceName)

export const destroy = (instanceName, dispatch) => {
  dispatch(closeClientGrid(instanceName))
  dispatch(closeSearchBar(instanceName))
  dispatch(deleteClients(instanceName))
}

export const searchAgainClients = (instanceName, resolve, reject) => prevFetch({ instanceName, resolve, reject })
