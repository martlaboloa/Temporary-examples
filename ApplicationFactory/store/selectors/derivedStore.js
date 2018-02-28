import isNull from 'lodash/isNull'
import { createSelector } from 'reselect'
import { getFormSyncErrors, getFormAsyncErrors, getFormSubmitErrors, getFormError } from 'redux-form'
import { isFieldTouched } from '../../../../shared/reduxForm'
import { getFetchSucceeded, getData } from '../../../../shared/SimpleFetchManager'
import { CLIENT_VIEW_BASE_FETCHER_NAME, CLIENT_VALIDATION_FETCHER_NAME, FORM_NAME } from '../../constants'
import { isSyncErrorsHelper, isAsyncErrorsHelper, isSubmitErrorsHelper, isFormErrorHelper } from '../../helpers'
import { isClientViewBaseValidTest } from '../../Components/helpers'
import { getLoanEndDate, getReqCurrencyValData } from '../reducer/selectors'

export const loanEndDateExists = createSelector(getLoanEndDate, loanEndDate => !isNull(loanEndDate))

export const reqCurrencyValDataExists = createSelector(
  getReqCurrencyValData,
  reqCurrencyValData => !isNull(reqCurrencyValData),
)

export const isClientViewBase = createSelector(
  getFetchSucceeded(CLIENT_VIEW_BASE_FETCHER_NAME),
  getData(CLIENT_VIEW_BASE_FETCHER_NAME),
  (fetchSucceeded, data) => fetchSucceeded === true && data !== null,
)

export const isClientViewBaseValid = createSelector(getData(CLIENT_VALIDATION_FETCHER_NAME), clientValidation =>
  isClientViewBaseValidTest(clientValidation),
)

export const isClientViewBasePresentAndValid = createSelector(
  isClientViewBase,
  isClientViewBaseValid,
  (isClientViewBaseBool, isClientViewBaseValidBool) => isClientViewBaseBool && isClientViewBaseValidBool,
)

export const getClientViewBase = state => getData(CLIENT_VIEW_BASE_FETCHER_NAME)(state)

export const isSyncErrors = createSelector(getFormSyncErrors(FORM_NAME), syncErrors => isSyncErrorsHelper(syncErrors))

export const isAsyncErrors = createSelector(getFormAsyncErrors(FORM_NAME), asyncErrors =>
  isAsyncErrorsHelper(asyncErrors),
)

export const isSubmitErrors = createSelector(getFormSubmitErrors(FORM_NAME), submitErrors =>
  isSubmitErrorsHelper(submitErrors),
)

export const isFormError = createSelector(getFormError(FORM_NAME), formError => isFormErrorHelper(formError))

export const isFormFieldTouched = isFieldTouched(FORM_NAME)
