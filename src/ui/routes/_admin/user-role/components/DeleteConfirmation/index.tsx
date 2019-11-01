import * as React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContentText, DialogActions, IconButton } from '@material-ui/core'
import { UserRoleState, UserRole } from 'store/user-role/types'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckIcon from '@material-ui/icons/Check'
import { setRoles } from 'store/user-role/actions'
import Notification from 'ui/components/Notification'
import { green, red } from '@material-ui/core/colors'

interface DeleteConfirmationProps {
  open: boolean
  data: UserRole
  UserRole?: UserRoleState
  setRoles: (roles: UserRole[]) => void
  onClose: () => void
}

const DeleteConfirmation = (props: DeleteConfirmationProps) => {
  const { roles } = props.UserRole!
  const { data, open, onClose, setRoles } = props

  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API}/user-role/${data.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(() => {
        const result = roles.filter((item) => item.id !== data.id)
        setRoles(result)
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
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='xs'>
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
  UserRole: state.UserRole
})
const mapActionToProps = (dispatch: Dispatch) => ({
  setRoles: (roles: UserRole[]) => dispatch(setRoles(roles))
})

export default connect(mapStateToProps, mapActionToProps)(DeleteConfirmation)