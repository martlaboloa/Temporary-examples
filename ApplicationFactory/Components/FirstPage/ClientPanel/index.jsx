import React from 'react'
import { Grid } from 'semantic-ui-react'
import { PlainTextContainer, GridContainer } from 'shared/StyledComponents'
import ClientAddButton from './ClientAddButton'
import ShowClientLoansButton from './ShowClientLoansButton'
import ClientStatus from './ClientStatus'

const ClientPanel = ({ productViewDetail: { Client_ReqField_GroupID }, clientViewBase, applicationIdentity }) => {
  return (
    <PlainTextContainer>
      <GridContainer>
        <Grid>
          <Grid.Row>
            <ClientAddButton
              clientReqFieldGroupID={Client_ReqField_GroupID}
              applicationIdentity={applicationIdentity}
            />

            <ShowClientLoansButton clientViewBase={clientViewBase} />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column style={{ paddingLeft: 0 }} width={16}>
              <ClientStatus />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </GridContainer>
    </PlainTextContainer>
  )
}

export default ClientPanel
