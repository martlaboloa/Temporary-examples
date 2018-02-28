import React from 'react'
import { connect } from 'react-redux'

import { colors } from '../../shared'
import LKGrid, { getIconComponent } from '../../shared/LKGrid'
import {
  date as dateFormatter,
  dateTime as dateTimeFormatter,
  number as numberFormatter,
} from '../../../helpers/formatters'
import { Order } from '../../../WebAPI'
import HistoryModal, { HISTORY_MODAL } from '../../shared/HistoryModal'
import { actions as LKModalActions, constants as LKModalConstants } from '../../shared/LKModal'
import withConfig from '../../shared/containers/withConfig'

import {
  MemorialOrderEdit,
  MemorialOrderCopy,
  OrderCashInEdit,
  OrderCashOutEdit,
  OrderCashInCopy,
  OrderCashOutCopy,
} from '../../OrderAdd'

import { getOrders } from '../selectors'
import { translate, translateBase, pushDetailsRoute } from '../helpers'
import { searchOrdersAgain } from '../actions'
import { LK_GRID_NAME, formName, objectName } from '../constants'

const DLConfig = {
  instanceName: LK_GRID_NAME,

  columnConfigs: {
    CreateDate: {
      valueFormatter: ({ value }) => dateTimeFormatter(value),
    },
    DocDate: {
      valueFormatter: ({ value }) => dateFormatter(value),
    },
    AmountEQ: {
      valueFormatter: ({ value }) => numberFormatter(value),
      cellStyle: { textAlign: 'right' },
    },
    Amount: {
      valueFormatter: ({ value }) => numberFormatter(value),
      cellStyle: { textAlign: 'right' },
    },
    AuthLevel: {
      iconComponent: getIconComponent(({ value }) => {
        switch (Number(value)) {
          case 0:
            return 'bullet_red'
          case 1:
            return 'bullet_yellow'
          case 2:
            return 'bullet_green'
          default:
            return undefined
        }
      }),
    },
  },

  enableColumnsResize: true,
  enableColumnsOrder: true,
  enableColumnsHide: true,
  syncGridState: true,
  enableRowSelection: true,
  enableSorting: true,

  // deltaRowDataMode: true,
  getRowNodeId: row => row.ID,
  gridIdentity: {
    formName,
    objectName,
  },

  onRowDoubleClicked: ({ node: { data } }) => pushDetailsRoute(data),

  getRowStyle: ({ node: { data: { AuthLevel } } }) => {
    switch (AuthLevel) {
      case 0:
      case 1:
        return { color: colors.grey }
      default:
        return {}
    }
  },

  statusBarConfig: { columnId: 'Amount' },
}

