import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  Container: {
    position: 'absolute',
    left: 0,
    top: 100,
    width: 'auto',
    padding: 15,
    borderRadius: '0px 10px 10px 0px',
    border: 0,
    background: '#ffffff',
    color: '#00000',
    opacity: 0.9
  },
  Label: {

  },
  Value: {
    paddingLeft: 10,
    fontWeight: 500
  }
}))