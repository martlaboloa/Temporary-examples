import React, { Component } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import DropdownField from 'shared/FormFields/DropdownField'
import { FORM_NAME } from '../../constants'

import {
  getPurpose2SumInitVal,
  getPurposeSumInitVal,
  getReqAmountInitVal,
  getReqCurrencyOptionsSource,
  getReqCurrencyValData,
  getReqAmountDisabled,
  isDropdownDisabled,
} from '../helpers'
import { isFormFieldTouched, reqCurrencyValDataSet as reqCurrencyValDataSetUndisp } from '../../store'

class ReqCurrency extends Component {
  onChange = (event, newValue) => {
    const { reqAmountTouched, changeField, generalLookupsSys, productViewDetail, reqCurrencyValDataSet } = this.props

    const reqCurrencyValData = getReqCurrencyValData(
      getReqCurrencyOptionsSource(productViewDetail, generalLookupsSys),
      newValue,
      productViewDetail,
    )

    reqCurrencyValDataSet(reqCurrencyValData)

    const reqAmountDisabled = getReqAmountDisabled(productViewDetail, reqCurrencyValData)

    if (reqAmountDisabled || !reqAmountTouched) {
      const reqAmountInitVal = getReqAmountInitVal(reqCurrencyValData, productViewDetail)

      // console.log(
      //   'iiiiiiiiiiiiiin',
      //   reqCurrencyValData,
      //   getReqCurrencyOptionsSource(productViewDetail, generalLookupsSys),
      //   newValue,
      //   productViewDetail,
      //   reqCurrencyValData,
      //   reqAmountInitVal,
      // )

      changeField('ReqAmount', reqAmountInitVal)

      changeField('PurposeSum', getPurposeSumInitVal(reqAmountInitVal))

      changeField('Purpose2Sum', getPurpose2SumInitVal())
    }
  }

  render() {
    const { options, disabled } = this.props
    return <DropdownField name="ReqCurrency" options={options} onChange={this.onChange} disabled={disabled} />
  }
}

export default connect(
  (state, { options }) => ({
    disabled: isDropdownDisabled(options),
    reqAmountTouched: isFormFieldTouched(state, 'ReqAmount'),
  }),
  {
    changeField: (...args) => change(FORM_NAME, ...args),
    reqCurrencyValDataSet: reqCurrencyValDataSetUndisp,
  },
)(ReqCurrency)
