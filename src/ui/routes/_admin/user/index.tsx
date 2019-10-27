import * as React from 'react';
import { useEffect, useState } from 'react'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import {
  Add as AddIcon,
  Print as PrintIcon,
  ViewList as ViewListIcon
} from '@material-ui/icons'
import PrintDialog from './components/PrintDialog'
import { User, UserState } from 'store/user/types';
import { setUser, setUsers } from 'store/user/actions';
import { AppState } from 'store';
import FormAdd from './FormAdd';

interface UserRouteProps {
  User: UserState
  setUser: (user: User) => void
  setUsers: (users: User[]) => void
}

const UserRoute = (props: UserRouteProps) => {
  const [openPrintDialog, setOpenPrintDialog] = useState(false)
  const [openFormAdd, setOpenFormAdd] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/users`)
      .then(response => response.json())
      .then(data => {
        props.setUsers(data.items)
      })
  }, [])

  const handlePrintDialog = (user: User) => {
    props.setUser(user)
    setOpenPrintDialog(true)
  }

  return (
    <React.Fragment>
      <Paper>
        <IconButton onClick={() => setOpenFormAdd(true)}>
          <AddIcon />
        </IconButton>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>NIK</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Improvement</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.User.users.map((user, index) => (
                <TableRow>
                  <TableCell>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {user.nik}
                  </TableCell>
                  <TableCell>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    {user.improvement}
                  </TableCell>
                  <TableCell>
                    {user.role!.name}
                  </TableCell>
                  <TableCell>
                    {user.createdAt}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handlePrintDialog(user)}>
                      <PrintIcon />
                    </IconButton>
                    <IconButton >
                      <ViewListIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
      <PrintDialog open={openPrintDialog} onClose={() => setOpenPrintDialog(false)} />
      <FormAdd
        open={openFormAdd}
        onClose={() => setOpenFormAdd(false)}/>
    </React.Fragment>
  )
}

const mapState = (state: AppState) => ({
  User: state.User
})
const mapDispatch = (dispatch: Dispatch) => ({
  setUser: (user: User) => dispatch(setUser(user)),
  setUsers: (users: User[]) => dispatch(setUsers(users))
})

export default connect(mapState, mapDispatch)(UserRoute);