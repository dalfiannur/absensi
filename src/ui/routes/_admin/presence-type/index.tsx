import * as React from 'react';
import Moment from 'moment'
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
  TablePagination
} from '@material-ui/core';
import TablePaginationActions from 'ui/components/TablePaginationActions'
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { Dispatch } from 'redux';
import FormEdit from './components/FormEdit';
import FormAdd from './components/FormAdd';
import DeleteConfirmation from './components/DeleteConfirmation';
import { PresenceType, PresenceTypeState } from 'store/presence-type/types';
import { setPresenceType, setPresenceTypes } from 'store/presence-type/actions';
import { useStyle } from './style'

interface PresenceTypeRouteProps {
  PresenceType?: PresenceTypeState
  setPresenceTypes?: (roles: PresenceType[]) => void
}

const PresenceTypeRoute = (props: PresenceTypeRouteProps) => {
  const classes = useStyle()

  const { setPresenceTypes } = props
  const { presenceTypes } = props.PresenceType!
  
  const [openFormEdit, setOpenFormEdit] = useState(false)
  const [openFormAdd, setOpenFormAdd] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  const [presenceType, setPresenceType] = useState<PresenceType>({
    name: '',
    code: '',
    startTime: '',
    endTime: ''
  })

  useEffect(() => {
    const query = querystring.stringify({ page, limit })
    fetch(`${process.env.REACT_APP_API}/presence-types?${query}`)
      .then(res => res.json())
      .then(data => {
        setPresenceTypes!(data.items)
        setTotalItems(data.totalItems)
      })
  }, [page, limit])

  const handleFormEdit = (type: PresenceType) => {
    setPresenceType(type)
    setOpenFormEdit(true)
  }

  const handleDeleteConfirmation = (type: PresenceType) => {
    setPresenceType!(type)
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
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                presenceTypes.map((item, index) => (
                  <TableRow key={`row-${item.id}`}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.startTime}</TableCell>
                    <TableCell>{item.endTime}</TableCell>
                    <TableCell>{Moment(item.createdAt).format('DD-MM-YYYY HH:mm')}</TableCell>
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
        data={presenceType}
        open={openFormEdit}
        onClose={() => setOpenFormEdit(false)} />
      <FormAdd
        open={openFormAdd}
        onClose={() => setOpenFormAdd(false)} />
      <DeleteConfirmation
        data={presenceType}
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)} />
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