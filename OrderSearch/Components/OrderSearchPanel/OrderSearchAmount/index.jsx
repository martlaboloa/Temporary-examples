import React from 'react'
import { Grid } from 'semantic-ui-react'
import { GridContainer } from 'shared/StyledComponents'
import DisabilityCheckboxField from '../../../../preshared/Fields/DisabilityCheckboxField'
import { translate } from '../../../helpers'
import AmountMin from './AmountMin'
import AmountMax from './AmountMax'

const OrderSearchAmount = () => (
  <GridContainer>
    <Grid>
      <Grid.Row>
        <Grid.Column width={7} verticalAlign="middle">
          <DisabilityCheckboxField name="amount.disabled" label={translate('chk_amount')} />
        </Grid.Column>

        <Grid.Column width={5}>
          <AmountMin />
        </Grid.Column>

        <Grid.Column width={4}>
          <AmountMax />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </GridContainer>
)

export default OrderSearchAmount
