import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import { RF_NAME } from '../../../constants'
import { formValueSelector } from '../../../selectors'

@connect(
  state => ({
    disabled: formValueSelector(state, 'debit.disabled'),
  }),
  dispatch => bindActionCreators({ changeField: change }, dispatch),
)
class BalCodeIDSearch extends React.Component {
  render() {
    const { disabled, changeField } = this.props

    return (
      <Button
        size="tiny"
        type="button"
        disabled={disabled}
        onClick={() => {
          changeField(RF_NAME, 'debit.balCodeID', 666)
        }}
        icon
      >
        <Icon name="ellipsis horizontal" />
      </Button>
    )
  }
}

export default BalCodeIDSearch
