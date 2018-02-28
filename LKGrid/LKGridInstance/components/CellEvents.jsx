import React from 'react'
import isUndefined from 'lodash/isUndefined'
import ContextMenu from './ContextMenu'

class CellEvents extends React.Component {
  onCellClicked = params => {
    const { iOnCellClicked, iRowData } = this.props
    const { column: { colDef: { field } } } = params

    const columnData = iRowData.map(row => row[field])

    iOnCellClicked(params, { columnData })
  }

  getChildComponentProps() {
    const { iOnCellClicked } = this.props

    const childComponentProps = { ...this.props }

    if (!isUndefined(iOnCellClicked)) {
      childComponentProps.onCellClicked = this.onCellClicked
    }

    return childComponentProps
  }

  render() {
    return <ContextMenu {...this.getChildComponentProps()} />
  }
}

export default CellEvents
