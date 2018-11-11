import React from 'react';
import TableAbs from './TableAbs';
import Typography from '@material-ui/core/Typography';

function Issued(props) {
  const headAcc = ["Name", "% Share of Contract", "Total Dividend Return"];
  const bodyAcc = [
    ["Contract Name", "15%", "+$0.99"],
    ["Contract Name", "15%", "+$0.99"],
    ["Contract Name", "15%", "+$0.99"],
    ["Contract Name", "15%", "+$0.99"],
  ];
  const headUn = ["Name"];
  const bodyUn = [
    ["Contract Name"],
    ["Contract Name"],
  ]

  return (
    <div>
      <Typography variant="title" gutterBottom>
        Accepted Proposals
      </Typography>
      <TableAbs heading={headAcc} body={bodyAcc}/>
      <br />
      <Typography variant="title" gutterBottom>
        Unsuccessful Proposals
      </Typography>
      <TableAbs heading={headUn} body={bodyUn}/>
    </div>
  )
}

export default Issued;
