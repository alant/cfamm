import React, { Component } from 'react';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const accounts = [
  {"name":"useraaaaaaaa", "privateKey":"5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5", "publicKey":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"},
  {"name":"useraaaaaaab", "privateKey":"5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg", "publicKey":"EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"},
  {"name":"useraaaaaaac", "privateKey":"5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7", "publicKey":"EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"},
  {"name":"useraaaaaaad", "privateKey":"5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx", "publicKey":"EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X"},
  {"name":"useraaaaaaae", "privateKey":"5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg", "publicKey":"EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb"},
  {"name":"useraaaaaaaf", "privateKey":"5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK", "publicKey":"EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H"},
  {"name":"useraaaaaaag", "privateKey":"5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo", "publicKey":"EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw"}
];

// Index component
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAccount: 0,
      name: 'hai',
      labelWidth: 0,
      profit: {
        issued: {
          headAcc: ["Name", "% Share of Contract", "Total Dividend Return"],
          bodyAcc: [
            ["TA", "15%", "+$0.99"],
            ["TB", "15%", "+$0.99"],
            ["TC", "15%", "+$0.99"],
            ["TD", "15%", "+$0.99"],
          ],
          headUn: ["Name"],
          bodyUn: [
            ["TX"],
            ["TY"],
          ]
        },
        staked: {
          headAcc: ["Name", "% Share of Contract", "Total Return"],
          bodyAcc: [
            ["FA", "15%", "+$0.99"],
            ["FB", "15%", "+$0.99"],
            ["FC", "15%", "+$0.99"],
            ["FD", "15%", "+$0.99"],
            ["TA", "15%", "+$0.99"],
            ["TB", "15%", "+$0.99"],
          ],
        },
        tokens: {
          tokens: [
            ["9999", "TA", "Contract Name"],
            ["9999", "TB", "Contract Name"],
          ]
        }
      }
    }
  }


    handleChange = event => {
      console.log("currentAccount: ", event.target.value);
      this.setState({ currentAccount: event.target.value });
      localStorage.setItem('currentAcount', JSON.stringify({
        key: accounts[this.state.currentAccount].privateKey,
        name: accounts[this.state.currentAccount].name}));
      // localStorage.setItem('currentKey', accounts[this.state.currentAccount].privateKey);
      // localStorage.setItem('currentName', accounts[this.state.currentAccount].name);
    };

    componentDidMount() {
      localStorage.setItem('currentAcount', JSON.stringify({
        key: accounts[this.state.currentAccount].privateKey,
        name: accounts[this.state.currentAccount].name}));
      // localStorage.setItem('currentKey', accounts[this.state.currentAccount].privateKey);
      // localStorage.setItem('currentName', accounts[this.state.currentAccount].name);
    }

  onBuy = () => {

    // console.log("onBuy");

    this.setState((prevState) => {
      const {profit} = prevState;
      var gain = profit.issued.bodyAcc[0][2].slice(2)
      gain = parseFloat(gain) + 0.5;
      gain = "+$" + gain;
      profit.issued.bodyAcc[0][2] = gain;

      return({
        profit
      })
    })
  }

  onSell = () => {

  }



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

    const AccountDropdown = () => {
      return (
        <div>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.currentAccount}
                onChange={this.handleChange}
                inputProps={{
                  name: 'age',
                  id: 'age-simple',
                }}
              >
              {accounts.map((account, i) => {
                return(
                  <MenuItem value={i} key={i}>
                    {account.name}
                  </MenuItem>
                )
              }
              )}

              </Select>
            </FormControl>
          </form>
        </div>
      );
    }

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
              <AccountDropdown />
            </Toolbar>
          </AppBar>
          <Route path="/" exact render={() => <Home profit={this.state.profit} />} />
          <Route path="/staker/" component={Investor} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/vote/" component={Vote} />
          <Route path="/trade/" render={() => <Trade onBuy={this.onBuy} />}/>
        </div>
      </Router>
    );
  }

}

export default withStyles(styles)(Index);
