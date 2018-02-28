import { createSelector } from 'reselect'
import { formValueSelector as getFormValueSelector } from 'redux-form'

import getPropSelector from '../../helpers/getPropSelector'
import { isFieldTouched } from '../shared/reduxForm'
import { getData, getFetchSucceeded } from '../shared/SimpleFetchManager'

import { RF_NAME, ORDERS_FETCHER_NAME } from './constants'

export const formValueSelector = getFormValueSelector(RF_NAME)

export const isFormFieldTouched = isFieldTouched(RF_NAME)

const defaultOrders = []
export const getOrders = state => getData(ORDERS_FETCHER_NAME)(state) || defaultOrders

export const getOrdersFetchSucceeded = state => getFetchSucceeded(ORDERS_FETCHER_NAME)(state) || false

export const getOrdersCount = createSelector(getOrders, orders => orders.length)

export const getEntryAuthorIDOptions = createSelector(
  getPropSelector('entryAuthorIDLookup'),
  (entryAuthorIDLookup = []) =>
    entryAuthorIDLookup.map(val => {
      const getText = str => {
        const splitArray = str.split('-')
        const text = splitArray.length === 2 ? splitArray[1] : splitArray[0]
        return text.trim()
      }

      return {
        key: val.ID,
        text: getText(val.LoginFull),
        value: val.ID,
      }
    }),
)

export const getHasUserAuthOptions = getEntryAuthorIDOptions

export const getCreatorTypeIDOptions = createSelector(
  getPropSelector('creatorTypeIDLookup'),
  (creatorTypeIDLookup = []) =>
    creatorTypeIDLookup.map(val => ({
      key: val.ID,
      text: val.Title,
      value: val.ID,
    })),
)

export const getOperTypeIDOptions = createSelector(getPropSelector('operTypeIDLookup'), (operTypeIDLookup = []) =>
  operTypeIDLookup.map(val => ({
    key: val.ID,
    text: val.Title,
    value: val.ID,
  })),
)

export const getFilteredOperCodeIDLookup = createSelector(
  getPropSelector('operCodeIDLookup'),
  state => formValueSelector(state, 'operTypeID.value'),
  state => formValueSelector(state, 'operTypeID.disabled'),
  (operCodeIDLookup = [], operTypeIDValue, operTypeIDDisabled) => {
    if (operTypeIDDisabled) {
      return []
    }

    return operCodeIDLookup.filter(val => val.EntryOperTypeID === operTypeIDValue)
  },
)

export const isOperCodeIDOptionsEmpty = createSelector(
  getFilteredOperCodeIDLookup,
  filteredOperCodeIDLookup => filteredOperCodeIDLookup.length === 0,
)

export const getOperCodeIDOptions = createSelector(getFilteredOperCodeIDLookup, filteredOperCodeIDLookup =>
  filteredOperCodeIDLookup.map(val => {
    const getText = ({ Code, Destination }) => `${Code}-${Destination}`

    return {
      key: val.ID,
      text: getText(val),
      value: val.ID,
    }
  }),
)

export const getCurrencyOptions = createSelector(getPropSelector('currencyLookup'), (currencyLookup = []) =>
  currencyLookup.map(val => ({
    key: val.CCY,
    text: val.Title,
    value: val.CCY,
  })),
)
