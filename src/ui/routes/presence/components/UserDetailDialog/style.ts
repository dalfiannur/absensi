import { makeStyles } from '@material-ui/core/styles'
import Latar from 'assets/latar.jpg'

export const useStyle = makeStyles(theme => ({
  Title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#000000'
  },
  ProfilePicture: {
    width: '100%',
    height: 'auto'
  },
  Dialog: {
    width: 650,
    background: Latar
  },
  PictureFlag:{
    width:130,
    height:130
  },
  txtFld:{
    width: 300
  }
}))