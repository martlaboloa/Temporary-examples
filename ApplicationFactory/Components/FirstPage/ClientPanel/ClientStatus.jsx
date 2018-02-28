import React from 'react'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import { PlainTextContainer } from 'shared/StyledComponents'
import transformProps from 'shared/containers/transformProps'
import {
  isClientViewBasePresentAndValid as isClientViewBasePresentAndValidSel,
  getClientViewBase,
} from '../../../store'
import { translate } from '../../../helpers'

const ClientStatus = ({ text }) => {
  return <PlainTextContainer style={{ color: 'red' }}>{text}</PlainTextContainer>
}

export default flowRight(
  connect(state => ({
    isClientViewBasePresentAndValid: isClientViewBasePresentAndValidSel(state),
    clientViewBase: getClientViewBase(state),
  })),
  transformProps(({ isClientViewBasePresentAndValid, clientViewBase }) => ({
    text: isClientViewBasePresentAndValid && clientViewBase.Watched === 1 ? translate('lbl_client_watched') : '',
  })),
)(ClientStatus)
