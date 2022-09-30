import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableSortLabel, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

interface IMappedServerData {
  amount: string | number;
}

export const OrderTable = ({ data }: any) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [hasSorting, setSorting] = useState(false);
  const [sortedData, setSortedData] = useState(data);

  const roundNumber = (qty: string) => {
    return Number.parseFloat(Number.parseFloat(qty.toString()).toFixed(10));
  };

  const handleSort = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setSorting(true);
  };

  useEffect(() => {
    if (!data && !hasSorting) {
      return setSortedData(data);
    }

    const customSortedItems = Object.values(data).sort(
      (number1: any, number2: any) => {
        return order === 'asc'
          ? roundNumber(number1.amount) - roundNumber(number2.amount)
          : roundNumber(number2.amount) - roundNumber(number1.amount);
      }
    );
    setSortedData(customSortedItems);
  }, [data, order, hasSorting]);

  return data ? (
    <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={hasSorting}
                direction={order}
                onClick={handleSort}
              >
                Amount
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map(({ amount }: IMappedServerData, idx: number) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography
      id="modal-modal-title"
      variant="h6"
      align="center"
      component="h2"
    >
      Can't load data
    </Typography>
  );
};
