import React, { Component } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import FormField from 'shared/newFormElements'
import { getInstallmentsInitVal, getDurationDays, getDurationMonthsFromDays, getLoanEndDateVal } from '../helpers'
import { FORM_NAME } from '../../constants'
import { formValueSelector } from '../../helpers'
import { loanEndDateSet as loanEndDateSetUndisp } from '../../store'

class PayFreqValue extends Component {
  onChange = (event, newValue) => {
    const { PayFreqPeriod, DurationDays, changeField, openDay, loanEndDateSet } = this.props

    const updatedInstallments = getInstallmentsInitVal(PayFreqPeriod, DurationDays, newValue)

    changeField('Installments', updatedInstallments)

    const updatedDurationDays = getDurationDays(updatedInstallments, PayFreqPeriod, newValue)

    changeField('DurationDays', updatedDurationDays)

    changeField('DurationMonths', getDurationMonthsFromDays(updatedDurationDays))

    loanEndDateSet(getLoanEndDateVal(openDay, updatedDurationDays))
  }

  render() {
    const { config: { disabled } } = this.props

    return <FormField name="PayFreqValue" type="number" disabled={disabled} onChange={this.onChange} />
  }
}

export default connect(state => formValueSelector(state, 'PayFreqPeriod', 'DurationDays'), {
  changeField: (...args) => change(FORM_NAME, ...args),
  loanEndDateSet: loanEndDateSetUndisp,
})(PayFreqValue)
