import { destroy as destroyRF } from 'redux-form'

import { destroy as destroySFM, prevFetch } from '../shared/SimpleFetchManager'
import { destroy as destroyLKG } from '../shared/LKGrid'
import { RF_NAME, LK_GRID_NAME, ORDERS_FETCHER_NAME } from './constants'

export const closeOrderGrid = () => destroyLKG(LK_GRID_NAME)
export const closeSearchBar = () => destroyRF(RF_NAME)
export const deleteOrders = () => destroySFM(ORDERS_FETCHER_NAME)
export const searchOrdersAgain = () => prevFetch({ instanceName: ORDERS_FETCHER_NAME })
