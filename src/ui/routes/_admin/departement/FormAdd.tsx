import * as React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import { SaveRounded, CancelRounded } from '@material-ui/icons'
import Notification from 'ui/components/Notification'
import { green } from '@material-ui/core/colors'
import { DepartementState, Departement } from 'store/departement/types'
import { setDepartements } from 'store/departement/actions'

interface FormEditProps {
  open: boolean
  Departement?: DepartementState
  onClose: () => void
  setPresenceTypes?: (types: Departement[]) => void
}

const FormEdit = (props: FormEditProps) => {
  const state = props.Departement!
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')

  const handleSave = () => {
    fetch(`${process.env.REACT_APP_API}/departement`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, name })
    })
      .then(res => res.json())
      .then((data) => {
        const types = state.departements.map((item, index) => {
          if (item.id === state.departement.id) {
            return state!.departement
          }
          return item
        })

        props.setPresenceTypes!([...types, data])
        setNotificationMessage('Data successfully created')
        setNotificationColor(green[600])
        setOpenNotification(true)
        props.onClose()
      })
      .catch((error) => {
        console.error(error)
        setNotificationMessage('Error while getting data')
        setNotificationColor(green[600])
        setOpenNotification(true)
        props.onClose()
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
        <DialogTitle>Create New Departement</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label='Departement Code'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setCode(e.target.value)}
          />
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
          <IconButton onClick={props.onClose}>
            <CancelRounded />
          </IconButton>
          <IconButton onClick={() => handleSave()}>
            <SaveRounded />
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
  setPresenceTypes: (types: Departement[]) => dispatch(setDepartements(types))
})

export default connect(mapStateToProps, mapActionToProps)(FormEdit)