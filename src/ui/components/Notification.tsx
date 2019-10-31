import * as React from 'react'
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core'
import { CloseRounded } from '@material-ui/icons'

interface NotificationProps {
  open: boolean
  onClose: () => void
  message: string
  color: string
}

const Notification = (props: NotificationProps) => {
  return (
    <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        key={`top, right`}
        autoHideDuration={8000}
        open={props.open}
        onClose={props.onClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >
        <SnackbarContent
          style={{ backgroundColor: props.color }}
          message={
            <span id="message-id">{props.message}</span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={props.onClose}>
              <CloseRounded />
            </IconButton>
          ]} />
      </Snackbar>
  )
}

export default Notification