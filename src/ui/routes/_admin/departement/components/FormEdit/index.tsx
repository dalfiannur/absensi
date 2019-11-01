import * as React from 'react'
import { useState, useEffect } from 'react'
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
  data: Departement
  Departement?: DepartementState
  onClose: () => void
  setDepartements?: (roles: Departement[]) => void
}

const FormEdit = (props: FormEditProps) => {
  const { departements } = props.Departement!
  const { data, open, onClose, setDepartements } = props

  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const [name, setName] = useState('')

  useEffect(() => {
    setName(data.name)
  }, [data])

  const handleUpdate = () => {
    fetch(`${process.env.REACT_APP_API}/departement/${data.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(result => {
        const filteredData = departements.map((item) => {
          if (item.id === data.id) {
            return result
          }
          return item
        })

        setDepartements!(filteredData)
        setNotificationMessage('Data successfully updated')
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
        onClose={onClose} >
        <DialogTitle>Edit Departement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={name}
            label='Presence Type Name'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={onClose}>
            <CancelIcon />
          </IconButton>
          <IconButton onClick={() => handleUpdate()}>
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
  setDepartements: (types: Departement[]) => dispatch(setDepartements(types))
})

export default connect(mapStateToProps, mapActionToProps)(FormEdit)