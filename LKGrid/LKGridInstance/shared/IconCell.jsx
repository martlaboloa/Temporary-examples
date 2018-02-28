import React from 'react'
import { LKIconLabel } from 'shared/LKIconButton'
import isNil from 'lodash/isNil'

export const getIconComponent = getIconAlias => props => {
  const alias = getIconAlias(props)
  return !isNil(alias) ? <LKIconLabel alias={alias} nobg /> : null
}
