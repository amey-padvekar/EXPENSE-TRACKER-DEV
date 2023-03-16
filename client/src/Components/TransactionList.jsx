import { Description, Note, Edit, Delete } from "@mui/icons-material";
import {
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  List,
  Toolbar,
  IconButton,
  Divider,
} from "@mui/material";
import React from "react";

const TransactionList = ({ transactions, handleEdit, handleDelete }) => {
  const data = [
    {
      id: 1,
      title: "title1",
      amount: 5000,
      type: "income",
      category: "salary",
      reference: "salary",
      date: new Date().toLocaleDateString(),
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 1,
      title: "title1",
      amount: 5000,
      type: "income",
      category: "salary",
      reference: "salary",
      date: new Date().toLocaleDateString(),
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 1,
      title: "title1",
      amount: 5000,
      type: "income",
      category: "salary",
      reference: "salary",
      date: new Date().toLocaleDateString(),
      note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];
  return (
    <>
      <div className="list-view">
        <div className="">
        {transactions.map((transaction,index)=>{
          return(<>
            <List component="div" className="m-1"  key={index}
            sx={{ width: "100%", bgcolor: "background.paper", display: "flex", boxShadow:"0 0 1px black" }}
          >
            
            <ListItem key={"icon "+index} component={"div"} sx={{width:"fit-content"}} >
              <ListItemAvatar>
                <Description  />
              </ListItemAvatar>
            </ListItem>
            <ListItem key={"title "+index} sx={{ width: 200 }}>
              <ListItemText>
                <Typography>{transaction.title}</Typography>
              </ListItemText>
            </ListItem>

            <ListItem key={"amount "+index} sx={{ width:150 }}>
              <ListItemText>
                <Typography>&#8377; {transaction.amount}</Typography>
              </ListItemText>
            </ListItem>
            <ListItem key={"note "+index}  sx={{ width: "70%" }}>
              <ListItemText>
                <Typography sx={{textAlign:"center"}}>
                  {transaction.note}
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem key={"date "+index} sx={{ width: "fit-content" }}>
              <ListItemText>{new Date(transaction.incurredOn).toString()}</ListItemText>
            </ListItem>
            <ListItem key={"button "+index} sx={{width:"fit-content"}} >
              <Toolbar>
                <IconButton>
                  <Edit color="primary" />
                </IconButton>
                <IconButton>
                  <Delete color="error" />
                </IconButton>
              </Toolbar>
            </ListItem>
            
          </List>
          <Divider variant="middle" sx={{color:"black"}} />
          </>)
        })}
        </div>
      </div>
    </>
  );
};

export default TransactionList;
