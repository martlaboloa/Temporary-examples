import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import { withPreFunction } from 'helpers'
import SpaceSaver from 'shared/SpaceSaver'
import withLivedata from 'shared/containers/withLivedata'
import transformProps from 'shared/containers/transformProps'
import { Container, SegmentGroup, GridContainer, SearchContainerForm } from 'shared/StyledComponents'
import { RFInitialValues } from '../../constants'
import container from './container'

import OrderSearchSubmitButton from './OrderSearchSubmitButton'
import OrderSearchPayerDetails from './OrderSearchPayerDetails'
import OrderSearchOperTypeID from './OrderSearchOperTypeID'
import OrderSearchOperCodeID from './OrderSearchOperCodeID'
import OrderSearchOIDInput from './OrderSearchOIDInput'
import OrderSearchIDInput from './OrderSearchIDInput'
import OrderSearchHint from './OrderSearchHint'
import OrderSearchHasUserAuth from './OrderSearchHasUserAuth'
import OrderSearchEntryAuthorID from './OrderSearchEntryAuthorID'
import OrderSearchDocNoInput from './OrderSearchDocNoInput'
import OrderSearchDateComponents from './OrderSearchDateComponents'
import OrderSearchCurrency from './OrderSearchCurrency'
import OrderSearchCreatorTypeID from './OrderSearchCreatorTypeID'
import OrderSearchComment from './OrderSearchComment'
import OrderSearchBorrowerName from './OrderSearchBorrowerName'
import OrderSearchAuthLevel from './OrderSearchAuthLevel'
import OrderSearchDebit from './OrderSearchDebit'
import OrderSearchCredit from './OrderSearchCredit'
import OrderSearchAmount from './OrderSearchAmount'

const SubmitButtonContainer = styled.div`
  .ui.tiny.button {
    background: ${props => props.theme.primaryColor} !important;
  }

  .ui.tiny.button:hover,
  .ui.tiny.buttons .button:hover {
    background: ${props => props.theme.primaryColorHover} !important;
  }
`

const SpaceSaverComponent = ({ handleSubmit, spaceSaver: { visibility, setVisibility, visibilityButton } }) => (
  <SearchContainerForm onSubmit={withPreFunction(handleSubmit, setVisibility, [false])} style={{ width: '100%' }}>
    <Container>
      <SegmentGroup visableOverflow>
        <Segment.Group>
          <Segment>
            <GridContainer>
              <Grid>
                <Grid.Row verticalAlign="middle">
                  <Grid.Column width={6} textAlign="right" verticalAlign="middle">
                    <OrderSearchDateComponents />
                  </Grid.Column>

                  <Grid.Column width={3} textAlign="right" verticalAlign="middle">
                    <OrderSearchDocNoInput />
                  </Grid.Column>

                  <Grid.Column width={2} textAlign="right" verticalAlign="middle">
                    <OrderSearchOIDInput />
                  </Grid.Column>

                  <Grid.Column width={2} textAlign="right" verticalAlign="middle">
                    <OrderSearchIDInput />
                  </Grid.Column>

                  <SubmitButtonContainer className="u-flexCenter u-fluid u-marginLeft-5 u-marginRight-5">
                    <OrderSearchSubmitButton />
                    {visibilityButton}
                  </SubmitButtonContainer>
                </Grid.Row>
              </Grid>
            </GridContainer>
          </Segment>
          {visibility && (
            <Segment>
              <GridContainer>
                <Grid>
                  <Grid.Row>
                    <Grid.Column className="u-flex u-directionColumn" width={4}>
                      <OrderSearchAuthLevel />
                      <OrderSearchHint />
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <OrderSearchEntryAuthorID />
                      <OrderSearchHasUserAuth />
                      <OrderSearchComment />
                      <OrderSearchDebit />
                      <OrderSearchAmount />
                      <OrderSearchPayerDetails />
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <OrderSearchCreatorTypeID />
                      <OrderSearchOperTypeID />
                      <OrderSearchOperCodeID />
                      <OrderSearchCredit />
                      <OrderSearchCurrency />
                      <OrderSearchBorrowerName />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </GridContainer>
            </Segment>
          )}
        </Segment.Group>
      </SegmentGroup>
    </Container>
  </SearchContainerForm>
)

@withLivedata({ query: 'OpenDayStatus[0].Open_Day_Str as OpenDay' })
@transformProps(({ OpenDay, ...rest }) => ({
  ...rest,
  initialValues: { ...RFInitialValues, startDate: OpenDay, endDate: OpenDay },
}))
@container
class OrderSearchPanel extends React.Component {
  render() {
    const { handleSubmit } = this.props

    return <SpaceSaver component={SpaceSaverComponent} handleSubmit={handleSubmit} />
  }
}

export default OrderSearchPanel
