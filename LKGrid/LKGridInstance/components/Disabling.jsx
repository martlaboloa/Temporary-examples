import React from 'react'
import Loading from './Loading'

const sizeStyle = {
  height: '100%',
  width: '100%',
  position: 'absolute',
}

const disablingStyle = {
  filter: 'brightness(30%)',
  pointerEvents: 'none',
}

const getDisabledOrNotStyle = iDisabled => {
  let disabledOrNotStyle = sizeStyle

  if (iDisabled) {
    disabledOrNotStyle = {
      ...disabledOrNotStyle,
      ...disablingStyle,
    }
  }

  return disabledOrNotStyle
}

const Disabling = props => {
  const { iDisabled } = props

  return (
    <div className="lk-grid-container" style={getDisabledOrNotStyle(iDisabled)}>
      <Loading {...props} />
    </div>
  )
}
export default Disabling
