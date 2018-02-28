import React, { Component } from 'react'
import { connect } from 'react-redux'
import DefaultSelection from './DefaultSelection'
import { getApisExist, getApi } from '../store'

class SelectionWithArrowKeys extends Component {
  getChildComponentProps = () => {
    const childComponentProps = {
      ...this.props,
      navigateToNextCell: params => {
        const { apisExist, api } = this.props

        var previousCell = params.previousCellDef
        var suggestedNextCell = params.nextCellDef

        const KEY_UP = 38
        const KEY_DOWN = 40
        const KEY_LEFT = 37
        const KEY_RIGHT = 39

        switch (params.key) {
          case KEY_DOWN:
            previousCell = params.previousCellDef
            // set selected cell on current cell + 1
            api.forEachNode(node => {
              if (previousCell.rowIndex + 1 === node.rowIndex) {
                node.setSelected(true)
              }
            })
            return suggestedNextCell
          case KEY_UP:
            previousCell = params.previousCellDef
            // set selected cell on current cell - 1
            api.forEachNode(node => {
              if (previousCell.rowIndex - 1 === node.rowIndex) {
                node.setSelected(true)
              }
            })
            return suggestedNextCell
          case KEY_LEFT:
          case KEY_RIGHT:
            return previousCell
          default:
            return suggestedNextCell
        }
      },
    }

    return childComponentProps
  }

  render() {
    return <DefaultSelection {...this.getChildComponentProps()} />
  }
}

export default connect((state, props) => ({
  apisExist: getApisExist(state, props),
  api: getApi(state, props),
}))(SelectionWithArrowKeys)
