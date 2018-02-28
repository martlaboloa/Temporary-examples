import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formValues } from 'redux-form'
import flowRight from 'lodash/flowRight'
import withCondition from 'shared/containers/withCondition'
import FormField from 'shared/newFormElements'
import addProp from '../../../../../shared/containers/addProp'
import { fetchClientByCardNumber as fetchClientByCardNumberUndisp } from '../../../store'
import { isApplicationIdentity } from '../../helpers'

class CardNumberInput extends Component {
  onKeyPress = e => {
    const { cardNumberInput, fetchClientByCardNumber } = this.props

    let ev = e
    if (!ev) ev = window.event

    if (ev.which === 13) {
      fetchClientByCardNumber(cardNumberInput)
    }
  }

  render() {
    const { cardNumberInput, autoFocus } = this.props

    return (
      <div className="u-flexCenter">
        <FormField
          style={{ flex: 1, marginRight: 10 }}
          name="cardNumberInput"
          type="text"
          onKeyPress={this.onKeyPress}
          autoFocus={autoFocus}
        />

        {`${cardNumberInput.length}`}
      </div>
    )
  }
}

export default flowRight(
  withCondition(({ applicationIdentity }) => !isApplicationIdentity(applicationIdentity), () => null),
  addProp('autoFocus', ({ applicationIdentity }) => !isApplicationIdentity(applicationIdentity)),
  formValues('cardNumberInput'),
  connect(undefined, (dispatch, { productViewDetail }) => ({
    fetchClientByCardNumber: cardNumberInput =>
      fetchClientByCardNumberUndisp(dispatch, cardNumberInput, productViewDetail),
  })),
)(CardNumberInput)
