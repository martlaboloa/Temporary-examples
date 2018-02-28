import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { render } from 'react-dom'
import get from 'lodash/get'
import flowRight from 'lodash/flowRight'
import isBoolean from 'lodash/isBoolean'
import isUndefined from 'lodash/isUndefined'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import { LKContextMenuIcon } from '../../../../shared/LKIconButton'
import { withConstantPermissions } from '../../../../shared'
import LKModal, { actions as LKModalActions, constants as LKModalConstants } from '../../../../shared/LKModal'
import { actions as OverlayActions } from '../../../../../features/Overlay'
import { translateMain } from '../../helpers'
import { getContextMenuItemConfirmModalName } from '../helpers'
import PersistSortedColumn from './PersistSortedColumn'
import { getApisExist, getApi } from '../store'
import { isPromise } from '../../../../../helpers'

var wrapFunction = function(fn, context) {
  return function(...args) {
    return fn.apply(context, args)
  }
}

let iContextMenuItemAction

let iContextMenuItemOnClose

class ContextMenu extends Component {
  state = { onConfirmLoading: false }

  getContextMenuItems = (...args) => {
    /*
    user passed 'getContextMenuItems' props which renames to 'iGetContextMenuItems', and it's used below.
    here is definition of config that can be returned from that function:
    iGetContextMenuItemsReturnValue: Array<{
      name: string,
      icon: string,
      action: func,
      disabled: boolean,
      permissionKey: string,
      itemType: oneOf('rowIdentifier'),
      confirmModalConfig:  {
        beforeOpen(): oneOf(
          false,
          arrayOf(any),
          Promise: {
            resolve: oneOf(false, arrayOf(any)),
            reject: none,
           },
        ),
        message: string,
        onClose: func
      },
      subMenu: iGetContextMenuItemsReturnValue,
    } || oneOf('excelExport', 'separator')>
     */
    const { iGetContextMenuItems, iEnableRowSelection } = this.props

    const { node } = args[0]
    if (node === null) {
      return null
    }

    if (iEnableRowSelection) {
      node.setSelected(true, true)
    }

    const iContextMenuItems = iGetContextMenuItems(...args)

    const contextMenuItems = this.iContMenuItemsToContMenuItems(iContextMenuItems)

    return contextMenuItems
  }

  getChildComponentProps = () => {
    const { iGetContextMenuItems } = this.props

    const childComponentProps = { ...this.props }

    if (!isUndefined(iGetContextMenuItems)) {
      childComponentProps.getContextMenuItems = this.getContextMenuItems
    } else {
      childComponentProps.getContextMenuItems = this.defaultGetContextMenuItems
    }

    return childComponentProps
  }

