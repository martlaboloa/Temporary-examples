import { combineReducers } from 'redux'
import { getResettableReducer } from '../../../../../reducers/utils'
import { RESET } from '../actionTypes'
import ProductID from './ProductID'
import industrySubIDOptionsSource from './industrySubIDOptionsSource'
import loanEndDate from './loanEndDate'
import reqCurrencyValData from './reqCurrencyValData'

export default getResettableReducer(
  RESET,
  combineReducers({
    ProductID,
    industrySubIDOptionsSource,
    loanEndDate,
    reqCurrencyValData,
  }),
)
