import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { ComponentContainer } from 'shared/StyledComponents'
import FormField from 'shared/newFormElements'
import { formValueSelector } from '../../../selectors'

const component = ({ input, disabled }) => (
  <ComponentContainer input>
    <FormField name="amount.min" disabled={disabled} onChange={(_, value) => input.onChange(value)} type="number" />
  </ComponentContainer>
)

@connect(state => ({
  disabled: formValueSelector(state, 'amount.disabled'),
}))
class AmountMin extends React.Component {
  render() {
    return <Field name="amount.min" component={component} type="number" disabled={this.props.disabled} />
  }
}

export default AmountMin
