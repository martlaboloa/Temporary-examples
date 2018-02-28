import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { ComponentContainer } from 'shared/StyledComponents'
import FormField from 'shared/newFormElements'
import { formValueSelector } from '../../../selectors'

const component = ({ input, disabled }) => (
  <ComponentContainer input>
    <FormField name="credit.accNo" disabled={disabled} onChange={(_, value) => input.onChange(value)} type="number" />
  </ComponentContainer>
)

@connect(state => ({
  disabled: formValueSelector(state, 'credit.disabled'),
}))
class AccNo extends React.Component {
  render() {
    return <Field name="credit.accNo" component={component} type="text" disabled={this.props.disabled} />
  }
}

export default AccNo
