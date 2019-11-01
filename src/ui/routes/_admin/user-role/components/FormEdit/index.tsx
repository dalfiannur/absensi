import * as React from 'react'
import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import { UserRole, UserRoleState } from 'store/user-role/types'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { setRoles } from 'store/user-role/actions'
import Notification from 'ui/components/Notification'
import { green } from '@material-ui/core/colors'

interface FormEditProps {
  open: boolean
  data: UserRole
  UserRole?: UserRoleState
  onClose: () => void
  setRoles?: (roles: UserRole[]) => void
}

const FormEdit = (props: FormEditProps) => {
  const { roles } = props.UserRole!
  const { data, open, onClose, setRoles } = props

  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const [name, setName] = useState('')

  useEffect(() => {
    setName(data.name)
  }, [data])

  const handleUpdate = () => {
    fetch(`${process.env.REACT_APP_API}/user-role/${data.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(result => {
        const newData = roles.map((item) => {
          if (item.id === data.id) {
            return result
          }
          return item
        })

        setRoles!(newData)
        setNotificationMessage('Data successfully updated')
        setNotificationColor(green[600])
        setOpenNotification(true)
        onClose()
      })
      .catch((error) => {
        setNotificationMessage('Error while getting data')
        setNotificationColor(green[600])
        setOpenNotification(true)
        onClose()
      })
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}>
        <DialogTitle>Edit User Role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={name}
            label='Role Name'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={onClose}>
            <CancelIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdate()}>
            <SaveIcon />
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