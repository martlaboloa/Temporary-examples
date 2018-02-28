import moment from 'moment'
import isUndefined from 'lodash/isUndefined'
import toString from 'lodash/toString'
import findIndex from 'lodash/findIndex'
import reduce from 'lodash/reduce'
import toArray from 'lodash/toArray'
import find from 'lodash/find'
import isNull from 'lodash/isNull'
import isArray from 'lodash/isArray'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { DAYS_PER_MONTH_AVG } from '../constants'

export const isClientViewBaseValidTest = clientValidation => isArray(clientValidation) && isEmpty(clientValidation)

export const isApplicationIdentity = applicationIdentity => !isUndefined(applicationIdentity)

export const isDropdownDisabled = options => isEmpty(options) || options.length === 1

export const getDropdownFirstValue = options => get(options, '[0].value')

export const isProductViewListValid = productViewList => isArray(productViewList) && !isEmpty(productViewList)

export const isProductViewDetailValid = (productViewDetail, ProductID) =>
  productViewDetail && productViewDetail.ID === ProductID

export const getIndustrySubIDOptionsSource = (generalLookupsSys, industryIDVal) => {
  const { IndustrySub } = generalLookupsSys

  return IndustrySub.filter(({ ORG_IndustryID }) => ORG_IndustryID === industryIDVal)
}
export const getIndustrySubIDOptionsFromSource = industrySubIDOptionsSource =>
  industrySubIDOptionsSource.map(({ ID, Title }) => ({
    value: ID,
    text: Title,
  }))

export const getReqCurrencyValData = (reqCurrencyOptionsSource, reqCurrencyVal, productViewDetail) => {
  const { CCYCheck } = productViewDetail

  return CCYCheck === 1
    ? reqCurrencyOptionsSource.find(({ CCY }) => CCY === reqCurrencyVal)
    : reqCurrencyOptionsSource.find(({ ISO }) => ISO === reqCurrencyVal)
}

export const getReqAmountInitVal = (reqCurrencyValData, productViewDetail) => {
  const { CCYCheck } = productViewDetail

  return CCYCheck === 1 ? reqCurrencyValData.AmountMax : 0
}

export const getReqAmountDisabled = (productViewDetail, reqCurrencyValData) => {
  const { CCYCheck } = productViewDetail
  const { AmountMin, AmountMax } = reqCurrencyValData

  return CCYCheck === 1 && AmountMin === AmountMax
}

export const getReqAmountConfig = reqAmountDisabled => ({ disabled: reqAmountDisabled })

export const getGracePeriodInitVal = productViewDetail => productViewDetail.GracePeriodMax

export const getGracePeriodIntInitVal = productViewDetail => productViewDetail.GracePeriodIntMax

export const getGracePeriodInterestAccrualInitVal = productViewDetail => productViewDetail.GracePeriod_InterestAccrual

export const getPayFreqValueInitVal = productViewDetail => productViewDetail.PayFreqValue

export const getDurationDaysInitVal = productViewDetail => productViewDetail.TermDaysMax

export const getDurationDaysFromMonths = DurationMonths => Math.round(DurationMonths * DAYS_PER_MONTH_AVG)

export const getDurationDays = (Installments, PayFreqPeriod, PayFreqValue) => {
  let DurationDays
  if (PayFreqPeriod === 1) {
    DurationDays = Math.round(PayFreqValue * Installments)
  } else if (PayFreqPeriod === 2) {
    DurationDays = Math.round(PayFreqValue * 7 * Installments)
  } else if (PayFreqPeriod === 3) {
    DurationDays = Math.round(PayFreqValue * DAYS_PER_MONTH_AVG * Installments)
  }
  return DurationDays
}

export const getLoanEndDateVal = (openDay, durationDaysVal) =>
  moment(openDay)
    .add(durationDaysVal, 'days')
    .format('DD.MM.YYYY')

export const getDurationMonthsInitVal = productViewDetail =>
  Math.round(productViewDetail.TermDaysMax / DAYS_PER_MONTH_AVG)

