import React from 'react'
import DisableableDropdownField from 'shared/FormFields/DisableableDropdownField'
import flowRight from 'lodash/flowRight'
import { connect } from 'react-redux'
import { withLookups, lookupTypes } from 'shared'
import { translate } from '../../helpers'
import {
  formValueSelector,
  getOperCodeIDOptions,
  isOperCodeIDOptionsEmpty as isOperCodeIDOptionsEmptySel,
} from '../../selectors'

@flowRight(
  withLookups({
    type: lookupTypes.acc,
    query: ['OpCode as operCodeIDLookup'],
  }),
  connect((state, ownProps) => ({
    operTypeIDDisabled: formValueSelector(state, 'operTypeID.disabled'),
    isOperCodeIDOptionsEmpty: isOperCodeIDOptionsEmptySel(state, ownProps),
    options: getOperCodeIDOptions(state, ownProps),
  })),
)
class OrderSearchOperCodeID extends React.Component {
  render() {
    const { options, operTypeIDDisabled, isOperCodeIDOptionsEmpty } = this.props

    if (!options) {
      return null
    }

    return (
      <DisableableDropdownField
        name="operCodeID.value"
        label={translate('chk_opcode')}
        options={options}
        disabilityCheckboxName="operCodeID.disabled"
        dropdownsShareOfWidth={9}
        disabled={operTypeIDDisabled || isOperCodeIDOptionsEmpty}
      />
    )
  }
}

export default OrderSearchOperCodeID
