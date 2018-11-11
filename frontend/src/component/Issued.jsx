import React from 'react';
import TableAbs from './TableAbs';
import Typography from '@material-ui/core/Typography';

function Issued(props) {
  const {headAcc, bodyAcc, headUn, bodyUn} = props.profit;

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
