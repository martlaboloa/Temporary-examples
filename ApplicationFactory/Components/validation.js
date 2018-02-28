import { SubmissionError } from 'redux-form'
import get from 'lodash/get'
import { translateLKMessage } from '../helpers'
import {
  APP_ADD_API_PARAM_NAMES,
  APP_ADD_API_ERROR_NAMES_TO_PARAM_NAMES,
  SUBMIT_VALIDATION_FIELD_ERROR_MESSAGE,
  REQ_AMOUNT_MIN,
  MAX_MONEY_INPUT,
  DURATION_YEAR_MAX,
  INTEREST_MAX,
} from '../constants'

export const validationFn = (
  {
    ReqAmount,
    GracePeriod,
    GracePeriodInt,
    Interest,
    PurposeSum,
    Purpose2Sum,
    DurationDays,
    DurationMonths,
    ScheduleTypeID,
    GracePeriod_InterestAccrual,
    Contribution,
  },
  {
    reqCurrencyValData,
    productViewDetail,
    productViewDetail: {
      GracePeriodCheck,
      GracePeriodMin,
      GracePeriodMax,
      GracePeriodIntCheck,
      GracePeriodIntMin,
      GracePeriodIntMax,
      InterestCheck,
      InterestMin,
      InterestMax,
      GracePeriod_InterestAccrual_Check,
      GracePeriod_InterestAccrual_Max,

      TermDaysCheck,
      TermDaysMin,
      TermDaysMax,

      CCYCheck,
    },
  },
) => {
  const GracePeriod_InterestAccrualMin = productViewDetail.GracePeriod_InterestAccrual

  const errors = {}

  const { AmountMin, AmountMax } = reqCurrencyValData

  // PurposeSum
  // Purpose2Sum
  // Contribution
  // Interest

  if (ReqAmount < 0) {
    errors.ReqAmount = 'number is negative'
  } else if (CCYCheck === 1) {
    if (ReqAmount < AmountMin || ReqAmount > AmountMax) {
      errors.ReqAmount = `${translateLKMessage('HINT_PROD_HEADER')}\n
      ${translateLKMessage('HINT_PROD_MIN')}${AmountMin}\n
      ${translateLKMessage('HINT_PROD_MAX')}${AmountMax}`
    }
  } else if (ReqAmount < REQ_AMOUNT_MIN || ReqAmount > MAX_MONEY_INPUT) {
    errors.ReqAmount = 'number is out of range'
  }

  if (GracePeriodCheck === 1 && (GracePeriod < GracePeriodMin || GracePeriod > GracePeriodMax)) {
    errors.GracePeriod = `${translateLKMessage('HINT_PROD_HEADER')}\n
      ${translateLKMessage('HINT_PROD_MIN')}${GracePeriodMin}\n
      ${translateLKMessage('HINT_PROD_MAX')}${GracePeriodMax}`
  }

  if (GracePeriodIntCheck === 1 && (GracePeriodInt < GracePeriodIntMin || GracePeriodInt > GracePeriodIntMax)) {
    errors.GracePeriodInt = `${translateLKMessage('HINT_PROD_HEADER')}\n
      ${translateLKMessage('HINT_PROD_MIN')}${GracePeriodIntMin}\n
      ${translateLKMessage('HINT_PROD_MAX')}${GracePeriodIntMax}`
  }

  if (Interest < 0) {
    errors.Interest = 'number is negative'
  } else if (InterestCheck === 1) {
    if (Interest < InterestMin || Interest > InterestMax) {
      errors.Interest = `${translateLKMessage('HINT_PROD_HEADER')}\n
      ${translateLKMessage('HINT_PROD_MIN')}${InterestMin}\n
      ${translateLKMessage('HINT_PROD_MAX')}${InterestMax}`
    }
  } else if (Interest > INTEREST_MAX) {
    errors.Interest = 'number is too big'
  }

  if (TermDaysCheck === 1) {
    if (DurationDays < TermDaysMin || DurationDays > TermDaysMax) {
      errors.DurationDays = `${translateLKMessage('HINT_PROD_HEADER')}\n
      ${translateLKMessage('HINT_PROD_MIN')}${TermDaysMin}\n
      ${translateLKMessage('HINT_PROD_MAX')}${TermDaysMax}`
    }
  }

  if (TermDaysCheck !== 1 && DurationMonths > DURATION_YEAR_MAX * 12) {
    errors.DurationMonths = 'number is too big'
  }

  if (PurposeSum < 0 || Purpose2Sum < 0) {
    if (PurposeSum < 0) {
      errors.PurposeSum = 'number is negative'
    }
    if (Purpose2Sum < 0) {
      errors.Purpose2Sum = 'number is negative'
    }
  } else if (ReqAmount !== PurposeSum + Purpose2Sum) {
    errors.PurposeSum = 'jami toli unda iyos!'
    errors.Purpose2Sum = 'jami toli unda iyos!'
  }

  if (ScheduleTypeID === 1 && (GracePeriod !== 0 || GracePeriodInt !== 0)) {
    if (GracePeriodInt >= GracePeriod) {
      errors.GracePeriod = translateLKMessage('ERR_PRODUCT_GRACEPERIOD_INT_VIOL')
      errors.GracePeriodInt = translateLKMessage('ERR_PRODUCT_GRACEPERIOD_INT_VIOL')
    }
  }

  if (
    GracePeriod_InterestAccrual_Check === 1 &&
    (GracePeriod_InterestAccrual < GracePeriod_InterestAccrualMin ||
      GracePeriod_InterestAccrual > GracePeriod_InterestAccrual_Max)
  ) {
    errors.GracePeriod_InterestAccrual = `${translateLKMessage('HINT_PROD_HEADER')}\n
      ${translateLKMessage('HINT_PROD_MIN')}${GracePeriod_InterestAccrualMin}\n
      ${translateLKMessage('HINT_PROD_MAX')}${GracePeriod_InterestAccrual_Max}`
  }

  if (Contribution < 0) {
    errors.Contribution = 'number is negative'
  } else if (Contribution > MAX_MONEY_INPUT) {
    errors.Contribution = 'number is too big'
  }

  return errors
}

