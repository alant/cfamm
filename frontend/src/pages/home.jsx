import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import TableAbs from '../component/TableAbs';
import Profit from '../component/Profit';
import StakeDialog from '../component/StakeDialog';
import ProposalDialog from '../component/NewProposal';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`,
    [theme.breakpoints.up('md')]: {
      paddingRight: 0,
    },
  },
  root: {
    padding: `${theme.spacing.unit * 2}px`,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      pDialogopen: false
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickPDialogOpen = () => {
    this.setState({ pDialogopen: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handlePDialogClose = () => {
    this.setState({ pDialogopen: false });
  };

  render() {
    const { classes } = this.props;
    const { open, pDialogopen } = this.state;

    const stackButton = <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
        Stake
      </Button>;

    const heading = ["Maturity", "Contract Name", "Open Interest", "Funding Progress to List", "Action"];
    const bodyNew = [
      ["28 days", "FA", "$902,219,309.99", "87%", stackButton],
      ["28 days", "FB", "$902,219,309.99", "87%", stackButton],
      ["28 days", "FC", "$902,219,309.99", "87%", stackButton],
      ["28 days", "FD", "$902,219,309.99", "87%", stackButton],
    ];
    const bodyPop = [
      ["28 days", "FC", "$902,219,309.99", "87%", stackButton],
      ["28 days", "FA", "$902,219,309.99", "87%", stackButton],
      ["28 days", "FD", "$902,219,309.99", "87%", stackButton],
    ];

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Typography variant="title" gutterBottom>
              New Proposals
            </Typography>
            <Paper>
              <TableAbs heading={heading} body={bodyNew}/>
            </Paper>

            <br />
            <Typography variant="title" gutterBottom>
              Most Popular Proposals
            </Typography>
            <Paper>
              <TableAbs heading={heading} body={bodyPop}/>
            </Paper>

          </Grid>
          <Grid item xs={4}>
            <Profit profit={this.props.profit}/>
          </Grid>
        </Grid>
        <StakeDialog open={open} handleClose={this.handleClose} />
        <ProposalDialog open={pDialogopen} handleClose={this.handlePDialogClose} />
        <Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={this.handleClickPDialogOpen}>
          <AddIcon />
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Home);
