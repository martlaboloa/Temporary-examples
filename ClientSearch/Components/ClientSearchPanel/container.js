import React from 'react'
import flowRight from 'lodash/flowRight'
import cloneDeep from 'lodash/cloneDeep'
import { reduxForm } from 'redux-form'
import merge from 'lodash/merge'
import { fetchSFM } from 'shared/SimpleFetchManager'
import { Client } from 'WebAPI'
import transformProps from 'shared/containers/transformProps'
import { RFInitialValues } from '../../constants'

const defSearchField = searchField => {
  switch (searchField) {
    case '0':
      return 'name'
    case '1':
      return 'personalno'
    default:
      return 'address'
  }
}

const defSearchFlags = (
  dateFilter,
  { individuals, solidarityGroups, companies },
  { insured, watched, blacklisted },
) => {
  const categToBit = val => (val ? '1' : '0')
  const check3ToBit = val => val.toString()

  const searchFlags =
    categToBit(individuals) +
    categToBit(solidarityGroups) +
    categToBit(companies) +
    check3ToBit(watched) +
    check3ToBit(blacklisted) +
    check3ToBit(insured) +
    (dateFilter === '0' ? '1' : '2')
  return searchFlags
}

const valuesToData = ({ searchType, searchValue, dateFilter, categ, safety, tagsDisabled, tagId }) => {
  const data = {
    searchfield: defSearchField(searchType),
    searchflags: defSearchFlags(dateFilter, categ, safety),
    searchvalue: searchValue,
  }

  if (!tagsDisabled) {
    data.tagid = tagId
  }

  // this must be exacly as API requests, even names of object must match!
  return data
}

const transForStore = response => response.Clients

export default flowRight(
  transformProps(props => {
    const { instanceName, searchPanelConfig: { initialValues } } = props

    return {
      ...props,

      form: instanceName,

      initialValues: merge(cloneDeep(RFInitialValues), initialValues),

      onSubmit: (values, dispatch) => {
        const data = valuesToData(values)

        return dispatch(
          fetchSFM({
            instanceName,
            callApi: Client.search,
            callApiArgs: [data],
            transformResponse: transForStore,
          }),
        )
      },
    }
  }),
  reduxForm({ destroyOnUnmount: false }),
)
