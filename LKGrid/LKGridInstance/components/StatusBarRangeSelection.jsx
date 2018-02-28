import React, { Component } from 'react'
import slice from 'lodash/slice'
import sortBy from 'lodash/sortBy'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import isNil from 'lodash/isNil'
import isUndefined from 'lodash/isUndefined'
import transformProps from '../../../../shared/containers/transformProps'
import ColumnDefsJamming from './ColumnDefsJamming'

class StatusBarRangeSelection extends Component {
  onRangeSelectionChanged = e => {
    const { api } = e

    const rangeSelections = api.getRangeSelections()

    // console.log('onRangeSelectionChanged', rangeSelections)

    if (isNil(rangeSelections)) {
      this.realOnRangeSelectionChanged(e)

      return
    }

    if (!this.areRangeSelsValid(rangeSelections)) {
      const validRangeSels = this.transformToValidRangeSels(rangeSelections)

      this.reapplyRangeSels(e, validRangeSels)
    } else {
      this.realOnRangeSelectionChanged(e)
    }
  }

  getChildComponentProps = () => {
    const { statusBarOn } = this.props

    return {
      ...this.props,

      statusBarOn,

      statusBarRangeSelectionOnRangeSelectionChanged: this.onRangeSelectionChanged,
    }
  }

  realOnRangeSelectionChanged = e => {
    // const { api } = e
    // const rangeSelections = api.getRangeSelections()
    // console.log('realll', rangeSelections)
  }

  areInvalidColumnsSelected = rangeSels => {
    const { iStatusBarConfig: { columnId } } = this.props

    let i
    for (i = 0; i < rangeSels.length; i++) {
      const { columns } = rangeSels[i]

      let j
      for (j = 0; j < columns.length; j++) {
        const { colId } = columns[j]

        if (colId !== columnId) {
          return true
        }
      }
    }

    return false
  }

  areTwoRangesOverlapping = (rangeA, rangeB) => {
    const columnsA = rangeA.columns
    const columnsB = rangeB.columns

    const endMoreThanStartA = rangeA.end.rowIndex > rangeA.start.rowIndex
    const endMoreThanStartB = rangeB.end.rowIndex > rangeB.start.rowIndex

    let x1
    let x2
    let y1
    let y2

    if (endMoreThanStartA) {
      x1 = rangeA.start.rowIndex
      x2 = rangeA.end.rowIndex
    } else {
      x1 = rangeA.end.rowIndex
      x2 = rangeA.start.rowIndex
    }

    if (endMoreThanStartB) {
      y1 = rangeB.start.rowIndex
      y2 = rangeB.end.rowIndex
    } else {
      y1 = rangeB.end.rowIndex
      y2 = rangeB.start.rowIndex
    }

    if (x1 > y2 || y1 > x2) {
      return false
    }

    let i
    for (i = 0; i < columnsA.length; i++) {
      const colIdA = columnsA[i].colId

      let j
      for (j = 0; j < columnsB.length; j++) {
        const colIdB = columnsB[j].colId

        if (colIdA === colIdB) {
          return true
        }
      }
    }

    return false
  }

  areRangesOverlapping = rangeSels => {
    let i
    for (i = 0; i < rangeSels.length; i++) {
      const rangeIth = rangeSels[i]

      let j
      for (j = i + 1; j < rangeSels.length; j++) {
        const rangeJth = rangeSels[j]

        if (this.areTwoRangesOverlapping(rangeIth, rangeJth)) {
          return true
        }
      }
    }

    return false
  }

  areRangeSelsValid = rangeSels => {
    const invalidColsSeled = this.areInvalidColumnsSelected(rangeSels)
    const areOverlaps = this.areRangesOverlapping(rangeSels)

    return !invalidColsSeled && !areOverlaps
  }

  flattenRngSelsOnValidColumnPurified = rangeSels => {
    const { iStatusBarConfig: { columnId } } = this.props

    let retVal = []

    let i
    for (i = 0; i < rangeSels.length; i++) {
      const rangeIth = rangeSels[i]

      const validColumn = find(rangeIth.columns, ({ colId }) => colId === columnId)

      if (validColumn !== undefined) {
        const newCols = [validColumn]

        const startRowIndx = rangeIth.start.rowIndex
        const endRowIndx = rangeIth.end.rowIndex

        if (startRowIndx > endRowIndx) {
          retVal.push({
            columns: newCols,
            start: rangeIth.end,
            end: rangeIth.start,
          })
        } else {
          retVal.push({
            columns: newCols,
            start: rangeIth.start,
            end: rangeIth.end,
          })
        }
      }
    }

    if (isEmpty(retVal)) {
      return retVal
    }

    retVal = sortBy(retVal, ({ start: { rowIndex } }) => rowIndex)

    const selsToIter = retVal
    retVal = []

    let n
    for (n = 0; n < selsToIter.length; n++) {
      if (n === 0) {
        retVal.push(selsToIter[n])
      } else {
        const lastOfRetVal = retVal[retVal.length - 1]
        const rangeNth = selsToIter[n]

        if (lastOfRetVal.end.rowIndex < rangeNth.start.rowIndex) {
          retVal.push(rangeNth)
        } else if (rangeNth.end.rowIndex > lastOfRetVal.end.rowIndex) {
          retVal[retVal.length - 1] = { ...lastOfRetVal, end: rangeNth.end }
        }
      }
    }

    return retVal
  }

