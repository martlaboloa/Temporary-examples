import React from 'react'
import FormField from 'shared/newFormElements'
import { TEXT_AREA_MAX, TEXT_AREA_ROW_COUNT } from '../../constants'

const ProjectDescription = () => {
  return (
    <FormField
      name="ProjectDescription"
      type="textarea"
      autoHeight={false}
      max={TEXT_AREA_MAX}
      rows={TEXT_AREA_ROW_COUNT}
    />
  )
}

export default ProjectDescription