export const getDurationMonthsFromDays = DurationDays => Math.round(DurationDays / DAYS_PER_MONTH_AVG)

export const getInstallmentsInitVal = (payFreqPeriodVal, durationDaysVal, payFreqValueVal) => {
  let installmentsInitVal

  if (payFreqPeriodVal === 1) {
    installmentsInitVal = Math.round(durationDaysVal / payFreqValueVal)
  } else if (payFreqPeriodVal === 2) {
    installmentsInitVal = Math.round(durationDaysVal / (payFreqValueVal * 7))
  } else if (payFreqPeriodVal === 3) {
    installmentsInitVal = Math.round(durationDaysVal / (payFreqValueVal * DAYS_PER_MONTH_AVG))
  }

  return installmentsInitVal
}

export const getInterestInitVal = productViewDetail => productViewDetail.InterestMax

export const getPurposeSumInitVal = reqAmountVal => reqAmountVal

export const getPurpose2SumInitVal = () => 0

export const getContributionInitVal = () => 0

// start: moved from selectors
export const getProductIDOptions = productViewList =>
  reduce(
    productViewList,
    (result, { ID, Title }) => [
      ...result,
      {
        value: ID,
        text: Title,
      },
    ],
    [],
  )

export const getDurationDaysDisabled = productViewDetail => {
  const { TermDaysCheck, TermDaysMin, TermDaysMax } = productViewDetail

  return TermDaysCheck === 1 && TermDaysMin === TermDaysMax
}

export const getDurationMonthsDisabled = productViewDetail => {
  const { TermDaysCheck, TermDaysMin, TermDaysMax } = productViewDetail

  return TermDaysCheck === 1 && TermDaysMin === TermDaysMax
}

export const getInstallmentsDisabled = productViewDetail => {
  const { TermDaysCheck, TermDaysMin, TermDaysMax } = productViewDetail

  return TermDaysCheck === 1 && TermDaysMin === TermDaysMax
}

export const getDurationDaysConfig = durationDaysDisabled => ({ disabled: durationDaysDisabled })

export const getDurationMonthsConfig = durationMonthsConfig => ({ disabled: durationMonthsConfig })

export const getInstallmentsConfig = installmentsConfig => ({ disabled: installmentsConfig })

export const getGracePeriodDisabled = productViewDetail => {
  const { GracePeriodCheck, GracePeriodMin, GracePeriodMax } = productViewDetail

  return GracePeriodCheck === 1 && GracePeriodMin === GracePeriodMax
}

export const getGracePeriodIntDisabled = productViewDetail => {
  const { GracePeriodIntCheck, GracePeriodIntMin, GracePeriodIntMax } = productViewDetail

  return GracePeriodIntCheck === 1 && GracePeriodIntMin === GracePeriodIntMax
}

export const getGracePeriodInterestAccrualDisabled = productViewDetail => {
  const { GracePeriod_InterestAccrual_Check, GracePeriod_InterestAccrual_Max } = productViewDetail
  const GracePeriod_InterestAccrualMin = productViewDetail.GracePeriod_InterestAccrual

  return GracePeriod_InterestAccrual_Check === 1 && GracePeriod_InterestAccrualMin === GracePeriod_InterestAccrual_Max
}

export const getPayFreqValueDisabled = productViewDetail => productViewDetail.PayFreqCheck === 1

export const getInterestDisabled = productViewDetail => {
  const { InterestCheck, InterestMin, InterestMax } = productViewDetail

  return InterestCheck === 1 && InterestMin === InterestMax
}

export const getGracePeriodConfig = gracePeriodDisabled => ({ disabled: gracePeriodDisabled })

export const getGracePeriodIntConfig = gracePeriodIntDisabled => ({ disabled: gracePeriodIntDisabled })

export const getGracePeriodInterestAccrualConfig = gracePeriodInterestAccrualDisabled => ({
  disabled: gracePeriodInterestAccrualDisabled,
})

