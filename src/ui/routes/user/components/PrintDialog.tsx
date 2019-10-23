import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Dialog, DialogContent, Grid } from '@material-ui/core'
import { UserState } from 'store/reducers/user'
import Barcode from 'jsbarcode'
import * as QR from 'qrcode'
import { createCanvas, Canvas } from 'canvas'
import { handlePrintDialog } from 'store/actions/user'

type PrintDialogProps = {
  User?: UserState;
  handlePrintDialog?: () => void
}

const createBarcode = (data: string) => {
  const canvas = createCanvas(400, 200);
  Barcode(canvas, data, {
    format: 'CODE39',
    width: 3
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
  return (
    <Dialog
      open={props.User!.openPrintDialog}
      keepMounted
      onClose={props.handlePrintDialog}
      aria-labelledby="detail-user"
      aria-describedby="detail-user-description"
    >
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <img src={createBarcode(props.User!.user.nik || 'dummy')} />
          </Grid>
          <Grid item md={6}>
            <img src={createQR(props.User!.user.nik || 'dummy')} />
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