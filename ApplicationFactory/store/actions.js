import { destroy as destroyForm } from 'redux-form'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import isUndefined from 'lodash/isUndefined'
import find from 'lodash/find'
import { actions as LKModalActions, constants as LKModalConstants } from '../../../shared/LKModal'
import { Application, ValidationRules, Client } from '../../../../WebAPI'
import { fetchSFM, destroy as destroyFetcher } from '../../../shared/SimpleFetchManager'
import createAction from '../../../../reducers/actionHelpers'
import { actions as actionsOverlay } from '../../../../features/Overlay'
import actions, { RESET } from './actionTypes'
import {
  PRODUCT_VIEW_DETAIL_FETCHER_NAME,
  PRODUCT_VIEW_LIST_FETCHER_NAME,
  APPLICATION_ADD_FETCHER_NAME,
  LOAN_OFFICER_VIEW_OFFICER_LIST_ACTIVE_FETCHER_NAME,
  SEARCH_CLIENT_FETCHER_NAME,
  CLIENT_VIEW_BASE_FETCHER_NAME,
  APP_VIEW_BASE_FETCHER_NAME,
  FORM_NAME,
  CLIENT_VALIDATION_FETCHER_NAME,
  APP_ADD_CLIENT_EDIT_MODAL_NAME,
  APP_EDIT_CLIENT_EDIT_MODAL_NAME,
  APPLICATION_EDIT_FETCHER_NAME,
  APP_VIEW_DECISION_ELIGIBLE_FETCHER_NAME,
  APP_ADD_INSTANCE_NAME,
  APP_EDIT_INSTANCE_NAME,
  APP_EDIT_CLIENT_WATCHLIST_MODAL_NAME,
} from '../constants'
import { getSearchPanelConfig, translateLKMessage } from '../helpers'
import { isProductViewListValid, isClientViewBaseValidTest } from '../Components/helpers'

export const resetReducer = () => createAction(RESET)

export const destroy = dispatch => {
  dispatch(resetReducer())

  dispatch(destroyForm(FORM_NAME))

  dispatch(destroyFetcher(PRODUCT_VIEW_LIST_FETCHER_NAME))
  dispatch(destroyFetcher(PRODUCT_VIEW_DETAIL_FETCHER_NAME))
  dispatch(destroyFetcher(LOAN_OFFICER_VIEW_OFFICER_LIST_ACTIVE_FETCHER_NAME))
  dispatch(destroyFetcher(SEARCH_CLIENT_FETCHER_NAME))
  dispatch(destroyFetcher(CLIENT_VIEW_BASE_FETCHER_NAME))
  dispatch(destroyFetcher(APP_VIEW_BASE_FETCHER_NAME))
  dispatch(destroyFetcher(APP_VIEW_DECISION_ELIGIBLE_FETCHER_NAME))
  dispatch(destroyFetcher(CLIENT_VALIDATION_FETCHER_NAME))
  dispatch(destroyFetcher(APPLICATION_ADD_FETCHER_NAME))
  dispatch(destroyFetcher(APPLICATION_EDIT_FETCHER_NAME))
}

export const close = (dispatch, instanceName) => {
  // order is important
  dispatch(LKModalActions.close(instanceName))
  destroy(dispatch)
}

export const setProductId = id => createAction(actions.SET_PRODUCT_ID, id)

export const industrySubIDOptionsSourceSet = newValue => createAction(actions.industrySubIDOptionsSource.SET, newValue)
export const industrySubIDOptionsSourceDelete = () => createAction(actions.industrySubIDOptionsSource.DELETE)

export const loanEndDateSet = newValue => createAction(actions.loanEndDate.SET, newValue)
export const loanEndDateDelete = () => createAction(actions.loanEndDate.DELETE)

export const reqCurrencyValDataSet = newValue => createAction(actions.reqCurrencyValData.SET, newValue)
export const reqCurrencyValDataDelete = () => createAction(actions.reqCurrencyValData.DELETE)

export const fetchClientViewBase = (ID, hash) =>
  fetchSFM({
    instanceName: CLIENT_VIEW_BASE_FETCHER_NAME,
    callApi: Client.print,
    callApiArgs: [{ ClientID: ID, HashSum_ClientID_: hash, page: 'base' }],
    transformResponse: response => ({ ...response.Data, HashSum_ClientID_: hash }),
  })

