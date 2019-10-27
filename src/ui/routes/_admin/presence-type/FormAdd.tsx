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
import { setPresenceTypes } from 'store/presence-type/actions'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardTimePicker } from '@material-ui/pickers'

interface FormEditProps {
  open: boolean
  PresenceType?: PresenceTypeState
  onClose: () => void
  setPresenceTypes?: (types: PresenceType[]) => void
}

const FormEdit = (props: FormEditProps) => {
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleSave = () => {
    fetch(`${process.env.REACT_APP_API}/presence-type`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, name })
    })
      .then(res => res.json())
      .then((data) => {
        const types = props.PresenceType!.presenceTypes.map((item, index) => {
          if (item.id === props.PresenceType!.presenceType.id) {
            return props.PresenceType!.presenceType
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
        <DialogTitle>Create New Presence Type</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label='Presence Code'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setCode(e.target.value)}
          />
          <TextField
            label='Presence Name'
            fullWidth
            margin='dense'
            variant='outlined'
            onChange={(e: any) => setName(e.target.value)}
          />
          <KeyboardTimePicker
            margin='dense'
            label='Start Time'
            value={startTime}
            onChange={(e: any) => setStartTime(e.target.value)} />
            
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
  PresenceType: state.PresenceType
})

const mapActionToProps = (dispatch: Dispatch) => ({
  setPresenceTypes: (types: PresenceType[]) => dispatch(setPresenceTypes(types))
})

export default connect(mapStateToProps, mapActionToProps)(FormEdit)