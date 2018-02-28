import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import { RF_NAME } from '../../../constants'
import { formValueSelector } from '../../../selectors'

@connect(
  state => ({
    disabled: formValueSelector(state, 'credit.disabled'),
  }),
  { changeField: change },
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
          changeField(RF_NAME, 'credit.balCodeID', 666)
        }}
        icon
      >
        <Icon name="ellipsis horizontal" />
      </Button>
    )
  }
}

export default BalCodeIDSearch
