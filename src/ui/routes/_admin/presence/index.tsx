import * as React from 'react';
import { useState } from 'react'
import moment from 'moment'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import { AppState } from 'store';
import { PresenceState, Presence } from 'store/presence/types';
import { setPresence, setPresences } from 'store/presence/actions';
import FilterListIcon from '@material-ui/icons/FilterList'
import FilterDialog from './FilterDialog'

interface PresenceRouteProps {
  Presence: PresenceState
  setPresences: (presences: Presence[]) => void
}

const PresenceRoute = (props: PresenceRouteProps) => {
  const { setPresences, Presence } = props
  const { presences } = Presence

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(25)
  
  const [openFilterDialog, setOpenFilterDialog] = useState(false)
  const [filterValues, setFilterValues] = useState({})

  React.useEffect(() => {
    const loadData = (limit: number, skip: number) => {
      fetch(`${process.env.REACT_APP_API}/presences?limit=${limit}&skip=${skip - 1}`)
        .then(response => response.json())
        .then(data => {
          setPresences(data.items)
        })
    }

    loadData(perPage, page)
  }, [page, perPage, setPresences])

  return (
    <React.Fragment>
      <Paper>
        <IconButton onClick={() => setOpenFilterDialog(true)}>
          <FilterListIcon />
        </IconButton>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>NIK</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Departement</TableCell>
              <TableCell>Present For</TableCell>
              <TableCell>Present Time</TableCell>
              <TableCell>
                Present Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              presences!.map((item, index) => (
                <TableRow>
                  <TableCell>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {item.user!.nik}
                  </TableCell>
                  <TableCell>
                    {item.user!.name}
                  </TableCell>
                  <TableCell>
                    {item.user!.departement!.name}
                  </TableCell>
                  <TableCell>
                    {item.type!.name}
                  </TableCell>
                  <TableCell>
                    {moment(item.createdAt).format('HH:mm').toString()}
                  </TableCell>
                  <TableCell>
                    {moment(item.createdAt).format('DD-MM-YYYY').toString()}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
      <FilterDialog
        open={openFilterDialog}
        onClose={() => setOpenFilterDialog(false)}
        onSubmit={setFilterValue} />
    </React.Fragment>
  )
}

const mapState = (state: AppState) => ({
  Presence: state.Presence
})
const mapDispatch = (dispatch: Dispatch) => ({
  setPresence: (presence: Presence) => dispatch(setPresence(presence)),
  setPresences: (presences: Presence[]) => dispatch(setPresences(presences))
})

export default connect(mapState, mapDispatch)(PresenceRoute);