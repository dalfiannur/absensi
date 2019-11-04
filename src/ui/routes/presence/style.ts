import { makeStyles } from '@material-ui/core/styles';
import BackgroundImage2 from 'assets/background-login-2.jpg'

export const useStyles = makeStyles(theme => ({
  TextField: {
    position: 'absolute',
    left: '30%',
    right: '30%',
    top: '60%',
    bottom: '45%'
  },
  Container:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  Title: {
    position: 'absolute',
    top: 100,
    left: '25%',
    right: '25%',
    textAlign: 'center'
  },
  Logo: {
    height: 65,
    width: 100,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30
  },
  ButtonLogin: {
    position: 'absolute',
    right: 0,
    top: 10,
    left : 13,
    borderRadius: '10px 10px 10px 10px',
    padding: '15px 0px',
    width: 100,
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'center',
    background: '#00000',
    border: 0
  },
  cardStyle: {
    // height : 300,
    // width : 500,
    // background: '#94fc13',
    // marginTop : 100,
    // marginLeft : 380
    position: 'relative',
    width: '500px',
    height: '300px',
    top: 'calc(50% - 175px)',
    left: 'calc(50% - 250px)',
    borderRadius: '2px',
    overflow: 'hidden',
    boxShadow: '#000000',
    opacity: 0.8,
    // marginTop: 150
  },
  RightSection: {
    padding: 20,
    backgroundImage: `url(${BackgroundImage2})`,
    backgroundSize: 'cover'
  }
}));