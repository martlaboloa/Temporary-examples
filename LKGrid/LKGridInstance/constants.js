export const COLUMN_WIDTH_DEFAULT = 150

export const ICON_COLUMN_WIDTH = 30

export const SEARCHES_GRID_STATES_FETCHER_NAME = 'SEARCHES_GRID_STATES'

export const CLIENT_VIEW_GRID_STATES_FETCHER_NAME = 'CLIENT_VIEW_GRID_STATES'

export const APPLICATION_VIEW_GRID_STATES_FETCHER_NAME = 'APPLICATION_VIEW_GRID_STATES'

export const COLLATERAL_VIEW_GRID_STATES_FETCHER_NAME = 'COLLATERAL_VIEW_GRID_STATES'

export const LOAN_VIEW_GRID_STATES_FETCHER_NAME = 'LOAN_VIEW_GRID_STATES'

export const GRID_STATE_FETCHER_NAME_UNIQUE_PREFIX = 'LKGridState@568483:'

export const searchesFormName = 'frm_Main'

export const clientViewFormName = 'frm_client_view'

export const applicationViewFormName = 'frm_application_view'

export const collateralViewFormName = 'frm_collateral_view'

export const loanViewFormName = 'frm_loan_view'

export const SEARCHES_FORM_NAMES = [
  'frm_acc_entries',
  'frm_acc_search',
  'frm_collaterals',
  'frm_loan_search',
  'frm_application',
  'frm_client_list',
]

export const CLIENT_VIEW_GRID_STATE_GROUP_ADDITIONS = [
  { formName: 'frm_client_briefing', objectName: 'dbgrd_brief' },
  { formName: 'frm_client_key_details_history', objectName: 'dbgrd_history' },
  { formName: 'frm_sec_RL', objectName: 'dbgrd_all' },
]

export const LOAN_VIEW_GRID_STATE_GROUP_ADDITIONS = [
  { formName: 'frm_loan_transactions', objectName: 'grd_transactions' },
  { formName: 'frm_loan_manager_add', objectName: 'dbgrd_manager' },
  { formName: 'frm_sec_RL', objectName: 'dbgrd_all' },
]

export const APPLICATION_VIEW_GRID_STATE_GROUP_ADDITIONS = [
  { formName: 'frm_app_decisions', objectName: 'dbgrd_status_hist' },
  { formName: 'frm_app_decisions', objectName: 'dbgrd_comittee' },
  { formName: 'frm_sec_RL', objectName: 'dbgrd_all' },
]

export const MAX_GRID_STATE_COUNT = 5
