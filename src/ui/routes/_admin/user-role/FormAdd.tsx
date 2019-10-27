import * as React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import { UserRole, UserRoleState } from 'store/user-role/types'
import { SaveRounded, CancelRounded } from '@material-ui/icons'
import { setRoles } from 'store/user-role/actions'
import Notification from 'ui/components/Notification'
import { green } from '@material-ui/core/colors'

interface FormEditProps {
  open: boolean
  UserRole?: UserRoleState 
  onClose: () => void
  setRoles?: (roles: UserRole[]) => void
}

const FormEdit = (props: FormEditProps) => {
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')
  const [name, setName] = useState('')

  const handleUpdate = () => {
    fetch(`${process.env.REACT_APP_API}/user-role`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(res => {
        const roles = props.UserRole!.roles.map((item, index) => {
          if (item.id === props.UserRole!.role.id) {
            return props.UserRole!.role
          }
          return item
        })

        props.setRoles!([...roles, { name }])
        setNotificationMessage('Data successfully updated')
        setNotificationColor(green[600])
        setOpenNotification(true)
        props.onClose()
      })
      .catch((error) => {
        console.error(error)
        setNotificationMessage('Error while getting data')
        setNotificationColor(green[600])
        setOpenNotification(true)
        props.onClose()
      })
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
      >
        <DialogTitle>Create New User Role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label='Role Name'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={props.onClose}>
            <CancelRounded />
          </IconButton>
          <IconButton onClick={() => handleUpdate()}>
            <SaveRounded />
          </IconButton>
        </DialogActions>
      </Dialog>
      <Notification
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        message={notificationMessage}
        color={notificationColor} />
    </React.Fragment>
  )
}

const mapStateToProps = (state: AppState) => ({
  UserRole: state.UserRole
})

const mapActionToProps = (dispatch: Dispatch) => ({
  setRoles: (roles: UserRole[]) => dispatch(setRoles(roles))
})

export default connect(mapStateToProps, mapActionToProps)(FormEdit)