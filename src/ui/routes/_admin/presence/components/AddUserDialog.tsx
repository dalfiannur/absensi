import * as React from 'react'
import {
  Dialog, DialogContent, DialogTitle, TextField, InputLabel, FormControl, Select
} from '@material-ui/core'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { User } from 'store/user/types'
import { UserRole, UserRoleState } from 'store/user-role/types'
import { setRoles } from 'store/user-role/actions'
import { AppState } from 'store'

interface AddUserDialogProps {
  open: boolean
  onClose: () => void
  UserRole?: UserRoleState
  setRoles?: (roles: UserRole[]) => void
}

const AddUserDialog = (props: AddUserDialogProps) => {
  const [user, setUser] = React.useState<User>({
    nik: '',
    name: '',
    username: '',
    improvement: '',
    roleId: 2,
    picture: ''
  })

  React.useEffect(() => {
    loadRoles()
  }, [])

  const loadRoles = () => {
    fetch(`${process.env.REACT_APP_API}/user-roles`)
      .then(response => response.json())
      .then(data => {
        props.setRoles!(data.items)
      })
  }

  return (
    <Dialog
      open={props.open}
      fullWidth
      maxWidth='xs'
      onClose={props.onClose}
    >
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <TextField
          id='input-nik'
          label='NIK'
          fullWidth
          margin='dense'
          variant='outlined'
          onChange={(e: any) => setUser({ ...user, nik: e.target.value })}
        />
        <TextField
          id='input-name'
          label='Name'
          fullWidth
          margin='dense'
          variant='outlined'
          onChange={(e: any) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          id='input-improvement'
          label='Improvement'
          fullWidth
          margin='dense'
          variant='outlined'
          onChange={(e: any) => setUser({ ...user, improvement: e.target.value })}
        />
        <FormControl
          variant='outlined'
          margin='dense'
        >
          <InputLabel>Role</InputLabel>
          <Select
            native
            onChange={(e: any) => setUser({ ...user, roleId: e.target.value })}
          >
            {
              props.UserRole!.roles.map((item) => (
                <option key={`role-${item.id}`} value={item.id}>{item.name}</option>
              ))
            }
          </Select>
        </FormControl>
        
        <TextField
          id='input-nik'
          label='NIK'
          fullWidth
          margin='dense'
          variant='outlined'
          onChange={(e: any) => setUser({ ...user, nik: e.target.value })}
        />
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = (state: AppState) => ({
  UserRole: state.UserRole
})
const mapActionToProps = (dispatch: Dispatch) => ({
  setRoles: (roles: UserRole[]) => dispatch(setRoles(roles))
})

export default connect(mapStateToProps, mapActionToProps)(AddUserDialog)