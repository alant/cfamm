import React, { Component } from 'react';
import { Api, JsonRpc, RpcError, JsSignatureProvider } from 'eosjs'; // https://github.com/EOSIO/eosjs
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import TableAbs from '../component/TableAbs';
import Profit from '../component/Profit';
import ProposalDialog from '../component/NewProposal';
import StakeDialog from '../component/StakeDialog';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withRouter } from 'react-router-dom';

const endpoint = "http://localhost:8888";

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
      pDialogopen: false,
      noteTable: [], // to store the table rows from smart contract
      noteBalance: [], //Original balance
      total_dividents: 1, // total dividents
      total_profit: 0
    }
    this.handleFormEvent = this.handleFormEvent.bind(this);
  }

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent(event) {
    // stop default behaviour
    event.preventDefault();

    // collect form data
    let account = "useraaaaaaaa";
    let privateKey = "5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5";
    let note = event.target.note.value;
    if (note == null) {
      note = 0;
    }

    // prepare variables for the switch below to send transactions
    let actionName = "";
    let actionData = {};

    // define actionName and action according to event type
    switch (event.type) {
      case "submit":
        actionName = "vote";
        actionData = {
          user: account,
          balance: parseInt(note, 10),
        };
        break;
      default:
        return;
    }

    // eosjs function call: connect to the blockchain
    const rpc = new JsonRpc(endpoint);
    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    try {
      const result = await api.transact({
        actions: [{
          account: "notechainacc",
          name: actionName,
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: actionData,
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      console.log(result);
      this.getTable();
    } catch (e) {
      console.log('Caught exception: ' + e);
      if (e instanceof RpcError) {
        console.log(JSON.stringify(e.json, null, 2));
      }
    }
  }

  getTable() {
    const rpc = new JsonRpc(endpoint);
    rpc.get_table_rows({
      "json": true,
      "code": "notechainacc",   // contract who owns the table
      "scope": "notechainacc",  // scope of the table
      "table": "tokenmaker",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(result => {
      this.setState({ noteTable: result.rows });
      let total_profit = 0
      result.rows.map((row, i) => total_profit += row.profit);
      this.setState({total_profit: total_profit});
      console.log("total_profit", total_profit);
    });

    rpc.get_table_rows({
      "json": true,
      "code": "notechainacc",   // contract who owns the table
      "scope": "notechainacc",  // scope of the table
      "table": "tokenbalance",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(result => this.setState({ noteBalance: result.rows }));
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

  componentDidMount() {
    this.getTable();
  }

  render() {
    const { classes } = this.props;
    const { open, pDialogopen } = this.state;
    const { noteTable, noteBalance } = this.state;

    // generate each note as a card
    const generateCard = (key, user, profit) => (
      <Card className={classes.card} key={key}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {user}
          </Typography>
          <Typography style={{fontSize:12}} color="textSecondary" gutterBottom>
            {parseFloat(profit  * this.state.total_dividents / this.state.total_profit)}
          </Typography>
          <Typography component="pre">
            {profit}
          </Typography>

        </CardContent>
      </Card>
    );
    let noteCards = noteTable.map((row, i) => {
      return generateCard(i, row.user, row.profit);
    });

    const generateBalanceCard = (key, user, profit) => (
      <Card className={classes.card} key={key}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {user}
          </Typography>
          <Typography style={{fontSize:12}} color="textSecondary" gutterBottom>

          </Typography>
          <Typography component="pre">
            {profit}
          </Typography>
        </CardContent>
      </Card>
    );



    let noteBalaneCards = noteBalance.map((row, i) => generateBalanceCard(i, row.user, row.balance));

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
        <StakeDialog open={open} handleClose={this.handleClose} handleFormEvent={this.handleFormEvent}/>
        <ProposalDialog open={pDialogopen} handleClose={this.handlePDialogClose} />
        <Button variant="fab" color="primary" aria-label="Add" className={classes.button} onClick={this.handleClickPDialogOpen}>
          <AddIcon />
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Home);
