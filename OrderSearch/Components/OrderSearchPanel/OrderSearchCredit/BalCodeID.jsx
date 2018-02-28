import React from 'react'
import { connect } from 'react-redux'
import FormField from 'shared/newFormElements'
import { withLookups, lookupTypes } from 'shared'
import { formValueSelector } from '../../../selectors'

@withLookups({ type: lookupTypes.accbalcodes, query: '* as AccBalCodes' })
@connect(state => ({
  disabled: formValueSelector(state, 'credit.disabled'),
}))
class BalCodeID extends React.Component {
  constructor(props) {
    super(props)

    this.AccBalCodes = this.props.AccBalCodes.sort((bc1, bc2) => (bc1.BalCode < bc2.BalCode ? -1 : 1)).map(
      ({ BalCode, Title, CCY, CodeLevel }) => ({
        ID: BalCode,
        Title: `${parseFloat(BalCode)}`,
        disabled: CodeLevel !== 2,
        style: { backgroundColor: (CodeLevel === 0 && 'silver') || (CodeLevel === 1 && 'gainsboro') || undefined },
        content: (
          <div className="u-flex u-directionRow u-alignCenter">
            <div style={{ width: 70, minWidth: 70, paddingRight: 15, textAlign: 'right' }}>{parseFloat(BalCode)}</div>
            <div style={{ width: 40, minWidth: 40, paddingRight: 15, textAlign: 'right' }}>{CCY}</div>
            <div>{Title}</div>
          </div>
        ),
      }),
    )
  }

  render() {
    return (
      <FormField
        name="credit.balCodeID"
        disabled={this.props.disabled}
        options={this.AccBalCodes}
        type="select"
        search
        menuWidth={700}
        floatLeft
      />
    )
  }
}

export default BalCodeID
