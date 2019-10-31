import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  Title: {
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main
  },
  Content: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#000'
  }
}))