import React, { useEffect, useState } from "react";

import {
  Box,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  Typography,
  Input,
  IconButton,
  FormControl,
  Divider,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  DialogContentText,
} from "@mui/material";
import Layout from "../Components/Layout/Layout";

import dayjs from "dayjs";
import {
  AnalyticsSharp,
  Description,
  TableChart,
  List,
  ViewList,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import TransactionTable from "../Components/TransactionTable";
import Analytics from "../Components/Analytics";
import { Container } from "@mui/system";
import TransactionList from "../Components/TransactionList";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [incurredOn, setIncurredOn] = useState(dayjs(new Date()));
  const [frequency, setFrequency] = useState(7);
  const [filterType, setFilterType] = useState("all");
  const [viewState, setViewState] = useState("table");
  const [edit, setEdit] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });
  const [editable, setEditable] = useState({
    title: "",
    amount: 0,
    type: "",
    category: "",
    reference: "",
    incurredOn: "",
    note: "",
  });
  // geting all transactions of user

  // calling function to fetch transactions
  useEffect(() => {
    console.log(selectedDate);
    console.log(filterType);
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.post("/transactions/get-transaction", {
          userId: user._id,
          frequency,
          selectedDate,
          filterType,
        });
        setAllTransaction(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch transaction", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };
    getAllTransaction();
  }, [frequency, selectedDate, filterType, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = {
      title: title,
      amount: amount,
      type: type,
      category: category,
      reference: reference,
      note: note,
      incurredOn: incurredOn,
    };
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (edit) {
        await axios.post("/transactions/edit-transaction", {
          payload: { ...newTransaction, userId: user._id },
          transactionId: editable._id,
        });
        toast.success("Edit successful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        await axios.post("/transactions/add-transaction", {
          ...newTransaction,
          userId: user._id,
        });
        toast.success("Transaction successful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Transaction unsuccessful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDelete = async (transaction) => {
    try {
      await axios.post("/transactions/delete-transaction", {
        transactionId: transaction._id,
      });
      toast.success("Delete successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Delete unsuccessful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  function handleDate(newValue) {
    const time = new Date().toLocaleTimeString();
    const result = new Date(
      dayjs(newValue).toDate().toLocaleDateString() + " " + time
    );
    console.log(result);
    setIncurredOn(result);
  }

  const handleClose = () => {
    setOpen(false);
  };

  function handleEdit(transaction) {
    setOpen(true);
    setEdit(true);
    setEditable(transaction);

    setTitle(transaction.title);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setIncurredOn(dayjs(transaction.incurredOn));
    setReference(transaction.reference);
    setNote(transaction.note);
    setType(transaction.type);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Layout>
        <Container sx={{}} maxWidth="xl">
          <div className="filters">
            <div className="date-filter" style={{ display: "flex" }}>
              {/* <Typography
                marginTop={"5px"}
                marginRight={"10px"}
                gutterBottom={false}
              >
                Select Frequency
              </Typography> */}
              <FormControl>
                <InputLabel id="frequency">Select Frequency</InputLabel>
                <Select
                  size="small"
                  labelId="frequency"
                  label="frequency"
                  value={frequency}
                  onChange={(e) => {
                    setFrequency(e.target.value);
                  }}
                >
                  <MenuItem dense value={7}>
                    Last Week
                  </MenuItem>
                  <MenuItem dense value={30}>
                    Last Month
                  </MenuItem>
                  <MenuItem dense value={365}>
                    Last Year
                  </MenuItem>
                  <MenuItem dense value="custom">
                    Custom
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="type-filter mx-2" style={{ display: "flex" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  variant="outlined"
                  size="small"
                  label="type"
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                  }}
                >
                  <MenuItem dense value={"all"}>
                    All
                  </MenuItem>
                  <MenuItem dense value={"income"}>
                    income
                  </MenuItem>
                  <MenuItem dense value={"expense"}>
                    expense
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="custom-date">
              <FormControl sx={{ m: 1 }} size="small">
                {frequency === "custom" && (
                  <DatePicker
                    onChange={(newStart) => {
                      setSelectedDate({
                        ...selectedDate,
                        startDate: dayjs(newStart).toDate().toISOString(),
                      });
                    }}
                    label="start-date"
                  />
                )}
              </FormControl>
              <FormControl sx={{ m: 1 }}>
                {frequency === "custom" && (
                  <DatePicker
                    onChange={(newEnd) => {
                      setSelectedDate({
                        ...selectedDate,
                        endDate: dayjs(newEnd).toDate().toISOString(),
                      });
                    }}
                    label="end-date"
                  />
                )}
              </FormControl>
            </div>

            <div className=" switch-icons mx-2">
              <IconButton
                disabled={viewState === "table" ? true : false}
                onClick={() => setViewState("table")}
              >
                <TableChart color={viewState === "table" ? "success" : "inherit"} className="mx-2" />
              </IconButton>
              <IconButton
                
                disabled={viewState === "list" ? true : false}
                onClick={() => setViewState("list")}
              >
                <ViewList  className="mx-2" color={viewState === "list" ? "success" : "inherit"}  />
              </IconButton>
              <IconButton
                disabled={viewState === "analytics" ? true : false}
                onClick={() => setViewState("analytics")}
              >
                <AnalyticsSharp className="mx-2" color={viewState === "analytics" ? "success" : "inherit"} />
              </IconButton>
            </div>
            <div className="add-new-button">
              <Button
                size="medium"
                variant="outlined"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add new
              </Button>
            </div>
          </div>
          <div className="home-content card">
            <div
              className="card-title m-2 flex"
              style={{ alignItems: "center" }}
            >
              <Typography component={"h1"} variant="h4" align="center">
                Transactions
              </Typography>
              {/* <h2 style={{}} >Transactions</h2> */}
            </div>
            <hr className="m-0" />
            <div className="card-body">
              {" "}
              {/* switch statement to display content */}
              {(() => {
                switch (viewState) {
                  case "table": {
                    return (
                      <TransactionTable
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        transactions={allTransaction}
                      />
                    );
                  }
                  case "analytics": {
                    return <Analytics frequency={frequency} transactions={allTransaction} />;
                  }
                  case "list": {
                    return (
                      <TransactionList
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        transactions={allTransaction}
                      />
                    );
                  }
                  default:{
                    return (
                      <TransactionTable
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        transactions={allTransaction}
                      />
                    );
                  }
                }
              })()}
              {/* alternative method */}
              {/* {viewState === "table" ? (
              <TransactionTable
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                transactions={allTransaction}
              />
            ) : (
              <Analytics transactions={allTransaction} />
            )} */}
            </div>
          </div>
        </Container>
        <Dialog maxWidth="sm" open={open} onClose={handleClose}>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogContent>
            <div>
              <Box
                component="form"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                
                sx={{ mt: 1 }}
              >
                <TextField
                  required
                  fullWidth
                  size="small"
                  margin="normal"
                  id="title"
                  label="title"
                  name="title"
                  value={title}
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  autoFocus
                  style={{ flexGrow: "1" }}
                />
                <TextField
                  required
                  fullWidth
                  size="small"
                  margin="normal"
                  id="amount"
                  label="amount"
                  name="amount"
                  value={amount}
                  type="number"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  autoFocus
                  style={{ flexGrow: "1" }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FormControl sx={{ m: 2, width: 200 }} size="large">
                    <InputLabel id="type-selector">Type</InputLabel>
                    <Select
                      required
                      labelId="type-selector"
                      id="type-selector"
                      value={type}
                      name="type"
                      sx={{ height: 55 }}
                      size="small"
                      label="type-selector"
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"income"}>Income</MenuItem>
                      <MenuItem value={"expense"}>Expense</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl required sx={{ m: 0, width: 200 }} size="small">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        
                        sx={{ width: 300, marginTop: 0 }}
                        label="Incurred On"
                        onChange={(newValue) => handleDate(newValue)}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </div>
                {/* <FormHelperText>Required</FormHelperText> */}
                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  autoComplete="email"
                />

                <TextField
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  id="reference"
                  label="Reference"
                  name="reference"
                  value={reference}
                  onChange={(e) => {
                    setReference(e.target.value);
                  }}
                  autoComplete="email"
                />

                <TextField
                  size="small"
                  margin="normal"
                  fullWidth
                  name="note"
                  label="Note"
                  type="text"
                  id="note"
                  value={note}
                  multiline={true}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  ADD
                </Button>
              </Box>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Layout>
    </LocalizationProvider>
  );
};

export default HomePage;
