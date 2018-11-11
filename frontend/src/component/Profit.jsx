import React, { Component } from 'react';

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TotalProfit from './TotalProfit';
import Issued from './Issued';
import Staked from './Staked';
import Tokens from './Tokens';

// set up styling classes using material-ui "withStyles"
const styles = theme => ({
  root: {
    padding: 12,
  }
});

// Index component
class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.root}>
          <TotalProfit />
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="PROPOSALS" />
            <Tab label="STAKED" />
            <Tab label="TOKENS" />
          </Tabs>

          <div>
            {value === 0 && <Issued profit={this.props.profit.issued}/>}
            {value === 1 && <Staked profit={this.props.profit.staked}/>}
            {value === 2 && <Tokens profit={this.props.profit.tokens}/>}
          </div>
        </Paper>
      </div>
    );
  }

}

export default withStyles(styles)(Index);
