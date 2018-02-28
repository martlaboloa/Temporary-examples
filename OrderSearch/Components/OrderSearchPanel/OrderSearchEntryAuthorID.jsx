import React from 'react'
import DisableableDropdownField from 'shared/FormFields/DisableableDropdownField'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import { withLookups, lookupTypes } from 'shared'
import transformProp from 'shared/containers/transformProp'
import { translate, transformOptions } from '../../helpers'
import { getEntryAuthorIDOptions } from '../../selectors'

@flowRight(
  withLookups({
    type: lookupTypes.users,
    query: ['* as entryAuthorIDLookup'],
  }),
  transformProp('entryAuthorIDLookup', transformOptions),
  connect((state, ownProps) => ({
    options: getEntryAuthorIDOptions(state, ownProps),
  })),
)
class OrderSearchEntryAuthorID extends React.Component {
  render() {
    const { options } = this.props

    if (!options) {
      return null
    }

    return (
      <DisableableDropdownField
        name="entryAuthorID.value"
        label={translate('chk_all_author')}
        options={options}
        disabilityCheckboxName="entryAuthorID.disabled"
        dropdownsShareOfWidth={9}
      />
    )
  }
}

export default OrderSearchEntryAuthorID
