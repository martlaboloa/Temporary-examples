import React from 'react'
import { Field } from 'redux-form'
import { Grid, Input } from 'semantic-ui-react'
import { ComponentContainer } from 'shared/StyledComponents'
import { GridContainer } from 'shared/StyledComponents'

const component = ({ input, meta: { submitting }, type }) => (
  <Input
    fluid
    value={input.value}
    onChange={(_, { value }) => input.onChange(value)}
    onFocus={e => e.target.select()}
    type={type}
    loading={submitting}
  />
)

const OrderSearchIDInput = () => (
  <GridContainer>
    <Grid>
      <Grid.Row>
        <Grid.Column width={4} textAlign="right" verticalAlign="middle">
          ID
        </Grid.Column>
        <Grid.Column width={12} verticalAlign="middle">
          <ComponentContainer input>
            <Field name="ID" component={component} type="text" />
          </ComponentContainer>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </GridContainer>
)

export default OrderSearchIDInput
