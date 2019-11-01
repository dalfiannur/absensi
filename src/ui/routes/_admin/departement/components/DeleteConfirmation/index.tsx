import * as React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContentText, DialogActions, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckIcon from '@material-ui/icons/Check'
import Notification from 'ui/components/Notification'
import { green, red } from '@material-ui/core/colors'
import { DepartementState, Departement } from 'store/departement/types'
import { setDepartements } from 'store/departement/actions'

interface DeleteConfirmationProps {
  open: boolean
  data: Departement
  Departement?: DepartementState
  setDepartements: (types: Departement[]) => void
  onClose: () => void
}

const DeleteConfirmation = (props: DeleteConfirmationProps) => {
  const { departements } = props.Departement!
  const { data, open, onClose, setDepartements } = props

  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API}/departement/${data.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(() => {
        const result = departements.filter((item) => item.id !== data.id)
        setDepartements(result)
        onClose()
        setNotificationMessage('Data successfully deleted')
        setNotificationColor(green[600])
        setOpenNotification(true)
      })
      .catch(error => {
        onClose()
        setNotificationMessage('Data failed to delete')
        setNotificationColor(red[600])
        setOpenNotification(true)
      })
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='xs'>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContentText>Are you sure want to delete this data?</DialogContentText>
        <DialogActions>
          <IconButton onClick={props.onClose}>
            <CancelIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <CheckIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      <Notification
        open={openNotification}
        message={notificationMessage}
        color={notificationColor}
        onClose={() => setOpenNotification(false)} />
    </React.Fragment>
  )
}

const mapStateToProps = (state: AppState) => ({
  Departement: state.Departement
})
const mapActionToProps = (dispatch: Dispatch) => ({
  setDepartements: (departements: Departement[]) => dispatch(setDepartements(departements))
})

export default connect(mapStateToProps, mapActionToProps)(DeleteConfirmation)