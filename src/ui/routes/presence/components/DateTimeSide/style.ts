import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles(theme => ({
  Container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    textAlign: 'center',
    background: 'linear-gradient(180deg, #134e5e, #71b280)',
    borderRadius: '0px 100px 0px 0px',
    padding: '5px 20px 5px 0px',
    border: 0,
    width: 200,
    color: '#fff'
  }
}))