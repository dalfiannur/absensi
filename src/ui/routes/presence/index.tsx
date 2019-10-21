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

const useStyles = makeStyles(theme => ({
  TextField: {
    position: 'absolute',
    left: '25%',
    right: '25%',
    top: '45%',
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
    width: '100%',
    height: 'auto'
  },
  Dialog: {
    width: 500
  },
  GridDetail: {
    padding: 5
  }
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
          <Grid container spacing={2}>
            <Grid item md={4}>
              <img className={classes.ProfilePicture} src={Logo} />
            </Grid>
            <Grid item md={8}>
              <Grid container>
                <Grid md={4} className={classes.GridDetail}>NIK</Grid>
                <Grid md={8} className={classes.GridDetail}>
                  {props.Presence.user.nik}
                </Grid>
                <Grid md={4} className={classes.GridDetail}>Nama</Grid>
                <Grid md={8} className={classes.GridDetail}>
                  {props.Presence.user.name}
                </Grid>
                <Grid md={4} className={classes.GridDetail}>Jabatan</Grid>
                <Grid md={8} className={classes.GridDetail}>Admin</Grid>
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