@connect(
  state => ({
    orders: getOrders(state),
  }),
  { openModal: LKModalActions.open, searchOrdersAgain },
)
class OrderSearchGrid extends React.Component {
  getContextMenuItems = params => {
    const { node: { data } } = params
    const isAuthorized = data.Auth !== 0

    let copyPermissionKey = ''
    let addPermissionKey = ''
    let detailsPermissionKey = 'ACC_ENTRIES_VIEW'
    let deletePermissionKey = 'ACC_ENTRIES_DELETE'

    if (data.AuthorID !== this.props.AuthedUserID) {
      detailsPermissionKey = 'ACC_ENTRIES_VIEW_ALIEN'
      deletePermissionKey = 'ACC_ENTRIES_DELETE_ALIEN'
    }

    switch (data.OperTypeID) {
      case 1:
        copyPermissionKey = 'ACC_ENTRIES_ADD_MEMORDER'
        addPermissionKey = 'ACC_ENTRIES_ADD_MEMORDER'
        break

      case 3:
        copyPermissionKey = 'ACC_ENTRIES_ADD_CASHIN'
        addPermissionKey = 'ACC_ENTRIES_ADD_CASHIN'
        break

      case 4:
        copyPermissionKey = 'ACC_ENTRIES_ADD_CASHOUT'
        addPermissionKey = 'ACC_ENTRIES_ADD_CASHOUT'
        break

      default:
    }

    return [
      {
        name: translate('cmd_view_entry'),
        action: () => pushDetailsRoute(data),
        permissionKey: detailsPermissionKey,
        icon: 'info',
      },

      {
        name: 'ისტორია',
        action: () =>
          this.props.openModal({
            name: HISTORY_MODAL,
            ID: data.ID,
            hash: data.HashSum_EntryID_, // eslint-disable-line
            page: 'viewhistory',
          }),
        icon: 'footprint',
      },

      {
        name: translate('cmd_copy_entry'),
        action: () => {
          switch (data.OperTypeID) {
            case 1: {
              this.props.openModal({
                name: 'MemorialOrderCopy',
                ID: data.ID,
                hash: data.HashSum_EntryID_, // eslint-disable-line
                OID: data.OID,
              })

              break
            }

            case 3: {
              this.props.openModal({
                name: 'OrderCashInCopy',
                ID: data.ID,
                hash: data.HashSum_EntryID_, // eslint-disable-line
                OID: data.OID,
              })

              break
            }

            case 4: {
              this.props.openModal({
                name: 'OrderCashOutCopy',
                ID: data.ID,
                hash: data.HashSum_EntryID_, // eslint-disable-line
                OID: data.OID,
              })

              break
            }

            default:
              console.log(data.OperTypeID)
          }
        },
        permissionKey: copyPermissionKey,
        icon: 'copy',
      },

      {
        name: isAuthorized ? translate('cmd_unauth_entry') : translate('cmd_auth_entry'),
        action: () => {
          switch (data.OperTypeID) {
            case 1: {
              this.props.openModal({
                name: 'MemorialOrderEdit',
                ID: data.ID,
                hash: data.HashSum_EntryID_, // eslint-disable-line
                authorizing: true,
                OID: data.OID,
              })

              break
            }

            case 3: {
              this.props.openModal({
                name: 'OrderCashInEdit',
                ID: data.ID,
                hash: data.HashSum_EntryID_, // eslint-disable-line
                authorizing: true,
                OID: data.OID,
              })

              break
            }

            case 4: {
              this.props.openModal({
                name: 'OrderCashOutEdit',
                ID: data.ID,
                hash: data.HashSum_EntryID_, // eslint-disable-line
                authorizing: true,
                OID: data.OID,
              })

              break
            }

            default:
              console.log(data.OperTypeID)
          }
        },
        permissionKey: addPermissionKey,
        icon: isAuthorized ? 'bullet_red' : 'bullet_green',
      },

      {
        name: translate('cmd_edit_entry'),
        action: () => {
          switch (data.OperTypeID) {
            case 1: {
              this.props.openModal({
                name: 'MemorialOrderEdit',
                ID: data.ID,
                hash: data.HashSum_EntryID_, // eslint-disable-line
                OID: data.OID,
              })

              break
            }

            case 3: {
              this.props.openModal({
                name: 'OrderCashInEdit',
                ID: data.ID,
                hash: data.HashSum_EntryID_, // eslint-disable-line
                OID: data.OID,
              })

              break
            }

            case 4: {
              this.props.openModal({
                name: 'OrderCashOutEdit',
                ID: data.ID,
                hash: data.HashSum_EntryID_, // eslint-disable-line
                OID: data.OID,
              })

              break
            }

            default:
              console.log(data.OperTypeID)
          }
        },
        permissionKey: 'ACC_ENTRIES_EDIT',
        icon: 'edit',
      },

      {
        name: translate('cmd_delete_entry'),
        action: () =>
          Order.deleteOrder({
            EntryID: data.ID,
            HashSum_EntryID_: data.HashSum_EntryID_, // eslint-disable-line
          })
            .then(() => this.props.searchOrdersAgain())
            .catch(error =>
              this.props.openModal({
                name: LKModalConstants.INFO_MODAL_NAME,
                message: error.Error.Text || error.Error.Message,
              }),
            ),
        permissionKey: deletePermissionKey,
        icon: 'delete',
        confirmModalConfig: { message: translateBase('MSG_ARE_YOU_SURE') },
      },

      'excelExport',
    ]
  }

  render() {
    const { orders } = this.props

    if (!orders) {
      return null
    }

    return [
      <MemorialOrderEdit
        key="MemorialOrderEdit"
        name="MemorialOrderEdit"
        onOrderAddEdit={this.props.searchOrdersAgain}
        onAuthorize={searchOrdersAgain}
      />,

      <MemorialOrderCopy
        key="MemorialOrderCopy"
        name="MemorialOrderCopy"
        onOrderAddEdit={this.props.searchOrdersAgain}
      />,

      <OrderCashInEdit
        name="OrderCashInEdit"
        key="OrderCashInEdit"
        onAuthorize={searchOrdersAgain}
        onOrderAddEdit={this.props.searchOrdersAgain}
      />,

      <OrderCashOutEdit
        key="OrderCashOutEdit"
        name="OrderCashOutEdit"
        onAuthorize={searchOrdersAgain}
        onOrderAddEdit={this.props.searchOrdersAgain}
      />,

      <OrderCashInCopy key="OrderCashInCopy" name="OrderCashInCopy" onOrderAddEdit={this.props.searchOrdersAgain} />,
      <OrderCashOutCopy key="OrderCashOutCopy" name="OrderCashOutCopy" onOrderAddEdit={this.props.searchOrdersAgain} />,

      <HistoryModal APICall={Order.details} key="HistoryModal" />,

      <LKGrid key="OrderSearch" {...DLConfig} getContextMenuItems={this.getContextMenuItems} rowData={orders} />,
    ]
  }
}

export default withConfig({ query: 'ID as AuthedUserID' })(OrderSearchGrid)
