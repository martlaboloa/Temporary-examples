import React from 'react'
import moment from 'moment'
import { PlainTextContainer } from 'shared/StyledComponents'
import { FormLayout } from 'shared/newFormElements'
import { isApplicationIdentity } from '../helpers'

const OpenDate = ({ appPrams, openDayStr, appViewBase, loanEndDate }) => (
  <FormLayout noLabel fieldProportions="3:3" labelFieldProportions="0:16">
    <PlainTextContainer>
      {!isApplicationIdentity(appPrams, 'applicationIdentity')
        ? openDayStr
        : moment(appViewBase.RegDate).format('DD.MM.YYYY')}
    </PlainTextContainer>
    <PlainTextContainer>{loanEndDate}</PlainTextContainer>
  </FormLayout>
)

export default OpenDate
