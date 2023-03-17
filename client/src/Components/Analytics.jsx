import React, { useCallback, useEffect, useRef, useState } from "react";
import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";
import Print from "./Print";
import ReactToPrint from "react-to-print";
import { Button, Typography } from "@mui/material";

const Analytics = ({budget, transactions, frequency }) => {
  const getPageMargins = () => {
    return `@media print {
    
}`;
  };

  const [loginUser, setLoginUser] = useState({});

  const totalTransactions = transactions.length;
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercentage =
    (incomeTransactions.length / totalTransactions) * 100;
  const totalExpensePercentage =
    (expenseTransactions.length / totalTransactions) * 100;
  const transactionDates = transactions.map((transaction) => {
    return transaction.incurredOn;
  });

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profileData"));
    if(!profile){
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
    }
    else{
      setLoginUser(profile);
    }
  }, []);

  function totalIncome(incomeTransactions) {
    let total = 0;
    incomeTransactions.forEach((element) => {
      total = total + Number(element.amount);
    });
    return total;
  }
  function totalExpense(expenseTransactions) {
    let total = 0;
    expenseTransactions.forEach((element) => {
      total = total + Number(element.amount);
    });
    return total;
  }

  const componentRef = useRef();

  return (
    <>
      <div className="btn">
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef.current}
          pageStyle={{ overflow: "hidden", height: 0 }}
        />
      </div>

      <div ref={componentRef} id="analysis">
        <style>{getPageMargins()}</style>
        <div id="printablediv" className="flexbox">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ display: "flex", flexDirection: "column",minWidth:"30%" }}>
              <div className="card m-2">
                <div className="card-header text-center">Profile</div>
                <div className="card-body">
                  <Typography>Username: {loginUser.username}</Typography>
                  <Typography>current budget: {loginUser.budget}</Typography>
                  <Typography>Mobile No: {loginUser.mobile}</Typography>
                  <Typography>Created at: {new Date(loginUser.createdAt).toLocaleString()}</Typography>
                </div>
              </div>
              <div className="card m-2">
                <div className="card-header">
                  Total Transactions: {totalTransactions}
                </div>
                <div className="card-body">
                  <h5>Income : {incomeTransactions.length} Transactions </h5>
                  <h5>Expense : {expenseTransactions.length} Transactions </h5>
                  <h5>
                    Total Income: &#8377;{" "}
                    {incomeTransactions.length !== 0
                      ? totalIncome(incomeTransactions)
                      : 0}
                  </h5>
                  <h5>
                    Total Expense: &#8377;{" "}
                    {expenseTransactions.length !== 0
                      ? totalExpense(expenseTransactions)
                      : 0}
                  </h5>
                </div>
              </div>
            </div>
            <div
              style={{ display: "flex", height: "fit-content", flexGrow: 1 }}
            >
              <div  className="bargraph col ">
                <BarGraph
                   
                  frequency={frequency}
                  transactions={transactions}
                  incomeTransactions={incomeTransactions}
                  expenseTransactions={expenseTransactions}
                />
              </div>
            </div>
          </div>
          <div>
            <div className=" ">
              <style></style>
              <PieGraph
                frequency={frequency}
                transactions={transactions}
                incomeTransactions={incomeTransactions}
                expenseTransactions={expenseTransactions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
