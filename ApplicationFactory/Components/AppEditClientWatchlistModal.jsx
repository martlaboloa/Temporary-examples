import React, { Component } from 'react'
import { connect } from 'react-redux'
import LKModal, { actions as LKModalActions } from '../../../shared/LKModal'
import { APP_EDIT_CLIENT_WATCHLIST_MODAL_NAME, APP_EDIT_INSTANCE_NAME } from '../constants'
import { openAppEditClientEditModal } from '../store'
import { isClientViewBaseValidTest } from '../Components/helpers'

class AppEditClientWatchlistModal extends Component {
  render() {
    const { onConfirm } = this.props

    return <LKModal.Confirmation name={APP_EDIT_CLIENT_WATCHLIST_MODAL_NAME} onConfirm={onConfirm} />
  }
}

export default connect(undefined, dispatch => ({
  onConfirm: ({ clientValidation, appID, appHash, clientID, hashSumClientID, clientType, clientReqFieldGroupID }) => {
    if (isClientViewBaseValidTest(clientValidation)) {
      dispatch(LKModalActions.open({ name: APP_EDIT_INSTANCE_NAME, applicationIdentity: { ID: appID, hash: appHash } }))
    } else {
      dispatch(
        openAppEditClientEditModal({
          clientID,
          hashSumClientID,
          clientType,
          clientReqFieldGroupID,
          appID,
          appHash,
        }),
      )
    }

    dispatch(LKModalActions.close(APP_EDIT_CLIENT_WATCHLIST_MODAL_NAME))
  },
}))(AppEditClientWatchlistModal)
