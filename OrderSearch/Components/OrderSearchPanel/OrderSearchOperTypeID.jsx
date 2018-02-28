import React from 'react'
import DisableableDropdownField from 'shared/FormFields/DisableableDropdownField'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import { withLookups, lookupTypes } from 'shared'
import { translate } from '../../helpers'
import { getOperTypeIDOptions } from '../../selectors'

@flowRight(
  withLookups({
    type: lookupTypes.acc,
    query: ['EntryOperType as operTypeIDLookup'],
  }),
  connect((state, ownProps) => ({
    options: getOperTypeIDOptions(state, ownProps),
  })),
)
class OrderSearchOperTypeID extends React.Component {
  render() {
    const { options } = this.props

    if (!options) {
      return null
    }

    return (
      <DisableableDropdownField
        name="operTypeID.value"
        label={translate('chk_opertype')}
        options={options}
        disabilityCheckboxName="operTypeID.disabled"
        dropdownsShareOfWidth={9}
      />
    )
  }
}

export default OrderSearchOperTypeID
