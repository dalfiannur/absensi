import * as React from 'react'
import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, FormControl, InputLabel, Select } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import { SaveRounded, CancelRounded } from '@material-ui/icons'
import Notification from 'ui/components/Notification'
import { green } from '@material-ui/core/colors'
import { UserRoleState, UserRole } from 'store/user-role/types'
import { setRoles } from 'store/user-role/actions'
import { User, UserState } from 'store/user/types'
import { setUsers } from 'store/user/actions'

interface FormEditProps {
  open: boolean
  User?: UserState
  UserRole?: UserRoleState
  onClose: () => void
  setUsers?: (types: User[]) => void
  setRoles: (roles: UserRole[]) => void
}

const FormEdit = (props: FormEditProps) => {
  const state = props.User!
  const roleState = props.UserRole!
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')
  const [nik, setNIK] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [improvement, setImprovement] = useState('')
  const [roleId, setRoleId] = useState(0)

  useEffect(() => {
    if (props.UserRole!.roles.length === 0) {
      fetch(`${process.env.REACT_APP_API}/user-roles`)
      .then(res => res.json())
      .then((data) => {
        props.setRoles!(data.items)
      })
    }
  })

  const handleSave = () => {
    fetch(`${process.env.REACT_APP_API}/user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nik,
        name,
        username,
        password,
        improvement,
        roleId
      })
    })
      .then(res => res.json())
      .then(() => {
        const users = state.users.map((item) => {
          if (item.id === state.user.id) {
            return state.user
          }
          return item
        })

        const role = roleState.roles.filter(item => item.id === roleId)
        props.setUsers!([...users, {
          nik,
          name,
          username,
          improvement,
          roleId,
          role: {
            name: role[0].name
          }
        }])
        setNotificationMessage('Data successfully created')
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
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label='NIK'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setNIK(e.target.value)}
          />
          <TextField
            autoFocus
            label='Name'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            label='Username'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setUsername(e.target.value)}
          />
          <TextField
            autoFocus
            label='Password'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <TextField
            autoFocus
            label='Improvement'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setImprovement(e.target.value)}
          />
          <FormControl
            variant='outlined'
            margin='dense'
          >
            <InputLabel>Role</InputLabel>
            <Select
              native
              onChange={(e: any) => setRoleId(parseFloat(e.target.value))}
            >
              {
                props.UserRole!.roles.map((item) => (
                  <option key={`role-${item.id}`} value={item.id}>{item.name}</option>
                ))
              }
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={props.onClose}>
            <CancelRounded />
          </IconButton>
          <IconButton onClick={() => handleSave()}>
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
  User: state.User,
  UserRole: state.UserRole
})

const mapActionToProps = (dispatch: Dispatch) => ({
  setUsers: (users: User[]) => dispatch(setUsers(users)),
  setRoles: (roles: UserRole[]) => dispatch(setRoles(roles))
})

export default connect(mapStateToProps, mapActionToProps)(FormEdit)