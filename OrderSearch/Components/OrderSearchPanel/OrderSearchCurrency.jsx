import React from 'react'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import { withLookups, lookupTypes } from 'shared'
import DisableableDropdownField from 'shared/FormFields/DisableableDropdownField'
import { translate } from '../../helpers'
import { getCurrencyOptions } from '../../selectors'

@flowRight(
  withLookups({
    type: lookupTypes.search,
    query: ['CCYS as currencyLookup'],
  }),
  connect((state, ownProps) => ({
    options: getCurrencyOptions(state, ownProps),
  })),
)
class OrderSearchCurrency extends React.Component {
  render() {
    const { options } = this.props

    if (!options) {
      return null
    }

    return (
      <DisableableDropdownField
        name="currency.value"
        label={translate('chk_ccy')}
        options={options}
        disabilityCheckboxName="currency.disabled"
        dropdownsShareOfWidth={9}
      />
    )
  }
}

export default OrderSearchCurrency
