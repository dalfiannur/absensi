import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, Grid, MenuItem, Select, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Print as PrintIcon,
  GetApp as DownloadIcon
} from '@material-ui/icons'
import Barcode from 'jsbarcode'
import * as QR from 'qrcode'
import { createCanvas } from 'canvas'
import ReactToPrint from 'react-to-print'
import SaveFile from 'save-file'
import { UserState } from 'store/user/types'
import { AppState } from 'store'

const useStyle = makeStyles(theme => ({
  Barcode: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  },
  QR: {
    width: 'auto',
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  },
  DialogContent: {
    minHeight: 200
  }
}))

interface PrintDialogProps {
  open: boolean
  User?: UserState
  onClose: () => void
}

const createBarcode = (data: string) => {
  const canvas = createCanvas(400, 200);
  Barcode(canvas, data, {
    format: 'CODE39',
    width: 1
  });
  return canvas.toDataURL();
}

const createQR = (data: string) => {
  let qr = ''
  QR.toDataURL(data, (error, url) => {
    qr = url;
  });
  return qr;
}

const PrintModal = (props: PrintDialogProps) => {
  const classes = useStyle();

  const [selectCode, setSelectCode] = React.useState('barcode');
  const barcodeRef = React.useRef<any>(null);
  const qrRef = React.useRef<any>(null);

  const saveCode = () => {
    const nik = props.User!.user.nik
    const name = props.User!.user.name

    if (selectCode === 'barcode') {
      const canvas = createCanvas(400, 200, 'pdf');
      Barcode(canvas, nik, {
        format: 'CODE39',
        width: 1
      });

      SaveFile(canvas.toDataURL(), `barcode-${name}.pdf`);
    } else {
      QR.toDataURL(nik, (err, data) => {
        SaveFile(data, `QR-${name}.png`)
      })
    }
  }

  return (
    <Dialog
      open={props.open}
      keepMounted
      onClose={props.onClose}
      fullWidth
      maxWidth='xs'
    >
      <DialogTitle>
        <Select
          value={selectCode}
          onChange={(e: any) => setSelectCode(e.target.value)}
        >
          <MenuItem value='barcode'>BARCODE</MenuItem>
          <MenuItem value='qr'>QR CODE</MenuItem>
        </Select>
        <ReactToPrint
          trigger={() => (
            <IconButton>
              <PrintIcon />
            </IconButton>
          )}
          content={() => selectCode === 'barcode' ? barcodeRef.current : qrRef.current}
        />
        <IconButton onClick={saveCode}>
          <DownloadIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.DialogContent}>
        <Grid container>
          <Grid item md={12}>
            {
              selectCode === 'barcode'
                ? (<img
                    alt='Barcode'
                    ref={barcodeRef}
                    className={classes.Barcode}
                    src={createBarcode(props.User!.user.nik || 'dummy')} />)
                : (<img
                    alt='QR'
                    ref={qrRef}
                    className={classes.QR}
                    src={createQR(props.User!.user.nik || 'dummy')} />)
            }
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

const mapState = (state: AppState) => ({
  User: state.User
})
const mapDispatch = (dispatch: Dispatch) => ({})

export default connect(mapState, mapDispatch)(PrintModal)