import get from 'lodash/get'
import pick from 'lodash/pick'
import { SubmissionError, stopSubmit, setSubmitFailed } from 'redux-form'
import { fetchSFM } from 'shared/SimpleFetchManager'
import { Application } from 'WebAPI'
import { validate as validateCommittee } from 'shared/CommitteeModal'
import { actions as LKModalActions, constants as LKModalConstants } from 'shared/LKModal'
import {
  FORM_NAME,
  APP_VIEW_BASE_FETCHER_NAME,
  APPLICATION_ADD_FETCHER_NAME,
  APPLICATION_EDIT_FETCHER_NAME,
  APPLICATION_COMMITTEE_MODAL_NAME,
} from '../constants'
import { searchAgainApplications } from '../../../../features/ApplicationSearchGeneral'
import { checkErrorCode, getSubmitValidationErrors } from './validation'
import { pushAppDetailsRoute, translateLKMessage } from '../helpers'
import { isApplicationIdentity } from './helpers'
import { fetchAppsViewDecisionEligible } from '../callApis'

const valuesToDataForAdd = (
  values,
  {
    clientViewBase: { ID, HashSum_ClientID_ },
    productViewList,
    productViewDetail,
    clientViewBase: { CityID, ReferralID },
  },
) => {
  const { ProductID } = values

  const valuesToSubmit = pick(values, [
    'ProductID',
    'BusinessType',
    'OtherPurpose',
    'OtherPurpose2',
    'ProjectDescription',
    'CField1',
    'CField2',
    'CField3',
    'CField4',
    'GracePeriod_InterestAccrual',
    'IndustryID',
    'IndustrySubID',
    'Startup',
    'RepaymentSourceID',
    'ReqCurrency',
    'ReqAmount',
    'GracePeriod',
    'GracePeriodInt',
    'ScheduleTypeID',
    'PayFreqValue',
    'PayFreqPeriod',
    'DurationDays',
    'DurationMonths',
    'Interest',
    'InterestType',
    'UpfrontID',
    'RevolvingID',
    'PurposeID',
    'Purpose2ID',
    'PurposeSum',
    'Purpose2Sum',
    'Contribution',
    'ManagerID',
  ])

  const { HashSum_ProductID_ } = productViewList[ProductID]
  const ResourceID = get(productViewDetail, 'Resource[0].ID')

  const data = {
    ...valuesToSubmit,
    ClientID: ID,
    HashSum_ClientID_,
    CityID,
    ResourceID,
    HashSum_ProductID_,
    InfoSourceID: ReferralID,
    AppScreening: 0,
  }

  return data
}

const valuesToDataForEdit = (
  values,
  {
    productViewList,
    productViewDetail,
    clientViewBase: { CityID, ReferralID },
    appViewBase,
    appViewBase: { ID, HashSum_AppID_ },
  },
) => {
  const { ProductID } = values

  console.log('yyyyyyyyyyyyyyyy', appViewBase)

  const valuesToSubmit = pick(values, [
    'ProductID',
    'BusinessType',
    'OtherPurpose',
    'OtherPurpose2',
    'ProjectDescription',
    'CField1',
    'CField2',
    'CField3',
    'CField4',
    'GracePeriod_InterestAccrual',
    'IndustryID',
    'IndustrySubID',
    'Startup',
    'RepaymentSourceID',
    'ReqCurrency',
    'ReqAmount',
    'GracePeriod',
    'GracePeriodInt',
    'ScheduleTypeID',
    'PayFreqValue',
    'PayFreqPeriod',
    'DurationDays',
    'DurationMonths',
    'Interest',
    'InterestType',
    'UpfrontID',
    'RevolvingID',
    'PurposeID',
    'Purpose2ID',
    'PurposeSum',
    'Purpose2Sum',
    'Contribution',
    'ManagerID',
  ])

  const { HashSum_ProductID_ } = productViewList[ProductID]
  const ResourceID = get(productViewDetail, 'Resource[0].ID')

  const data = {
    ...valuesToSubmit,
    AppID: ID,
    HashSum_AppID_,
    CityID,
    ResourceID,
    HashSum_ProductID_,
    InfoSourceID: ReferralID,
    AppScreening: 0,
  }

  return data
}

