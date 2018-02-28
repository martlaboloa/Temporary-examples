import React, { Component } from 'react'
import { connect } from 'react-redux'
import LKModal, { actions as LKModalActions } from 'shared/LKModal'
import flowRight from 'lodash/flowRight'
import { getData } from 'shared/SimpleFetchManager'
import ClientEdit, { actions as clientEditActions } from '../../../../features/ClientEdit'
import { APP_ADD_CLIENT_EDIT_MODAL_NAME, PRODUCT_VIEW_DETAIL_FETCHER_NAME } from '../constants'
import { fetchClientByCardNumber as fetchClientByCardNumberUndisp } from '../store'

const AppAddClientEditConfirmationModal = connect(undefined, dispatch => ({
  onConfirm: ({ ID, hash, ClientType, clientReqFieldGroupID, CardNumber }) => {
    dispatch(
      clientEditActions.open({
        ID,
        hash,
        ClientType,
        clientReqFieldGroupID,
        CardNumber,
        name: 'ClientEditInApplicationAdd',
      }),
    )
    dispatch(dispatch(LKModalActions.close(APP_ADD_CLIENT_EDIT_MODAL_NAME)))
  },
}))(props => {
  const { onConfirm } = props

  return <LKModal.Confirmation name={APP_ADD_CLIENT_EDIT_MODAL_NAME} onConfirm={onConfirm} />
})

const ClientEditRealModal = connect(
  state => ({
    productViewDetail: getData(PRODUCT_VIEW_DETAIL_FETCHER_NAME)(state),
  }),
  dispatch => ({
    fetchClientByCardNumber: (cardNumberInput, productViewDetail) =>
      fetchClientByCardNumberUndisp(dispatch, cardNumberInput, productViewDetail),
  }),
  (stateProps, dispatchProps, ownProps) => {
    const fetchClientByCardNumberDispatch = dispatchProps.fetchClientByCardNumber

    return Object.assign({}, ownProps, stateProps, dispatchProps, {
      fetchClientByCardNumber: cardNumberInput => {
        const { productViewDetail } = stateProps

        return fetchClientByCardNumberDispatch(cardNumberInput, productViewDetail)
      },
    })
  },
)(props => {
  const { fetchClientByCardNumber } = props

  return (
    <ClientEdit
      name="ClientEditInApplicationAdd"
      onClientEdit={(unused, { CardNumber }) => {
        console.log('CardNumber: ', CardNumber)

        fetchClientByCardNumber(CardNumber)
      }}
    />
  )
})

class AppAddClientEditModal extends Component {
  render() {
    return [
      <AppAddClientEditConfirmationModal key="clientEditConfirmationModal" />,
      <ClientEditRealModal key="clientEditRealModal" />,
    ]
  }
}

export default flowRight()(AppAddClientEditModal)
