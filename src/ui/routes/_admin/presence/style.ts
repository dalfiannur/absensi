import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  PaperHeader: {
    width: '100%',
    background: '#fafafa'
  },
  TableWrapper: {
    overflowX: 'auto',
    maxHeight: 450
  },
  PaginationWrapper: {
    width: '100%'
  },
  Pagination: {
    display: 'block'
  }
}))