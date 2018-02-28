import React from 'react'
import { connect } from 'react-redux'
import DropdownField from 'shared/FormFields/DropdownField'
import { isDropdownDisabled } from '../helpers'

const PurposeID = ({ options, disabled }) => {
  return <DropdownField name="PurposeID" options={options} disabled={disabled} />
}

export default connect((state, { options }) => ({ disabled: isDropdownDisabled(options) }))(PurposeID)
