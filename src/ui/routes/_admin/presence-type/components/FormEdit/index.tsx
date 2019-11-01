import * as React from 'react'
import Moment from 'moment'
import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { AppState } from 'store'
import { Dispatch } from 'redux'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import Notification from 'ui/components/Notification'
import green from '@material-ui/core/colors/green'
import { PresenceTypeState, PresenceType } from 'store/presence-type/types'
import { setPresenceType, setPresenceTypes } from 'store/presence-type/actions'
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

interface FormEditProps {
  open: boolean
  PresenceType?: PresenceTypeState
  data: PresenceType
  onClose: () => void
  setPresenceTypes?: (roles: PresenceType[]) => void
}

const FormEdit = (props: FormEditProps) => {
  const { presenceTypes } = props.PresenceType!
  const { data, setPresenceTypes, onClose, open } = props
  const [openNotification, setOpenNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationColor, setNotificationColor] = useState('')

  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [endTime, setEndTime] = useState<Date>(new Date())

  useEffect(() => {
    const start = Moment(data.startTime, 'HH:mm').toDate()
    const end = Moment(data.endTime, 'HH:mm').toDate()
    setName(data.name)
    setStartTime(start)
    setEndTime(end)
  }, [data])

  const handleUpdate = () => {
    fetch(`${process.env.REACT_APP_API}/presence-type/${data.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        startTime: Moment(startTime).format('HH:mm'),
        endTime: Moment(endTime).format('HH:mm')
      })
    })
      .then(res => res.json())
      .then(result => {
        const types = presenceTypes.map((item) => {
          if (item.id === data.id) {
            return result
          }
          return item
        })

        setPresenceTypes!(types)
        setNotificationMessage('Data successfully updated')
        setNotificationColor(green[600])
        setOpenNotification(true)
        onClose()
      })
      .catch((error) => {
        console.error(error)
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
      >
        <DialogTitle>Edit Presence Type</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TextField
              fullWidth
              label='Presence Name'
              defaultValue={data.name}
              value={name}
              margin='dense'
              variant='outlined'
              onChange={(e) => setName(e.target.value)} />
            <TimePicker
              autoOk
              fullWidth
              clearable
              ampm={false}
              variant='dialog'
              margin="dense"
              label="Start Time"
              defaultValue={data.startTime}
              value={startTime}
              onChange={(value: any) => setStartTime(value)} />
            <TimePicker
              autoOk
              fullWidth
              clearable
              ampm={false}
              defaultValue={data.endTime}
              variant='dialog'
              margin="dense"
              label="End Time"
              value={endTime}
              onChange={(value: any) => setEndTime(value)} />
          </MuiPickersUtilsProvider>
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
  PresenceType: state.PresenceType
})

const mapActionToProps = (dispatch: Dispatch) => ({
  setPresenceType: (type: PresenceType) => dispatch(setPresenceType(type)),
  setPresenceTypes: (types: PresenceType[]) => dispatch(setPresenceTypes(types))
})

export default connect(mapStateToProps, mapActionToProps)(FormEdit)