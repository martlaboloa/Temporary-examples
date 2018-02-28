import { translate } from './helpers'

export const srchValueVal = (isClientSearchLimit, criteria) => (value, { searchType }) => {
  if (criteria > 0 && searchType && isClientSearchLimit && (!value || value.length < criteria)) {
    return translate('lbl_limit_cnt_t').replace('%d', criteria)
  }

  return undefined
}
