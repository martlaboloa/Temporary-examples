import React, { Component } from 'react'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import LKModal, { actions as LKModalActions } from 'shared/LKModal'
import ApplicationFactory from '../Components'
import { APP_EDIT_INSTANCE_NAME } from '../constants'
import AppEditClientEditModal from '../Components/AppEditClientEditModal'
import AppEditClientWatchlistModal from '../Components/AppEditClientWatchlistModal'

class ApplicationEdit extends Component {
  render() {
    return [
      <AppEditClientWatchlistModal key="AppEditClientWatchlistModal" />,
      <AppEditClientEditModal key="AppEditClientEditModal" />,
      <ApplicationFactory key="ApplicationFactory" instanceName={APP_EDIT_INSTANCE_NAME} />,
    ]
  }
}

export default flowRight()(ApplicationEdit)
