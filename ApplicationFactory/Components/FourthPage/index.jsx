import React, { Component } from 'react'
import flowRight from 'lodash/flowRight'
import { reduxForm } from 'redux-form'
import { Grid } from 'semantic-ui-react'
import addProp from 'shared/containers/addProp'
import { GridContainer } from 'shared/StyledComponents'
import { FORM_NAME } from '../../constants'
import { translate } from '../../helpers'
import ProjectDescription from './ProjectDescription'
import CField1 from './CField1'
import CField2 from './CField2'
import CField3 from './CField3'
import CField4 from './CField4'

class FourthPage extends Component {
  render() {
    return (
      <GridContainer style={{ padding: 10 }}>
        <Grid>
          <Grid.Row className="u-flexCenter">
            <span className="u-marginBottom-5">{translate('lbl_project_description')}</span>
            <ProjectDescription />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <p style={{ textAlign: 'center', marginBottom: 5 }}>{translate('lbl_cfield1')}</p>
              <CField1 />

              <p style={{ textAlign: 'center', marginBottom: 5, marginTop: 10 }}>{translate('lbl_cfield3')}</p>
              <CField3 />
            </Grid.Column>

            <Grid.Column width={8}>
              <p style={{ textAlign: 'center', marginBottom: 5 }}>{translate('lbl_cfield2')}</p>
              <CField2 />

              <p style={{ textAlign: 'center', marginBottom: 5, marginTop: 10 }}>{translate('lbl_cfield4')}</p>
              <CField4 />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </GridContainer>
    )
  }
}

export default flowRight()(FourthPage)
