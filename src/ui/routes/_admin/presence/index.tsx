import * as React from 'react';
import querystring from 'querystring'
import { useState } from 'react'
import moment from 'moment'
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
  Switch,
  TablePagination,
  FormGroup,
  FormControlLabel,
  Zoom,
  Chip
} from '@material-ui/core';
import { AppState } from 'store';
import { PresenceState, Presence } from 'store/presence/types';
import { setPresences } from 'store/presence/actions';
import FilterListIcon from '@material-ui/icons/FilterList'
import FilterDialog from './components/FilterDialog'
import { useStyle } from './style'
import TablePaginationActions from 'ui/components/TablePaginationActions'
import { User, UserState } from 'store/user/types';
import { setUsers } from 'store/user/actions'

interface PresenceRouteProps {
  User: UserState
  setUsers: (users: User[]) => void
}

const PresenceRoute = (props: PresenceRouteProps) => {
  const classes = useStyle()

  const { setUsers } = props
  const { users } = props.User

  const [openFilterDialog, setOpenFilterDialog] = useState(false)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(25)
  const [totalItems, setTotalItems] = useState(0)
  const [attended, setAttended] = useState(true)

  const [filterValues, setFilterValues] = useState({
    date: '',
    typeId: 0
  })

  React.useEffect(() => {
    const query = querystring.stringify({
      attended,
      limit,
      page: page - 1,
      ...filterValues
    })

    fetch(`${process.env.REACT_APP_API}/presences?${query}`)
      .then(response => response.json())
      .then(data => {
        setUsers(data.items)
        setTotalItems(data.totalItems)
      })
  }, [page, limit, filterValues, attended])

  return (
    <React.Fragment>
      <Paper>
        <div className={classes.PaperHeader}>
          <FormGroup row>
            <IconButton onClick={() => setOpenFilterDialog(true)}>
              <FilterListIcon />
            </IconButton>
            <FormControlLabel
              control={
                <Switch checked={attended} onChange={(_, val) => setAttended(val)} />
              }
              label="Present" />
          </FormGroup>
        </div>
        <div className={classes.TableWrapper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>NIK</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Departement</TableCell>
                <TableCell>Present For</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                users!.map((user, index) => (
                  <Zoom in={true} style={{ transitionDelay: `${500 * index}ms` }} key={user.name}>
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
                        {user.departement!.name}
                      </TableCell>
                      <TableCell>
                        {
                          user.presences!.map((presence: any) => (
                            <Chip color='primary' size='small' key={`${presence.name}-${user.nik}`} label={presence.type.name} />
                          ))
                        }
                      </TableCell>
                    </TableRow>
                  </Zoom>
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
      <FilterDialog
        open={openFilterDialog}
        attended={attended}
        onClose={() => setOpenFilterDialog(false)}
        onSubmit={setFilterValues} />
    </React.Fragment>
  )
}

const mapState = (state: AppState) => ({
  User: state.User
})
const mapDispatch = (dispatch: Dispatch) => ({
  setUsers: (users: User[]) => dispatch(setUsers(users))
})

export default connect(mapState, mapDispatch)(PresenceRoute);