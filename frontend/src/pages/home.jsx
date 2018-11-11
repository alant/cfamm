import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


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
});

class Home extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.mainFeaturedPost}>
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography variant="headline" color="inherit" gutterBottom>
                  Here is our awesome LiquiDAO
                </Typography>
                <Typography color="inherit" paragraph>
                  super awesome…
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Home);