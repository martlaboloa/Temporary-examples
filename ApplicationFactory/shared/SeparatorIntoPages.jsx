import React, { Component } from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import { LKIconButton } from 'shared/LKIconButton'
import { translate } from '../helpers'

const PreviousPageButton = ({ disabled, onClick }) => (
  <LKIconButton alias="prev" disabled={disabled} onClick={onClick}>
    {`${translate('cmd_back')}`}
  </LKIconButton>
)

const NextPageButton = ({ disabled, onClick }) => (
  <LKIconButton alias="next" iconRight disabled={disabled} onClick={onClick}>
    {`${translate('cmd_next')}`}
  </LKIconButton>
)

class SeparatorIntoPages extends Component {
  state = { pageIndex: this.props.currentPageIndex }

  getCurrentPage = () => {
    const { pages } = this.props

    const { pageIndex } = this.state

    return pages[pageIndex]
  }

  setPage = index => {
    this.setState({ ...this.state, pageIndex: index })
  }

  previousPage = () => {
    this.setPage(this.state.pageIndex - 1)
  }

  nextPage = () => {
    this.setPage(this.state.pageIndex + 1)
  }

  isFirstPage = () => this.state.pageIndex === 0

  isLastPage = () => this.state.pageIndex === this.props.pages.length - 1

  PrevPageBttn = () => <PreviousPageButton disabled={this.isFirstPage()} onClick={this.previousPage} />

  NextPageBttn = () => <NextPageButton disabled={this.isLastPage()} onClick={this.nextPage} />

  render() {
    const { component } = this.props

    const restProps = omit(this.props, ['currentPageIndex', 'component', 'pages'])

    const CurrentPage = this.getCurrentPage()

    return (
      <div className="SeparatorIntoPages">
        {React.createElement(component, {
          separatorIntoPages: {
            Page: CurrentPage,
            PreviousPageButton: this.PrevPageBttn,
            NextPageButton: this.NextPageBttn,
          },
          ...restProps,
        })}
      </div>
    )
  }
}

SeparatorIntoPages.defaultProps = {
  currentPageIndex: 0,
}

SeparatorIntoPages.propTypes = {
  pages: PropTypes.PropTypes.arrayOf(PropTypes.func).isRequired,
  currentPageIndex: PropTypes.number,
}

export default SeparatorIntoPages
