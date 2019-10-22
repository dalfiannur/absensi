export const AuthAction = {
  SET_USERNAME: 'SET_USERNAME',
  SET_PASSWORD: 'SET_PASSWORD'
}

export const setUsername = (payload: string) => ({ type: AuthAction.SET_USERNAME, payload })
export const setPassword = (payload: string) => ({ type: AuthAction.SET_PASSWORD, payload })