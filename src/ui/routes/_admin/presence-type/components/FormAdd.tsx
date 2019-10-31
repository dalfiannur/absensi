import * as React from 'react'
import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import { SaveRounded, CancelRounded } from '@material-ui/icons'
import Notification from 'ui/components/Notification'
import { green, red } from '@material-ui/core/colors'
import { PresenceTypeState, PresenceType } from 'store/presence-type/types'
import { setPresenceTypes } from 'store/presence-type/actions'
import DateFnsUtils from '@date-io/date-fns'
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { useStyle } from './style'

interface FormEditProps {
  open: boolean
  PresenceType?: PresenceTypeState
  onClose: () => void
  setPresenceTypes?: (types: PresenceType[]) => void
}

const FormEdit = (props: FormEditProps) => {
  const classes = useStyle()
  const { presenceTypes, presenceType } = props.PresenceType!

  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState<any>('')
  const [endTime, setEndTime] = useState<any>('')

  const handleSave = () => {
    fetch(`${process.env.REACT_APP_API}/presence-type`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, startTime, endTime })
    })
      .then(async res => {
        const data = await res.json()

        if (res.status === 201) {
          props.setPresenceTypes!([...presenceTypes, data])
          setNotificationMessage('Data successfully created')
          setNotificationColor(green[600])
          setOpenNotification(true)
          props.onClose()
        } else {
          setNotificationMessage(data.sqlMessage)
          setNotificationColor(red[600])
          setOpenNotification(true)
          props.onClose()
        }
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
        <DialogTitle className={classes.Title}>Create New Presence Type</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TextField
              label='Presence Name'
              fullWidth
              margin='dense'
              variant='outlined'
              onChange={(e: any) => setName(e.target.value)} />
            <TimePicker
              autoOk
              fullWidth
              clearable
              ampm={false}
              variant='dialog'
              margin="dense"
              label="Start Time"
              value={startTime}
              onChange={setStartTime} />
            <TimePicker
              autoOk
              fullWidth
              clearable
              ampm={false}
              variant='dialog'
              margin="dense"
              label="End Time"
              value={endTime}
              onChange={setEndTime} />
          </MuiPickersUtilsProvider>
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