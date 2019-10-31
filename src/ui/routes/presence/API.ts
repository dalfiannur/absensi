import querystring from 'querystring'
import { PresenceType } from 'store/presence-type/types'
import { User } from 'store/user/types'

export const fetchPresenceType = (): Promise<PresenceType[]> =>
  new Promise(resolve => {
    fetch(`${process.env.REACT_APP_API}/presence-types`)
      .then(res => res.json())
      .then(data => resolve(data.items))
  })

export const postPresence = (userId: number, typeId: number) => {
  fetch(`${process.env.REACT_APP_API}/presence`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, typeId })
  })
}

export const checkUser = (userId: number | undefined, typeId: number): Promise<boolean> =>
  new Promise(resolve => {
    const query = querystring.stringify({ userId, typeId })
    return fetch(`${process.env.REACT_APP_API}/check-presence?${query}`)
      .then(res => res.json())
      .then(res => resolve(res.exist))
  })

export const fetchCountPresence = (typeId: number): Promise<number> => 
  new Promise(resolve => {
    const query = querystring.stringify({ typeId })
    fetch(`${process.env.REACT_APP_API}/count-presence?${query}`)
      .then(res => res.json())
      .then(count => resolve(count))
  })

export const findUserByNIK = (nik: string): Promise<User> =>
  new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API}/user/${nik}/nik`)
      .then(res => {
        if (res.status === 404) return reject()
        return res.json()
      })
      .then(user => resolve(user))
  })