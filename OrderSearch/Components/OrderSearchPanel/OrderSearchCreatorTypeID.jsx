import React from 'react'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import DisableableDropdownField from 'shared/FormFields/DisableableDropdownField'
import { withLookups, lookupTypes } from 'shared'
import { translate } from '../../helpers'
import { getCreatorTypeIDOptions } from '../../selectors'

@flowRight(
  withLookups({
    type: lookupTypes.acc,
    query: ['EntryCreatorType as creatorTypeIDLookup'],
  }),
  connect((state, ownProps) => ({
    options: getCreatorTypeIDOptions(state, ownProps),
  })),
)
class OrderSearchCreatorTypeID extends React.Component {
  render() {
    const { options } = this.props

    if (!options) {
      return null
    }

    return (
      <DisableableDropdownField
        name="creatorTypeID.value"
        label={translate('chk_creatortype')}
        options={options}
        disabilityCheckboxName="creatorTypeID.disabled"
        dropdownsShareOfWidth={9}
      />
    )
  }
}

export default OrderSearchCreatorTypeID
