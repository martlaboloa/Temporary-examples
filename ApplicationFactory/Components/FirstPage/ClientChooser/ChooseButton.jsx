import React from 'react'
import flowRight from 'lodash/flowRight'
import { connect } from 'react-redux'
import { actions as LKModalActions } from 'shared/LKModal'
import withCondition from 'shared/containers/withCondition'
import { LKIconButton } from 'shared/LKIconButton'
import { translate } from '../../../helpers'
import { CLIENT_SEARCH_MODAL_NAME } from '../../../constants'
import { isApplicationIdentity } from '../../helpers'

const ChooseButton = ({ openClientSearch }) => {
  return (
    <LKIconButton type="button" alias="hand" onClick={openClientSearch}>
      {translate('cmd_select_client')}
    </LKIconButton>
  )
}

export default flowRight(
  withCondition(({ applicationIdentity }) => !isApplicationIdentity(applicationIdentity), () => null),
  connect(undefined, {
    openClientSearch: () => LKModalActions.open({ name: CLIENT_SEARCH_MODAL_NAME }),
  }),
)(ChooseButton)
