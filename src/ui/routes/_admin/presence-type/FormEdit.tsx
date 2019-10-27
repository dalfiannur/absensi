import * as React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import { SaveRounded, CancelRounded } from '@material-ui/icons'
import Notification from 'ui/components/Notification'
import { green } from '@material-ui/core/colors'
import { PresenceTypeState, PresenceType } from 'store/presence-type/types'
import { setPresenceType, setPresenceTypes } from 'store/presence-type/actions'

interface FormEditProps {
  open: boolean
  PresenceType?: PresenceTypeState
  onClose: () => void
  setPresenceType?: (type: PresenceType) => void
  setPresenceTypes?: (roles: PresenceType[]) => void
}

const FormEdit = (props: FormEditProps) => {
  const state = props.PresenceType!
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const handleUpdate = () => {
    fetch(`${process.env.REACT_APP_API}/presence-type/${state.presenceType.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: state.presenceType.code,
        name: state.presenceType.name
      })
    })
      .then(res => res.json())
      .then(() => {
        const types = state.presenceTypes.map((item, index) => {
          if (item.id === state.presenceType.id) {
            return state.presenceType
          }
          return item
        })

        props.setPresenceTypes!(types)
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
        <DialogTitle>Edit Presence Type</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            value={state!.presenceType.code}
            label='Presence Type Code'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => props.setPresenceType!({
              ...state.presenceType,
              code: e.target.value
            })}
          />
          <TextField
            autoFocus
            value={state!.presenceType.name}
            label='Presence Type Name'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => props.setPresenceType!({
              ...state.presenceType,
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
  PresenceType: state.PresenceType
})

const mapActionToProps = (dispatch: Dispatch) => ({
  setPresenceType: (type: PresenceType) => dispatch(setPresenceType(type)),
  setPresenceTypes: (types: PresenceType[]) => dispatch(setPresenceTypes(types))
})

export default connect(mapStateToProps, mapActionToProps)(FormEdit)