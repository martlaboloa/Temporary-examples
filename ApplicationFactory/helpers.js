import findIndex from 'lodash/findIndex'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import { formValueSelector as getFormValueSelector, getFormInitialValues as getGetFormInitialValues } from 'redux-form'
import { translate as mainTranslate } from '../../../helpers'
import history from '../../../helpers/history'
import { FORM_NAME } from './constants'

export const pushAppDetailsRoute = ({ ID, HashSum_AppID_, AppScreening }) => {
  let url = `/secure/application/${ID}/details/${HashSum_AppID_}`

  if (AppScreening === 1) {
    url = `${url}/screening`
  }

  history.push(url)
}

export const translate = key => mainTranslate(`frm_app_add_edit-${key}`)

export const translateClientSearch = key => mainTranslate('frm_client_list', key)

export const translateLKMessage = key => mainTranslate('LKMESSAGE', key)

export const getSearchPanelConfig = productViewDetail => {
  const { ClientTypeCheck, ClientType } = productViewDetail

  const searchPanelConfig = {
    initialValues: {
      safety: {
        blacklisted: 2,
      },
    },
    fieldsDisability: {
      categ: {
        individuals: true,
        solidarityGroups: true,
        companies: true,
      },
      safety: {
        blacklisted: true,
      },
    },

    hintAboveMessage: translateClientSearch('lbl_healthy_only'),
  }

  if (ClientTypeCheck === 1) {
    searchPanelConfig.initialValues = {
      ...searchPanelConfig.initialValues,
      categ: {
        individuals: findIndex(ClientType, next => next.ID === 1) !== -1,
        solidarityGroups: findIndex(ClientType, next => next.ID === 2) !== -1,
        companies: findIndex(ClientType, next => next.ID === 3) !== -1,
      },
    }
  } else {
    searchPanelConfig.initialValues = {
      ...searchPanelConfig.initialValues,
      categ: {
        individuals: true,
        solidarityGroups: true,
        companies: true,
      },
    }
  }
  return searchPanelConfig
}

export const formValueSelector = getFormValueSelector(FORM_NAME)

export const getFormInitialValues = (...args) => getGetFormInitialValues(FORM_NAME)(...args)

const formValueSelectorOutsideForm = (state, field) => {
  const fieldValue = formValueSelector(state, field)

  const fieldInitialValue = getFormInitialValues(state)[field]

  return {
    [field]: !isNil(fieldValue) ? fieldValue : fieldInitialValue,
  }
}

export const withFallbackReturnValue = (fn, fallbackValue, isValid = (...args) => !isNil(...args)) => (...args) => {
  const returnValue = fn(...args)
  return isValid(returnValue) ? returnValue : fallbackValue
}

export const arrayToMapByKey = (arr, key) => arr.reduce((acc, curr) => ({ ...acc, [curr[key]]: curr }), {})

export const isSyncErrorsHelper = syncErrors => !isEmpty(syncErrors)

export const isAsyncErrorsHelper = asyncErrors => !isEmpty(asyncErrors)

export const isSubmitErrorsHelper = submitErrors => !isEmpty(submitErrors)

export const isFormErrorHelper = formError => !isNil(formError)
