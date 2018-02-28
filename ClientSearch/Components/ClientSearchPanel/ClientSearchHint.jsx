import React from 'react'
import styled from 'styled-components'
import colors from 'shared/colors'
import { withConfig, configTypes } from 'shared'
import { translate } from '../../helpers'

const Wrapper = styled.div`
  margin: auto;
  width: 50%;
  font-weight: bold;
  text-align: center;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.4);
  border: 1px solid ${colors.red};
  color: ${colors.red};
`
@withConfig({
  type: configTypes.user,
  query: ['SearchLimit.Client as isClientSearchLimit', 'SearchLimit.Top as top'],
})
class ClientSearchHint extends React.Component {
  render() {
    const { top, isClientSearchLimit } = this.props

    if (!isClientSearchLimit || top <= 0) {
      return null
    }

    return <Wrapper>{translate('lbl_top_rec_t').replace('%d', top)}</Wrapper>
  }
}

export default ClientSearchHint
