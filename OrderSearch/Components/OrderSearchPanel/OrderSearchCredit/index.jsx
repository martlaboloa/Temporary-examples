import React from 'react'
import { Grid } from 'semantic-ui-react'
import { GridContainer } from 'shared/StyledComponents'
import DisabilityCheckboxField from '../../../../preshared/Fields/DisabilityCheckboxField'
import { translate } from '../../../helpers'
import BalCodeID from './BalCodeID'
import BalCodeIDSearch from './BalCodeIDSearch'
import AccNo from './AccNo'

const OrderSearchCredit = () => (
  <GridContainer>
    <Grid>
      <Grid.Row>
        <Grid.Column width={7} verticalAlign="middle">
          <DisabilityCheckboxField name="credit.disabled" label={translate('chk_credit')} />
        </Grid.Column>

        <Grid.Column width={4}>
          <BalCodeID />
        </Grid.Column>

        {/* <Grid.Column width={2} textAlign="center">
          <BalCodeIDSearch />
        </Grid.Column> */}

        <Grid.Column width={5}>
          <AccNo />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </GridContainer>
)

export default OrderSearchCredit
