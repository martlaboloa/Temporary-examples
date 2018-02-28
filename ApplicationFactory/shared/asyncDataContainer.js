import React from 'react'
import { bindActionCreators } from 'redux'
import isFunction from 'lodash/isFunction'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import transformProps from 'shared/containers/transformProps'
import transformPropBasedOnProps from 'shared/containers/transformPropBasedOnProps'
import withCondition from 'shared/containers/withCondition'
import { fetchSFM, getData, getFetchSucceeded, getInstanceExistence, getPending } from 'shared/SimpleFetchManager'
import objectQuery from 'shared/containers/objectQuery'
import AppAddLocalLoader from '../shared/AppAddLocalLoader'
import { CLIENT_VIEW_BASE_FETCHER_NAME } from '../constants'

const asyncDataContainer = (getConfig, isSwitchedOn = () => true, instName) =>
  flowRight(
    connect(undefined, undefined, (unused1, unused2, ownProps) => ({ ownProps })),

    connect((state, { ownProps }) => ({ switchedOn: isSwitchedOn(ownProps) })),

    connect(
      (state, { switchedOn, ownProps }) =>
        switchedOn ? { ...(isFunction(getConfig) ? getConfig(ownProps) : getConfig) } : {},
    ),

    transformPropBasedOnProps(
      'compareProps',
      ({ switchedOn, compareProps }) => (switchedOn ? compareProps || (() => true) : undefined),
    ),

    connect(
      (state, { switchedOn, instanceName }) =>
        switchedOn
          ? {
              data: getData(instanceName)(state),
              instanceExists: getInstanceExistence(instanceName)(state),
              pending: getPending(instanceName)(state),
              fetchSucceeded: getFetchSucceeded(instanceName)(state),
            }
          : {},
      (dispatch, { switchedOn, instanceName, callApi, callApiArgs, transformResponse }) =>
        switchedOn
          ? bindActionCreators(
              { fetchAction: () => fetchSFM({ instanceName, callApi, callApiArgs, transformResponse }) },
              dispatch,
            )
          : {},
    ),

    Fetcher =>
      class extends React.Component {
        componentDidMount() {
          const { switchedOn, instanceExists, pending, fetchSucceeded, fetchAction } = this.props

          if (switchedOn) {
            if (!instanceExists || (!pending && !fetchSucceeded)) {
              fetchAction()
            }
          }
        }

        componentWillReceiveProps(nextProps) {
          const { switchedOn, instanceExists, pending, fetchSucceeded, compareProps, fetchAction } = nextProps

          if (switchedOn) {
            if (
              !instanceExists ||
              (!pending && !fetchSucceeded) ||
              (!pending && !compareProps(this.props.ownProps, nextProps.ownProps))
            ) {
              fetchAction()
            }
          }
        }

        render() {
          return <Fetcher {...this.props} />
        }
      },

    withCondition(
      ({ switchedOn, fetchSucceeded }) => !switchedOn || fetchSucceeded,
      () => <AppAddLocalLoader loading />,
    ),

    Query => ({ switchedOn, data, query, ownProps }) => (
      <Query {...ownProps} {...(switchedOn ? objectQuery(data, query) : {})} />
    ),
  )

export default asyncDataContainer
