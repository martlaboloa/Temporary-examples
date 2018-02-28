import React from 'react'
import { connect } from 'react-redux'
import NavigationItem from '../../../Header/Navigation/NavigationItem'
import { openAdd } from '../store'

const AppAddOpenButton = ({ name, icon, open }) => (
  <NavigationItem
    name={name}
    icon={icon}
    link="#"
    onClick={e => {
      e.preventDefault()

      open()
    }}
  />
)

export default connect(undefined, dispatch => ({ open: () => openAdd(dispatch) }))(AppAddOpenButton)
