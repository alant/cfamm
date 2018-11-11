import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

function StakeDialog(props) {
  const {open, handleClose, buy, code} = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {code}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {buy ? "How much do you want to buy?" : "How much do you want to sell?"}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="BitUSD"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StakeDialog;
