import React, { Component } from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import flowRight from 'lodash/flowRight'
import { reduxForm, getFormSyncErrors } from 'redux-form'
import { LoanOfficer } from '../../../../WebAPI'
import withLivedata from '../../../shared/containers/withLivedata'
import withCondition from '../../../shared/containers/withCondition'
import transformProps from '../../../shared/containers/transformProps'
import { fetchSFM as fetchSFMUndisp, getFetchSucceeded, getData, getPending } from '../../../shared/SimpleFetchManager'
import addProp from '../../../shared/containers/addProp'
import withLookups from '../../../shared/containers/withLookups'
import transformProp from '../../../shared/containers/transformProp'
import excludeProps from '../../../shared/containers/excludeProps'
import {
  PRODUCT_VIEW_LIST_FETCHER_NAME,
  PRODUCT_VIEW_DETAIL_FETCHER_NAME,
  FORM_NAME,
  LOAN_OFFICER_VIEW_OFFICER_LIST_ACTIVE_FETCHER_NAME,
  APP_VIEW_BASE_FETCHER_NAME,
  SEARCH_CLIENT_FETCHER_NAME,
  CLIENT_VIEW_BASE_FETCHER_NAME,
  CLIENT_VALIDATION_FETCHER_NAME,
} from '../constants'
import {
  getClientViewBase,
  isClientViewBasePresentAndValid as isClientViewBasePresentAndValidSel,
  isAsyncErrors as isAsyncErrorsSel,
  isFormError as isFormErrorSel,
  isSyncErrors as isSyncErrorsSel,
  isSubmitErrors as isSubmitErrorsSel,
  getIndustrySubIDOptionsSource as getIndustrySubIDOptionsSourceSel,
  getLoanEndDate as getLoanEndDateSel,
  getReqCurrencyValData as getReqCurrencyValDataSel,
  industrySubIDOptionsSourceSet as industrySubIDOptionsSourceSetUndisp,
  loanEndDateSet as loanEndDateSetUndisp,
  reqCurrencyValDataSet as reqCurrencyValDataSetUndisp,
} from '../store'
import { formValueSelector, arrayToMapByKey } from '../helpers'
import AppAddLocalLoader from '../shared/AppAddLocalLoader'
import { validationFn } from './validation'
import { onSubmit } from './onSubmit'
import {
  isApplicationIdentity,
  isProductViewListValid,
  getFormAndAdditionalInitialValues,
  getIndustryIDOptionsSource,
  getIndustryIDOptionsFromSource,
  getStartupOptions,
  getRepaymentSourceIDOptions,
  getReqCurrencyOptionsSource,
  getReqCurrencyOptionsFromSource,
  getGracePeriodConfig,
  getGracePeriodIntConfig,
  getGracePeriodInterestAccrualConfig,
  getScheduleTypeIDOptionsSource,
  getScheduleTypeIDOptionsFromSource,
  getPayFreqValueConfig,
  getPayFreqPeriodOptionsSource,
  getPayFreqPeriodOptionsFromSource,
  getInterestConfig,
  getInterestTypeOptionsSource,
  getInterestTypeOptionsFromSource,
  getUpfrontIDOptionsSource,
  getUpfrontIDOptionsFromSource,
  getRevolvingIDOptionsSource,
  getRevolvingIDOptionsFromSource,
  getPurposeIDOptionsSource,
  getPurposeIDOptionsFromSource,
  getPurpose2IDOptionsSource,
  getPurpose2IDOptionsFromSource,
  getManagerIDOptionsSource,
  getManagerIDOptionsFromSource,
  getProductIDOptions,
  getIndustrySubIDOptionsFromSource,
  getGracePeriodDisabled,
  getGracePeriodIntDisabled,
  getGracePeriodInterestAccrualDisabled,
  getPayFreqValueDisabled,
  getInterestDisabled,
  getDurationDaysDisabled,
  getDurationMonthsDisabled,
  getInstallmentsDisabled,
  getDurationDaysConfig,
  getDurationMonthsConfig,
  getInstallmentsConfig,
  getReqAmountConfig,
  getReqAmountDisabled,
} from './helpers'

