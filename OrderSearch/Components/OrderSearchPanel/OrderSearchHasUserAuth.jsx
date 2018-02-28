import React from 'react'
import flowRight from 'lodash/flowRight'
import { connect } from 'react-redux'
import { withLookups, lookupTypes } from 'shared'
import DisableableDropdownField from 'shared/FormFields/DisableableDropdownField'
import transformProp from 'shared/containers/transformProp'
import { getHasUserAuthOptions } from '../../selectors'
import { transformOptions, translate } from '../../helpers'

@flowRight(
  withLookups({
    type: lookupTypes.users,
    query: ['* as entryAuthorIDLookup'],
  }),
  transformProp('entryAuthorIDLookup', transformOptions),
  connect((state, ownProps) => ({
    options: getHasUserAuthOptions(state, ownProps),
  })),
)
class OrderSearchHasUserAuth extends React.Component {
  render() {
    const { options } = this.props

    if (!options) {
      return null
    }

    return (
      <DisableableDropdownField
        name="hasUserAuth.value"
        label={translate('chk_all_auth')}
        options={options}
        disabilityCheckboxName="hasUserAuth.disabled"
        dropdownsShareOfWidth={9}
      />
    )
  }
}

export default OrderSearchHasUserAuth
