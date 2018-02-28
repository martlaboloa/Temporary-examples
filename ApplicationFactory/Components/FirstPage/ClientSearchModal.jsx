import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { change } from 'redux-form'
import { LKIconButton } from 'shared/LKIconButton'
import LKModal, { LKModalContainer } from 'shared/LKModal'
import ClientSearch, { getTitle } from 'shared/ClientSearch'
import flowRight from 'lodash/flowRight'
import { reduceClient as reduceClientUnsip } from '../../store'
import { translateClientSearch, getSearchPanelConfig } from '../../helpers'
import { FORM_NAME, CLIENT_SEARCH_MODAL_NAME, CLIENT_SEARCH_NAME } from '../../constants'

const style = {
  width: 1000,
  marginLeft: -500,
}

const clientSearchGridConfig = {
  syncGridState: true,
  enableRowSelection: true,
}

class ClientSearchModal extends Component {
  onClientChoose = row => {
    const { closeModal, reduceClient, changeCardNumberInput } = this.props

    closeModal()

    reduceClient(row)
    changeCardNumberInput(row.CardNumber)
  }

  onRowDoubleClicked = ({ node: { data } }) => this.onClientChoose(data)

  getContextMenuItems = params => {
    const { node: { data, data: { Full_Name } } } = params

    return [
      {
        name: Full_Name,
        disabled: true,
      },

      'separator',

      {
        name: translateClientSearch('cmd_select'),
        action: () => this.onClientChoose(data),
        icon: 'hand',
      },
    ]
  }

  render() {
    const { title, closeModal, productViewDetail } = this.props

    return (
      <LKModal name={CLIENT_SEARCH_MODAL_NAME} heading={title} style={style}>
        <LKModal.Content style={{ display: 'flex', minHeight: 600, maxHeight: 600 }}>
          <ClientSearch
            instanceName={CLIENT_SEARCH_NAME}
            gridConfig={{
              ...clientSearchGridConfig,
              onRowDoubleClicked: this.onRowDoubleClicked,
              getContextMenuItems: this.getContextMenuItems,
            }}
            searchPanelConfig={getSearchPanelConfig(productViewDetail)}
          />
        </LKModal.Content>

        <LKModal.Actions>
          <LKIconButton alias="cancel" onClick={closeModal}>
            {translateClientSearch('cmd_close')}
          </LKIconButton>
        </LKModal.Actions>
      </LKModal>
    )
  }
}

export default flowRight(
  LKModalContainer({ name: CLIENT_SEARCH_MODAL_NAME }),
  connect(
    state => ({ title: getTitle(state, { instanceName: CLIENT_SEARCH_NAME }) }),
    (dispatch, { productViewDetail: { Client_ReqField_GroupID } }) => ({
      ...bindActionCreators(
        {
          changeCardNumberInput: cardNumberInput => change(FORM_NAME, 'cardNumberInput', cardNumberInput),
        },
        dispatch,
      ),
      reduceClient: client => reduceClientUnsip(dispatch, client, Client_ReqField_GroupID),
    }),
  ),
)(ClientSearchModal)
