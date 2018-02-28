import React, { Component } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import FormField from 'shared/newFormElements'
import { getDurationMonthsFromDays, getInstallmentsInitVal, getLoanEndDateVal } from '../helpers'
import { FORM_NAME } from '../../constants'
import { formValueSelector } from '../../helpers'
import { loanEndDateSet as loanEndDateSetUndisp } from '../../store'

class DurationDays extends Component {
  onChange = (event, newValue) => {
    const { PayFreqPeriod, PayFreqValue, changeField, openDay, loanEndDateSet } = this.props

    changeField('DurationMonths', getDurationMonthsFromDays(newValue))

    changeField('Installments', getInstallmentsInitVal(PayFreqPeriod, newValue, PayFreqValue))

    loanEndDateSet(getLoanEndDateVal(openDay, newValue))
  }

  render() {
    const { config: { disabled } } = this.props

    return <FormField name="DurationDays" type="number" onChange={this.onChange} disabled={disabled} />
  }
}

export default connect(state => formValueSelector(state, 'PayFreqPeriod', 'PayFreqValue'), {
  changeField: (...args) => change(FORM_NAME, ...args),
  loanEndDateSet: loanEndDateSetUndisp,
})(DurationDays)
