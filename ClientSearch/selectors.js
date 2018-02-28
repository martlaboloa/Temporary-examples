import { createSelector } from 'reselect'
import { formValueSelector as getFormValueSelector } from 'redux-form'
import { isFieldTouched } from 'shared/reduxForm'
import { getData, getFetchSucceeded } from 'shared/SimpleFetchManager'
import { translate } from './helpers'

export const formValueSelector = (state, { instanceName }, field) => getFormValueSelector(instanceName)(state, field)

export const isFormFieldTouched = (state, { instanceName }, field) => isFieldTouched(instanceName)(state, field)

const defaultClients = []
export const getClients = (state, { instanceName }) => getData(instanceName)(state) || defaultClients

export const getClientsFetchSucceeded = (state, { instanceName }) => getFetchSucceeded(instanceName)(state) || false

export const getClientsCount = createSelector(getClients, clients => clients.length)

export const getTitle = createSelector(
  getClientsFetchSucceeded,
  getClientsCount,
  (clientsFetchSucceeded, clientsCount) => {
    let name = translate('frm_client_list')

    if (clientsFetchSucceeded) {
      name = `${translate('lbl_clients_cap')}${clientsCount}${translate('lbl_clients_cap_rec')}`
    }

    return name
  },
)
