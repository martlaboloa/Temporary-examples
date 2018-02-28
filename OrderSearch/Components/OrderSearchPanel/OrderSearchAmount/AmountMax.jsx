import React from 'react'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { ComponentContainer } from 'shared/StyledComponents'
import FormField from 'shared/newFormElements'
import { formValueSelector } from '../../../selectors'

const changeToAmountMin = props => {
  const { input: { onChange }, amountMin } = props

  onChange(amountMin)
}

class component extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.shallowCompareProps('amountMin', nextProps)) {
      changeToAmountMin(nextProps)
    }
  }

  shallowCompareProps(propName1, nextProps) {
    return this.props[propName1] === nextProps[propName1]
  }

  render() {
    const { input, disabled } = this.props
    return (
      <ComponentContainer input>
        <FormField name="amount.max" disabled={disabled} onChange={(_, value) => input.onChange(value)} type="number" />
      </ComponentContainer>
    )
  }
}

@connect(state => ({
  disabled: formValueSelector(state, 'amount.disabled'),
  amountMin: formValueSelector(state, 'amount.min'),
}))
class AmountMax extends React.Component {
  render() {
    const { disabled, amountMin } = this.props

    return <Field name="amount.max" component={component} type="number" disabled={disabled} amountMin={amountMin} />
  }
}

export default AmountMax
