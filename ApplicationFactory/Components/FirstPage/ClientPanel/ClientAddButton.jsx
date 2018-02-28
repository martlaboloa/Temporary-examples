import React from 'react'
import withCondition from 'shared/containers/withCondition'
import ClientAdd, { ClientAddButtonTrigger } from '../../../../../ClientAdd'
import { isApplicationIdentity } from '../../helpers'

const onClientAddEdit = response => console.log(response)

const ClientAddButton = ({ clientReqFieldGroupID }) => [
  <ClientAdd key="ClientAdd" name="ClientAddFromApplicationAdd" onClientAddEdit={onClientAddEdit} />,

  <ClientAddButtonTrigger
    name="ClientAddFromApplicationAdd"
    params={{ groupid: clientReqFieldGroupID }}
    key="ClientAddTrigger"
  />,
]

export default withCondition(({ applicationIdentity }) => !isApplicationIdentity(applicationIdentity), () => null)(
  ClientAddButton,
)
