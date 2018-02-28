import React, { Component } from 'react'
import { connect } from 'react-redux'
import LKModal, { actions as LKModalActions } from 'shared/LKModal'
import CommitteeModal, { MODAL_NAME as COMMITTEE_MODAL } from 'shared/CommitteeModal'
import { APPLICATION_COMMITTEE_MODAL_NAME } from '../constants'
import { pushAppDetailsRoute } from '../helpers'

const ApplicationCommitteeConfirmationModal = connect(undefined, (dispatch, { setOnOpenPatams }) => ({
  onConfirm: params => {
    const { AppID, AppHash, ProductID, ProductHash, FullName } = params

    setOnOpenPatams(params)

    dispatch(LKModalActions.close(APPLICATION_COMMITTEE_MODAL_NAME))

    dispatch(
      LKModalActions.open({
        name: COMMITTEE_MODAL,
        AppID,
        AppHash,
        ProductID,
        ProductHash,
        FullName,
      }),
    )
  },
}))(props => {
  const { onConfirm } = props

  return (
    <LKModal.Confirmation
      name={APPLICATION_COMMITTEE_MODAL_NAME}
      onConfirm={onConfirm}
      onClose={({ params: { AppID, AppHash, AppScreening } }) => {
        pushAppDetailsRoute({ ID: AppID, HashSum_AppID_: AppHash, AppScreening })
      }}
    />
  )
})

class ApplicationAddCommitteeModal extends Component {
  state = { onOpenParams: null }

  setOnOpenParams = params => {
    this.setState({ onOpenParams: params })
  }

  pushAppDetailsRt = () => {
    const { onOpenParams: { AppID, AppHash, AppScreening } } = this.state

    pushAppDetailsRoute({ ID: AppID, HashSum_AppID_: AppHash, AppScreening })
  }

  render() {
    return [
      <ApplicationCommitteeConfirmationModal
        key="ApplicationCommitteeConfirmationModal"
        setOnOpenPatams={this.setOnOpenParams}
      />,
      <CommitteeModal key="CommitteeModal" onClose={this.pushAppDetailsRt} onSuccess={this.pushAppDetailsRt} />,
    ]
  }
}

export default ApplicationAddCommitteeModal
