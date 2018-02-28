import React from 'react'
import FormField from 'shared/newFormElements'

const GracePeriod = ({ config: { disabled } }) => {
  return <FormField name="GracePeriod" type="number" disabled={disabled} />
}

export default GracePeriod
