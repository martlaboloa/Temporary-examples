import { reduxForm } from 'redux-form'
import isNull from 'lodash/isNull'
import { fetchSFM } from 'shared/SimpleFetchManager'
import { Order } from 'WebAPI'
import { validate } from '../../validation'
import { ORDERS_FETCHER_NAME, RF_NAME } from '../../constants'

const valuesToData = ({
  startDate,
  endDate,

  docNo,
  OID,
  ID,

  authLevel,

  entryAuthorID,
  hasUserAuth,
  comment,
  debit,
  amount,
  payerDetails,

  creatorTypeID,
  operTypeID,
  operCodeID,
  credit,
  currency,
  borrowerName,
}) => {
  const data = {}

  if (!isNull(startDate)) {
    data.StartDate = startDate
  }
  if (!isNull(endDate)) {
    data.EndDate = endDate
  }
  if (!isNull(docNo)) {
    data.DocNo = docNo
  }
  if (!isNull(OID)) {
    data.OID = OID
  }
  if (!isNull(ID)) {
    data.ID = ID
  }

  const authLevelFieldToBit = val => (val ? '1' : '0')
  data.AuthLevel =
    authLevelFieldToBit(authLevel.notAuthorized) +
    authLevelFieldToBit(authLevel.partiallyAuthorized) +
    authLevelFieldToBit(authLevel.authorized)

  if (!entryAuthorID.disabled && !isNull(entryAuthorID.value)) {
    data.EntryAuthorID = entryAuthorID.value
  }
  if (!hasUserAuth.disabled && !isNull(hasUserAuth.value)) {
    data.HasUserAuth = hasUserAuth.value
  }
  if (!comment.disabled && !isNull(comment.value)) {
    data.Comment = comment.value
  }
  if (!debit.disabled) {
    if (!isNull(debit.balCodeID)) {
      data.Debit_BalCodeID = debit.balCodeID
    }
    if (!isNull(debit.accNo)) {
      data.Debit_AccNo = debit.accNo
    }
  }
  if (!amount.disabled) {
    if (!isNull(amount.min)) {
      data.Amount_Min = amount.min
    }
    if (!isNull(amount.max)) {
      data.Amount_Max = amount.max
    }
  }
  if (!payerDetails.disabled && !isNull(payerDetails.value)) {
    data.PayerDetails = payerDetails.value
  }

  if (!creatorTypeID.disabled && !isNull(creatorTypeID.value)) {
    data.CreatorTypeID = creatorTypeID.value
  }
  if (!operTypeID.disabled && !isNull(operTypeID.value)) {
    data.OperTypeID = operTypeID.value
  }
  if (!operCodeID.disabled && !isNull(operCodeID.value)) {
    data.OpcodeID = operCodeID.value
  }
  if (!credit.disabled) {
    if (!isNull(credit.balCodeID)) {
      data.Credit_BalCodeID = credit.balCodeID
    }
    if (!isNull(credit.accNo)) {
      data.Credit_AccNo = credit.accNo
    }
  }
  if (!currency.disabled && !isNull(currency.value)) {
    data.CCY = currency.value
  }
  if (!borrowerName.disabled && !isNull(borrowerName.value)) {
    data.BorrowerName = borrowerName.value
  }

  return data
}

const transForStore = response => response.Data

export default reduxForm({
  form: RF_NAME,
  validate,
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    const data = valuesToData(values)

    return new Promise((resolve, reject) => {
      dispatch(
        fetchSFM({
          instanceName: ORDERS_FETCHER_NAME,
          callApi: Order.search,
          callApiArgs: [data],
          transformResponse: transForStore,
          resolve,
          reject,
        }),
      )
    })
  },
})