export const fetchClientValidation = (ID, hash, clientReqFieldGroupID) =>
  fetchSFM({
    instanceName: CLIENT_VALIDATION_FETCHER_NAME,
    callApi: Client.checkReqFields,
    callApiArgs: [{ ClientID: ID, HashSum_ClientID_: hash, ID: clientReqFieldGroupID }],
    transformResponse: valResponse => valResponse.Data,
  })

const fetchClientDependents = (dispatch, client, clientReqFieldGroupID) => {
  const { ID, HashSum_ClientID_, ClientType, CardNumber } = client

  dispatch(fetchClientValidation(ID, HashSum_ClientID_, clientReqFieldGroupID)).then(valResponse => {
    if (!isEmpty(valResponse)) {
      dispatch(
        LKModalActions.open({
          name: APP_ADD_CLIENT_EDIT_MODAL_NAME,
          message: translateLKMessage('ERR_FILL_REQUIRED_FIELDS'),
          ID,
          hash: HashSum_ClientID_,
          ClientType,
          clientReqFieldGroupID,
          CardNumber,
        }),
      )
    } else {
      dispatch(fetchClientViewBase(ID, HashSum_ClientID_))
    }
  })
}

const destroyClientDependents = dispatch => {
  dispatch(destroyFetcher(CLIENT_VALIDATION_FETCHER_NAME))
}

export const fetchClientByCardNumber = (dispatch, cardNumberInput, productViewDetail) => {
  const { Client_ReqField_GroupID } = productViewDetail

  const getClientSearchData = () => {
    const defSearchFlags = ({ categ: { individuals, solidarityGroups, companies } }) => {
      const categToBit = val => (val ? '1' : '0')

      return `${categToBit(individuals)}${categToBit(solidarityGroups)}${categToBit(companies)}0201`
    }

    const { initialValues } = getSearchPanelConfig(productViewDetail)

    return [
      {
        searchfield: 'personalno',
        searchflags: defSearchFlags(initialValues),
        searchvalue: cardNumberInput,
      },
    ]
  }

  const transformClientSearchData = ({ Clients }) => {
    const clientNum = get(Clients, 'length')

    const clientByCardNumber = get(Clients, '[0]')

    if (clientNum === 1) {
      return clientByCardNumber
    }

    return null
  }

  destroyClientDependents(dispatch)

  dispatch(
    fetchSFM({
      instanceName: SEARCH_CLIENT_FETCHER_NAME,
      callApi: Client.search,
      callApiArgs: getClientSearchData(),
      transformResponse: transformClientSearchData,
    }),
  ).then(client => {
    if (client !== null) {
      fetchClientDependents(dispatch, client, Client_ReqField_GroupID)
    }
  })
}

export const reduceClient = (dispatch, client, Client_ReqField_GroupID) => {
  destroyClientDependents(dispatch)

  fetchClientDependents(dispatch, client, Client_ReqField_GroupID)
}

export const fetchProductViewList = () =>
  fetchSFM({
    instanceName: PRODUCT_VIEW_LIST_FETCHER_NAME,
    callApi: ValidationRules.fetch,
    callApiArgs: [{ page: 'list' }],
    transformResponse: ({ Data }) => Data,
  })

export const fetchProductViewDetail = (ID, hash) =>
  fetchSFM({
    instanceName: PRODUCT_VIEW_DETAIL_FETCHER_NAME,
    callApi: ValidationRules.fetch,
    callApiArgs: [
      {
        page: 'detail',
        ProductID: ID,
        HashSum_ProductID_: hash,
      },
    ],
    transformResponse: prodViewDetResp => prodViewDetResp.Data,
  })

export const openAppEditClientEditModal = ({
  clientID,
  hashSumClientID,
  clientType,
  clientReqFieldGroupID,
  appID,
  appHash,
}) =>
  LKModalActions.open({
    name: APP_EDIT_CLIENT_EDIT_MODAL_NAME,
    message: translateLKMessage('ERR_FILL_REQUIRED_FIELDS'),
    ID: clientID,
    hash: hashSumClientID,
    ClientType: clientType,
    clientReqFieldGroupID,
    appID,
    appHash,
  })

export const openAdd = dispatch => {
  dispatch(fetchProductViewList()).then(prodViewListData => {
    if (isProductViewListValid(prodViewListData)) {
      const { ID, HashSum_ProductID_ } = prodViewListData[0]

      dispatch(fetchProductViewDetail(ID, HashSum_ProductID_))
    }
  })

  dispatch(LKModalActions.open({ name: APP_ADD_INSTANCE_NAME }))
}

