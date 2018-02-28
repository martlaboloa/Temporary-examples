import { connect } from 'react-redux'
import get from 'lodash/get'
import { createSelector } from 'reselect'
import isUndefined from 'lodash/isUndefined'
import getPropSelector from 'helpers/getPropSelector'
import {
  getColumnsOrder,
  getColumnsHeadersTranslated,
  getColumnsWidths,
  getColumnsVisibilities,
  getSyncedGridIdentity,
  isColumnSorted as isColumnSortedSel,
  getSortedColumn,
} from '../../store'
import ButtonContextMenu from './ButtonContextMenu'
import { stateSortToAgGrid } from '../../helpers'

const getColumnDefs = createSelector(
  getColumnsOrder,
  getColumnsHeadersTranslated,
  getColumnsWidths,
  getColumnsVisibilities,
  getPropSelector('iEnableColumnsHide'),
  getPropSelector('iEnableSorting'),
  getPropSelector('iColumnConfigs'),
  getPropSelector('iGetContextMenuItems'),
  isColumnSortedSel,
  getSortedColumn,
  (
    columnsOrder,
    columnsHeadersTranslated,
    columnsWidths,
    columnsVisibilities,
    iEnableColumnsHide,
    iEnableSorting,
    iColumnConfigs,
    iGetContextMenuItems,
    isColumnSorted,
    sortedColumn,
  ) => {
    let columnDefs = columnsOrder.map(field => {
      let columnDef = {
        headerName: columnsHeadersTranslated[field],
        field,
        width: columnsWidths[field],
        hide: !columnsVisibilities[field],
        menuTabs: iEnableColumnsHide ? ['columnsMenuTab'] : [],
        cellRendererFramework:
          get(iColumnConfigs, `[${field}].iconComponent`) || get(iColumnConfigs, `[${field}].cellRenderer`),
      }

      const iconComponent = get(iColumnConfigs, `[${field}].iconComponent`)
      if (!isUndefined(iconComponent)) {
        columnDef = {
          ...columnDef,
          headerName: '',
          suppressMenu: true,
          suppressMovable: true,
          suppressResize: true,
          suppressToolPanel: true,
          suppressSizeToFit: true,
          cellRendererFramework: iconComponent,
        }
      }

      const cellStyle = get(iColumnConfigs, `[${field}].cellStyle`)
      if (!isUndefined(cellStyle)) {
        columnDef = {
          ...columnDef,
          cellStyle,
        }
      }

      const cellClass = get(iColumnConfigs, `[${field}].cellClass`)
      if (!isUndefined(cellClass)) {
        columnDef = {
          ...columnDef,
          cellClass,
        }
      }

      const cellClassRules = get(iColumnConfigs, `[${field}].cellClassRules`)
      if (!isUndefined(cellClassRules)) {
        columnDef = {
          ...columnDef,
          cellClassRules,
        }
      }

      const valueFormatter = get(iColumnConfigs, `[${field}].valueFormatter`)
      if (!isUndefined(valueFormatter)) {
        columnDef = {
          ...columnDef,
          valueFormatter,
        }
      }

      if (isColumnSorted) {
        const { name, sortState } = sortedColumn
        if (name === field) {
          columnDef = {
            ...columnDef,
            sort: stateSortToAgGrid(sortState),
          }
        }
      }

      return columnDef
    })

    if (iEnableSorting) {
      columnDefs = columnDefs.map(columnDef => {
        const columnDefCopy = { ...columnDef }

        const comparator = get(iColumnConfigs, `[${columnDef.field}].comparator`)

        if (!isUndefined(comparator)) {
          columnDefCopy.comparator = comparator
        }

        return columnDefCopy
      })
    }

    if (!isUndefined(iGetContextMenuItems)) {
      columnDefs = [
        {
          headerName: 'X',
          suppressMenu: true,
          suppressSorting: true,
          suppressMovable: true,
          suppressResize: true,
          suppressToolPanel: true,
          suppressSizeToFit: true,
          lockPosition: true,
          cellRendererFramework: ButtonContextMenu,
          width: 30,
        },
        ...columnDefs,
      ]
    }

    return columnDefs
  },
)

const mapStateToProps = (state, props) => ({
  columnDefs: getColumnDefs(state, props),
  syncedGridIdentity: getSyncedGridIdentity(state, props),
})

export default connect(mapStateToProps)
