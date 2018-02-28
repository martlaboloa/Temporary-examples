import React from 'react'
import { Field } from 'redux-form'
import { List, Grid, Checkbox } from 'semantic-ui-react'
import { LKIconCheckbox } from 'shared/LKIconButton'
import Checkbox3 from 'shared/Checkbox3/index'
import { translate } from '../../helpers'

const CheckboxComp = ({ input, label, disabled }) => (
  <div>
    <Checkbox
      label={label}
      disabled={disabled}
      onChange={(_, { checked }) => {
        input.onChange(checked)
      }}
      checked={input.value}
    />
  </div>
)

const Check3Comp = ({ input, label, disabled }) => (
  <div>
    <Checkbox3
      label={label}
      disabled={disabled}
      onChange={(_, { checkboxState }) => {
        input.onChange(checkboxState)
      }}
      checkboxState={input.value}
    />
  </div>
)

const ClientSearchCategorySafety = ({
  searchPanelConfig: {
    fieldsDisability: {
      categ: { individuals, solidarityGroups, companies },
      safety: { insured, watched, blacklisted },
    },
  },
}) => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={8}>
        <List>
          <List.Item>
            <Field
              name="categ.individuals"
              component={CheckboxComp}
              disabled={individuals}
              label={
                <label>
                  <LKIconCheckbox alias="client">{translate('chk_individuals')}</LKIconCheckbox>
                </label>
              }
            />
          </List.Item>
          <List.Item>
            <Field
              name="categ.solidarityGroups"
              component={CheckboxComp}
              disabled={solidarityGroups}
              label={
                <label>
                  <LKIconCheckbox alias="users">{translate('chk_groups')}</LKIconCheckbox>
                </label>
              }
            />
          </List.Item>
          <List.Item>
            <Field
              name="categ.companies"
              component={CheckboxComp}
              disabled={companies}
              label={
                <label>
                  <LKIconCheckbox alias="organisation">{translate('chk_companies')}</LKIconCheckbox>
                </label>
              }
            />
          </List.Item>
        </List>
      </Grid.Column>

      <Grid.Column width={8}>
        <List>
          <List.Item>
            <Field
              name="safety.insured"
              component={Check3Comp}
              disabled={insured}
              label={
                <label>
                  <LKIconCheckbox alias="life_ring">{translate('chk_insured')}</LKIconCheckbox>
                </label>
              }
            />
          </List.Item>
          <List.Item>
            <Field
              name="safety.watched"
              component={Check3Comp}
              disabled={watched}
              label={
                <label>
                  <LKIconCheckbox alias="alert">{translate('chk_watched')}</LKIconCheckbox>
                </label>
              }
            />
          </List.Item>
          <List.Item>
            <Field
              name="safety.blacklisted"
              component={Check3Comp}
              disabled={blacklisted}
              label={
                <label>
                  <LKIconCheckbox alias="skull">{translate('chk_blacked')}</LKIconCheckbox>
                </label>
              }
            />
          </List.Item>
        </List>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default ClientSearchCategorySafety
