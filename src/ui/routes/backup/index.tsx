import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  }
}));

export const PresenceRoute = () => {
  const classes = useStyles();
  const data = [
    {
      no: 2,
      nik: '0002',
      nama: 'Dikry Alfiannur',
      jumlahImprovement: '3AB',
      keterangan: 'Hadir',
    },
    {
      no: 3,
      nik: '0003',
      nama: 'Idit Aditya',
      jumlahImprovement: '4AB',
      keterangan: 'Hadir',
    },
    {
      no: 4,
      nik: '0004',
      nama: 'Agu Anglingga',
      jumlahImprovement: '5AB',
      keterangan: 'Hadir',
    },
  ]

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container spacing={3}>

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    No
                  </TableCell>
                  <TableCell>
                    NIK
                  </TableCell>
                  <TableCell>
                    Nama
                  </TableCell>
                  <TableCell>
                    Jumlah Improvement
                  </TableCell>
                  <TableCell>
                    Keterangan
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data.map((item, index) => (
                    <TableRow>
                      <TableCell>
                        {item.no}
                      </TableCell>
                      <TableCell>
                        {item.nik}
                      </TableCell>
                      <TableCell>
                        {item.nama}
                      </TableCell>
                      <TableCell>
                        {item.jumlahImprovement}
                      </TableCell>
                      <TableCell>
                        {item.keterangan}
                      </TableCell>
                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>

      </Grid>
    </div>
  )
}

export default PresenceRoute;