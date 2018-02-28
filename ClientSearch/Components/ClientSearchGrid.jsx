import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { colors } from 'shared'
import { LKDate } from 'helpers/Date'
import { date as dateFormatter } from 'helpers/formatters'
import LKGrid, { getIconComponent } from 'shared/LKGrid'
import { getClients } from '../selectors'
import { formName, objectName } from '../constants'

const gridCommonConfig = {
  columnConfigs: {
    RegDate: {
      comparator: (a, b) => LKDate.compareSameFormat(a, b, 'YYYY-MM-DD HH:mm:ss'),
      valueFormatter: ({ value }) => dateFormatter(value),
    },
    Watched: {
      iconComponent: getIconComponent(({ value }) => (value === 1 ? 'alert' : null)),
    },
    Black: {
      iconComponent: getIconComponent(({ value }) => (value === 1 ? 'skull' : null)),
    },
    Insured: {
      iconComponent: getIconComponent(({ value }) => (value === 1 ? 'life_ring' : null)),
    },
  },

  // deltaRowDataMode: true,
  getRowNodeId: row => row.ID,
  gridIdentity: { formName, objectName },
  getRowStyle: ({ node: { data: { ClientType } } }) => {
    if (ClientType === 1) {
      return {}
    }
    if (ClientType === 2) {
      return { backgroundColor: colors.green }
    }
    if (ClientType === 3) {
      return { backgroundColor: colors.blue }
    }
  },
}

@connect((state, props) => ({ rowData: getClients(state, props) }))
class ClientSearchGrid extends React.Component {
  render() {
    const { rowData, instanceName, gridConfig } = this.props

    return <LKGrid instanceName={instanceName} rowData={rowData} {...gridCommonConfig} {...gridConfig} />
  }
}

ClientSearchGrid.defaultProps = {
  gridConfig: {},
}

ClientSearchGrid.propTypes = {
  gridConfig: PropTypes.object,
}

export default ClientSearchGrid
