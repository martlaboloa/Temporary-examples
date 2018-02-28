import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getFormSyncErrors,
  getFormAsyncErrors,
  getFormSubmitErrors,
  getFormError,
  submit as submitUndisp,
  isSubmitting,
  hasSubmitSucceeded,
} from 'redux-form'
import flowRight from 'lodash/flowRight'
import LKModal, { LKModalContainer, LKDynamicModalContainer } from 'shared/LKModal'
import addProp from 'shared/containers/addProp'
import { LKIconButton } from 'shared/LKIconButton'
import { FORM_NAME } from '../constants'
import { translate } from '../helpers'
import SeparatorIntoPages from '../shared/SeparatorIntoPages'
import {
  isClientViewBasePresentAndValid as isClientViewBasePresentAndValidSel,
  destroy as destroyUndisp,
  close as closeUndisp,
} from '../store'
import LKModalContent from './LKModalContent'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import ThirdPage from './ThirdPage'
import FourthPage from './FourthPage'

class SepComponent extends Component {
  submitButtonOnClick = () => {
    const { submit } = this.props

    submit()
  }

  render() {
    const {
      name,
      closeModal,
      isClientViewBasePresentAndValid,
      separatorIntoPages: { PreviousPageButton, NextPageButton },
      formSubmitting,
      formSubmitSucceeded,
    } = this.props

    return (
      <LKModal
        icon="application_add"
        name={name}
        heading={translate('frm_app_add_edit')}
        style={{ width: 1000, marginLeft: -520 }}
        onClose={closeModal}
      >
        <LKModal.Content style={{ padding: 0, minHeight: 549 }}>
          <LKModalContent {...this.props} />
        </LKModal.Content>

        <LKModal.Actions className="u-flex u-alignCenter">
          <PreviousPageButton />

          <div className="u-fluid" style={{ textAlign: 'center' }}>
            <LKIconButton
              onClick={this.submitButtonOnClick}
              alias="ok"
              disabled={!isClientViewBasePresentAndValid || formSubmitting || formSubmitSucceeded}
            >
              OK
            </LKIconButton>

            <LKIconButton onClick={closeModal} alias="cancel">
              {translate('cmd_cancel')}
            </LKIconButton>
          </div>

          <NextPageButton />
        </LKModal.Actions>
      </LKModal>
    )
  }
}

const ApplicationAdd = props => (
  <SeparatorIntoPages pages={[FirstPage, SecondPage, ThirdPage, FourthPage]} component={SepComponent} {...props} />
)

export default flowRight(
  addProp('name', ({ instanceName }) => instanceName),
  LKDynamicModalContainer(),

  connect(
    state => ({
      isClientViewBasePresentAndValid: isClientViewBasePresentAndValidSel(state),
      formSubmitting: isSubmitting(FORM_NAME)(state),
      formSubmitSucceeded: hasSubmitSucceeded(FORM_NAME)(state),
    }),
    (dispatch, props) => ({
      closeModal: () => {
        const { name } = props

        closeUndisp(dispatch, name)
      },
      ...bindActionCreators({ submit: () => submitUndisp(FORM_NAME) }, dispatch),
    }),
  ),
)(ApplicationAdd)
