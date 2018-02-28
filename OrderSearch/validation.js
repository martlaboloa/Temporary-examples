import isNull from 'lodash/isNull'

import { LKDate } from '../../helpers/Date'
import { translateBase } from './helpers'

const required = value => (value ? undefined : 'Required')

const isInteger = str => /^\d+$/.test(str)

function getOnlyNumbersAllowedErrorMessage() {
  return translateBase('HINT_ERR_NUMBER_ONLY')
}

const composeValidators = (...fns) => errors => fns.reduce((acc, cur) => cur.call(this, acc), errors)

const validateStartDate = (startDate, endDate) => errors => {
  if (startDate && !LKDate.isValid(startDate)) {
    return {
      ...errors,
      startDate: 'invalid date',
    }
  }

  if (startDate && endDate && LKDate.from(startDate).toDate() > LKDate.from(endDate).toDate()) {
    return {
      ...errors,
      startDate: 'invalid case',
    }
  }

  return errors
}

const validateEndDate = (startDate, endDate) => errors => {
  if (endDate && !LKDate.isValid(endDate)) {
    return {
      ...errors,
      endDate: 'invalid date',
    }
  }

  if (startDate && endDate && LKDate.from(startDate).toDate() > LKDate.from(endDate).toDate()) {
    return {
      ...errors,
      endDate: 'invalid case',
    }
  }

  return errors
}

const validateCreatorType = creatorTypeID => errors => {
  const { disabled, value } = creatorTypeID
  if (!disabled) {
    const req = required(value)
    return {
      ...errors,
      creatorTypeID: {
        value: req,
      },
    }
  }
}

const validateDebit = debit => resultErrors => {
  const { disabled, balCodeID, accNo } = debit
  const errors = { ...resultErrors }

  if (!disabled) {
    // if (!isNull(balCodeID)) {
    //   if (balCodeID !== '') {
    //     if (!isInteger(balCodeID)) {
    //       errors.debit = {
    //         ...errors.debit,
    //         balCodeID: getOnlyNumbersAllowedErrorMessage(),
    //       }
    //     }
    //   }
    // }
    if (!isNull(accNo)) {
      if (accNo !== '') {
        if (!isInteger(accNo)) {
          errors.debit = {
            ...errors.debit,
            accNo: getOnlyNumbersAllowedErrorMessage(),
          }
        }
      }
    }
  }

  return errors
}

const validateCredit = credit => resultErrors => {
  const { disabled, balCodeID, accNo } = credit
  const errors = { ...resultErrors }

  if (!disabled) {
    // if (!isNull(balCodeID)) {
    //   if (balCodeID !== '') {
    //     if (!isInteger(balCodeID)) {
    //       errors.credit = {
    //         ...errors.credit,
    //         balCodeID: getOnlyNumbersAllowedErrorMessage(),
    //       }
    //     }
    //   }
    // }
    if (!isNull(accNo)) {
      if (accNo !== '') {
        if (!isInteger(accNo)) {
          errors.credit = {
            ...errors.credit,
            accNo: getOnlyNumbersAllowedErrorMessage(),
          }
        }
      }
    }
  }

  return errors
}

const validateAmount = amount => resultErrors => {
  const { disabled, min, max } = amount
  const errors = { ...resultErrors }

  if (!disabled) {
    if (!isNull(min)) {
      if (min !== '') {
        if (!isInteger(min)) {
          errors.amount = {
            ...errors.amount,
            min: getOnlyNumbersAllowedErrorMessage(),
          }
        }
      }
    }
    if (!isNull(max)) {
      if (max !== '') {
        if (!isInteger(max)) {
          errors.amount = {
            ...errors.amount,
            max: getOnlyNumbersAllowedErrorMessage(),
          }
        }
      }
    }
  }

  return errors
}

export const validate = ({ startDate, endDate, creatorTypeID, debit, credit, amount }) => {
  const collectedErrors = composeValidators(
    validateStartDate(startDate, endDate),
    validateEndDate(startDate, endDate),
    validateCreatorType(creatorTypeID),
    validateDebit(debit),
    validateCredit(credit),
    validateAmount(amount),
  )({})

  return collectedErrors
}
