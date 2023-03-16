import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  Paper,
  TableBody,
  TableRow,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import dayjs from "dayjs";

const TransactionTable = ({ transactions, handleEdit, handleDelete }) => {

  

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow >
              <TableCell  ><h5 style={{fontWeight:"bold"}}>Title</h5></TableCell>
              <TableCell  align="center"><h5 style={{fontWeight:"bold"}} >Amount</h5></TableCell>
              <TableCell align="center"><h5 style={{fontWeight:"bold"}} >Type</h5></TableCell>
              <TableCell align="center"><h5 style={{fontWeight:"bold"}} >Category</h5></TableCell>
              <TableCell align="center"><h5 style={{fontWeight:"bold"}} >Reference</h5></TableCell>
              <TableCell align="center"><h5 style={{fontWeight:"bold"}} >Note</h5></TableCell>
              <TableCell align="center"><h5 style={{fontWeight:"bold"}} >Incurred On</h5></TableCell>
              <TableCell align="center"><h5 style={{fontWeight:"bold"}} >Actions</h5></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell  scope="row">
                  <h6>{transaction.title}</h6>
                </TableCell>
                <TableCell align="center"><Typography>&#8377; {transaction.amount}</Typography></TableCell>
                <TableCell align="center"><Typography>{transaction.type}</Typography></TableCell>
                <TableCell align="center"><Typography>{transaction.category}</Typography></TableCell>
                <TableCell align="center"><Typography>{transaction.reference}</Typography></TableCell>
                <TableCell size="small" style={{wordWrap:"break-word",whiteSpace:"normal"}} align="center"><Typography>{transaction.note}</Typography></TableCell>
                <TableCell align="center"><Typography>{dayjs(transaction.incurredOn).toString()}</Typography></TableCell>
                <TableCell align="center">
                  <IconButton   onClick={()=>{handleEdit(transaction)}} >
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton onClick={()=>{handleDelete(transaction)}} >
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionTable;
