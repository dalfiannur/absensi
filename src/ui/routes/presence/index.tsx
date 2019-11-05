import * as React from 'react'
import * as _ from 'lodash'
import moment from 'moment'
import history from 'utils/history'
import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { User } from 'store/user/types';
import { PresenceType } from 'store/presence-type/types';
import { AppState } from 'store';
import { Dispatch } from 'redux';
import { setPresenceTypes } from 'store/presence-type/actions';
import { connect } from 'react-redux';
import { useStyles } from './style'
import { PresenceProps, PresenceCount } from './interfaces'

import * as API from './API'
import Logo from '../../../logo.png'
import NoEventDialog from './components/NoEventDialog'
import UserHasAttendedDialog from './components/UserHasAttendedDialog'
import UserDetailDialog from './components/UserDetailDialog'
import Background from './components/Background'
import PresenceCountSide from './components/PresenceCount'
import UserNotFoundDialog from './components/UserNotFoundDialog'
import DateTimeSide from './components/DateTimeSide'
import Card from '@material-ui/core/Card'


const PresenceRoute = (props: PresenceProps) => {
  const classes = useStyles();

  const { presenceTypes } = props.PresenceType
  const { setPresenceTypes } = props

  const [open, setOpen] = useState(false)
  const [openNoEvent, setOpenNoEvent] = useState(false)
  const [openUserNotFound, setOpenUserNotFound] = useState(false)
  const [openUserHasAttendedDialog, setOpenUserHasAttendedDialog] = useState(false)
  const [presenceCount, setPresenceCount] = useState<PresenceCount[]>([])
  const [NIK, setNIK] = useState('')
  const [user, setUser] = useState<User>({
    nik: '',
    name: '',
    username: ''
  })

  const generatePresenceCount = async (data: any[]) => {
    const items: PresenceCount[] = []
    for (let i = 0; i < data.length; i++) {
      const count = await API.fetchCountPresence(_.toInteger(data[i].id))

      items.push({
        name: data[i].name,
        count
      })
    }
    setPresenceCount(items)
  }

  React.useMemo(async () => {
    if (presenceTypes.length === 0) {
      return API.fetchPresenceType()
        .then(async data => {
          setPresenceTypes(data)
          generatePresenceCount(data)
          return data
        })
    }
  }, [presenceTypes])

  const findTypeId = () => {
    const date = moment(new Date())
    const type = presenceTypes.filter(item => {
      const start = moment(item.startTime, 'HH:mm')
      const end = moment(item.endTime, 'HH:mm')
      if (start.isSameOrBefore(date) && end.isAfter(date)) return item
      return null
    })
    return type[0] ? _.toInteger(type[0].id) : null
  }

  const handleTextField = async (e: any) => {
    if (e.keyCode === 13) {
      const typeId = findTypeId()
      if (!typeId) {
        setOpenNoEvent(true)
        setNIK('')
        setTimeout(() => {
          setOpenNoEvent(false)
        }, 4000)
      } else {
        API.findUserByNIK(NIK)
          .then(data => {
            setUser(data)
            API.checkUser(data.id, typeId)
              .then(exist => {
                if (!exist) {
                  setOpen(true);
                  generatePresenceCount(presenceTypes)
                  API.postPresence(_.toInteger(data.id), typeId)
                  setTimeout(() => {
                    setNIK('')
                    setOpen(false)
                  }, 4000)
                } else {
                  setOpenUserHasAttendedDialog(true)
                  setTimeout(() => {
                    setOpenUserHasAttendedDialog(false)
                  }, 4000)
                }
              })
          })
          .catch(() => {
            setOpenUserNotFound(true)
            setTimeout(() => {
              Promise.resolve(setNIK('')).then(() => {
                setOpenUserNotFound(false);
              });
            }, 4000);
          })
      }
    }
  }

  return (

    <React.Fragment>

      <Background />
      <div className={classes.Container}>
        <DateTimeSide />
        <PresenceCountSide data={presenceCount} />
        <button
          className={classes.ButtonLogin}
          onClick={() => history.push('/login')}>Login</button>
        <Card className={classes.cardStyle}>
          <img className={classes.Logo} src={Logo} alt='Logo' />
          <h3 className={classes.Title}>Barcode Attendance System</h3>
          <TextField
            autoFocus
            value={NIK}
            className={classes.TextField}
            onChange={e => setNIK(e.target.value)}
            onKeyDown={e => handleTextField(e)}
          />

        </Card>
      </div>

      <UserDetailDialog
        open={open}
        user={user}
        onClose={() => setOpen(!open)} />
      <UserNotFoundDialog
        open={openUserNotFound}
        onClose={() => setOpenUserNotFound(false)} />
      <NoEventDialog
        open={openNoEvent}
        onClose={() => setOpenNoEvent(false)} />
      <UserHasAttendedDialog
        open={openUserHasAttendedDialog}
        onClose={() => setOpenUserHasAttendedDialog(false)} />

    </React.Fragment>

  )
}


const mapStateToProps = (state: AppState) => ({
  PresenceType: state.PresenceType
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPresenceTypes: (types: PresenceType[]) => dispatch(setPresenceTypes(types))
})

export default connect(mapStateToProps, mapDispatchToProps)(PresenceRoute)