const isErrorResponseMessageToShow = errorResponse => !!(errorResponse.Error.Message || errorResponse.Error.Text)

const getErrorResponseModalMessage = errorResponse => errorResponse.Error.Message || errorResponse.Error.Text

const realOnSubmit = (values, dispatch, props) => {
  console.log('*** onSubmit ****')

  const { closeModal, clientViewBase: { FullName } } = props
  const applicationIdentity = get(props, 'params.applicationIdentity')

  if (!isApplicationIdentity(applicationIdentity)) {
    const data = valuesToDataForAdd(values, props)

    return new Promise((resolve, reject) => {
      dispatch(
        fetchSFM({
          instanceName: APPLICATION_ADD_FETCHER_NAME,
          callApi: Application.add,
          callApiArgs: [data],
          transformResponse: response => response.Data,
        }),
      )
        .then(({ ID, HashSum_AppID_ }) => {
          dispatch(
            fetchSFM({
              instanceName: APP_VIEW_BASE_FETCHER_NAME,
              callApi: Application.details,
              callApiArgs: [{ ID, hash: HashSum_AppID_, page: 'base' }],
              transformResponse: response => response.Data,
            }),
          ).then(({ AppScreening, ProductID, HashSum_ProductID_ }) => {
            fetchAppsViewDecisionEligible(ID, HashSum_AppID_).then(decisionEligible => {
              if (decisionEligible) {
                validateCommittee(ID, HashSum_AppID_)
                  .then(() => {
                    closeModal()

                    dispatch(
                      LKModalActions.open({
                        name: APPLICATION_COMMITTEE_MODAL_NAME,
                        message: translateLKMessage('CONFIRM_AUTOMATIC_DECISION'),
                        AppID: ID,
                        AppHash: HashSum_AppID_,
                        ProductID,
                        ProductHash: HashSum_ProductID_,
                        FullName,
                        AppScreening,
                      }),
                    )
                  })
                  .catch(() => {
                    closeModal()

                    pushAppDetailsRoute({ ID, HashSum_AppID_, AppScreening })
                  })
              } else {
                closeModal()

                pushAppDetailsRoute({ ID, HashSum_AppID_, AppScreening })
              }
            })
          })
          resolve()
        })
        .catch(error => {
          console.log('submit failed: ', error)

          if (checkErrorCode(error, 2)) {
            if (isErrorResponseMessageToShow(error)) {
              dispatch(
                LKModalActions.open({
                  name: LKModalConstants.INFO_MODAL_NAME,
                  message: getErrorResponseModalMessage(error),
                }),
              )
            }
            reject()
          } else if (checkErrorCode(error, 3)) {
            reject(getSubmitValidationErrors(error))
          }
        })
    })
  }

  const data = valuesToDataForEdit(values, props)

  return new Promise((resolve, reject) => {
    dispatch(
      fetchSFM({
        instanceName: APPLICATION_EDIT_FETCHER_NAME,
        callApi: Application.edit,
        callApiArgs: [data],
        transformResponse: response => response.Data,
      }),
    )
      .then(() => {
        resolve()

        setTimeout(() => {
          closeModal()
        }, 0)

        dispatch(searchAgainApplications())
      })
      .catch(error => {
        console.log('submit failed: ', error)

        if (checkErrorCode(error, 2)) {
          if (isErrorResponseMessageToShow(error)) {
            dispatch(
              LKModalActions.open({
                name: LKModalConstants.INFO_MODAL_NAME,
                message: getErrorResponseModalMessage(error),
              }),
            )
          }
          reject()
        } else if (checkErrorCode(error, 3)) {
          reject(getSubmitValidationErrors(error))
        }
      })
  })
}

export const onSubmit = (values, dispatch, props) => {
  const { isSyncErrors, isSubmitErrors, syncErrors } = props

  console.log('** checker onSubmit **', isSyncErrors, isSubmitErrors, syncErrors)

  if (isSyncErrors) {
    return Promise.reject(new SubmissionError({ _error: "unregistered field's synchronous errors." }))
  }

  return realOnSubmit(values, dispatch, props)
}
