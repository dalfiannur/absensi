import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  TextField: {
    position: 'absolute',
    left: '30%',
    right: '30%',
    top: '50%',
    bottom: '45%'
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
    borderRadius: '10px 0px 0px 10px',
    padding: '15px 0px',
    width: 80,
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'center',
    background: 'linear-gradient(180deg, #134e5e, #71b280)',
    border: 0
  }
}));