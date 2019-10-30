import * as React from 'react'
import moment from 'moment'
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

interface FilterDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (callback: any) => void
}

const FilterDialog = (props: FilterDialogProps) => {
  const [selectedDate, setSelectedDate] = React.useState<any>(new Date())
  const [selectedTime, setSelectedTime] = React.useState<any>(new Date())

  const handleSubmit = () => {
    props.onSubmit({
      date: moment(selectedDate).format('MM-DD-YYYY').toString(),
      time: moment(selectedTime).format('HH:mm').toString()
    })
    props.onClose()
  }

  return (

    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth='xs'
    >
      <DialogTitle>Filter</DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              value={selectedDate}
              autoOk
              clearable
              onChange={setSelectedDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              variant='inline'
              autoOk
              margin="normal"
              value={selectedTime}
              clearable
              onChange={setSelectedTime}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={props.onClose}>
          <CancelIcon />
        </IconButton>
        <IconButton onClick={() => handleSubmit()}>
          <SaveIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  )
}

export default FilterDialog