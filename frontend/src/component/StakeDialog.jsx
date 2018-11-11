import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({

});

class StakeDialog extends Component {

  render() {
    const {open, handleClose} = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Stake</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            How much do you want to stake?
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

}

StakeDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StakeDialog);
