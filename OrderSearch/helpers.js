import mainTranslate from '../../helpers/language'
import history from '../../helpers/history'
import { translate as translateHelper } from '../../helpers'
import { formName } from './constants'

export const getPropSelector = propName => (_, props) => props[propName]

export const pushDetailsRoute = ({ OperTypeID, ID, HashSum_EntryID_, OID, HashSum_OID_ }) => {
  let route

  if (OperTypeID === 6 || OperTypeID === 7) {
    route = `/secure/order/${ID}/details/${HashSum_EntryID_}/${OperTypeID}/${OID}/${HashSum_OID_}`
  } else {
    route = `/secure/order/${ID}/details/${HashSum_EntryID_}/${OperTypeID}`
  }

  history.push(route)
}

export const translate = key => mainTranslate(formName, key)
export const translateBase = key => translateHelper(`LKMESSAGE-${key}`)

export const transformOptions = (options = []) => options.filter(({ ID }) => ID > 0)
