import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  Container: {
    position: 'absolute',
    left: 1130,
    top: 410,
    width: 'auto',
    padding: 15,
    borderRadius: '20px 20px 20px 20px',
    border: 0,
    background: '#ffffff',
    color: '#00000',
    opacity: 0.7,
    height:'auto'
  },
  Label: {

  },
  Value: {
    paddingLeft: 10,
    fontWeight: 500
  }
}))