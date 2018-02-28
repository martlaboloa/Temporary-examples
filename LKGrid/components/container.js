import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getInstanceExistence,
  makeGetGetInstancedActions,
  makeGetGetInstanceReducerRoot,
  registerInstance,
} from '../store'

const makeMapStateToProps = () => {
  const getGetInstancedActions = makeGetGetInstancedActions()
  const getGetInstanceReducerRoot = makeGetGetInstanceReducerRoot()
  return (state, props) => ({
    instanceExists: getInstanceExistence(state, props),
    getInstancedActions: getGetInstancedActions(state, props),
    getInstanceReducerRoot: getGetInstanceReducerRoot(state, props),
  })
}

const mapDispatchToProps = (dispatch, { instanceName }) =>
  bindActionCreators(
    {
      registerInstance: () => registerInstance(instanceName),
    },
    dispatch,
  )

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign({}, { interfaceProps: ownProps }, stateProps, dispatchProps)

export default connect(makeMapStateToProps, mapDispatchToProps, mergeProps)
