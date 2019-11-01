import * as React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import Notification from 'ui/components/Notification'
import green from '@material-ui/core/colors/green'
import { DepartementState, Departement } from 'store/departement/types'
import { setDepartements } from 'store/departement/actions'

interface FormEditProps {
  open: boolean
  Departement?: DepartementState
  onClose: () => void
  setDepartements?: (departements: Departement[]) => void
}

const FormEdit = (props: FormEditProps) => {
  const { departements } = props.Departement!
  const { open, onClose, setDepartements } = props

  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const [name, setName] = useState('')

  const handleSave = () => {
    fetch(`${process.env.REACT_APP_API}/departement`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then((data) => {
        setDepartements!([...departements, data])
        setNotificationMessage('Data successfully created')
        setNotificationColor(green[600])
        setOpenNotification(true)
        onClose()
      })
      .catch((error) => {
        setNotificationMessage('Error while getting data')
        setNotificationColor(green[600])
        setOpenNotification(true)
        onClose()
      })
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle>Create New Departement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label='Departement Name'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={onClose}>
            <CancelIcon />
          </IconButton>
          <IconButton onClick={() => handleSave()}>
            <SaveIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      <Notification
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        message={notificationMessage}
        color={notificationColor} />
    </React.Fragment>
  )
}

const mapStateToProps = (state: AppState) => ({
  Departement: state.Departement
})

const mapActionToProps = (dispatch: Dispatch) => ({
  setDepartements: (departements: Departement[]) => dispatch(setDepartements(departements))
})

export default connect(mapStateToProps, mapActionToProps)(FormEdit)