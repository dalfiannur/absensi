import * as React from 'react'
import './style.scss'

export default () => {
  const starts = new Array(50).fill(0)

  return (
    <div className='star'>
      <div className='night'>
        {
          starts.map((item, index) => (
            <div key={`ss-${index}`} className='shooting_star' />
          ))
        }
      </div>
    </div>
  )
}