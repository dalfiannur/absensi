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
    display: 'block',
    backgroundColor: '#94fc13'
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardStyle: {
    // height : 300,
    // width : 500,
    // background: '#94fc13',
    // marginTop : 100,
    // marginLeft : 380
    position: 'relative',
    width: '400px',
    height: '350px',
    top: 'calc(50% - 175px)',
    left: 'calc(50% - 190px)',
    borderRadius: '2px',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 0 200px rgba(255,255,255,0.05)',
    opacity: 0.9
  },
  Judul: {
    marginLeft: 70
  }
}))