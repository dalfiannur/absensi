import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, TextField, Button } from '@material-ui/core'
import history from 'utils/history'
import Logo from '../../../logo.png'
import BackgroundImage from '../../../assets/background-login.jpg'
import BackgroundImage2 from '../../../assets/background-login-2.jpg'

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
}))

const LoginRoute = () => {
  const classes = useStyle();

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = () => {
    fetch(`${process.env.REACT_APP_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(result => result.json())
      .then(data => {
        localStorage.setItem('access_token', data.access_token)
        history.push('/admin')
      })
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="input-password"
            label="Password"
            className={classes.TextField}
            margin="dense"
            variant="outlined"
            fullWidth
            onChange={e => setPassword(e.target.value)}
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

export default LoginRoute;
