import React from 'react'
import { bindActionCreators } from 'redux'
import { Field } from 'redux-form'
import { Input, Label } from 'semantic-ui-react'
import { LKIconButton } from 'shared/LKIconButton'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import { withConfig, configTypes } from 'shared'
import { translate } from '../../helpers'
import { AVG_ADDRS_THIRD } from '../../constants'
import { srchValueVal } from '../../validations'
import { formValueSelector, isFormFieldTouched } from '../../selectors'
import { obtainChangeField } from '../../actions'
import { ComponentContainer } from '../../../StyledComponents'

const switchType = (value, searchType, changeField) => {
  if (!value) {
    changeField('searchType', '0')
  } else if (!searchType) {
    if (isNaN(value)) changeField('searchType', '0')
    else if (!isNaN(value)) changeField('searchType', '1')
  } else if (searchType === '0') {
    if (!isNaN(value)) changeField('searchType', '1')
  } else if (searchType === '1') {
    if (isNaN(value)) changeField('searchType', '0')
  } else if (searchType === '2') {
    if (value.length > AVG_ADDRS_THIRD && !isNaN(value)) changeField('searchType', '1')
  }
}

const component = ({
  input,
  meta: { error, submitting, submitFailed, active },
  type,
  placeholder,
  setFiltersVisibility,
  searchType,
  searchTypeTouched,
  changeField,
}) => (
  <div>
    <ComponentContainer input>
      <Input
        {...input}
        fluid
        onChange={(_, { value }) => {
          if (!searchTypeTouched) {
            switchType(value, searchType, changeField)
          }
          input.onChange(value)
        }}
        onClick={() => {
          setFiltersVisibility(true)
        }}
        onFocus={e => {
          e.target.select()

          input.onFocus(e)
        }}
        type={type}
        action={
          <LKIconButton alias="binoculars" primary disabled={submitting}>
            {translate('cmd_find')}
          </LKIconButton>
        }
        size="large"
        loading={submitting}
        iconPosition="left"
        icon="search"
        error={submitFailed}
        placeholder={placeholder}
        autoFocus
      />
    </ComponentContainer>

    {active &&
      error && (
        <Label style={{ position: 'absolute', left: 62, zIndex: 1 }} basic color="red" pointing>
          {error}
        </Label>
      )}
  </div>
)

@flowRight(
  connect(
    (state, props) => ({
      searchType: formValueSelector(state, props, 'searchType'),
      searchTypeTouched: isFormFieldTouched(state, props, 'searchType'),
    }),
    (dispatch, { instanceName }) =>
      bindActionCreators(
        {
          changeField: obtainChangeField(instanceName),
        },
        dispatch,
      ),
  ),
  withConfig({
    type: configTypes.user,
    query: ['SearchLimit.Client as isClientSearchLimit', 'SearchLimit.Criteria as criteria'],
  }),
)
class ClientSearchInputAndSubmit extends React.Component {
  render() {
    const {
      isClientSearchLimit,
      criteria,
      setFiltersVisibility,
      searchType,
      searchTypeTouched,
      changeField,
    } = this.props

    return (
      <Field
        name="searchValue"
        component={component}
        type="text"
        placeholder={translate('lbl_search_criteria')}
        validate={srchValueVal(isClientSearchLimit, criteria)}
        setFiltersVisibility={setFiltersVisibility}
        searchType={searchType}
        searchTypeTouched={searchTypeTouched}
        changeField={changeField}
      />
    )
  }
}

export default ClientSearchInputAndSubmit
