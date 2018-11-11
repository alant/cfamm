import React, { Component } from 'react';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import Home from './home';
import Investor from './investor';
import Vote from './vote';
import Trade from './trade';
import Deposit from './deposit';

// set up styling classes using material-ui "withStyles"
const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
});

// Index component
class Index extends Component {

  render() {
    const { classes } = this.props;

    const HomeBtn =  withRouter(({ history }) => (
      <Button color="inherit"
        onClick={() => { history.push('/') }}
      >
        Home
      </Button>
    ));

    const DepositBtn =  withRouter(({ history }) => (
      <Button color="inherit"
        onClick={() => { history.push('/deposit') }}
      >
        Deposit
      </Button>
    ));

    const InvestorBtn =  withRouter(({ history }) => (
      <Button color="inherit"
        onClick={() => { history.push('/staker') }}
      >
        Staker
      </Button>
    ));

    // const VoteBtn =  withRouter(({ history }) => (
    //   <Button color="inherit"
    //     onClick={() => { history.push('/vote') }}
    //   >
    //     Vote
    //   </Button>
    // ));

    const TradeBtn =  withRouter(({ history }) => (
      <Button color="inherit"
        onClick={() => { history.push('/trade') }}
      >
        Trade
      </Button>
    ));

    return (
      <Router>
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit" className={classes.grow}>
                LiquiDAO
              </Typography>
              <HomeBtn />
              <DepositBtn />
              {/* <VoteBtn /> */}
              <TradeBtn />
              <InvestorBtn />
            </Toolbar>
          </AppBar>
          <Route path="/" exact component={Home} />
          <Route path="/staker/" component={Investor} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/vote/" component={Vote} />
          <Route path="/trade/" component={Trade} />
        </div>
      </Router>
    );
  }

}

export default withStyles(styles)(Index);