export const openAppEdit = (dispatch, ID, hash) => {
  dispatch(actionsOverlay.show())

  Promise.all([
    dispatch(
      fetchSFM({
        instanceName: APP_VIEW_BASE_FETCHER_NAME,
        callApi: Application.details,
        callApiArgs: [{ ID, hash, page: 'base' }],
        transformResponse: response => response.Data,
      }),
    ),
    dispatch(fetchProductViewList()),
  ]).then(([{ IsAppEditable, ProductID, ClientID, HashSum_ClientID_ }, prodViewListData]) => {
    if (IsAppEditable !== 1) {
      dispatch(actionsOverlay.hide())

      dispatch(
        LKModalActions.open({
          name: LKModalConstants.INFO_MODAL_NAME,
          message: translateLKMessage('ERR_APP_EDIT_DECISION_TAKEN'),
        }),
      )
    } else if (isProductViewListValid(prodViewListData)) {
      const productView = find(prodViewListData, prodView => {
        const prodViewID = prodView.ID

        return prodViewID === ProductID
      })

      if (isUndefined(productView)) {
        dispatch(actionsOverlay.hide())

        dispatch(
          LKModalActions.open({
            name: LKModalConstants.INFO_MODAL_NAME,
            message: `${translateLKMessage('ERR_PRODUCT_EXPIRED')}`,
          }),
        )
      } else {
        const prodViewID = productView.ID
        const prodViewHash = productView.HashSum_ProductID_ // eslint-disable-line

        Promise.all([
          dispatch(fetchProductViewDetail(prodViewID, prodViewHash)).then(prodViewDetail =>
            dispatch(
              fetchClientValidation(ClientID, HashSum_ClientID_, prodViewDetail.Client_ReqField_GroupID),
            ).then(clientValidation => [prodViewDetail, clientValidation]),
          ),
          dispatch(fetchClientViewBase(ClientID, HashSum_ClientID_)),
        ]).then(([[{ Client_ReqField_GroupID, Active }, clientValidation], { ClientTypeID, Black, Watched }]) => {
          dispatch(actionsOverlay.hide())

          if (Active !== 1) {
            dispatch(
              LKModalActions.open({
                name: LKModalConstants.INFO_MODAL_NAME,
                message: `${translateLKMessage('ERR_PRODUCT_EXPIRED')}`,
              }),
            )
          } else if (Black === 1 || Watched === 1) {
            if (Black === 1 && Watched === 1) {
              dispatch(
                LKModalActions.open({
                  name: LKModalConstants.INFO_MODAL_NAME,
                  message: `${translateLKMessage('ERR_CLIENT_BLACKLISTED')} , \n${translateLKMessage(
                    'ERR_CLIENT_WATCHED',
                  )}`,
                }),
              )
            } else if (Black === 1) {
              dispatch(
                LKModalActions.open({
                  name: LKModalConstants.INFO_MODAL_NAME,
                  message: `${translateLKMessage('ERR_CLIENT_BLACKLISTED')}`,
                }),
              )
            } else {
              dispatch(
                LKModalActions.open({
                  name: APP_EDIT_CLIENT_WATCHLIST_MODAL_NAME,
                  message: `${translateLKMessage('ERR_CLIENT_WATCHED')}, ${translateLKMessage(
                    'CONFIRM_VALIDATION_WARNING_OVERRIDE',
                  )}`,
                  clientValidation,
                  clientID: ClientID,
                  hashSumClientID: HashSum_ClientID_,
                  clientType: ClientTypeID,
                  clientReqFieldGroupID: Client_ReqField_GroupID,
                  appID: ID,
                  appHash: hash,
                }),
              )
            }
          } else if (isClientViewBaseValidTest(clientValidation)) {
            dispatch(LKModalActions.open({ name: APP_EDIT_INSTANCE_NAME, applicationIdentity: { ID, hash } }))
          } else {
            dispatch(
              openAppEditClientEditModal({
                clientID: ClientID,
                hashSumClientID: HashSum_ClientID_,
                clientType: ClientTypeID,
                clientReqFieldGroupID: Client_ReqField_GroupID,
                appID: ID,
                appHash: hash,
              }),
            )
          }
        })
      }
    }
  })
}
