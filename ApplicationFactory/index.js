import { withLazyLoading } from 'shared'
import { LanguageService } from '../../../helpers/language'
import AppAddOpenButton from './shared/AppAddOpenButton'
import reducer, { openAppEdit } from './store'
import { REDUCER_NAME } from './constants'

const constants = { REDUCER_NAME }

const ApplicationAddLazy = withLazyLoading(() =>
  LanguageService.registerMany(
    ['frm_app_add_edit', 'frm_client_list', 'LKMESSAGE'],
    [
      lang =>
        import(/* webpackChunkName: "ApplicationAddAndEditLanguage" */ `../../../languages/frm_app_add_edit.${lang}.js`),
      lang => import(/* webpackChunkName: "ClientSearchLanguage" */ `../../../languages/frm_client_list.${lang}.js`),
      lang => import(/* webpackChunkName: "LKMessage" */ `../../../languages/LKMESSAGE.${lang}.js`),
    ],
  ).then(() => import(/* webpackChunkName: "ApplicationAdd" */ './Components/ApplicationAdd')),
)

const ApplicationEditLazy = withLazyLoading(() =>
  LanguageService.registerMany(
    ['frm_app_add_edit', 'frm_client_list', 'LKMESSAGE'],
    [
      lang =>
        import(/* webpackChunkName: "ApplicationEditAndEditLanguage" */ `../../../languages/frm_app_add_edit.${lang}.js`),
      lang => import(/* webpackChunkName: "ClientSearchLanguage" */ `../../../languages/frm_client_list.${lang}.js`),
      lang => import(/* webpackChunkName: "LKMessage" */ `../../../languages/LKMESSAGE.${lang}.js`),
    ],
  ).then(() => import(/* webpackChunkName: "ApplicationEdit" */ './Components/ApplicationEdit')),
)

export { reducer, constants, AppAddOpenButton, openAppEdit }

export { ApplicationAddLazy as ApplicationAdd, ApplicationEditLazy as ApplicationEdit }
