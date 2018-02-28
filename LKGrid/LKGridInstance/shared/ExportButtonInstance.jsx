import React, { Component } from 'react'
import omit from 'lodash/omit'
import { LKIconButton } from 'shared/LKIconButton'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import { getApisExist, getApi } from '../store'

class ExportButtonInstance extends Component {
  onClick = () => {
    const { apisExist, api } = this.props

    console.log('clickkkkkkkkkkkkkkkk: ', apisExist, api)

    if (apisExist) {
      api.exportDataAsExcel()
    }
  }

  render() {
    const { disabled, caption, type } = this.props

    const restPropsForButton = omit(this.getCheckboxProps, [
      'dispatch',
      'instanceName',
      'getReducerRoot',
      'disabled',
      'caption',
      'type',
      'apisExist',
      'api',
    ])

    return (
      <LKIconButton alias="export" onClick={this.onClick} disabled={disabled} type={type} {...restPropsForButton}>
        {caption}
      </LKIconButton>
    )
  }
}
export default flowRight(
  connect((state, props) => {
    // console.log('ososososososo', props, state)

    return {
      apisExist: getApisExist(state, props),
      api: getApi(state, props),
      disabled: getApisExist(state, props) ? getApi(state, props).getModel().rowsToDisplay.length === 0 : true,
    }
  }),
)(ExportButtonInstance)
