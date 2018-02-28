import React from 'react'
import { connect } from 'react-redux'
import DropdownField from 'shared/FormFields/DropdownField'
import { isDropdownDisabled } from '../helpers'

const ScheduleTypeID = ({ options, disabled }) => {
  return <DropdownField name="ScheduleTypeID" options={options} disabled={disabled} />
}

export default connect((state, { options }) => ({ disabled: isDropdownDisabled(options) }))(ScheduleTypeID)