  iContMenuItemsToContMenuItems = iContMenuItems => {
    const { apisExist, api, permissions, openContextMenuItemConfirmModal, showOverlay, hideOverlay } = this.props

    if (!isArray(iContMenuItems)) {
      console.error("LKGrid: 'getContextMenuItems' prop returned something that's not array.")
    }

    return iContMenuItems
      .map(item => {
        const itemStringValues = ['excelExport', 'separator']
        const itemTypes = ['rowIdentifier']
        const errorMessage = "LKGrid: 'getContextMenuItems' prop returned something wrong (check acceptable values)."

        if (isObject(item)) {
          const {
            name,
            icon,
            action,
            disabled,
            permissionKey,
            itemType,
            confirmModalConfig,
            subMenu,
            ...restItemKeys
          } = item

          // subMenu will be tested recursively

          if (!isEmpty(restItemKeys)) {
            console.error(errorMessage)

            return {}
          }

          if (
            (!isUndefined(name) && !isString(name)) ||
            (!isUndefined(icon) && !isString(icon)) ||
            (!isUndefined(action) && !isFunction(action)) ||
            (!isUndefined(disabled) && !isBoolean(disabled)) ||
            (!isUndefined(permissionKey) && !isString(permissionKey)) ||
            (!isUndefined(itemType) && (!isString(itemType) || !itemTypes.includes(itemType))) ||
            (!isUndefined(confirmModalConfig) && !isObject(confirmModalConfig))
          ) {
            console.error(errorMessage)

            return {}
          }
        } else if (isString(item)) {
          if (!itemStringValues.includes(item)) {
            console.error(errorMessage)

            return {}
          }
        }

        return item
      })
      .map(item => {
        if (isObject(item) && isString(item.icon)) {
          return {
            ...item,
            icon: this.makeIconNode(item.icon),
          }
        }
        return item
      })
      .map(item => {
        if (item === 'excelExport') {
          return {
            name: translateMain('lbl_exp_excel'),
            action: () => {
              if (apisExist) {
                api.exportDataAsExcel()
              }
            },
            icon: this.makeIconNode('export'),
            permissionKey: 'EXPORT_DATA',
          }
        }
        return item
      })
      .reduce((acc, item, index) => {
        if (index === 1) {
          const { itemType, name } = acc

          if (itemType === 'rowIdentifier') {
            return [
              {
                name,
                disabled: true,
                cssClasses: ['lk-row-identifier'],
                tooltip: name,
              },

              'separator',

              item,
            ]
          }

          return [acc, item]
        }

        return [...acc, item]
      })
      .map(item => {
        const { confirmModalConfig } = item
        if (isObject(confirmModalConfig)) {
          const { confirmModalConfig: { beforeOpen, message, onClose }, action, ...restItems } = item

          return {
            ...restItems,
            action: () => {
              const afterActionFn = (iActionParamsFromBeforeOpen = []) => {
                iContextMenuItemAction = null
                iContextMenuItemOnClose = null

                if (isFunction(action)) {
                  iContextMenuItemAction = wrapFunction(action, this)
                }
                if (isFunction(onClose)) {
                  iContextMenuItemOnClose = wrapFunction(onClose, this)
                }

                openContextMenuItemConfirmModal({ message, iActionParamsFromBeforeOpen })
              }

              if (isFunction(beforeOpen)) {
                const befOpenRetVal = beforeOpen()

                if (isPromise(befOpenRetVal)) {
                  showOverlay()

                  befOpenRetVal
                    .then(thenArg => {
                      console.log('then: ', thenArg)

                      hideOverlay()

                      if (thenArg === false) {
                        return
                      }

                      afterActionFn(thenArg)
                    })
                    .catch(() => {
                      console.log('catch.')

                      hideOverlay()
                    })
                } else {
                  if (befOpenRetVal === false) {
                    return
                  }

                  afterActionFn(befOpenRetVal)
                }
              } else {
                afterActionFn()
              }
            },
          }
        }
        return item
      })
      .filter(
        item => (isObject(item) && isString(item.permissionKey) ? permissions[item.permissionKey] === true : true),
      )
      .map(item => {
        const subMenu = get(item, 'subMenu')
        if (!isUndefined(subMenu)) {
          return {
            ...item,
            subMenu: this.iContMenuItemsToContMenuItems(subMenu),
          }
        }
        return item
      })
  }

  makeIconNode = alias => {
    const node = document.createElement('span')
    render(<LKContextMenuIcon alias={alias} />, node)
    return node
  }

  defaultGetContextMenuItems = () => null

  itemOnConfirm = ({ iActionParamsFromBeforeOpen }) => {
    if (isFunction(iContextMenuItemAction)) {
      this.setState({ onConfirmLoading: true })

      const { closeContextMenuItemConfirmModal, openErrorModal } = this.props

      const actionReturnVal = iContextMenuItemAction(...iActionParamsFromBeforeOpen)

      if (isPromise(actionReturnVal)) {
        actionReturnVal
          .then(() => {
            closeContextMenuItemConfirmModal()

            this.setState({ onConfirmLoading: false })
          })
          .catch(e => {
            closeContextMenuItemConfirmModal()

            this.setState({ onConfirmLoading: false })

            openErrorModal(e.Error.Message || e.Error.Text)
          })
      } else {
        closeContextMenuItemConfirmModal()

        this.setState({ onConfirmLoading: false })
      }
    }
  }

  itemOnClose = () => {
    if (isFunction(iContextMenuItemOnClose)) {
      iContextMenuItemOnClose()
    }
  }

  render() {
    const { instanceName } = this.props
    const { onConfirmLoading } = this.state

    return [
      <LKModal.Confirmation
        key="confModal"
        name={getContextMenuItemConfirmModalName(instanceName)}
        loading={onConfirmLoading}
        onConfirm={this.itemOnConfirm}
        onClose={this.itemOnClose}
      />,
      <PersistSortedColumn key="PersistSortedColumn" {...this.getChildComponentProps()} />,
    ]
  }
}

export default flowRight(
  connect(
    (state, props) => ({
      apisExist: getApisExist(state, props),

      api: getApi(state, props),
    }),

    (dispatch, { instanceName }) =>
      bindActionCreators(
        {
          openContextMenuItemConfirmModal: ({ message, ...rest }) =>
            LKModalActions.open({ name: getContextMenuItemConfirmModalName(instanceName), message, ...rest }),

          closeContextMenuItemConfirmModal: () =>
            LKModalActions.close(getContextMenuItemConfirmModalName(instanceName)),

          openErrorModal: message => LKModalActions.open({ name: LKModalConstants.ERROR_MODAL_NAME, message }),

          showOverlay: () => OverlayActions.show(),
          hideOverlay: () => OverlayActions.hide(),
        },
        dispatch,
      ),
  ),
  withConstantPermissions(),
)(ContextMenu)
