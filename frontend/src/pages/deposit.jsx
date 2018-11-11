import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Deposit extends Component {
  render() {
    return (
      <div style={{paddingLeft: 36, paddingRight: 36}}>
        <h1>Deposit</h1>
          <form>
            <h3>From Account</h3>

            <Grid container spacing={24}>
              <Grid item xs={2}>
                <Paper>
                  <img style={{width: "100%"}} src="https://seeklogo.com/images/E/eos-logo-9E0494F783-seeklogo.com.png"/>
                  <Typography variant="title" gutterBottom style={{textAlign: "center"}}>
                    EOS
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper>
                  <img style={{width: "100%"}} src="http://cdn.onlinewebfonts.com/svg/img_103116.png"/>
                  <Typography variant="title" gutterBottom style={{textAlign: "center"}}>
                    BTC
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper>
                  <img style={{width: "100%"}} src="https://www.bitcoincash.org/media-kit/12-bitcoin-cash-square-crop-full.png"/>
                  <Typography variant="title" gutterBottom style={{textAlign: "center"}}>
                    BCH
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper>
                  <img style={{width: "100%"}} src="https://cdn4.iconfinder.com/data/icons/cryptocoins/227/ETH-512.png"/>
                  <Typography variant="title" gutterBottom style={{textAlign: "center"}}>
                    ETH
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper>
                  <img style={{width: "100%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbeJwceCOp9GoaGH1b31VGR2BeRh0K29g6Tz80TC-_YEgwujPJ"/>
                  <Typography variant="title" gutterBottom style={{textAlign: "center"}}>
                    ECH
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <Paper>
                  <img style={{width: "100%"}} src="https://image.flaticon.com/icons/svg/34/34126.svg"/>
                  <Typography variant="title" gutterBottom style={{textAlign: "center"}}>
                    FIAT
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <TextField
              name="deposit"
              autoComplete="off"
              label="Deposit amount"
              margin="normal"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              className="submit_button"
              type="submit">
              Deposit
            </Button>
          </form>
      </div>
    );
  }
}

export default Deposit;
