import React from 'react'
import { connect } from 'react-redux'
import flowRight from 'lodash/flowRight'
import get from 'lodash/get'
import withCondition from 'shared/containers/withCondition'
import RelatedParallelLoans, {
  RelatedParallelLoansTrigger,
  getIconAlias,
} from 'shared/Modals/RelatedParallelLoansModal'
import { translate } from '../../../helpers'
import { isClientViewBasePresentAndValid as isClientViewBasePresentAndValidSel } from '../../../store'

const ShowClientLoansButton = ({ clientViewBase: { ClientParaLoanStatus, ID, HashSum_ClientID_ } }) => [
  <RelatedParallelLoans key="RelatedParallelLoans" />,
  <RelatedParallelLoansTrigger
    key="RelatedParallelLoansTrigger"
    params={{ ID: ID, hash: HashSum_ClientID_ }} // eslint-disable-line
    type="button"
    alias={getIconAlias(ClientParaLoanStatus)}
  >
    {translate('cmd_warn_related_loans')}
  </RelatedParallelLoansTrigger>,
]

export default flowRight(
  connect(state => ({
    isClientViewBasePresentAndValid: isClientViewBasePresentAndValidSel(state),
  })),
  withCondition(
    ({ isClientViewBasePresentAndValid, clientViewBase }) =>
      isClientViewBasePresentAndValid && get(clientViewBase, 'ClientParaLoanStatus') > 0,
    () => null,
  ),
)(ShowClientLoansButton)
