import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import TradeDialog from '../component/TradeDialog';
import TableAbs from '../component/TableAbs';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    padding: 12,
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: "0 4px",
  }
});

class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      buy: false,
      code: "",
    }
  }

  handleOpen = (e) => {
    const items = e.currentTarget.name.split("-");
    if (items[0] === "buy"){
      this.setState({ open: true, buy: true, code: items[1] });
    } else {
      this.setState({ open: true, buy: false, code: items[1] });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderButtons = (code) => {
    const { classes } = this.props;
    const buy = "buy-" + code;
    const sell = "sell-" + code;

    return (
      <Fragment>
        <Button className={classes.button} name={buy} variant="contained" color="primary" onClick={this.handleOpen}>
          Buy
        </Button>
        <Button className={classes.button} name={sell} variant="contained" color="secondary" onClick={this.handleOpen}>
          Sell
        </Button>
      </Fragment>
    )
  }


  render() {
    const { classes } = this.props;
    const { open, buy, code } = this.state;

    const heading = ["Name", "24H CHANGE", "PRICE BITUSD", "24H VOLUME", "LIQUIDITY DEPTH", "ACTION"];
    const body = [
      ["TA", "-5.91%", "$0.004751", "$1,210", "$18,762", this.renderButtons("TA")],
      ["TB", "1.23%", "$0.004751", "$1,210", "$18,762", this.renderButtons("TB")],
      ["TC", "-2.56%", "$0.004751", "$1,210", "$18,762", this.renderButtons("TC")],
      ["TD", "-1.09%", "$0.004751", "$1,210", "$18,762", this.renderButtons("TD")],
      ["TE", "3.01%", "$0.004751", "$1,210", "$18,762", this.renderButtons("TE")],
    ]

    return (
      <div className={classes.root}>
        <Paper>
          <TableAbs heading={heading} body={body}/>
        </Paper>
        <TradeDialog open={open} buy={buy} code={code} handleClose={this.handleClose} handleTrade={this.props.onBuy}/>
      </div>
    )
  }
}

Trade.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Trade);
