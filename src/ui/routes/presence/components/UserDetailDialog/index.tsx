import * as React from 'react'
import { Dialog, DialogContent, Grid, TextField } from '@material-ui/core'
import { useStyle } from './style'
import { User } from 'store/user/types'
import UserImage from 'assets/user.jpg'
import _ from 'lodash'
// import { PictureFlag } from './style'

interface UserDetailDialogProps {
  open: boolean
  user: User
  onClose: () => void
}

const inputReadonly = { readOnly: true }

export default (props: UserDetailDialogProps) => {
  const classes = useStyle()
  const { user } = props

  return (
    <Dialog
      // fullWidth
      keepMounted
      open={props.open}
      onClose={props.onClose}
      maxWidth='md'
    >
      <DialogContent className={classes.Dialog}>
        <h3 className={classes.Title}>WELCOME TO MTGA</h3>
        <Grid container spacing={2}>
          <Grid item md={5}>
            <img
              src={`${process.env.REACT_APP_API}/avatars/${user.picture}`}
              alt={user.name}
              className={classes.ProfilePicture} />
          </Grid>
          <Grid item md={7}>
            <img
              src={`${process.env.PUBLIC_URL}/flags/${_.toLower(user.country)}.png`}
              alt='User Profile'
              className={classes.PictureFlag} />
            <br></br>
            <TextField
              label='NIK'
              margin='dense'
              variant='outlined'
              value={user.nik}
              InputProps={inputReadonly} />
            <br></br>
            <TextField
              label='Nama'
              margin='dense'
              variant='outlined'
              value={user.name}
              InputProps={inputReadonly} />
            <br></br>
            <TextField
              label='Departemen'
              margin='dense'
              variant='outlined'
              InputProps={inputReadonly}
              value={user.departement ? user.departement.name : ''} />
            <br></br>
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
  )
}