import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, TextField } from '@material-ui/core'
import history from 'utils/history'
import Logo from '../../../logo.png'
import BackgroundImage from '../../../assets/background-login.jpg'
import BackgroundImage2 from '../../../assets/background-login-2.jpg'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