export const getPayFreqValueConfig = payFreqValueDisabled => ({
  disabled: payFreqValueDisabled,
})

export const getInterestConfig = interestDisabled => ({
  disabled: interestDisabled,
})

export const industrySubIDOptionsExists = industrySubIDOptions => !isNull(industrySubIDOptions)

export const industrySubIDOptionsSourceExists = industrySubIDOptionsSource => !isNull(industrySubIDOptionsSource)

export const getPayFreqPeriodOptionsSource = productViewDetail => {
  const { PayFreqPeriod_LKP, PayFreqCheck, PayFreqPeriodID } = productViewDetail

  let payFreqPeriodOptionsSource = PayFreqPeriod_LKP

  if (PayFreqCheck === 1) {
    payFreqPeriodOptionsSource = [payFreqPeriodOptionsSource.find(({ ID }) => ID === PayFreqPeriodID)]
  }

  return payFreqPeriodOptionsSource
}

export const getPayFreqPeriodOptionsFromSource = payFreqPeriodOptionsSource =>
  payFreqPeriodOptionsSource.map(({ ID, Title }) => ({
    value: ID,
    text: Title,
  }))

export const getInterestTypeOptionsSource = productViewDetail => {
  const { Flat_LKP, FlatCheck, Flat } = productViewDetail

  let interestTypeOptionsSource = Flat_LKP
  if (FlatCheck === 1) {
    interestTypeOptionsSource = [interestTypeOptionsSource.find(({ ID }) => ID === Flat)]
  }

  return interestTypeOptionsSource
}

export const getInterestTypeOptionsFromSource = interestTypeOptionsSource =>
  interestTypeOptionsSource.map(({ ID, Title }) => ({
    value: ID,
    text: Title,
  }))

export const getUpfrontIDOptionsSource = productViewDetail => {
  const { UpfrontInterest_LKP, UpfrontInterestCheck, UpfrontInterest } = productViewDetail

  let upfrontIDOptionsSource = UpfrontInterest_LKP

  if (UpfrontInterestCheck === 1) {
    upfrontIDOptionsSource = [upfrontIDOptionsSource.find(({ ID }) => ID === UpfrontInterest)]
  }

  return upfrontIDOptionsSource
}

export const getUpfrontIDOptionsFromSource = upfrontIDOptionsSource =>
  upfrontIDOptionsSource.map(({ ID, Title }) => ({
    value: ID,
    text: Title,
  }))

export const getRevolvingIDOptionsSource = productViewDetail => {
  const { Revolving_LKP, RevolvingCheck, Revolving } = productViewDetail

  let revolvingIDOptionsSource = Revolving_LKP

  if (RevolvingCheck === 1) {
    revolvingIDOptionsSource = [revolvingIDOptionsSource.find(({ ID }) => ID === Revolving)]
  }

  return revolvingIDOptionsSource
}

export const getRevolvingIDOptionsFromSource = revolvingIDOptionsSource =>
  revolvingIDOptionsSource.map(({ ID, Title }) => ({
    value: ID,
    text: Title,
  }))

// general

export const getIndustryIDOptionsSource = (productViewDetail, generalLookupsSys) => {
  const { IndustryCheck } = productViewDetail

  return IndustryCheck === 2 ? generalLookupsSys.Industry : productViewDetail.Industry
}

export const getIndustryIDOptionsFromSource = industryIDOptionsSource =>
  industryIDOptionsSource.map(({ ID, Title }) => ({
    value: ID,
    text: Title,
  }))

export const getStartupOptions = generalLookupsSys => {
  const { APP_Startup } = generalLookupsSys

  return APP_Startup.map(({ ID, Title }) => ({ value: ID, text: Title }))
}

export const getRepaymentSourceIDOptions = generalLookupsSys => {
  const { APP_Repayment_Source } = generalLookupsSys

  return APP_Repayment_Source.map(({ ID, Title }) => ({ value: ID, text: Title }))
}

