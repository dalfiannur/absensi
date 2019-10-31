import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  Container: {
    position: 'absolute',
    left: 0,
    top: 10,
    width: 'auto',
    padding: 15,
    borderRadius: '0px 10px 10px 0px',
    border: 0,
    background: 'linear-gradient(180deg, #134e5e, #71b280)',
    color: '#fff'
  },
  Label: {

  },
  Value: {
    paddingLeft: 10,
    fontWeight: 500
  }
}))