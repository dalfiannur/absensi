import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  Container: {
    position: 'absolute',
    left: 1170,
    top: 451,
    width: 'auto',
    padding: 15,
    borderRadius: '20px 0px 0px 0px',
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