export const getReqCurrencyOptionsSource = (productViewDetail, generalLookupsSys) => {
  const { CCYCheck } = productViewDetail

  return CCYCheck === 1 ? productViewDetail.CCY : generalLookupsSys.CCY
}

export const getReqCurrencyOptionsFromSource = (reqCurrencyOptionsSource, productViewDetail) => {
  const { CCYCheck } = productViewDetail

  return CCYCheck === 1
    ? reqCurrencyOptionsSource.map(({ CCY }) => ({
        value: CCY,
        text: CCY,
      }))
    : reqCurrencyOptionsSource.map(({ ISO }) => ({
        value: ISO,
        text: ISO,
      }))
}

export const getScheduleTypeIDOptionsSource = (productViewDetail, generalLookupsSys) => {
  const { ScheduleTypeCheck } = productViewDetail

  return ScheduleTypeCheck === 1 ? productViewDetail.ScheduleType : generalLookupsSys.ScheduleType
}

export const getScheduleTypeIDOptionsFromSource = scheduleTypeIDOptionsSource =>
  scheduleTypeIDOptionsSource.map(({ ID, Title }) => ({
    value: ID,
    text: Title,
  }))

export const getPurposeIDOptionsSource = (productViewDetail, generalLookupsSys) => {
  const { PurposeCheck, Purpose } = productViewDetail
  const { APP_Purpose } = generalLookupsSys

  return PurposeCheck === 1 ? Purpose : APP_Purpose
}

export const getPurposeIDOptionsFromSource = purposeIDOptionsSource =>
  purposeIDOptionsSource.map(({ ID, Title }) => ({
    value: ID,
    text: Title,
  }))

export const getPurpose2IDOptionsSource = (productViewDetail, generalLookupsSys) => {
  const { PurposeCheck, Purpose } = productViewDetail
  const { APP_Purpose2 } = generalLookupsSys

  return PurposeCheck === 1 ? Purpose : APP_Purpose2
}

export const getPurpose2IDOptionsFromSource = purpose2IDOptionsSource =>
  purpose2IDOptionsSource.map(({ ID, Title }) => ({
    value: ID,
    text: Title,
  }))

export const getManagerIDOptionsSource = (authorizedUserName, activeLoanOfficers) => {
  const activeLoanOfficersArray = toArray(activeLoanOfficers)

  const authorizedUserNameData = find(activeLoanOfficersArray, ({ User_Name }) => User_Name === authorizedUserName)

  return !isUndefined(authorizedUserNameData) ? [authorizedUserNameData] : activeLoanOfficersArray
}

export const getManagerIDOptionsFromSource = managerIDOptionsSource =>
  managerIDOptionsSource.map(({ ID, FullName }) => ({
    value: ID,
    text: FullName,
  }))

// end: moved from selectors

