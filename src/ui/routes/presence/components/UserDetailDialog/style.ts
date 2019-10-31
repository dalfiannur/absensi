import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  Title: {
    textAlign: 'center',
    fontSize: 25,
    color: theme.palette.primary.main
  },
  ProfilePicture: {
    height: 'auto',
    width: '100%'
  },
}))