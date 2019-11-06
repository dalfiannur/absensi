import * as React from 'react'
import { Dialog, DialogTitle, DialogContentText } from '@material-ui/core'
import { useStyle } from './style'

interface UserNotFoundDialogProps {
  open: boolean
  onClose: () => void
}

export default (props: UserNotFoundDialogProps) => {
  const classes = useStyle()
  
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}>
      <DialogTitle>User Not Found</DialogTitle>
      <DialogContentText>
        User not found, check correctly your QR Code or Barcode
      </DialogContentText>
    </Dialog>
  )
}