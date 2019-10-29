import * as React from 'react';
import { useEffect, useState } from 'react'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { AppState } from 'store';
import { PresenceState, Presence } from 'store/presence/types';
import { setPresence, setPresences } from 'store/presence/actions';

interface PresenceRouteProps {
  Presence: PresenceState
  setPresences: (presences: Presence[]) => void
}

const PresenceRoute = (props: PresenceRouteProps) => {
  const [openPrintDialog, setOpenPrintDialog] = useState(false)
  const [openFormAdd, setOpenFormAdd] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = (limit = 20, skip = 0) => {
    fetch(`${process.env.REACT_APP_API}/presences?limit=${limit}&skip=${skip}`)
      .then(response => response.json())
      .then(data => {
        props.setPresences(data.items)
      })
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
              <TableCell>Departement</TableCell>
              <TableCell>Present At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.Presence.presences!.map((item, index) => (
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
                    {item.createdAt}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
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