import React from 'react'
import DisableableDropdownField from 'shared/FormFields/DisableableDropdownField'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import { withLookups, lookupTypes } from 'shared'

const obtainTags = (tags = []) =>
  tags.map(tag => ({
    id: tag.ID,
    title: tag.Title,
  }))

const makeOptions = choices =>
  choices.map((choice, index) => ({
    key: index.toString(),
    text: choice.title,
    value: choice.id,
  }))

@flowRight(
  withLookups({
    type: lookupTypes.search,
    query: ['Tags as tags'],
  }),
  connect((state, props) => ({
    choices: obtainTags(props.tags),
  })),
)
class ClientSearchTagFilter extends React.Component {
  render() {
    const { choices } = this.props

    if (!choices) {
      return null
    }

    const options = makeOptions(choices)

    return (
      <DisableableDropdownField
        name="tagId"
        options={options}
        disabilityCheckboxName="tagsDisabled"
        dropdownsShareOfWidth={14}
      />
    )
  }
}

export default ClientSearchTagFilter
