import React, { Component } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import FormField from 'shared/newFormElements'
import { FORM_NAME } from '../../constants'
import { getPurpose2SumInitVal, getPurposeSumInitVal } from '../helpers'

class ReqAmount extends Component {
  onChange = (e, value) => {
    const { changeField } = this.props

    changeField('PurposeSum', getPurposeSumInitVal(value))

    changeField('Purpose2Sum', getPurpose2SumInitVal())
  }

  render() {
    const { config: { disabled } } = this.props

    return <FormField name="ReqAmount" type="float" onChange={this.onChange} maxLength="15" disabled={disabled} />
  }
}

export default connect(undefined, {
  changeField: (...args) => change(FORM_NAME, ...args),
})(ReqAmount)
