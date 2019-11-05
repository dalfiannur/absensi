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
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  },
  Pagination: {
    display: 'block'
  }
}))