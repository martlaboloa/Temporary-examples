import React from 'react'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import { getNotFetched } from 'shared/SimpleFetchManager'
import { LKIconLabel } from 'shared/LKIconButton'
import transformProps from 'shared/containers/transformProps'
import withCondition from 'shared/containers/withCondition'
import { CLIENT_VIEW_BASE_FETCHER_NAME } from '../../../constants'
import { isClientViewBasePresentAndValid as isClientViewBasePresentAndValidSel } from '../../../store'

const HintIcon = ({ alias }) => {
  return <LKIconLabel alias={alias} style={{ marginTop: -3 }} nobg />
}

export default flowRight(
  connect(state => ({
    clientViewBaseNotFetched:
      getNotFetched(CLIENT_VIEW_BASE_FETCHER_NAME)(state) === true ||
      getNotFetched(CLIENT_VIEW_BASE_FETCHER_NAME)(state) === undefined,
    isClientViewBasePresentAndValid: isClientViewBasePresentAndValidSel(state),
  })),
  withCondition(({ clientViewBaseNotFetched }) => !clientViewBaseNotFetched, () => null),
  transformProps(({ isClientViewBasePresentAndValid }) => ({
    alias: isClientViewBasePresentAndValid ? 'ok' : 'question',
  })),
)(HintIcon)
