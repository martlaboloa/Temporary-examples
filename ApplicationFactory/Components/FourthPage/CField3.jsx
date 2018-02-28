import React from 'react'
import FormField from 'shared/newFormElements'
import { TEXT_AREA_MAX, TEXT_AREA_ROW_COUNT } from '../../constants'

const CField3 = () => {
  return <FormField name="CField3" type="textarea" autoHeight={false} max={TEXT_AREA_MAX} rows={TEXT_AREA_ROW_COUNT} />
}

export default CField3
