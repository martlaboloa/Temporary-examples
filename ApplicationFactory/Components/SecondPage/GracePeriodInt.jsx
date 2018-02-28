import React from 'react'
import FormField from 'shared/newFormElements'

const GracePeriodInt = ({ config: { disabled } }) => {
  return <FormField name="GracePeriodInt" type="number" disabled={disabled} />
}

export default GracePeriodInt
