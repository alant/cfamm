import React from 'react';
import TableAbs from './TableAbs';
import Typography from '@material-ui/core/Typography';

function Staked(props) {
  const headAcc = ["Name", "% Share of Contract", "Total Dividend Return"];
  const bodyAcc = [
    ["Contract Name", "15%", "+$0.99"],
    ["Contract Name", "15%", "+$0.99"],
    ["Contract Name", "15%", "+$0.99"],
    ["Contract Name", "15%", "+$0.99"],
  ];

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