  isRangeSelSingleCell = rangeSel => {
    const { start, end, columns } = rangeSel

    return start.rowIndex === end.rowIndex && columns.length === 1
  }

  spliceImmutable = (arr, start, deleteCount, ...itemsToInsert) => {
    const arrayCopy = [...arr]

    arrayCopy.splice(start, deleteCount, ...itemsToInsert)

    return arrayCopy
  }

  transformToValidRangeSels = rangeSels => {
    const { iStatusBarConfig: { columnId } } = this.props

    const lastRangeSel = rangeSels[rangeSels.length - 1]

    const lastRangeSelRowIndex = lastRangeSel.start.rowIndex

    let validRangeSels = []

    if (this.isRangeSelSingleCell(lastRangeSel)) {
      if (lastRangeSel.columns[0].colId === columnId) {
        const flatValColPureRanges = this.flattenRngSelsOnValidColumnPurified(slice(rangeSels, 0, rangeSels.length - 1))

        if (isEmpty(flatValColPureRanges)) {
          validRangeSels = [lastRangeSel]
        } else {
          const containingRangeIndex = findIndex(flatValColPureRanges, ({ start, end }) => {
            return lastRangeSelRowIndex >= start.rowIndex && lastRangeSelRowIndex <= end.rowIndex
          })

          if (containingRangeIndex !== -1) {
            const containingRange = flatValColPureRanges[containingRangeIndex]

            if (containingRange.start.rowIndex === containingRange.end.rowIndex) {
              validRangeSels = this.spliceImmutable(flatValColPureRanges, containingRangeIndex, 1)
            } else if (containingRange.start.rowIndex === lastRangeSelRowIndex) {
              validRangeSels = this.spliceImmutable(flatValColPureRanges, containingRangeIndex, 1, {
                ...containingRange,
                start: { ...containingRange.start, rowIndex: lastRangeSelRowIndex + 1 },
              })
            } else if (containingRange.end.rowIndex === lastRangeSelRowIndex) {
              validRangeSels = this.spliceImmutable(flatValColPureRanges, containingRangeIndex, 1, {
                ...containingRange,
                end: { ...containingRange.end, rowIndex: lastRangeSelRowIndex - 1 },
              })
            } else {
              validRangeSels = this.spliceImmutable(
                flatValColPureRanges,
                containingRangeIndex,
                1,
                { ...containingRange, end: { ...containingRange.end, rowIndex: lastRangeSelRowIndex - 1 } },
                { ...containingRange, start: { ...containingRange.start, rowIndex: lastRangeSelRowIndex + 1 } },
              )
            }
          } else {
            const smallerThanIndex = findIndex(
              flatValColPureRanges,
              ({ start }) => lastRangeSelRowIndex < start.rowIndex,
            )

            if (smallerThanIndex !== -1) {
              validRangeSels = this.spliceImmutable(flatValColPureRanges, smallerThanIndex, 0, lastRangeSel)
            } else {
              validRangeSels = this.spliceImmutable(flatValColPureRanges, flatValColPureRanges.length, 0, lastRangeSel)
            }
          }
        }
      } else {
        validRangeSels = this.flattenRngSelsOnValidColumnPurified(slice(rangeSels, 0, rangeSels.length - 1))
      }
    } else {
      validRangeSels = this.flattenRngSelsOnValidColumnPurified(rangeSels)
    }

    return validRangeSels
  }

  reapplyRangeSels = (e, rangeSels) => {
    const { api } = e
    const { iStatusBarConfig: { columnId } } = this.props

    api.clearRangeSelection()

    rangeSels.forEach(({ start, end }) => {
      api.addRangeSelection({
        rowStart: start.rowIndex,
        rowEnd: end.rowIndex,
        columnStart: columnId,
        columnEnd: columnId,
      })
    })
  }

  render() {
    return <ColumnDefsJamming {...this.getChildComponentProps()} />
  }
}

export default transformProps(props => {
  const { iStatusBarConfig } = props

  return { ...props, statusBarOn: !isUndefined(iStatusBarConfig) }
})(StatusBarRangeSelection)