const fetchData = flowRight(
  connect(undefined, dispatch => ({
    ...bindActionCreators({ fetchSFM: fetchSFMUndisp }, dispatch),
  })),

  WrappedCmp =>
    class Cmp extends Component {
      componentDidMount() {
        const { fetchSFM } = this.props

        fetchSFM({
          instanceName: LOAN_OFFICER_VIEW_OFFICER_LIST_ACTIVE_FETCHER_NAME,
          callApi: LoanOfficer.list,
          callApiArgs: [{ Active: true }],
          transformResponse: ({ Data }) => Data,
        })
      }

      render() {
        return <WrappedCmp {...this.props} />
      }
    },

  excludeProps(['fetchSFM']),
)

const processingFetchedData = flowRight(
  connect((state, props) => {
    let fetchesSucceeded =
      getFetchSucceeded(LOAN_OFFICER_VIEW_OFFICER_LIST_ACTIVE_FETCHER_NAME)(state) &&
      getFetchSucceeded(PRODUCT_VIEW_LIST_FETCHER_NAME)(state) &&
      getFetchSucceeded(PRODUCT_VIEW_DETAIL_FETCHER_NAME)(state)

    if (isApplicationIdentity(get(props, 'params.applicationIdentity'))) {
      fetchesSucceeded =
        fetchesSucceeded &&
        getFetchSucceeded(APP_VIEW_BASE_FETCHER_NAME)(state) &&
        getFetchSucceeded(CLIENT_VIEW_BASE_FETCHER_NAME)(state) &&
        getFetchSucceeded(CLIENT_VALIDATION_FETCHER_NAME)(state)
    }

    return { fetchesSucceeded }
  }),
  withCondition(({ fetchesSucceeded }) => fetchesSucceeded, () => <AppAddLocalLoader loading />),

  connect((state, props) => {
    let propsToAdd = {
      activeLoanOfficers: getData(LOAN_OFFICER_VIEW_OFFICER_LIST_ACTIVE_FETCHER_NAME)(state),
      productViewList: getData(PRODUCT_VIEW_LIST_FETCHER_NAME)(state),
      productViewDetail: getData(PRODUCT_VIEW_DETAIL_FETCHER_NAME)(state),
    }

    if (isApplicationIdentity(get(props, 'params.applicationIdentity'))) {
      propsToAdd = {
        ...propsToAdd,
        appViewBase: getData(APP_VIEW_BASE_FETCHER_NAME)(state),
      }
    }

    return propsToAdd
  }),
  withCondition(({ activeLoanOfficers }) => activeLoanOfficers, () => <AppAddLocalLoader loading />),
  withCondition(({ productViewList }) => isProductViewListValid(productViewList), () => <AppAddLocalLoader loading />),
  withCondition(({ productViewDetail }) => productViewDetail, () => <AppAddLocalLoader loading />),
  withCondition(
    props => !isApplicationIdentity(get(props, 'params.applicationIdentity')) || props.appViewBase,
    () => <AppAddLocalLoader loading />,
  ),

  transformProp('activeLoanOfficers', activeLoanOfficers => arrayToMapByKey(activeLoanOfficers, 'ID')),
  transformProp('productViewList', productViewList => arrayToMapByKey(productViewList, 'ID')),

  excludeProps(['fetchesSucceeded']),
)