export const checkErrorCode = (errorResponse, code) => get(errorResponse, 'Error.Code') === code

/* START: get failed field's names */
const getErrorFailedFieldsNames = errorResponse =>
  errorResponse.Error.FailedFields.map(failedField => failedField.FName)

const errorFailedFieldNameToApiFailedFieldName = errorFailedFieldName => {
  const returningVal = APP_ADD_API_ERROR_NAMES_TO_PARAM_NAMES[errorFailedFieldName]

  if (!returningVal) {
    console.warn(
      `MESSAGE FOR FUTURE SHAKO AROSHIDZE: daserche project-shi es: errorFailedFieldNameToApiFailedFieldName: ${returningVal}`, // eslint-disable-line
    )
  }

  return returningVal
}

const errorFailedFieldsNamesToApiFailedFieldsNames = errorFailedFieldsNames =>
  errorFailedFieldsNames
    .map(
      errorFailedFieldName =>
        APP_ADD_API_PARAM_NAMES.includes(errorFailedFieldName)
          ? errorFailedFieldName
          : errorFailedFieldNameToApiFailedFieldName(errorFailedFieldName),
    )
    .filter(apiFailedFieldName => apiFailedFieldName)

const getFailedFieldsNames = errorResponse => {
  const errorFailedFieldsNames = getErrorFailedFieldsNames(errorResponse)

  return errorFailedFieldsNamesToApiFailedFieldsNames(errorFailedFieldsNames)
}
/* END: get failed field's names */

export const getSubmitValidationErrors = errorResponse => {
  const errors = {}

  const failedFieldsNames = getFailedFieldsNames(errorResponse)

  failedFieldsNames.forEach(failedFieldName => {
    errors[failedFieldName] = SUBMIT_VALIDATION_FIELD_ERROR_MESSAGE
  })

  return new SubmissionError(errors)
}
