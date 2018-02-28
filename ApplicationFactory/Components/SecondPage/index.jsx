import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormInitialValues, getFormValues } from 'redux-form'
import isNil from 'lodash/isNil'
import withLivedata from 'shared/containers/withLivedata'
import { colors } from 'shared'
import { FormLayout } from 'shared/newFormElements'
import transformPropBasedOnProps from 'shared/containers/transformPropBasedOnProps'
import addProp from 'shared/containers/addProp'
import { translate, translateLKMessage } from '../../helpers'
import { FORM_NAME } from '../../constants'
import OpenDate from './OpenDate'
import ReqAmount from './ReqAmount'
import ReqCurrency from './ReqCurrency'
import DurationMonths from './DurationMonths'
import DurationDays from './DurationDays'
import Installments from './Installments'
import GracePeriod from './GracePeriod'
import GracePeriodInt from './GracePeriodInt'
import GracePeriodInterestAccrual from './GracePeriodInterestAccrual'
import ScheduleTypeID from './ScheduleTypeID'
import PayFreqValue from './PayFreqValue'
import PayFreqPeriod from './PayFreqPeriod'
import Interest from './Interest'
import InterestType from './InterestType'
import UpfrontID from './UpfrontID'
import RevolvingID from './RevolvingID'
import PurposeID from './PurposeID'
import PurposeSum from './PurposeSum'
import OtherPurpose from './OtherPurpose'
import Purpose2ID from './Purpose2ID'
import Purpose2Sum from './Purpose2Sum'
import OtherPurpose2 from './OtherPurpose2'
import Contribution from './Contribution'
import ManagerID from './ManagerID'

class SecondPage extends Component {
  render() {
    const {
      openDay,
      openDayStr,
      loanEndDate,
      reqAmountConfig,
      reqCurrencyOptions,
      durationMonthsConfig,
      durationDaysConfig,
      installmentsConfig,
      gracePeriodConfig,
      gracePeriodIntConfig,
      gracePeriodInterestAccrualConfig,
      scheduleTypeIDOptions,
      payFreqValueConfig,
      payFreqPeriodOptions,
      interestConfig,
      interestTypeOptions,
      upfrontIDOptions,
      revolvingIDOptions,
      purposeIDOptions,
      purpose2IDOptions,
      managerIDOptions,
      generalLookupsSys,
      productViewDetail,
      appViewBase,
      params,
    } = this.props

    return (
      <div className="u-paddingLeft-5 u-paddingRight-5">
        <FormLayout label={translate('lbl_date')}>
          <OpenDate openDayStr={openDayStr} appViewBase={appViewBase} appPrams={params} loanEndDate={loanEndDate} />
        </FormLayout>

        <hr size="1" color="lightgray" style={{ margin: 5 }} />

        <FormLayout fieldProportions="2:3" label={translate('lbl_reqamount')}>
          <ReqAmount config={reqAmountConfig} />

          <ReqCurrency
            options={reqCurrencyOptions}
            generalLookupsSys={generalLookupsSys}
            productViewDetail={productViewDetail}
          />
        </FormLayout>

        <FormLayout label={translate('lbl_term')}>
          <FormLayout
            labelStyles={{ marginLeft: 5 }}
            labelFieldProportions="10:6"
            labelPosition="right"
            label={translate('lbl_term_months')}
          >
            <DurationMonths openDay={openDay} config={durationMonthsConfig} />
          </FormLayout>

          <FormLayout
            labelStyles={{ marginLeft: 5 }}
            labelFieldProportions="10:6"
            labelPosition="right"
            label={translate('lbl_term_days')}
          >
            <DurationDays openDay={openDay} config={durationDaysConfig} />
          </FormLayout>

          <FormLayout
            labelFieldProportions="10:6"
            labelPosition="right"
            labelStyles={{ color: colors.green, marginLeft: 5 }}
            label={translate('lbl_term_installments')}
          >
            <Installments openDay={openDay} config={installmentsConfig} />
          </FormLayout>
        </FormLayout>

        <FormLayout fieldProportions="2:2:12" label={translate('lbl_grace_period')}>
          <GracePeriod config={gracePeriodConfig} />

          <GracePeriodInt config={gracePeriodIntConfig} />

          <FormLayout labelFieldProportions="12:4" label={translate('lbl_graceperiod_interestaccrual')}>
            <GracePeriodInterestAccrual config={gracePeriodInterestAccrualConfig} />
          </FormLayout>
        </FormLayout>

        <FormLayout fieldProportions="6:2:8" label={translate('lbl_scheduletype_t')}>
          <ScheduleTypeID options={scheduleTypeIDOptions} />
          <PayFreqValue config={payFreqValueConfig} openDay={openDay} />
          <PayFreqPeriod options={payFreqPeriodOptions} openDay={openDay} />
        </FormLayout>

        <hr size="1" color="lightgray" style={{ margin: 5 }} />

        <FormLayout fieldProportions="2:6:8" label={translate('lbl_annual_interest')}>
          <Interest config={interestConfig} />
          <InterestType options={interestTypeOptions} />
          <UpfrontID options={upfrontIDOptions} />
        </FormLayout>

        <hr size="1" color="lightgray" style={{ margin: 5 }} />

        <FormLayout label={translate('lbl_revolving')}>
          <FormLayout noLabel labelFieldProportions="0:12">
            <RevolvingID options={revolvingIDOptions} />
          </FormLayout>
        </FormLayout>

        <hr size="1" color="lightgray" style={{ margin: 5 }} />

        <FormLayout fieldProportions="6:2:4" label={translate('lbl_purpose')}>
          <PurposeID options={purposeIDOptions} />
          <PurposeSum />
          <OtherPurpose />
        </FormLayout>

        <FormLayout fieldProportions="6:2:4" label={translate('lbl_purpose2')}>
          <Purpose2ID options={purpose2IDOptions} />
          <Purpose2Sum />
          <OtherPurpose2 />
        </FormLayout>

        <FormLayout labelFieldProportions="4:2" label={translate('lbl_contribution')}>
          <Contribution />
        </FormLayout>

        <hr size="1" color="lightgray" style={{ margin: 5 }} />

        <FormLayout label={translate('lbl_officer')}>
          <FormLayout noLabel labelFieldProportions="0:6">
            <ManagerID options={managerIDOptions} />
          </FormLayout>
        </FormLayout>
      </div>
    )
  }
}

export default SecondPage