const deriveMoreData = transformProps(props => {
  const { generalLookupsSys, productViewDetail, productViewList, authorizedUserName, activeLoanOfficers } = props

  const productIDOptions = getProductIDOptions(productViewList)

  const industryIDOptionsSource = getIndustryIDOptionsSource(productViewDetail, generalLookupsSys)

  const industryIDOptions = getIndustryIDOptionsFromSource(industryIDOptionsSource)

  const startupOptions = getStartupOptions(generalLookupsSys)

  const repaymentSourceIDOptions = getRepaymentSourceIDOptions(generalLookupsSys)

  const reqCurrencyOptionsSource = getReqCurrencyOptionsSource(productViewDetail, generalLookupsSys)
  const reqCurrencyOptions = getReqCurrencyOptionsFromSource(reqCurrencyOptionsSource, productViewDetail)

  const durationMonthsConfig = getDurationMonthsConfig(getDurationMonthsDisabled(productViewDetail))

  const durationDaysConfig = getDurationDaysConfig(getDurationDaysDisabled(productViewDetail))

  const installmentsConfig = getInstallmentsConfig(getInstallmentsDisabled(productViewDetail))

  const gracePeriodConfig = getGracePeriodConfig(getGracePeriodDisabled(productViewDetail))

  const gracePeriodIntConfig = getGracePeriodIntConfig(getGracePeriodIntDisabled(productViewDetail))

  const gracePeriodInterestAccrualConfig = getGracePeriodInterestAccrualConfig(
    getGracePeriodInterestAccrualDisabled(productViewDetail),
  )

  const scheduleTypeIDOptionsSource = getScheduleTypeIDOptionsSource(productViewDetail, generalLookupsSys)
  const scheduleTypeIDOptions = getScheduleTypeIDOptionsFromSource(scheduleTypeIDOptionsSource)

  const payFreqValueConfig = getPayFreqValueConfig(getPayFreqValueDisabled(productViewDetail))

  const payFreqPeriodOptionsSource = getPayFreqPeriodOptionsSource(productViewDetail)
  const payFreqPeriodOptions = getPayFreqPeriodOptionsFromSource(payFreqPeriodOptionsSource)

  const interestConfig = getInterestConfig(getInterestDisabled(productViewDetail))

  const interestTypeOptionsSource = getInterestTypeOptionsSource(productViewDetail)
  const interestTypeOptions = getInterestTypeOptionsFromSource(interestTypeOptionsSource)

  const upfrontIDOptionsSource = getUpfrontIDOptionsSource(productViewDetail)
  const upfrontIDOptions = getUpfrontIDOptionsFromSource(upfrontIDOptionsSource)

  const revolvingIDOptionsSource = getRevolvingIDOptionsSource(productViewDetail)
  const revolvingIDOptions = getRevolvingIDOptionsFromSource(revolvingIDOptionsSource)

  const purposeIDOptionsSource = getPurposeIDOptionsSource(productViewDetail, generalLookupsSys)
  const purposeIDOptions = getPurposeIDOptionsFromSource(purposeIDOptionsSource)

  const purpose2IDOptionsSource = getPurpose2IDOptionsSource(productViewDetail, generalLookupsSys)
  const purpose2IDOptions = getPurpose2IDOptionsFromSource(purpose2IDOptionsSource)

  const managerIDOptionsSource = getManagerIDOptionsSource(authorizedUserName, activeLoanOfficers)
  const managerIDOptions = getManagerIDOptionsFromSource(managerIDOptionsSource)

  return {
    ...props,

    productIDOptions,
    industryIDOptionsSource,
    industryIDOptions,
    startupOptions,
    repaymentSourceIDOptions,
    reqCurrencyOptionsSource,
    reqCurrencyOptions,
    durationMonthsConfig,
    durationDaysConfig,
    installmentsConfig,
    gracePeriodConfig,
    gracePeriodIntConfig,
    gracePeriodInterestAccrualConfig,
    scheduleTypeIDOptionsSource,
    scheduleTypeIDOptions,
    payFreqValueConfig,
    payFreqPeriodOptionsSource,
    payFreqPeriodOptions,
    interestConfig,
    interestTypeOptionsSource,
    interestTypeOptions,
    upfrontIDOptionsSource,
    upfrontIDOptions,
    revolvingIDOptionsSource,
    revolvingIDOptions,
    purposeIDOptionsSource,
    purposeIDOptions,
    purpose2IDOptionsSource,
    purpose2IDOptions,
    managerIDOptionsSource,
    managerIDOptions,
  }
})

const addClientViewBase = connect(state => ({
  clientViewBase: getClientViewBase(state),
}))

