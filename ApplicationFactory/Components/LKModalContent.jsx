import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerField as registerFieldUndisp } from 'redux-form'
import container from './container'
import { FORM_NAME, formFieldNames } from '../constants'

@connect(undefined, { registerField: name => registerFieldUndisp(FORM_NAME, name, 'Field') })
class FormPage extends Component {
  componentDidMount() {
    const { registerField } = this.props

    formFieldNames.forEach(name => {
      registerField(name)
    })
  }

  render() {
    return this.props.children
  }
}

const LKModalContent = ({ separatorIntoPages: { Page }, handleSubmit, ...restProps }) => (
  <form onSubmit={handleSubmit}>
    <FormPage>
      <Page {...restProps} />
    </FormPage>
  </form>
)

export default container(LKModalContent)
