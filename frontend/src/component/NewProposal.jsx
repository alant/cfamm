import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

function ProposalDialog(props) {
  const {open, handleClose} = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">New Proposal</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          What would you like to propose that we add to our trading platform?
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Asset"
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

export default ProposalDialog;
