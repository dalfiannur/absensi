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
import { EditRounded, DeleteRounded, VisibilityRounded, AddRounded } from '@material-ui/icons';
import { Dispatch } from 'redux';
import FormEdit from './FormEdit';
import FormAdd from './FormAdd';
import DeleteConfirmation from './DeleteConfirmation';
import { DepartementState, Departement } from 'store/departement/types';
import { setDepartement, setDepartements } from 'store/departement/actions';

interface DepartementRouteProps {
  Departement?: DepartementState
  setDepartement?: (departement: Departement) => void
  setDepartements?: (roles: Departement[]) => void
}

const DepartementRoute = (props: DepartementRouteProps) => {
  const [openFormEdit, setOpenFormEdit] = useState(false)
  const [openFormAdd, setOpenFormAdd] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/departements`)
      .then(res => res.json())
      .then(data => {
        props.setDepartements!(data.items)
      })
  }, [props.setDepartements])

  const handleFormEdit = (departement: Departement) => {
    props.setDepartement!(departement)
    setOpenFormEdit(true)
  }

  const handleDeleteConfirmation = (departement: Departement) => {
    props.setDepartement!(departement)
    setOpenDeleteConfirmation(true)
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
              props.Departement!.departements.map((item, index) => (
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
        onClose={() => setOpenDeleteConfirmation(false)} />
    </React.Fragment>
  )
}

const mapStateToProps = (state: AppState) => ({
  Departement: state.Departement
})
const mapActionToProps = (dispatch: Dispatch) => ({
  setDepartement: (departement: Departement) => dispatch(setDepartement(departement)),
  setDepartements: (departements: Departement[]) => dispatch(setDepartements(departements))
})
export default connect(mapStateToProps, mapActionToProps)(DepartementRoute);