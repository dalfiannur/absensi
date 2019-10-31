import * as React from 'react'
import { Grid, TextField } from '@material-ui/core'
import history from 'utils/history'
import Logo from '../../../logo.png'
import BackgroundImage from '../../../assets/background-login.jpg'
import BackgroundImage2 from '../../../assets/background-login-2.jpg'
import { useStyle } from './style'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Background from './components/Background'

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

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <React.Fragment>
      <Background />
      <Grid container className={classes.Container}>
        <Grid item md={12} className={classes.RightSection}>
          <Card className={classes.cardStyle}>
            <CardContent>
              <img className={classes.Logo} src={Logo} alt='Kalbe' />
              <h3 className={classes.Judul}>Barcode Attendance System</h3>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default LoginRoute;
