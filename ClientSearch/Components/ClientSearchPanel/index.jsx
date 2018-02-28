import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'
import { GridContainer, SearchContainerForm } from 'shared/StyledComponents'
import { withPreFunction } from 'helpers'
import SpaceSaver from 'shared/SpaceSaver'
import container from './container'
import HintAbove from './HintAbove'
import ClientSearchInputType from './ClientSearchInputType'
import ClientSearchInputAndSubmit from './ClientSearchInputAndSubmit'
import ClientSearchDateFilter from './ClientSearchDateFilter'
import ClientSearchCategorySafety from './ClientSearchCategorySafety'
import ClientSearchTagFilter from './ClientSearchTagFilter'
import ClientSearchHint from './ClientSearchHint'

const SpaceSaverComponent = ({
  spaceSaver: { visibility, setVisibility, visibilityButton },
  instanceName,
  handleSubmit,
  searchPanelConfig,
}) => (
  <SearchContainerForm onSubmit={withPreFunction(handleSubmit, setVisibility, [false])}>
    <Segment style={{ padding: '5px', marginBottom: '10px' }}>
      <GridContainer>
        <Grid>
          <Grid.Row>
            <HintAbove searchPanelConfig={searchPanelConfig} />

            <Grid.Column width={10} verticalAlign="middle">
              <ClientSearchInputType instanceName={instanceName} setFiltersVisibility={setVisibility} />
            </Grid.Column>

            <Grid.Column width={6} textAlign="center">
              <GridContainer>
                <Grid>
                  <Grid.Row>
                    <div className="u-fluid u-marginRight-5">
                      <ClientSearchInputAndSubmit instanceName={instanceName} setFiltersVisibility={setVisibility} />
                    </div>

                    {visibilityButton}
                  </Grid.Row>
                </Grid>
              </GridContainer>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </GridContainer>
    </Segment>
    {visibility && (
      <Segment style={{ padding: '5px' }}>
        <GridContainer>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column width={5}>
                <ClientSearchDateFilter instanceName={instanceName} searchPanelConfig={searchPanelConfig} />
              </Grid.Column>

              <Grid.Column width={7}>
                <ClientSearchCategorySafety instanceName={instanceName} searchPanelConfig={searchPanelConfig} />
              </Grid.Column>

              <Grid.Column width={4}>
                <ClientSearchTagFilter instanceName={instanceName} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <ClientSearchHint instanceName={instanceName} />
            </Grid.Row>
          </Grid>
        </GridContainer>
      </Segment>
    )}
  </SearchContainerForm>
)

@container
class ClientSearchPanel extends React.Component {
  render() {
    const { instanceName, handleSubmit, searchPanelConfig } = this.props
    return (
      <SpaceSaver
        component={SpaceSaverComponent}
        instanceName={instanceName}
        handleSubmit={handleSubmit}
        searchPanelConfig={searchPanelConfig}
      />
    )
  }
}

ClientSearchPanel.defaultProps = {
  searchPanelConfig: {
    initialValues: {},
    fieldsDisability: {
      searchType: false,
      searchValue: false,
      dateFilter: false,
      categ: {
        individuals: false,
        solidarityGroups: false,
        companies: false,
      },
      safety: {
        insured: false,
        watched: false,
        blacklisted: false,
      },
      tagsDisabled: false,
      tagId: false,
    },
  },
}

ClientSearchPanel.propTypes = {
  searchPanelConfig: PropTypes.shape({
    initialValues: PropTypes.shape({
      searchType: PropTypes.string,
      searchValue: PropTypes.string,
      dateFilter: PropTypes.string,
      categ: PropTypes.shape({
        individuals: PropTypes.bool,
        solidarityGroups: PropTypes.bool,
        companies: PropTypes.bool,
      }),
      safety: PropTypes.shape({
        insured: PropTypes.oneOf([0, 1, 2]),
        watched: PropTypes.oneOf([0, 1, 2]),
        blacklisted: PropTypes.oneOf([0, 1, 2]),
      }),
      tagsDisabled: PropTypes.bool,
      tagId: PropTypes.number,
    }),
    fieldsDisability: PropTypes.shape({
      searchType: PropTypes.bool,
      searchValue: PropTypes.bool,
      dateFilter: PropTypes.bool,
      categ: PropTypes.shape({
        individuals: PropTypes.bool,
        solidarityGroups: PropTypes.bool,
        companies: PropTypes.bool,
      }),
      safety: PropTypes.shape({
        insured: PropTypes.bool,
        watched: PropTypes.bool,
        blacklisted: PropTypes.bool,
      }),
      tagsDisabled: PropTypes.bool,
      tagId: PropTypes.bool,
    }),
    hintAboveMessage: PropTypes.string,
  }),
}

export default ClientSearchPanel
