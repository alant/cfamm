import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function TableAbs(props) {
  const {heading, body} = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          {heading.map(item => <TableCell>{item}</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {body.map(row => {
          return (
            <TableRow>
              {row.map((col, i) =>
              <TableCell key={i}>
                {col}
              </TableCell>)}
            </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

export default TableAbs;
