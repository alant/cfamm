import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Deposit extends Component {
  render() {
    return (
      <div>
        <h1>Deposit</h1>
        <Paper className="paper">
          <form>
            <h3>From Account</h3>
            <select>
              <option value="volvo">EOS</option>
              <option value="saab">BTC</option>
              <option value="opel">ETH</option>
              <option value="audi">LTC</option>
            </select>
            <TextField
              name="deposit"
              autoComplete="off"
              label="Deposit amount"
              margin="normal"
              multiline
              rows="3"
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
        </Paper>
      </div>
    );
  }
}

export default Deposit;
