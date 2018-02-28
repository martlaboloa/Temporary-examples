import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconPreloader from 'shared/IconPreloader'
import ClientSearchPanel from './ClientSearchPanel'
import ClientSearchGrid from './ClientSearchGrid'
import { destroy as destroyUndisp } from '../actions'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 14px;
  width: 100%;
  overflow-y: auto;

  .clients_table-container {
    flex: 1;
    margin-top: 10px;
    position: relative;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
`

@connect(undefined, (dispatch, { instanceName }) => ({
  destroy: () => destroyUndisp(instanceName, dispatch),
}))
class ClientSearch extends React.Component {
  componentWillUnmount() {
    const { destroyOnUnmount, instanceName, destroy } = this.props
    if (destroyOnUnmount) {
      destroy(instanceName)
    }
  }

  render() {
    const { instanceName, gridConfig, searchPanelConfig } = this.props

    return (
      <Wrapper>
        <ClientSearchPanel instanceName={instanceName} searchPanelConfig={searchPanelConfig} />

        <div className="clients_table-container">
          <ClientSearchGrid instanceName={instanceName} gridConfig={gridConfig} />
        </div>

        <IconPreloader collection="client" />
      </Wrapper>
    )
  }
}

ClientSearch.defaultProps = {
  destroyOnUnmount: true,
}

ClientSearch.propTypes = {
  instanceName: PropTypes.string.isRequired,
  destroyOnUnmount: PropTypes.bool,
}

export default ClientSearch
