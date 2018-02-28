export const APP_ADD_API_PARAM_NAMES = [
  'STK',
  'action',
  'AppID',
  'HashSum_AppID_',
  'ClientID',
  'HashSum_ClientID_',
  'IndustryID',
  'IndustrySubID',
  'BusinessType',
  'Address',
  'CityID',
  'ReqAmount',
  'ReqCurrency',
  'Interest',
  'InterestType',
  'UpfrontID',
  'ScheduleTypeID',
  'PayFreqValue',
  'PayFreqPeriod',
  'DurationMonths',
  'DurationDays',
  'GracePeriod',
  'GracePeriodInt',
  'PurposeID',
  'OtherPurpose',
  'OtherPurpose2',
  'ManagerID',
  'ResourceID',
  'ProductID',
  'Startup',
  'PurposeSum',
  'Purpose2ID',
  'Purpose2Sum',
  'AgreeNumber',
  'Contribution',
  'ProjectDescription',
  'NodeID',
  'RevolvingID',
  'RepaymentSourceID',
  'InfoSourceID',
  'GracePeriod_InterestAccrual',
  'AppScreening',
  'CField1',
  'CField2',
  'CField3',
  'CField4',
  'DynFields',
]

export const formFieldNames = [
  'ProductID',
  'cardNumberInput',
  'IndustryID',
  'IndustrySubID',
  'BusinessType',
  'Startup',
  'RepaymentSourceID',
  'ReqAmount',
  'ReqCurrency',
  'DurationMonths',
  'DurationDays',
  'Installments',
  'GracePeriod',
  'GracePeriodInt',
  'GracePeriod_InterestAccrual',
  'ScheduleTypeID',
  'PayFreqValue',
  'PayFreqPeriod',
  'Interest',
  'InterestType',
  'UpfrontID',
  'RevolvingID',
  'PurposeID',
  'PurposeSum',
  'OtherPurpose',
  'Purpose2ID',
  'Purpose2Sum',
  'OtherPurpose2',
  'Contribution',
  'ManagerID',
  'ProjectDescription',
  'CField1',
  'CField2',
  'CField3',
  'CField4',
]

export const APP_ADD_INSTANCE_NAME = 'ApplicationAdd'

export const APP_EDIT_INSTANCE_NAME = 'ApplicationEdit'

export const APP_ADD_API_ERROR_NAMES_TO_PARAM_NAMES = { TermDaysCheck: 'DurationDays', InterestRate: 'Interest' }

export const SUBMIT_VALIDATION_FIELD_ERROR_MESSAGE = "field's submit validation failed"

export const DAYS_PER_MONTH_AVG = 30.4375
export const REQ_AMOUNT_MIN = 10
export const MAX_MONEY_INPUT = 100000000
export const DURATION_YEAR_MAX = 30
export const INTEREST_MAX = 10000
export const TEXT_AREA_MAX = 15000
export const TEXT_AREA_ROW_COUNT = 5

/* modal names */
export const CLIENT_SEARCH_MODAL_NAME = 'ApplicationAddClientSearchModal'
export const APP_ADD_CLIENT_EDIT_MODAL_NAME = 'ApplicationAddClientEditModal'
export const APP_EDIT_CLIENT_EDIT_MODAL_NAME = 'ApplicationEditClientEditModal'
export const APPLICATION_COMMITTEE_MODAL_NAME = 'ApplicationAddApplicationCommitteeModalName'
export const APP_EDIT_CLIENT_WATCHLIST_MODAL_NAME = 'appEditClientWatchlistModal'

/* fetcher names */
export const PRODUCT_VIEW_LIST_FETCHER_NAME = 'ApplicationAddProductViewListFetcher'
export const PRODUCT_VIEW_DETAIL_FETCHER_NAME = 'ApplicationAddProductViewDetailFetcher'
export const APPLICATION_ADD_FETCHER_NAME = 'ApplicationAddGeneral'
export const APPLICATION_EDIT_FETCHER_NAME = 'ApplicationEditGeneral'
export const LOAN_OFFICER_VIEW_OFFICER_LIST_ACTIVE_FETCHER_NAME = 'ApplicationAddLoanOfficerViewOfficerListActive'
export const SEARCH_CLIENT_FETCHER_NAME = 'ApplicationAddSearchClient'
export const CLIENT_VIEW_BASE_FETCHER_NAME = 'ApplicationAddClientViewBase'
export const APP_VIEW_BASE_FETCHER_NAME = 'ApplicationAddAppViewBase'
export const APP_VIEW_DECISION_ELIGIBLE_FETCHER_NAME = 'ApplicationAddAppViewDecisionEligible'
export const CLIENT_VALIDATION_FETCHER_NAME = 'ApplicationAddChosenClientValidation'

export const REDUCER_NAME = 'ApplicationAddReducer'

export const FORM_NAME = 'ApplicationAddForm'

export const CLIENT_SEARCH_NAME = 'ApplicationAddClientSearch'
