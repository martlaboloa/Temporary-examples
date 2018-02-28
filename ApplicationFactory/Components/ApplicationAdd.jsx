import React from 'react'
import flowRight from 'lodash/flowRight'
import ApplicationFactory from '../Components'
import ApplicationAddCommitteeModal from './ApplicationAddCommitteeModal'
import { APP_ADD_INSTANCE_NAME } from '../constants'
import AppAddClientEditModal from '../Components/AppAddClientEditModal'

const ApplicationAdd = () => [
  <AppAddClientEditModal key="AppAddClientEditModal" />,
  <ApplicationAddCommitteeModal key="ApplicationAddCommitteeModal" />,
  <ApplicationFactory key="ApplicationFactory" instanceName={APP_ADD_INSTANCE_NAME} />,
]

export default flowRight()(ApplicationAdd)
