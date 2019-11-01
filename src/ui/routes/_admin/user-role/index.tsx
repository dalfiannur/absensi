import * as React from 'react';
import querystring from 'querystring'
import { useState, useEffect } from 'react';
import { AppState } from 'store'
import { setRoles } from 'store/user-role/actions'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination
} from '@material-ui/core';
import TablePaginationActions from 'ui/components/TablePaginationActions'
import { connect } from 'react-redux';
import { UserRole, UserRoleState } from 'store/user-role/types';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { Dispatch } from 'redux';
import FormEdit from './components/FormEdit';
import FormAdd from './components/FormAdd';
import DeleteConfirmation from './components/DeleteConfirmation';
import { useStyle } from './style'

interface UserRoleRouteProps {
  UserRole?: UserRoleState
  setRoles?: (roles: UserRole[]) => void
}

const UserRoleRoute = (props: UserRoleRouteProps) => {
  const classes = useStyle()

  const { roles } = props.UserRole!
  const { setRoles } = props

  const [openFormEdit, setOpenFormEdit] = useState(false)
  const [openFormAdd, setOpenFormAdd] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  const [role, setRole] = useState<UserRole>({
    name: ''
  })

  useEffect(() => {
    const query = querystring.stringify({ page, limit })
    fetch(`${process.env.REACT_APP_API}/user-roles?${query}`)
      .then(res => res.json())
      .then(data => {
        setRoles!(data.items)
        setTotalItems(data.totalItems)
      })
  }, [page, limit])

  const handleFormEdit = (role: UserRole) => {
    setRole(role)
    setOpenFormEdit(true)
  }

  const handleDeleteConfirmation = (role: UserRole) => {
    setRole(role)
    setOpenDeleteConfirmation(true)
  }

  return (
    <React.Fragment>
      <Paper style={{ position: 'relative' }}>
        <div className={classes.PaperHeader}>
          <IconButton onClick={() => setOpenFormAdd(true)}>
            <AddIcon />
          </IconButton>
        </div>
        <div className={classes.TableWrapper}>
          <Table
            size='small'
            stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                roles.map((item, index) => (
                  <TableRow key={`row-${item.id}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>
                      <IconButton color='primary' onClick={() => handleFormEdit(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color='secondary' onClick={() => handleDeleteConfirmation(item)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
        <div className={classes.PaginationWrapper}>
          <TablePagination
            className={classes.Pagination}
            rowsPerPageOptions={[5, 10, 25, 50]}
            colSpan={5}
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
        </div>
      </Paper>
      <FormEdit
        data={role}
        open={openFormEdit}
        onClose={() => setOpenFormEdit(false)} />
      <FormAdd
        open={openFormAdd}
        onClose={() => setOpenFormAdd(false)} />
      <DeleteConfirmation
        data={role}
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)} />
    </React.Fragment >
  )
}

const mapStateToProps = (state: AppState) => ({
  UserRole: state.UserRole
})
const mapActionToProps = (dispatch: Dispatch) => ({
  setRoles: (roles: UserRole[]) => dispatch(setRoles(roles))
})
export default connect(mapStateToProps, mapActionToProps)(UserRoleRoute);