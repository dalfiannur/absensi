import * as React from 'react'
import { useStyle } from './style'
import { PresenceCount } from '../../interfaces'

interface PresenceCountProps {
  data: PresenceCount[]
}

export default (props: PresenceCountProps) => {
  const { data } = props
  const classes = useStyle()
  
  return (
    <div className={classes.Container}>
      <table>
        {
          data.map((item, index) => (
            <tr key={`count-${index}`}>
              <td className={classes.Label}>{item.name}</td>
              <td className={classes.Value}>{item.count}</td>
            </tr>
          ))
        }
      </table>
    </div>
  )
}