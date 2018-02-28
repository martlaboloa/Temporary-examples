import React from 'react'
import FormField from 'shared/newFormElements'

const GracePeriodInterestAccrual = ({ config: { disabled } }) => {
  return <FormField name="GracePeriod_InterestAccrual" type="number" disabled={disabled} />
}

export default GracePeriodInterestAccrual
