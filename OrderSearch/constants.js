export const RFInitialValues = {
  startDate: null,
  endDate: null,

  docNo: null,
  OID: null,
  ID: null,

  authLevel: {
    notAuthorized: true,
    partiallyAuthorized: true,
    authorized: true,
  },

  entryAuthorID: {
    disabled: true,
    value: 1,
  },
  hasUserAuth: {
    disabled: true,
    value: 1,
  },
  comment: {
    disabled: true,
    value: null,
  },
  debit: {
    disabled: true,
    balCodeID: null,
    accNo: null,
  },
  amount: {
    disabled: true,
    min: 0,
    max: 10000,
  },
  payerDetails: {
    disabled: true,
    value: null,
  },

  creatorTypeID: {
    disabled: false,
    value: 1,
  },
  operTypeID: {
    disabled: true,
    value: 1,
  },
  operCodeID: {
    disabled: true,
    value: null,
  },
  credit: {
    disabled: true,
    balCodeID: null,
    accNo: null,
  },
  currency: {
    disabled: true,
    value: null,
  },
  borrowerName: {
    disabled: true,
    value: null,
  },
}

export const RF_NAME = 'ORDERS'

export const ORDERS_FETCHER_NAME = 'ORDERS'

export const LK_GRID_NAME = 'ORDERS'
export const formName = 'frm_acc_entries'
export const objectName = 'dbgrd_entries'
