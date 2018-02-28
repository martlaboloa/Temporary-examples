import React from 'react'
import { change } from 'redux-form'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import { Grid, Button } from 'semantic-ui-react'
import { withLivedata } from 'shared'
import { LKIconButton } from 'shared/LKIconButton'
import FormField from 'shared/newFormElements'
import { ComponentContainer, GridContainer } from 'shared/StyledComponents'
import { translate } from '../../helpers'
import { RF_NAME } from '../../constants'

@flowRight(
  withLivedata({
    query: ['OpenDayStatus[0].Open_Day_Str as openDayStr'],
  }),
  connect(undefined, { changeField: change }),
)
class OrderSearchDateComponents extends React.Component {
  render() {
    const { openDayStr, changeField } = this.props

    return (
      <GridContainer>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3} textAlign="right" verticalAlign="middle">
              {translate('lbl_entry_date')}
            </Grid.Column>
            <Grid.Column width={5} verticalAlign="middle">
              <ComponentContainer calendar>
                <FormField type="range-date-picker-first-input" name="startDate" />
              </ComponentContainer>
            </Grid.Column>
            <Grid.Column width={3} verticalAlign="middle">
              <Button.Group size="tiny" fluid icon>
                <LKIconButton type="button" alias="period" />

                <LKIconButton
                  alias="pin"
                  type="button"
                  onClick={() => {
                    changeField(RF_NAME, 'startDate', openDayStr)
                    changeField(RF_NAME, 'endDate', openDayStr)
                  }}
                />
              </Button.Group>
            </Grid.Column>

            <Grid.Column width={5} verticalAlign="middle">
              <ComponentContainer calendar>
                <FormField form={RF_NAME} type="range-date-picker" startDateName="startDate" endDateName="endDate" />
              </ComponentContainer>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </GridContainer>
    )
  }
}

export default OrderSearchDateComponents
