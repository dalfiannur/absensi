import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  DialogTitle: {
    color: '#fff',
    background: theme.palette.primary.main,
    textAlign: 'center'
  }
}))