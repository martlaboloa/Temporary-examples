import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'
import { DocumentTitle } from '../../shared'
import IconPreloader from '../../shared/IconPreloader'
import Window from '../../../features/Window'
import { translate } from '../helpers'
import OrderSearchPanel from './OrderSearchPanel'
import OrderSearchGrid from './OrderSearchGrid'
import { closeOrderGrid, closeSearchBar, deleteOrders } from '../actions'
import { getOrdersCount, getOrdersFetchSucceeded } from '../selectors'

const style = {
  parent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '14px',
    width: '100%',
  },

  second: {
    flex: 1,
    position: 'relative',
    marginTop: '10px',
    overflow: 'auto',
  },
}

@connect(
  state => ({
    ordersCount: getOrdersCount(state),
    ordersFetchSucceeded: getOrdersFetchSucceeded(state),
  }),
  dispatch =>
    bindActionCreators(
      {
        closeOrderGrid,
        closeSearchBar,
        deleteOrders,
      },
      dispatch,
    ),
)
class OrderSearch extends React.Component {
  getName() {
    const { ordersFetchSucceeded, ordersCount } = this.props

    let name = translate('lbl_0_all')

    if (ordersFetchSucceeded) {
      name += ` - ${ordersCount} ${translate('lbl_records_t')}`
    }

    return name
  }

  getWindowProps() {
    const windowProps = {
      icon: 'entries_all',
      uri: 'secure/order/search',
      onClose: this.windowOnClose,
    }

    const name = this.getName()
    if (!isNil(name)) {
      windowProps.name = name
    }

    return windowProps
  }

  windowOnClose = () => {
    this.props.closeOrderGrid()
    this.props.closeSearchBar()
    this.props.deleteOrders()
  }

  render() {
    return (
      <DocumentTitle title={this.getName()}>
        <Window {...this.getWindowProps()}>
          <Window.Body>
            <div style={style.parent}>
              <OrderSearchPanel />

              <div style={style.second}>
                <OrderSearchGrid />
              </div>
            </div>
          </Window.Body>
        </Window>

        <IconPreloader collection="order" />
      </DocumentTitle>
    )
  }
}

export default OrderSearch
