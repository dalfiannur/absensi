import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
import Logo from '../../../logo.png';
import BackgroundImage from '../../../assets/background-login.jpg';
import BackgroundImage2 from '../../../assets/background-login-2.jpg';
import { connect } from 'react-redux';
import { setUsername, setPassword } from 'store/actions/auth';
import { Dispatch } from 'redux';
import { AuthState } from 'store/reducers/auth';

const useStyle = makeStyles(theme => ({
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
}));

type LoginProps = {
  Auth: AuthState,
  setUsername: (username: string) => void,
  setPassword: (password: string) => void
}

const LoginRoute: React.FC<LoginProps> = (props) => {
  const classes = useStyle();

  const handleLogin = () => {
    console.log(props.Auth)
  }

  return (
    <React.Fragment>
      <Grid container className={classes.Container}>
        <Grid item md={9} className={classes.LeftSection}></Grid>
        <Grid item md={3} className={classes.RightSection}>
          <img className={classes.Logo} src={Logo} alt='Kalbe' />
          <TextField
            id="input-username"
            label="Username"
            className={classes.TextField}
            margin="dense"
            variant="outlined"
            fullWidth
            onChange={(e) => props.setUsername(e.target.value)}
          />
          <TextField
            id="input-password"
            label="Password"
            className={classes.TextField}
            margin="dense"
            variant="outlined"
            fullWidth
            onChange={e => props.setPassword(e.target.value)}
          />
          <Button
            color='primary'
            variant='contained'
            onClick={handleLogin}
            className={classes.ButtonLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

const mapState = (state: any) => state
const mapDispatch = (dispatch: Dispatch) => ({
  setUsername: (username: string) => dispatch(setUsername(username)),
  setPassword: (password: string) => dispatch(setPassword(password))
})

export default connect(mapState, mapDispatch)(LoginRoute);
