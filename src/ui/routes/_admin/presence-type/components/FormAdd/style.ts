import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  Title: {
    background: theme.palette.primary.main,
    textAlign: 'center',
    color: theme.palette.text.primary
  }
}))