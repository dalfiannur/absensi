import * as React from 'react';
import Moment from 'moment'
import { Dialog, DialogTitle, DialogContentText } from '@material-ui/core';
import { useStyle } from './style';

interface DialogNoEventProps {
  open: boolean
  onClose: () => void
}

export default (props: DialogNoEventProps) => {
  const classes = useStyle()

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose} >
        <DialogTitle className={classes.Title}>Event Not Found</DialogTitle>
        <DialogContentText className={classes.Content}>
          There is no activity at {Moment().format('HH:mm')}
        </DialogContentText>
    </Dialog>
  )
}