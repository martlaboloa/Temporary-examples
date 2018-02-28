import { REDUCER_NAME } from '../../../constants'

// zero layer
export const getApplicationAdd = state => state[REDUCER_NAME]

// first layer
export const getProductId = state => getApplicationAdd(state).ProductID

export const getIndustrySubIDOptionsSource = state => getApplicationAdd(state).industrySubIDOptionsSource

export const getLoanEndDate = state => getApplicationAdd(state).loanEndDate

export const getReqCurrencyValData = state => getApplicationAdd(state).reqCurrencyValData
