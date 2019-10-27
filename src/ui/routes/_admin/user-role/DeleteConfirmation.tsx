import * as React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContentText, DialogActions, IconButton } from '@material-ui/core'
import { UserRoleState, UserRole } from 'store/user-role/types'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import { CancelRounded, CheckRounded } from '@material-ui/icons'
import { setRoles } from 'store/user-role/actions'
import Notification from 'ui/components/Notification'
import { green, red } from '@material-ui/core/colors'

interface DeleteConfirmationProps {
  open: boolean
  UserRole?: UserRoleState
  setRoles: (roles: UserRole[]) => void
  onClose: () => void
  onSuccess: () => void
}

const DeleteConfirmation = (props: DeleteConfirmationProps) => {
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API}/user-role/${props.UserRole!.role.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(() => {
        const roles = props.UserRole!.roles.filter((item) => item.id !== props.UserRole!.role.id)
        props.setRoles(roles)
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
  UserRole: state.UserRole
})
const mapActionToProps = (dispatch: Dispatch) => ({
  setRoles: (roles: UserRole[]) => dispatch(setRoles(roles))
})

export default connect(mapStateToProps, mapActionToProps)(DeleteConfirmation)