export const getFormAndAdditionalInitialValuesAdd = paramProps => {
  const {
    ProductID,
    productIDOptions,
    isClientViewBasePresentAndValid,
    cardNumberInputVal,
    productViewDetail,
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
  } = paramProps

  const initialValues = {}
  const additionalValues = {}

  // first page start
  const initProductID = ProductID || getDropdownFirstValue(productIDOptions)
  initialValues.ProductID = initProductID

  initialValues.cardNumberInput =
    isClientViewBasePresentAndValid && !isUndefined(cardNumberInputVal) ? cardNumberInputVal : ''
  initialValues.BusinessType = ''

  initialValues.IndustryID = getDropdownFirstValue(industryIDOptions)

  additionalValues.industrySubIDOptionsSource = getIndustrySubIDOptionsSource(
    generalLookupsSys,
    initialValues.IndustryID,
  )
  initialValues.IndustrySubID = getDropdownFirstValue(
    getIndustrySubIDOptionsFromSource(additionalValues.industrySubIDOptionsSource),
  )

  initialValues.Startup = getDropdownFirstValue(startupOptions)
  initialValues.RepaymentSourceID = getDropdownFirstValue(repaymentSourceIDOptions)
  // first page end

  // second page start
  initialValues.OtherPurpose = ''
  initialValues.OtherPurpose2 = ''

  initialValues.ReqCurrency = getDropdownFirstValue(reqCurrencyOptions)

  // debugger

  additionalValues.reqCurrencyValData = getReqCurrencyValData(
    reqCurrencyOptionsSource,
    initialValues.ReqCurrency,
    productViewDetail,
  )

  initialValues.ReqAmount = getReqAmountInitVal(additionalValues.reqCurrencyValData, productViewDetail)
  initialValues.GracePeriod = getGracePeriodInitVal(productViewDetail)
  initialValues.GracePeriodInt = getGracePeriodIntInitVal(productViewDetail)
  initialValues.GracePeriod_InterestAccrual = getGracePeriodInterestAccrualInitVal(productViewDetail)
  initialValues.ScheduleTypeID = getDropdownFirstValue(scheduleTypeIDOptions)
  initialValues.PayFreqValue = getPayFreqValueInitVal(productViewDetail)
  initialValues.PayFreqPeriod = getDropdownFirstValue(payFreqPeriodOptions)
  initialValues.DurationDays = getDurationDaysInitVal(productViewDetail)

  additionalValues.loanEndDate = getLoanEndDateVal(openDay, initialValues.DurationDays)

  initialValues.DurationMonths = getDurationMonthsInitVal(productViewDetail)
  initialValues.Installments = getInstallmentsInitVal(
    initialValues.PayFreqPeriod,
    initialValues.DurationDays,
    initialValues.PayFreqValue,
  )
  initialValues.Interest = getInterestInitVal(productViewDetail)
  initialValues.InterestType = getDropdownFirstValue(interestTypeOptions)
  initialValues.UpfrontID = getDropdownFirstValue(upfrontIDOptions)
  initialValues.RevolvingID = getDropdownFirstValue(revolvingIDOptions)
  initialValues.PurposeID = getDropdownFirstValue(purposeIDOptions)
  initialValues.Purpose2ID = getDropdownFirstValue(purpose2IDOptions)
  initialValues.PurposeSum = getPurposeSumInitVal(initialValues.ReqAmount)
  initialValues.Purpose2Sum = getPurpose2SumInitVal()
  initialValues.Contribution = getContributionInitVal()
  initialValues.ManagerID = getDropdownFirstValue(managerIDOptions)
  // second page end

  // fourth page start
  initialValues.ProjectDescription = ''
  initialValues.CField1 = ''
  initialValues.CField2 = ''
  initialValues.CField3 = ''
  initialValues.CField4 = ''
  // fourth page end

  return { initialValues, additionalValues }
}

