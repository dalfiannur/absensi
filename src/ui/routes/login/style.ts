import { makeStyles } from '@material-ui/core/styles'
import BackgroundImage from 'assets/background-login.jpg'
import BackgroundImage2 from 'assets/background-login-2.jpg'

export const useStyle = makeStyles(theme => ({
  Container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  TextField: {
    marginTop: 20
  },
  LeftSection: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover'
  },
  RightSection: {
    padding: 20,
    backgroundImage: `url(${BackgroundImage2})`,
    backgroundSize: 'cover'
  },
  Logo: {
    height: 50,
    width: 'auto',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  ButtonLogin: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  }
}))