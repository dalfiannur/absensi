import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  Container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    textAlign: 'center',
    background: '#ffffff',
    borderRadius: '0px 100px 0px 0px',
    padding: '5px 20px 5px 0px',
    border: 0,
    width: 200,
    color: '#000000',
    opacity: 0.7
  }
}))