import React from 'react'
import isNil from 'lodash/isNil'
import { bindActionCreators } from 'redux'
import RadioGroupField from 'shared/FormFields/RadioGroupField'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import { withConfig, configTypes } from 'shared'
import { obtainChangeField } from '../../actions'
import { translate } from '../../helpers'

const markCategories = (value, changeField, { fieldsDisability }) => {
  if (value === '0' || value === '1') {
    if (!fieldsDisability.categ.individuals) changeField('categ.individuals', 1)
    if (!fieldsDisability.categ.solidarityGroups) changeField('categ.solidarityGroups', 1)
    if (!fieldsDisability.categ.companies) changeField('categ.companies', 1)
    if (!fieldsDisability.safety.insured) changeField('safety.insured', 0)
    if (!fieldsDisability.safety.watched) changeField('safety.watched', 0)
    if (!fieldsDisability.safety.blacklisted) changeField('safety.blacklisted', 0)
  }
}

@flowRight(
  connect(undefined, (dispatch, { instanceName }) =>
    bindActionCreators(
      {
        changeField: obtainChangeField(instanceName),
      },
      dispatch,
    ),
  ),
  withConfig({
    type: configTypes.user,
    query: 'Select_Recent as selectRecent',
  }),
)
class ClientSearchDateFilter extends React.Component {
  render() {
    const { selectRecent, changeField, searchPanelConfig } = this.props

    if (isNil(selectRecent)) {
      return null
    }

    const options = [translate('opt_showall'), `${translate('opt_recent')} - ${selectRecent} ${translate('lbl_days')}`]

    return (
      <RadioGroupField
        name="dateFilter"
        options={options}
        onChange={(_, value) => markCategories(value, changeField, searchPanelConfig)}
      />
    )
  }
}

export default ClientSearchDateFilter
