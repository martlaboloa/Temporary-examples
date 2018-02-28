import React from 'react'
import RadioGroupField from 'shared/FormFields/RadioGroupField'
import { translate } from '../../helpers'

const ClientSearchInputType = props => {
  const { setFiltersVisibility } = props

  const options = [translate('opt_name'), translate('opt_serial'), translate('opt_address')]
  return (
    <RadioGroupField
      name="searchType"
      options={options}
      onFocus={() => {
        setFiltersVisibility(true)
      }}
      horizontally
    />
  )
}

export default ClientSearchInputType
