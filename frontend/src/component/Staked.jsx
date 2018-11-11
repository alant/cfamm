import React from 'react';
import TableAbs from './TableAbs';
import Typography from '@material-ui/core/Typography';

function Staked(props) {
  const {headAcc, bodyAcc} = props.profit;

  return (
    <div>
      <Typography variant="title" gutterBottom>
        Accepted Proposals
      </Typography>
      <TableAbs heading={headAcc} body={bodyAcc}/>
    </div>
  )
}

export default Staked;
