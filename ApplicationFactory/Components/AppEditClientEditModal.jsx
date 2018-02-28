import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LKModal, { actions as LKModalActions } from 'shared/LKModal'
import flowRight from 'lodash/flowRight'
import ClientEdit, { actions as clientEditActions } from '../../../../features/ClientEdit'
import { APP_EDIT_CLIENT_EDIT_MODAL_NAME, APP_EDIT_INSTANCE_NAME } from '../constants'
import { openAppEdit as openAppEditUndisp, close as closeMainUndisp } from '../store'

const AppEditClientEditConfirmationModal = connect(undefined, dispatch => ({
  onConfirm: ({ ID, hash, ClientType, clientReqFieldGroupID, appID, appHash }) => {
    dispatch(
      clientEditActions.open({
        name: 'ClientEditInApplicationEdit',
        ID,
        hash,
        ClientType,
        clientReqFieldGroupID,
        additionalArgs: {
          appID,
          appHash,
        },
      }),
    )
    dispatch(dispatch(LKModalActions.close(APP_EDIT_CLIENT_EDIT_MODAL_NAME)))
  },
  closeMain: () => closeMainUndisp(dispatch, APP_EDIT_INSTANCE_NAME),
}))(props => {
  const { onConfirm, closeMain } = props

  return (
    <LKModal.Confirmation
      name={APP_EDIT_CLIENT_EDIT_MODAL_NAME}
      onConfirm={onConfirm}
      onClose={() => {
        closeMain()
      }}
    />
  )
})

const ClientEditRealModal = connect(undefined, dispatch => ({
  openAppEdit: (ID, hash) => openAppEditUndisp(dispatch, ID, hash),
  closeMain: () => closeMainUndisp(dispatch, APP_EDIT_INSTANCE_NAME),
  ...bindActionCreators(
    {
      openEdit: (ID, hash) => LKModalActions.open({ name: APP_EDIT_INSTANCE_NAME, applicationIdentity: { ID, hash } }),
    },
    dispatch,
  ),
}))(props => {
  const { openAppEdit, closeMain } = props

  return (
    <ClientEdit
      name="ClientEditInApplicationEdit"
      onClientEdit={(unused, { additionalArgs: { appID, appHash } }) => {
        openAppEdit(appID, appHash)
      }}
      onClose={() => {
        closeMain()
      }}
    />
  )
})

class AppEditClientEditModal extends Component {
  render() {
    return [
      <AppEditClientEditConfirmationModal key="clientEditConfirmationModal" />,
      <ClientEditRealModal key="clientEditRealModal" />,
    ]
  }
}

export default flowRight()(AppEditClientEditModal)
