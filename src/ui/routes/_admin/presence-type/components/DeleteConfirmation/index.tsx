import * as React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContentText, DialogActions, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckIcon from '@material-ui/icons/Check'
import Notification from 'ui/components/Notification'
import { green, red } from '@material-ui/core/colors'
import { PresenceTypeState, PresenceType } from 'store/presence-type/types'
import { setPresenceTypes } from 'store/presence-type/actions'

interface DeleteConfirmationProps {
  open: boolean
  data: PresenceType
  PresenceType?: PresenceTypeState
  setPresenceTypes?: (types: PresenceType[]) => void
  onClose: () => void
}

const DeleteConfirmation = (props: DeleteConfirmationProps) => {
  const { presenceTypes } = props.PresenceType!
  const { data, setPresenceTypes, onClose } = props

  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API}/presence-type/${data.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(() => {
        const types = presenceTypes.filter((item) => item.id !== data.id)
        setPresenceTypes!(types)
        onClose()
        setNotificationMessage('Data successfully deleted')
        setNotificationColor(green[600])
        setOpenNotification(true)
      })
      .catch(error => {
        onClose()
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
            <CancelIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <CheckIcon />
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