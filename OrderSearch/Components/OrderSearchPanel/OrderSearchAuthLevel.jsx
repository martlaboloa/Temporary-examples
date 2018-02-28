import React from 'react'
import { Field, change } from 'redux-form'
import { connect } from 'react-redux'
import { List, Checkbox } from 'semantic-ui-react'
import filter from 'lodash/filter'
import reduce from 'lodash/reduce'
import { LKIconCheckbox } from 'shared/LKIconButton'
import { translate } from '../../helpers'
import { RF_NAME } from '../../constants'
import { formValueSelector } from '../../selectors'

const component = ({ input: { value, onChange, name }, label, authLevel, changeField }) => (
  <Checkbox
    label={label}
    onChange={(unused1, { checked }) => {
      const immediateName = name.split('.')[1]

      const tryingDeselectAll =
        !checked &&
        reduce(filter(authLevel, (unused2, key) => key !== immediateName), (result, val) => result && !val, true)

      if (tryingDeselectAll) {
        changeField(RF_NAME, 'authLevel.notAuthorized', true)
        changeField(RF_NAME, 'authLevel.partiallyAuthorized', true)
        changeField(RF_NAME, 'authLevel.authorized', true)
      } else {
        onChange(checked)
      }
    }}
    checked={value}
  />
)

@connect(
  state => ({
    authLevel: formValueSelector(state, 'authLevel'),
  }),
  { changeField: change },
)
class OrderSearchAuthLevel extends React.Component {
  render() {
    const { authLevel, changeField } = this.props

    return (
      <List>
        <List.Item>
          <Field
            name="authLevel.notAuthorized"
            component={component}
            authLevel={authLevel}
            changeField={changeField}
            label={
              <label>
                <LKIconCheckbox alias="square_red">{translate('chk_level0')}</LKIconCheckbox>
              </label>
            }
          />
        </List.Item>

        <List.Item>
          <Field
            name="authLevel.partiallyAuthorized"
            component={component}
            label={
              <label>
                <LKIconCheckbox alias="square_yellow">{translate('chk_level1')}</LKIconCheckbox>
              </label>
            }
            authLevel={authLevel}
            changeField={changeField}
          />
        </List.Item>

        <List.Item>
          <Field
            name="authLevel.authorized"
            component={component}
            authLevel={authLevel}
            changeField={changeField}
            label={
              <label>
                <LKIconCheckbox alias="square_green">{translate('chk_level2')}</LKIconCheckbox>
              </label>
            }
          />
        </List.Item>
      </List>
    )
  }
}

export default OrderSearchAuthLevel
