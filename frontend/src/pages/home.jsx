import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import TableAbs from '../component/TableAbs';
import Profit from '../component/Profit';
import StakeDialog from '../component/StakeDialog';

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
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    const stackButton = <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
        Stake
      </Button>;

    const heading = ["Maturity", "Contract Name", "Open Interest", "Funding Progress to List", "Action"];
    const bodyNew = [
      ["28 days", "Contract Name", "$902,219,309.99", "87%", stackButton],
      ["28 days", "Contract Name", "$902,219,309.99", "87%", stackButton],
      ["28 days", "Contract Name", "$902,219,309.99", "87%", stackButton],
      ["28 days", "Contract Name", "$902,219,309.99", "87%", stackButton],
    ];
    const bodyPop = [
      ["28 days", "Contract Name", "$902,219,309.99", "87%", stackButton],
      ["28 days", "Contract Name", "$902,219,309.99", "87%", stackButton],
      ["28 days", "Contract Name", "$902,219,309.99", "87%", stackButton],
    ];

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Typography variant="title" gutterBottom>
              New Proposals
            </Typography>
            <TableAbs heading={heading} body={bodyNew}/>
            <br />
            <Typography variant="title" gutterBottom>
              Most Popular Proposals
            </Typography>
            <TableAbs heading={heading} body={bodyPop}/>

          </Grid>
          <Grid item xs={4}>
            <Profit />
          </Grid>
        </Grid>
        <StakeDialog open={open} handleClose={this.handleClose} />
      </div>
    )
  }
}

export default withStyles(styles)(Home);
