import * as React from 'react'
import * as _ from 'lodash'
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

const PresenceRoute = (props: PresenceProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [openUserNotFound, setOpenUserNotFound] = useState(false)
  const [NIK, setNIK] = useState('')
  const [presenceTypeId, setPresenceTypeId] = useState(1)
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

  const postPresence = (userId: number) => {
    fetch(`${process.env.REACT_APP_API}/presence`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        typeId: _.toInteger(presenceTypeId)
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
              postPresence(_.toInteger(data.id))
              setTimeout(() => {
                setNIK('')
                setOpen(false)
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
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 900
              }
            },
            color: {
              value: '#a8ff3e'
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 2,
                color: '#a8ff3e'
              },
              polygon: {
                nb_sides: 8
              },
              image: {
                src: '',
                width: 100,
                height: 100
              }
            },
            opacity: {
              value: 1,
              random: false,
              anim: {
                enable: false,
                speed: 2,
                opacity_min: 0,
                sync: false
              }
            },
            size: {
              value: 2,
              random: false,
              anim: {
                enable: false,
                speed: 20,
                size_min: 0,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 100,
              color: '#a8ff3e',
              opacity: 1,
              width: 2
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: false,
                rotateX: 3000,
                rotateY: 3000
              }
            },
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
