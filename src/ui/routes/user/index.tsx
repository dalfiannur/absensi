import * as React from 'react';
import { Dispatch } from 'redux';
import { setUsers, handlePrintDialog, setUser } from 'store/actions/user';
import { User } from 'types/entity';
import { connect } from 'react-redux';
import { UserState } from 'store/reducers/user';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import {
  Print as PrintIcon,
  ViewList as ViewListIcon
} from '@material-ui/icons'
import PrintDialog from './components/PrintDialog'

type UserProps = {
  User: UserState,
  setUser: (user: User) => void,
  setUsers: (users: User[]) => void,
  handlePrintDialog: () => void
}

const UserRoute: React.FC<UserProps> = (props) => {

  React.useEffect(() => {
    loadData()
  })

  const loadData = () => {
    fetch(`${process.env.REACT_APP_API}/users`)
      .then(response => response.json())
      .then(data => {
        props.setUsers(data.items)
      })
  }

  const handlePrintDialog = (user: User) => {
    props.setUser(user);
    props.handlePrintDialog();
  }

  return (
    <React.Fragment>
      <Paper>
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
      <PrintDialog />
    </React.Fragment>
  )
}

const mapState = (state: any) => state
const mapDispatch = (dispatch: Dispatch) => ({
  setUser: (user: User) => dispatch(setUser(user)),
  setUsers: (users: User[]) => dispatch(setUsers(users)),
  handlePrintDialog: () => dispatch(handlePrintDialog())
})

export default connect(mapState, mapDispatch)(UserRoute);