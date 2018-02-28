import React, { Component } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import FormField from 'shared/newFormElements'
import { getDurationDaysFromMonths, getInstallmentsInitVal, getLoanEndDateVal } from '../helpers'
import { FORM_NAME } from '../../constants'
import { formValueSelector } from '../../helpers'
import { loanEndDateSet as loanEndDateSetUndisp } from '../../store'

class DurationMonths extends Component {
  onChange = (event, newValue) => {
    const { PayFreqPeriod, PayFreqValue, changeField, openDay, loanEndDateSet } = this.props

    const updatedDurationDays = getDurationDaysFromMonths(newValue)

    changeField('DurationDays', updatedDurationDays)

    changeField('Installments', getInstallmentsInitVal(PayFreqPeriod, updatedDurationDays, PayFreqValue))

    loanEndDateSet(getLoanEndDateVal(openDay, updatedDurationDays))
  }

  render() {
    const { config: { disabled } } = this.props

    return <FormField name="DurationMonths" type="number" onChange={this.onChange} disabled={disabled} />
  }
}

export default connect(state => formValueSelector(state, 'PayFreqPeriod', 'PayFreqValue'), {
  changeField: (...args) => change(FORM_NAME, ...args),
  loanEndDateSet: loanEndDateSetUndisp,
})(DurationMonths)
