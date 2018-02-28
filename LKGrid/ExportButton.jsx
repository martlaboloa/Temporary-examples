import React from 'react'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import { ExportButtonInstance } from './LKGridInstance'
import { makeGetGetInstanceReducerRoot } from './store'
import { withConstantPermissions } from '../../shared'
import transformProps from '../../shared/containers/transformProps'
import withCondition from '../../shared/containers/withCondition'

const ExportButton = ({ getInstanceReducerRoot, ...rest }) => (
  <ExportButtonInstance getReducerRoot={getInstanceReducerRoot} {...rest} />
)

const makeMapStateToProps = () => {
  const getGetInstanceReducerRoot = makeGetGetInstanceReducerRoot()
  return (state, props) => ({
    getInstanceReducerRoot: getGetInstanceReducerRoot(state, props),
  })
}

export default flowRight(
  connect(makeMapStateToProps),
  withConstantPermissions(),
  transformProps(({ permissions, ...restProps }) => ({
    hasPermission: permissions.EXPORT_DATA === true,
    ...restProps,
  })),
  withCondition(({ hasPermission }) => hasPermission, () => null),
)(ExportButton)
