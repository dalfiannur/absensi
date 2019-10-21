import * as React from 'react'
import { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogContent, DialogTitle, DialogActions, Grid, Button, Table, TableBody } from '@material-ui/core';
import Logo from '../../../logo.png';

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

}

const Presence: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState('');

  const handleTextField = (value: string) => {
    setOpen(true);
    setCode(value);
    setTimeout(() => {
      Promise.resolve(setCode('')).then(() => {
        setOpen(false);
      });
    }, 3000);
  }

  return (
    <React.Fragment>
      <div>
        <img className={classes.Logo} src={Logo} />
        <h1 className={classes.Title}>ABSENSI PESERTA MTGA</h1>
        <TextField
          autoFocus
          value={code}
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
                <Grid md={8} className={classes.GridDetail}>123456</Grid>
                <Grid md={4} className={classes.GridDetail}>Nama</Grid>
                <Grid md={8} className={classes.GridDetail}>Dea Pratiwi Putri</Grid>
                <Grid md={4} className={classes.GridDetail}>Jabatan</Grid>
                <Grid md={8} className={classes.GridDetail}>Admin</Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Disagree
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
export default Presence