export const getFormAndAdditionalInitialValuesEdit = paramProps => {
  const {
    appViewBase,
    appViewBase: {
      ProductID,
      BusinessType,
      IndustryID,
      IndustrySubID,
      StartupID,
      RepaymentSourceID,
      OtherPurpose,
      OtherPurpose2,
      ReqCurrency,
      ReqAmount,
      GracePeriod,
      GracePeriodInt,
      GracePeriod_InterestAccrual,
      ScheduleTypeID,
      Interest,
      InterestTypeID,
      UpfrontID,
      RevolvingID,
      PurposeID,
      Purpose2ID,
      PurposeSum,
      Purpose2Sum,
      Contribution,
      ManagerID,
      ProjectDescription,
      CField1,
      CField2,
      CField3,
      CField4,
      TermDays,
      RegDate,
    },
    productViewDetail,
    productViewDetail: {
      IndustryCheck,
      Industry,
      DefaultIndustryCheck,
      DefaultIndustryID,
      CCYCheck,
      CCY,
      GracePeriodCheck,
      GracePeriodMin,
      GracePeriodMax,
      GracePeriodIntCheck,
      GracePeriodIntMin,
      GracePeriodIntMax,
      GracePeriod_InterestAccrual_Check,
      GracePeriod_InterestAccrual_Max,
      ScheduleTypeCheck,
      ScheduleType,
      PayFreqCheck,
      InterestCheck,
      InterestMin,
      InterestMax,
      FlatCheck,
      Flat,
      UpfrontInterestCheck,
      UpfrontInterest,
      RevolvingCheck,
      Revolving,
      PurposeCheck,
      Purpose,
      TermDaysCheck,
      TermDaysMin,
      TermDaysMax,
    },
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
  } = paramProps
  const GracePeriod_InterestAccrual_Min = productViewDetail.GracePeriod_InterestAccrual

  const PayFreqValueApp = appViewBase.PayFreqValue
  const PayFreqValueProd = productViewDetail.PayFreqValue

  const PayFreqPeriodIDApp = appViewBase.PayFreqPeriodID
  const PayFreqPeriodIDProd = productViewDetail.PayFreqPeriodID

  console.log(
    'getFormAndAdditionalInitialVals: ',
    { appViewBase: paramProps.appViewBase },
    { productViewDetail: paramProps.productViewDetail },
    paramProps,
  )

  const getReqAmountRestricted = () => {
    const foundCCY = find(CCY, nextCCY => {
      const nxtCCY = nextCCY.CCY

      return nxtCCY === ReqCurrency
    })

    return CCYCheck === 1 && (isUndefined(foundCCY) || foundCCY.AmountMin === foundCCY.AmountMax)
  }

  const getProductRestrictedValRange = (check, min, max, appVal) => {
    if (check === 1) {
      if (min !== max) {
        return appVal
      }

      return max
    }

    return appVal
  }

  const getProductRestrictedVal = (check, prodVal, appVal) => {
    if (check === 1) {
      return prodVal
    }

    return appVal
  }

  const getProdRestrValDropdown = (check, optsSource, opts, keyName, appVal) => {
    if (check === 1) {
      if (
        findIndex(optsSource, nextOpt => {
          const nxtOptVal = nextOpt[keyName]

          return nxtOptVal === appVal
        }) !== -1
      ) {
        return appVal
      }

      return getDropdownFirstValue(opts)
    }

    return appVal
  }

  const initialValues = {}
  const additionalValues = {}

  // first page start
  const initProductID = ProductID
  initialValues.ProductID = initProductID

  initialValues.BusinessType = toString(BusinessType)

  initialValues.IndustryID = getProdRestrValDropdown(IndustryCheck, Industry, industryIDOptions, 'ID', IndustryID)

  additionalValues.industrySubIDOptionsSource = getIndustrySubIDOptionsSource(
    generalLookupsSys,
    initialValues.IndustryID,
  )

  const getIndustrySubIDInitVal = () => {
    if (DefaultIndustryCheck === 1) {
      if (DefaultIndustryID === IndustryID) {
        return IndustrySubID
      }
      return getDropdownFirstValue(getIndustrySubIDOptionsFromSource(additionalValues.industrySubIDOptionsSource))
    }

    return IndustrySubID
  }
  initialValues.IndustrySubID = getIndustrySubIDInitVal()

  initialValues.Startup = StartupID
  initialValues.RepaymentSourceID = RepaymentSourceID
  // first page end

  // second page start

  initialValues.OtherPurpose = toString(OtherPurpose)
  initialValues.OtherPurpose2 = toString(OtherPurpose2)

  initialValues.ReqCurrency = getProdRestrValDropdown(CCYCheck, CCY, reqCurrencyOptions, 'CCY', ReqCurrency)

  additionalValues.reqCurrencyValData = getReqCurrencyValData(
    reqCurrencyOptionsSource,
    initialValues.ReqCurrency,
    productViewDetail,
  )

  const getReqAmountInitValEdit = () => {
    if (CCYCheck === 1) {
      const foundCCY = find(CCY, nextCCY => {
        const nxtCCY = nextCCY.CCY

        return nxtCCY === ReqCurrency
      })

      if (!isUndefined(foundCCY)) {
        if (foundCCY.AmountMin === foundCCY.AmountMax) {
          return foundCCY.AmountMax
        }

        return ReqAmount
      }

      return reqCurrencyOptionsSource[0].AmountMax
    }

    return ReqAmount
  }

  initialValues.ReqAmount = getReqAmountInitValEdit()
  initialValues.GracePeriod = getProductRestrictedValRange(
    GracePeriodCheck,
    GracePeriodMin,
    GracePeriodMax,
    GracePeriod,
  )
  initialValues.GracePeriodInt = getProductRestrictedValRange(
    GracePeriodIntCheck,
    GracePeriodIntMin,
    GracePeriodIntMax,
    GracePeriodInt,
  )
  initialValues.GracePeriod_InterestAccrual = getProductRestrictedValRange(
    GracePeriod_InterestAccrual_Check,
    GracePeriod_InterestAccrual_Min,
    GracePeriod_InterestAccrual_Max,
    GracePeriod_InterestAccrual,
  )
  initialValues.ScheduleTypeID = getProdRestrValDropdown(
    ScheduleTypeCheck,
    ScheduleType,
    scheduleTypeIDOptions,
    'ID',
    ScheduleTypeID,
  )
  initialValues.PayFreqValue = getProductRestrictedVal(PayFreqCheck, PayFreqValueProd, PayFreqValueApp)
  initialValues.PayFreqPeriod = getProductRestrictedVal(PayFreqCheck, PayFreqPeriodIDProd, PayFreqPeriodIDApp)

  initialValues.DurationDays = getProductRestrictedValRange(TermDaysCheck, TermDaysMin, TermDaysMax, TermDays) // this

  additionalValues.loanEndDate = getLoanEndDateVal(RegDate, initialValues.DurationDays)

  initialValues.DurationMonths = getDurationMonthsFromDays(initialValues.DurationDays)

  initialValues.Installments = getInstallmentsInitVal(
    initialValues.PayFreqPeriod,
    initialValues.DurationDays,
    initialValues.PayFreqValue,
  )

  initialValues.Interest = getProductRestrictedValRange(InterestCheck, InterestMin, InterestMax, Interest)

  initialValues.InterestType = getProductRestrictedVal(FlatCheck, Flat, InterestTypeID)

  initialValues.UpfrontID = getProductRestrictedVal(UpfrontInterestCheck, UpfrontInterest, UpfrontID)

  initialValues.RevolvingID = getProductRestrictedVal(RevolvingCheck, Revolving, RevolvingID)

  initialValues.PurposeID = getProdRestrValDropdown(PurposeCheck, Purpose, purposeIDOptions, 'ID', PurposeID)
  initialValues.Purpose2ID = getProdRestrValDropdown(PurposeCheck, Purpose, purpose2IDOptions, 'ID', Purpose2ID)

  initialValues.PurposeSum = getReqAmountRestricted() ? initialValues.ReqAmount : PurposeSum
  initialValues.Purpose2Sum = getReqAmountRestricted() ? 0 : Purpose2Sum

  initialValues.Contribution = Contribution
  initialValues.ManagerID = ManagerID
  // second page end

  // fourth page start
  initialValues.ProjectDescription = ProjectDescription
  initialValues.CField1 = CField1
  initialValues.CField2 = CField2
  initialValues.CField3 = CField3
  initialValues.CField4 = CField4
  // fourth page end

  console.log('app edit, calculated initial vals: ', { initialValues, additionalValues })

  return { initialValues, additionalValues }
}

export const getFormAndAdditionalInitialValues = paramProps => {
  const isAppIdentity = isApplicationIdentity(get(paramProps, 'params.applicationIdentity'))

  if (!isAppIdentity) {
    return getFormAndAdditionalInitialValuesAdd(paramProps)
  }

  return getFormAndAdditionalInitialValuesEdit(paramProps)
}
