import { Application } from 'WebAPI'

export const fetchAppsViewDecisionEligible = (ID, hash) =>
  Application.details({ ID, hash, page: 'decisioneligible' }).then(response => response.Data)
