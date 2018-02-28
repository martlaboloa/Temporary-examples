import React from 'react'
import LKGridInstance from '../LKGridInstance'
import container from './container'

class LKGrid extends React.Component {
  componentWillMount() {
    const { instanceExists, registerInstance } = this.props

    if (!instanceExists) {
      registerInstance()
    }
  }

  render() {
    const { instanceExists, getInstancedActions, getInstanceReducerRoot, interfaceProps } = this.props

    if (!instanceExists) {
      return null
    }

    return (
      <LKGridInstance
        {...interfaceProps}
        getInstancedActions={getInstancedActions}
        getReducerRoot={getInstanceReducerRoot}
      />
    )
  }
}

export default container(LKGrid)
