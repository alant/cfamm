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
import About from './about';
import Login from './login';

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

    const InvestorBtn =  withRouter(({ history }) => (
      <Button color="inherit" 
        onClick={() => { history.push('/investor') }}
      >
        Staker
      </Button>
    ));

    const AboutBtn =  withRouter(({ history }) => (
      <Button color="inherit" 
        onClick={() => { history.push('/about') }}
      >
        About
      </Button>
    ));

    const LoginBtn =  withRouter(({ history }) => (
      <Button color="inherit" 
        onClick={() => { history.push('/login') }}
      >
        Login
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
              <InvestorBtn />
              <Button color="inherit">Deposit</Button>
              <AboutBtn />
              <LoginBtn />
            </Toolbar>
          </AppBar>
          <Route path="/" exact component={Home} />
          <Route path="/investor/" component={Investor} />
          <Route path="/about/" component={About} />
          <Route path="/login/" component={Login} />
        </div>
      </Router>
    );
  }

}

export default withStyles(styles)(Index);
