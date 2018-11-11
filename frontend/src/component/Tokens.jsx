import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function Tokens(props) {
  const {classes} = props;
  var {tokens} = props.profit;

  // console.log("tokens", tokens);
  // // const tokens = props.profit;
  //
  // tokens = [
  //   ["9999", "Token Name", "Contract Name"],
  //   ["9999", "Token Name", "Contract Name"],
  //   ["9999", "Token Name", "Contract Name"],
  //   ["9999", "Token Name", "Contract Name"],
  // ]

  function renderCard(item, i) {
    return (<Card className={classes.card} key={i}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {item[0]}
        </Typography>
        <Typography variant="h5" component="h2">
          {item[1]}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {item[2]}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Send</Button>
      </CardActions>
    </Card>);
  }

  return (
    <div>
      {tokens.map((item, i) => renderCard(item, i))}
    </div>
  )
}

export default withStyles(styles)(Tokens);
