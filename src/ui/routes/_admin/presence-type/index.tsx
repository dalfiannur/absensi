import * as React from 'react';
import { useState, useEffect } from 'react';
import { AppState } from 'store'
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
import { EditRounded, DeleteRounded, AddRounded } from '@material-ui/icons';
import { Dispatch } from 'redux';
import FormEdit from './FormEdit';
import FormAdd from './FormAdd';
import DeleteConfirmation from './DeleteConfirmation';
import { PresenceType, PresenceTypeState } from 'store/presence-type/types';
import { setPresenceType, setPresenceTypes } from 'store/presence-type/actions';

interface PresenceTypeRouteProps {
  PresenceType?: PresenceTypeState
  setPresenceType?: (type: PresenceType) => void
  setPresenceTypes?: (roles: PresenceType[]) => void
}

const PresenceTypeRoute = (props: PresenceTypeRouteProps) => {
  const [openFormEdit, setOpenFormEdit] = useState(false)
  const [openFormAdd, setOpenFormAdd] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/presence-types`)
      .then(res => res.json())
      .then(data => {
        props.setPresenceTypes!(data.items)
      })
  }, [props.setPresenceTypes])

  const handleFormEdit = (type: PresenceType) => {
    props.setPresenceType!(type)
    setOpenFormEdit(true)
  }

  const handleDeleteConfirmation = (type: PresenceType) => {
    props.setPresenceType!(type)
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
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.PresenceType!.presenceTypes.map((item, index) => (
                <TableRow key={`row-${item.id}`}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>
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
  PresenceType: state.PresenceType
})
const mapActionToProps = (dispatch: Dispatch) => ({
  setPresenceType: (type: PresenceType) => dispatch(setPresenceType(type)),
  setPresenceTypes: (types: PresenceType[]) => dispatch(setPresenceTypes(types))
})
export default connect(mapStateToProps, mapActionToProps)(PresenceTypeRoute);