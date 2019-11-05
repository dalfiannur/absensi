import * as React from 'react';
import querystring from 'querystring'
import { useEffect, useState } from 'react'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
  TableFooter
} from '@material-ui/core';
import TablePaginationActions from 'ui/components/TablePaginationActions'
import AddIcon from '@material-ui/icons/Add'
import PrintIcon from '@material-ui/icons/Print'
import ViewListIcon from '@material-ui/icons/ViewList'
import PublishIcon from '@material-ui/icons/Publish'
import PrintDialog from './components/PrintDialog'
import { User, UserState } from 'store/user/types';
import { setUsers } from 'store/user/actions';
import { AppState } from 'store';
import FormAdd from './FormAdd';
import { DropzoneDialog } from 'material-ui-dropzone'
import { useStyle } from './style'

interface UserRouteProps {
  User: UserState
  setUsers: (users: User[]) => void
}

const UserRoute = (props: UserRouteProps) => {
  const classes = useStyle()

  const [openPrintDialog, setOpenPrintDialog] = useState(false)
  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [openFormAdd, setOpenFormAdd] = useState(false)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  const [user, setUser] = useState<User>({
    nik: '',
    name: '',
    username: '',
    password: ''
  })

  useEffect(() => {
    const query = querystring.stringify({ page, limit })
    fetch(`${process.env.REACT_APP_API}/users?${query}`)
      .then(response => response.json())
      .then(data => {
        props.setUsers(data.items)
        setTotalItems(data.totalItems)
      })
  }, [page, limit])

  const handlePrintDialog = (user: User) => {
    setUser(user)
    setOpenPrintDialog(true)
  }

  const importUsersAction = (files: File[]) => {
    const formData = new FormData()
    formData.append('file', files[0])
    fetch(`${process.env.REACT_APP_API}/import-users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      },
      body: formData
    })
      .then(() => {
        setOpenImportDialog(false)
      })
  }

  return (
    <React.Fragment>
      <Paper>
        <div className={classes.PaperHeader}>
          <IconButton onClick={() => setOpenFormAdd(true)}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => setOpenImportDialog(true)}>
            <PublishIcon />
          </IconButton>
        </div>
        <div className={classes.TableWrapper}>
          <Table
            size='small'
            stickyHeader>
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
                  <TableRow key={user.nik}>
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  colSpan={7}
                  count={totalItems}
                  rowsPerPage={limit}
                  page={page - 1}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={(__, newPage) => setPage(newPage + 1)}
                  onChangeRowsPerPage={(e: any) => setLimit(e.target.value)}
                  ActionsComponent={TablePaginationActions} />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div >

        </div>
      </Paper>
      <PrintDialog data={user} open={openPrintDialog} onClose={() => setOpenPrintDialog(false)} />
      <FormAdd
        open={openFormAdd}
        onClose={() => setOpenFormAdd(false)} />
      <DropzoneDialog
        open={openImportDialog}
        onSave={importUsersAction}
        showPreviews={true}
        maxFileSize={5000000}
        acceptedFiles={[
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]}
        onClose={() => setOpenImportDialog(false)} />
    </React.Fragment>
  )
}

const mapState = (state: AppState) => ({
  User: state.User
})
const mapDispatch = (dispatch: Dispatch) => ({
  setUsers: (users: User[]) => dispatch(setUsers(users))
})

export default connect(mapState, mapDispatch)(UserRoute);