import React from 'react'
import PropTypes from 'prop-types'
import isFunction from 'lodash/isFunction'
import isUndefined from 'lodash/isUndefined'
import Apis from './Apis'

const getPropErrorMessage = (propName, componentName) =>
  `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
const propExists = prop => !isUndefined(prop)

const PropTypesAndDefaultProps = props => <Apis {...props} />

PropTypesAndDefaultProps.defaultProps = {
  iRowData: [],

  iSyncGridState: false,
  iDisabled: false,
  iEnableColumnsResize: false,
  iEnableColumnsOrder: false,
  iEnableColumnsHide: false,

  iDeltaRowDataMode: false,

  iEnableSorting: false,
  iEnableRowSelection: false,
  iSelectFirstRow: false,
  iSelectLastRow: false,
  iRowDeselection: false,

  iLoading: false,
}

PropTypesAndDefaultProps.propTypes = {
  getInstancedActions: PropTypes.func.isRequired,
  getReducerRoot: PropTypes.func.isRequired,

  iRowData: PropTypes.arrayOf(PropTypes.object),
  iColumnDefs: PropTypes.arrayOf(PropTypes.object),

  /*
  if you want to know what kind of config can this function return, checkout
  context menu react component.
   */
  getContextMenuItems: PropTypes.func,

  iSyncGridState: PropTypes.bool,
  iDisabled: PropTypes.bool,
  iEnableColumnsResize: PropTypes.bool,
  iEnableColumnsOrder: PropTypes.bool,
  iEnableColumnsHide: PropTypes.bool,

  iDeltaRowDataMode: PropTypes.bool,
  iGetRowNodeId: ({ iDeltaRowDataMode, iGetRowNodeId }, propName, componentName) => {
    if (
      propExists(iDeltaRowDataMode) &&
      iDeltaRowDataMode &&
      (!propExists(iGetRowNodeId) || !isFunction(iGetRowNodeId))
    ) {
      return new Error(getPropErrorMessage(propName, componentName))
    }
  },

  iEnableRowSelection: PropTypes.bool,
  iSelectFirstRow: PropTypes.bool,
  iSelectLastRow: PropTypes.bool,
  iRowDeselection: PropTypes.bool,
  iOnRowSelected: PropTypes.func,
  iOnRowDoubleClicked: PropTypes.func,
  iOnGridReady: PropTypes.func,

  iOnCellClicked: PropTypes.func,

  iEnableSorting: PropTypes.bool,
  iColumnConfigs: PropTypes.shape({
    comparator: PropTypes.func,
    iconComponent: PropTypes.node,
    cellStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    cellClass: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    cellClassRules: PropTypes.objectOf(PropTypes.func),
    valueFormatter: PropTypes.func,
  }),

  iLoading: PropTypes.bool,

  iStatusBarConfig: PropTypes.shape({ columnId: PropTypes.string }),
}

export default PropTypesAndDefaultProps
