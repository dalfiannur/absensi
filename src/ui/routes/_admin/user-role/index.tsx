import * as React from 'react';
import { useState, useEffect } from 'react';
import { AppState } from 'store'
import { setRole, setRoles } from 'store/user-role/actions'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { UserRole, UserRoleState } from 'store/user-role/types';
import { EditRounded, DeleteRounded, VisibilityRounded, AddRounded } from '@material-ui/icons';
import { Dispatch } from 'redux';
import FormEdit from './FormEdit';
import FormAdd from './FormAdd';
import DeleteConfirmation from './DeleteConfirmation';

interface UserRoleRouteProps {
  UserRole?: UserRoleState
  setRole?: (role: UserRole) => void
  setRoles?: (roles: UserRole[]) => void
}

const UserRoleRoute = (props: UserRoleRouteProps) => {
  const [openFormEdit, setOpenFormEdit] = useState(false)
  const [openFormAdd, setOpenFormAdd] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/user-roles`)
      .then(res => res.json())
      .then(data => {
        props.setRoles!(data.items)
      })
  }, [])

  const handleFormEdit = (role: UserRole) => {
    props.setRole!(role)
    setOpenFormEdit(true)
  }

  const handleDeleteConfirmation = (role: UserRole) => {
    props.setRole!(role)
    setOpenDeleteConfirmation(true)
  }

  const handleOnDeleteConfirmationSuccess = () => {
    setOpenDeleteConfirmation(false)
  }

  return (
    <React.Fragment>
      <Paper style={{ position: 'relative' }}>
        <IconButton onClick={() => setOpenFormAdd(true)}>
          <AddRounded />
        </IconButton>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.UserRole!.roles.map((item, index) => (
                <TableRow key={`row-${item.id}`}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <IconButton color='primary'>
                      <VisibilityRounded />
                    </IconButton>
                    <IconButton color='primary' onClick={() => handleFormEdit(item)}>
                      <EditRounded />
                    </IconButton>
                    <IconButton color='secondary' onClick={() => handleDeleteConfirmation(item)}>
                      <DeleteRounded />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
      <FormEdit
        open={openFormEdit}
        onClose={() => setOpenFormEdit(false)} />
      <FormAdd
        open={openFormAdd}
        onClose={() => setOpenFormAdd(false)} />
      <DeleteConfirmation
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        onSuccess={handleOnDeleteConfirmationSuccess} />
    </React.Fragment>
  )
}

const mapStateToProps = (state: AppState) => ({
  UserRole: state.UserRole
})
const mapActionToProps = (dispatch: Dispatch) => ({
  setRole: (role: UserRole) => dispatch(setRole(role)),
  setRoles: (roles: UserRole[]) => dispatch(setRoles(roles))
})
export default connect(mapStateToProps, mapActionToProps)(UserRoleRoute);