import * as React from 'react'
import Moment from 'moment'
import { useStyle } from './style'

export default () => {
  const classes = useStyle()
  const [date, setDate] = React.useState(Moment().utcOffset(0).format('DD-MM-YYYY HH:mm:ss'))

  React.useEffect(() => {
    setInterval(() => {
      setDate(Moment().utcOffset(0).format('DD-MM-YYYY HH:mm:ss'))
    }, 1000)
  }, [setDate])

  return (
    <div className={classes.Container}>
      {date}
    </div>
  )
}