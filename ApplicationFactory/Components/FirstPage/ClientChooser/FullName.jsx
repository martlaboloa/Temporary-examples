import React from 'react'
import flowRight from 'lodash/flowRight'
import { connect } from 'react-redux'
import transformProps from 'shared/containers/transformProps'
import { PlainTextContainer } from 'shared/StyledComponents'
import { translate } from '../../../helpers'
import {
  isClientViewBasePresentAndValid as isClientViewBasePresentAndValidSel,
  getClientViewBase,
} from '../../../store'

const FullName = ({ text }) => {
  return <PlainTextContainer style={{ color: 'red' }}>{text}</PlainTextContainer>
}

export default flowRight(
  connect(state => ({
    isClientViewBasePresentAndValid: isClientViewBasePresentAndValidSel(state),
    clientViewBase: getClientViewBase(state),
  })),
  transformProps(({ isClientViewBasePresentAndValid, clientViewBase }) => ({
    text: isClientViewBasePresentAndValid ? clientViewBase.FullName : translate('lbl_select_client'),
  })),
)(FullName)
