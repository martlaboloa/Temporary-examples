import React from 'react'
import FormField from 'shared/newFormElements'

const Interest = ({ config: { disabled } }) => {
  return <FormField name="Interest" type="float" disabled={disabled} />
}

export default Interest
