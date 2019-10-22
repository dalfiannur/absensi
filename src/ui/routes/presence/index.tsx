import * as React from 'react'
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogContent, Grid } from '@material-ui/core';
import Logo from '../../../logo.png';
import { Dispatch } from 'redux';
import { setNIK, setUser } from 'store/actions/presence';
import { PresenceState } from 'store/reducers/presence'
import { connect } from 'react-redux';
import { User } from 'types/entity';
import UserImage from '../../../user.jpg';

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
    height: 350,
    width: 220
  },
  Dialog: {
    width: 550
  },
  GridDetail: {
    padding: 5
  },
  Welcome: {
    textAlign: 'center',
    left: '25%',
    right: '25%',
    fontSize: 20
  },
}));

type Props = {
  Presence: PresenceState,
  setNIK: (nik: string) => void,
  setUser: (user: User) => void
}

const Presence: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleTextField = async (nik: string) => {
    setOpen(true);
    fetch('https://localhost:8000/user/' + nik)
      .then((response) => response.json())
      .then((data) => {
        props.setUser(data)
        setTimeout(() => {
          Promise.resolve(props.setNIK('')).then(() => {
            setOpen(false);
          });
        }, 3000);
      })
  }

  return (
    <React.Fragment>
      <div>
        <img className={classes.Logo} src={Logo} />
        <h1 className={classes.Title}>ABSENSI PESERTA MTGA</h1>
        <TextField
          autoFocus
          value={props.Presence.nik}
          className={classes.TextField}
          onChange={(e) => handleTextField(e.target.value)}
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
              <img className={classes.ProfilePicture} src={UserImage} />
            </Grid>
            <Grid item md={7}>
              <Grid container>
                <Grid md={4} className={classes.GridDetail}>Nama</Grid>
                <Grid md={8} className={classes.GridDetail}>Dea Pratiwi Putri</Grid>
                <Grid md={4} className={classes.GridDetail}>NIK</Grid>
                <Grid md={8} className={classes.GridDetail}>123456789</Grid>
                <Grid md={4} className={classes.GridDetail}>Departemen</Grid>
                <Grid md={8} className={classes.GridDetail}>Cleaning Service</Grid>
                <Grid md={5} className={classes.GridDetail}>Jumlah Improvement</Grid>
                <Grid md={8} className={classes.GridDetail}>0</Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

const mapState = (state: any) => state
const mapDispatch = (dispatch: Dispatch) => ({
  setNIK: (nik: string) => dispatch(setNIK(nik)),
  setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapState, mapDispatch)(Presence)