const initializeData = flowRight(
  connect(state => ({ ProductID: formValueSelector(state, 'ProductID') })),

  connect(
    state => ({
      isClientViewBasePresentAndValid: isClientViewBasePresentAndValidSel(state),
      cardNumberInputVal: formValueSelector(state, 'cardNumberInput'),
    }),
    dispatch =>
      bindActionCreators(
        {
          industrySubIDOptionsSourceSet: industrySubIDOptionsSourceSetUndisp,
          loanEndDateSet: loanEndDateSetUndisp,
          reqCurrencyValDataSet: reqCurrencyValDataSetUndisp,
        },
        dispatch,
      ),
  ),

  WrappedCmp =>
    class Cmp extends Component {
      constructor(props) {
        super(props)

        const { industrySubIDOptionsSourceSet, reqCurrencyValDataSet, loanEndDateSet } = this.props

        const {
          initialValues,
          additionalValues: { industrySubIDOptionsSource, reqCurrencyValData, loanEndDate },
        } = getFormAndAdditionalInitialValues(this.props)

        this.state = {
          childProps: { initialValues },
        }

        industrySubIDOptionsSourceSet(industrySubIDOptionsSource)
        reqCurrencyValDataSet(reqCurrencyValData)
        loanEndDateSet(loanEndDate)
      }

      render() {
        return <WrappedCmp {...this.props} {...this.state.childProps} />
      }
    },

  connect(state => ({
    industrySubIDOptionsSource: getIndustrySubIDOptionsSourceSel(state),
    loanEndDate: getLoanEndDateSel(state),
    reqCurrencyValData: getReqCurrencyValDataSel(state),
  })),

  transformProps(props => {
    const { industrySubIDOptionsSource, productViewDetail, reqCurrencyValData } = props

    return {
      ...props,
      industrySubIDOptions: getIndustrySubIDOptionsFromSource(industrySubIDOptionsSource),
      reqAmountConfig: getReqAmountConfig(getReqAmountDisabled(productViewDetail, reqCurrencyValData)),
    }
  }),

  excludeProps(['productIdInitialValue', 'ProductID', 'ReqCurrency', 'isClientViewBasePresentAndValid']),
)

const reduxFormCont = flowRight(
  addProp('validate', () => validationFn),

  connect(state => ({
    isSyncErrors: isSyncErrorsSel(state),
    isAsyncErrors: isAsyncErrorsSel(state),
    isSubmitErrors: isSubmitErrorsSel(state),
    isFormError: isFormErrorSel(state),

    syncErrors: getFormSyncErrors(FORM_NAME)(state),
  })),

  reduxForm({
    form: FORM_NAME,
    updateUnregisteredFields: true,
    destroyOnUnmount: false,
    onSubmit,
  }),

  excludeProps(['validate', 'client']),
)

const logFinalProps = transformProps(props => {
  console.log('final props: ', {
    frequentlyViewed: {
      productViewDetail: props.productViewDetail,
      industrySubIDOptionsSource: props.industrySubIDOptionsSource,
    },
    all: { ...props },
  })
  return props
})

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> final export container >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export default flowRight(
  withLookups({
    type: 'sys',
    query: '* as generalLookupsSys',
  }),

  withLivedata({
    query: ['OpenDayStatus[0].Open_Day as openDay', 'OpenDayStatus[0].Open_Day_Str as openDayStr'],
  }),

  withLivedata({
    query: 'UserLiveData.USERNAME as authorizedUserName',
  }),

  /*
  activeLoanOfficers
  productViewList
  productViewDetail
   */
  fetchData,

  processingFetchedData,

  deriveMoreData,

  addClientViewBase,

  initializeData,

  reduxFormCont,

  connect(state => ({
    clientChoosingPending:
      getPending(SEARCH_CLIENT_FETCHER_NAME)(state) ||
      getPending(CLIENT_VIEW_BASE_FETCHER_NAME)(state) ||
      getPending(CLIENT_VALIDATION_FETCHER_NAME)(state),
  })),

  withCondition(
    ({ submitting, formSubmitSucceeded, clientChoosingPending }) =>
      !(submitting || formSubmitSucceeded || clientChoosingPending),
    () => <AppAddLocalLoader loading />,
  ),

  // logFinalProps,
)
