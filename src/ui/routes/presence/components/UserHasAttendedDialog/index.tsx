import * as React from 'react';
import { Dialog, DialogTitle, DialogContentText } from '@material-ui/core';

interface DialogNoEventProps {
  open: boolean
  onClose: () => void
}

export default (props: DialogNoEventProps) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose} >
        <DialogTitle>Event Not Found</DialogTitle>
        <DialogContentText>No event</DialogContentText>
    </Dialog>
  )
}