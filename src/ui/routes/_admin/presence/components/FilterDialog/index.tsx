import * as React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import { PresenceType } from 'store/presence-type/types';
import { AppState } from 'store';
import { useStyle } from './style'
import { setPresenceTypes } from 'store/presence-type/actions';

interface FilterDialogProps {
  open: boolean
  attended: boolean
  presenceTypes?: PresenceType[]
  onClose: () => void
  onSubmit: (callback: any) => void
  setPresenceTypes: (types: PresenceType[]) => void
}

const FilterDialog = (props: FilterDialogProps) => {
  const classes = useStyle()

  const { presenceTypes } = props

  const [date, setDate] = React.useState<any>(new Date())
  const [typeId, setTypeId] = React.useState([])

  React.useEffect(() => {
    if (presenceTypes!.length === 0) {
      fetch(`${process.env.REACT_APP_API}/presence-types`)
        .then(res => res.json())
        .then(data => props.setPresenceTypes(data.items))
    }
  }, [props])

  const handleSubmit = () => {
    props.onSubmit({
      date: moment(date).format('DDMMYYYY').toString(),
      typeId
    })

    props.onClose()
  }

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={props.open}
      onClose={props.onClose}>
      <DialogTitle className={classes.DialogTitle}>Filter</DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <DatePicker
              label='Date'
              format="dd/MM/yyyy"
              margin="normal"
              value={date}
              autoOk
              clearable
              fullWidth
              onChange={setDate} />
            <FormControl
              fullWidth
              margin='normal'>
              <InputLabel>Presence Type</InputLabel>
              <Select
                value={typeId}
                onChange={(e: any) => setTypeId(e.target.value)}>
                <MenuItem value={0}>All</MenuItem>
                {
                  presenceTypes!.map(item => (
                    <MenuItem value={item.id} key={item.name}>{item.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>

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

const mapStateToProps = (state: AppState) => ({
  presenceTypes: state.PresenceType.presenceTypes
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPresenceTypes: (types: PresenceType[]) => dispatch(setPresenceTypes(types))
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterDialog)