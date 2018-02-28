import React, { Component } from 'react'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { reduxForm, getFormInitialValues, registerField, unregisterField } from 'redux-form'
import flowRight from 'lodash/flowRight'
import { Grid } from 'semantic-ui-react'
import { GridContainer } from 'shared/StyledComponents'
import addProp from 'shared/containers/addProp'
import { FormLayout } from 'shared/newFormElements'
import { FORM_NAME } from '../../constants'
import ProductID from './ProductID'
import ClientChooser from './ClientChooser'
import ClientPanel from './ClientPanel'
import IndustryID from './IndustryID'
import IndustrySubID from './IndustrySubID'
import BusinessType from './BusinessType'
import Startup from './Startup'
import RepaymentSourceID from './RepaymentSourceID'
import { translate } from '../../helpers'
import ClientSearchModal from './ClientSearchModal'

class FirstPage extends Component {
  render() {
    const {
      productViewDetail,
      productIDOptions,
      industryIDOptions,
      industrySubIDOptions,
      startupOptions,
      repaymentSourceIDOptions,
      clientViewBase,
      generalLookupsSys,
    } = this.props
    const applicationIdentity = get(this.props, 'params.applicationIdentity')

    return (
      <div className="u-paddingLeft-5 u-paddingRight-5">
        <ClientSearchModal productViewDetail={productViewDetail} />

        <GridContainer>
          <FormLayout labelFieldProportions="4:5" label={translate('lbl_product_t')}>
            <ProductID options={productIDOptions} productViewDetail={productViewDetail} {...this.props} />
          </FormLayout>

          <hr size="1" color="lightgray" style={{ margin: 5 }} />

          <Grid>
            <Grid.Column width={1} />

            <Grid.Column width={6}>
              <ClientChooser productViewDetail={productViewDetail} applicationIdentity={applicationIdentity} />
            </Grid.Column>

            <Grid.Column width={8}>
              <ClientPanel
                productViewDetail={productViewDetail}
                clientViewBase={clientViewBase}
                applicationIdentity={applicationIdentity}
              />
            </Grid.Column>

            <Grid.Column width={1} />
          </Grid>

          <hr size="1" color="lightgray" style={{ margin: 5 }} />

          <FormLayout label={translate('lbl_industry')}>
            <IndustryID
              options={industryIDOptions}
              generalLookupsSys={generalLookupsSys}
              applicationIdentity={applicationIdentity}
            />
            <IndustrySubID options={industrySubIDOptions} />
          </FormLayout>

          <FormLayout labelFieldProportions="4:6" label={translate('lbl_client_bustype')}>
            <BusinessType />
          </FormLayout>

          <FormLayout labelFieldProportions="4:6" label={translate('lbl_startup')}>
            <Startup options={startupOptions} />
          </FormLayout>

          <hr size="1" color="lightgray" style={{ margin: 5 }} />

          <FormLayout labelFieldProportions="4:6" label={translate('lbl_repayment_source')}>
            <RepaymentSourceID options={repaymentSourceIDOptions} />
          </FormLayout>
        </GridContainer>
      </div>
    )
  }
}

export default flowRight()(FirstPage)
