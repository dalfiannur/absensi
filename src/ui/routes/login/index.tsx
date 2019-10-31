import * as React from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import history from 'utils/history'
import Logo from 'assets/logo.png'
import { useStyle } from './style'

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
            type='password'
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
