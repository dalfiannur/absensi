import { makeStyles } from '@material-ui/core/styles'
import Latar from 'assets/latar.jpg'

export const useStyle = makeStyles(theme => ({
  Title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#000000'
  },
  ProfilePicture: {
    height: 320,
    width: 230
  },
  Dialog: {
    width: 650,
    background: Latar
  },
  PictureFlag:{
    width:80,
    height:80
  }
}))