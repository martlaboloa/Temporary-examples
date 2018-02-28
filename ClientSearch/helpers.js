import history from '../../../helpers/history'
import mainTranslate from '../../../helpers/language'
import { formName } from './constants'

export const pushDetailsRoute = ({ ID, HashSum_ClientID_, ClientType }) => {
  history.push(`/secure/client/${ID}/details/${HashSum_ClientID_}/${ClientType}`)
}

export const translate = key => mainTranslate(formName, key)
