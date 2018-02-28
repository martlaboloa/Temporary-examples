import React from 'react'
import { Grid } from 'semantic-ui-react'
import { PlainTextContainer, GridContainer } from 'shared/StyledComponents'
import ChooseButton from './ChooseButton'
import CardNumberInput from './CardNumberInput'
import FullName from './FullName'
import HintIcon from './HintIcon'

const ClientChooser = ({ applicationIdentity, productViewDetail }) => {
  return (
    <PlainTextContainer>
      <GridContainer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <ChooseButton applicationIdentity={applicationIdentity} />
            </Grid.Column>

            <Grid.Column width={8}>
              <CardNumberInput applicationIdentity={applicationIdentity} productViewDetail={productViewDetail} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={14}>
              <FullName />
            </Grid.Column>

            <Grid.Column width={2}>
              <HintIcon />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </GridContainer>
    </PlainTextContainer>
  )
}

export default ClientChooser
