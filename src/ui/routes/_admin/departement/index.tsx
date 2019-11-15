import * as React from 'react';
import querystring from 'querystring'
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
  TableFooter,
  TablePagination
} from '@material-ui/core';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { Dispatch } from 'redux';
import FormEdit from './components/FormEdit';
import FormAdd from './components/FormAdd';
import DeleteConfirmation from './components/DeleteConfirmation';
import { DepartementState, Departement } from 'store/departement/types';
import { setDepartement, setDepartements } from 'store/departement/actions';
import TablePaginationActions from 'ui/components/TablePaginationActions'
import { useStyle } from './style'

interface DepartementRouteProps {
  Departement?: DepartementState
  setDepartements?: (roles: Departement[]) => void
}

const DepartementRoute = (props: DepartementRouteProps) => {
  const classes = useStyle()
  const { departements } = props.Departement!
  const { setDepartements } = props

  const [openFormEdit, setOpenFormEdit] = useState(false)
  const [openFormAdd, setOpenFormAdd] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const [departement, setDepartement] = useState<Departement>({
    name: '',
    code: ''
  })

  const [tableInfo, setTableInfo] = useState({
    totalItems: 0,
    totalPages: 0
  })

  useEffect(() => {
    const query = querystring.stringify({ page, limit })
    fetch(`${process.env.REACT_APP_API}/departements?${query}`)
      .then(res => res.json())
      .then(data => {
        setDepartements!(data.items)
        setTableInfo({
          totalItems: data.totalItems,
          totalPages: data.pageCount
        })
      })
  }, [limit, page])

  const handleFormEdit = (departement: Departement) => {
    setDepartement(departement)
    setOpenFormEdit(true)
  }

  const handleDeleteConfirmation = (departement: Departement) => {
    setDepartement(departement)
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
                <TableCell>Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                departements.map((item, index) => (
                  <TableRow key={`row-${item.id}`}>
                    <TableCell>{(index + 1) + ((page - 1) * limit)}</TableCell>
                    <TableCell>{item.code}</TableCell>
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
            count={tableInfo.totalItems}
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
        data={departement}
        open={openFormEdit}
        onClose={() => setOpenFormEdit(false)} />
      <FormAdd
        open={openFormAdd}
        onClose={() => setOpenFormAdd(false)} />
      <DeleteConfirmation
        data={departement}
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

