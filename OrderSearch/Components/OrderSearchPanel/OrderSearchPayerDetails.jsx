import React from 'react'
import { Field } from 'redux-form'
import { Input, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { GridContainer, ComponentContainer } from 'shared/StyledComponents'
import DisabilityCheckboxField from '../../../preshared/Fields/DisabilityCheckboxField'
import { translate } from '../../helpers'
import { formValueSelector } from '../../selectors'

const component = ({ input, meta: { submitting }, type, disabled }) => (
  <ComponentContainer input>
    <Input
      fluid
      {...input}
      onChange={(_, { value }) => input.onChange(value)}
      onFocus={e => e.target.select()}
      type={type}
      loading={submitting}
      disabled={disabled}
    />
  </ComponentContainer>
)

@connect(state => ({
  disabled: formValueSelector(state, 'payerDetails.disabled'),
}))
class OrderSearchPayerDetails extends React.Component {
  render() {
    const { disabled } = this.props

    return (
      <GridContainer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={7} verticalAlign="middle">
              <DisabilityCheckboxField name="payerDetails.disabled" label={translate('chk_payer')} />
            </Grid.Column>

            <Grid.Column width={9}>
              <Field name="payerDetails.value" component={component} type="text" disabled={disabled} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </GridContainer>
    )
  }
}

export default OrderSearchPayerDetails
