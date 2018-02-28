import React, { Component } from 'react'
import styled from 'styled-components'
import isString from 'lodash/isString'
import colors from '../../../../shared/colors'
import withCondition from '../../../../shared/containers/withCondition'

const Wrapper = styled.div`
  margin: auto;
  width: 50%;
  heigh: 40px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.4);
  border: 1px solid ${colors.red};
  color: ${colors.red};
  padding: 2px;
  margin-bottom: 10px;
`

class HintAbove extends Component {
  render() {
    const { searchPanelConfig: { hintAboveMessage } } = this.props

    return <Wrapper>{hintAboveMessage}</Wrapper>
  }
}

export default withCondition(({ searchPanelConfig }) => isString(searchPanelConfig.hintAboveMessage), () => null)(
  HintAbove,
)
