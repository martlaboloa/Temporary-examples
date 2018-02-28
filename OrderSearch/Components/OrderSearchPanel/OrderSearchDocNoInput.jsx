import React from 'react'
import { Field } from 'redux-form'
import { Grid, Input } from 'semantic-ui-react'
import { ComponentContainer } from 'shared/StyledComponents'
import { translate } from '../../helpers'
import { GridContainer } from 'shared/StyledComponents'

const component = ({ input, meta: { submitting }, type }) => (
  <Input
    fluid
    value={input.value}
    onChange={(_, { value }) => input.onChange(value)}
    onFocus={e => e.target.select()}
    type={type}
    loading={submitting}
    autoFocus
  />
)

const OrderSearchDocNoInput = () => (
  <GridContainer>
    <Grid>
      <Grid.Row>
        <Grid.Column width={8} textAlign="right" verticalAlign="middle">
          {translate('lbl_docno')}
        </Grid.Column>
        <Grid.Column width={8} verticalAlign="middle">
          <ComponentContainer input>
            <Field name="docNo" component={component} type="text" />
          </ComponentContainer>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </GridContainer>
)

export default OrderSearchDocNoInput
