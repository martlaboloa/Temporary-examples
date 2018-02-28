import React from 'react'
import { connect } from 'react-redux'
import DropdownField from 'shared/FormFields/DropdownField'
import { isDropdownDisabled } from '../helpers'

const Purpose2ID = ({ options, disabled }) => {
  return <DropdownField name="Purpose2ID" options={options} disabled={disabled} />
}

export default connect((state, { options }) => ({ disabled: isDropdownDisabled(options) }))(Purpose2ID)
