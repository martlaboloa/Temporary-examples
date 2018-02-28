import React from 'react'
import { LKIconButton } from 'shared/LKIconButton'
import { connect } from 'react-redux'
import { isSubmitting } from 'redux-form'
import { translate } from '../../helpers'
import { RF_NAME } from '../../constants'

@connect(state => ({
  submitting: isSubmitting(RF_NAME)(state),
}))
class OrderSearchSubmitButton extends React.Component {
  render() {
    const { submitting } = this.props

    return (
      <LKIconButton alias="binoculars" type="submit" icon size="tiny" fluid loading={submitting}>
        {translate('cmd_find')}
      </LKIconButton>
    )
  }
}

export default OrderSearchSubmitButton
