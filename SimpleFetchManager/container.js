/*
* use cases:
* 1) loan details: other tab, general > other
*/

import React from 'react'
import { connect } from 'react-redux'
import { Loader } from 'semantic-ui-react'
import flowRight from 'lodash/flowRight'
// import { unsafeGUID } from 'helpers'
import withCondition from 'shared/containers/withCondition'
import { fetchSFM, getData, getFetchSucceeded } from 'shared/SimpleFetchManager'
import objectQuery from 'shared/containers/objectQuery'

const container = ({ instanceName, callApi, callApiArgs, transformResponse, query }) =>
  flowRight(
    connect(undefined, undefined, (unused1, unused2, ownProps) => ({ ownProps })),
    connect(
      state => ({
        data: getData(instanceName)(state),
        fetchSucceeded: getFetchSucceeded(instanceName)(state),
      }),
      { fetchAction: () => fetchSFM({ instanceName, callApi, callApiArgs, transformResponse }) },
    ),
    Fetcher =>
      class extends React.Component {
        componentDidMount() {
          const { fetchSucceeded, fetchAction } = this.props
          if (!fetchSucceeded) {
            fetchAction()
          }
        }

        render() {
          return <Fetcher {...this.props} />
        }
      },
    withCondition(({ fetchSucceeded }) => fetchSucceeded, () => <Loader active />),
    Query => ({ data, ownProps }) => <Query {...ownProps} {...objectQuery(data, query)} />,
  )

// const container2 = config => container({ instanceName: unsafeGUID(), ...config })

const container3 = (getInstanceName, getFashaContainerProps) => Cmp =>
  class Bla extends React.PureComponent {
    state = {
      instanceName: getInstanceName(this.props),
    }

    componentWillReceiveProps(nextProps) {
      const { instanceName } = this.state

      this.setState({
        prevInstanceName: instanceName,
        instanceName: getInstanceName(nextProps),
      })
    }

    render() {
      return React.createElement(
        container({
          instanceName: this.state.instanceName,
          ...getFashaContainerProps(this.props),
        })(Cmp),
        this.props,
      )
    }
  }

export default container3
