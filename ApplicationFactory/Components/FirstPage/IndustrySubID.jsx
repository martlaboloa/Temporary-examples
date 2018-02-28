import React from 'react'
import DropdownField from 'shared/FormFields/DropdownField'

const IndustrySubID = ({ options }) => {
  return <DropdownField name="IndustrySubID" options={options} openOnFocus={false} />
}

export default IndustrySubID
