import { withLazyLoading } from '../shared'
import { LanguageService } from '../../helpers/language'

export default withLazyLoading(() =>
  LanguageService.register('frm_acc_entries', lang =>
    import(/* webpackChunkName: "OrderSearchLanguage" */ `../../languages/frm_acc_entries.${lang}.js`),
  ).then(() => import(/* webpackChunkName: "OrderSearch" */ './Components')),
)
