import React, { Component } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import DropdownField from 'shared/FormFields/DropdownField'
import {
  getInstallmentsInitVal,
  isDropdownDisabled,
  getDurationDays,
  getDurationMonthsFromDays,
  getLoanEndDateVal,
} from '../helpers'
import { FORM_NAME } from '../../constants'
import { formValueSelector } from '../../helpers'
import { loanEndDateSet as loanEndDateSetUndisp } from '../../store'

class PayFreqPeriod extends Component {
  onChange = (event, newValue) => {
    const { DurationDays, PayFreqValue, changeField, openDay, loanEndDateSet } = this.props

    const updatedInstallments = getInstallmentsInitVal(newValue, DurationDays, PayFreqValue)

    changeField('Installments', updatedInstallments)

    const updatedDurationDays = getDurationDays(updatedInstallments, newValue, PayFreqValue)

    changeField('DurationDays', updatedDurationDays)

    changeField('DurationMonths', getDurationMonthsFromDays(updatedDurationDays))

    loanEndDateSet(getLoanEndDateVal(openDay, updatedDurationDays))
  }

  render() {
    const { options, disabled } = this.props

    return <DropdownField name="PayFreqPeriod" options={options} onChange={this.onChange} disabled={disabled} />
  }
}

export default connect(
  (state, { options }) => ({
    disabled: isDropdownDisabled(options),
    ...formValueSelector(state, 'DurationDays', 'PayFreqValue'),
  }),
  {
    changeField: (...args) => change(FORM_NAME, ...args),
    loanEndDateSet: loanEndDateSetUndisp,
  },
)(PayFreqPeriod)
