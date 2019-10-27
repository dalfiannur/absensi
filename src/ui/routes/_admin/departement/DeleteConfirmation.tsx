import * as React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContentText, DialogActions, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import { CancelRounded, CheckRounded } from '@material-ui/icons'
import Notification from 'ui/components/Notification'
import { green, red } from '@material-ui/core/colors'
import { DepartementState, Departement } from 'store/departement/types'
import { setDepartements } from 'store/departement/actions'

interface DeleteConfirmationProps {
  open: boolean
  Departement?: DepartementState
  setDepartements: (types: Departement[]) => void
  onClose: () => void
}

const DeleteConfirmation = (props: DeleteConfirmationProps) => {
  const state = props.Departement!
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const handleDelete = () => {
    fetch(`${process.env.REACT_APP_API}/departement/${state.departement.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(() => {
        const departements = state.departements.filter((item) => item.id !== state.departement.id)
        props.setDepartements(departements)
        props.onClose()
        setNotificationMessage('Data successfully deleted')
        setNotificationColor(green[600])
        setOpenNotification(true)
      })
      .catch(error => {
        props.onClose()
        setNotificationMessage('Data failed to delete')
        setNotificationColor(red[600])
        setOpenNotification(true)
      })
  }

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContentText>Are you sure want to delete this data?</DialogContentText>
        <DialogActions>
          <IconButton onClick={props.onClose}>
            <CancelRounded />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <CheckRounded />
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
  setDepartements: (types: Departement[]) => dispatch(setDepartements(types))
})

export default connect(mapStateToProps, mapActionToProps)(DeleteConfirmation)