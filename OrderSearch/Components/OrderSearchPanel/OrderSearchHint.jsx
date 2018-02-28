import React from 'react'
import colors from 'shared/colors'
import { withConfig, configTypes } from 'shared'
import { translate } from '../../helpers'

const style = {
  width: '100%',
  fontWeight: 'bold',
  textAlign: 'center',
  boxShadow: '0px 5px 5px rgba(0,0,0,0.4)',
  border: `1px solid ${colors.red}`,
  color: colors.red,
  marginBottom: 10,
}

@withConfig({
  type: configTypes.user,
  query: ['SearchLimit.Entries as isEntriesSearchLimit', 'SearchLimit.Top as top'],
})
class OrderSearchHint extends React.Component {
  render() {
    const { top, isEntriesSearchLimit } = this.props

    if (!isEntriesSearchLimit || top <= 0) {
      return null
    }

    return (
      <div className="u-flex u-fluid u-alignBotton u-justifyCenter">
        <div style={style}>{translate('lbl_top_rec_t').replace('%d', top)}</div>
      </div>
    )
  }
}

export default OrderSearchHint
