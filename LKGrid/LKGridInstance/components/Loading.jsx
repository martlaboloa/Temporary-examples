import React from 'react'
import { connect } from 'react-redux'
import isNull from 'lodash/isNull'
import flowRight from 'lodash/flowRight'
import { LocalLoader } from 'shared'
import AgGridTheme from './AgGridTheme'
import { getSyncedGridIdentity } from '../store'

const Loading = flowRight(
  connect((state, props) => {
    const { iSyncGridState, iLoading } = props

    return { loading: iLoading || (iSyncGridState && isNull(getSyncedGridIdentity(state, props))) }
  }),
)(
  ({ loading, ...restProps }) =>
    !loading ? <AgGridTheme {...restProps} /> : <LocalLoader key="loader" logoLoader loading renderChildren />,
)

export default Loading
