import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Dialog, DialogTitle, DialogContent, Grid, MenuItem, Select, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  Print as PrintIcon,
  GetApp as DownloadIcon
} from '@material-ui/icons'
import { UserState } from 'store/reducers/user'
import Barcode from 'jsbarcode'
import * as QR from 'qrcode'
import { createCanvas } from 'canvas'
import { handlePrintDialog } from 'store/actions/user'
import ReactToPrint from 'react-to-print'
import SaveFile from 'save-file'

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

type PrintDialogProps = {
  User?: UserState;
  handlePrintDialog?: () => void
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

const PrintModal: React.FC<PrintDialogProps> = (props) => {
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
      open={props.User!.openPrintDialog}
      keepMounted
      onClose={props.handlePrintDialog}
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
                ? (<img src={createBarcode(props.User!.user.nik || 'dummy')} className={classes.Barcode} ref={barcodeRef} />)
                : (<img src={createQR(props.User!.user.nik || 'dummy')} className={classes.QR} ref={qrRef} />)
            }
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

const mapState = (state: any) => state
const mapDispatch = (dispatch: Dispatch) => ({
  handlePrintDialog: () => dispatch(handlePrintDialog())
})

export default connect(mapState, mapDispatch)(PrintModal)