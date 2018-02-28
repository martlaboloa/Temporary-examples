import React from 'react'
import { LKIconLabel } from 'shared/LKIconButton'

const handleClick = ({ currentTarget }) => {
  const targetRect = currentTarget.getBoundingClientRect()

  const contextMenuEvent = new MouseEvent('contextmenu', {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: targetRect.right - targetRect.width,
    clientY: targetRect.bottom,
  })

  currentTarget.dispatchEvent(contextMenuEvent)
}

const ButtonContextMenu = () => (
  <LKIconLabel tabIndex="-1" nobg type="button" alias="down_arrow" onClick={handleClick} />
)

export default ButtonContextMenu
