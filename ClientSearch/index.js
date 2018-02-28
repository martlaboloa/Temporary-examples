import { withLazyLoading } from 'shared'
import { LanguageService } from '../../../helpers/language'

export * from './selectors'

export * from './actions'

export default withLazyLoading(() =>
  LanguageService.register('frm_client_list', lang =>
    import(/* webpackChunkName: "ClientSearchSharedLanguage" */ `../../../languages/frm_client_list.${lang}.js`),
  ).then(() => import(/* webpackChunkName: "ClientSearch" */ './Components')),
)
