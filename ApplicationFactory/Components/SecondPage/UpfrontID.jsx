import React from 'react'
import { connect } from 'react-redux'
import DropdownField from 'shared/FormFields/DropdownField'
import { isDropdownDisabled } from '../helpers'

const UpfrontID = ({ options, disabled }) => {
  return <DropdownField name="UpfrontID" options={options} disabled={disabled} />
}

export default connect((state, { options }) => ({ disabled: isDropdownDisabled(options) }))(UpfrontID)
