import React, { Component } from 'react'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isUndefined from 'lodash/isUndefined'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'
import { bindActionCreators } from 'redux'
import flowRight from 'lodash/flowRight'
import DropdownField from 'shared/FormFields/DropdownField'
import { ValidationRules } from 'WebAPI'
import { fetchSFM as fetchSFMUndisp, getData } from 'shared/SimpleFetchManager'
import {
  isApplicationIdentity,
  getFormAndAdditionalInitialValues,
  getIndustryIDOptionsFromSource,
  getIndustryIDOptionsSource,
  getInterestTypeOptionsFromSource,
  getPayFreqPeriodOptionsFromSource,
  getRevolvingIDOptionsFromSource,
  getUpfrontIDOptionsFromSource,
  getReqCurrencyOptionsSource,
  getReqCurrencyOptionsFromSource,
  getScheduleTypeIDOptionsFromSource,
  getPurposeIDOptionsFromSource,
  getPurpose2IDOptionsFromSource,
  getScheduleTypeIDOptionsSource,
  getPayFreqPeriodOptionsSource,
  getInterestTypeOptionsSource,
  getUpfrontIDOptionsSource,
  getRevolvingIDOptionsSource,
  getPurposeIDOptionsSource,
  getPurpose2IDOptionsSource,
} from '../helpers'
import {
  industrySubIDOptionsSourceSet as industrySubIDOptionsSourceSetUndisp,
  loanEndDateSet as loanEndDateSetUndisp,
  reqCurrencyValDataSet as reqCurrencyValDataSetUndisp,
  isClientViewBasePresentAndValid as isClientViewBasePresentAndValidSel,
  isClientViewBase as isClientViewBaseSel,
  getClientViewBase,
  fetchClientByCardNumber as fetchClientByCardNumberUndisp,
} from '../../store'
import { FORM_NAME, PRODUCT_VIEW_DETAIL_FETCHER_NAME, PRODUCT_VIEW_LIST_FETCHER_NAME } from '../../constants'
import { arrayToMapByKey } from '../../helpers'

class ProductID extends Component {
  onChange = (event, newValue, previousValue) => {
    if (!isEqual(newValue, previousValue)) {
      const {
        fetchSFM,

        productViewList,

        // start: for getFormAndAdditionalInitialValues
        productIDOptions,
        startupOptions,
        repaymentSourceIDOptions,
        managerIDOptions,
        isClientViewBasePresentAndValid,
        cardNumberInputVal,
        generalLookupsSys,
        openDay,
        // end: for getFormAndAdditionalInitialValues

        initializeForm,
        industrySubIDOptionsSourceSet,
        loanEndDateSet,
        reqCurrencyValDataSet,
        isClientViewBase,
        clientViewBase,
        fetchClientByCardNumber,
      } = this.props

      const { HashSum_ProductID_ } = productViewList[newValue]

      fetchSFM({
        instanceName: PRODUCT_VIEW_DETAIL_FETCHER_NAME,
        callApi: ValidationRules.fetch,
        callApiArgs: [{ page: 'detail', ProductID: newValue, HashSum_ProductID_ }],
        transformResponse: prodViewDetResp => prodViewDetResp.Data,
      }).then(prodViewDetailsData => {
        const industryIDOptions = getIndustryIDOptionsFromSource(
          getIndustryIDOptionsSource(prodViewDetailsData, generalLookupsSys),
        )

        const reqCurrencyOptionsSource = getReqCurrencyOptionsSource(prodViewDetailsData, generalLookupsSys)

        const reqCurrencyOptions = getReqCurrencyOptionsFromSource(reqCurrencyOptionsSource, prodViewDetailsData)

        const scheduleTypeIDOptions = getScheduleTypeIDOptionsFromSource(
          getScheduleTypeIDOptionsSource(prodViewDetailsData, generalLookupsSys),
        )

        const payFreqPeriodOptions = getPayFreqPeriodOptionsFromSource(
          getPayFreqPeriodOptionsSource(prodViewDetailsData),
        )

        const interestTypeOptions = getInterestTypeOptionsFromSource(getInterestTypeOptionsSource(prodViewDetailsData))

        const upfrontIDOptions = getUpfrontIDOptionsFromSource(getUpfrontIDOptionsSource(prodViewDetailsData))

        const revolvingIDOptions = getRevolvingIDOptionsFromSource(getRevolvingIDOptionsSource(prodViewDetailsData))

        const purposeIDOptions = getPurposeIDOptionsFromSource(
          getPurposeIDOptionsSource(prodViewDetailsData, generalLookupsSys),
        )

        const purpose2IDOptions = getPurpose2IDOptionsFromSource(
          getPurpose2IDOptionsSource(prodViewDetailsData, generalLookupsSys),
        )

        if (prodViewDetailsData) {
          const {
            initialValues,
            additionalValues: { industrySubIDOptionsSource, reqCurrencyValData, loanEndDate },
          } = getFormAndAdditionalInitialValues({
            ProductID: newValue,
            productIDOptions,
            isClientViewBasePresentAndValid,
            cardNumberInputVal,
            productViewDetail: prodViewDetailsData,
            generalLookupsSys,
            openDay,
            industryIDOptions,
            startupOptions,
            repaymentSourceIDOptions,
            reqCurrencyOptionsSource,
            reqCurrencyOptions,
            scheduleTypeIDOptions,
            payFreqPeriodOptions,
            interestTypeOptions,
            upfrontIDOptions,
            revolvingIDOptions,
            purposeIDOptions,
            purpose2IDOptions,
            managerIDOptions,
          })

          initializeForm(initialValues)
          industrySubIDOptionsSourceSet(industrySubIDOptionsSource)
          reqCurrencyValDataSet(reqCurrencyValData)
          loanEndDateSet(loanEndDate)

          if (isClientViewBase) {
            const { CardNumber } = clientViewBase

            fetchClientByCardNumber(CardNumber, prodViewDetailsData)
          }
        }
      })
    }
  }

  render() {
    const { options, productIDDisabled } = this.props

    return <DropdownField name="ProductID" options={options} onChange={this.onChange} disabled={productIDDisabled} />
  }
}

export default flowRight(
  connect(
    (state, props) => ({
      isClientViewBasePresentAndValid: isClientViewBasePresentAndValidSel(state),
      isClientViewBase: isClientViewBaseSel(state),
      productViewList: arrayToMapByKey(getData(PRODUCT_VIEW_LIST_FETCHER_NAME)(state), 'ID'),
      clientViewBase: getClientViewBase(state),
      productIDDisabled: isApplicationIdentity(get(props, 'params.applicationIdentity')),
    }),
    dispatch => ({
      ...bindActionCreators(
        {
          fetchSFM: fetchSFMUndisp,
          industrySubIDOptionsSourceSet: industrySubIDOptionsSourceSetUndisp,
          loanEndDateSet: loanEndDateSetUndisp,
          reqCurrencyValDataSet: reqCurrencyValDataSetUndisp,
          initializeForm: (...args) => initialize(FORM_NAME, ...args),
        },
        dispatch,
      ),
      fetchClientByCardNumber: (cardNumberInput, productViewDetail) =>
        fetchClientByCardNumberUndisp(dispatch, cardNumberInput, productViewDetail),
    }),
  ),
)(ProductID)
