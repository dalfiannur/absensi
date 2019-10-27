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
import { setDepartements, setDepartement } from 'store/departement/actions'

interface FormEditProps {
  open: boolean
  Departement?: DepartementState
  onClose: () => void
  setDepartement?: (type: Departement) => void
  setDepartements?: (roles: Departement[]) => void
}

const FormEdit = (props: FormEditProps) => {
  const state = props.Departement!
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const handleUpdate = () => {
    fetch(`${process.env.REACT_APP_API}/departement/${state.departement.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: state.departement.code,
        name: state.departement.name
      })
    })
      .then(res => res.json())
      .then((data) => {
        const types = state.departements.map((item) => {
          if (item.id === state.departement.id) {
            return state.departement
          }
          return item
        })

        props.setDepartements!(types)
        setNotificationMessage('Data successfully updated')
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
      >
        <DialogTitle>Edit Departement</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            value={state!.departement.code}
            label='Presence Type Code'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => props.setDepartement!({
              ...state.departement,
              code: e.target.value
            })}
          />
          <TextField
            autoFocus
            value={state!.departement.name}
            label='Presence Type Name'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => props.setDepartement!({
              ...state.departement,
              name: e.target.value
            })}
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={props.onClose}>
            <CancelRounded />
          </IconButton>
          <IconButton onClick={() => handleUpdate()}>
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
  setDepartement: (type: Departement) => dispatch(setDepartement(type)),
  setDepartements: (types: Departement[]) => dispatch(setDepartements(types))
})

export default connect(mapStateToProps, mapActionToProps)(FormEdit)