import * as React from 'react'
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogContent, Grid, DialogTitle } from '@material-ui/core';
import Logo from '../../../logo.png';
import UserImage from '../../../user.jpg';
import { User } from 'store/user/types';
import history from 'utils/history'
import { PresenceType, PresenceTypeState } from 'store/presence-type/types';
import { AppState } from 'store';
import { Dispatch } from 'redux';
import { setPresenceTypes } from 'store/presence-type/actions';
import { connect } from 'react-redux';
import Particles from 'react-particles-js';

const useStyles = makeStyles(theme => ({
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
  ProfilePicture: {
    height: 'auto',
    width: '100%'
  },
  Dialog: {
    width: 550
  },
  Welcome: {
    textAlign: 'center',
    left: '25%',
    right: '25%',
    fontSize: 25
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

const inputReadonly = { readOnly: true }

interface PresenceProps {
  PresenceType: PresenceTypeState,
  setPresenceTypes: (types: PresenceType[]) => void
}


const particlesJSON = {
  "particles": {
          "number": {
              "value": 50,
              "density": {
                  "enable": true,
                  "value_area": 700 //Denser the smaller the number.
              }
          },
          "color": { //The color for every node, not the connecting lines.
              "value": "#01579b" //Or use an array of colors like ["#9b0000", "#001378", "#0b521f"]
          },
          "shape": {
              "type": "circle", // Can show circle, edge (a square), triangle, polygon, star, img, or an array of multiple.
              "stroke": { //The border
                  "width": 1,
                  "color": "#145ea8"
              },
              "polygon": { //if the shape is a polygon
                  "nb_sides": 5
              },
              "image": { //If the shape is an image
                  "src": "",
                  "width": 100,
                  "height": 100
              }
          },
          "opacity": {
              "value": 0.7,
              "random": true
          },
          "size": {
              "value": 10,
              "random": true
          },
          "line_linked": {
              "enable": true,
              "distance": 200, //The radius before a line is added, the lower the number the more lines.
              "color": "#007ecc",
              "opacity": 0.5,
              "width": 2
          },
          "move": {
              "enable": true,
              "speed": 2,
              "direction": "top", //Move them off the canvas, either "none", "top", "right", "bottom", "left", "top-right", "bottom-right" et cetera...
              "random": true,
              "straight": false, //Whether they'll shift left and right while moving.
              "out_mode": "out", //What it'll do when it reaches the end of the canvas, either "out" or "bounce".
              "bounce": false, 
              "attract": { //Make them start to clump together while moving.
                  "enable": true,
                  "rotateX": 600,
                  "rotateY": 1200
              }
          }
      },
    //Negate the default interactivity
    "interactivity": {
          "detect_on": "canvas",
          "events": {
              "onhover": {
                  "enable": false,
                  "mode": "repulse"
              },
              "onclick": {
                  "enable": false,
                  "mode": "push"
              },
              "resize": true
          },
          "modes": {
              "grab": {
                  "distance": 800,
                  "line_linked": {
                      "opacity": 1
                  }
              },
              "bubble": {
                  "distance": 800,
                  "size": 80,
                  "duration": 2,
                  "opacity": 0.8,
                  "speed": 3
              },
              "repulse": {
                  "distance": 400,
                  "duration": 0.4
              },
              "push": {
                  "particles_nb": 4
              },
              "remove": {
                  "particles_nb": 2
              }
          }
      },
      "retina_detect": true
  }
  
  // particlesJS("particles-js", particlesJSON)

const PresenceRoute = (props: PresenceProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [openUserNotFound, setOpenUserNotFound] = useState(false)
  const [NIK, setNIK] = useState('')
  const [presenceTypeId, setPresenceTypeId] = useState(0)
  const [user, setUser] = useState<User>({
    nik: '',
    name: '',
    username: ''
  })

  React.useEffect(() => {
    if (props.PresenceType.presenceTypes.length === 0) {
      fetch(`${process.env.REACT_APP_API}/presence-types`)
        .then(res => res.json())
        .then(data => {
          props.setPresenceTypes(data)
        })
    }
  }, [props.setPresenceTypes])

  const postPresence = () => {
    fetch(`${process.env.REACT_APP_API}/presence`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user.id,
        typeId: presenceTypeId
      })
    })
  }

   

  const handleTextField = async (e: any) => {
    if (e.keyCode === 13) {
      fetch(`${process.env.REACT_APP_API}/user/${e.target.value}/nik`)
        .then(res => {
          if (res.status === 404) {
            setOpenUserNotFound(true)
            setTimeout(() => {
              Promise.resolve(setNIK('')).then(() => {
                setOpenUserNotFound(false);
              });
            }, 4000);
          } else {
            setOpen(true);
            res.json().then((data) => {
              setUser(data)
              setTimeout(() => {
                fetch(`${process.env.REACT_APP_API}/presence`, {
                  method: 'POSY',
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    userId: user.id,
                    typeId: 1
                  })
                })
              }, 5000)
            })
          }
        })
    }
  }

  return (
    
    <React.Fragment>
      <div>
      <Particles
        params={{
          particles: {
            line_linked: {
              shadow: {
                enable: true,
                color: '#FF0000',
                blur: 2
              }
            }
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }} />
        <button
          className={classes.ButtonLogin}
          onClick={() => history.push('/login')}>Login</button>
        <img className={classes.Logo} src={Logo} alt='Logo' />
        <h1 className={classes.Title}>ABSENSI PESERTA MTGA</h1>
        <TextField
          autoFocus
          value={NIK}
          className={classes.TextField}
          onChange={e => setNIK(e.target.value)}
          onKeyDown={e => handleTextField(e)}
        />
      </div>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(!open)}
        aria-labelledby="detail-user"
        aria-describedby="detail-user-description"
      >
        <DialogContent className={classes.Dialog}>
          <h3 className={classes.Welcome}>WELCOME TO MTGA</h3>
          <Grid container spacing={2}>
            <Grid item md={5}>
              <img
                src={UserImage}
                alt='User Profile'
                className={classes.ProfilePicture} />
            </Grid>
            <Grid item md={7}>
              <TextField
                label='NIK'
                margin='dense'
                variant='outlined'
                value={user.nik}
                InputProps={inputReadonly} />
              <TextField
                label='Nama'
                margin='dense'
                variant='outlined'
                value={user.name}
                InputProps={inputReadonly} />
              <TextField
                label='Departemen'
                margin='dense'
                variant='outlined'
                InputProps={inputReadonly}
                value={user.departement ? user.departement.name : ''} />
              <TextField
                label='Jumlah Improvement'
                margin='dense'
                variant='outlined'
                InputProps={inputReadonly}
                value={user.improvement ? user.improvement : ''} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openUserNotFound}
        onClose={() => setOpenUserNotFound(false)}
      >
        <DialogTitle>Not Found</DialogTitle>
        <DialogContent>
          User not found, check correctly your QR Code or Barcode
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

const mapStateToProps = (state: AppState) => ({
  PresenceType: state.PresenceType
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPresenceTypes: (types: PresenceType[]) => dispatch(setPresenceTypes(types))
})
export default connect(mapStateToProps, mapDispatchToProps)(PresenceRoute)
