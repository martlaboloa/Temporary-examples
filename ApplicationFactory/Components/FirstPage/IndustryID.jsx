import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import flowRight from 'lodash/flowRight'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import SemanticDropdownAutoFocus from '../../../Helpers/SemanticDropdownAutoFocus'
import DropdownField from '../../../../shared/FormFields/DropdownField'
import addProp from '../../../../shared/containers/addProp'
import { FORM_NAME } from '../../constants'
import {
  getDropdownFirstValue,
  getIndustrySubIDOptionsSource,
  getIndustrySubIDOptionsFromSource,
  isApplicationIdentity,
} from '../helpers'
import { industrySubIDOptionsSourceSet as industrySubIDOptionsSourceSetUndisp } from '../../store'

class IndustryID extends Component {
  onChange = (event, newValue) => {
    const { changeField, generalLookupsSys, industrySubIDOptionsSourceSet } = this.props

    const industrySubIDOptionsSource = getIndustrySubIDOptionsSource(generalLookupsSys, newValue)

    const industrySubIDOptions = getIndustrySubIDOptionsFromSource(industrySubIDOptionsSource)

    industrySubIDOptionsSourceSet(industrySubIDOptionsSource)

    if (!isEmpty(industrySubIDOptionsSource)) {
      changeField('IndustrySubID', getDropdownFirstValue(industrySubIDOptions))
    }
  }

  render() {
    const { options, autoFocus } = this.props

    return (
      <SemanticDropdownAutoFocus autoFocus={autoFocus}>
        <DropdownField name="IndustryID" options={options} onChange={this.onChange} openOnFocus={false} />
      </SemanticDropdownAutoFocus>
    )
  }
}

export default flowRight(
  connect(undefined, {
    changeField: (...args) => change(FORM_NAME, ...args),
    industrySubIDOptionsSourceSet: industrySubIDOptionsSourceSetUndisp,
  }),
  addProp('autoFocus', ({ applicationIdentity }) => isApplicationIdentity(applicationIdentity)),
)(IndustryID)
