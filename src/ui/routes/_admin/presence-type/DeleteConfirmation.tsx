import * as React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContentText, DialogActions, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import { CancelRounded, CheckRounded } from '@material-ui/icons'
import Notification from 'ui/components/Notification'
import { green, red } from '@material-ui/core/colors'
import { PresenceTypeState, PresenceType } from 'store/presence-type/types'
import { setPresenceTypes } from 'store/presence-type/actions'

interface DeleteConfirmationProps {
  open: boolean
  PresenceType?: PresenceTypeState
  setPresenceTypes: (types: PresenceType[]) => void
  onClose: () => void
  onSuccess: () => void
}

const DeleteConfirmation = (props: DeleteConfirmationProps) => {
  const state = props.PresenceType!
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API}/presence-type/${state.presenceType.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(() => {
        const types = state.presenceTypes.filter((item) => item.id !== state.presenceType.id)
        props.setPresenceTypes(types)
        props.onClose()
        setNotificationMessage('Data successfully deleted')
        setNotificationColor(green[600])
        setOpenNotification(true)
      })
      .catch(error => {
        console.error(error)
        props.onClose()
        setNotificationMessage('Data failed to delete')
        setNotificationColor(red[600])
        setOpenNotification(true)
      })
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContentText>Are you sure want to delete this data?</DialogContentText>
        <DialogActions>
          <IconButton onClick={props.onClose}>
            <CancelRounded />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <CheckRounded />
          </IconButton>
        </DialogActions>
      </Dialog>
      <Notification
        open={openNotification}
        message={notificationMessage}
        color={notificationColor}
        onClose={() => setOpenNotification(false)} />
    </React.Fragment>
  )
}

const mapStateToProps = (state: AppState) => ({
  PresenceType: state.PresenceType
})
const mapActionToProps = (dispatch: Dispatch) => ({
  setPresenceTypes: (types: PresenceType[]) => dispatch(setPresenceTypes(types))
})

export default connect(mapStateToProps, mapActionToProps)(DeleteConfirmation)